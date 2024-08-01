import axios from "axios";
import {useState, useRef, useCallback} from 'react'
import Loader from './loader'
import { FaCheckCircle } from "react-icons/fa";
import '../src/app/globals.css'

export default function Upload(){
   const [message, setMessage] = useState('')
   const [imgPath, setImgPath] = useState('')
   const [loading, setLoading] = useState(false)
   const fileInputRef = useRef(null)
   const clipboardRef = useRef(null)

  const handleClipboard = () => {
    clipboardRef.current.select()
    clipboardRef.current.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(clipboardRef.current.value)
  }
  const handleSubmit = async (file) => {

    if (file){
      setLoading(true)
      const formData = new FormData();
      formData.append('upload',file);
      const response = await axios.post('https://0403.pythonanywhere.com/api/upload/',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response)
      setLoading(false)
      setMessage('Uploaded Sucessfully')
      setImgPath(response.data.upload)
    }
    else{
      setMessage('No image uploaded')
    }
  }
  console.log(response)
  const handleFileInput = (e) => {
    handleSubmit(e.target.files[0])
}
const onDrop = useCallback((event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (files && files[0]) {
    handleSubmit(files[0]);
  }
}, []);
   return(
    <div className="min-h-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white h-auto border-4 rounded-xl  w-80 py-4">
      {loading?<Loader/>:
        <section className="p-3  flex flex-col justify-center items-center">
          {message == 'Uploaded Sucessfully'?
          <div className="flex items-center gap-2">
          <h1 className=" text-xl text-[#4F4F4F]">Uploaded Sucessfully</h1>
            <FaCheckCircle className=" text-3xl text-green-500"/>
          </div>
          :
          <>
            <h1 className="p-3 text-xl text-[#4F4F4F]">load your image</h1>
            <p className="text-xs text-slate-500">File should be Jpeg, Png,...</p>
          </>}
          <div className="border-8 h-52 w-full bg-slate-100 rounded my-5 border-dotted border-slate-300"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}>
            {/* <p className="absolute top-[50%] left-[50%] ">Hi</p> */}
            <input type="file" onChange = {handleFileInput} className=" hidden" ref={fileInputRef}/>
            <div className="h-full w-full rounded">
            <img src = {imgPath?`http://localhost:8000${imgPath}`: ' '} className="h-full w-full"/> 
            </div> 
          </div>
          <div className="">
          {message == 'Uploaded Sucessfully'?
          <div className="flex">
            <input type="text" value={`http://localhost:8000${imgPath}`} ref={clipboardRef} className="border-2 bg-slate-200 p-2 text-slate-500"/>
            <button className="bg-blue-500 p-2 rounded text-white" onClick={handleClipboard}>Copy URL</button>
          </div>
          :
          <>
            <p className="py-2 text-xl text-slate-500 text-center">OR</p>
            <button className="bg-blue-500 p-2 rounded text-white" onClick={()=>{fileInputRef.current.click()}}>Upload your image</button>
          </>}
          </div>
          {/* <p>{message}</p> */}
      </section>}
      </div>
    </div>
   )
}























































        
