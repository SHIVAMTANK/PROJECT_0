const mognoose = require('mongoose');

const visitorSchema = new mognoose.Schema({
    uuid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    arrival_date:{
        type:Date,
        default:Date.now
    },
    purpose:{
        type:String,
        required:true
    },
    scheduled_by:{
        type:String
    }
});

const visitor = mognoose.model('visitor', visitorSchema);

module.exports = visitor;