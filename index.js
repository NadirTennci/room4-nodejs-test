// Load environment variables from .env file
require("dotenv").config();

// Express JS
const express = require("express");
const app = express();

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

// ------------

const port = process.env.APP_PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
