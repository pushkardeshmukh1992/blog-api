const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const {
  createCategory,
  getCategories,
} = require("../../controllers/categories/category");

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggin, createCategory);
categoriesRouter.get("/", getCategories);

module.exports = categoriesRouter;
