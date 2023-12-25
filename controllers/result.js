const Result = require("../models/result");

exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate("subject", "name"); // Assuming 'subject' refers to another model like 'Subject'
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getResultById = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Result.findById(id).populate("subject", "name"); // Assuming 'subject' refers to another model like 'Subject'
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
