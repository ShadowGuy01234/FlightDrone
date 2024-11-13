import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import ProductCard from './Card';
import styles from './ProductGrid.module.css'; // Use CSS module

const ProductGrid = ({ products, isLoading, error }) => {
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>; // Loading state
  }

  if (error) {
    return <div className={styles.error}>Error loading products. Please try again.</div>; // Error state
  }

 

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

// Adding prop types for validation
ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      isSale: PropTypes.bool,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

// Setting default values for optional props
ProductGrid.defaultProps = {
  isLoading: false,
  error: null,
  products: [], // Ensure products is an empty array by default
};

export default ProductGrid;
