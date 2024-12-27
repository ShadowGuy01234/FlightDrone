// controllers/adminOrderController.js
const Order = require('../models/Order');

// Get all orders for admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status; // Update order status
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllOrders, updateOrderStatus };
