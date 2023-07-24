const asyncHandler = require("express-async-handler");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const Category = require("../../model/Category/Category");

//@desc Create post
//@route POST /api/v1/posts
//@access private

exports.createPost = asyncHandler(async (req, res) => {
  const { title, content, categoryId } = req.body;

  // check if post exist
  const postFound = await Post.findOne({ title });

  if (postFound) {
    throw new Error("Post already exist");
  }

  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
  });

  await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );

  await Category.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "Post successfully created",
    post,
  });
});
