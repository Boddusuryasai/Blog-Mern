
const Post = require("../models/post");
const getDataUri = require("../utils/dataUri")
const cloudinary = require("cloudinary")
exports.home = (req, res) => {
  res.send("Hello  Home ");
};

exports.createPost = async (req, res) => {
  try {
    const {  title,
        summary,
        content,
        } = req.body;
        const file = req.file
        const fileUri = getDataUri(file)
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content)
        if ( !title || !summary || !content ) {
      throw new Error("All fields are mandotory");
    }
    
    const post = await Post.create({ title,
        summary,
        content,
        cover:cloud.secure_url,  author:req.user });
    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPosts = async (req, res) => {
  try {
   
    const posts = await Post.find().populate('author', ['username'])
    .sort({createdAt: -1});
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getUserPosts = async (req, res) => {
  try {
    console.log(req.user)
    const authorId = req.user;
    
    const posts = await Post.find({ author: authorId }).populate('author', ['username'])
    .sort({createdAt: -1});
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getPost = async (req, res) => {
  try {
    const {id} = req.params
    const posts = await Post.findById(id).populate('author', ['username'])
    console.log(posts);
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
exports.editPost = async (req, res) => {
  try {
    const {  title,
      summary,
      content,
      } = req.body;
    let post = await Post.findById(req.params.id);
        if (!post) { return res.status(404).send("Not Found") }
        if (post.author?.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }
        const file = req.file
        const fileUri = getDataUri(file)
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content)
    post = await Post.findByIdAndUpdate(req.params.id, { title,
      summary,
      content,
      cover:cloud.secure_url,  author:req.user });
    res.status(200).json({
      success: true,
      message: "post updated Successfully",
      post
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    let post = await Post.findById(postId);
        if (!post) { return res.status(404).send("Not Found") }

        if (post.author?.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }
     post = await Post.findByIdAndDelete(postId);
    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
