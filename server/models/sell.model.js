import mongoose from "mongoose";

const sellSchema = mongoose.Schema({
    stock :{type:String, required:true},
    quantity:{type:Number, required:true},
    price:{type:Number, required:true},
})

const SellModel = mongoose.model("Sell", sellSchema)

export default SellModel