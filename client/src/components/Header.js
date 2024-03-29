import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import {ImBlogger} from "react-icons/im"
import {AiOutlineLogout} from "react-icons/ai"

const Header = () => {
  const [isVisible , setIsVisible] = useState(false)
  const navigate = useNavigate()

  const handleLogout =()=>{
    localStorage.clear();
    navigate("/")

  }
  return (
    <div className='fixed w-full z-50  top-0 left-0 flex justify-between py-5 items-center shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500' >
        <Link to="/Home/Blog">
        <div className='flex items-center ml-2 sm:px-2 py-1 gap-1 text-white  rounded-lg'>
          <ImBlogger size={"1.3rem"}></ImBlogger>
          <h1 className='font-extrabold tracking-wide text-xs sm:text-[18px]'>LOG-HUNT</h1>
        </div>
</Link>
        <Link to="/Home/CreatePost">
          <div className='text-white font-semibold text-xs sm:text-lg'>Create New Post</div>
        </Link>
        <Link to="/Home/UserPosts">
          <div className='text-white font-semibold text-xs sm:text-lg'>Your Posts</div>
        </Link>
        <div className='relative' >
        <AiOutlineLogout 
            className="mr-2 text-white cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 focus:outline-none hover:bg-sky-600 rounded-xl text-2xl"
          onClick={()=>setIsVisible(!isVisible)}></AiOutlineLogout>
          {isVisible && <button className=' absolute right-2 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 border-none text-white rounded-2xl text-xs sm:text-lg font-semibold' onClick={handleLogout}>Logout</button>
}
        </div>
    </div>
  )
}

export default Header