const registrar = require('../../models/static/registrar/registrar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req,res) => {
    try{

        const email = req.body.email;
        const password = req.body.password;

        const temp = await registrar.findOne({email});

        if (temp) {
            const isMatch = await bcrypt.compare(password, temp.password);
            if (isMatch) {
                const token = jwt.sign({ email,uuid : temp.uuid }, "mysecret", { expiresIn: '1h' });
                res.status(200).send({ message: "Login success" , token});
            }
            else {
                res.status(401).send({ message: "Invalid credentials" });
            }
        }

        else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    }
    catch (err) {
        console.log("This is error from ./controllers/registrar/login.js");
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
module.exports = login;