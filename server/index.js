const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express()
app.use(cors())

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+'-'+ file.originalname)
    }
})

const upload = multer({storage})

app.get('/', (req,res) =>{
    res.send("Server Cholche..")
})

app.post('/upload', upload.single("file"),(req,res,)=>{
    console.log("req receiver for file upload...")
    if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ error: "No file uploaded." });
    }

    console.log("Uploaded File:", req.file);
    res.json({ message: "Upload success!", file: req.file });
})


app.listen(3001, () =>{
    console.log('server is running on port 3001')
})