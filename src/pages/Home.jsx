import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import ProductList from '../components/ProductList';

const Home = () => {
  const { products, fetchProducts } = useContext(GlobalContext);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="home-container">
      <h1>Welcome to Pet Planet</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
