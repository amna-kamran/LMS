const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher");

// Route to add a quiz
router.post("/addquiz", teacherController.addQuiz);
router.delete("/:id", teacherController.deleteQuiz);

// New route for viewing attempted quizzes
router.get("/viewattquiz", teacherController.viewAttemptedQuizzes);

router.get("/downloadattquiz", teacherController.downloadAttemptedQuizzes);

//  Add Delete Update Marks Routes
router.put("/quiz/addMarks/:qID/:sID", teacherController.addMarksController);
router.delete("/quiz/:id", teacherController.deleteMarksController);
router.put("/updatemarks/:aid", teacherController.updateMarksController);

module.exports = router;
