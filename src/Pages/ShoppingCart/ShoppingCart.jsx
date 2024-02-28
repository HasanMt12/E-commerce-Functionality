import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LiaShoppingBagSolid } from 'react-icons/lia'

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCart } from '../../Context/CartContextProvider';

const ShoppingCart = () => {
    const [cart, setCart] = useCart();
    console.log(cart)
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const router = useLocation()
  // ... (other functions and JSX)
  const updateSubtotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      total = total + item.price;
    });
  
  
    setSubtotal(total);
  };
  
  // Log the selectedProducts state after it's updated
  useEffect(() => {
    // console.log('Selected Products:', selectedProducts);
    updateSubtotal();
  }, [  cart]);
  
  
  
  const navigate = useNavigate();
  const handleCheckout = () => {
   
  // Navigate to the checkout page with required props
  navigate("/checkout", {
    state: {
      totalPrice: subtotal,
     selectedProducts: cart
    },
  });
  };
};
   
  
  
      
      const removeCartItem = (pid) => {
        try {
          setCart((prevCart) => {
            const indexToRemove = prevCart.findIndex((item) => item._id === pid);
      
            if (indexToRemove !== -1) {
              // Remove only the first occurrence of the product
              const updatedCart = [...prevCart.slice(0, indexToRemove), ...prevCart.slice(indexToRemove + 1)];
              localStorage.setItem("cart", JSON.stringify(updatedCart));
              return updatedCart; 
            }
      
            return prevCart; // If the product is not found, return the current cart unchanged
            
          });
        } catch (error) {
          console.log(error);
        }
    return (
        <div class="bg-gray-100 py-8">
            <div class="container mx-auto px-4">
                <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="md:w-3/4">
                        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                            <table class="w-full">
                                <thead>
                                    <tr>
                                        <th class="text-left font-semibold">Product</th>
                                        <th class="text-left font-semibold">Price</th>
                                        <th class="text-left font-semibold">Quantity</th>
                                        <th class="text-left font-semibold">Total</th>
                                    </tr>
                                </thead>
                                {cart&& cart.map(product => (      <tbody key={product.id}>
                                    <tr>
                                        <td class="py-4">
                                            <div class="flex flex-col md:flex-row md:items-center ">
                                                <img class="h-16 w-16 mr-0 md:mr-4 " src={product.thumbnail} alt="Product image" />
                                                <span class="font-semibold text-xs mt-2 md:mt-0 md:text-base">Product name</span>
                                            </div>
                                        </td>
                                        <td class="py-4">$19.99</td>
                                        <td class="py-4">
                                            <div class="flex items-center">
                                                <button class="border rounded-md md:py-2 px-2 md:px-4 md:m-2"
                                                      onClick={() => {
                                                        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
                          
                                                        if (existingProductIndex !== -1) {
                                                          const updatedCart = [...cart];
                                                          if (updatedCart[existingProductIndex].quantity > 1) {
                                                            // Check if the quantity is greater than 1 before decrementing
                                                            updatedCart[existingProductIndex].quantity -= 1; // Decrease the quantity
                                                            updatedCart[existingProductIndex].price -= product.price; // Update the price by subtracting the product price
                                                            setCart(updatedCart);
                                                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                                                            // Show a success message
                                                            toast.success("Cart updated");
                                                          } else {
                                                            // Show a warning or disable the button when the quantity is 1
                                                            toast.warning("Quantity cannot be less than 1");
                                                          }
                                                        }
                                                      }}
                                                >-</button>
                                                <span class="text-center w-6 md:w-8 ">1</span>
                                                <button class="border rounded-md md:py-2 px-2 md:px-4 md:ml-2"
                                                  className="px-2 py-1"
                                                  onClick={() => {
                                                    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
                                                    const updatedCart = [...cart];
                                                
                                                    if (existingProductIndex !== -1) {
                                                      // If the product is already in the cart, update the quantity and price
                                                      updatedCart[existingProductIndex].quantity += 1; // Increase the quantity
                                                      updatedCart[existingProductIndex].price = updatedCart[existingProductIndex].quantity * product.price; // Update the price based on the quantity and original price
                                                    } else {
                                                      // If the product is not in the cart, add it to the cart
                                                      updatedCart.push({ ...product, quantity: 1, price: product.price }); // Initialize price with product's price
                                                    }
                                                
                                                    // Update cart state
                                                    setCart(updatedCart);
                                                    
                                                    // Update localStorage
                                                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                                                    
                                                    // Show a success message
                                                    toast.success("Item Added to cart");
                                                  }}
                                                >+</button>
                                            </div>
                                        </td>
                                        <td class="py-4">$19.99</td>
                                    </tr>

                                </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                    <div class="md:w-1/4">
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <h2 class="text-lg font-semibold mb-4">Summary</h2>
                            <div class="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>$19.99</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$1.99</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>
                            <hr class="my-2" />
                            <div class="flex justify-between mb-2">
                                <span class="font-semibold">Total</span>
                                <span class="font-semibold">$21.98</span>
                            </div>

                            <Link to={"/checkouts"}>
                                <div className="relative inline-flex items-center justify-center md:px-10 px-6 py-1 overflow-hidden font-medium tracking-tighter text-white  bg-[#b89c07] rounded-lg group md:py-[5px] w-[100%] mt-5">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#a08300] rounded-full group-hover:w-[100%] group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#b89c07]"></span>
                                    <span className="relative lg:text-lg md:text-md text-sm">Checkout</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;