import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../css/Account.css';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authService'; // Assuming registerUser API function is in authService.js

const Account = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For navigation after successful registration

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData); // Call the registerUser function
      setMessage('Account created successfully!');
      navigate('/Account/Successful2'); // Redirect to success page after registration
    } catch (error) {
      // console.log(error.message);
      
      setMessage(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="ac-page">
      <div className="ac-container">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <div className="ac-form-group">
            <label htmlFor="name">Name</label>
            <div className="ac-input-box">
              <FaUser className="ac-icon-user" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="ac-form-group">
            <label htmlFor="email">Email</label>
            <div className="ac-input-box">
              <FaEnvelope className="ac-icon-email" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="ac-form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="ac-input-box">
              <FaPhone className="ac-icon-phone" />
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="ac-form-group">
            <label htmlFor="address">Address</label>
            <div className="ac-input-box">
              <FaPhone className="ac-icon-address" />
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="ac-form-group">
            <label htmlFor="password">Password</label>
            <div className="ac-input-box ac-password-box">
              <FaLock className="ac-icon-lock" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="ac-toggle-eye" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="ac-button-wrapper">
            <button type="submit">SUBMIT</button>
          </div>
          {message && <p className="ac-message">{message}</p>} {/* Display success or error message */}
        </form>
      </div>
    </div>
  );
};

export default Account;
