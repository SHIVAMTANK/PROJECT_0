const nodemailer = require('nodemailer')
const hbs = async () => (await import('nodemailer-express-handlebars')).default;

const mailTransporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    service:'gmail',
    port:587,
    secure: false,
    auth:{
        user:"shivamtank8059@gmail.com",
        pass:'axmk bkhw nlso xrbk'
    },
    tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
    },
    // logger:true,
    // debug:true
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