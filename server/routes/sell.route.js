import express from "express"
import SellModel from "../models/sell.model.js"

const sellRouter = express.Router()

sellRouter.get("/",async(req,res)=>{
    const sellStock = await SellModel.find()
    res.send(sellStock)
})

sellRouter.post("/sell-stock", async(req,res)=>{
    const {stock,quantity,price} = req.body

    try {
        const addOrder = new SellModel({
            stock,
            quantity,
            price
        })
        await addOrder.save()
        res.status(201).json({message:"order created for sell"})
    } catch (error) {
        res.status(500).json({message:"Eror in server while creating order for sell"})
    }
})

export default sellRouter