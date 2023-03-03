import React from "react";

const BlogCard = () => {
  return (
    <div className="flex gap-2 justify-center  my-6 border py-2 border-white bg-white shadow-[0px_2px_8px_#29b0ff]">
      <div className="w-2/3 ">
        <img 
          src="https://res.cloudinary.com/dybiiddob/image/upload/v1677313928/pexels-roman-odintsov-4551832_jucm2z.jpg"
          alt="blog "
        ></img>
      </div>
      <div>
        <h2 className="text-2xl font-medium mb-2">
          Note that the development build is not optimized. To create a
          production build,
        </h2>
        <p className="text-lg  text-gray-600">
          Note that the development build is not optimized. To create a
          production build, Note that the development build is not optimized. To
          create a production build,Note that the development build is not optimized. To create a
          production build, Note that the development build is not optimized. To
          create a production build,
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
