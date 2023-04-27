import React from "react";
import { useParams ,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {AiFillEdit } from "react-icons/ai";
import {FaTrash} from "react-icons/fa"
import { ThreeDots } from 'react-loader-spinner';
import { BASEURL } from '../constants'
import WithScrollPosition from "../hoc/WithScrollPosition"
import CommentsList from "./CommentsList";

const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const [comment,setComment] = useState("")
  const data = JSON.parse(localStorage.getItem("data"));
  const params = useParams();
  const navigate = useNavigate()
  useEffect(() => {
   if(!localStorage.getItem("data")){
     navigate("/")
   }
  }, [])
  const getPost = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${BASEURL}/post/${params.id}`,
        headers: { "auth-token": data.token },
      });

      setPost(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete =async()=>{
    try {
      const res = await axios
      .delete(`http://localhost:4000/post/${params.id}`, 
      { headers: { "auth-token": data.token }})
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPost();
  }, []);
   const addComment = async(e,comment,model,targetId)=>{
    e.preventDefault()
    try {
      const res = await axios
      .post(`http://localhost:4000/addcomment`, 
        {
          "onModel":model,
           "content":comment,
           "targetId":targetId,
           "comments":[]
      },{ headers: { "auth-token": data.token }})
      setComment("")
      getPost()
    } catch (error) {
      console.log(error)
    }
    

   }
  //Early return
  if(post===null){
    return (
    <div className="flex items-center justify-center h-screen">
    <ThreeDots color="#00BFFF" height={80} width={80} />
  </div> )
  }

  return (
    <div className="mt-24">
      {post && (
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex  py-5 items-center justify-center flex-col">
            <img
              className="lg:w-2/3 md:w-3/6  w-5/6 mb-10 h-72  rounded"
              alt="hero"
              src={post.cover}
            />
            <div className="text-left lg:w-2/3 w-full">
              <h1 className="title-font flex justify-between items-center sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {post.title} {data.id === post.author._id && (<div className="flex space-x-2 my-auto">
                <Link className="flex justify-center" to={`/Home/edit/${post._id}`}>
                <AiFillEdit></AiFillEdit>
                </Link>
                <FaTrash size={".90em"} onClick={handleDelete} className="cursor-pointer"></FaTrash>
                </div>)}
              </h1>
              <p className=" text-xs text-gray-600">{post.summary}</p>
              <p
                className="mb-8 leading-relaxed "
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></p>
            </div>
            <div className="flex ">
            </div>
            <div className="w-full lg:w-2/3">
              <form onSubmit={(e)=>addComment(e,comment,"Post",params.id)}>
                <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none focus:border-sky-500"
                placeholder="Add Your Comment here...."></input>
                
              </form>
            <CommentsList comments={post?.comments} getPost={getPost}/>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WithScrollPosition(BlogDetails);
