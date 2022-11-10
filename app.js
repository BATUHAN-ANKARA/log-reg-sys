import express from "express"
import dotenv from "dotenv"
import conn from "./db.js"
import cookieParser from "cookie-parser"

import { checkUser  } from "./middlewares/authMiddleware.js"
import pageRoute from "./routes/pageRoute.js"
import userRoute from "./routes/userRoute.js"
import planRoute from "./routes/planRoute.js"
import userplanRoute from "./routes/userplanRoute.js"

dotenv.config()

//Connection to the db
conn()

const app = express()

const port = process.env.PORT

//ejs template engine 
app.set("view engine", "ejs")

//static files middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//routes
app.use("*", checkUser)
app.use("/", pageRoute)
app.use("/users", userRoute)
app.use("/plans", planRoute)
app.use("/userplans", userplanRoute)


app.listen(port, ()=>{
    console.log(`Application running on port: ` + port)
})


