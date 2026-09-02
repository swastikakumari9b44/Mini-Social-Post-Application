const Post = require("../models/Post");

const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Post.countDocuments();

    res.status(200).json({
      success: true,
      data: posts,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const trimmedText = (text || "").trim();

    let imageUrl = "";
    if (req.file) {
      // Cloudinary storage exposes `path` as the secure URL; local disk storage uses filename
      imageUrl = req.file.path && req.file.path.startsWith("http")
        ? req.file.path
        : `/uploads/${req.file.filename}`;
    }

    if (!trimmedText && !imageUrl) {
      return res.status(400).json({ success: false, message: "Post must contain text or an image" });
    }

    const post = await Post.create({
      user: { userId: req.user.userId, username: req.user.username },
      text: trimmedText,
      image: imageUrl,
    });

    res.status(201).json({ success: true, message: "Post created", data: post });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    if (post.user.userId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this post" });
    }
    await post.deleteOne();
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const userId = req.user.userId;
    const existingIndex = post.likes.findIndex((like) => like.userId.toString() === userId);

    let liked;
    if (existingIndex > -1) {
      post.likes.splice(existingIndex, 1);
      liked = false;
    } else {
      post.likes.push({ userId, username: req.user.username });
      liked = true;
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: liked ? "Post liked" : "Post unliked",
      data: { likes: post.likes, likesCount: post.likes.length, liked },
    });
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const trimmedText = (text || "").trim();

    if (!trimmedText) {
      return res.status(400).json({ success: false, message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const comment = {
      userId: req.user.userId,
      username: req.user.username,
      text: trimmedText,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    const savedComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      success: true,
      message: "Comment added",
      data: { comment: savedComment, commentsCount: post.comments.length },
    });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this comment" });
    }

    comment.deleteOne();
    await post.save();

    res.status(200).json({ success: true, message: "Comment deleted", data: { commentsCount: post.comments.length } });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPosts, createPost, deletePost, toggleLike, addComment, deleteComment };
