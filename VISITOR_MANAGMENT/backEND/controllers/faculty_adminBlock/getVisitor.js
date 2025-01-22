const visitor = require('../../models/static/visitor/visitor');


const getVisitors = async (req, res) => {
        
    try {
        
        const scheduled_by = req.user.uuid;
        const visitors = await visitor.find({scheduled_by: scheduled_by});
        res.status(200).send({visitors});

    } catch (error) {
        console.log("This is an error from ./controllers/visitor/getVisitors.js");
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }

}

module.exports = getVisitors;