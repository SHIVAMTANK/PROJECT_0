const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, "mysecret");
            req.user = decoded;
            next();
        } catch (e) {
            console.error('Token verification failed:', e);
            res.status(401).json({
                success: false,
                message: 'Token verification failed'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = auth;