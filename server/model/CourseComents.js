const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    feedBack: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("courseComments", commentSchema);
