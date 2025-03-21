const student = require("../../models/static/students_alumni/student");
const uuid = require("uuid");
const mailTransporter = require("../../SMTP/utils/setup");

const sendCredentialsEmail = async (studentData) => {
    try {
        console.log('Starting email send process for student...');
        
        const mailOptions = {
            from: '"Visitor Management System" <shivamtank8059@gmail.com>',
            to: studentData.email,
            subject: 'Your Student Account Credentials',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Welcome to Visitor Management System</h2>
                    <p>Hello ${studentData.name},</p>
                    <p>Your student account has been created successfully. Here are your login credentials:</p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Email:</strong> ${studentData.email}</p>
                        <p><strong>Password:</strong> ${studentData.password}</p>
                        <p><strong>Roll Number:</strong> ${studentData.rollNo}</p>
                        <p><strong>Role:</strong> Student</p>
                    </div>
                    <p>Please change your password after your first login.</p>
                    <p>Best regards,<br>Visitor Management System</p>
                </div>
            `
        };

        const info = await mailTransporter.sendMail(mailOptions);
        console.log('Student email sent successfully!');
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

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

      // Send credentials email
      const emailSent = await sendCredentialsEmail({
        name,
        email,
        password: pass,
        rollNo: student_id
      });

      if (!emailSent) {
        console.log('Warning: Email could not be sent, but student was created successfully');
      }

      res.status(201).json({ 
        message: "Student Added Successfully",
        emailSent: emailSent
      });
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