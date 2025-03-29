const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const UserModel = require("../models/User"); // User schema file

// This route will return user profile data only if the JWT is valid
router.get("/profile", authenticateToken, async (request, response) => {
    try {
        // Extract userId from the token (which was added by authenticateToken middleware)
        const userIdFromToken = request.user.userId;

        // Find the user in the database by their ID
        const foundUser = await UserModel.findById(userIdFromToken);

        // If user doesn't exist, return 404
        if (!foundUser) {
            return response.status(404).json({ error: "User not found." });
        }

        // Remove sensitive fields before sending back to client
        const userProfile = {
            email: foundUser.email,
            _id: foundUser._id
            // Add more fields here if needed (e.g., name, phone, etc.)
        };

        // Send user profile as a response
        return response.status(200).json({ user: userProfile });

    } catch (error) {
        console.error("❌ Error while retrieving user profile:", error);
        return response.status(500).json({ error: "Something went wrong on the server." });
    }
});

module.exports = router;
