import { useState } from "react";
import axios from "axios"
import { BsFillReplyFill } from "react-icons/bs";
import { BASEURL } from "../constants";
export default Comment =({comments,getPost})=>{
    const [isVisible,setIsvisible] = useState(false)
    const [reply,setReply] = useState("")
    const data = JSON.parse(localStorage.getItem("data"));
  
    const addReply = async(e)=>{
      e.preventDefault()
      try {
        const res = await axios
        .post(`${BASEURL}/addcomment`, 
          {
            "onModel":"Comment",
             "content":reply,
             "targetId":comments._id,
             "comments":[]
        },{ headers: { "auth-token": data.token }})
        setReply("")
        setIsvisible(true)
        getPost()
      } catch (error) {
        console.log(error)
      }
     }
  
  
    const showInput=()=>{
      setIsvisible(!isVisible)
    }
    return (
        <div className='flex items-center w-full border p-3 gap-2 bg-slate-100'>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="w-full">
                <h1 className='font-bold text-gray-800'>{comments?.author?.username} </h1>
                <div className="flex justify-between w-full">
                <p className='font-medium text-gray-600'>{comments?.content}</p>
                <BsFillReplyFill onClick={showInput}></BsFillReplyFill>
                </div>
                {isVisible && (<form onSubmit={addReply}>
                <input type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none focus:border-sky-500"
                 value={reply} onChange={e=>setReply(e.target.value)}  placeholder="add reply to the comment"/>
                </form>)}
            </div>
        </div>
    )
  }