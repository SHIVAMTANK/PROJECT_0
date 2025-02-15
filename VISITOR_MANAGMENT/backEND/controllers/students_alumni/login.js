const student = require('../../models/static/students_alumni/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


require('dotenv').config();


const login = async (req, res) => {

    try {

        const student_id = req.body.student_id;
        const password = req.body.password;

        const studentData = await student.findOne({ student_id : Number(student_id) });
        if (!studentData) {
            res.status(400).send({ error: "Invalid ID or Password" });
            return;
        }
        const isMatch = await bcrypt.compare(password, studentData.password);
        if (!isMatch) {
            res.status(400).send({ error: "Invalid ID or Password" });
            return;
        }
        const token = jwt.sign({ student_id: studentData.student_id, uuid:studentData.uuid },"mysecret", { expiresIn: '1h' });

        res.status(200).send({token});

    } catch (error) {
        console.log("Error from ./controllers/students_alumni/login.js");
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = login;