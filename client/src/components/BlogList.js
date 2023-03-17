import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlogCard from './BlogCard'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner';
import { BASEURL } from '../constants'

const BlogList = () => {
  const [posts ,setPosts] = useState([])
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data.token);
  useEffect(() => {
   if(!localStorage.getItem("data")){
     navigate("/")
   }
  }, [])
  const getPosts = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${BASEURL}/posts`,
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
  if(posts.length===0){
    return (
      <div className="flex items-center justify-center h-screen">
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
  return (
    <div>
      {posts && posts.map((post)=>{
         return  (<Link to={`/Home/Blog/${post._id}`} key={post._id}>
         <BlogCard key={post._id} {...post}/> </Link>)
      })}
        
    </div>
  )
}

export default BlogList