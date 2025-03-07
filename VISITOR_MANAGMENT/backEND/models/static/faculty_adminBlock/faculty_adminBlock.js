const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const facultySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    uuid:{
        type:String,
        required:true,
        unique:true
    },
});


//this is mongoose middleware 
//jyare new data save thase ae pela
//password pela hash thase pachi database ma store thase
//.hash() function ma 1 perameter password
//2 salt che
//salt means ketal character apde add karva upar thi apda 
//password store karva pela
//random character add kari dese
facultySchema.pre("save", async function (next) { 
    if (!this.isModified("password")) return next(); // Only hash if password is modified

    try {
        const salt = await bcrypt.genSalt(8);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
facultySchema.pre("updateOne", async function (next) {
    const update = this.getUpdate(); 

    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(8);
            update.password = await bcrypt.hash(update.password, salt);
            this.update({}, update);
        } catch (error) {
            return next(error);
        }
    }
    next();
});


module.exports = mongoose.model('Faculty_AdminStaff', facultySchema);