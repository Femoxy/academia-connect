const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    
    students:{
        type:mongoose.Schema.ObjectId,
        ref:'studentData',
    },
    timetable:{
        type:mongoose.Schema.ObjectId,
        ref:'TimeTables',
    },
    schoolFee:{
        type:mongoose.Schema.ObjectId,
        ref:'schoolFee'
    },
    assignment:{
        type:mongoose.Schema.ObjectId,
        ref:'assignment'
    }
},{timestamps:true})

const classes = mongoose.model('classModel', classSchema)

module.exports = classes

