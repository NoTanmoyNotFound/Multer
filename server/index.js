const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage });

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send("Server is running..");
});

// File Upload Route
app.post('/upload', upload.single("file"), (req, res) => {
    console.log("Request received for file upload...");
    if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ error: "No file uploaded." });
    }

    console.log("Uploaded File:", req.file);
    res.json({ fileUrl: `/uploads/${req.file.filename}` }); // Correct response
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
