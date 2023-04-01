import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {AiFillEdit} from "react-icons/ai";
import { ThreeDots } from 'react-loader-spinner';
import { BASEURL } from '../constants'
import WithScrollPosition from "../hoc/WithScrollPosition"

const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const data = JSON.parse(localStorage.getItem("data"));
  const params = useParams();
  const getPost = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${BASEURL}/post/${params.id}`,
        headers: { "auth-token": data.token },
      });

      setPost(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);

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
                {post.title} {data.id === post.author._id && (<span className="inline-block my-auto">
                <Link className="flex justify-center" to={`/Home/edit/${post._id}`}>
            <AiFillEdit></AiFillEdit>
           
          </Link>
                </span>)}
              </h1>
              <p className=" text-xs text-gray-600">{post.summary}</p>
              <p
                className="mb-8 leading-relaxed "
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WithScrollPosition(BlogDetails);
