import React from 'react';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>Price: {product.price}</p>
          {}
        </div>
      ))}
    </div>
  );
};

export default ProductList;

