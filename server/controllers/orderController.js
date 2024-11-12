// controllers/orderController.js
const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  const { userId, products, totalPrice } = req.body;

  try {
    const order = new Order({ userId, products, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders };
