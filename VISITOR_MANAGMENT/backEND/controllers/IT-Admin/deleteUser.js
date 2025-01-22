const security = require('../../models/static/security/security');
const hostelWarden = require('../../models/static/hostelWarden/hostelWarden');
const staff = require('../../models/static/staff/staff');
const faculty_adminBlock = require('../../models/static/faculty_adminBlock/faculty_adminBlock');
const registrar = require('../../models/static/registrar/registrar');
const security_manager = require('../../models/static/securityManager/securityManager');

// for deleting attendence object
const attendence = require('../../models/attendence/staff');


const deleteUser = async (req, res) => {

    try {
    
        const role = req.body.role;

        if(role == "staff"){

            const staffData = await staff.findOne({ uuid: req.body.uuid });

            if (staffData) {
                
                if(staffData.department == "security"){
                    await security.deleteOne({ uuid: req.body.uuid });
                }

                await attendence.deleteOne({ uuid: req.body.uuid });

                await staff.deleteOne({ uuid: req.body.uuid });
                res.status(200).send({ message: "Staff deleted successfully" });
            } else {
                res.status(400).send({ message: "Staff not found" });
            }

        

        }
        else if(role == "hostelWarden"){

            const hostelWardenData = await hostelWarden.findOne({ uuid: req.body.uuid });

            if (hostelWardenData) {
                await hostelWarden.deleteOne({ uuid: req.body.uuid });
                res.status(200).send({ message: "Hostel Warden deleted successfully" });
            } else {
                res.status(400).send({ message: "Hostel Warden not found" });
            }
        }
        else if(role == "registrar"){
            const registrarData = await registrar.findOne({ uuid: req.body.uuid });

            if (registrarData) {
                await registrar.deleteOne({ uuid: req.body.uuid });
                res.status(200).send({ message: "Registrar deleted successfully" });
            } else {
                res.status(400).send({ message: "Registrar not found" });
            }
        }
        else if(role == "securityManager"){
            const security_managerData = await security_manager.findOne({ uuid: req.body.uuid });

            if (security_managerData) {
                await security_manager.deleteOne({ uuid: req.body.uuid });
                res.status(200).send({ message: "Security Manager deleted successfully" });
            } else {
                res.status(400).send({ message: "Security Manager not found" });
            }
        }
        else if(role == "faculty_adminBlock"){
            const facultyData = await faculty_adminBlock.findOne({ uuid: req.body.uuid });

            if (facultyData) {
                await faculty_adminBlock.deleteOne({ uuid: req.body.uuid });
                res.status(200).send({ message: "Faculty deleted successfully" });
            } else {
                res.status(400).send({ message: "Faculty not found" });
            }
        }
        else{
            res.status(400).send({message: "Invalid role"});
        }
        
    } catch (error) {
        console.log("This is error from ./controllers/IT-Admin/deleteUser.js");
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

}

module.exports = deleteUser;