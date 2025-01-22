const express = require('express');

const router = express.Router();


const auth = require('../../middleware/securityManagerAuth');


router.post('/login', require('../../controllers/securityManager/login'));

router.get('/getTodaysShift',auth, require('../../controllers/securityManager/getTodaysShift'));

router.post('/addShift',auth, require('../../controllers/securityManager/addShift'));

router.get('/getShiftLogs',auth, require('../../controllers/securityManager/getShiftLogs'));

router.get('/getAllSecurities',auth, require('../../controllers/securityManager/getAllSecurities'));



module.exports = router;

