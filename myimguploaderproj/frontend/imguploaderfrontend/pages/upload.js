import axios from "axios";
import {useState, useRef} from 'react'
import Loader from './loader'
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
    <div className="min-h-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white w-auto h-auto border-4 rounded-xl  min-w-80">
      {loading?<Loader/>:
        <section className="p-3  flex flex-col justify-center items-center">
          {message == 'Uploaded Sucessfully'?
          <h1 className=" text-xl text-[#4F4F4F]">Uploaded Sucessfully</h1>
          :
          <>
            <h1 className="p-3 text-xl text-[#4F4F4F]">Upload your image</h1>
            <p className="text-xs text-slate-500">File should be Jpeg, Png,...</p>
          </>}
          <div className="border-8 h-52 w-full bg-slate-100 rounded my-5 border-dotted border-slate-300">
            {/* <p className="">Hi</p> */}
            <input type="file" onChange = {handleFileInput} className=" hidden" ref={fileInputRef}/>
            <div className="h-full w-full rounded">
            <img src = {imgPath?`http://localhost:8000${imgPath}`: ' '} className="h-full w-full"/> 
            </div> 
          </div>
          <div className="">
          {message == 'Uploaded Sucessfully'?

          <div className="flex">
            <input type="text" value={`http://localhost:8000${imgPath}`} ref={clipboardRef} className="border-2 bg-slate-200 p-2 text-slate-500"/>
            <button className="bg-blue-500 p-2 rounded text-white" onClick={handleClipboard}>Copy to clipboard</button>
          </div>
          :<button className="bg-blue-500 p-2 rounded text-white" onClick={()=>{fileInputRef.current.click()}}>Upload your image</button>}
          </div>
          {/* <p>{message}</p> */}
      </section>}
      </div>
    </div>
   )
}























































        