import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: 'What products does Flytium offer?', answer: 'Flytium offers a range of electronic devices, including drones, smart gadgets, and accessories designed for both enthusiasts and professionals.' },
    { question: 'What sets Flytium apart from other electronic companies?', answer: 'Flytium is known for its innovative technology, commitment to quality, and exceptional customer support, ensuring that our products meet the highest standards.' },
    { question: 'Are Flytium products suitable for beginners?', answer: 'Yes, Flytium designs products that cater to all skill levels, with user-friendly features that make them accessible for beginners while still providing advanced options for experienced users.' }
  ];
  

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="flex justify-between p-10 bg-gray-100 rounded-lg">
      <div className="w-2/5">
        <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
        <p className="mb-6">Our customer support is available Monday to Friday: 10am–6:30pm.</p>
        <button className="px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800">
          Chat Now
        </button>
      </div>
      <div className="w-1/2">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 bg-gray-200 p-4 rounded-lg">
            <div 
              className="flex justify-between items-center cursor-pointer font-semibold" 
              onClick={() => handleToggle(index)}
            >
              <h3 className="text-lg">{faq.question}</h3>
              <span className="text-2xl">
                {activeIndex === index ? '-' : '+'}
              </span>
            </div>
            {activeIndex === index && (
              <div className="mt-2 text-gray-700">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
