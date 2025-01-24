const express = require('express');

const router = express.Router('/itadmin');


const auth = require('../../middleware/itAdminAuth');




router.post('/login', require('../../controllers/IT-Admin/login'));

router.post('/addUser',auth, require('../../controllers/IT-Admin/addUser'));

router.post('/addBulkStudents',auth, require('../../controllers/IT-Admin/addBulkStudents'));

router.post('/addStudent',auth, require('../../controllers/IT-Admin/addStudent'));

router.post('/deleteWholeBatch',auth, require('../../controllers/IT-Admin/deleteWholeBatch'));

router.post('/deleteStudent',auth, require('../../controllers/IT-Admin/deleteStudent'));

router.post('/deleteUser',auth, require('../../controllers/IT-Admin/deleteUser'));

router.get('/getRegistrar',auth, require('../../controllers/IT-Admin/getUsers').getRegistrar);

router.get('/getHostelWarden',auth, require('../../controllers/IT-Admin/getUsers').getHostelWarden);

router.get('/getSecurityManager',auth, require('../../controllers/IT-Admin/getUsers').getSecurityManager);

router.get('/getStaff',auth, require('../../controllers/IT-Admin/getUsers').getStaff);

router.get('/getFaculty_adminBlock',auth, require('../../controllers/IT-Admin/getUsers').getFaculty_adminBlock);

router.get('/getStudentData',auth, require('../../controllers/IT-Admin/getStudentData'));







module.exports = router;