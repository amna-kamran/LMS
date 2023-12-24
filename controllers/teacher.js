const Quiz = require('../models/quiz');

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
      res.status(500).json({ error: 'Internal Server Error' });
    });

};

module.exports.deleteQuiz = (req, res, next) => {
  const quizId = req.params.id;

  Quiz.findByIdAndDelete(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json({ message: 'Quiz deleted successfully', deletedQuiz: quiz });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports.viewAttemptedQuizzes = (req, res, next) => {

  Quiz.find({ attempted: true })
    .populate('createdBy', 'name')
    .then((quizzes) => {
      res.render('viewattquiz', { quizzes });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports.downloadAttemptedQuizzes = (req, res, next) => {
  Quiz.find({ attempted: true })
    .populate('createdBy', 'name')
    .then((quizzes) => {
      const csvData = convertQuizzesToCSV(quizzes);
      res.attachment('attempted_quizzes.csv');
      res.send(csvData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


function convertQuizzesToCSV(quizzes) {
  const csvData = papaparse.unparse({
    fields: ['Quiz Title', 'Question Text', 'Correct Option'],
    data: quizzes.map((quiz) => {
      return quiz.questions.map((question) => {
        return {
          'Quiz Title': quiz.title,
          'Question Text': question.questionText,
          'Correct Option': question.correctOption,
        };
      });
    }).flat(),
  });

  return csvData;
}