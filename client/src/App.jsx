import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [selectFile, setSelectFile] = useState(null)


  const handleFileChange = (e)=>{
    console.log(e.target.files[0]) 
    console.log(selectFile)
  }

  const handleSubmit = async() =>{
    try {
      const formData = new FormData()
    } catch (error) {
      console.log(error)
    }
  }

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
