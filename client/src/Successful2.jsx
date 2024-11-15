import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing the green tick icon from react-icons
import "./css/Successful2.css";
import { Link } from 'react-router-dom';

const Successful2 = () => {
  return (
    <div className="su-card-container">
      <div className="su-success-card">
        <FaCheckCircle className="su-checkmark-icon" />
        <h2 className="su-heading">You have logged in successfully</h2>
{/* neeche home page ka link dedo */}
           <div className="su-button-wrapper">
            <span className="su-btn-text">HOME</span>
            <Link to="/"><button>HOME</button></Link>
          </div>
       {/* <Link to="/" ><button>Home</button></Link> */}
      </div>
    </div>
  );
};

export default Successful2;