const mongoose = require("mongoose");

//connect to db

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB has been connected");
  } catch (error) {
    console.log("db connection failed", error.message);
  }
};

module.exports = connectDB;

// pushkar2192
// zE4Yc1KdqyliFwfT
