const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    student_id: {
        type: Number,
        required: true
    },
    photo_exit:{
        type: String
    },
    photo_entry:{
        type: String
    },
    isLongLeave:{
        type: Boolean,
    },
    reason:{
        type: String
    },
    entry_time:{
        type: String
    },
    exit_time:{
        type: String
    },
    entry_authorised_by:{
        type: String
    },
    exit_authorised_by:{
        type: String
    },
    uuid:{
        type: String
    },
});

const student = mongoose.model('student_logs', studentSchema);

module.exports = student;