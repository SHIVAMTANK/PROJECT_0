const mongoose = require('mongoose');

const ITAdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ITAdmin', ITAdminSchema);
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbXRhbmsxMUBnbWFpbC5jb20iLCJ1dWlkIjoiMSIsImlhdCI6MTczNzY1NTM1MCwiZXhwIjoxNzM3NjU4OTUwfQ.-GzWjZrksSW58WOqXTlJ2fdhsTKmyvFqMuVpXEaSpLY"