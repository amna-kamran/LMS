const Student = require("../models/student");
const Material = require("../models/materials");
const Assignment = require("../models/assignment");
const Quiz = require("../models/quiz");
const path = require("path");
const fs = require("fs");

module.exports.dashboard = async (req, res) => {
  try {
    const regNo = req.body.regNo;
    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const dashboardData = {
      name: student.name,
      regNo: student.regNo,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};

module.exports.viewQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const regNo = req.body.regNo;

    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.json({ message: "Student not found" });
    }

    const quizAttempt = student.quizzes.find(
      (attempt) => attempt.id.toString() === quizId
    );

    if (!quizAttempt) {
      return res.json({ message: "Quiz attempt not found for this student" });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.json({ message: "Quiz not found" });
    }

    const quizData = {
      title: quiz.title,
      createdBy: quiz.createdBy,
      questions: quiz.questions,
    };

    res.json(quizData);
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};

module.exports.viewAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const regNo = req.body.regNo;

    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.json({ message: "Student not found" });
    }

    const assignmentSubmission = student.assignments.find(
      (submission) => submission.id.toString() === assignmentId
    );

    if (!assignmentSubmission) {
      return res
        .status(404)
        .json({ message: "Assignment submission not found for this student" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.json({ message: "Assignment not found" });
    }

    const assignmentData = {
      title: assignment.title,
      description: assignment.description,
    };

    res.json(assignmentData);
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};

module.exports.viewMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
    const regNo = req.body.regNo;

    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.json({ message: "Student not found" });
    }

    const material = student.materials.find(
      (material) => material.id.toString() === materialId
    );

    if (!material) {
      return res
        .status(404)
        .json({ message: "Material not found for this student" });
    }

    const materialDetails = await Material.findById(materialId);

    if (!materialDetails) {
      return res.json({ message: "Material details not found" });
    }

    const filePath = path.join(
      __dirname,
      "..",
      "path_to_materials",
      materialDetails.filePath
    );

    if (!fs.existsSync(filePath)) {
      return res.json({ message: "File not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${materialDetails.fileName}`
    );

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    return;
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};

module.exports.viewGrade = async (req, res) => {
  try {
    const regNo = req.body.regNo;

    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.json({ message: "Student not found" });
    }

    const grades = student.results.map((result) => ({
      subject: result.subject,
      grade: result.grade,
    }));

    res.json({ grades });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};

module.exports.attemptQuiz = async (req, res) => {
  try {
    const { regNo } = req.params;
    const { quizAnswers, quizId } = req.body;

    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.json({ message: "Student not found" });
    }

    const quizAttempt = student.quizzes.find(
      (attempt) => attempt.id.toString() === quizId
    );

    if (!quizAttempt) {
      return res.json({ message: "Quiz attempt not found for this student" });
    }

    const quizDetails = await Quiz.findById(quizId);

    if (!quizDetails) {
      return res.json({ message: "Quiz details not found" });
    }

    const correctAnswers = quizDetails.questions.map(
      (question) => question.correctOption
    );

    const score = quizAnswers
      .map((answer, index) => answer === correctAnswers[index])
      .reduce((acc, isCorrect) => acc + isCorrect, 0);

    quizAttempt.score = score;

    await student.save();

    res.json({ message: "Quiz attempted successfully", score });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};

module.exports.submitAssignment = async (req, res) => {
  try {
    const { regNo } = req.params;
    const { assignmentDetails } = req.body;

    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.json({ message: "Student not found" });
    }

    student.assignments = student.assignments || [];
    const existingAssignmentIndex = student.assignments.findIndex(
      (assignment) => assignment.id === assignmentDetails.id
    );

    if (existingAssignmentIndex !== -1) {
      student.assignments[existingAssignmentIndex] = assignmentDetails;
    } else {
      student.assignments.push(assignmentDetails);
    }

    await student.save();

    res.json({ message: "Assignment submitted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};

module.exports.downloadMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
    const regNo = req.body.regNo;

    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.json({ message: "Student not found" });
    }

    const material = student.materials.find(
      (material) => material.id.toString() === materialId
    );

    if (!material) {
      return res.json({ message: "Material not found for this student" });
    }

    const materialDetails = await Material.findById(materialId);

    if (!materialDetails) {
      return res.json({ message: "Material details not found" });
    }

    const filePath = path.join(
      __dirname,
      "..",
      "materials",
      materialDetails.filePath
    );

    if (!fs.existsSync(filePath)) {
      return res.json({ message: "File not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${materialDetails.fileName}`
    );

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    res.json({ message: "Internal server error" });
  }
};

module.exports.viewMarks = async (req, res) => {
  try {
    const regNo = req.body.regNo;
    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.json({ message: "Student not found" });
    }
    if (!student.results || student.results.length === 0) {
      return res.json({ message: "Marks not available for this student" });
    }

    const marks = student.results.map((result) => ({
      subjectName: result.subject.name,
      grade: result.grade,
    }));

    return res.json({ marks });
  } catch (error) {
    return res.json({ message: "Internal server error" });
  }
};
