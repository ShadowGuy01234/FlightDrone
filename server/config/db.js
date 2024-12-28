// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {

    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process with failure
  }
};


export default connectDB;
