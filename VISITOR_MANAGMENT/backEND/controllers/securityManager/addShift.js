const security = require('../../models/static/security/security');
const shiftLogs = require('../../models/securityShifts/shiftLogs');
const currentShift = require('../../models/securityShifts/currentShift');


const addShift = async (req, res) => {

    try {

        await currentShift.deleteMany({});

        const jsFrontendDate = new Date(req.body.date);

        // Extract day, month, and year from the JavaScript Date object
        let day = jsFrontendDate.getDate();
        let month = jsFrontendDate.getMonth() + 1; // Months are zero-indexed, so add 1

        if(day < 10){ 
            day = `0${day}`;
        }
        if(month < 10){
            month = `0${month}`;
        }
        const year = jsFrontendDate.getFullYear();

        // Format database date as "25/06/2024"
        const databaseDate = `${day}/${month}/${year}`;

        const check = await currentShift.findOne({ date: databaseDate });

        // if (check) {
        //     return res.status(403).send({ message: "Shifts already added for today" });
        // }


        const { shift1, shift2, shift3 } = req.body;

        const newShift = new currentShift({
            date: databaseDate,
            shift1 : [],
            shift2 : [],
            shift3 : []
        });

        const newShiftLog = ({
            date: databaseDate,
            shift1: [],
            shift2: [],
            shift3: []
        });

        const pipe = [
            {
                $project: {
                    uuid: 1,
                    mobile: 1,
                    name: 1,
                }
            }
        ]

        const data = await security.aggregate(pipe);

        // console.log(data);

        for (shift in shift1) {
            const uuid = shift1[shift];
            newShift.shift1.push(uuid);
            newShiftLog.shift1.push(data.find(guard => guard.uuid === uuid));           
        }

        for (shift in shift2) {
            const uuid = shift2[shift];
            newShift.shift2.push(uuid);
            newShiftLog.shift2.push(data.find(guard => guard.uuid === uuid));
        }

        for (shift in shift3) {
            const uuid = shift3[shift];
            newShift.shift3.push(uuid);
            newShiftLog.shift3.push(data.find(guard => guard.uuid === uuid));
        }

        // console.log(newShift);
        // console.log(newShiftLog);

        await newShift.save();
        const shiftLog = new shiftLogs(newShiftLog);
        await shiftLog.save();


        

        // const shiftLog = {
        //     shift1: [],
        //     shift2: [],
        //     shift3: [],
        //     date: databaseDate
        // };

        // for (guard in data) {
        //     if (data[guard].shift === 1) {
        //         shiftLog.shift1.push(data[guard]);
        //     }
        //     else if (data[guard].shift === 2) {
        //         shiftLog.shift2.push(data[guard]);
        //     }
        //     else if (data[guard].shift === 3) {
        //         shiftLog.shift3.push(data[guard]);
        //     }
        // }

        

        res.status(200).json({ message: "Shifts added successfully" });


    } catch (error) {
        console.log("This is error from ./backEND/controllers/securityManager/addShift.js");
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

module.exports = addShift;

