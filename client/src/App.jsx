import { useState, useRef } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const fileRef = useRef(null);
  const [selectFile, setSelectFile] = useState(false);


  const handleFileChange = (e)=>{
    fileRef.current = e.target.files[0];
    setSelectFile(true);
    console.log("selected file: ",fileRef.current);
  }

  const handleSubmit = async () => {
    if (!fileRef.current) {
        alert("Please select a file first!");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("file", fileRef.current);

        console.log("Sending file to backend...");

        const res = await axios.post("http://localhost:3001/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Server response:", res.data);
        alert("File uploaded successfully!");
    } catch (error) {
        console.error("Upload failed:", error);
    }
};

  return (
    <>
      <div className="card">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Upload Now</button>
      </div>
    </>
  )
}

export default App
