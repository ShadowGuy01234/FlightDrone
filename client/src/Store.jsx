import React from 'react';
import { motion } from 'framer-motion';
import './css/Store.css';

const Store = () => {
  const leftCards = [
    { id: 1, name: "IOT Components", image: "./Image/iot.jpeg", url: "https://your-link-1.com" },
    { id: 2, name: "Sensors", image: "./Image/sensors.jpeg", url: "src\Sensor.jsx" },
  ];

  const rightCards = [
    { id: 3, name: "Microcontroller Boards", image: "./Image/microboards.jpg", url: "Microboard.jsx" },
    { id: 4, name: "Batteries", image: "./Image/batteries 3.jpeg", url: "Battery.jsx" },
  ];

  const leftCardsSecondRow = [
    { id: 5, name: "Drone parts", image: "./Image/drone parts.jpg", url: "Droneparts.jsx" },
    { id: 6, name: "Customized Drone", image: "./Image/customized drone.jpg", url: "https://your-link-6.com" },
  ];

  const rightCardsSecondRow = [
    { id: 7, name: "3D-printings", image: "./Image/3d printing.jpg", url: "Printing.jsx" },
    { id: 8, name: "Tools and equipment", image: "./Image/tools.jpg", url: "Tools.jsx" },
  ];

  const leftCardAnimation = {
    initial: { x: '-100vw', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.2 }
  };

  const rightCardAnimation = {
    initial: { x: '100vw', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.2 }
  };

  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="updated-store-container">
        <h2>STORE</h2>
        {/* First Row */}
        <div className="updated-store-row">
          {/* Left Side Cards */}
          {leftCards.map((card) => (
            <motion.div
              key={card.id}
              className="updated-store-card"
              initial={leftCardAnimation.initial}
              animate={leftCardAnimation.animate}
              transition={{ ...leftCardAnimation.transition, delay: 0.1 * card.id }}
              onClick={() => handleClick(card.url)}
            >
              <div className="updated-store-image-container">
                <img src={card.image} alt={card.name} className="updated-store-card-image" />
              </div>
              <div className="updated-store-name-container">
                <h3>{card.name}</h3>
              </div>
            </motion.div>
          ))}

          {/* Right Side Cards */}
          {rightCards.map((card) => (
            <motion.div
              key={card.id}
              className="updated-store-card"
              initial={rightCardAnimation.initial}
              animate={rightCardAnimation.animate}
              transition={{ ...rightCardAnimation.transition, delay: 0.1 * card.id }}
              onClick={() => handleClick(card.url)}
            >
              <div className="updated-store-image-container">
                <img src={card.image} alt={card.name} className="updated-store-card-image" />
              </div>
              <div className="updated-store-name-container">
                <h3>{card.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second Row */}
        <div className="updated-store-row">
          {/* Left Side Cards */}
          {leftCardsSecondRow.map((card) => (
            <motion.div
              key={card.id}
              className="updated-store-card"
              initial={leftCardAnimation.initial}
              animate={leftCardAnimation.animate}
              transition={{ ...leftCardAnimation.transition, delay: 0.1 * card.id }}
              onClick={() => handleClick(card.url)}
            >
              <div className="updated-store-image-container">
                <img src={card.image} alt={card.name} className="updated-store-card-image" />
              </div>
              <div className="updated-store-name-container">
                <h3>{card.name}</h3>
              </div>
            </motion.div>
          ))}

          {/* Right Side Cards */}
          {rightCardsSecondRow.map((card) => (
            <motion.div
              key={card.id}
              className="updated-store-card"
              initial={rightCardAnimation.initial}
              animate={rightCardAnimation.animate}
              transition={{ ...rightCardAnimation.transition, delay: 0.1 * card.id }}
              onClick={() => handleClick(card.url)}
            >
              <div className="updated-store-image-container">
                <img src={card.image} alt={card.name} className="updated-store-card-image" />
              </div>
              <div className="updated-store-name-container">
                <h3>{card.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="updated-store-blackstrip">
        <span className="updated-store-text">Placed your first order and get up to 25% off. Get free delivery on your first order. Get your order with in 3 days</span>
      </div>
    </>
  );
};

export default Store;