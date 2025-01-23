import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./GalleryCard.css";

const GalleryCard = () => {
  const images = [
    {
      src: "/001.jpg",
      title: "Drone Experience Arena",
      description:
        "Experience the thrill of flying in our state-of-the-art drone arena",
      buttonText: "Book Arena",
      buttonAction: () => (window.location.href = "/drone-arena"),
    },
    {
      src: "/001.jpg",
      title: "FPV Racing Event",
      description: "Join the excitement of competitive drone racing",
      buttonText: "Register Now",
      buttonAction: () => (window.location.href = "/event-registration"),
    },
    {
      src: "/003.jpg",
      title: "About Us",
      description: "Discover our journey in drone innovation",
      buttonText: "Learn More",
      buttonAction: () => (window.location.href = "/about-us"),
    },
    {
      src: "/002.jpg",
      title: "Drone Community",
      description: "Connect with fellow drone enthusiasts",
      buttonText: "Join Community",
      buttonAction: () => (window.location.href = "/community"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side: Image */}
            <motion.div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex].src}
                  alt={images[currentIndex].title}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>

            {/* Right Side: Content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-900">
                {images[currentIndex].title}
              </h2>
              <p className="text-lg text-gray-600">
                {images[currentIndex].description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={images[currentIndex].buttonAction}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                {images[currentIndex].buttonText}
              </motion.button>

              {/* Dots Navigation */}
              <div className="flex gap-2 pt-6">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex
                        ? "bg-blue-600"
                        : "bg-gray-300 hover:bg-blue-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
