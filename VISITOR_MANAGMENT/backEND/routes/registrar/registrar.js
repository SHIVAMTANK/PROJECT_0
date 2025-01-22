const express = require('express');

const router = express.Router();

const auth = require('../../middleware/registrarAuth');

router.post('/login', require('../../controllers/registrar/login'));

router.get('/getCurrentVisitors',auth,require('../../controllers/dataTables/getCurrentVisitors'));

router.get('/getStudentLogs', auth,require('../../controllers/dataTables/getStudentLogs'));

router.get('/getVisitorsLogs',auth, require('../../controllers/dataTables/getVisitorsLogs'));

router.get('/getStaffLogs',auth, require('../../controllers/dataTables/getStaffLogs'));

router.get('/getParentLogs', auth,require('../../controllers/dataTables/getParentLogs'));


module.exports = router;