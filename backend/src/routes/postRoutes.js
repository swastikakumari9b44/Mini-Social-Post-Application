const express = require("express");
const {
  getPosts,
  createPost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
} = require("../controllers/postController");
const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, upload.single("image"), createPost);
router.delete("/:id", protect, deletePost);

router.post("/:id/like", protect, toggleLike);

router.post("/:id/comments", protect, addComment);
router.delete("/:id/comments/:commentId", protect, deleteComment);

module.exports = router;
