import axios from "axios";
import {useState, useEffect} from 'react'


export default function Upload(){
   const [message, setMessage] = useState('')
   const [selectedFile, setSelectedFile] = useState(null)
   const [imgPath, setImgPath] = useState('')

   const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
   }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (selectedFile){
      const formData = new FormData();
      formData.append('upload',selectedFile);
      const response = await axios.post('http://127.0.0.1:8000/api/upload/',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setMessage('Uploaded Sucessfully')
      setImgPath(response.data.upload)
    }
    else{
      setMessage('No image uploaded')
    }
  }

   return(
    <div>
      <form onSubmit = {handleSubmit}>
        <h1>Upload your images here</h1>
        <input type="file" onChange = {handleFileInput}/><br/><br/>
        <img src = {imgPath?`http://localhost:8000${imgPath}`: ''}
         style={{ width: '200px', height: 'auto', margin: '10px' }}/>
        <button>Upload</button>
        <p>{message}</p>
      </form>
    </div>
   )
}













































































// import { useState } from 'react';
// import axios from 'axios';

// export default function Upload() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('upload', selectedFile);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('Image uploaded successfully');
//     } catch (error) {
//       setMessage('Error uploading image');
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Image</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <p>{message}</p>
//     </div>
//   );
// }
   