// Express JS
const express = require("express");
const router = express.Router();

const productCategoryController = require("../controllers/product_category.controller");

// Product CRUD
// ------------

// Get all product categories
router.get("/", productCategoryController.getAll);

// Get product category by id
router.get("/:id", productCategoryController.getByID);

// Create new product category
router.post("/", productCategoryController.create);

// Update product category
router.put("/:id", productCategoryController.update);

// Delete product category
router.delete("/:id", productCategoryController.delete);

// ------------

module.exports = router;
