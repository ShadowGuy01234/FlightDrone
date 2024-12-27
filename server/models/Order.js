// models/Order.js
const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String }, // New field for shipping address
  status: { type: String, default: 'Pending' }, // Order status
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
