const mongoose = require("mongoose")

const payment = new mongoose.Schema({
    name: {
    type:String,
    required: true
    },
    contact:{
    type:String,
    required: true
    },
    paymentID:{
    type: String,
    required: true
    },
    paymentStatus: {
    type: Boolean,
    default: false
    }
}) 

const paymentModel = mongoose.model('schoolFee', payment)
module.exports = paymentModel