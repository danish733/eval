import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connection from "./config/db.js"
import userRouter from "./routes/user.route.js"

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use("/user", userRouter)


app.get("/",(req,res)=>{
    res.send("this is evaluation stock market backend")
})

app.listen(PORT,async()=>{

    try {
        await connection
        console.log(`Conntected to server http://localhost:${PORT} and connected to database`)
    } catch (error) {
        console.log("Error in connecting server and database", error)
    }
})

