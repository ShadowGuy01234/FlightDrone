// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes'); // Import admin order routes

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin/orders', adminOrderRoutes); // Define admin order routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
