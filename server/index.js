import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connection from "./config/db.js"
import userRouter from "./routes/user.route.js"
import stockRouter from "./routes/stock.route.js"
import sellRouter from "./routes/sell.route.js"
import buyRouter from "./routes/buy.route.js"
import orderRouter from "./routes/order.route.js"

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use("/user", userRouter)
app.use("/stock", stockRouter)
app.use("/sell",sellRouter)
app.use("/buy",buyRouter)
app.use("/order", orderRouter)


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

