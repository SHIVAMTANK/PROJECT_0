const staff = require('../../models/static/staff/staff');

const getData = async (req, res) => {  
    try {

        // console.log(req.user);
        const mobile = Number(req.user.mobile);

        const staffData = await staff.findOne({ mobile : mobile });
        if (!staffData) {
            res.status(400).send({ error: "Invalid ID" });
            return;
        }

        res.status(200).send(staffData);

    } catch (error) {
        console.log("Error from ./controllers/students_alumni/getData.js");
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = getData;