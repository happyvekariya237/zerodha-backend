const mongoose = require("mongoose");
const { Schema } = mongoose;

const holdingSchema = new Schema({
  name: String,
  qty: Number,
  avg: {type:Number,default:0},
  price: Number,
  net: {type:String,default:0},
  day: {type:String,default:0},
  isLoss: {type: Boolean, default: false },
});

module.exports = holdingSchema;
