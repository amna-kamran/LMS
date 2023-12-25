const Quiz = require("../models/quiz");
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const Assignment = require('../models/assignment');



module.exports.addQuiz = (req, res, next) => {
  const createdBy = req.body.createdBy; // Assuming createdBy contains the teacher ID
  const quizData = {
    createdBy,
    title: req.body.title,
    questions: req.body.questions,
  };

  Quiz.create(quizData)
    .then((quiz) => {
      res.status(201).json({ quiz });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports.deleteQuiz = (req, res, next) => {
  const quizId = req.params.id;

  Quiz.findByIdAndDelete(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json({ message: "Quiz deleted successfully", deletedQuiz: quiz });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports.viewAttemptedQuizzes = (req, res, next) => {
  Quiz.find({ attempted: true })
    .populate("createdBy", "name")
    .then((quizzes) => {
      res.render("viewattquiz", { quizzes });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports.downloadAttemptedQuizzes = (req, res, next) => {
  Quiz.find({ attempted: true })
    .populate("createdBy", "name")
    .then((quizzes) => {
      const csvData = convertQuizzesToCSV(quizzes);
      res.attachment("attempted_quizzes.csv");
      res.send(csvData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

function convertQuizzesToCSV(quizzes) {
  const csvData = papaparse.unparse({
    fields: ["Quiz Title", "Question Text", "Correct Option"],
    data: quizzes
      .map((quiz) => {
        return quiz.questions.map((question) => {
          return {
            "Quiz Title": quiz.title,
            "Question Text": question.questionText,
            "Correct Option": question.correctOption,
          };
        });
      })
      .flat(),
  });

  return csvData;
}

//  Add Delete Update Marks Controlller
module.exports.addMarksController = async (req, res, next) => {
  const studID = req.params.sID;
  const quizID = req.params.qID;
  const marks = req.body.marks;
  try {
    const attemptedQuizzes = await Quiz.findOneAndUpdate(
      {
        _id: quizID,
        submissions: { $elemMatch: { student: studID } },
      },
      { $set: { "submissions.$.marks": marks } }
    );
    res.json(attemptedQuizzes?.submissions);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteMarksController = (req, res, next) => {
  Quiz.deleteOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      return next(err);
    }

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({ message: "Quiz deleted successfully" });
  });
};

module.exports.updateMarksController = (req, res, next) => {
  const { totalMarks } = req.body;

  if (typeof totalMarks !== "number") {
    return res.status(400).json({ message: "Invalid totalMarks value" });
  }

  Quiz.findOneAndUpdate(
    { _id: req.params.aid },
    { totalMarks: totalMarks },
    { new: true },
    function (err, result) {
      if (err) {
        return next(err);
      }

      if (!result) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.status(200).json(result);
    }
  );
};


const viewSubmittedAssignments = async (teacherId) => {
  try {
    const courses = await Course.find({ "teacher.id": teacherId });
    return { message: 'View submitted assignments', courses };
  } catch (err) {
    throw new Error(err.message);
  }
};

const addAssignment = async (courseId, assignmentDetails) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const assignment = new Assignment(assignmentDetails); 
    course.assignments.push(assignment);
    await course.save();

    return { message: 'Assignment added successfully', assignment };
  } catch (err) {
    throw new Error(err.message);
  }
};

const downloadSubmittedAssignments = async (assignmentId) => {
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      throw new Error('Assignment not found');
    }

    return { message: 'Downloaded submitted assignments', assignment };
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteAssignment = async (assignmentId) => {
  try {
    return { message: 'Assignment deleted successfully', assignmentId };
  } catch (err) {
    throw new Error(err.message);
  }
};

const viewMaterial = async (my_Material) => {
  try {
    return { message: 'Material added successfully', my_Material};
  } catch (err) {
    throw new Error(err.message);
  }
};

const addMaterial = async (material) => {
  try {
    return { message: 'Material added successfully', material};
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteMaterial = async (materialId) => {
  try {
    return { message: 'Material deleted successfully', materialId };
  } catch (err) {
    throw new Error(err.message);
  }
};
                 
