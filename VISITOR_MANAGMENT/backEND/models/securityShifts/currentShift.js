const mongoose = require('mongoose');


const shiftSchema = new mongoose.Schema({
    date: {
        type: String,
        default: Date.now
    },
    shift1: {
        type: [
            String,
        ],
        required: true
    },
    shift2: {
        type: [
            String,
        ],
        required: true
    },
    shift3: {
        type: [
            String,
        ],
        required: true
    }
});

const shift = mongoose.model('Current security Shift', shiftSchema);

module.exports = shift;