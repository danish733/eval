import express from "express"
import StockModel from "../models/stock.model.js"
import auth from "../middlewares/auth.middleware.js"
import admin from "../middlewares/admin.middleware.js"

const stockRouter = express.Router()


stockRouter.get("/",async(req,res)=>{
    const stocks = await StockModel.find()
    res.send(stocks)
})

stockRouter.post("/add", [auth,admin], async(req,res)=>{
    const {stockName,stockSymbol,stockPrice} = req.body

    try {
         const existingStock = await StockModel.findOne({stockName})
         if(existingStock){
            return res.status(409).json({message:"Stock already exist"})
         }
         if(!existingStock){
            const addStock = new StockModel({
                stockName,
                stockSymbol,
                stockPrice
            })
            await addStock.save()
            res.status(201).json({message:"Stock Added Successfully"})
         }
    } catch (error) {
        res.status(500).json({message:"Error in server while adding stock"})
    }
})
stockRouter.patch("/update/:id",[auth,admin],async(req,res)=>{
    const StockId = req.params.id
    const payload = req.body
    try {
       const updateStock = await StockModel.findByIdAndUpdate(StockId,payload)
       res.status(200).json({message:"Stock Update Successfully"})
    } catch (error) {
        res.status(500).json({message:"Eror in server while updating stocks"})
    }
})

stockRouter.delete("/delete/:id",[auth,admin],async(req,res)=>{
    const StockId = req.params.id
    try {
       const deleteStock = await StockModel.findByIdAndDelete(StockId)
       res.status(200).json({message:"Stock deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:"Eror in server while deleting stocks"})
    }
})




stockRouter




export default stockRouter



