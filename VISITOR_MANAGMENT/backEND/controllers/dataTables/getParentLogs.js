const parent = require('../../models/logs/parent');

const getParentLogs = async (req, res) => {
    
    try {
        const parents = await parent.find();
        res.status(200).send(parents);
    } catch (error) {
        console.log("This is error from ./controllers/dataTables/getParentLogs.js");
        console.log(error);
        res.status(500).send();
    }
}

module.exports = getParentLogs;