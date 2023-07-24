const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../../controllers/posts/posts");

const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.get("/:id", getPost);
postsRouter.put("/:id", isLoggin, updatePost);
postsRouter.post("/", isLoggin, createPost);
postsRouter.delete("/:id", isLoggin, deletePost);

module.exports = postsRouter;
