const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    mobile: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    entry_time: {
        type: String,
        default: Date.now
    },
    exit_time: {
        type: String
    },
    scheduled_by: {
        type: String
    },
    photo_entry:{
        type: String
    },
    photo_exit:{
        type: String
    },
    entry_authorised_by:{
        type: String
    },
});

module.exports = mongoose.model('visitor_transactional', visitorSchema);
// Path: backEND/models/transactional/visitor.js

