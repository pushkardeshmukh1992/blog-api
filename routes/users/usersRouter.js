const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
} = require("../../controllers/users/usersCtrl");
const isLoggin = require("../../middlewares/isLoggin");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/profile", isLoggin, getProfile);
usersRouter.put("/block/:userIdToBlock", isLoggin, blockUser);
usersRouter.put("/unblock/:userIdToUnBlock", isLoggin, unblockUser);

module.exports = usersRouter;
