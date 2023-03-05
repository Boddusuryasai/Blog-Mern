const express = require("express");
const {
  home,
  createPost,
  getPosts,
  editPost,
  deletePost,
  getPost
  
} = require("../controllers/post");
const getAccountUser = require("../middleware/getAccountUser")
const singleFileUpload = require("../middleware/multer")



const router = express.Router();

router.get("/", home);
const signup = require("../controllers/signup")
const login = require("../controllers/login")
const { body } = require('express-validator');
router.post("/login",login)
router.post("/signup",  [
    body('username', 'Enter a valid name').isLength({ min: 4 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],signup)
router.post("/post", getAccountUser , singleFileUpload,createPost);
// router.get("/posts", getAllPosts);
router.get("/posts",getAccountUser ,getPosts);
router.get("/post/:id",getAccountUser ,getPost);
router.put("/post/:id",getAccountUser,singleFileUpload, editPost);
router.delete("/post/:id",getAccountUser, deletePost);
module.exports = router;
