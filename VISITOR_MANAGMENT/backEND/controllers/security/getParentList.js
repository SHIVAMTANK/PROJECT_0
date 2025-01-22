const parent = require('../../models/static/parent/parent');


const getParentList = async (req, res) => {
    try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

        const parents = await parent.find({
            arrival_date: {
                $gte: startOfToday,
                $lt: startOfTomorrow
            }
        });
        res.status(200).send(parents);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

module.exports = getParentList;































