const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    student_id: {
        type: Number,
        unique: true
    },
    uuid: {
        type: String,
        required: true
    },
    photo_exit:{
        type: String
    },
    photo_entry:{
        type: String
    },
    entry_time:{
        type: String
    },
    exit_time:{
        type: String
    },
    isLongLeave:{
        type: Boolean,
        default: false
    },
    reason:{
        type: String
    },
    exit_authorised_by:{
        type: String
    },
});

const student = mongoose.model('student_transactional', studentSchema);

module.exports = student;