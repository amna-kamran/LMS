router.post("/addQuiz", async (req, res, next) => {
    try {
      const quiz = new Quiz(req.body.quiz);
      // console.log(quiz);
      const added = await quiz.save();
      res.json(added);
    } catch (error) {
      next(error.message);
    }
  });