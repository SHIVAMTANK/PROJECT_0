const express = require('express');



const router = express.Router('/staff');

const auth = require('../../middleware/staffAuth');



router.post('/login',require('../../controllers/staff/login'));
router.get('/getData',auth,require('../../controllers/staff/getData'));






module.exports = router;