import React from 'react';

const ShopByType = () => {
  const categories = [
    {
      image: '/C1.png',
      title: 'DRONES',
    },
    {
      image: '/C1.png',
      title: 'FPV DRONE FRAMES',
    },
    {
      image: '/C1.png',
      title: 'FPV DRONE EQUIPMENTS',
    },
    {
      image: '/C1.png',
      title: 'FPV DRONE MOTORS',
    },
    {
      image: '/C1.png',
      title: 'FPV DRONE MOTORS',
    },
    {
      image: '/C1.png',
      title: 'FPV DRONE MOTORS',
    },
    {
      image: '/C1.png',
      title: 'FPV DRONE MOTORS',
    },
    {
      image: '/C1.png',
      title: 'FPV DRONE MOTORS',
    },
  ];

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">OUR PRODUCT</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {categories.map((category, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <img src={category.image} alt={category.title} className="w-full h-48 object-cover transition duration-300" />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition duration-300" />
            <div className="p-4 text-center relative z-10">
              <h3 className="text-lg font-semibold text-black">{category.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByType;
