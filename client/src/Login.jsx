import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom'; 
import './css/Login.css';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="vb-login-container">
      <div className="vb-login-form">
        <h2>LOGIN</h2>
        
        <div className="vb-input-container">
          <label htmlFor="name">Name</label>
          <div className="vb-input-wrapper">
            <FaUserAlt className="vb-icon" />
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
        </div>

        <div className="vb-input-container">
          <label htmlFor="password">Password</label>
          <div className="vb-input-wrapper">
            <FaLock className="vb-icon" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
            />
            <span onClick={togglePasswordVisibility} className="vb-icon-eye">
              {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
        </div>

        <div className="vb-button-container">
         <span className="vb-text">SUBMIT</span>
         <Link to="Successful"><button>SUBMIT</button></Link>    
        </div>

        <p className="vb-p1">Don't have account ?  <Link to="/Account" className="Vijit">Click here</Link></p>
        {/* <Link to="/Account" className="vb">Click here</Link> */}
      </div>
    </div>
  );
};

export default Login;