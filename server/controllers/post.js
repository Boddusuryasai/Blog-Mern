
const Post = require("../models/post");
const Comment = require("../models/comment")
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
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("author", ["username"])
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
        options: { sort: { createdAt: -1 } },
      })
      .lean();

    function populateNestedComments(comments) {
      return Promise.all(
        comments.map(async (comment) => {
          if (comment.comments && comment.comments.length > 0) {
            comment.comments = await populateNestedComments(
              await Comment.find({ _id: { $in: comment.comments } })
                .populate({
                  path: "author",
                  select: "username",
                })
                .populate({
                  path: "comments",
                  populate: {
                    path: "author",
                    select: "username",
                  },
                })
                .lean()
            );
          }
          return comment;
        })
      );
    }

    await populateNestedComments(post.comments);

    res.status(200).json({
      success: true,
      post,
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



exports.likePost = async (req, res) => {
  const  postId  = req.params.id;
  const { user } = req;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingLike = post.likes.find(
      (like) => like.user.toString() === user,
    );

    if (existingLike) {
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== user,
      );
    } else {
      post.likes.push({ user: user });
    }

    await post.save();

    res.status(200).json(post.likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addComment = async(req,res)=>{
  try {
    const { content, onModel, targetId } = req.body;
    const userId = req.user
    if(onModel == 'Post') {
      var target = await Post.findById(targetId).select("-content");
      } else if(onModel == 'Comment') {
          var  target = await Comment.findById( targetId);
      } else {
          throw new Error('unknown model to post comment');
      }
    const newComment = new Comment({
      content,
     author: userId,
      onModel,
      target:targetId,
      comments: []
    });

    const savedComment = await newComment.save();
    target.comments.push(savedComment);
    await target.save();
    res.status(200).json({success:true,message:"comment created Successfully"})
  }
  catch(error){
    console.log(error)
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }


}
