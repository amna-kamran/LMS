var express = require("express");
var router = express.Router();


const head = require("../controllers/head");

router.post('/result', head.getStudentResultByregNo);
router.get('/viewClasses', head.viewAllClasses);

module.exports = router;