const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express()
app.use(cors())

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

app.get('/', (req,res) =>{
    res.send("ok")
})

app.post('/upload', (req,res,file)=>{
    console.log(file)
})


app.listen(3001, () =>{
    console.log('server is running on port 3001')
})