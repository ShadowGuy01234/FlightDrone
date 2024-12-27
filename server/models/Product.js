// models/Product.js
const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
      comment: { type: String },
      rating: { type: Number, min: 1, max: 5 }, // Rating between 1 and 5
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
