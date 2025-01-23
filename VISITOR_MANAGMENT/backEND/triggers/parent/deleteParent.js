const parent = require('../../models/static/parent/parent');

const deleteParent = async (req, res) => {
    
    try {
        const currentDate = new Date();
        const result = await parent.deleteMany({arrival_date: { $lt: currentDate }});
        return;

    } catch (error) {
        console.log("This is error from ./triggers/parent/deleteParent.js")
        console.error(error);
        return;
    }
}

module.exports = deleteParent;