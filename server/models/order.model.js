import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    stock :{type:String, required:true},
    quantity:{type:Number, required:true},
    price:{type:Number, required:true},
})

const OrderSchema = mongoose.model("Order", orderSchema)

export default OrderSchema