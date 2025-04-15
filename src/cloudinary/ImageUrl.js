const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
require('dotenv').config();
 
 cloudinary.config({ 
    cloud_name: process.env.CloudName, 
    api_key: process.env.APIKey, 
    api_secret: process.env.APISecret
});

exports.userProfileURL = async(img)=>{
    try{
        
        const optimizedBuffer = await sharp(img)
        .resize(720, 480, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 40, mozjpeg: true }).toBuffer();

        
    const uploadResult = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`,
        { resource_type: 'auto', quality: 'auto' });

       return uploadResult
    }
    catch(e){console.log(e.message)}
}




exports.ProductProfileURL = async(img)=>{
    try{

        const optimizedBuffer = await sharp(img)
        .resize(1080, 720, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 40, mozjpeg: true }).toBuffer();

        
    const uploadResult = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`,
        { resource_type: 'auto', quality: 'auto' });

       return uploadResult
    }
    catch(e){console.log(e.message)}
}