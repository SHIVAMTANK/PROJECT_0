const studentLogs = require('../../models/logs/student');


const getStudentLogs = async (req, res) => {
    try {
        const logs = await studentLogs.find().sort({ createdAt: -1 });
        res.status(200).json(logs);
    } catch (error) {
        console.log('This is error from ./dataTables/getStudentLogs.js');
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = getStudentLogs;