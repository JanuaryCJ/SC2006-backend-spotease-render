const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();


// ✅ Import User model
require("../Schema/UserDetails");
const User = mongoose.model("UserInfo");


// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

router.post("/forgetpassword", async (req, res) => {
    const { email } = req.body;
    try{
        const existUser = await User.findOne({email});
        if (!existUser){
            return res.status(404).json({"error":"User does not exist"});
        }
        const otp = generateOTP();
        User.resetToken = otp;
        User.expireToken = Date.now() + 5 * 60 * 1000;
        await existUser.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendMail({
            from: "SpotEase <spotease123@gmailcom>",
            to: email,
            subject: "SpotEase reset password",
            text:"Your OTP is: ${otp}. It will expire in 5 minutes",
        });

        res.status(200).json({message:"OTP sent successfully"});


    }catch (error){
        console.error("Error",error);
        res.status(500).json({error:"Internal Server Error"});
    }
});

//reset password
router.post("/resetpassword", async (req,res) => {
    const {OTP,password} = req.body;
    try{
        const existUser = await User.findOne({resetToken:OTP,expireToken:{$gt:Date.now()}});
        if(!existUser) return res.status(401).json({error:"OTP expired. Try again"});

        existUser.password = await bcrypt.hash(password,10);
        existUser.resetToken = undefined;
        existUser.expireToken = undefined;
        await existUser.save();
        
        res.json({message:"Password reset successfully"});

    }catch(error){
        console.error("Error",error);
        res.status(500).json({error:"Internal Server Error"});
    }

});

module.exports = router;
