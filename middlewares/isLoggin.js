const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const isLoggin = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(" ")[1];

  // Verify the ntoken
  jwt.verify(token, "anykey", async (err, decoded) => {
    // add user to request object

    const userId = decoded?.user.id;

    const user = await User.findById(userId).select("usernname email role _id");

    req.userAuth = user;

    if (err) {
      return "Invalid token";
    } else {
      next();
    }
  });
};
module.exports = isLoggin;
