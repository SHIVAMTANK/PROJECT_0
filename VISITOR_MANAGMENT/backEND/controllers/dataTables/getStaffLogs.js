const staff_logs = require('../../models/logs/staff');

const getStaffLogs = async (req, res) => {
    try {
        const logs = await staff_logs.find().sort({ createdAt: -1 });
        res.status(200).json(logs);
    } catch (error) {
        console.log('This is error from ./dataTables/getStaffLogs.js');
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = getStaffLogs;