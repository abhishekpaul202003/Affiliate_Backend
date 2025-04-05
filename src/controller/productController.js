const productModel = require('../model/ProductModel')
const userModel = require('../model/userModel')


exports.product = async (req, res) => {
    try {
        
        res.status(200).send({ status: true, msg: "Product Create Successfully" })
    }
    catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}