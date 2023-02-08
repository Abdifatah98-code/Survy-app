const express=require("express");

const app =express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const route_survey =require("../API/routers/route_survey");
app.use("/api/survey",route_survey)


app.use("*",(req,res)=>{res.status(400).json({Message:`${req.method} ${req.baseUrl} not Found !!`})})

module.exports=app;