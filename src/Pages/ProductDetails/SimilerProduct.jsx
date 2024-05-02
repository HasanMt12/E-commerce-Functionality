
import { useState } from 'react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SimilerProduct = () => {
    const navigate = useNavigate();
    const [product , setProduct] = useState([])
   
    return (
        // <div className="bg-white px-32">
        //             <div className="max-w-[75rem] lg:py-8 lg:px-10 md:py-6 md:px-4 py-5 px-2">

        //                 <h2 className="lg:text-xl md:text-lg text-center font-Roboto font-semibold uppercase text-sm mb-16 mt-2 text-[#161616]">
        //                     Popular pick
        //                 </h2>
        //                 {/* {relatedProducts.length < 1 && <p className="text-center">No Similar Products found</p>} */}
        //                 <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-3 grid-cols-2">
        //                 {product && shuffleArray(product).map((p) => ( 
        //                     <div
        //                         key={p._id}
        //                         title="click details"
        //                         onClick={() => navigate(`/product/${p._id}`)}
        //                         className="relative cursor-pointer h-64 w-full flex items-end justify-start text-left bg-cover bg-center"
        //                         style={{ backgroundImage: `url(${p.image})` }}
        //                     >
        //                         <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        //                         <div className="absolute top-0 right-0 left-0 lg:mx-5 md:mx-3 mx-1 mt-2 flex justify-between items-center">
        //                             <a className="text-xs bg-black text-white lg:px-5 md:px-3 px-2 py-2 uppercase hover:bg-white hover:text-black transition ease-in-out duration-500">
        //                                 {p.title}
        //                             </a>
        //                             <div className="text-[#161616] lg:text-xl md:text-lg text-md flex flex-col justify-start">
        //                                 <span className="leading-0 font-semibold">৳ {p.Newprice}</span>
                                       
        //                             </div>
        //                         </div>
        //                         <main className="p-5 z-10">
        //                             <a
        //                                 // onClick={() => navigate(`/product/${p.slug}`)}
        //                                 className="text-md  font-Lore   text-white hover:underline"
        //                             >
        //                                 Name
        //                             </a>
        //                         </main>
        //                     </div>
        //                 ))}
        //                 </div>
        //             </div>
        //         </div>
        <></>
    );
}

export default SimilerProduct;
