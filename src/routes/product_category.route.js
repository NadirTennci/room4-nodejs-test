// Express JS
const express = require("express");
const router = express.Router();

const productCategoryController = require("../controllers/product_category.controller");

// Product CRUD
// ------------

/**
 * @swagger
 * definitions:
 *  ProductCategory:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: product category name
 *     example: 'electronics'
 */

/**
 * Get all product categories
 * @swagger
 * /api/product/categories:
 *  get:
 *   summary: get all product categories
 *   description: get all product categories
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Unauthorized
 */
router.get("/", productCategoryController.getAll);

/**
 * Get product category by id
 * @swagger
 * /api/product/categories/{id}:
 *  get:
 *   summary: get product category by id
 *   description: get product category by id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: product category id
 *      example: 1
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Unauthorized
 */
router.get("/:id", productCategoryController.getByID);

/**
 * Create new product category
 * @swagger
 * /api/product/categories:
 *  post:
 *   summary: create a product category
 *   description: create a product category with given data
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ProductCategory'
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Unauthorized
 *    409:
 *     description: Conflict
 */
router.post("/", productCategoryController.create);

/**
 * Update product category with id = {id}
 * @swagger
 * /api/product/categories/{id}:
 *  put:
 *   summary: update a product category
 *   description: update a product category with given data
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: product category id
 *      example: 1
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ProductCategory'
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Unauthorized
 *    409:
 *     description: Conflict
 */
router.put("/:id", productCategoryController.update);

/**
 * Delete product category with id = {id}
 * @swagger
 * /api/product/categories/{id}:
 *  delete:
 *   summary: delete a product category
 *   description: delete a product category with given data
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: product category id
 *      example: 1
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 */
router.delete("/:id", productCategoryController.delete);

// ------------

module.exports = router;
