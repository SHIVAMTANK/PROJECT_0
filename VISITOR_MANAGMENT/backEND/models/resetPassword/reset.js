const mongoose = require('mongoose');

const resetSchema = new mongoose.Schema({
    resetToken:{
        type:String,
        required:true
    },
    uuid:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:10800
    }
});
module.exports = mongoose.model('Reset',resetSchema);