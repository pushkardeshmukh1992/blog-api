const http = require("http");
const express = require("express");
const usersRouter = require("./routes/users/usersRouter");
require("./config/database")();

//!Server

const app = express();

// middlewares

app.use(express.json()); // pass incoming data

// Routes
app.use("/api/v1/users", usersRouter);

//! Error middleware
app.use((err, req, res, next) => {
  console.log("in middleware");
  console.log(err);

  const status = err?.status ? err?.status : "failed";

  const message = err?.message;

  const stack = err?.stack;

  res.status(500).json({
    status,
    message,
    stack,
  });
});

const server = http.createServer(app);
//? Start the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`Server is running on ${PORT}`));
