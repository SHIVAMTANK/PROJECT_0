const express = require('express');



const router = express.Router();

const auth = require('../../middleware/studentAuth');



router.post('/login',require('../../controllers/students_alumni/login'));
router.get('/getData',auth,require('../../controllers/students_alumni/getData'));






module.exports = router;