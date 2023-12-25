var express = require("express");
var router = express.Router();

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
