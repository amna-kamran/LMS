var express = require("express");
var router = express.Router();

const studentController = require("../controllers/student");

router.get('/result',studentController.viewMarks);

module.exports = router;
