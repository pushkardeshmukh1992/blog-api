const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../controllers/users/usersCtrl");
const isLoggin = require("../../middlewares/isLoggin");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/profile", isLoggin, getProfile);

module.exports = usersRouter;
