const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const studentSchema = new mongoose.Schema({
    student_id: {
        type: Number,
        required: true,
        unique: true
    },
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
    room:{
        type: String,
        required: true
    },
    uuid:{
        type: String,
        unique: true,
        required: true
    },
    vehicle:{
        type: String,
        default: ""
    }
});


studentSchema.pre("save", (async function (next) {

    const password = this.password;
    const hashed_pass = await bcrypt.hash(password, 8);
    this.password = hashed_pass;
    next();
}))

studentSchema.pre('updateOne', async function (next) {
    const update = this.getUpdate();
    // console.log(update);
    if (update.password) {
        const hashed_pass = await bcrypt.hash(update.password, 8);
        this.setUpdate({ ...update, password: hashed_pass });
    }
    next();
});




const Student = mongoose.model('students', studentSchema);

// Log the model creation
console.log('Creating student model with collection:', Student.collection.collectionName);

module.exports = Student;