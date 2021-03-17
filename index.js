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

app.listen(5000, () => console.log("Listening on port 5000"));
