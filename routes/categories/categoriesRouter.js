const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("../../controllers/categories/category");

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggin, createCategory);
categoriesRouter.get("/", getCategories);
categoriesRouter.delete("/:id", isLoggin, deleteCategory);
categoriesRouter.put("/:id", isLoggin, updateCategory);

module.exports = categoriesRouter;
