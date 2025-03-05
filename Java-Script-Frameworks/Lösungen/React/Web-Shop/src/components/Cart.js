// src/components/Cart.js
import React from 'react';

const Cart = ({ cartItems }) => {
  return (
    <div className="cart">
      <h2>Warenkorb</h2>
      {cartItems.length === 0 ? (
        <p>Der Warenkorb ist leer</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price} €
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
