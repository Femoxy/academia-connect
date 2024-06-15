const { error } = require('console');
const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DB
mongoose.connect(DB)
.then(()=>{
    console.log('Database Connection Established')
}).catch((error)=>{
    console.log(error.message)
})