import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlogCard from './BlogCard'
import { useEffect,useState } from 'react'
import axios from 'axios'

const BlogList = () => {
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
        url: `/posts`,
        headers: { "auth-token": data.token },
      });
     
     setPosts([...res.data.posts])
      
    } catch (error) {
      console.log(error);
    }
    console.log(posts);
   
  };
  useEffect(()=>{
    getPosts()
      
  },[])
  
  return (
    <div>
      {posts && posts.map((post)=>{
         return  (<Link to={`/Home/Blog/${post._id}`}>
         <BlogCard key={post._id} title={post.title} summary={post.summary} url={post.cover} content={post.content}/> </Link>)
      })}
        
    </div>
  )
}

export default BlogList