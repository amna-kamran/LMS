const express = require("express");
const router = express.Router();
const materialController = require("../controllers/material");

// Route to get all materials
router.get("/materials", materialController.getAllMaterials);

module.exports = router;
