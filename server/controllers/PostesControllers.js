const Post = require("../model/Post");
const User = require("../model/useSchema");
const getAllPosts = async (req, res) => {
  const posts = await Post.find({ user: req.userId });
  const usersPosts = await User.findById(req.userId)
    .populate({
      path: "following",
      select: "-password",
      populate: {
        path: "posts",
        select: "-following",
      },
    })
    .select("following");

  res.send(usersPosts);
};
module.exports = {
  getAllPosts,
};
