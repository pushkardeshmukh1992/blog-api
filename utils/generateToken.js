const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // create payload for user
  console.log("generate token");

  const payload = {
    user: {
      id: user.id,
    },
  };

  // Sig nthe token with secret key

  const token = jwt.sign(payload, "anykey", {
    expiresIn: 36000, // Expires after 1 hour
  });

  return token;
};

module.exports = generateToken;
