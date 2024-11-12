import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing the green tick icon from react-icons
import "./css/Successful.css";

const Successful = () => {
  return (
    <div className="card-container">
      <div className="success-card">
        <FaCheckCircle className="checkmark-icon" />
        <h2 className="heading">You have logged in successfully</h2>
      </div>
    </div>
  );
};

export default Successful;