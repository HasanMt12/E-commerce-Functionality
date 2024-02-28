import React from 'react';
import { useState, useEffect } from "react";
import { IoMdGift } from "react-icons/io";
import { Rating, ThinStar } from "@smastrom/react-rating";

import '@smastrom/react-rating/style.css'
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebook, FaFacebookMessenger } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoLogoWhatsapp } from "react-icons/io";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import axios from 'axios';



const ProductDetails = () => {
    
    const [rating, setRating] = useState(3)
    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#dbbd10',
        inactiveFillColor: '#d3d3d3'
    }

    const [currentState, setCurrentState] = useState(1);

    const handleClick = () => {
        setCurrentState(currentState === 1 ? 2 : 1);
    };


    const { id } = useParams(); // Get the id parameter from the URL
     
    const [selected, setSelected] = useState("");
    const [product, setProduct] = useState(null);
     
  

    return (
        <div className='w-11/12 mx-auto'>

            <div className="lg:block md:block hidden">
                <div className="flex justify-between items-center  md:px-6 mb-5 bg-[#F5F5F5] mt-10">
                    <div className="flex justify-start  text-gray-600 items-center font-Lore bg-[#F5F5F5]">
                        <p className="font-normal text-gray-600 text-base">Home</p>
                        <p className="text-gray-400"> <IoIosArrowForward /> </p> <p className="text-gray-700">{product?.title}</p>
                    </div>
                    <div className="flex justify-start items-center gap-2 text-gray-600 ">
                        <h2>Share On</h2>
                        <a target="_blank" href='facebook.com'><FaFacebook className="text-xl" /></a>

                        <a target="_blank" href={`fb-messenger://share/?link=${encodeURIComponent(websiteLink)}`} ><FaFacebookMessenger className="text-xl" /></a>

                        <a target="_blank" href={`whatsapp://send?text=${encodeURIComponent(websiteLink)}`}><IoLogoWhatsapp className="text-xl" /></a>
                    </div>
                </div>
                {product &&  (   
                <div className="flex justify-center items-start gap-3  md:px-2 py-10">

                    {/* first section */}
                    <div className="w-[16%] flex flex-col gap-3 h-[70vh] ">
                        {/* first image  */}
                        <img src={product.image}    onClick={() => handleThumbnailClick(product.image)} className="h-[80px] w-[80px] mb-3 mx-auto object-cover object-center cursor-zoom-in"/>
                        {/* second image */}
                        <img src={product.image1}    onClick={() => handleThumbnailClick(product.image1)} className="h-[80px] w-[80px] mb-3 mx-auto object-cover object-center cursor-zoom-in" />
                        {/* Third image */}
                        <img src={product.image2}    onClick={() => handleThumbnailClick(product.image2)} className="h-[80px] w-[80px] mb-3 mx-auto object-cover object-center cursor-zoom-in" />
                    </div>
                    {/* second section */}
                    <div className="w-[44%] mr-6" >
                        {/* Main Image */}
                        <img className=" h-[70vh] w-full  object-cover object-center mx-auto" src={mainImage}></img>
                        <div className="flex w-full justify-center mt-10 mb-5">
                            <div onClick={handleClick} className={`${currentState === 1 ? "bg-[#b89c07] text-white" : "text-[#b89c07] "} flex items-center space-x-2 mx-2 border border-[#b89c07]  py-4 px-3 cursor-pointer `} >
                                <span>Description</span>
                            </div>

                            <div onClick={handleClick} className={`${currentState === 2 ? "bg-[#b89c07] text-white" : "text-[#b89c07] "} flex items-center space-x-2 mx-2 border border-[#b89c07]  py-4 px-3 cursor-pointer `}>

                                <span>Order & Exchange Policy</span>
                            </div>




                        </div>
                        {
                            currentState === 1 ?
                                <Card>
                                    <CardBody>
                                        <div className="pb-4 px-6">
                                            <div className=" text-start text-sm text-gray-700 mb-5">
                                                <h2 className="text-lg mb-1 underline font-semibold">Product Description</h2>
                                                {product.description}
                                            </div>
                                           
                                        </div>
                                    </CardBody>
                                </Card>

                                :

                                <Card>
                                    <CardBody>
                                        <div className="pb-4 px-6">
                                            <div className=" text-start text-sm text-gray-700">
                                                <h2 className="text-lg  underline font-semibold">Ordering Policy</h2>
                                                <ul>
                                                    <li className='mb-3 mt-2'>• Purchase is only available for products which are shown in stock on website.</li>
                                                    <li className='mb-3 mt-2'>• Cash On Delivery (COD) available all over Bangladesh also digital payment allow.</li>
                                                    <li className='mb-3 mt-2'>• Once the order has been paid, it cannot be cancelled.</li>
                                                    <li className='mb-3 mt-2'>•  In case of size mismatch, delivery charge will be re-applicable.</li>
                                                    <li className='mb-3 mt-2'>• Please contact Customer Service for order related queries.</li>
                                                </ul>
                                            </div>

                                            <div className="text-start text-sm text-gray-700">
                                                <h2 className="text-lg  underline font-semibold mt-5 mb-2">Shipping Policy</h2>
                                                <p>
                                                    We are dedicated on delivering your order in mint condition & on time Please note our shipping policy:
                                                </p>
                                                <ul>
                                                    <li className='mb-3 mt-2'>• We delivered product within maximum 3 working days Inside Dhaka and 6 working days Outside Dhaka from order, we put in our best efforts to ship your order at your door step</li>

                                                    <li className='mb-3 mt-2'>• Our regular delivery days are from Saturday to Thursday, excluding govt. holidays</li>

                                                    <li className='mb-3 mt-2'>• Each order is delivered to a single destination address. However, if you want us to deliver products to different addresses then you need to place multiple orders for individual destinations</li>

                                                    <li className='mb-3 mt-2'>• We make sure you receive your order in mint condition and on-time delivery. Hence we have our own delivery service and for outside Dhaka, we use reputed courier services</li>

                                                    <li className='mb-3 mt-2'>• While we try to deliver all your order together, this may not always be possible due to product characteristics, or availability.</li>
                                                </ul>
                                            </div>

                                            <div className=" text-start text-sm text-gray-700">
                                                <h2 className="text-lg underline font-semibold">Exchange Policy</h2>
                                                <ul>
                                                    <li className='mb-3 mt-2'>• We are dedicated to ensure customer satisfaction with any product that has been ordered.</li>

                                                    <li className='mb-3 mt-2'>• Any kind of exchange issue please contact with our Customer Care.</li>
                                                </ul>

                                                <p>
                                                    In this case please contact our customer service regarding which store will be convenient for you to get a replacement.
                                                </p>

                                                <ul>
                                                    <li className='mb-3 mt-2'>• An exchange cannot be done with a product which has a lower price than that of the original product purchased.</li>

                                                    <li className='mb-3 mt-2'>• Please keep your invoice in a secure place, it is required at the store while you get your product exchanged.</li>
                                                </ul>

                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                        }




                    </div>
                    {/* third section */}
                    <div className="w-[40%]  font-Roboto px-4">
                        <p className="text-5xl  yoyo uppercase">{product.title}</p>
                        <h2 className="text-sm text-gray-600 my-3">{product.description}</h2>
                        <div className="flex justify-start items-center gap-2 mb-2">
                            <Rating
                                style={{ maxWidth: 100 }}
                                value={rating}
                                itemStyles={myStyles}
                            />
                            <span className="text-black font-semibold mt-1">4.5 (21)</span>

                        </div>
                        <span className="text-gray-800 font-bold mt-7 ">Write a review</span>


                        <div className="flex justify-between  items-start mt-5">
                            <div className="flex items-center justify-center gap-2 border-l-[1px] px-2 w-[22%] h-12  border border-[#b89c07] text-[#b89c07]">
                                <button className=" hover:text-lg hover:font-bold py-1 "
                                    data-hs-overlay="#hs-overlay-right"
                                    onClick={() => {
                                        const existingProductIndex = cart.findIndex((item) => item._id === product._id);

                                        if (existingProductIndex !== -1) {
                                            // If the product is already in the cart, update the quantity and price
                                            const updatedCart = [...cart];
                                            if (updatedCart[existingProductIndex].quantity > 1) {
                                                // Check if the quantity is greater than 1 before decrementing
                                                updatedCart[existingProductIndex].quantity -= 1; // Decrease the quantity
                                                updatedCart[existingProductIndex].price -= product.initialPrirce; // Update the price by subtracting the original price
                                                setCart(updatedCart);
                                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                                // Show a success message
                                                toast.success("Cart updated");
                                            } else {
                                                // Show a warning or disable the button when the quantity is 1
                                                toast.warning("Quantity cannot be less than 1");
                                            }
                                        } else {
                                            // If the product is not in the cart, add it to the cart
                                            setCart((prevCart) => {
                                                const updatedCart = [
                                                    ...prevCart,
                                                    {
                                                        ...product, // Create a shallow copy of the product

                                                        quantity: 1,
                                                        price: product.price, // Initialize the price based on the product's price
                                                    },
                                                ];
                                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                                return updatedCart;
                                            });
                                            // Show a success message
                                            toast.success("Cart updated");
                                        }
                                    }}
                                >-</button>
                                <span className="font-semibold mx-2 text-sm text-[#b89c07]">1</span>
                                <button className=" hover:text-xl hover:font-bold  py-1"
                                    data-hs-overlay="#hs-overlay-right"
                                    onClick={() => {
                                        const existingProductIndex = cart.findIndex((item) => item._id === product._id);
                                        if (existingProductIndex !== -1) {
                                            // If the product is already in the cart, update the quantity and price
                                            const updatedCart = [...cart];
                                            updatedCart[existingProductIndex].quantity += 1; // Increase the quantity
                                            updatedCart[existingProductIndex].price = updatedCart[existingProductIndex].quantity * product.initialPrirce; // Update the price by adding the original price
                                            setCart(updatedCart);
                                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                                        } else {
                                            // If the product is not in the cart, add it to the cart
                                            setCart((prevCart) => {
                                                const updatedCart = [
                                                    ...prevCart,
                                                    {
                                                        ...product, // Create a shallow copy of the product
                                                  
                                                        quantity: 1,
                                                        price: product.price  // Initialize the price based on the product's price
                                                    }
                                                ];
                                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                                return updatedCart;
                                            });
                                        }

                                        // Show a success message
                                        toast.success("Cart Updated");
                                    }}
                                >+</button>
                            </div>


                            {/* <button disabled className=' w-[73%] py-[5px] h-12 cursor-not-allowed text-md bg-[#b89c07] text-white  gap-2 hover:text-white uppercase shadow-lg hover:shadow-sm'></button> */}

                            <div className="relative inline-flex items-center justify-center md:px-10 px-6 py-1 overflow-hidden font-medium tracking-tighter text-white  bg-[#b89c07] rounded-sm group md:py-[10px] w-[75%]">
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#a08300] rounded-full group-hover:w-[100%] group-hover:h-56"></span>
                                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to- [#b89c07]"></span>
                                <span className="relative lg:text-lg md:text-md text-sm">add to bag</span>
                            </div>
                        </div>


                    </div>
                </div>
                )}

                {/* similer proscuts  */}
               <SimilerProduct></SimilerProduct>
            </div>


            {/* mobil device*/}
            <div className="sm:hidden block  ">
            {product &&  (   
                <div className="text-center font-Roboto ">
             <div className="flex flex-col justify-start items-start mb-2  mt-2">
                    <div className="flex justify-start  text-gray-600 items-center font-Lore text-sm ">
                        <p className="font-normal text-gray-600 ">Home</p>
                        <p className="text-gray-400"> <IoIosArrowForward /> </p> <p className="text-gray-700">{product?.title}</p>
                    </div>
                    <div className="flex justify-start items-center gap-2 text-gray-600 text-sm">
                        <h2>Share On</h2>
                       

                        <a target="_blank" href={`fb-messenger://share/?link=${encodeURIComponent(websiteLink)}`} ><FaFacebookMessenger className="text-sm" /></a>

                        <a target="_blank" href={`whatsapp://send?text=${encodeURIComponent(websiteLink)}`}><IoLogoWhatsapp className="text-sm" /></a>
                    </div>
                </div>

                    <Carousel showThumbs={false} autoPlay className="h-[54vh] w-full  mx-auto ">
                        <img src={product.image} className="h-[54vh] w-full  mx-auto object-cover object-center" alt={product.title} title="click"></img>
                        {product.image1 ? (<img src={product.image1} className="h-[54vh] w-full  mx-auto object-cover object-center" alt={product.title} title="click"></img>):(<img src={product.image} className="h-[54vh] w-full  mx-auto object-cover object-center" alt={product.title} title="click"></img>)}  
                        {product.image2 ? (<img src={product.image2} className="h-[54vh] w-full  mx-auto object-cover object-center" alt={product.title} title="click"></img>):(<img src={product.image} className="h-[54vh] w-full  mx-auto object-cover object-center" alt={product.title} title="click"></img>)}  
                    </Carousel>



                    <div className="px-2 ">
                        <h2 className="text-lg font-bold mb-3 mt-3">{product.title}</h2>
                        <h2 className="text-md text-gray-600 leading-none my-1">{product.subTitle}</h2>
                        <div className="flex flex-col justify-center items-center gap-2 mt-2">
                            <Rating
                                style={{ maxWidth: 100 }}
                                value={rating}
                                itemStyles={myStyles}
                            />
                            <span className="text-gray-500  text-sm">৳ {product.Newprice}</span>

                        </div>
                        <div className="flex justify-center items-center">
                            {/* add to cart button */}
                            <button className="my-2 bg-[#b89c07]  h-10 cursor-pointer uppercase  border-[2px]  font-Roboto text-white hover:text-[#b89c07] text-md hover:bg-transparent rounded-md border-[#b89c07] text-sm  w-full font-semibold mb-2" >
                                add to bag
                            </button>

                        </div>


                        {/* Accordion */}

                        <div >
                            <Accordion >
                                <AccordionItem key="1" aria-label="Accordion 1" title="Description">
                                    <div className="pb-4 px-6">
                                          {product.subTitle &&  <div className=" text-start text-xs text-gray-700">
                                            <h2 className="text-sm  underline font-semibold">What It is</h2>
                                            {product.subTitle}
                                        </div> }   
                                        <div className=" text-start text-xs text-gray-700">
                                            <h2 className="text-sm underline font-semibold">About</h2>
                                           {product.description}
                                        </div>
                                    </div>
                                </AccordionItem>

                                <AccordionItem key="2" aria-label="Accordion 2" title="Order & Exchange Policy">
                                    <div className="pb-4 px-6">
                                        <div className=" text-start text-xs text-gray-700">
                                            <h2 className="text-sm  underline font-semibold">Ordering Policy</h2>
                                            <ul>
                                                <li className='mb-3 mt-2'>• Purchase is only available for products which are shown in stock on website.</li>
                                                <li className='mb-3 mt-2'>• Cash On Delivery (COD) available all over Bangladesh also digital payment allow.</li>
                                                <li className='mb-3 mt-2'>• Once the order has been paid, it cannot be cancelled.</li>
                                                <li className='mb-3 mt-2'>•  In case of size mismatch, delivery charge will be re-applicable.</li>
                                                <li className='mb-3 mt-2'>• Please contact Customer Service for order related queries.</li>
                                            </ul>
                                        </div>

                                        <div className=" text-start text-xs text-gray-700">
                                            <h2 className="text-sm  underline font-semibold mt-5 mb-2">Shipping Policy</h2>
                                            <p>
                                                We are dedicated on delivering your order in mint condition & on time Please note our shipping policy:
                                            </p>
                                            <ul>
                                                <li className='mb-3 mt-2'>• We delivered product within maximum 3 working days Inside Dhaka and 6 working days Outside Dhaka from order, we put in our best efforts to ship your order at your door step</li>

                                                <li className='mb-3 mt-2'>• Our regular delivery days are from Saturday to Thursday, excluding govt. holidays</li>

                                                <li className='mb-3 mt-2'>• Each order is delivered to a single destination address. However, if you want us to deliver products to different addresses then you need to place multiple orders for individual destinations</li>

                                                <li className='mb-3 mt-2'>• We make sure you receive your order in mint condition and on-time delivery. Hence we have our own delivery service and for outside Dhaka, we use reputed courier services</li>

                                                <li className='mb-3 mt-2'>• While we try to deliver all your order together, this may not always be possible due to product characteristics, or availability.</li>
                                            </ul>
                                        </div>

                                        <div className=" text-start text-xs text-gray-700">
                                            <h2 className="text-sm  underline font-semibold">Exchange Policy</h2>
                                            <ul>
                                                <li className='mb-3 mt-2'>• We are dedicated to ensure customer satisfaction with any product that has been ordered.</li>

                                                <li className='mb-3 mt-2'>• Any kind of exchange issue please contact with our Customer Care.</li>
                                            </ul>

                                            <p>
                                                In this case please contact our customer service regarding which store will be convenient for you to get a replacement.
                                            </p>

                                            <ul>
                                                <li className='mb-3 mt-2'>• An exchange cannot be done with a product which has a lower price than that of the original product purchased.</li>

                                                <li className='mb-3 mt-2'>• Please keep your invoice in a secure place, it is required at the store while you get your product exchanged.</li>
                                            </ul>

                                        </div>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                </div>
                )}
            </div>


        </div >
    );
};

export default ProductDetails;