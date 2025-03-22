const VisitorStatic = require('../../models/static/visitor/visitor');
const VisitorTransactional = require('../../models/transactional/visitor');
const uuid = require('uuid');

const createVisitor = async (req, res) => {
    try {
        // Validate required fields
        const { name, mobile, email, purpose } = req.body;

        if (!mobile) {
            return res.status(400).json({
                success: false,
                message: 'Mobile number is required'
            });
        }

        if (!name || !email || !purpose) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and purpose are required'
            });
        }

        const visitorId = uuid.v4();
        
        // Create static visitor record
        const staticVisitor = new VisitorStatic({
            uuid: visitorId,
            name: name,
            mobile: mobile,
            email: email,
            purpose: purpose,
            arrival_date: new Date()
        });

        // Create transactional visitor record
        const transVisitor = new VisitorTransactional({
            uuid: visitorId,
            name: name,
            mobile: mobile,
            purpose: purpose,
            entry_time: new Date().toLocaleTimeString()
        });

        // Log the data being saved for debugging
        console.log('Static visitor data:', staticVisitor);
        console.log('Transactional visitor data:', transVisitor);

        await Promise.all([
            staticVisitor.save(),
            transVisitor.save()
        ]);

        res.status(200).json({
            success: true,
            message: 'Visitor created successfully',
            uuid: visitorId
        });

    } catch (error) {
        console.error('Error creating visitor:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating visitor',
            error: error.message
        });
    }
};

module.exports = createVisitor; 