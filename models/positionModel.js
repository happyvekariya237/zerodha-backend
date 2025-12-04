const mongoose = require("mongoose");
const  positionSchema  = require("../schemas/positionSchema");

const positionModel = mongoose.model("position", positionSchema);

module.exports = positionModel;
