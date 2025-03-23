const express = require('express');

const fileUpload = require('express-fileupload');

const cors = require('cors');

require('dotenv').config();
const app = express();

//view engine setup
app.set('views', './hbsTemplates');
app.set('view engine', 'hbs');

//middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const corsOptions = {
    origin: '*', //allow all origin
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connection
require('./connection/connect');

//mailer
require('./SMTP/utils/setup');

//triggers
require('./triggers/controller');

//ENV variables

const port = process.env.PORT || 7777;

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadDir = 'uploads/visitors';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/student',require('./routes/student/student'));
app.use('/security',require('./routes/security/security'));
app.use('/hostelWarden',require('./routes/hostelWarden/hostelWarden'));

app.use('/staff', require('./routes/staff/staff'));
app.use('/reset', require('./routes/resetPassword/resetPassword'));
app.use('/itAdmin', require('./routes/IT-Admin/itAdmin'));
app.use('/registrar', require('./routes/registrar/registrar'));
app.use('/faculty_adminBlock', require('./routes/faculty_adminBlock/faculty_adminBlock'));
app.use('/securityManager', require('./routes/securityManager/securityManager'));

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
    
})
