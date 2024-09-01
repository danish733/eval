import mongoose from "mongoose";

const stockSchema = mongoose.Schema({
    stockName:{ type:String, required:true},
    stockSymbol :{type:String, required:true},
    stockPrice:{type:Number, required: true},
})
const StockModel = mongoose.model("Stock",stockSchema)

export default StockModel