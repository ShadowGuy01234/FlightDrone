import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { loginUser } from '../api/authService'; // Login API function
import { setCookie } from '../utils/cookieService'; // Import the setCookie function

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await loginUser(formData); // Call the loginUser API function

      // Store the token in cookies using setCookie function
      setCookie('authToken', response.token, { expires: 1 }); // Set expiration as needed

      setMessage('Login successful!');
      navigate('/Successful'); // Redirect to success page upon successful login
    } catch (error) {
      // console.log(error.message);
      
      setMessage(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="vb-login-container">
      <div className="vb-login-form">
        <h2>LOGIN</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="vb-input-container">
            <label htmlFor="email">Email</label>
            <div className="vb-input-wrapper">
              <FaUserAlt className="vb-icon" />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="vb-input-container">
            <label htmlFor="password">Password</label>
            <div className="vb-input-wrapper">
              <FaLock className="vb-icon" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span onClick={togglePasswordVisibility} className="vb-icon-eye">
                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <div className="vb-button-container">
            <button type="submit">SUBMIT</button>
          </div>
          {message && <p className="vb-message">{message}</p>} {/* Display success or error message */}
        </form>

        <p className="vb-p1">
          Don’t have an account? <Link to="/Account" className="Vijit">Click here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
