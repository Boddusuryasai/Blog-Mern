const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments:[
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
