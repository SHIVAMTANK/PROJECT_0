const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const security = require('../../models/static/security/security');
const currentShift = require('../../models/securityShifts/currentShift');


const login = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const current_time = new Date();
        const options = {
            timeZone: "Asia/Kolkata",
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23' // Add this line to get 24-hour format
        };
        const loginTime = current_time.toLocaleString("en-IN", options).match(/\d{1,2}:\d{2}/)[0];

        console.log(loginTime);

        const shiftTimings = {
            shift1: { start: '07:00', end: '15:00' },
            shift2: { start: '15:00', end: '23:00' },
            shift3: { start: '23:00', end: '07:00' }
        };

        const user = await security.findOne({ email: email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const curShifts = await currentShift.findOne({});

        const usersShift = curShifts.shift1.includes(user.uuid) ? '1' : curShifts.shift2.includes(user.uuid) ? '2' : curShifts.shift3.includes(user.uuid) ? '3' : null;

        if (!usersShift) {
            res.status(402).send({message:'Your account has been disabled till the next shift starts.'});
            return;
        }

        const shiftTime = shiftTimings[`shift${usersShift}`];

        // console.log(shiftTime);

        if (!isTimeInRange(loginTime, shiftTime.start, shiftTime.end)) {
            res.status(402).send({message:'Your account has been disabled till the next shift starts.'});
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(401).send("Invalid Password");
        }
        const token = jwt.sign({ name: user.name, email: user.email, uuid: user.uuid }, process.env.JWT_SECRET);

        res.status(200).send({ user, token });
    }
    catch (error) {
        console.log('This error is from ./controller/security/login.js');
        console.log(error);
        res.status(500).send();
    }
}


const isTimeInRange = (time, start, end) => {

    // console.log(time, start, end);

    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const [timeHour, timeMinute] = time.split(':').map(Number);

    const startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    const loginTime = new Date();
    loginTime.setHours(timeHour, timeMinute, 0, 0);

    if (startTime <= endTime) {
        return loginTime >= startTime && loginTime <= endTime;
    } else {
        // For overnight shifts
        return loginTime >= startTime || loginTime <= endTime;
    }
};

module.exports = login;
