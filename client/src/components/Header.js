import React from 'react'
import { Link ,useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout =()=>{
    localStorage.clear();
    navigate("/")

  }
  return (
    <div className='flex justify-between py-5 items-center shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500' >
        <Link to="/Home/Blog">
        <h3 className='font-bold text-white px-3 text-xl'>MY BLOG</h3></Link>
        <Link to="/Home/CreatePost">
          <div className='text-white font-semibold'>Create New Post</div>
        </Link>
        <Link to="/" onClick={handleLogout}>
        <div className='font-semibold text-white px-3 text-xl'>Logout</div>
        </Link>
    </div>
  )
}

export default Header