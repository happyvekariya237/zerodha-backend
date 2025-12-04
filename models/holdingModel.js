
const mongoose = require("mongoose");
const holdingSchema = require("../schemas/holdingSchema"); // adjust path

const holdingModel = mongoose.model("Holding", holdingSchema);

module.exports = holdingModel;
