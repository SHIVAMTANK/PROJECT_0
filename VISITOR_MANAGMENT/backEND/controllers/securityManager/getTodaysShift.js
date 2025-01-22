// const { $where } = require('../../models/securityShifts/currentShift');
const security = require('../../models/static/security/security');
const securityShift = require('../../models/securityShifts/currentShift');

const getTodaysShift = async (req, res) => {

    try {

        const shift = (await securityShift.find())[0];

        // console.log(shift);

        const securities = [];

        const pipe = [
            {
                $project: {
                    name: 1,
                    uuid: 1,
                }
            }
        ]

        const securityList = await security.aggregate(pipe);

        // console.log(securityList);

        for (data in shift.shift1) {
            const securityData = securityList.find((item) => item.uuid == shift.shift1[data]);
            // console.log(securityData);
            securityData.shift = 1;
            securities.push(securityData);
        }

        for (data in shift.shift2) {
            const securityData = securityList.find((item) => item.uuid == shift.shift2[data]);
            // console.log(securityData);
            securityData.shift = 2;
            securities.push(securityData);
        }

        for (data in shift.shift3) {
            const securityData = securityList.find((item) => item.uuid == shift.shift3[data]);
            // console.log(securityData);
            securityData.shift = 3;
            securities.push(securityData);
        }

        // console.log(securities);


        res.status(200).send(securities);

    } catch (error) {
        console.log("This is error from ./backEND/controllers/securityManager/getTodaysShift.js");
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

}


module.exports = getTodaysShift;