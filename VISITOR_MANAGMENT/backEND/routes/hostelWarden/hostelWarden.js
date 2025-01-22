const express = require('express');

const router = express.Router();

const auth = require('../../middleware/hostelWardenAuth');

router.post('/login',require('../../controllers/hostelWarden/login'));

router.post('/addVehicle',auth,require('../../controllers/hostelWarden//addVehicle'));

router.post('/removeVehicle',auth,require('../../controllers/hostelWarden/removeVehicle'));


router.get('/getVehicle',auth, require('../../controllers/hostelWarden/getVehicle'));

router.get('/getStudentData',auth, require('../../controllers/hostelWarden/getStudentData'));

router.post('/addParentVisit',auth, require('../../controllers/hostelWarden/addParentVisit'));

router.get('/getStudentLogs', auth,require('../../controllers/dataTables/getStudentLogs'));






module.exports = router;