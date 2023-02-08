const mongoose = require("mongoose");

const workShopeScheme = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  startDate: {
    typed: Date,
    default: Date.now(),
  },
  endDate: {
    typed: Date,
    default: Date.now(),
  },
  participantNumber: {
    typed: Number,
    default: 0,
  },
  Description: {
    typed: String,
    default: '',
  },
}, {timestamps: true});


const workShope=mongoose.model("workShope",workShopeScheme);

module.exports=workShope;