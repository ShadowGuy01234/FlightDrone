import React, { useState, useEffect } from 'react'; // Import useState and useEffect


const ProductAdCard = () => {
  const [product, setProduct] = useState(null); // State for product data
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  // Commented out backend fetch logic for future use
  /*
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('/api/products/1'); // Adjust the endpoint as needed
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);
  */

  // temperory
  const productData = {
    name: "**** DRONE",
    price: "₹ ****",
    description: "***********Offer***************",
    flightTime: "Flight Time up to 20 mins*",
    imageUrl: "/ad.png" 
  };

  // Temp
  useEffect(() => {
    setProduct(productData);
  }, []);

  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  
  if (!product) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex justify-center items-center mt-10 pb-20">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row w-[95%] max-w-5xl p-8">
        <div className="lg:w-1/2 p-5">
          <h2 className="text-4xl font-bold text-black mb-2">{product.name}</h2>
          <p className="text-lg font-semibold text-gray-700">{product.price}</p>
          <p className="text-sm text-gray-600 mb-4">
            {product.description}
          </p>
          <p className="text-sm text-gray-800 font-semibold mb-4">
            - {product.flightTime} -
          </p>

         
          <div className="flex justify-center items-center space-x-4 mt-6">
            <a href="/learn-more">
              <button className="border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition duration-300">
                Learn more
              </button>
            </a>
            <a href="/order-now">
              <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition duration-300">
                Order Now
              </button>
            </a>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div
            className="image-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ overflow: 'hidden', maxWidth: '500px', maxHeight: '300px', margin: '0 auto' }} // Limit size of the image container
          >
            <img
              src={product.imageUrl} 
              alt={product.name}
              className="drone-image"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                transition: 'transform 0.5s ease-in-out',
                transform: isHovered ? 'rotate(15deg) scale(1.05)' : 'rotate(0deg) scale(1)',
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdCard;
