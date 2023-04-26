import { useState } from "react";
import React from "react";
import axios from "axios";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { BASEURL } from "../constants";

const BlogCard = ({
  title,
  summary,
  cover,
  author,
  createdAt,
  likes,
  _id,
  getPosts,
  comments,
}) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const [liked, setLiked] = useState(likes?.find((a) => a.user === data.id));
  const [count, setCount] = useState(likes?.length || 0);
  const handleLike = async (e) => {
    e.preventDefault();
    try {
      setLiked(!liked);
      liked
        ? setCount((prevCount) => prevCount - 1)
        : setCount((prevCount) => prevCount + 1);
      const res = await axios({
        method: "post",
        url: `${BASEURL}/likes/${_id}`,
        headers: { "auth-token": data.token },
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };
  function countComments(comments) {
    let count = comments.length;
    for (const comment of comments) {
      count += countComments(comment?.comments);
    }
    return count;
  }
  const niceDate = new Date(createdAt).toLocaleString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });
  return (
    <div className="flex justify-center  md:justify-start gap-8 flex-wrap md:flex-nowrap  my-6 border p-4 border-white  shadow-[0px_5px_12px_#F1F5F9] rounded-lg">
      <div className=" w-[90%] md:w-2/3 max-w-sm rounded-lg ">
        <img className="rounded-lg" src={cover} alt="blog "></img>
      </div>
      <div className="w-full ">
        <h2 className="text-2xl font-medium mb-2">{title}</h2>
        <h6 className="font-semibold text-sky-600 flex items-center gap-1">
          {" "}
          <span className="inline-block w-6 h-6  rounded-full bg-slate-200"></span>
          {author.username}
          <span className="px-3 text-xs">{niceDate}</span>
        </h6>
        <p className="text-lg  text-gray-600">{summary}</p>
       
        <div className="flex items-center bg-cyan-50 gap-4 " >
          <button
            className="flex items-center gap-2  py-1 px-2 rounded-md text-white focus:border-none"
            onClick={(event) => handleLike(event)}
          >
            {" "}
            <span className="text-gray-400">likes-{count} </span>
            {liked ? <FcLike size={20} /> : <FcLikePlaceholder size={20} />}
          </button>
          <div> Comments - {countComments(comments)}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
