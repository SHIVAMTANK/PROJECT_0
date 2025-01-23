const mailTransporter = require('../utils/setup');

const sendReport = async (data,date) => {
        try{
            let mailDetails = {
                from: 'Hostel-mailGate',
                to:process.env.LATE_EMAIL,
                subject:`Late Students`,
                template:'Late',
                context:{
                    users:data,
                     text:`This report is generated at ${date} IST. The following students are still not reported on campus.`
                }
            }


            const s = await mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('This is error from ./SMTP/lateReport/lateReport.js');
                    console.log(err);
                    return 0;
                } else {
                    // console.log('Email sent successfully');
                    return 1;
                }
            });
        }catch(error){
            console.log("This is error from ./SMTP/lateReport/lateReport.js");
            console.log(error);
        }
}

module.exports = sendReport;