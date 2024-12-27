// controllers/productController.js
const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product (Admin)
const createProduct = async (req, res) => {
  const { title, description, price, category, imageUrl, stock } = req.body;

  try {
    const product = new Product({ title, description, price, category, imageUrl, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a review to a product
const addReview = async (req, res) => {
  const { productId } = req.params;
  const { userId, comment, rating } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Add review
    product.reviews.push({ userId, comment, rating });
    product.rating = calculateAverageRating(product.reviews); // Calculate new average rating
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};

// Edit a review (optional)
const editReview = async (req, res) => {
  const { productId } = req.params;
  const { userId, comment, rating } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const review = product.reviews.find(review => review.userId.toString() === userId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.comment = comment;
    review.rating = rating;
    product.rating = calculateAverageRating(product.reviews); // Recalculate average rating
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { productId, userId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Remove review
    product.reviews = product.reviews.filter(review => review.userId.toString() !== userId);
    product.rating = calculateAverageRating(product.reviews); // Recalculate average rating
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, createProduct, getProductById, addReview, editReview, deleteReview };
