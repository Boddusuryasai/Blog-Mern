import React, { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate ,Link } from "react-router-dom";
import {ImBlogger} from "react-icons/im"
import { BASEURL } from '../constants'

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const[isLoading,setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const submitData = () => {
    
    axios
      .post(`http://localhost:4000/login`, userDetails)
      .then((response) => {
        localStorage.setItem("data", JSON.stringify(response.data));
        setIsLoading(false)
        navigate("/Home/Blog");
      })
      .catch((error) => {
        setError(error?.response?.data)
        setIsLoading(false)
      });
  };
 

  useEffect(()=>{
    if(localStorage.getItem("data") !== null && localStorage.getItem("data") !== undefined && localStorage.getItem("data") !== "undefined"){
      const data = JSON.parse(localStorage.getItem("data"));
    if(data?.token!=null) {navigate("/Home/Blog")}
    }
    
  },[])
  // To handle the Default
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)
    // To submit the Data
    submitData();
  };
  return (
   
<div className="h-screen flex flex-wrap sm:flex-nowrap justify-center ">
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
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
        <input className="pl-2 outline-none border-none" type="text"
         name="email" id="email" placeholder="Email Address" 
         value={userDetails.email}
         onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
         />
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <input className="pl-2 outline-none border-none" type="password" 
       name="password"
       value={userDetails.password}
       id="password"
       placeholder="Password" autoComplete="current-password"
       onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
     />
      </div>
      <button type="submit" disabled={isLoading} className="block w-full bg-sky-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
      <Link to="/register">
      <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Dont have an account ?</span>
      </Link>
    </form>
  </div>
</div>
  )
}

export default Login