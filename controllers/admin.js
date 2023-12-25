const Teacher = require("../models/teacher");
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
