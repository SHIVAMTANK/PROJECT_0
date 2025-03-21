const faculty_adminBlock = require('../models/static/faculty_adminBlock/faculty_adminBlock');

const jwt = require('jsonwebtoken');


const auth = async (req, res,next) => {

    try {
        // console.log(req.headers)
        const token = req.header('Authorization');
        const data = await jwt.verify(token, "mysecret");
        if(data.uuid.endsWith('faculty_adminBlock') === false){
            return res.status(401).send({
                message: 'Auth failed'
            });
        }
        // console.log(data);
        req.user = data;
        next();
    } catch (error) {
        console.log("This is error from ./middleware/faculty_adminBlock.js");
        console.log(error);
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
}


module.exports = auth;