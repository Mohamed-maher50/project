const { default: mongoose } = require("mongoose");
const Post = require("../model/Post");
const User = require("../model/useSchema");
const getAllPosts = async (req, res) => {
  try {
    const usersPosts = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.userId),
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "followingsPostes",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "followingsPostes.posts",
          foreignField: "_id",
          as: "potes",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "posts",
          foreignField: "_id",
          as: "posts",
        },
      },
      {
        $project: {
          post: {
            $concatArrays: ["$potes", "$posts"],
          },
        },
      },
      {
        $unwind: "$post",
      },
      {
        $lookup: {
          from: "users",
          localField: "post.author",
          foreignField: "_id",
          as: "post.author",
          pipeline: [
            {
              $project: {
                email: 1,
                AvatarUrl: 1,
                fullName: 1,
              },
            },
          ],
        },
      },
      {
        $sort: {
          "post.createdAt": -1,
        },
      },
    ]);

    res.send(usersPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  getAllPosts,
};
