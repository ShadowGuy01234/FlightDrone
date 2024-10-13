const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new product (admin only)
router.post('/', protect, admin, async (req, res) => {
  const { title, description, price, category, imageUrl, stock } = req.body;
  const product = new Product({ title, description, price, category, imageUrl, stock });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
