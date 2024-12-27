// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes and check for a valid token
const protect = (req, res, next) => {
  let token;

  // Check if token is provided in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Get token from Bearer <token>
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // If user is admin, proceed
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, isAdmin };
