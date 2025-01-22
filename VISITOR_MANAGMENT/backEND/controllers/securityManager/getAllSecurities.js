const security = require('../../models/static/security/security');



const getAllSecurities = async (req, res) => {

    try {

        const pipe = [{
            $project:{
                uuid:1,
                name:1,
            }
        }]

        const securities = await security.aggregate(pipe);
        res.status(200).send(securities);
    } catch (error) {
        console.log("This is error from ./backEND/controllers/securityManager/getAllSecurities.js");
        console.log(error);
        res.status(404).send({ message: "Internal Server Error"});
    }
}

module.exports = getAllSecurities;