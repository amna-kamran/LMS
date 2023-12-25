const Teacher = require("../models/teacher");

var Student = require("../models/student")
var Teacher = require("../models/teacher")
var Course = require("../models/course")


// creating:::
exports.createTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Failed to create teacher !!" });
  }
};

// Show all teachers
exports.showAllTeachers = async function (req, res, next) {
  try {
    const teachers = await Teacher.find().exec();
    res.json(teachers);
  } catch (err) {
    next(err);
  }
};

// Show teacher by ID
exports.getTeacherById = async function (req, res, next) {
  try {
    const teacher = await Teacher.find({ _id: req.params.id }).exec();
    res.json(teacher);
  } catch (err) {
    next(err);
  }
};
// Updating:::
exports.updateTeacherById = async (req, res, next) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: "Cannot Update Teacher" });
  }
};

// Deleting:::
exports.deleteTeacherById = async (req, res, next) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    res.json(deletedTeacher);
  } catch (error) {
    res.status(500).json({ message: "Teacher cannot be deleted !!! " });
  }
};




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