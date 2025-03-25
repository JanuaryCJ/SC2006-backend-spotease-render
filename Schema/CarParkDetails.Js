const mongoose = require("mongoose");

const carParkDetailsSchema = new mongoose.Schema({},{collection:"HDBCarpark"});

mongoose.model("HDBCarpark",carParkDetailsSchema)