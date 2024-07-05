const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    title:{
        type:String
    },
   description:{
    type:String
   },
   dueDate:{
    typr:String
   },
    students:{
        type:mongoose.Schema.ObjectId,
        ref:'studentData',
    },
    classes:{
        type:mongoose.Schema.ObjectId,
        ref:'classes'
    }
},{timestamps:true})

const assignment = mongoose.model('assignment',assignmentSchema)

module.exports = assignment