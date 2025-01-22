const student = require("../../models/static/students_alumni/student");

const deleteStudent = async (req, res) => {
  try {
    const { student_id } = req.body;

    const studentData = await student.findOne({ student_id });

    if (studentData) {
      await student.deleteOne({ student_id });
      res.status(200).send({ message: "Student deleted successfully" });
    } else {
      res.status(404).send({ message: "Student not found" });
    }
  } catch (error) {
    console.log("This is error from ./controllers/IT-Admin/deleteStudent.js");
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = deleteStudent;