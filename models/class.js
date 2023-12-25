var mongoose = require("mongoose");

var classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher',
    },
    students: {
        type: [{
            sid: {
                type: mongoose.Types.ObjectId,
                ref: 'Student',
            }
        }
        ]
    },
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
