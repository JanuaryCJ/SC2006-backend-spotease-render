require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Import bcrypt for hashing passwords
const cors = require("cors"); // Allow cross-origin requests
const jwt = require("jsonwebtoken"); // Import JWT

const app = express();
app.use(express.json()); // Enable JSON parsing

// ✅ Configure CORS for better security
app.use(
  cors({
    origin: "*", // Change "*" to your frontend URL for security
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const mongoUrl = process.env.MONGO_Auth_URL; // Load MongoDB URL from environment variables

// ✅ Connect to MongoDB with error handling
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB fails to connect
  });

// ✅ Import the User model
require("./UserDetails");
const User = mongoose.model("UserInfo");

// ✅ Root endpoint to check if API is running
app.get("/", (req, res) => {
  res.status(200).json({ status: "Server is running!" });
});

// ✅ Register User Endpoint
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate request data
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    // ✅ Check if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ status: "User registered" });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/login',async(req,res)=>{
  try {
    const { email, password } = req.body;

    // ✅ Validate request data
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ status: "Login successful", token });
  } catch (error) {
    console.error("❌ Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Use dynamic PORT for Render
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
