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
facultySchema.pre("save",async (next)=>{
    const password = this.password;

    const hashed_pass = await bcrypt.hash(password,8);
    this.password = hashed_pass;
    next();
})

facultySchema.pre('updateOne',async (next)=>{
    const update = this.getUpdate();
    //    Retrieves the current update object from the Mongoose query.
    //example {email:"shivam@gmail.com",password:"updatedone"}

    if(update.password){
        const hashed_pass = await bcrypt.hash(update.password,8);
        this.setUpdate({...update,password:hashed_pass});
        //...update shlowcopy banavse 
        //ne aema khali password field ne change kari dese 
    }
    next();
})

module.exports = mongoose.model('Faculty_AdminStaff', facultySchema);