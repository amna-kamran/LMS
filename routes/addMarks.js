router.put("/quiz/addMarks/:qID/:sID", async (req, res, next) => {
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
  });