import React, { useState } from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import {ImBlogger} from "react-icons/im"
import {AiOutlineUser} from "react-icons/ai"
const Register = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState({
    show: false,
    errMsg: "",
  });
  const navigate = useNavigate();
  const submitData = () => {
    
    axios
      .post(`/signup`, userDetails)
      .then((response) => {
        localStorage.setItem("data", JSON.stringify(response.data));
        navigate("/Home/Blog");
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setMsg({
            ...msg,
            show: true,
            errMsg: error.response.data.errors[0].msg,
          });
        } else {
          setMsg({ ...msg, show: true, errMsg: error.response.data.msg });
        }
      });
  };
  // To handle the Default
  const handleSubmit = (event) => {
    event.preventDefault();
    // To submit the Data
    submitData();
  };

  return (
    <div className="h-screen  flex flex-wrap sm:flex-nowrap justify-center">
      <div className="flex sm:w-1/2 w-full  bg-gradient-to-r from-cyan-500 to-blue-500 justify-around items-center">
        <div>
        <div className='flex items-center ml-2 px-2 py-1 gap-1 text-cyan-200 bg-sky-600  rounded-lg'>
          <ImBlogger size={"1.3rem"}></ImBlogger>
          <h1 className='font-extrabold tracking-wide text-2xl'>LOG-HUNT</h1>
        </div>


          <p className="text-white mt-1 text-xs sm:text-md">The most popular blogging platform</p>
        </div>
      </div>
      <div className="flex sm:w-1/2 w-full justify-center items-center bg-white">
        <form className="bg-white" onSubmit={(e)=>handleSubmit(e)}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <AiOutlineUser className="text-gray-400"></AiOutlineUser>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="username"
              value={userDetails.username}
              placeholder="username"
              onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="email"
              name="email"
              value={userDetails.email}
              id="email"
              placeholder="Email Address"
              onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              value={userDetails.password}
              id="password"
              placeholder="Password"
              onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-sky-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Register
          </button>
          <Link to="/">
      <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Already have an account ?</span>
      </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
