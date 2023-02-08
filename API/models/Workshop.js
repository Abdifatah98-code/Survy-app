const mongoose = require("mongoose");

const workShopeScheme = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  startDate: {
    type:  Date,
    
  },
  endDate: {
    type:   Date,
    // default: "",
  },
  participant:{
    type: Number,
    default: "",
  },
  description: {
    type: String,
    // default: "",
  },
}, {timestamps: true});


const workShope=mongoose.model("workShope",workShopeScheme);

module.exports=workShope;