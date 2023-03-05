import React from "react";

const BlogCard = ({title,summary,url}) => {
  return (
    <div className="flex gap-2  my-6 border py-2 border-white bg-white shadow-[0px_2px_8px_#29b0ff]">
      <div className="w-2/3 max-w-sm ">
        <img 
          src={url}
          alt="blog "
        ></img>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-medium mb-2">
          {title}
        </h2>
        <p className="text-lg  text-gray-600">
          {summary}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
