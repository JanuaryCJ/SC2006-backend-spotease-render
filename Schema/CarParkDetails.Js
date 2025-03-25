const mongoose = require("mongoose");

const carParkSchema = new mongoose.Schema({},{collection:"HDBCarpark"});

mongoose.model("HDBCarpark",carParkDetailsSchema)