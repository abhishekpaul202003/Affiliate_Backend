const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OtpVerification } = require('../NodeMailer/AllMailFormate')
const { userProfileURL } = require('../cloudinary/ImageUrl')


exports.CreateUser = async (req, res) => {
    try {
        const data = req.body;
        const imgData = req.file;
       
        

        const { name, email, password } = data;
        const randomOTP = Math.floor(1000 + Math.random() * 9000)

        const checkUser = await userModel.findOneAndUpdate({ email: email }, { $set: { otp: randomOTP } }, { new: true })

        if (checkUser) {
            if (checkUser.isDelete) return res.status(400).send({ status: true, msg: 'User Already Deleted' })
            if (!checkUser.isAccountActive) return res.status(400).send({ status: true, msg: 'User Already Block' })
            if (checkUser.isVerify) return res.status(400).send({ status: true, msg: 'Account Already Verify Pls LogIn' })
            OtpVerification(name, email, randomOTP)

            return res.status(200).send({ status: true, msg: 'Otp Send Successfully...', id: checkUser._id, email: checkUser.email })
        }

        if (imgData) {
            
            const producturl = await userProfileURL(imgData.path)
            data.profileImg = [{ public_id: producturl.public_id, url: producturl.secure_url }]
        }

        data.password = await bcrypt.hash(password, 10)

        data.otp = randomOTP
        data.role = 'user'
        OtpVerification(name, email, randomOTP)
        const DB = await userModel.create(data)
        res.status(201).send({ status: true, msg: 'Successfully SignUp', id: DB._id, email: DB.email })


    }
    catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}



exports.otpVerification = async (req, res) => {
    try {
        const id = req.params.userId;
        const otp = req.body.otp;

        const checkUser = await userModel.findById(id)

        if (!checkUser) return res.status(404).send({ status: false, msg: 'User Not Found pls SignUp' })

        if (checkUser) {
            if (checkUser.isDelete) return res.status(400).send({ status: true, msg: 'User Already Deleted' })
            if (!checkUser.isAccountActive) return res.status(400).send({ status: true, msg: 'User Already Block' })
            if (checkUser.isVerify) return res.status(400).send({ status: true, msg: 'Account Already Verify Pls LogIn' })
        }

        if (!(otp == checkUser.otp)) return res.status(400).send({ Satus: false, msg: 'Wrong Otp' })

        await userModel.findByIdAndUpdate({ _id: id }, { $set: { isVerify: true } })

        res.status(200).send({ status: true, msg: "Otp Verify Successfully" })
    }
    catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}


exports.UserLogIn = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = data;

        const findUser = await userModel.findOne({ email: email,role:'user' })

        if (!findUser) return res.status(404).send({ status: false, msg: 'User Not Found pls SignUp' })

        if (findUser) {
            const { isDelete, isAccountActive, isVerify } = findUser
            if (isDelete) return res.status(400).send({ status: true, msg: 'User Already Deleted' })
            if (!isAccountActive) return res.status(400).send({ status: true, msg: 'User Already Block' })
            if (!isVerify) return res.status(400).send({ status: true, msg: 'Account not Verify pls Verify OTP' })
        }

        const checkPass = await bcrypt.compare(password, findUser.password)
        if (!checkPass) return res.status(400).send({ status: false, msg: 'Wrong Password' })

        const userData = {
            img: findUser.profileImg,
            name: findUser.name,
            email: findUser.email,
        }

        const token = await jwt.sign({ userId: findUser._id }, process.env.UserToken, { expiresIn: '1m' })

        res.status(200).send({ status: true, userid: findUser._id, token: token, data: userData })

    }
    catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}

