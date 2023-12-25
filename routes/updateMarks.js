  router.put("/updatemarks/:aid", (req, res, next) => {
    const { totalMarks } = req.body;
  
    if (typeof totalMarks !== 'number') {
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
  });