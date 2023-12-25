var express = require("express");
var router = express.Router();

const studentController = require("../controllers/student");

router.get('/',studentController.dashboard);
router.get("/viewQuiz", studentController.viewQuiz);
router.post("/attemptquiz/:regNo", studentController.attemptQuiz);
router.get("/viewAssignment", studentController.viewAssignment);
router.post("/submitassignment/:regNo", studentController.submitAssignment);
router.get("/viewMaterial", studentController.viewMaterial);
router.get('/material/:id',studentController.downloadMaterial);
router.get("/viewGrade", studentController.viewGrade);
router.get('/result',studentController.viewMarks);

module.exports = router;
