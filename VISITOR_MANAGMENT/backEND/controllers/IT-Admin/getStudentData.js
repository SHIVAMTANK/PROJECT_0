const student = require('../../models/static/students_alumni/student');

const getStudentData = async (req,res) => {
    try{
        const student_id = Number(req.query.student_id);

        const studentData = await student.findOne({student_id});


        if (!studentData) {
            return res.status(400).json({ message: "Student not found" });
        }

        res.status(200).send({ studentData });
    }
    catch (error) {
        console.log("This is error from ./controllers/hostelWarden/getStudentData.js");
        console.log(error);
        res.status(500).send();
    }
}

module.exports = getStudentData;