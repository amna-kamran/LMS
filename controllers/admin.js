var Student = require("../models/student")
var Teacher = require("../models/teacher")
var Course = require("../models/course")


module.exports.getAllStudents = function (req, res, next) {
    Student.find().exec().then(result => {
        res.json(result)
    }).catch(e => {
        res.status(400)
        res.json(e)
    })
}


module.exports.getStudentById = function (req, res, next) {
    Student.find({ _id: req.params.id }).then(result => {
        res.json(result)
    }).catch(e => {
        res.status(400)
        res.json(e)
    })
}

module.exports.createStudent = function (req, res, next) {
    Student.create(req.body)
        .then(result => {
            res.json(result)
        }).catch(e => {
            res.status(400)
            res.json(e)
        })
}

module.exports.updateStudentById = function (req, res, next) {
    Student.updateOne({ _id: req.params.id }, req.body).then(data => res.send(data))
        .catch(err => res.send(err))
}

module.exports.deleteStudentById = function (req, res, next) {
    Student.deleteOne({ _id: req.params.id }, {
        name: req.body.name
    }).then(data => res.send(data))
        .catch(err => res.send(err))
}



module.exports.getAllCourses = function (req, res, next) {
    Course.find().exec().then(result => {
        res.json(result)
    }).catch(e => {
        res.status(400)
        res.json(e)
    })
}

module.exports.getCourseByID = function (req, res, next) {
    Course.find({ _id: req.params.id }).then(result => {
        res.json(result)
    }).catch(e => {
        res.status(400)
        res.json(e)
    })
}

module.exports.createCourse = function (req, res, next) {
    Course.create(req.body)
        .then(result => {
            res.json(result)
        }).catch(e => {
            res.status(400)
            res.json(e)
        })
}

module.exports.updateCourseById = function (req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body).then(data => res.send(data))
        .catch(err => res.send(err))
}

module.exports.deleteCourseById = function (req, res, next) {
    Course.deleteOne({ _id: req.params.id }, {
        name: req.body.name
    }).then(data => res.send(data))
        .catch(err => res.send(err))
}