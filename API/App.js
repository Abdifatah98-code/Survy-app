const express=require("express");
const cors = require('cors');
const app =express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
const route_survey =require("../API/routers/route_survey");
const route_work =require("../API/routers/route_workshorp");
app.use("/api/survey",route_survey)
app.use("/api/workshope",route_work)


app.use("*",(req,res)=>{res.status(400).json({Message:`${req.method} ${req.baseUrl} not Found !!`})})

module.exports=app;