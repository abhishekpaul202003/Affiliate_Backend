const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AdminOTPVerify } = require('../NodeMailer/AllMailFormate')





exports.AdminLogIn = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = data;

        const randomOTP = Math.floor(1000 + Math.random() * 9000)
        const findUser = await userModel.findOneAndUpdate({ email: email, role: 'Admin' },
            { $set: { Adminotp: randomOTP, AdminlOtpExpires: Date.now() + 1000 * 60 * 5 } },
            { new: true })


        if (!findUser) return res.status(404).send({ status: false, msg: 'Admin Not Found pls Enter Admin Account' })

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


        AdminOTPVerify(findUser.name, email, randomOTP)
        const token = await jwt.sign({ userId: findUser._id }, process.env.UserToken, { expiresIn: '1m' })
        res.status(200).send({ status: true, adminid: findUser._id, token: token, data: userData })

    }
    catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}




exports.AdminOTPVerification = async (req, res) => {
    try {
        const id = req.params.id;
        const otp = req.body.otp;

        console.log(id,otp)

        const checkUser = await userModel.findOne({ _id: id, role: 'Admin' })

        if (!checkUser) return res.status(404).send({ status: false, msg: 'Admin Not Found pls LogIn Again' })

        if (!(otp == checkUser.Adminotp)) return res.status(400).send({ Satus: false, msg: 'Wrong Otp' })

        res.status(200).send({ status: true, msg: "Otp Verify Successfully" })
    }
    catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}

