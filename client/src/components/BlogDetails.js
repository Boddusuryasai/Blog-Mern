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
  console.log(post, data.id, post?.author);
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      {post && data.id === post.author._id && (
        <div className="flex justify-center mt-3 ">
          <Link className="flex justify-center" to={`/Home/edit/${post._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      {post && (
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-5 items-center justify-center flex-col">
            <img
              className="lg:w-2/3 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
              alt="hero"
              src={post.cover}
            />
            <div className="text-left lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {post.title}
              </h1>
              <p className=" text-xs text-gray-600">{post.summary}</p>
              <p
                className="mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;
