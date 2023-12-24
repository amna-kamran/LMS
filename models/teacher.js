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
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;

