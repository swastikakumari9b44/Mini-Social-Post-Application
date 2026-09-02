const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    text: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const likeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    user: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      username: { type: String, required: true },
    },
    text: { type: String, trim: true, maxlength: 2000, default: "" },
    image: { type: String, default: "" },
    likes: { type: [likeSchema], default: [] },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

postSchema.pre("validate", function (next) {
  if (!this.text && !this.image) {
    return next(new Error("Post must contain text or an image"));
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
