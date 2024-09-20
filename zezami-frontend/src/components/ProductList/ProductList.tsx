import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    //if required this function can be defined outside of this useEffect block so that it can be triggered by external agents: for example: when refresh button is pressed 
    const fetchProducts = async () => {
      try {
        //this can be managed better with packages like react-query
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  //fine to do this for now since we don't have other things causing the list to rerender, but if we did, we'd need to memoize this depending on how big the list is
  //
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.productListContainer} data-testid="product-list">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul className={styles.productList}>
          {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;