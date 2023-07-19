const asyncHandler = require("express-async-handler");
const Category = require("../../model/Category/Category");

//@desc Create category
//@route POST /api/v1/categories
//@access private

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, author } = req.body;

  const categoryFound = await Category.findOne({ name });

  if (categoryFound) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name: name,
    author: req.userAuth?._id,
  });

  res.status(201).json({
    status: "success",
    message: "Category successfully created",
    category,
  });
});

//@desc Get all categories
//@route GET /api/v1/categories
//@access public

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.status(201).json({
    status: "success",
    message: "Categories successfully created",
    categories,
  });
});
