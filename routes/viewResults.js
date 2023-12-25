const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");

// Route to get all results
router.get("/results", resultController.getAllResults);

// Route to get a specific result by ID
router.get("/results/:id", resultController.getResultById);

module.exports = router;
