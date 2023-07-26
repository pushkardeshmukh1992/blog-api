const asyncHandler = require("express-async-handler");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const Category = require("../../model/Category/Category");
const postsRouter = require("../../routes/post/postRouter");

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

  // check if user account is verified

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

//@desc Get all posts
//@route GET /api/v1/posts
//@access public

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("comments");

  res.status(201).json({
    status: "success",
    message: "Posts successfully created",
    posts,
  });
});

//@desc Get single post
//@route GET /api/v1/post/:id
//@access public

exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Posts successfully created",
    post,
  });
});

//@desc Delete post
//@route DELETE /api/v1/posts/:id
//@access private

exports.deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Posts successfully deleted",
  });
});

//@desc Update post
//@route PUT /api/v1/posts/:id
//@access private

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "success",
    message: "Post successfully updated",
    post,
  });
});

//@desc Liking a post
//@route PUT /api/v1/posts/likes/:id
//@access Private

exports.likePost = asyncHandler(async (req, res) => {
  // get the id of the post
  const { id } = req.params;
  // get the loginn user
  const userId = req.userAuth._id;

  // finnd the post
  const post = await Post.findById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  // Push the user into post likes
  await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { likes: userId },
    },
    {
      new: true,
    }
  );

  post.dislikes = post.dislikes.filter(
    (dislike) => dislike.toString() !== userId.toString()
  );

  await post.save();

  res.status(200).json({
    message: "Post liked successfully",
    post,
  });

  // Remove the user from the dislikes array if present

  // const userHasLiked = post.likes.some(
  //   (like) => like.toString() === userId.toString()
  // );

  // if (!userHasLiked) {
  //   throw new Error("User has already liked this post");
  // }
});
