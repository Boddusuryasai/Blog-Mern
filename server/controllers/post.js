
const Post = require("../models/post");

exports.home = (req, res) => {
  res.send("Hello  Home ");
};

exports.createPost = async (req, res) => {
  try {
    const {  title,
        summary,
        content,
        cover} = req.body;
        if ( !title || !summary || !content || !cover) {
      throw new Error("All fields are mandotory");
    }
    
    const post = await Post.create({ title,
        summary,
        content,
        cover,  author:req.user });
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
   
    const posts = await Post.find({ author: req.user });
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
    let post = await Post.findById(req.params.id);
        if (!post) { return res.status(404).send("Not Found") }
        if (post.author?.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }
    post = await Post.findByIdAndUpdate(req.params.id, { title:req.body.title,
        summary:req.body.summary,
        content:req.body.content,
        cover:req.body.cover });
    res.status(200).json({
      success: true,
      message: "post updated Successfully",
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
