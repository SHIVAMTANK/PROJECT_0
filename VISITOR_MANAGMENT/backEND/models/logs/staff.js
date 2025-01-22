const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    uuid:{
        type: String
    },
    mobile:{
        type: Number
    },
    name:{
        type: String
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
    entry_authorised_by:{
        type: String
    },
    exit_authorised_by:{
        type: String
    }
});

const staff = mongoose.model('staff_logs', staffSchema);

module.exports = staff;