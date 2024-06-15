const express = require('express');
require('./config/appConfig');
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.port

app.use(cors('*'))
app.use(express.json())
app.get('/',(req, res)=>{
    res.send("Welcome to Academia-connect")
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})