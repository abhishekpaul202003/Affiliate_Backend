const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profileImg: [{ public_id: { type: String, required: true }, url: { type: String, required: true } }],
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    isDelete: { type: Boolean, default: false },
    isVerify: { type: Boolean, default: false },
    isAccountActive: { type: Boolean, default: true },
    role: { type: String, enum: ['user', 'Admin'], required: true, trim: true },
    otp: { type: String, required: true, trim: true },
    Adminotp: { type: String, required: false, trim: true },
    isAdminVerify: { type: Boolean, default: false },
    AdminlOtpExpires: { type: String, required: false, trim: true },
},

    { timestamps: true }
)

module.exports = mongoose.model('UserDsB', userSchema);