const express = require('express');
const multer = require('multer');
const { CreateUser, otpVerification, UserLogIn } = require('../controller/userController')
const { product } = require('../controller/productController')
const { validUser, validUserLog } = require('../middewale/AllAuth')
const router = express.Router();

const upload = multer({ storage: multer.diskStorage({}) });

router.post('/CreateUser', upload.single('profileImg'), validUser, CreateUser)
router.post('/otpVerification/:userId', otpVerification)
router.post('/UserLogIn', validUserLog, UserLogIn)

// Create Product
router.post('/CreateProduct', upload.single('images'), product)


router.all('/*', (req, res) => { return res.status(404).send({ status: false, msg: 'Invalid URL' }) })

module.exports = router;



