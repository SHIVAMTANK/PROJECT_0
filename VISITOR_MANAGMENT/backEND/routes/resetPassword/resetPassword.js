const express = require('express');

const router = express.Router();



router.post('/initResetPassword', require('../../controllers/resetPassword/initResetPassword'));
router.post('/resetPassword', require('../../controllers/resetPassword/resetPassword'));

router.get('/reset-password', require('../../controllers/resetPassword/resetPasswordHBS'));



module.exports = router;