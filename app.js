// app.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, "src/public")));
// Set the custom views directory path
app.set("views", path.join(__dirname, "src/views"));

// Route
app.use("", require("./src/routers"));
app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Hello, World!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
