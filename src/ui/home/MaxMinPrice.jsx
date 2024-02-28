
import { Input } from '@nextui-org/react';
import React from 'react';

const MaxMinPrice = ({handleMinPriceChange, minPrice, maxPrice, handleMaxPriceChange }) => {
    return (
        <div className='flex justify-start items-start -mt-5 gap-2'> 
        <Input  type="number" variant='flat' color='primary' labelPlacement="outside" label="Min Price" size='sm' value={minPrice} onChange={handleMinPriceChange}  />
        <Input type="number" variant='flat' color='primary' labelPlacement="outside" label="MAx Price" size='sm' value={maxPrice} onChange={handleMaxPriceChange}  />
    </div>
    );
}

export default MaxMinPrice;
