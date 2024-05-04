const express=require("express")
const bodyparser=require('body-parser')
const morgan=require('morgan')
const dotenv = require("dotenv");

dotenv.config();

require("./config/dbConnect")
const route=require("./routes/userRoute")

const app=express()
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use("/",route)


const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Serever is running on port ${PORT} `);
})