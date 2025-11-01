const express = require("express");
const router = express.Router();
const User = require("../model/user");
const UserProfile = require("../model/userprofile");
const Post = require("../model/post");
const { isLoggedIn } = require("./auth");

// View profile
router.get("/user/:username", isLoggedIn, async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    req.flash("error", "User not found!");
    return res.redirect("/gohome");
  }

  // Get or create profile if missing
  let profile = await UserProfile.findOne({ userId: user._id });
  if (!profile) profile = await UserProfile.create({ userId: user._id });

  const posts = await Post.find({ author: user._id });
  res.render("profile.ejs", { profileUser: user, profile, posts, currentUser: req.user });
});

// Follow
router.post("/user/:username/follow", isLoggedIn, async (req, res) => {
  const target = await User.findOne({ username: req.params.username });
  const current = req.user;
  if (!target || target._id.equals(current._id)) return res.redirect("back");

  const targetProfile = await UserProfile.findOne({ userId: target._id });
  const currentProfile = await UserProfile.findOne({ userId: current._id });

  if (!targetProfile.followers.includes(current._id)) {
    targetProfile.followers.push(current._id);
    currentProfile.following.push(target._id);
    await targetProfile.save();
    await currentProfile.save();
  }

  res.redirect(`/user/${target.username}`);
});

// Unfollow
router.post("/user/:username/unfollow", isLoggedIn, async (req, res) => {
  const target = await User.findOne({ username: req.params.username });
  const current = req.user;

  const targetProfile = await UserProfile.findOne({ userId: target._id });
  const currentProfile = await UserProfile.findOne({ userId: current._id });

  targetProfile.followers = targetProfile.followers.filter(
    id => !id.equals(current._id)
  );
  currentProfile.following = currentProfile.following.filter(
    id => !id.equals(target._id)
  );

  await targetProfile.save();
  await currentProfile.save();

  res.redirect(`/user/${target.username}`);
});

module.exports = router;
