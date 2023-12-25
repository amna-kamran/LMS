var express = require("express");
var router = express.Router();
var Student = require("../models/student")
var Teacher = require("../models/teacher")

router.get('/get-all-students', function(req, res, next) {
    Student.find().exec().then(result => {
        res.json(result)
    }).catch(e => {
        res.status(400)
        res.json(e)
    })
});

router.get('/get-student/:id', function(req, res, next) {
    Student.find().exec().then(result => {
        res.json(result)
    }).catch(e => {
        res.status(400)
        res.json(e)
    })
});



module.exports = router;
