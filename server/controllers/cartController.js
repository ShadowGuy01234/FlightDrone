// controllers/cartController.js
const Cart = require('../models/Cart');

// Get user cart
const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = new Cart({ userId, items: [{ productId, quantity }] });
      await newCart.save();
      return res.status(201).json(newCart);
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      // If item exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add it
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart };
