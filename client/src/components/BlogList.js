import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogCard from './BlogCard'
import { useEffect } from 'react'

const BlogList = () => {
  const navigate = useNavigate()
  useEffect(() => {
   if(!localStorage.getItem("token")){
     navigate("/")
   }
  }, [])
  
  return (
    <div>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        </div>
  )
}

export default BlogList