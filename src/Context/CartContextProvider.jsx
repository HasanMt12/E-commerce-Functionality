import React, { createContext, useState, useEffect } from 'react';

// Create CartContext
export const CartContext = createContext();

const CartContextProvider = (props) => {
  // Initialize cart state
  const [cart, setCart] = useState([]);

  // Function to add item to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Effect to update local storage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to get total number of items in cart
  const getCartItemCount = () => {
    return cart.length;
  };

  // Function to calculate total cart amount
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // Customized functions or additional functionality can be added here

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartItemCount, getCartTotal }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
