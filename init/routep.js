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
  try {
    const { title, imageUrl, content } = req.body.blog;
    const newPost = new Post({
      title,
      image: imageUrl,
      content,
      author: req.user._id,
    });
    await newPost.save();
    req.flash("success", "Post created successfully!");
    res.redirect("/gohome");
  } catch (err) {
    console.error("Error creating post:", err);
    req.flash("error", "Failed to create post. Please fill all required fields.");
    res.redirect("/create");
  }
});

module.exports = router;
