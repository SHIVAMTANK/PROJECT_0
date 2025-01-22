const visitors_logs = require('../../models/logs/visitor');

const getVisitorsLogs = async (req, res) => {
    try {
        const logs = await visitors_logs.find().sort({ createdAt: -1 });
        res.status(200).json(logs);
    } catch (error) {
        console.log('This is error from ./dataTables/getVisitorsLogs.js');
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = getVisitorsLogs;