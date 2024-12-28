// models/User.js
import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0, required: true },
  answer: {
    type: String,
    required: true
  },

},
  {
    timestamps: true,
  });

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
