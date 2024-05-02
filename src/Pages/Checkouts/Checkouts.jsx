import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem, Checkbox, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useCart } from '../../Context/CartContextProvider';
const Checkouts = () => {
    const [cart, setCart] = useCart();
    const [subtotal, setSubtotal] = useState(0);

    const updateSubtotal = () => {
        let total = 0;
        cart?.forEach((item) => {
          total = total + item.price;
        });


        setSubtotal(total);
      };

      useEffect(() => {
        // console.log('Selected Products:', selectedProducts);
        updateSubtotal();
      }, [  cart]);

      const total = subtotal + 1.99
    return (
        <div class="bg-gray-100 py-8">
            <div class="container mx-auto px-4">
                <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div class="flex flex-col md:flex-row gap-4">
                    {/* left side */}
                    <div class="md:w-3/4">



                        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                            <div className="flex w-full flex-wrap border border-neutral-200 rounded-xl md:flex-nowrap gap-4 my-5">

                                <Select
                                    label="Account"
                                    className=""
                                >
                                    <SelectItem>test</SelectItem>
                                    <SelectItem>test</SelectItem>
                                    {/* Data
                                        
                                        {animals.map((animal) => (
                                            <SelectItem key={animal.value} value={animal.value}>
                                                {animal.label}
                                            </SelectItem>
                                        ))} */}
                                </Select>
                            </div>

                            <div className=' p-3 mb-4 font-semibold'>
                                <Checkbox defaultSelected color="warning">Email me with news and offers</Checkbox>
                            </div>
                            <h1 className='font-semibold text-2xl mb-5'>Delivery</h1>

                            <div className='border text-sm border-neutral-300 rounded-xl mb-10'>
                                <div className=' p-3 font-semibold border-b border-neutral-300'>
                                    <Checkbox color="warning">Ship</Checkbox>
                                </div>
                                <div className=' p-3 font-semibold border-neutral-300'>
                                    <Checkbox color="warning">Pick up</Checkbox>
                                </div>
                            </div>


                            <div className="flex w-full flex-wrap border border-neutral-200 rounded-xl md:flex-nowrap gap-4 my-5">

                                <Select
                                    label="Country/Region"
                                    placeholder="Select an country"
                                    className=""
                                >
                                    <SelectItem>Bangladesh</SelectItem>
                                    <SelectItem>New Bangladesh</SelectItem>
                                    <SelectItem>Old Bangladesh</SelectItem>
                                    {/* Data
                                        
                                        {animals.map((animal) => (
                                            <SelectItem key={animal.value} value={animal.value}>
                                                {animal.label}
                                            </SelectItem>
                                        ))} */}
                                </Select>
                            </div>

                            <div className="flex w-full flex-wrap  md:flex-nowrap gap-4 mb-5">
                                <div className='border border-neutral-200 rounded-xl w-full'>
                                    <Input type="text" placeholder="First name (optional)" />
                                </div>
                                <div className='border border-neutral-200 rounded-xl w-full'>
                                    <Input type="text" placeholder="Last name" />
                                </div>
                            </div>

                            <div className="flex w-full flex-wrap border border-neutral-200 rounded-xl md:flex-nowrap gap-4 mb-5">
                                <Input type="text" placeholder="Apartment, suite, etc. (optional)" />
                            </div>

                            <div className="flex w-full flex-wrap  md:flex-nowrap gap-4 mb-5">
                                <div className='border border-neutral-200 rounded-xl w-full'>
                                    <Input type="text" placeholder="City" />
                                </div>
                                <div className='border border-neutral-200 rounded-xl w-full'>
                                    <Input type="text" placeholder="Postal code" />
                                </div>
                            </div>

                            <div className="flex w-full flex-wrap border border-neutral-200 rounded-xl md:flex-nowrap gap-4 mb-5">
                                <Input type="text" placeholder="Phone" />
                            </div>

                            <div className=' p-3 mb-4 font-semibold'>
                                <Checkbox defaultSelected color="warning">Text me with news and offers</Checkbox>
                            </div>


                            <h1 className='font-semibold text-2xl mb-5'>Shipping method</h1>

                            <div className='border text-sm border-neutral-300 rounded-xl mb-10'>
                                <div className=' p-3 font-semibold border-b border-neutral-300'>
                                    <Checkbox color="warning">Free Shipping</Checkbox>
                                </div>
                                <div className=' p-3 font-semibold border-neutral-300'>
                                    <Checkbox color="warning">Inside Dhaka</Checkbox>
                                </div>
                            </div>

                            <h1 className='font-semibold text-2xl mb-2'>Payment</h1>
                            <p className='mb-5'>All transactions are secure and encrypted.</p>

                            <div className='border text-sm border-neutral-300 rounded-xl mb-10'>
                                <div className=' p-3 font-semibold border-b border-neutral-300'>
                                    <Checkbox color="warning">Free Shipping</Checkbox>
                                </div>
                                <div className=' p-3 font-semibold border-neutral-300'>
                                    <Checkbox color="warning">Inside Dhaka</Checkbox>
                                </div>
                            </div>


                            <h1 className='font-semibold text-2xl mb-5'>Billing address</h1>

                            <div className='border text-sm border-neutral-300 rounded-xl mb-10'>
                                <div className=' p-3 font-semibold border-b border-neutral-300'>
                                    <Checkbox color="warning">Free Shipping</Checkbox>
                                </div>
                                <div className=' p-3 font-semibold border-neutral-300'>
                                    <Checkbox color="warning">Inside Dhaka</Checkbox>
                                </div>
                            </div>

                            <div className="relative inline-flex items-center justify-center md:px-10 px-6 py-5 overflow-hidden font-medium tracking-tighter text-white bg-[#2f4b57] rounded-lg group md:py-[10px] w-[100%] mt-2">
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#253D47] rounded-full group-hover:w-[100%] group-hover:h-56"></span>
                                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#2e4853]"></span>
                                <span className="relative lg:text-lg md:text-md text-sm">Complete Order</span>
                            </div>
                        </div>



                    </div>

                    {/* right side */}
                    <div class="md:w-2/4">
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <h2 class="text-lg font-semibold mb-4">Summary</h2>

                           

                            <div class="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>$ {setSubtotal}</span>
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
                                <span class="font-semibold">$ {total}</span>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkouts;