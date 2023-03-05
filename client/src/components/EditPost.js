import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
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
  const getPost = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `/post/${params.id}`,
        headers: { "auth-token": data.token },
      });

      setTitle(res.data.posts.title);
      setSummary(res.data.posts.summary);
      setContent(res.data.posts.content);
      
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
        url: `/post/${id}`,
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={handleImgUpload} />
        {img && <img src={imgPrev} alt="Uploaded file" />}
        <ReactQuill
          value={content}
          modules={modules}
          onChange={(newValue) => setContent(newValue)}
        />
        <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2 mt-3 text-white">
          CreatePost
        </button>
      </form>
    </div>
  );
}

export default EditPost;
