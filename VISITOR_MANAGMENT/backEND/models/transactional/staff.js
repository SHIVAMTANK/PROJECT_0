const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: Number,
        unique: true
    },
    uuid: {
        type: String,
        required: true
    },
    photo_entry:{
        type: String
    },
    entry_time:{
        type: String
    },
    entry_authorised_by:{
        type: String
    },
});

const staff = mongoose.model('staff_transactional', staffSchema);

module.exports = staff;