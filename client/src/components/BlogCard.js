import React from "react";

const BlogCard = ({title,summary,cover,author ,createdAt}) => {
  const niceDate = new Date(createdAt).toLocaleString('en-IN', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
  return (
    <div className="flex gap-2  my-6 border py-2 border-white bg-white shadow-md">
      <div className="w-2/3 max-w-sm ">
        <img 
          src={cover}
          alt="blog "
        ></img>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-medium mb-2">
          {title}
        </h2>
        <h6 className="font-semibold text-sky-600">{author.username}
        <span className="px-3 text-xs">{niceDate}</span></h6>
        <p className="text-lg  text-gray-600">
          {summary}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
