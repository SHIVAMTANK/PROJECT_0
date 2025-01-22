const security = require('../../models/static/security/security');
const hostelWarden = require('../../models/static/hostelWarden/hostelWarden');
const staff = require('../../models/static/staff/staff');
const faculty_adminBlock = require('../../models/static/faculty_adminBlock/faculty_adminBlock');
const registrar = require('../../models/static/registrar/registrar');
const security_manager = require('../../models/static/securityManager/securityManager');


// To add attendence Object
const attendence = require('../../models/attendence/staff');


const uuid = require('uuid');

// For stafff -> password same as phone number



const addUser = async (req, res) => {

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

                res.status(200).send({ message: "Staff added successfully" });

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
                res.status(200).send({ message: "Hostel Warden added successfully" });
            } catch (error) {
                if (error.name == 'MongoServerError' && error.code == 11000) {
                    res.status(409).send({ message: "Duplicate key error", duplicateKey: Object.keys(error.keyPattern)[0] });
                    return;
                }
            }
        }
        else if (role == "faculty_adminBlock") {

            const newFaculty = new faculty_adminBlock({
                name: req.body.name,
                email: req.body.email,
                password: req.body.email,
                mobile: req.body.mobile,
                uuid: `${uuid.v4()}faculty_adminBlock`
            });

            try {
                await newFaculty.save();
                res.status(200).send({ message: "Faculty added successfully" });
            } catch (error) {
                if (error.name == 'MongoServerError' && error.code == 11000) {
                    res.status(409).send({ message: "Duplicate key error", duplicateKey: Object.keys(error.keyPattern)[0] });
                    return;
                }
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
                res.status(200).send({ message: "Registrar added successfully" });
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
                mobile: req.body.mobile,
                uuid: `${uuid.v4()}securityManager`
            });

            try {
                await newSecurityManager.save();
                res.status(200).send({ message: "Security Manager added successfully" });
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
