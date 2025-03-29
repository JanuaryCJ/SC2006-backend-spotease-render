const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

// ✅ Import User model
require("../Schema/UserDetails");
const User = mongoose.model("UserInfo");
const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const {email,password} = req.body;
        console.log ("e"+email+"p"+password);

        // Check if user already exists
        const existUser = await User.findOne({email});
        if (existUser){
            return res.status(409).json({error:"User already exists"});
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            email,
            password:hashedPassword,
        });

        res.status(201).json({status:"User registered"});
    }catch(error){
        console.error("❌ Error registering user:", error);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.post("/login",async(req,res)=>{

    const {email,password} = req.body;
    try{
        if (!email || !password){
            return res.status(400).json({error:"Email and password are required!"});
        }

        const existUser = await User.findOne({email});
        if(!existUser){
            return res.status(401).json({error:"Failed to login"});
        }

        const isPasswordMatch = await bcrypt.compare(password,existUser.password);
        if(!isPasswordMatch){
            return res.status(401).json({error:"Failed to login"});
        }
        const token = jwt.sign({ userId: existUser._id, email: existUser.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token, user: { email: existUser.email } });

    }
    catch(error){
        console.error("❌ Error logging in user:", error);
        res.status(500).json({error:"Internal Server Error"});
    }
});

module.exports = router;