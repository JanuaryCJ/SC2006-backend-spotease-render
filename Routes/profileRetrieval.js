const express = require("express");
const router = express.Router();
const authenticateToken = require("../JWT_Auth/authenticateToken");
const User = mongoose.model("UserInfo");

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
