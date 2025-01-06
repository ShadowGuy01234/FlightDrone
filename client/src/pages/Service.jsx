import React from 'react';
import { 
  Truck, 
  Shield, 
  Clock, 
  CreditCard, 
  Package, 
  Headphones,
  Cpu,
  Wifi,
  Database,
  Cloud,
  Code
} from 'lucide-react';
import '../styles/Service.css';

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="service-card">
    <div className="icon-wrapper">
      <Icon />
    </div>
    <h3 className="service-title">{title}</h3>
    <p className="service-description">{description}</p>
  </div>
);

const TrainingCard = ({ icon: Icon, title, duration, level, description, topics }) => (
  <div className="training-card">
    <div className="training-card-header">
      <div className="icon-container">
        <Icon />
      </div>
      <h3 className="course-title">{title}</h3>
    </div>
    <div className="course-meta">
      <span className="duration">{duration}</span>
      <span className="level">{level}</span>
    </div>
    <p className="course-description">{description}</p>
    <div className="topics-container">
      <h4 className="topics-title">What you'll learn:</h4>
      <ul className="topics-list">
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
    <button className="enroll-button">Enroll Now</button>
  </div>
);

const Service = () => {
  const services = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50. Fast and reliable delivery to your doorstep."
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing. We ensure your data is protected."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service. We're here to help anytime."
    },
    {
      icon: CreditCard,
      title: "Easy Returns",
      description: "30-day easy return policy. No questions asked returns and exchanges."
    },
    {
      icon: Package,
      title: "Quality Products",
      description: "All products are quality checked. We ensure the best for our customers."
    },
    {
      icon: Headphones,
      title: "Premium Support",
      description: "Dedicated support team to assist you with any queries or concerns."
    }
  ];

  const trainings = [
    {
      icon: Cpu,
      title: "IoT Fundamentals",
      duration: "6 weeks",
      level: "Beginner",
      description: "Learn the basics of IoT architecture, sensors, and connectivity protocols.",
      topics: [
        "Introduction to IoT ecosystems",
        "Sensor types and applications",
        "Basic electronics for IoT",
        "Communication protocols"
      ]
    },
    {
      icon: Wifi,
      title: "IoT Networking",
      duration: "8 weeks",
      level: "Intermediate",
      description: "Master IoT networking protocols and wireless communications.",
      topics: [
        "WiFi and Bluetooth protocols",
        "LoRaWAN and cellular IoT",
        "Network security basics",
        "Troubleshooting connectivity"
      ]
    },
    {
      icon: Database,
      title: "IoT Data Management",
      duration: "7 weeks",
      level: "Intermediate",
      description: "Learn to collect, process, and analyze IoT sensor data.",
      topics: [
        "Data collection methods",
        "Real-time data processing",
        "Database management",
        "Data visualization"
      ]
    }
  ];

  return (
    <div className="service-page">
      {/* Hero Section */}
      <div className="service-hero">
        <h1>Our Services</h1>
        <p>Discover how we can help you succeed</p>
      </div>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">What We Offer</h2>
            <p className="services-description">
              We provide the best shopping experience with our comprehensive services
            </p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="training-section">
        <div className="training-container">
          <div className="training-header">
            <h2 className="training-title">IoT Training Programs</h2>
            <p className="training-description">
              Master the Internet of Things with our comprehensive training programs.
              From basics to advanced concepts, we've got you covered.
            </p>
          </div>
          
          <div className="training-grid">
            {trainings.map((training, index) => (
              <TrainingCard key={index} {...training} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;