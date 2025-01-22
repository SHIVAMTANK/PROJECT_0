const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const staffSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    uuid:{
        type: String,
        unique: true,
        required: true
    },
    department:{
        type: String,
        required: true
    }
});

staffSchema.pre("save", (async function (next) {
    
        const password = this.password;
    
        const hashed_pass = await bcrypt.hash(password, 8);
    
        this.password = hashed_pass;
        next();
    }
))

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;


