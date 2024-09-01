import express from "express"
import SellModel from "../models/sell.model.js"
import BuyModel from "../models/buy.model.js"

const orderRouter = express.Router()

orderRouter.get("/",(req,res)=>{
    res.send("ordr match")
})

orderRouter.post("/buy-match",async(req,res)=>{
    const {stock,quantity,price} = req.body
    try {
        const sellStock = await SellModel.findOne({stock})
        if(!sellStock){
            res.status(404).json({message:"This stock is not found or created in sell list, please add the stock in sell section"})
        }
        if(sellStock){
            if(quantity === 0){
                return res.status(200).json({message:"Buying qunatity must be greater than or equal to one"})
            }
            if(price <= sellStock.price){
                return res.status(200).json({message:"price should be less than or equal sell price "})
            }
            if(quantity > sellStock.quantity ){
                return res.status(200).json({message:"buying order half fullfilled"})
            }
            if(price >= sellStock.price && quantity <= sellStock.quantity ){
                return res.status(200).json({message:"Buying order fullfilled"})
            }
            
            
        }
    } catch (error) {
        res.status(500).json({message:"Error in server while order match"})
    }
})

orderRouter.post("/sell-match",async(req,res)=>{
    const {stock,quantity,price} = req.body
    try {
        const buyStock = await BuyModel.findOne({stock})
        if(!buyStock){
            res.status(404).json({message:"This stock is not found or created in sell list, please add the stock in sell section"})
        }
        if(buyStock){
            if(quantity === 0){
                return res.status(200).json({message:"Sell qunatity must be greater than or equal to one"})
            }
            if(price <= buyStock.price){
                return res.status(200).json({message:"price should be less than or equal Buy price "})
            }
            if(quantity > buyStock.quantity ){
                return res.status(200).json({message:"Selling order half fullfilled"})
            }
            if(price >= buyStock.price && quantity <= buyStock.quantity ){
                return res.status(200).json({message:"Sell order fullfilled"})
            }
            
            
        }
    } catch (error) {
        res.status(500).json({message:"Error in server while order match"})
    }
})


export default orderRouter