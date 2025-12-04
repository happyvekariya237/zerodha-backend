const{model} = require("mongoose");
const orderSchema=require("../schemas/orderSchema")


const orderModel=new model("order",orderSchema);

module.exports=orderModel;