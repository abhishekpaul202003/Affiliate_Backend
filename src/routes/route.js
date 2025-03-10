const express = require('express');
const multer = require('multer');
const { CreateUser, otpVerification, UserLogIn } = require('../controller/userController')
const { validUser, validUserLog } = require('../middewale/AllAuth')
const router = express.Router();

const upload = multer({ storage: multer.diskStorage({}) });

router.post('/CreateUser', upload.single('profileImg'), validUser, CreateUser)
router.post('/otpVerification/:userId', otpVerification)
router.post('/UserLogIn', validUserLog, UserLogIn)

router.all('/*', (req, res) => { return res.status(404).send({ status: false, msg: 'Invalid URL' }) })

module.exports = router;



