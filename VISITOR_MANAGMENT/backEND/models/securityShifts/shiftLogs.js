const mongoose = require('mongoose');


const shiftSchema = new mongoose.Schema({
    date: {
        type: String,
        default: Date.now
    },
    shift1: {
        type: [
            {
                name: String,
                mobile: Number
            }
        ],
        required: true
    },
    shift2: {
        type: [
            {
                name: String,
                mobile: Number
            }
        ],
        required: true
    },
    shift3: {
        type: [
            {
                name: String,
                mobile: Number
            }
        ],
        required: true
    }
});

const shift = mongoose.model('securityShiftLogs', shiftSchema);

module.exports = shift;