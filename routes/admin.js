const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudentById,
    deleteStudentById,
    getAllCourses,
    getCourseByID,
    createCourse,
    updateCourseById,
    deleteCourseById
} = require("../controllers/admin");


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



router.get('/student', getAllStudents);
router.get('/student/:id', getStudentById);
router.post('/student', createStudent);
router.put('/student/:id', updateStudentById);
router.delete('/student/:id', deleteStudentById);

// Courses
router.get('/courses', getAllCourses);
router.get('/courses/:id', getCourseByID);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourseById);
router.delete('/courses/:id', deleteCourseById);



module.exports = router;
