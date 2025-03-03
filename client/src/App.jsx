import { useState, useRef } from 'react';
import axios from 'axios';

function App() {
  const fileRef = useRef(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    fileRef.current = e.target.files[0];
    setPreview(URL.createObjectURL(fileRef.current)); // Preview before upload
  };

  const handleSubmit = async () => {
    if (!fileRef.current) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", fileRef.current);

      const res = await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedFileUrl(`http://localhost:3001${res.data.fileUrl}`);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload a File</h2>

        {/* Preview before upload */}
        {preview && (
          <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-3 border" />
        )}

        {/* Uploaded file preview */}
        {uploadedFileUrl && (
          <img src={uploadedFileUrl} alt="Uploaded File" className="w-full h-40 object-cover rounded-lg mb-3 border" />
        )}

        <input 
          type="file" 
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-3"
          onChange={handleFileChange}
        />

        <button 
          onClick={handleSubmit} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Now"}
        </button>
      </div>
    </div>
  );
}

export default App;
