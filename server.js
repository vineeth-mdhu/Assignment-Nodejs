const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const apiMiddleware = require('./routes/apiMiddleware.js')
const app=express()
dotenv.config()

app.use(express.static(__dirname + '/public'))

app.set('view engine','ejs')

mongoose.connect(process.env.DB_CONNECT,(err)=>{
    if(err)
    console.log(err)
    else
    console.log('db connected')
})

app.use(bodyParser.json())

app.get('/',apiMiddleware,(req,res)=>{
    res.render('index',{results:req.results})
})


app.listen(8000,()=>{
    console.log('Server running')
})