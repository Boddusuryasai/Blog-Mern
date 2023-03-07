import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlogCard from './BlogCard'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from "../Redux/PostsSlice"

const UserPosts = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector(state => state.posts);
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
   if(!localStorage.getItem("data")){
     navigate("/")
   }
  }, [])
  useEffect(() => {
    dispatch(getPostsAsync(data.token));
  }, [dispatch, data.token]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
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

export default UserPosts