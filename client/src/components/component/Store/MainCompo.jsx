import React, { useEffect, useState } from 'react';
import FilterComponent from './Filter';
import ProductGrid from './ProductGrid';
import styles from './MainComponent.module.css';

const MainComponent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const dummyProducts = [
      {
        id: 1,
        name: 'Smartphone X',
        category: 'Smartphones',
        price: '$699',
        discount: '$599',
        image: '#',
        isSale: false,
      },
      {
        id: 2,
        name: 'Tablet Y',
        category: 'Smartphones',
        price: '$499',
        discount: '$399',
        image: 'https://via.placeholder.com/150',
        isSale: false,
      },
      {
        id: 3,
        name: 'Laptop Z',
        category: 'Smartphones',
        price: '$999',
        discount: '$899',
        image: 'https://via.placeholder.com/150',
        isSale: false,
      },
      {
        id: 4,
        name: 'Monitor A',
        category: 'Smartphones',
        price: '$299',
        discount: '$249',
        image: 'https://via.placeholder.com/150',
        isSale: false,
      },
      {
        id: 5,
        name: 'Headphones B',
        price: '$199',
        discount: '$149',
        image: 'https://via.placeholder.com/150',
        isSale: false,
      },
      {
        id: 6,
        name: 'Smartwatch C',
        price: '$249',
        discount: '$199',
        image: 'https://via.placeholder.com/150',
        isSale: false,
      },
      
    ];
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts); 
    setIsLoading(false);
  }, []);

  const handleFilterChange = (selectedFilters) => {
    
    const updatedFilteredProducts = products.filter((product) =>
      selectedFilters.includes(product.category)
    );
    setFilteredProducts(updatedFilteredProducts);
  };

  return (
    <div className={styles.mainContainer}>
      <FilterComponent onFilterChange={handleFilterChange} />
      <ProductGrid products={filteredProducts} isLoading={isLoading} error={error} />
    </div>
  );
};

export default MainComponent;
