const student_logs = require('../../models/logs/student');

const getStudentLogs = async (req, res) => {
    try {
        console.log('Starting to fetch student logs...');

        // First check if collection exists
        const collections = await student_logs.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));

        // Get count of documents
        const count = await student_logs.countDocuments();
        console.log('Total documents in student_logs:', count);

        // Fetch all logs
        const logs = await student_logs.find({})
            .sort({ exit_time: -1 })
            .lean();

        console.log('Fetched logs count:', logs.length);
        console.log('Sample log (first record):', logs[0]);

        return res.status(200).json(logs);
    } catch (error) {
        console.error('Error in getStudentLogs:', error);
        return res.status(500).json({ 
            message: 'Failed to fetch student logs', 
            error: error.message,
            stack: error.stack 
        });
    }
};

module.exports = getStudentLogs;