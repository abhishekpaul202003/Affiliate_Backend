const { ValidaName, ValidaEmail, ValidPassword } = require('../Validation/AllValidation')

exports.validUser = (req, res, next) => {
    try {
        const data = req.body;
        const { name, email, password } = data;

        if (!name) return res.status(400).send({ status: false, msg: 'Pls Provided Name' })
        if (!ValidaName(name)) return res.status(400).send({ status: false, msg: 'Invalid Name' })

        if (!email) return res.status(400).send({ status: false, msg: 'Pls Provided Email' })
        if (!ValidaEmail(email)) return res.status(400).send({ status: false, msg: 'Invalid Email' })

        if (!password) return res.status(400).send({ status: false, msg: 'Pls Provided Password' })
        if (!ValidPassword(password)) return res.status(400).send({ status: false, msg: 'Invalid Password' })

        next()
    }
    catch (e) { res, status(500).send({ status: false, msg: e.message }) }
}

exports.validUserLog = (req, res, next) => {
    try {
        const data = req.body;
        const { email, password } = data;

        if (!email) return res.status(400).send({ status: false, msg: 'Pls Provided Email' })
        if (!ValidaEmail(email)) return res.status(400).send({ status: false, msg: 'Invalid Email' })

        if (!password) return res.status(400).send({ status: false, msg: 'Pls Provided Password' })
        if (!ValidPassword(password)) return res.status(400).send({ status: false, msg: 'Invalid Password' })

        next()
    }
    catch (e) { res, status(500).send({ status: false, msg: e.message }) }
}

