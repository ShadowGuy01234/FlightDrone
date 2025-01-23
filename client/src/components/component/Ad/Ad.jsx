import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const ProductAdCard = () => {
  const [product, setProduct] = useState(null); // State for product data

  const productData = {
    name: "Professional Drone X1",
    price: "₹49,999",
    description: "Limited Time Offer - 20% Off",
    features: [
      "4K Ultra HD Camera",
      "45 Minutes Flight Time",
      "5KM Range",
      "GPS Navigation",
    ],
    imageUrl: "/ad.png",
  };

  // Temp
  useEffect(() => {
    setProduct(productData);
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Content Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Limited Time Offer
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                {product.name}
              </h2>
              <p className="text-3xl font-bold text-blue-600">
                {product.price}
              </p>

              <p className="text-lg text-gray-600">{product.description}</p>

              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <motion.a
                  href="/learn-more"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </motion.a>
                <motion.a
                  href="/order-now"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <motion.img
                src={product.imageUrl}
                alt={product.name}
                className="relative w-full h-[400px] object-contain"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductAdCard;
