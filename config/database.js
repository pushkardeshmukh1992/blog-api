const mongoose = require("mongoose");

//connect to db

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pushkar2192:zE4Yc1KdqyliFwfT@cluster0.efo3l7l.mongodb.net/mern-blog?retryWrites=true&w=majority"
    );
    console.log("DB has been connected");
  } catch (error) {
    console.log("db connection failed", error.message);
  }
};

module.exports = connectDB;

// pushkar2192
// zE4Yc1KdqyliFwfT
