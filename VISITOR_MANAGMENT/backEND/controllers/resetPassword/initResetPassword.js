const uuid = require('uuid');

const reset = require('../../models/resetPassword/reset');
const mailer = require('../../SMTP/resetPassword/resetPassword');


const student = require('../../models/static/students_alumni/student');
const staff = require('../../models/static/staff/staff');
const security = require('../../models/static/security/security');
const hostelWarden = require('../../models/static/hostelWarden/hostelWarden');
const itAdmin = require('../../models/static/IT-Admin/IT-Admin');
const registrar = require('../../models/static/registrar/registrar');
const securityManager = require('../../models/static/securityManager/securityManager');
const faculty_adminBlock = require('../../models/static/faculty_adminBlock/faculty_adminBlock');


const initResetPassword = async (req, res) => {


    try {  
        const email = req.body.email;
        const type = req.body.type;

        var _uuid = '';
        if(type == 'student'){
            const temp = await student.findOne({email});
            if(temp){
                _uuid = temp.uuid;
            }
        }
        else if(type == 'staff'){
            const temp = await staff.findOne({email});
            if(temp){
                _uuid = temp.uuid;
            }
        }
        else if(type == 'security'){
            const temp = await security.findOne({email});
            if(temp){
                _uuid = temp.uuid;
            }
        }
        else if(type == 'hostelWarden'){
            const temp = await hostelWarden.findOne({email});
            if(temp){
                _uuid = temp.uuid;
            }
        }
        else if(type == 'itAdmin'){
            const temp = await itAdmin.findOne({email});
            if(temp){
                _uuid = temp.uuid;
            }
        }
        else if(type == 'registrar'){
            const temp = await registrar.findOne({email});
            if(temp){
                _uuid = temp.uuid;
            }
        }
        else if(type == 'securityManager'){
            const temp = await securityManager.findOne({email});
            if(temp){
                _uuid = temp.uuid;
            }
        }
        else if(type == 'faculty_adminBlock'){
            const temp = await faculty_adminBlock.findOne({email});
            if(temp){
                _uuid = temp.uuid;
            }
        }
        else{
            return res.status(500).send({message: 'Invalid Type'});
        }

        if(_uuid == ""){
            return res.status(404).send({message: 'Email not found'});
        }

        const uuid1 = uuid.v4();
        const uuid2 = uuid.v4();
        const uuid3 = uuid.v4();

        // Generate a timestamp
        const timestamp = Date.now().toString();

        // Create a random string (example of 16 characters)
        const randomString = Math.random().toString(36).substring(2, 18);

        // Concatenate to create a very long unique string
        const resetToken = `${uuid1}${uuid2}${uuid3}${timestamp}${randomString}`;

        // Create a new reset object
        const newReset = new reset({
            resetToken : resetToken,
            uuid: _uuid
        });

        // Save the reset object
        await newReset.save();

        // Send an email
        await mailer(email,resetToken);

        res.status(200).send({message: 'Email sent successfully'});


    } catch (error) {
        console.log("This is error from ./controllers/resetPassword/initResetPassword.js");
        console.log(error);
        res.status(500).send({message: 'Internal server error'});
    }

}


module.exports = initResetPassword;




