import mongoose from "mongoose";

const buySchema = mongoose.Schema({
    stock :{type:String, required:true},
    quantity:{type:Number, required:true},
    price:{type:Number, required:true},
})

const BuyModel = mongoose.model("Buy", buySchema)

export default BuyModel