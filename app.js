// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs"); // Import bcrypt for hashing passwords
// const cors = require("cors"); // Allow cross-origin requests
// require("dotenv").config(); // Load environment variables from .env file

// const app = express();
// app.use(express.json()); // Enable JSON parsing

// // ✅ Configure CORS for better security
// app.use(
//   cors({
//     origin: "*", // Change "*" to your frontend URL for security
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// const mongoUrl = process.env.MONGO_Auth_URL; // Load MongoDB URL from environment variables

// // ✅ Connect to MongoDB with error handling
// mongoose
//   .connect(mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); // Stop server if DB fails to connect
//   });

// // ✅ Import the User model
// require("./Schema/UserDetails");
// const User = mongoose.model("UserInfo");

// // ✅ Root endpoint to check if API is running
// app.get("/", (req, res) => {
//   res.status(200).json({ status: "Server is running!" });
// });

// // ✅ Register User Endpoint
// app.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✅ Validate request data
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required!" });
//     }

//     // ✅ Check if user already exists
//     const oldUser = await User.findOne({ email });
//     if (oldUser) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     // ✅ Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ status: "User registered" });
//   } catch (error) {
//     console.error("❌ Error registering user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// const jwt = require("jsonwebtoken");

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✅ Validate request data
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required!" });
//     }

//     // ✅ Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // ✅ Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // ✅ Generate JWT token
//     const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: "1h", // Token expires in 1 hour
//     });

//     // ✅ Send response with token
//     res.status(200).json({ message: "Login successful", token, user: { email: user.email } });

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// const nodemailer = require("nodemailer");

// //function to generate OTP
// const generatedOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000);
// }

// //forgot password backend
// app.post("/forgetpassword", async (req,res) => {
//   const { email } = req.body;

//   // Validate required fields
//   if (!email.trim()) {
//     return res.status(400).json({ error: "Email is required!" });
//   }

//   try {
//     // Check if the user exists by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     //generate otp
//     const otp = generatedOTP();

//     //store otp in database 
//     const resetToken = otp;
//     user.resetToken = resetToken;
//     user.expireToken = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
//     await user.save();

//     // standardise email transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth:
//       {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//       }
//     });

//     // create message for sending
//     const message = {
//       from: "SpotEase <spotease123@gmail.com>",
//       to: req.body.email,
//       subject: "SpotEase reset password",
//       text: `Your OTP is: ${otp}. It will expire in 5 minute`
//     };

//     // Send the email
//     await transporter.sendMail(message);
//     console.log("Email sent successfully to", email);

//     // Respond with success message
//     res.json({ message: "OTP sent to your email" });

//   } catch (error) {
//     console.error("Error resetting password:", error);
//     res.status(500).json({ error: "Internal Server Error" }); // Ensure JSON response here
//   }
// });


// //reset password backend 
// app.post("/resetpassword", async (req , res) => {
//   const { OTP , password } = req.body;
//   console.log('Hello');
//   try {
//   // Validate required fields
//   if (!OTP || !password.trim()) {
//     return res.status(400).json({ error: "OTP and password are required!" });
//   }

//   //find user by OTP and check expiration
//   const user = await User.findOne({ resetToken: OTP , expireToken: { $gt: Date.now() } });

//   if (!user) {
//     return res.status(400).json({ error: "OTP expired. Try again." });
//   }

//   // ✅ Hash password before saving
//   const hashedPassword = await bcrypt.hash(password, 10);
//   // await User.create({
//   //   email,
//   //   password: hashedPassword,
//   // });

//   // update user pasword and clear OTP fields
//   user.password = hashedPassword;
//   user.resetToken = undefined;
//   user.expireToken = undefined;
//   await user.save();

//   // Respond with success message
//   res.json({ message: "Password reset successfully" });
//   } catch (error){
//   console.error("Error resetting password:", error);
//   res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ Use dynamic PORT for Render
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const connectDB = require("./MongoDB_connect")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/location", require("./Routes/locationRoutes"));


app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

connectDB();

app.use("/auth", require("./Routes/authRoutes"));
app.use("/password", require("./Routes/passwordRoutes"));

//TESTING//
app.use("/carpark", require("./Routes/carparkRetrieval"))


app.get("/", (req, res) => {
  res.json({ status: "Server is running!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
