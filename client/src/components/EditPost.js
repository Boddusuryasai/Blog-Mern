import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { BASEURL } from '../constants';
import { ThreeDots } from 'react-loader-spinner';
const EditPost = () => {
  const params = useParams();
  const { id } = params;
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imgPrev, setImgPrev] = useState("");
  const [img, setImg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const data = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();
  useEffect(() => {
   if(!localStorage.getItem("data")){
     navigate("/")
   }
  }, [])
  const getPost = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${BASEURL}/post/${params.id}`,
        headers: { "auth-token": data.token },
      });
      setTitle(res.data.post.title);
      setSummary(res.data.post.summary);
      setContent(res.data.post.content);
      imgPrev && setImgPrev(res.data.post.cover)
      
    } catch (error) {
      console.log(error);
    }
}

  useEffect(() => {
   
     getPost()
  }, []);
  const updatePost = async (formData) => {
    try {
      const res = await axios({
        method: "put",
        url: `${BASEURL}/post/${id}`,
        data: formData,
        headers: { "auth-token": data.token },
      });
      navigate("/Home/Blog");
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };
  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImgPrev(reader.result);
      setImg(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("file", img);
    updatePost(formData);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
 
  return (
    <div className="relative mt-24">
      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-50 opacity-50 flex justify-center items-center">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      )}
      <form onSubmit={handleSubmit} className={isSubmitting ? "opacity-50" : ""}>
    
      <div className="grid gap-6 mb-6 md:grid-cols-2 p-4 ">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full p-2.5 focus:outline-none "
            id="file_input"
            type="file" 
            onChange={handleImgUpload}
          />
           <div >
        {<img className="w-24 h-24" src={imgPrev} alt="Uploaded file" /> }
        </div>
        </div>
       
        <ReactQuill
          value={content}
          modules={modules} required
          onChange={(newValue) => setContent(newValue)}
          className="mb-16 md:mb-0"
        />
        <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2  text-white">
          UpdatePost
        </button>
      </div>
    </form>
    
  </div>
  );
}

export default EditPost;
