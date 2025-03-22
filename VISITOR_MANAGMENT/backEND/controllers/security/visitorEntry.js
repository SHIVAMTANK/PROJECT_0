const visitor = require('../../models/static/visitor/visitor');
const visitor_transactional = require('../../models/transactional/visitor');

const faculty_adminBlock = require('../../models/static/faculty_adminBlock/faculty_adminBlock');

const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/visitors/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'visitor-' + uniqueSuffix + '.png');
    }
});

// Create multer instance with more relaxed settings
const upload = multer({ storage }).single('photo');

// Wrap the middleware in a promise
const handleUpload = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

const visitorEntryExit = async (req, res) => {

    try {

        const body = {...req.body};
       
        if (body.hasOwnProperty('uuid')) {
            const uuid = req.body.uuid;

            const file = req.files.photo;
            const photoUrl = await handleUpload(req, res);

            const visitorData = await visitor.findOne({ uuid: uuid });

            if (visitorData) {
                const exit_time = new Date();
                const options = {
                    timeZone: "Asia/Kolkata",
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                };
                const istDateTime = exit_time.toLocaleString("en-IN", options);

                const faculty_adminBlockName = (await faculty_adminBlock.findOne({ uuid: visitorData.scheduled_by })).name;

                const newTransaction = new visitor_transactional({
                    uuid: uuid,
                    name: visitorData.name,
                    mobile: visitorData.mobile,
                    purpose: visitorData.purpose,
                    photo_entry: photoUrl,
                    entry_time: istDateTime,
                    scheduled_by: faculty_adminBlockName,
                    entry_authorised_by: req.user.name
                });

                const save = await newTransaction.save();

                // delete from static
                const deleteVisitor = await visitor.findOneAndDelete({ uuid: uuid });

                res.status(200).send({ uuid: uuid });

            }
        }

        else {

            const current_time = new Date();
            const options = {
                timeZone: "Asia/Kolkata",
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            const istDateTime = current_time.toLocaleString("en-IN", options);

            const _uuid = `${uuid.v4()}visitor`;

            const name = req.body.name;
            const mobile = req.body.mobile;
            const purpose = req.body.purpose;
            const photo = req.files.photo;
            const entry_time = istDateTime;

            // upload photo to blob
            const photoUrl = await handleUpload(req, res);


            const new_visitor = new visitor_transactional({
                uuid: _uuid,
                name: name,
                mobile: mobile,
                purpose: purpose,
                photo_entry: photoUrl,
                entry_time: entry_time,
                entry_authorised_by: req.user.name
            });

            const save = await new_visitor.save();

            res.status(200).send({ uuid: _uuid });

        }


    } catch (error) {
        console.log("This is error from ./controllers/security/visitorEntryExit.js");
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const visitorEntry = (req, res) => {
    // Always ensure we send a JSON response
    const sendJsonResponse = (status, data) => {
        res.status(status).json({
            success: status === 200,
            ...data,
            timestamp: new Date().toISOString()
        });
    };

    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error('Upload error:', err);
                return sendJsonResponse(400, {
                    message: 'File upload failed',
                    error: err.message
                });
            }

            try {
                // Log received data
                console.log('Form data:', req.body);
                console.log('File:', req.file);

                // Validate required fields
                if (!req.body.name || !req.body.email) {
                    return sendJsonResponse(400, {
                        message: 'Missing required fields'
                    });
                }

                // Generate a unique ID for the visitor
                const visitorId = Date.now().toString();

                // Send success response
                return sendJsonResponse(200, {
                    message: 'Visitor entry created successfully',
                    uuid: visitorId
                });

            } catch (error) {
                console.error('Processing error:', error);
                return sendJsonResponse(500, {
                    message: 'Error processing visitor entry',
                    error: error.message
                });
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        return sendJsonResponse(500, {
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = visitorEntry;




