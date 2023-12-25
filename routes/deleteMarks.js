router.delete("/quiz/:id", function (req, res, next) {
    Quiz.deleteOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        return next(err);
      }
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Quiz not found" });
      }
  
      res.json({ message: "Quiz deleted successfully" });
    });
  });
  