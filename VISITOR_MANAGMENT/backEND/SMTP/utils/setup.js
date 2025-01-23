const nodemailer = require('nodemailer')
const hbs = async () => (await import('nodemailer-express-handlebars')).default;

const mailTransporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    service:'gmail',
    port:'465',
    secure: true,
    auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
    },
});

const handlebarOption = {
    viewEngine: {
        extName: '.hbs',
        partialsDir:'../backEND/hbsTemplates/',
        layoutsDir:'../backEND/hbsTemplates/',
        defaultLayout:false,
    },viewPath:'../backEND/hbsTemplates/',extName:'.hbs'
}
mailTransporter.use('compile',hbs(handlebarOption));

mailTransporter.verify((error, success) => {
    if (error) console.log(error);
    console.log("SMTP Server is ready");
});

module.exports = mailTransporter;