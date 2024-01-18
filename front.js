const fs = require("node:fs")
const express = require("express")
const app = express()
const axios = require("axios")
const cors= require('cors')
app.use(cors())

app.get('/',(req,res)=>{
    let a= fs.readFileSync('frontend.html')
    res.send(a.toString()) 
})

app.get('/userdata',(req,res)=>{
    let a= fs.readFileSync('userdata.html')
    res.send(a.toString()) 
})

app.get('/edit',(req,res)=>{
    let a= fs.readFileSync('edit.html')
    res.send(a.toString()) 
})


app.listen(8081, ()=>{
    console.log("Server started at port")
})