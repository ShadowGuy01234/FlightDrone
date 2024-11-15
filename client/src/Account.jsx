import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './css/Account.css';
import { Link } from 'react-router-dom';

const Account = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="ac-page">
      <div className="ac-container">
        <h2>CREATE ACCOUNT</h2>
        <form>
          <div className="ac-form-group">
            <label htmlFor="name">Name</label>
            <div className="ac-input-box">
              <FaUser className="ac-icon-user" />
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
          </div>

          <div className="ac-form-group">
            <label htmlFor="email">Email</label>
            <div className="ac-input-box">
              <FaEnvelope className="ac-icon-email" />
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
          </div>

          <div className="ac-form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="ac-input-box">
              <FaPhone className="ac-icon-phone" />
              <input type="text" id="phone" placeholder="Enter your phone number" />
            </div>
          </div>

          <div className="ac-form-group">
            <label htmlFor="password">Password</label>
            <div className="ac-input-box ac-password-box">
              <FaLock className="ac-icon-lock" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
              />
              <span className="ac-toggle-eye" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="ac-button-wrapper">
            <span className="ac-btn-text">SUBMIT</span>
            <Link to="Successful2"><button>SUBMIT</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;