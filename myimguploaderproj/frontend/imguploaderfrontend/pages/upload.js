import axios from "axios";
import {useState, useRef} from 'react'
import Loader from './loader'
import '../src/app/globals.css'

export default function Upload(){
   const [message, setMessage] = useState('')
   const [imgPath, setImgPath] = useState('')
   const [loading, setLoading] = useState(false)
   const fileInputRef = useRef(null)


  const handleSubmit = async (file) => {

    if (file){
      setLoading(true)
      const formData = new FormData();
      formData.append('upload',file);
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
  const handleFileInput = (e) => {
    handleSubmit(e.target.files[0])
}
   return(
    <div className="min-h-screen bg-green-400 flex justify-center items-center">
      <div className="bg-white w-auto h-auto border-4 rounded-xl">
      {loading?<Loader/>:
        <section className="">
        <h1 className=" text-xl text-[#4F4F4F]">Upload your image</h1>
        <input type="file" onChange = {handleFileInput} className="opacity-0" ref={fileInputRef}/><br/><br/>
        <img src = {imgPath?`http://localhost:8000${imgPath}`: ''}
         style={{ width: '200px', height: 'auto', margin: '10px' }}/>
        <button className="bg-red-500" onClick={()=>{fileInputRef.current.click()}}>Upload your image</button>
        <p>{message}</p>
      </section>}
      </div>
    </div>
   )
}























































       