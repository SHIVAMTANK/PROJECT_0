const security = require('../../models/static/security/security');
const hostelWarden = require('../../models/static/hostelWarden/hostelWarden');
const staff = require('../../models/static/staff/staff');
const faculty_adminBlock = require('../../models/static/faculty_adminBlock/faculty_adminBlock');
const registrar = require('../../models/static/registrar/registrar');
const security_manager = require('../../models/static/securityManager/securityManager');
const mailTransporter = require('../../SMTP/utils/setup');

// To add attendence Object
const attendence = require('../../models/attendence/staff');

const uuid = require('uuid');

// Function to send credentials email
const sendCredentialsEmail = async (userData) => {
    try {
        console.log('Starting email send process...');
        
        const mailOptions = {
            from: '"Visitor Management System" <shivamtank8059@gmail.com>',
            to: userData.email,
            subject: 'Your Account Credentials',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Welcome to Visitor Management System</h2>
                    <p>Hello ${userData.name},</p>
                    <p>Your account has been created successfully. Here are your login credentials:</p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Email:</strong> ${userData.email}</p>
                        <p><strong>Password:</strong> ${userData.password}</p>
                        <p><strong>Role:</strong> ${userData.role}</p>
                    </div>
                    <p>Please change your password after your first login.</p>
                    <p>Best regards,<br>Visitor Management System</p>
                </div>
            `
        };

        const info = await mailTransporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

const addUser = async (req, res) => {
    console.log("Request received:", req.body);

    try {
        const role = req.body.role;

        if (role == "staff") {
            const _uuid = uuid.v4();
            const newStaff = new staff({
                name: req.body.name,
                email: req.body.email,
                password: req.body.mobile,
                mobile: req.body.mobile,
                department: req.body.department,
                uuid: `${_uuid}staff`
            });

            const newAttendence = new attendence({
                uuid: `${_uuid}staff`  
            });

            try {
                await newStaff.save();
                await newAttendence.save();

                if (req.body.department == "security") {
                    const newSecurity = new security({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.mobile,
                        mobile: req.body.mobile,
                        uuid: `${_uuid}staff`
                    });
    
                    await newSecurity.save();
                }

                // Send credentials email
                console.log("Sending email to:", {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.mobile,
                    role: 'Staff'
                });
                const emailSent = await sendCredentialsEmail({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.mobile,
                    role: 'Staff'
                });

                if (!emailSent) {
                    console.log('Warning: Email could not be sent, but user was created successfully');
                }

                res.status(200).send({ 
                    message: "Staff added successfully",
                    emailSent: emailSent
                });

            } catch (error) {
                if(error.name == 'MongoServerError' && error.code == 11000){
                    res.status(409).send({message: "Duplicate key error", duplicateKey: Object.keys(error.keyPattern)[0]});
                    return;
                }                  
            }
        }
        else if (role == "hostelWarden") {
            const newHostelWarden = new hostelWarden({
                name: req.body.name,
                email: req.body.email,
                password: req.body.email,
                mobile: req.body.mobile,
                uuid: `${uuid.v4()}hostelWarden`
            });

            try {
                await newHostelWarden.save();
                
                // Send credentials email
                const emailSent = await sendCredentialsEmail({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.email,
                    role: 'Hostel Warden'
                });

                if (!emailSent) {
                    console.log('Warning: Email could not be sent, but user was created successfully');
                }

                res.status(200).send({ 
                    message: "Hostel Warden added successfully",
                    emailSent: emailSent
                });
            } catch (error) {
                if (error.name == 'MongoServerError' && error.code == 11000) {
                    res.status(409).send({ message: "Duplicate key error", duplicateKey: Object.keys(error.keyPattern)[0] });
                    return;
                }
            }
        }
        else if (role == "faculty_adminBlock") {
            console.log("Faculty Admin Block Logic Entered");

            const newFaculty = new faculty_adminBlock({
                name: req.body.name,
                email: req.body.email,
                password: req.body.email,
                mobile: req.body.mobile,
                uuid: `${uuid.v4()}faculty_adminBlock`
            });

            try {
                console.log("Saving Faculty Admin Block...");
                await newFaculty.save();
                console.log("Faculty Admin Block Saved Successfully!");

                // Send credentials email
                const emailSent = await sendCredentialsEmail({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.email,
                    role: 'Faculty Admin'
                });

                if (!emailSent) {
                    console.log('Warning: Email could not be sent, but user was created successfully');
                }

                res.status(200).send({ 
                    message: "Faculty added successfully",
                    emailSent: emailSent
                });
            } catch (error) {
                console.error("MongoDB Error Details:", error);
                res.status(500).send({ message: "Error adding faculty_adminBlock", error: error.message });
            }
        }
        else if (role == "registrar") {
            const newRegistrar = new registrar({
                name: req.body.name,
                email: req.body.email,
                password: req.body.email,
                uuid: `${uuid.v4()}registrar`
            });

            try {
                await newRegistrar.save();

                // Send credentials email
                const emailSent = await sendCredentialsEmail({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.email,
                    role: 'Registrar'
                });

                if (!emailSent) {
                    console.log('Warning: Email could not be sent, but user was created successfully');
                }

                res.status(200).send({ 
                    message: "Registrar added successfully",
                    emailSent: emailSent
                });
            } catch (error) {
                if(error.name == 'MongoServerError' && error.code == 11000){
                    res.status(409).send({message: "Duplicate key error", duplicateKey: Object.keys(error.keyPattern)[0]});
                    return;
                }                  
            }
        }
        else if (role == "securityManager") {
            const newSecurityManager = new security_manager({
                name: req.body.name,
                email: req.body.email,
                password: req.body.email,
                mobileS: req.body.mobile,
                uuid: `${uuid.v4()}securityManager`
            });

            try {
                await newSecurityManager.save();

                // Send credentials email
                const emailSent = await sendCredentialsEmail({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.email,
                    role: 'Security Manager'
                });

                if (!emailSent) {
                    console.log('Warning: Email could not be sent, but user was created successfully');
                }

                res.status(200).send({ 
                    message: "Security Manager added successfully",
                    emailSent: emailSent
                });
            } catch (error) {
                if(error.name == 'MongoServerError' && error.code == 11000){
                    res.status(409).send({message: "Duplicate key error", duplicateKey: Object.keys(error.keyPattern)[0]});
                    return;
                }                  
            }
        }
        else {
            res.status(500).send({ message: "Invalid data" });
        }

    } catch (error) {
        console.log("This is error from ./controllers/IT-Admin/addUser.js");
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = addUser;
