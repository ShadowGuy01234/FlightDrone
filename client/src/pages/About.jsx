import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaEye, FaStar, FaLinkedin, FaGithub } from "react-icons/fa";
import { BiSolidQuoteLeft } from "react-icons/bi";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Hero Section */}
      <motion.div
        variants={fadeIn}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="./ankit sir.png"
                alt="Founder"
                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <BiSolidQuoteLeft className="text-5xl text-blue-600 mx-auto md:mx-0" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              About Us
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm Ankit Kumar Mishra, founder of Flytium Drone Private Limited
              and a Ph.D. scholar at MMMUT, Gorakhpur. Passionate about
              advancing drone technology and its applications in modern
              industry.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div variants={fadeIn} className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-8 shadow-xl transform transition-all hover:shadow-2xl"
            >
              <FaRocket className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Mission</h2>
              <p className="text-gray-600">
                To revolutionize drone technology and electronics distribution
                through innovation and excellence.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-8 shadow-xl transform transition-all hover:shadow-2xl"
            >
              <FaEye className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Vision</h2>
              <p className="text-gray-600">
                To become a leading force in drone innovation and electronics
                distribution.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-8 shadow-xl transform transition-all hover:shadow-2xl"
            >
              <FaStar className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Values</h2>
              <p className="text-gray-600">
                Excellence in innovation, unwavering commitment to quality.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div variants={fadeIn} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "500+",
                label: "Products Sold",
                description:
                  "Successfully delivered high-quality drone products",
              },
              {
                number: "30+",
                label: "Countries Served",
                description: "Global reach across different continents",
              },
              {
                number: "50K+",
                label: "Happy Customers",
                description: "Building a community of loyal tech enthusiasts",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-800 mb-4">
                  {stat.label}
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div variants={fadeIn} className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Our Team
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "John Smith",
                role: "Chief Technical Officer",
                image: "src/Image/me.png",
              },
              {
                name: "Sarah Johnson",
                role: "Lead Engineer",
                image: "/api/placeholder/200/200",
              },
              {
                name: "Mike Chen",
                role: "Product Manager",
                image: "/api/placeholder/200/200",
              },
              {
                name: "Emma Davis",
                role: "Operations Director",
                image: "/api/placeholder/200/200",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-6 shadow-xl"
              >
                <div className="relative mb-6 group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-32 h-32 mx-auto rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <FaLinkedin className="text-gray-400 hover:text-blue-600 text-xl cursor-pointer" />
                  <FaGithub className="text-gray-400 hover:text-gray-900 text-xl cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
