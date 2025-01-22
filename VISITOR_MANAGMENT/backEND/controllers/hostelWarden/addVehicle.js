const student = require('../../models/static/students_alumni/student');


// erroe: 400 -> Student not found
// error: 401 -> Vehicle already added
// error: 500 -> error from server

const addVehicle = async (req, res) => {
    try {
        
        const vehicle = req.body.vehicle;
        const student_id = Number(req.body.student_id);

        const studentData = await student.findOne({ student_id });

        if (!studentData) {
            return res.status(400).send({ error: "Student not found" });
        }

        if(studentData.vehicle){
            return res.status(401).send({ error: "Vehicle already added" });
        }

        const updateStudent = await student.updateOne({ student_id }, { vehicle : vehicle});

        res.status(200).send({ message: "Vehicle added successfully" });

    } catch (error) {
        console.log("This is error from ./controllers/hostelWarden/addVehicle.js");
        console.log(error);
        res.status(500).send();
    }
}

module.exports = addVehicle;