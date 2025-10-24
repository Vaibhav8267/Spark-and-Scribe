const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const { isLoggedIn, forceLogin } = require("./auth");


// Show Add New Post Page
router.get("/create", forceLogin, (req, res) => {
  res.render("create.ejs");
});


// Handle New Post Submission
router.post("/create", isLoggedIn, async (req, res) => {
  const { title, description, content, image } = req.body;
  const newPost = new Post({
    title,
    description,
    content,
    image,
    author: req.user._id,
  });
  await newPost.save();
  req.flash("success", "Post created successfully!");
  res.redirect("/home");
});

module.exports = router;
