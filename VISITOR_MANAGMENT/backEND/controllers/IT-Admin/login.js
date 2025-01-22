const IT_Admin = require('../../models/static/IT-Admin/IT-Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await IT_Admin.findOne({email});

        if(!user){
            return res.status(400).send({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.status(400).send({message: "Invalid credentials"});
        }

        const token = jwt.sign({ email,uuid:user.uuid }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(200).send({token});

    }
    catch(error){
        console.log("This is error from ./controllers/IT-Admin/login.js");
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
}

module.exports = login;


























