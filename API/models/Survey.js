const mongoose = require('mongoose')
const { uuid } = require('uuidv4');
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

const survey = mongoose.model('survey', surveySchema)
module.exports = survey