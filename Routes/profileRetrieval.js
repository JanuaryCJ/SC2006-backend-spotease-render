const express = required("express")
const authenticateToken = require("../JWT_Auth/authenticateToken")
const User = require("../Schema/UserDetails")
require("dotenv").config();


require("Schema/profileRetrieval", async(req,res) =>{
    try{
        const userID = req.user.userID;

        const existUser = await User.findById(userID);

        if (!existUser) return response.status(400).json({error: "User not found."});

        const userProfile = {
            email: existUser.email,
            id: existUser._id
        };

        return response.status(200).json({user:userProfile});
    }catch(error)
    {
        console.error("Error retrieving profile")
        return response.status(500).json({error: "server error"})
    }
});

module.exports = router;