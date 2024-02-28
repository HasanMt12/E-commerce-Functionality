// import React, { createContext, useState, useEffect } from 'react';

// // Create CartContext
// export const CartContext = createContext();

// const CartContextProvider = (props) => {
//   // Initialize cart state
//   const [cart, setCart] = useState([]);

//   // Function to add item to cart
//   const addToCart = (product) => {
//     // Check if the product is already in the cart
//     const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
//     // If the product is already in the cart, update its quantity
//     if (existingProductIndex !== -1) {
//       const updatedCart = [...cart];
//       updatedCart[existingProductIndex].quantity += product.quantity || 1; // Assuming product has a quantity property
//       setCart(updatedCart);
//     } else {
//       // If the product is not in the cart, add it
//       setCart([...cart, product]);
//     }
//   };

//   // Function to remove item from cart
//   const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId));
//   };

//   // Effect to update local storage when cart changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   // Function to clear cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   // Function to get total number of items in cart
//   const getCartItemCount = () => {
//     return cart.length;
//   };

//   // Function to calculate total cart amount
//   const getCartTotal = () => {
//     return cart.reduce((total, item) => total + item.price, 0);
//   };

//   // Customized functions or additional functionality can be added here

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartItemCount, getCartTotal }}>
//       {props.children}
//     </CartContext.Provider>
//   );
// };

// export default CartContextProvider;

import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };