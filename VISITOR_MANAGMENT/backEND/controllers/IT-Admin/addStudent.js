const student = require("../../models/static/students_alumni/student");
const uuid = require("uuid");

const addStudent = async (req, res) => {
  try {
    const { name, email, mobile, student_id, room } = req.body;
    const pass = `${student_id}${room}`;

    const newStudent = new student({
      name,
      email,
      mobile,
      student_id,
      room,
      password: pass,
      uuid: `${uuid.v4()}student`,
    });
    try {
      await newStudent.save();
      res.status(201).json({ message: "Student Added Successfully" });
    } catch (error) {
      if (error.name == "MongoServerError" && error.code == 11000) {
        res
          .status(409)
          .send({
            message: "Duplicate key error",
            duplicateKey: Object.keys(error.keyPattern)[0],
          });
        return;
      }
    }
  } catch (error) {
    console.log("This is error from ./controllers/IT-Admin/addStudent.js");
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = addStudent;