const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Connect to MongoDB
const mongoUrl = process.env.MONGO_Auth_URL;
console.log('MongoDB URL:', mongoUrl); // Debugging line
//server will run at http://localhost:5001
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Import and register schemas
require('./UserDetails'); // Ensure this file defines the User schema
const Location = require('./LocationDetails'); // Import Location schema

const User = mongoose.model('UserInfo');

// Routes
app.get('/', (req, res) => {
  res.send({ status: 'started' });
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.send({ data: 'User already exists' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      password: hashedPassword,
    });
    res.send({ status: 'User registered' });
  } catch (error) {
    res.send({ status: 'Error', data: error });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
    res.json({
      status: 'success',
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error, please try again',
    });
  }
});

// Save location endpoint
app.post('/save-location', async (req, res) => {
  try {
    const { userId, coordinates, locationName, locationType } = req.body;
    if (!userId || !coordinates || !coordinates.latitude || !coordinates.longitude) {
      return res.status(400).send({ status: 'Error', message: 'Missing required fields' });
    }
    const newLocation = await Location.create({
      userId,
      coordinates,
      locationName: locationName || '',
      locationType: locationType || '',
      timestamp: new Date(),
    });
    res.send({ status: 'Success', data: newLocation });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).send({ status: 'Error', message: error.message });
  }
});

// Get location history endpoint
app.get('/location-history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, skip = 0 } = req.query;
    const locations = await Location.find({ userId })
      .sort({ timestamp: -1 })
      .skip(Number(skip))
      .limit(Number(limit));
    res.send({ status: 'Success', data: locations });
  } catch (error) {
    console.error('Error getting location history:', error);
    res.status(500).send({ status: 'Error', message: error.message });
  }
});

// Clear location history endpoint
app.delete('/location-history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Location.deleteMany({ userId });
    res.send({ status: 'Success', deleted: result.deletedCount });
  } catch (error) {
    console.error('Error clearing location history:', error);
    res.status(500).send({ status: 'Error', message: error.message });
  }
});

// Start the server
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});