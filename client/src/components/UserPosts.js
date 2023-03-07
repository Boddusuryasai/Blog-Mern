import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlogCard from './BlogCard'
import { useEffect,useState } from 'react'
import axios from 'axios'

const UserPosts = () => {
  const [posts ,setPosts] = useState([])
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
   if(!localStorage.getItem("data")){
     navigate("/")
   }
  }, [])
  const getPosts = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `/userposts`,
        headers: { "auth-token": data.token },
      });
     
     setPosts([...res.data.posts])
      
    } catch (error) {
      console.log(error);
    }
  
   
  };
  useEffect(()=>{
    getPosts()
      
  },[])
  
  return (
    <div>
      {posts && posts.map((post)=>{
         return  (<Link to={`/Home/Blog/${post._id}`} key={post._id}>
         <BlogCard key={post._id} {...post}/> </Link>)
      })}
        
    </div>
  )
}

export default UserPosts