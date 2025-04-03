const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authenticateToken = require("../JWT_Auth/authenticateToken");

require("../Schema/UserDetails");
require("../Schema/LocationDetails");

const User = mongoose.model("UserInfo");
const ProfileLocationHistory = mongoose.model("LocationHistory");

// ✅ Secure POST to save location (with token + user check)
router.post("/createLocationHistory", authenticateToken,async (req, res) => {
  try {
    // Extract user info from decoded JWT
    const { userId, email } = req.user;

    // 1. ✅ Verify user exists in DB
    const user = await User.findById(userId);
    if (!user || user.email !== email) {
      return res.status(401).json({ error: "Unauthorized: Invalid user" });
    }

    // 2. ✅ Extract body content
    const { coordinates, locationAddress, locationType } = req.body;

    // 3. ✅ Validate required fields
    if (
      !coordinates ||
      !coordinates.latitude ||
      !coordinates.longitude ||
      !coordinates.x_coor ||
      !coordinates.y_coor ||
      !locationAddress
    ) {
      return res.status(400).json({ error: "Missing required location fields" });
    }

    // 4. ✅ Create new location log
    await ProfileLocationHistory.create({
      email,
      coordinates,
      locationAddress,
      locationType,
      timestamp: new Date(),
    });

    res.status(201).json({ message: "Location saved successfully." });
  } catch (error) {
    console.error("❌ Error saving location:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/fetchLocationHistory", authenticateToken,async (req, res) => {
  try{
    const { userId, email } = req.user;

    const user = await User.findById(userId);
    if (!user || user.email !== email) {
      return res.status(401).json({ error: "Unauthorized: Invalid user" });
    }

    const locationHistory = await ProfileLocationHistory.find({email}).sort({timestamp:-1});
    res.status(200).json({ history: locationHistory }); 



  }catch (error){
    console.error("Error fetch lcoation history:", error);
  }
});

// Add this route to your profileRetrieval.js file

// Clear location history for authenticated user
// profileRetrieval.js (or your routes file)
// Add to your profileRetrieval.js or similar route file
const LocationHistory = mongoose.model("LocationHistory"); // Ensure this is imported

router.delete('/clear-location-history', authenticateToken, async (req, res) => {
  try {
    const { email } = req.user; // From JWT token

    // Delete all location records for this user
    const result = await LocationHistory.deleteMany({ email });

    res.status(200).json({
      success: true,
      message: "Location history cleared",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error("Error clearing history:", error);
    res.status(500).json({
      success: false,
      error: "Failed to clear location history"
    });
  }
});

module.exports = router;