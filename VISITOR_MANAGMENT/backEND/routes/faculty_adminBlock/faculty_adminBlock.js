const express = require('express');

const router = express.Router();
const auth = require('../../middleware/faculty_adminBlock');

router.post('/login',require('../../controllers/faculty_adminBlock/login'));

router.post('/addVisitor',auth,require('../../controllers/faculty_adminBlock/addVisitor'));

router.get('/getVisitors',auth,require('../../controllers/faculty_adminBlock/getVisitor'));

module.exports = router;