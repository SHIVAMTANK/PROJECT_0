const shiftLogs = require('../../models/securityShifts/shiftLogs');

const getShiftLogs = async (req, res) => {
    
    try {

        const data = await shiftLogs.find({});
        
        res.status(200).send(data);

    } catch (error) {
        console.log("This is error from ./backEND/controllers/securityManager/getShiftLogs.js");
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

}

module.exports = getShiftLogs;