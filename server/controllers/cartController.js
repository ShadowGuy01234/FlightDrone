import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart,
      message: "Cart fetched successfully"
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message
    });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Check stock availability
    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock available"
      });
    }

    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      if (product.quantity < newQuantity) {
        return res.status(400).json({
          success: false,
          message: "Cannot add more items. Insufficient stock."
        });
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price
      });
    }

    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      cart,
      message: "Item added to cart successfully"
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message
    });
  }
};

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required"
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative"
      });
    }

    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    if (quantity === 0) {
      // Remove item from cart
      cart.items.splice(itemIndex, 1);
    } else {
      // Check stock availability
      const product = await Product.findById(productId);
      if (product.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock available"
        });
      }
      
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      cart,
      message: "Cart updated successfully"
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      cart,
      message: "Item removed from cart successfully"
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message
    });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();

    res.status(200).json({
      success: true,
      cart,
      message: "Cart cleared successfully"
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message
    });
  }
};

// Get cart summary
export const getCartSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        summary: {
          itemCount: 0,
          totalAmount: 0,
          items: []
        }
      });
    }

    const summary = {
      itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
      totalAmount: cart.items.reduce((total, item) => total + (item.price * item.quantity), 0),
      items: cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      }))
    };

    res.status(200).json({
      success: true,
      summary
    });
  } catch (error) {
    console.error("Get cart summary error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart summary",
      error: error.message
    });
  }
};