const mongoose = require('mongoose');

const UserDatailsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
},{
    collection:"UserInfo"
});

mongoose.model("UserInfo",UserDatailsSchema);