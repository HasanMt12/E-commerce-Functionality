import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LiaShoppingBagSolid } from 'react-icons/lia'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCart } from '../../Context/CartContextProvider';


const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  // console.log(products)
  const [cart, setCart] = useCart();
  console.log(cart)
  useEffect(() => {
    
    fetch('/product.json') // Assuming product.json is in the public folder
      .then(response => response.json())
      .then(data => setProducts(data.products)); // Accessing the 'products' array from the JSON data
  }, []);

 
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const router = useLocation()


  const handleDecreaseQuantity = (productId) => {
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
    const updatedCart = [...cart];
    
    // Find the product in the products array based on its ID
    const product = products.find((p) => p.id === productId);
    
    if (existingProductIndex !== -1) {
      if (updatedCart[existingProductIndex].quantity > 1) {
        // If the product is already in the cart and quantity is greater than 1, update the quantity and price
        updatedCart[existingProductIndex].quantity -= 1; // Decrease the quantity
        
        // Retrieve the price of the product
        const productPrice = product ? product.price : 0;
        updatedCart[existingProductIndex].price -= productPrice; // Update the price by adding the product price
        toast.success("Item Decrease to cart");
      } else {
        // Show a warning or disable the button when the quantity is 1
        toast.error("Quantity cannot be less than 1");
      }
    } else {
      // If the product is not in the cart, add it to the cart
      const productPrice = product ? product.price : 0;
      updatedCart.push({ ...product, quantity: 1, price: productPrice }); // Initialize price with product's price
    }
  
    // Update cart state
    setCart(updatedCart);
    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Show a success message
   
  };
  
  const handleIncreaseQuantity = (productId) => {
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
    const updatedCart = [...cart];
    
    // Find the product in the products array based on its ID
    const product = products.find((p) => p.id === productId);
    
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update the quantity and price
      updatedCart[existingProductIndex].quantity += 1; // Increase the quantity
      
      // Retrieve the price of the product
      const productPrice = product ? product.price : 0;
      updatedCart[existingProductIndex].price += productPrice; // Update the price by adding the product price
    } else {
      // If the product is not in the cart, add it to the cart
      const productPrice = product ? product.price : 0;
      updatedCart.push({ ...product, quantity: 1, price: productPrice }); // Initialize price with product's price
    }
  
    // Update cart state
    setCart(updatedCart);
    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Show a success message
    toast.success("Item Increase to cart");
  };
  
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
    };

    const total = subtotal + 1.99
    return (
        <div className="bg-gray-100 text-black py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Product</th>
                                        <th className="text-left font-semibold">Brand</th>
                                        <th className="text-left font-semibold">Quantity</th>
                                        <th className="text-left font-semibold">Total</th>
                                    </tr>
                                </thead>
                                {cart&& cart.map(product => (      <tbody key={product.id}>
                                    <tr>
                                        <td className="py-4">
                                            <div className="flex flex-col md:flex-row md:items-center ">
                                                <img className="h-16 w-16 mr-0 md:mr-4 " src={product.thumbnail} alt={product.title} />
                                                <span className="font-semibold text-xs mt-2 md:mt-0 md:text-base">{product.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">$ {product.brand}</td>
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <button className="border rounded-md md:py-2 px-2 md:px-4 md:m-2"
                                                      onClick={() => handleDecreaseQuantity(product.id)}
                                                >-</button>
                                                <span className="text-center w-6 md:w-8 ">{product.quantity}</span>
                                                <button className="border rounded-md md:py-2 px-2 md:px-4 md:ml-2"
                                              onClick={() => handleIncreaseQuantity(product.id)}
                                                >+</button>
                                            </div>
                                        </td>
                                        <td className="py-4">$ {product.price}</td>
                                    </tr>

                                </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>$ {subtotal}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$1.99</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">$ {total}</span>
                            </div>

                            <Link to={"/checkouts"}>
                                <div className="relative inline-flex items-center justify-center md:px-10 px-6 py-1 overflow-hidden font-medium tracking-tighter text-white  bg-[#526D82] rounded-lg group md:py-[5px] w-[100%] mt-5">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#9DB2BF] rounded-full group-hover:w-[100%] group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#526D82]"></span>
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