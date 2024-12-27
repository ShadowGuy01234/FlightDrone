// controllers/userController.js
const User = require('../models/User');

// Update user profile
const updateUserProfile = async (req, res) => {
  const { name, email, addresses } = req.body;
  const userId = req.user.id; // From the token

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, addresses },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const userId = req.user.id; // From the token

  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUserProfile, getUserProfile };
