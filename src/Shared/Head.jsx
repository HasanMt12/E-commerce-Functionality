import { PercentCircle, Phone, Truck } from 'lucide-react';
import React from 'react';


const Head = () => {
 
  
    return (
        <div className={`flex justify-center items-center lg:gap-6 md:gap-4 md:py-4 py-2 text-white gap-2 bg-[#3C505A]`}>
            <div className='flex justify-start items-center lg:gap-2 md:gap-2 gap-[2px]'>
                <Phone size={16} color="#ffffff" strokeWidth={2} />
                <p className='lg:text-md md:text-sm text-[10px]'>01602-848424</p>
            </div>

            <div className='flex justify-start items-center lg:gap-2 md:gap-2 gap-[2px]'>
            <Truck size={16} color="#ffffff" strokeWidth={2} />
                <p className='lg:text-md md:text-sm text-[10px]'>Fast Shipping</p>
            </div>

            <div className='flex justify-start items-center lg:gap-2 md:gap-2 gap-[2px]'>
            <PercentCircle size={16} color="#ffffff" strokeWidth={2} />
                <p className='lg:text-md md:text-sm text-[10px]'>100% AUTHENTIC</p>
            </div>
            
        </div>
    )
}

export default Head;
