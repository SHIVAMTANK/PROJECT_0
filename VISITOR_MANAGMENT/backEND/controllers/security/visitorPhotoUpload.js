const multer = require('multer');
const VisitorTransactional = require('../../models/transactional/visitor');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/visitors/');
    },
    filename: (req, file, cb) => {
        cb(null, `visitor-${req.body.visitorId}-${Date.now()}.png`);
    }
});

const upload = multer({ storage }).single('photo');

const uploadPhoto = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error uploading photo',
                error: err.message
            });
        }

        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No photo uploaded'
                });
            }

            // Update visitor record with photo path
            await VisitorTransactional.findOneAndUpdate(
                { uuid: req.body.visitorId },
                { photo_entry: req.file.path }
            );

            res.status(200).json({
                success: true,
                message: 'Photo uploaded successfully'
            });

        } catch (error) {
            console.error('Error saving photo path:', error);
            res.status(500).json({
                success: false,
                message: 'Error saving photo information',
                error: error.message
            });
        }
    });
};

module.exports = uploadPhoto; 