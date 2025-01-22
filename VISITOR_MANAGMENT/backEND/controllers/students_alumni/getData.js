const student = require('../../models/static/students_alumni/student');

const getData = async (req, res) => {  
    try {

        // console.log(req.user);
        const student_id = Number(req.user.student_id);

        const studentData = await student.findOne({ student_id : student_id });
        if (!studentData) {
            res.status(400).send({ error: "Invalid ID" });
            return;
        }

        res.status(200).send(studentData);

    } catch (error) {
        console.log("Error from ./controllers/students_alumni/getData.js");
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = getData;