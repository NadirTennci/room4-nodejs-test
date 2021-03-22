const router = require("express").Router();

const userController = require("../controllers/user.controller");

/**
 * @swagger
 * definitions:
 *  UserToRegister:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: username
 *     example: 'John'
 *    login:
 *     type: string
 *     description: user email
 *     example: 'john@doe.com'
 *    password:
 *     type: string
 *     description: user password
 *     example: 'helloworld'
 *  UserToLogin:
 *   type: object
 *   properties:
 *    login:
 *     type: string
 *     description: user email
 *     example: 'john@doe.com'
 *    password:
 *     type: string
 *     description: user password
 *     example: 'helloworld'
 */

/**
 * @swagger
 * /api/user/register:
 *  post:
 *   summary: register user
 *   description: register the user with credentials provided
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserToRegister'
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    409:
 *     description: Conflict
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /api/user/login:
 *  post:
 *   summary: login user
 *   description: login the user with credentials provided
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserToLogin'
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    401:
 *     description: Access denied
 *    404:
 *     description: Not found
 */
router.post("/login", userController.login);

module.exports = router;
