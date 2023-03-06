import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const data = JSON.parse(localStorage.getItem("data"));
  const params = useParams();
  const getPost = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `/post/${params.id}`,
        headers: { "auth-token": data.token },
      });

      setPost(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(post,data.id , post?.author);
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
       {post && data.id === post.author._id && (
        <div className="flex justify-center mt-3 ">
          <Link className="flex justify-center" to={`/Home/edit/${post._id}`} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      {post && <div key={post._id} className="flex gap-2  my-6 border py-2 border-white bg-white shadow-[0px_2px_8px_#29b0ff]">
              <div className="w-2/3 max-w-sm ">
                <img src={post.cover} alt="blog "></img>
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-medium mb-2">{post.title}</h2>
                <p className="text-lg  text-gray-600">{post.summary}</p>
                <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
        
        }
    </div>
  );
};

export default BlogDetails;
