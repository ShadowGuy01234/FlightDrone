import React, { useState, useEffect } from 'react';

const Hero = () => {
  const images = [
    { src: '/001.jpg', learnMoreUrl: '/learn-more-1', orderNowUrl: '/order-now-1' },
    { src: '/002.jpg', learnMoreUrl: '/learn-more-2', orderNowUrl: '/order-now-2' },
    { src: '/003.jpg', learnMoreUrl: '/learn-more-3', orderNowUrl: '/order-now-3' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = (currentIndex + 1) % images.length;
    setCurrentIndex(index);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative bg-black h-screen z-10">
      <div className="relative overflow-hidden h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={image.src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

     
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        <a href={images[currentIndex].learnMoreUrl}>
          <button className="border border-white text-white bg-transparent rounded-full px-6 py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out">
            Learn More
          </button>
        </a>
        <a href={images[currentIndex].orderNowUrl}>
          <button className="bg-black text-white rounded-full px-6 py-2 font-bold transition duration-300 ease-in-out hover:bg-gray-700">
            Order Now
          </button>
        </a>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 z-20"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 z-20"
      >
        &#10095;
      </button>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
