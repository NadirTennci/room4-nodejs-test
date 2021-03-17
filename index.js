// Load environment variables from .env file
require("dotenv").config();

// Express JS
const express = require("express");
const app = express();

// Middleware to parse json body
app.use(express.json());

// Routes import
// ------------

// Import user routes
const userRoutes = require("./src/routes/user.route");
app.use("/api/user", userRoutes);

// ------------

const port = process.env.APP_PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
