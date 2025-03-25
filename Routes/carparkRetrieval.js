const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

// ✅ Import User model
require("../Schema/CarParkDetails");
const carParkData = mongoose.model("HDBCarpark");
const router = express.Router();

router.post("/carParkRetrieval", async (req, res) => {
  try {
    const { x_coord, y_coord, filterRadius } = req.body;
    console.log("X: " + x_coord + " Y: " + y_coord + " Radius:" + filterRadius);
    
    //Retrieve Car Parks Within X & Y Boundary
    const carParks = await carParkData.find({
      car_park_no: "AM96",
    });
    console.log(carParks);

    res.json(carParks);
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
