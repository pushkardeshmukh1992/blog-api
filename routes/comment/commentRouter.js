const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const { createComment } = require("../../controllers/comments/comments");

const commentRouter = express.Router();

commentRouter.post("/:postId", isLoggin, createComment);

module.exports = commentRouter;
