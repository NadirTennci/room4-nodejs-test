// Express JS
const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// Product CRUD
// ------------

/**
 * @swagger
 * definitions:
 *  Product:
 *   type: object
 *   properties:
 *    product_category_id:
 *     type: int
 *     description: product category id
 *     example: 1
 *    name:
 *     type: string
 *     description: product name
 *     example: 'headphones'
 *    price_per_unit:
 *     type: float
 *     description: price per unit
 *     example: 1.99
 *    quantity_in_stock:
 *     type: int
 *     description: quantity in stock
 *     example: 100
 */

/**
 * Get all products
 * @swagger
 * /api/products:
 *  get:
 *   summary: get all products
 *   description: get all products
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Unauthorized
 */
router.get("/", productController.getAll);

/**
 * Get product by id
 * @swagger
 * /api/products/{id}:
 *  get:
 *   summary: get product by id
 *   description: get product by id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: product id
 *      example: 1
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Unauthorized
 */
router.get("/:id", productController.getByID);

/**
 * Create new product
 * @swagger
 * /api/products:
 *  post:
 *   summary: create a product
 *   description: create a product with given data
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Product'
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 */
router.post("/", productController.create);

/**
 * Update product with id = {id}
 * @swagger
 * /api/products/{id}:
 *  put:
 *   summary: update a product
 *   description: update a product with given data
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: product id
 *      example: 1
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Product'
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 */
router.put("/:id", productController.update);

/**
 * Delete product with id = {id}
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   summary: delete a product
 *   description: delete a product with given data
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: product id
 *      example: 1
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 */
router.delete("/:id", productController.delete);

// ------------

module.exports = router;
