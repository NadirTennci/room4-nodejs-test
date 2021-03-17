// Express JS
const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// Product CRUD
// ------------

// Get all products
router.get("/", productController.getAll);

// Get product by id
router.get("/:id", productController.getByID);

// Create new product
router.post("/", productController.create);

// Update product
router.put("/:id", productController.update);

// Delete product
router.delete("/:id", productController.delete);

// ------------

module.exports = router;
