const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher");

// Route to add a quiz
router.post("/addquiz", teacherController.addQuiz);
router.delete("/:id", teacherController.deleteQuiz);

// New route for viewing attempted quizzes
router.get("/viewattquiz", teacherController.viewAttemptedQuizzes);

router.get("/downloadattquiz", teacherController.downloadAttemptedQuizzes);

// Routes for assignments
router.post("/addassignment/:courseId", teacherController.addAssignment);
router.get("/viewsubmittedassignments/:teacherId", teacherController.viewSubmittedAssignments);
router.get("/downloadassignment/:assignmentId", teacherController.downloadSubmittedAssignments);
router.delete("/deleteassignment/:assignmentId", teacherController.deleteAssignment);

// Routes for materials
router.post("/addmaterial", teacherController.addMaterial);
router.get("/viewmaterial/:materialId", teacherController.viewMaterial);
router.delete("/deletematerial/:materialId", teacherController.deleteMaterial);

//  Add Delete Update Marks Routes
router.put("/quiz/addMarks/:qID/:sID", teacherController.addMarksController);
router.delete("/quiz/:id", teacherController.deleteMarksController);
router.put("/updatemarks/:aid", teacherController.updateMarksController);

module.exports = router;
