const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
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

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;