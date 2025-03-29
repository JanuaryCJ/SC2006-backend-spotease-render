const express = require("express");
const router = express.Router(); // you were missing this!
const authenticateToken = require("../JWT_Auth/authenticateToken");
const User = require("../Schema/UserDetails");
require("dotenv").config();

// Protected route to retrieve user profile
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // from decoded token set in middleware

        const existUser = await User.findById(userId);

        if (!existUser) {
            return res.status(404).json({ error: "User not found." });
        }

        const userProfile = {
            email: existUser.email,
            id: existUser._id
        };

        return res.status(200).json({ user: userProfile });

    } catch (error) {
        console.error("❌ Error retrieving profile:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
