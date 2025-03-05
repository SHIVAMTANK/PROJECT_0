const staff = require('../../models/static/staff/staff');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


require('dotenv').config();


const login = async (req, res) => {

    try {

        const email = req.body.email;
        const password = req.body.password;

        const staffData = await staff.findOne({ email : email });
        if (!staffData) {
            res.status(400).send({ error: "Invalid ID or Password" });
            return;
        }
        const isMatch = await bcrypt.compare(password, staffData.password);
        if (!isMatch) {
            res.status(400).send({ error: "Invalid ID or Password" });
            return;
        }
        const token = jwt.sign({ mobile: staffData.mobile, uuid:staffData.uuid }, "mysecret", { expiresIn: '1h' });

        res.status(200).send({token});

    } catch (error) {
        console.log("Error from ./controllers/staff/login.js");
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = login;