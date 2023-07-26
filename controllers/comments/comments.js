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

//@desc Delete commennt
//@route DELETE /api/v1/comments/:id
//@access private

exports.deleteComment = asyncHandler(async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Comments successfully deleted",
  });
});

//@desc Update comment
//@route PUT /api/v1/comments/:id
//@access private

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      message: req.body.message,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Comments successfully updated",
    category: comment,
  });
});
