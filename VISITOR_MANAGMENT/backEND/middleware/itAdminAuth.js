const itAdmin = require('../models/static/IT-Admin/IT-Admin');
const jwt = require('jsonwebtoken');

const itAdminAuth = async (req, res, next) => {
    try {
        
        const token = req.header('Authorization');
        
        const decoded = await jwt.verify(token, "mysecret");
        
        

        if(decoded.uuid.endsWith('itAdmin') === false){
            return res.status(401).send({ error: 'Auth Failed' });
        }

        req.user = decoded;  
        next();
    }
    catch (e) {
        console.log("This is error from ./middleware/itAdminAuth.js");
        console.log(e);
        res.status(401).send({ error: 'Auth Failed' });
    }
}


module.exports = itAdminAuth;