const cron = require('node-cron');

cron.schedule('16 10 * * *',require('./attendence/monthlyUpdate'));

cron.schedule('5 0 * * *', require('./lateReport/lateReport'));

cron.schedule('5 0 * * *', require('./parent/deleteParent'));

cron.schedule('5 0 * * *', require('./visitor/visitor'));