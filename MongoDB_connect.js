const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_Auth_URL;

const connectMongoDB = async () => {
    try{
        await mongoose.connect(mongoUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error){
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }};

module.exports = connectMongoDB;
