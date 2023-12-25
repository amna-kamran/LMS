const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    classes: {
        type: [String],
        required: true,
    },
    quizzes: [
        {
            id: {
                type: mongoose.Types.ObjectId,
                ref: 'Quiz',
            },
            title: {
                type: String,
                required: true,
            },
        },
    ],
    assignments: [
        {
            id: {
                type: mongoose.Types.ObjectId,
                ref: 'Assignment',
            },
            title: {
                type: String,
                required: true,
            },
        },
    ],
    materials: [
        {
            id: {
                type: mongoose.Types.ObjectId,
                ref: 'Material',
            },
            title: {
                type: String,
                required: true,
            },
        },
    ],
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
