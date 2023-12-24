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
    }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;