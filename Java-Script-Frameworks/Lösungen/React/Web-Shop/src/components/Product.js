// src/components/Product.js
import React from 'react';

const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <h3>{product.name}</h3>
          <p>{product.price} €</p>
          <p>{product.stock} €</p>
      <button onClick={() => addToCart(product)}>In den Warenkorb</button>
    </div>
  );
};

export default Product;
