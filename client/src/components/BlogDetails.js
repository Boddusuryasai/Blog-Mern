import React from "react";
import { useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogDetails = () => {
  const [post, setPost] = useState([]);
  const data = JSON.parse(localStorage.getItem("data"));
  const params = useParams();
  const getPost = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `/post/${params.id}`,
        headers: { "auth-token": data.token },
      });

      setPost([res.data.posts]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(post[0]?.content
    );
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      {post &&
        post.map((post) => {
          return (
            <div key={post._id} className="flex gap-2  my-6 border py-2 border-white bg-white shadow-[0px_2px_8px_#29b0ff]">
              <div className="w-2/3 max-w-sm ">
                <img src={post.cover} alt="blog "></img>
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-medium mb-2">{post.title}</h2>
                <p className="text-lg  text-gray-600">{post.summary}</p>
                <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BlogDetails;
