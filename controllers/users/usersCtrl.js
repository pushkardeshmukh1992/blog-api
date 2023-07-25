const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

//@desc Register a new user
//@route POST /api/v1/users/register
//@access public

const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");

exports.register = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  //! check if user exists

  const user = await User.findOne({ username });

  if (user) {
    throw new Error("User already exists");
  }

  const newUser = new User({
    username,
    email,
    password,
  });

  //! hash password

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  await newUser.save();

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    //   _id: newUser?._id,
    //   usernnname: newUser?.username,
    //   email: newUser?.email,
    //   role: newUser?.role,
    newUser,
  });
});

//@desc Login user
//@route POST /api/v1/users/login
//@access public

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid login credentials");
  }

  //compare the hashed password with the one the request
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }

  //Update last login
  user.lastLogin = new Date();

  await user.save();

  res.json({
    status: "success",
    email: user?.email,
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    token: generateToken(user),
  });
});

//@desc get profile
//@route POST /api/v1/users/profile/:id
//@access private

exports.getProfile = asyncHandler(async (req, res) => {
  const id = req.userAuth.id;

  const user = await User.findById(id);

  res.json({
    status: "success",
    message: "Profile fetched",
    user,
  });
});

//@desc Block user
//@route PUT /api/v1/users/block/:userIdToBlock
//@access private

exports.blockUser = asyncHandler(async (req, res) => {
  // find the user to block

  const userIdToBlock = req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);

  if (!userToBlock) {
    throw new Error("User to block not found");
  }

  // user who is blocking

  const userBlocking = req.userAuth._id;

  // check if iser is blocking him/herself

  if (userIdToBlock.toString() === userBlocking.toString()) {
    throw new Error("Can not block yourself");
  }

  // find the current user

  const currentUser = await User.findById(userBlocking);

  // check if user already blocked

  if (currentUser?.blockedUsers?.includes(userIdToBlock)) {
    throw new Error("User already blocked");
  }

  // push user to blocked users array

  currentUser?.blockedUsers.push(userIdToBlock);
  await currentUser.save();

  res.json({
    message: "User blocked successfully",
    status: "success",
  });
});

//@desc Unblock user
//@route PUT /api/v1/users/unblock/:userIdToUnBlock
//@access private

exports.unblockUser = asyncHandler(async (req, res) => {
  // find the user to block

  const userIdToUnBlock = req.params.userIdToUnBlock;
  const userToUnBlock = await User.findById(userIdToUnBlock);

  if (!userToUnBlock) {
    throw new Error("User to unblock not found");
  }

  // user who is blocking

  const userUnBlocking = req.userAuth._id;

  // check if iser is blocking him/herself

  if (userIdToUnBlock.toString() === userUnBlocking.toString()) {
    throw new Error("Can not block yourself");
  }

  // find the current user

  const currentUser = await User.findById(userUnBlocking);

  // check if user already blocked

  if (!currentUser?.blockedUsers?.includes(userIdToUnBlock)) {
    throw new Error("User to be unblock not found");
  }

  // remove user from blocked users array

  currentUser.blockedUsers = currentUser?.blockedUsers.filter(
    (id) => id.toString() !== userIdToUnBlock.toString()
  );
  await currentUser.save();

  res.json({
    message: "User unblocked successfully",
    status: "success",
  });
});
