import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './Card';
import styles from './ProductGrid.module.css'; 

const ProductGrid = ({ products, isLoading, error }) => {
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>; 
  }

  if (error) {
    return <div className={styles.error}>Error loading products. Please try again.</div>; 
  }

 

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};


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

ProductGrid.defaultProps = {
  isLoading: false,
  error: null,
  products: [],
};

export default ProductGrid;
