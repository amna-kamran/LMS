const Student = require("../models/student");

module.exports.viewMarks = async (req, res) => {
  try {
    const regNo = req.body.regNo;

    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.marks === undefined || student.marks === null) {
      return res
        .status(200)
        .json({ message: "Marks not available for this student" });
    }

    return res.status(200).json({ marks: student.marks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
