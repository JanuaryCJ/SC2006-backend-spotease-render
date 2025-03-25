const express = require("express");
const mongoose = require("mongoose");
require("../Schema/LocationDetails");

const Location = mongoose.model("LocationHistory");

const router = express.Router();

// ✅ Save location endpoint
router.post("/save-location", async (req, res) => {
  try {
    const { email, coordinates, locationName, locationType, device } = req.body;

    if (!email || !coordinates?.latitude || !coordinates?.longitude) {
      return res.status(400).json({ status: "Error", message: "Missing required fields" });
    }

    const newLocation = await Location.create({
      email,
      coordinates,
      locationName: locationName || "",
      locationType: locationType || "",
      device: device || "Mobile",
    });

    res.status(201).json({ status: "Success", data: newLocation });
  } catch (error) {
    console.error("❌ Error saving location:", error);
    res.status(500).json({ status: "Error", message: error.message });
  }
});

// ✅ Get location history endpoint
router.get("/history/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { limit = 50, skip = 0 } = req.query;

    const locations = await Location.find({ email })
      .sort({ timestamp: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    res.status(200).json({ status: "Success", data: locations });
  } catch (error) {
    console.error("❌ Error retrieving location history:", error);
    res.status(500).json({ status: "Error", message: error.message });
  }
});

// ✅ Clear location history endpoint
router.delete("/history/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const result = await Location.deleteMany({ email });

    res.status(200).json({ status: "Success", deleted: result.deletedCount });
  } catch (error) {
    console.error("❌ Error clearing location history:", error);
    res.status(500).json({ status: "Error", message: error.message });
  }
});

module.exports = router;
