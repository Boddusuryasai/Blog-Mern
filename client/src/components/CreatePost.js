import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [imgPrev,setImgPrev] = useState("");
  const [img,setImg] = useState("");
  const token = localStorage.getItem("token");
  const createPost = async (formData) => {
    try {
      const res = await axios({
        method: "post",
        url: `http://localhost:4000/post`,
        data: formData,
        headers: { "auth-token": token },
      });
     
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
    setImgPrev(reader.result);
    setImg(file)
    }
    reader.readAsDataURL(file);
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
   const formData = new FormData()
   formData.append("title" , title)
   formData.append("summary" , summary)
   formData.append("content" , content)
   formData.append("file" , img)


    createPost(formData)
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="title"
          placeholder={'Title'}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder={'Summary'}
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <input type="file" onChange={handleImgUpload} />
        {img && <img src={imgPrev} alt="Uploaded file" />}
        <ReactQuill value={content} modules={modules} onChange={newValue => setContent(newValue)} />
        <button className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-2 mt-3 text-white'>CreatePost</button>
      </form>
    </div>
  )
}

export default CreatePost;
