import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrashAlt } from 'react-icons/fa';
import '../css/Cart.css';

const Cart = () => {
  const { state } = useLocation();
  const { cartItems, totalPrice } = state;
  const navigate = useNavigate();

  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    navigate('/cart', { state: { cartItems: updatedCartItems, totalPrice: calculateTotalPrice(updatedCartItems) } });
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <motion.div
              key={index}
              className="cart-item"
              initial={{ x: '100vw', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
              </div>
              <button className="remove-button" onClick={() => handleRemoveFromCart(index)}>
                <FaTrashAlt />
              </button>
            </motion.div>
          ))}
        </div>
      )}
      <div className="total-price">
        <h3>Total:₹{totalPrice.toFixed(2)}</h3>
      </div>
      <div className="cart-actions">
        <button className="continue-shopping" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;