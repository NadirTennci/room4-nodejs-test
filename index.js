// Load environment variables from .env file
require("dotenv").config();

// Express JS
const express = require("express");
const app = express();

// Swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "ROOM4 Test Task API",
      description: "ROOM4 test task api library documentation",
      version: "1.00",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const { checkToken } = require("./src/middlewares/jwt.middleware");

// Middleware to parse json body
app.use(express.json());

// Routes import
// ------------

// Import user routes
const userRoutes = require("./src/routes/user.route");
app.use("/api/user", userRoutes);

// Import product categories routes
const productCategoryRoutes = require("./src/routes/product_category.route");
app.use("/api/product/categories", checkToken, productCategoryRoutes);

// Import products routes
const productRoutes = require("./src/routes/product.route");
app.use("/api/products", checkToken, productRoutes);

// ------------

// Launch server
const port = process.env.APP_PORT || 5000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

// Export server for Mocha Chai testing
module.exports = server;
