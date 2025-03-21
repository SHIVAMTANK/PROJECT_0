const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "shivamtank8059@gmail.com",
        pass: 'uybw fyeg uoga dpub'
    },
    tls: {
        rejectUnauthorized: false // This will fix the self-signed certificate error
    },
    debug: true
});

// Simple verification
mailTransporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

module.exports = mailTransporter;