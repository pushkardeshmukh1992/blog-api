const asyncHandler = require("express-async-handler");
const Category = require("../../model/Category/Category");
const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");

//@desc Create comment
//@route POST /api/v1/comments/:postId
//@access private

exports.createComment = asyncHandler(async (req, res) => {
  const { message, author } = req.body;
  const postId = req.params.postId;

  //   throw new Error("Commennt already exists");

  //   const categoryFound = await Comment.findOne({ name });

  //   if (categoryFound) {
  //     throw new Error("Category already exists");
  //   }

  const comment = await Comment.create({
    message,
    author: req.userAuth?._id,
    postId,
  });

  await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: comment._id,
      },
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "Commennt successfully created",
    comment,
  });
});
