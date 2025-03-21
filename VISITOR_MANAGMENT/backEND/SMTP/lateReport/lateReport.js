const mailTransporter = require('../utils/setup');

const sendLateReport = async (reportData) => {
    try {
        // Make sure we have a recipient email
        if (!reportData.email) {
            console.error('No recipient email provided for late report');
            return false;
        }

        const mailOptions = {
            from: '"Visitor Management System" <shivamtank8059@gmail.com>',
            to: reportData.email, // Make sure this is defined
            subject: 'Late Entry Report',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Late Entry Report</h2>
                    <p>Hello ${reportData.name || 'User'},</p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Date:</strong> ${reportData.date || new Date().toLocaleDateString()}</p>
                        <p><strong>Time:</strong> ${reportData.time || new Date().toLocaleTimeString()}</p>
                        <p><strong>Reason:</strong> ${reportData.reason || 'Late Entry'}</p>
                    </div>
                    <p>Best regards,<br>Visitor Management System</p>
                </div>
            `
        };

        await mailTransporter.sendMail(mailOptions);
        console.log('Late report email sent successfully!');
        return true;
    } catch (error) {
        console.error('Error sending late report email:', error);
        return false;
    }
};

module.exports = sendLateReport;