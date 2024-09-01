import express from "express"
import UserModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userRouter = express.Router()

userRouter.get("/",(req,res)=>{
    res.send("this is user router")
})

userRouter.post("/register", async(req,res)=>{
    const {name,email,password} = req.body

    try {
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(409).json({message:"User already registered"})
        }
        bcrypt.hash(password,3,async(err,hash)=>{
            if(err){
                return res.status(500).json({message:"Error while hashing password"})
            }
            const addUser = new UserModel({
                name,
                email,
                password:hash
            })
            await addUser.save()
            res.status(201).json({message:"User Registered Successfully"})
        })
        
        
    } catch (error) {
        res.status(500).json({message:"Error in server while registering password"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email, password} = req.body

    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(err){
                   return res.status(500).json({message:"Error in server during password"})
                }
                if(!result){
                    return res.status(200).json({message:"Wrong Password"})
                }
                const token = jwt.sign({id:user._id, name:user.name}, process.env.JWT_SECRET_KEY)
                res.status(200).json({message:"login successfull", token, name:user.name})
            })
        }
    } catch (error) {
        res.status(500).json({message:"Error in server while login password"})
    }
})

export default userRouter