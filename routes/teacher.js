var express = require("express");
var router = express.Router();

const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');

// Route to add a quiz
router.post('/addquiz', teacherController.addQuiz);

module.exports = router;
