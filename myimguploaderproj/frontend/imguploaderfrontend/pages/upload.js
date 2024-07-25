import axios from "axios";
import {useState} from 'react'
import Loader from './loader'
import '../src/app/globals.css'

export default function Upload(){
   const [message, setMessage] = useState('')
   const [selectedFile, setSelectedFile] = useState(null)
   const [imgPath, setImgPath] = useState('')
   const [loading, setLoading] = useState(false)

   const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
   }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (selectedFile){
        setLoading(true)
      const formData = new FormData();
      formData.append('upload',selectedFile);
      const response = await axios.post('http://127.0.0.1:8000/api/upload/',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setLoading(false)
      setMessage('Uploaded Sucessfully')
      setImgPath(response.data.upload)
    }
    else{
      setMessage('No image uploaded')
    }
  }

   return(
    <div className="min-h-screen bg-white">
        {loading?<Loader/>:
        <form onSubmit = {handleSubmit} className="">
        <h1 className="underline text-3xl text-red-700">Upload your images here</h1>
        <input type="file" onChange = {handleFileInput}/><br/><br/>
        <img src = {imgPath?`http://localhost:8000${imgPath}`: ''}
         style={{ width: '200px', height: 'auto', margin: '10px' }}/>
        <button>Upload</button>
        <p>{message}</p>
      </form>}
    </div>
   )
}























































