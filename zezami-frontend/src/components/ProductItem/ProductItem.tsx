import React from 'react';
import styles from './ProductItem.module.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <li className={styles.productItem} data-testid="product-item">
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
    </li>
  );
};

export default ProductItem;