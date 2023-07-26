const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
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

module.exports = postsRouter;
