const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  grade: {
    type: String,
  },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
