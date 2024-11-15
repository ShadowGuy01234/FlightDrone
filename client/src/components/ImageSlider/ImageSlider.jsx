import React, { useState } from 'react';
import './ImageSlider.css'; 

const ImageSlider = () => {
  
  const images = [
    { src: '/003.jpg', name: 'Mike', title: 'web3 Developer' },
    { src: '/003.jpg', name: 'Samite', title: 'wordpress Developer' },
    { src: '/003.jpg', name: 'Hashi', title: 'java Developer' },
    { src: '/003.jpg', name: 'Kaity', title: 'web Developer' },
    { src: '/003.jpg', name: 'Lauren', title: 'php Developer' },
    { src: '/003.jpg', name: 'Ryan', title: 'seo Developer' },
    { src: '/003.jpg', name: 'Dakes', title: 'sql Developer' },
  ];

 
  const [activeIndex, setActiveIndex] = useState(3); 

 
  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="slider-container">
      <div className="slider-images">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slider-img ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleImageClick(index)}
          >
            <img src={image.src} alt={image.name} />
            <h1 className='hh'>{image.name}</h1>
            <div className="details">
              <h2>{image.name}</h2>
              <p>{image.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;
