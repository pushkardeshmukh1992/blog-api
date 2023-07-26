const express = require("express");
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
} = require("../../controllers/posts/posts");
const {
  checkAccountVerification,
} = require("../../middlewares/isAccountVerified");

const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.get("/:id", getPost);
postsRouter.put("/:id", isLoggin, updatePost);
postsRouter.post("/", isLoggin, checkAccountVerification, createPost);
postsRouter.delete("/:id", isLoggin, deletePost);
postsRouter.put("/likes/:id", isLoggin, likePost);
postsRouter.put("/dislikes/:id", isLoggin, disLikePost);
postsRouter.put("/claps/:id", isLoggin, claps);

module.exports = postsRouter;
