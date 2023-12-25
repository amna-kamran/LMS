const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          text: {
            type: String,
            required: true,
          },
        },
      ],
      correctOption: {
        type: Number,
        required: true,
      },
    },
  ],
  attempted: {
    type: Boolean,
    default: false,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

  
