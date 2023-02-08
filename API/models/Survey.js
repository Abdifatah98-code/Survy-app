const mongoose = require('mongoose')
const surveySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    rate:{
        type: Number,
        default:0  
    }, 
}, {timestamps: true})

// 1 ->excellent,2-very good,3->good,4->bad

const survey = mongoose.model('survey', surveySchema)
module.exports = survey