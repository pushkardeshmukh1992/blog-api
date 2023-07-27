const express = require("express");
const multer = require("multer");

const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
  profileViewers,
  followingUser,
  unFollowingUser,
  forgotPassword,
  resetPassword,
  accountVerificationnEmail,
  verifyAccount,
} = require("../../controllers/users/usersCtrl");
const isLoggin = require("../../middlewares/isLoggin");
const storage = require("../../utils/fileUpload");

const usersRouter = express.Router();

// file upload middleware
const upload = multer({
  storage,
});

usersRouter.post("/register", upload.single("profilePicture"), register);
usersRouter.post("/login", login);
usersRouter.get("/profile", isLoggin, getProfile);
usersRouter.put("/block/:userIdToBlock", isLoggin, blockUser);
usersRouter.put("/unblock/:userIdToUnBlock", isLoggin, unblockUser);
usersRouter.get("/profile-viewer/:userProfileId", isLoggin, profileViewers);
usersRouter.put(
  "/account-verification-email",
  isLoggin,
  accountVerificationnEmail
);
usersRouter.put("/verify-account/:verifyToken", isLoggin, verifyAccount);
usersRouter.put("/following/:userToFollowId", isLoggin, followingUser);
usersRouter.put("/unfollowing/:userIdToUnFollow", isLoggin, unFollowingUser);
usersRouter.post("/forgot-password", forgotPassword);
usersRouter.post("/reset-password/:resetToken", resetPassword);

module.exports = usersRouter;
