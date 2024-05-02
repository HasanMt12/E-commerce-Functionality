
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LiaShoppingBagSolid } from 'react-icons/lia'
import {  useCart } from '../../Context/CartContextProvider';
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useIsOpen } from "../../Context/CartOpenContext";

const CartSection = () => {
  const userState = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const { isOpen, setIsOpen } = useIsOpen();
  // console.log(products)
  const [cart, setCart] = useCart();
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
   
    const Mainproduct = products.find((p) => p.price === cart.price);
  return (
    <nav className=" h-full  py-2 w-full flex flex-col flex-wrap z-[1000] relative">
      <div className="">
        <div className=''>
          <div className='w-[95%] bg-gray-500 h-[1px] mx-auto '></div>
          <div className='overflow-y-auto h-[52vh] '>

    {cart&& cart.map(product => (
       <div className='mt-3' key={product.id} >
              <div className='flex justify-between items-start px-4 py-1'>
                <div className='flex justify-start items-start gap-2 min-h-[100px]'>
                  <img className=' md:max-w-[100px]  md:min-w-[100px]  max-w-[80px] min-w-[80px]  min-h-[100px] max-h-[100px] obeject-cover object-center ml-1' src={product.thumbnail} alt=''></img>
                  <div className='flex flex-col justify-between items-start gap-2'>
                    <div>
                      <h2 className=' Capitalized text-sm'>{product.title}</h2>
                    </div>
                    <div className="flex justify-between ite">
                      <div className=''>
                        <div className='text-[8.5px] font-semibold   ml-1 px-0 w-[70%]'>Quantity</div>
                        <div className=' flex justify-center items-center gap-1 border border-b-gray-600 border-r-gray-600 shadow-sm'>

                        <button 
                              onClick={() => handleDecreaseQuantity(product.id)}
                              className="px-2 py-1"
                            >
                              -
                            </button>

                            <span className='text-xs'>{product.quantity}</span>

                            <button
                              onClick={() => handleIncreaseQuantity(product.id)}
                              className="px-2 py-1"
                            >
                              +
                        </button>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
                <div className='flex flex-col gap-6'>
                  <div>
                   
                    <h2 className='atc text-xs '>$ <span className='font-Roboto'>{product.price}</span></h2>
                  </div>

                  <button  onClick={() => removeCartItem(product._id)}  title='remove the item' className='text-sm  font-semibold  cursor-pointer  hover:text-[#FDC68A] uppercase'>Remove</button>
                </div>

              </div>
              <h2 className='text-[11px] text-gray-600 mx-4 mt-1  md:ml-[19px] ml-2'>Ships within 1-2 days.(inside Dhaka)</h2>

              <div className='w-[95%] bg-gray-500 h-[1px] mx-auto '></div>
            </div>
    ))}
           

          </div>

       
          <div className="absolute bottom-3 right-0 left-0"> 
            <div className="flex justify-between mb-2 px-8">
                                <span>Subtotal</span>
                                <span className="font-semibold">$ {subtotal}</span>
                            </div>
            <div className="flex md:flex-row flex-col justify-between items-center px-4 py-2">
              <Link to={"/shopping-cart"} >
                <div onClick={() => setIsOpen(false)} className="w-full  relative inline-flex items-center shadow-lg cursor-pointer justify-center px-10 md:py-2 py-1 overflow-hidden  font-medium tracking-tighter text-white  bg-[#3c5662] rounded-sm group">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#2B424C] rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#2B424C]"></span>
                  <span className="relative lg:text-lg md:text-md text-sm">View Cart</span>
                </div>
              </Link>
              {userState?.userInfo?.data?.email ? (
              <Link to={"/checkouts"}>
                <div onClick={() => setIsOpen(false)} className="w-full md:mt-0 mt-2 relative shadow-lg cursor-pointer inline-flex items-center justify-center px-10 md:py-2 py-1 overflow-hidden  font-medium tracking-tighter text-white  bg-[#526D82] rounded-sm group">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#9DB2BF] rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#526D82]"></span>
                  <span className="relative lg:text-lg md:text-md text-sm">Buy Now</span>
                </div>
              </Link>
              ):(
                <Link to={"/login"} >
                <div onClick={() => setIsOpen(false)} className="w-full relative shadow-lg cursor-pointer inline-flex items-center justify-center px-10 md:py-2 py-1 overflow-hidden  font-medium tracking-tighter text-white  bg-[#526D82] rounded-sm group">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#9DB2BF] rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#526D82]"></span>
                  <span className="relative lg:text-lg md:text-md text-sm">Login To Buy</span>
                </div>
              </Link>
              )}
            </div>
          </div>
        </div>






      </div >
    </nav >
  );
};

export default CartSection;