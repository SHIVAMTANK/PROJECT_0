const faculty_adminBlock = require('../../models/static/faculty_adminBlock/faculty_adminBlock');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req,res)=>{
    try{

        const email = req.body.email;
        const password = req.body.password;

        const user = await faculty_adminBlock.findOne({email:email});

        if(!user){
            return res.status(400).send({message: "Invalid credentials"});
        }        

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).send({message: "Invalid credentials"});
        }

        const jwtSign = jwt.sign({uuid:user.uuid},process.env.JWT_SECRET);

        res.status(200).send({user,token: jwtSign});


    }catch(error){
        console.log("This is an error from ./controllers/faculty_adminBlock/login.js");
        console.log(error);
        res.status(500).send({message: "Internal server error"});   
    }
}
module.exports = login;