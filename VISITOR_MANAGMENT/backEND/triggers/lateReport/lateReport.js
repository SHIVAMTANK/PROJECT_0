const student_transactional = require('../../models/transactional/student');

const mailer = require('../../SMTP/lateReport/lateReport');

const late = async () => {

    try {

        const pipe = [
            {
                $match: {
                    isLongLeave: false
                }
            },
            {
                $project: {
                    student_id: 1,
                    name: 1,
                    exit_time: 1
                }
            }
        ]

        const late_students = await student_transactional.aggregate(pipe);

        const current_time = new Date();
        const options = {
            timeZone: "Asia/Kolkata",
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const istDateTime = current_time.toLocaleString("en-IN", options);


        const mail = await mailer(late_students, istDateTime);


    } catch (error) {
        console.log("This is error from ./triggers/lateReport/lateReport.js");
        console.log(error);
    }

}


module.exports = late;