const studnt = require('../../models/static/students_alumni/student');

// erroe: 400 -> Student not found]
// error: 500 -> error from server

const removeVehicle = async (req, res) => {
    try {
        
        const student_id = Number(req.body.student_id);

        const studentData = await studnt.findOne({ student_id });

        if (!studentData) {
            return res.status(400).json({ message: "Student not found" });
        }

        const updateStudent = await studnt.updateOne({ student_id }, { vehicle : ""});

        res.status(200).send({ message: "Vehicle removed successfully" });

    } catch (error) {
        console.log("This is error from ./controllers/hostelWarden/addVehicle.js");
        console.log(error);
        res.status(500).send();
    }
}

module.exports = removeVehicle;