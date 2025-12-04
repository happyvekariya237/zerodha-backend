const userSchema = require ("../schemas/userSchema")
const mongoose = require("mongoose");

const userModel= mongoose.model("user",userSchema);

module.exports=userModel;