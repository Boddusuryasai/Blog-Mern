import React from "react";

const BlogCard = ({title,summary,cover,author ,createdAt}) => {
  const niceDate = new Date(createdAt).toLocaleString('en-IN', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
  return (
    <div className="flex justify-center  md:justify-start gap-8 flex-wrap md:flex-nowrap  my-6 border p-4 border-white  shadow-[0px_5px_12px_#F1F5F9] rounded-lg">
      <div className=" w-[90%] md:w-2/3 max-w-sm rounded-lg ">
        <img  className="rounded-lg"
          src={cover}
          alt="blog "
        ></img>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-medium mb-2">
          {title}
        </h2>
        <h6 className="font-semibold text-sky-600 flex items-center gap-1"> <span className="inline-block w-6 h-6  rounded-full bg-slate-200"></span>{author.username}
        <span className="px-3 text-xs">{niceDate}</span></h6>
        <p className="text-lg  text-gray-600">
          {summary}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
