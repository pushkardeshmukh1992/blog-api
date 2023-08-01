const express = require("express");
const multer = require("multer");

const isLoggin = require("../../middlewares/isLoggin");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  disLikePost,
  claps,
  schedule,
  getPublicPosts,
} = require("../../controllers/posts/posts");
const {
  checkAccountVerification,
} = require("../../middlewares/isAccountVerified");
const storage = require("../../utils/fileUpload");

const postsRouter = express.Router();

// file upload middleware
const upload = multer({
  storage,
});

postsRouter.get("/", isLoggin, getPosts);
postsRouter.get("/public", getPublicPosts);

postsRouter.get("/:id", getPost);
postsRouter.put("/:id", isLoggin, updatePost);
postsRouter.post(
  "/",
  isLoggin,
  checkAccountVerification,
  upload.single("file"),
  createPost
);
postsRouter.delete("/:id", isLoggin, deletePost);
postsRouter.put("/likes/:id", isLoggin, likePost);
postsRouter.put("/dislikes/:id", isLoggin, disLikePost);
postsRouter.put("/claps/:id", isLoggin, claps);
postsRouter.put("/schedule/:postId", isLoggin, schedule);

module.exports = postsRouter;
