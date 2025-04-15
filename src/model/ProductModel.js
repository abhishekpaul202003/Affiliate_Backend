const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    images: [{ public_id: { type: String, required: true }, url: { type: String, required: true } }],
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, maxlength: 8, default: 0.0 },
    discountPrice: { type: Number, maxlength: 8 },
    category: {
        type: String, required: true,
        enum: ['Electronics', 'mobile', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home']
    },
    stock: { type: Number, required: true, maxlength: 100, default: 0 },
    ratings: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
    reviews: [
        {
            user: { type: mongoose.Schema.ObjectId, ref: 'UserDsB', required: true },
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true }
        }
    ],
    user: { type: mongoose.Schema.ObjectId, ref: 'UserDsB', required: false },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    tags: { type: [String], required: false },
    specifications: { type: Map, of: String }
},
    { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);