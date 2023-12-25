const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    regNo: {
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
    marks: {
        types: Number,
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
            score: {
                type: Number,
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
            submitted: {
                type: Boolean,
                default: false,
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
    results: [
        {
            subject: {
                type: mongoose.Types.ObjectId,
                ref: 'Subject',
            },
            grade: {
                type: String,
            },
        },
    ],
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;