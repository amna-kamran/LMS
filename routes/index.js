const express = require("express");
const router = express.Router();

// Index Route
router.get("/", (req, res) => {
  res.send("Welcome to the Learning Management System");
  // You can send an HTML file or render a specific landing page here
});

module.exports = router;
