const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const {
  createComment,
  deleteComment,
  updateComment,
} = require("../../controllers/comments/comments");

const commentRouter = express.Router();

commentRouter.post("/:postId", isLoggin, createComment);
commentRouter.put("/:id", isLoggin, updateComment);
commentRouter.delete("/:id", isLoggin, deleteComment);

module.exports = commentRouter;
