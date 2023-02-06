const express=require("express");

const app =express()
app.use(express.json());
app.use("*",(req,res)=>{res.status(400).json({Message:`${req.method} ${req.baseUrl} not Found !!`})})

module.exports=app;