const dotenv=require('dotenv').config()
const mongoose = require('mongoose')


let Port="mongodb://127.0.0.1:27017"

mongoose.connect(`${Port}/survey`,{

},(err)=>{
    if(!err){
        console.log('connected')
    }else{
        console.log('Error', err.message)
    }
})