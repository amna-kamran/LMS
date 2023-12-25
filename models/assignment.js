const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String,
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
