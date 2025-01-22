const registrar = require('../../models/static/registrar/registrar');
const hostelWarden = require('../../models/static/hostelWarden/hostelWarden');
const staff = require('../../models/static/staff/staff');
const securityManager = require('../../models/static/securityManager/securityManager');
const faculty_adminBlock = require('../../models/static/faculty_adminBlock/faculty_adminBlock');



const getRegistrar = async (req, res) => {
    try {
        const registrarData = await registrar.find();

        if (!registrarData) {         
            return res.status(404).send({ message: "Data not found" });
        }

        res.status(200).send(registrarData);
    } catch (error) {
        console.log("This is is error from ./controllers/IT-Admin/getUsers.js ")
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


const getHostelWarden = async (req, res) => {
    try {
        const hostelWardenData = await hostelWarden.find();
        res.status(200).send(hostelWardenData);
    } catch (error) {
        console.log("This is is error from ./controllers/IT-Admin/getUsers.js ")
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const getStaff = async (req, res) => {
    try {
        const staffData = await staff.find();
        res.status(200).send(staffData);
    } catch (error) {
        console.log("This is is error from ./controllers/IT-Admin/getUsers.js ")
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const getSecurityManager = async (req, res) => {
    try {
        const securityManagerData = await securityManager.find();
        res.status(200).send(securityManagerData);
    } catch (error) {
        console.log("This is is error from ./controllers/IT-Admin/getUsers.js ")
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const getFaculty_adminBlock = async (req, res) => {
    try {
        const faculty_adminBlockData = await faculty_adminBlock.find();
        res.status(200).send(faculty_adminBlockData);
    } catch (error) {
        console.log("This is is error from ./controllers/IT-Admin/getUsers.js ")
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


module.exports = {getRegistrar, getHostelWarden, getStaff, getSecurityManager, getFaculty_adminBlock};