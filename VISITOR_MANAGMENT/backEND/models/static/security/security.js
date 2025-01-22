const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const securitySchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {   
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    uuid: {
        type: String,
        unique: true
    }
});

securitySchema.pre("save", (async function (next) {
    
    const password = this.password;

    const hashed_pass = await bcrypt.hash(password, 8);

    this.password = hashed_pass;
    next();
}
))


securitySchema.pre('updateOne', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        const hashed_pass = await bcrypt.hash(update.password, 8);
        this.setUpdate({ ...update, password: hashed_pass });
    }
    next();
});

module.exports = mongoose.model('Security', securitySchema);

