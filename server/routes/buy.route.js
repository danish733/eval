import express from "express"
import BuyModel from "../models/buy.model.js"

const buyRouter = express.Router()

buyRouter.get("/",async(req,res)=>{
    const buy = await BuyModel.find()
    res.send(buy)
})

buyRouter.post("/buy-stock", async(req,res)=>{
    const {stock,quantity,price} = req.body

    try {
        const addOrder = new BuyModel({
            stock,
            quantity,
            price
        })
        await addOrder.save()
        res.status(201).json({message:"order created for buy"})
    } catch (error) {
        res.status(500).json({message:"Eror in server while creating order for buy"})
    }
})

export default buyRouter