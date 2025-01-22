const securityManager = require('../../models/static/securityManager/securityManager');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await securityManager.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const payload = {
            user: {
                uuid: user.uuid,
                email: user.email,
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.status(200).send({token});
        
    } catch (error) {
        console.log("This is error from ./backEND/controllers/securityManager/login.js");
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

}

module.exports = login;