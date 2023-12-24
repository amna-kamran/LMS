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
