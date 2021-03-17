// Load environment variables from .env file
require("dotenv").config();

// Express JS
const express = require("express");
const app = express();

// Middleware to parse json body
app.use(express.json());

// Routes import
// ------------

app.get("/api/", (req, res) => {
  return res.send("Node JS API");
});

// ------------

const port = process.env.APP_PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
