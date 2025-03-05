const jwt = require('jsonwebtoken');


const auth = async (req, res,next) => {

    try {
        // console.log(req.headers)
        const token = req.headers.authorization;
        const data = await jwt.verify(token, "mysecret");
        // console.log(data);
        if(data.user.uuid.endsWith('securityManager') === false){
            return res.status(401).send({
                message: 'Auth failed'
            });
        }
        req.user = data;
        next();
    } catch (error) {
        console.log("This is error from ./middleware/securityManagerAuth.js");
        console.log(error);
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
}


module.exports = auth;
