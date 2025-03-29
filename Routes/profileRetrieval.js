const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authenticateToken = require("../JWT_Auth/authenticateToken");

require("../Schema/UserDetails");
require("../Schema/LocationDetails");

const User = mongoose.model("UserInfo");
const ProfileLocationHistory = mongoose.model("LocationHistory");

// ✅ Secure POST to save location (with token + user check)
router.post("/locationHistory", async (req, res) => {
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

module.exports = router;
