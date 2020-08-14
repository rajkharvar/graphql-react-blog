const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    username: String,
    createdAt: String,
    comments: [
      {
        username: String,
        text: String,
        createdAt: String,
      },
    ],
    likes: [
      {
        username: String,
        createdAt: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const post = mongoose.model("Post", postSchema);

module.exports = post;
