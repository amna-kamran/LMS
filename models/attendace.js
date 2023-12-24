const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: new Date().toISOString(),
    },
    studentRegNo: {
        type: String,
        required: true,
    },
    present: {
        type: Boolean,
        required: true,
    },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;