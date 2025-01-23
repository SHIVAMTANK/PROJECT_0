const mailTransporter = require('../utils/setup');


const sendReport = async (buffer,month)=>{
    let mailDetails = {
        from:'Hostel-MainGate',
        to:process.env.ATTENDENCE_EMAIL,
        subject:`Attendance Report for ${month} `,
        attachments:[
            {
                filename:'Attendance_Report.xlsx',
                content:buffer,
                contentType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        ],
        template:'attendence',
        context :{
            text: 'This email contains your attendance report.',
        }
    }

    const s = await mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('This is error from ./SMTP/attendence/sendMail.js');
            console.log(err);
            return 0;
        } else {
            // console.log('Email sent successfully');
            return 1;
        }
    });
}
module.exports = sendReport;
