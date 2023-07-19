const http = require("http");
const express = require("express");
const usersRouter = require("./routes/users/usersRouter");
const {
  notFound,
  globalErrHandler,
} = require("./middlewares/globalErrorHandler");
const categoriesRouter = require("./routes/categories/categoriesRouter");
require("./config/database")();

//!Server

const app = express();

// middlewares

app.use(express.json()); // pass incoming data

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoriesRouter);

//? NNot found middleware

app.use(notFound);

//! Error middleware
app.use(globalErrHandler);

const server = http.createServer(app);
//? Start the server

const PORT = process.env.PORT || 9080;
server.listen(PORT, console.log(`Server is running on ${PORT}`));
