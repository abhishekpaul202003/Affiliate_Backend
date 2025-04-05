const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: [100, 'Product name cannot exceed 100 characters'] },
    description: { type: String, required: [true, 'Please enter product description'], trim: true },
    price: { type: Number, required: [true, 'Please enter product price'], maxlength: [8, 'Price cannot exceed 8 characters'], default: 0.0 },
    discountPrice: { type: Number, maxlength: [8, 'Discount price cannot exceed 8 characters'] },
    images: [
        {
            public_id: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],
    category: {
        type: String, required: [true, 'Please select category for this product'],
        enum: {
            values: ['Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home'],
            message: 'Please select correct category for product'
        }
    },
    sellerId: { type: String, required: [true, 'Please enter product seller'] },
    stock: { type: Number, required: [true, 'Please enter product stock'], maxlength: [5, 'Product name cannot exceed 5 characters'], default: 0 },
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
    user: { type: mongoose.Schema.ObjectId, ref: 'UserDsB', required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    tags: { type: [String], required: false },
    specifications: { type: Map, of: String }
}, 
{ timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);