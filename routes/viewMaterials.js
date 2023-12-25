const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");

// Route to get all materials
router.get("/materials", materialController.getAllMaterials);

module.exports = router;
