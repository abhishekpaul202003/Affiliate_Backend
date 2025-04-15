const userModel = require('../model/userModel');
const productModel = require('../model/ProductModel');
const { ProductProfileURL } = require('../cloudinary/ImageUrl')


exports.product = async (req, res) => {

    try {

        const data = req.body;
        const img = req.file;

       

        if (img) {
            const producturl = await ProductProfileURL(img.path)
            data.images = [{ public_id: producturl.public_id, url: producturl.secure_url }]
        }



        const productDB = await productModel.create(data)

        res.status(200).send({ status: true, msg: "Product Create Successfully", data: productDB })
    }


    catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}