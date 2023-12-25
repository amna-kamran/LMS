const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

// Create teacher
router.post("/addteacher", teacherController.createTeacher);
// Show all teachers
router.get("/teacher/show", teacherController.showAllTeachers);
// Get teacher by ID
router.get("/teacher/:id", teacherController.getTeacherById);
// Update teacher by id
router.put("/teachers/:id", teacherController.updateTeacherById);
// Delete teacher by id
router.delete("/delteacher/:id", teacherController.deleteTeacherById);
