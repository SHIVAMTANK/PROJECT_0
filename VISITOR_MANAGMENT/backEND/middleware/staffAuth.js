const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // console.log(req.headers)
        const token = req.header('Authorization');
        console.log(token);
        
        const data = jwt.verify(token, "mysecret");
        if (data.uuid.endsWith('staff') === false) {
            return res.status(401).send({
                message: 'Auth failed'
            });
        }
        // console.log(data);
        req.user = data;
        next();
    } catch (error) {
        console.log("This is error from ./middleware/staffAuth.js");
        console.log(error);
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
};

module.exports = auth;
