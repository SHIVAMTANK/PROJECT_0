const student = require("../../models/static/students_alumni/student");

const getStudentData = async (req, res) => {

    try {

        const pipe = [
            {
                $match: {
                    vehicle: { $ne: "" }
                }
            },
            {
                $project: {
                    student_id: 1,
                    name: 1,
                    vehicle: 1
                }
            }
        ]

        const studentData = await student.aggregate(pipe);

        res.status(200).send(studentData);
        
    } catch (error) {
        console.log("This is error from ./controllers/hostelWarden/getVehicle.js");
        console.log(error);
        res.status(500).send();
    }

}

module.exports = getStudentData;