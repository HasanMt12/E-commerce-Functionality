import  { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";
import { Button, Dropdown, Menu, Input } from 'antd';
import { ChevronDownCircle, Frown, Plus, Search } from 'lucide-react';
import MaxMinPrice from './MaxMinPrice';
import SectionHeading from '../../Shared/SectionHeadline';
import FeatureProducts from './FeatureProducts';
import NewsLetter from './NewsLetter';
import {  useCart } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';
import { useIsOpen } from '../../Context/CartOpenContext';

const ProductList = ({ }) => {
  const { isOpen, setIsOpen } = useIsOpen();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All product');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
const [cart, setCart] = useCart();

  useEffect(() => {
    
    fetch('/product.json') // Assuming product.json is in the public folder
      .then(response => response.json())
      .then(data => setProducts(data.products)); // Accessing the 'products' array from the JSON data
  }, []);

  const categories = ["smartphones","laptops","fragrances","skincare","groceries",];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on category, price range, and search term
  const filteredProducts = products.filter(product => {
    const meetsCategoryCriteria = selectedCategory === 'All product' || product.category === selectedCategory;
    const meetsPriceCriteria = (!minPrice || product.price >= parseFloat(minPrice)) &&
                               (!maxPrice || product.price <= parseFloat(maxPrice));
    const meetsSearchCriteria = searchTerm === '' || 
                                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return meetsCategoryCriteria && meetsPriceCriteria && meetsSearchCriteria;
  });


  
// slider settings
  var settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    pauseOnHover: true,
    slidesToShow: 4,
    slidesToScroll: 4,

    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

// categories dropdownMenu
  const menu = (
    <Menu>
      <Menu.Item key="All product" onClick={() => handleCategoryChange('All product')}>
        All productts
      </Menu.Item>
      {categories.map(category => (
        <Menu.Item key={category} onClick={() => handleCategoryChange(category)}>
          {category}
        </Menu.Item>
      ))}
    </Menu>
  );

 
  return (

    <div className='container'>

      <div className='flex justify-between items-center border border-dashed border-gray-300 pt-6 pb-2 md:px-3 px-2 rounded-lg'>

       <div className='flex lg:flex-row flex-col-reverse  items-start gap-2'>
        <div>
            <Dropdown overlay={menu}>
            <Button className='flex justify-start items-center gap-2'>
                Select Category <ChevronDownCircle />
            </Button>
            </Dropdown>
        </div>
        
        <MaxMinPrice handleMinPriceChange={handleMinPriceChange} minPrice={minPrice}
                     handleMaxPriceChange={handleMaxPriceChange}                                            maxPrice={maxPrice} >
        </MaxMinPrice>
       
      </div>
      <div className='lg:mt-0 mt-10'>
        <Input allowClear type="text" addonBefore={<Search size={16} />} label="Search" size='sm' className='border-red-500 ' value={searchTerm}  onChange={handleSearchChange} />
      </div>
    </div>
    
      <SectionHeading headingText={selectedCategory}></SectionHeading>
    
      {filteredProducts.length > 0 ? 
      (
        <Slider {...settings}>
        {filteredProducts && filteredProducts?.map(product => (
            <section key={product.id} className="p-2 py-4 bg-[#F5F5F5] group text-center transform duration-500 hover:-translate-y-2 cursor-pointer hover:border-[#526D82] border rounded-sm">
            <img src={product.thumbnail} className="object-cover object-center md:w-[220px] md:h-[220px]  w-[180px] h-[180px] mx-auto " alt="" />
            <Link  to={`/product/${product.id}`}>
                <div className="hover:bg-[#526D82] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity  hover:text-white lg:text-lg md:text-md md:h-12 h-10 text-sm w-[80%] mx-auto  relative inline-flex items-center justify-center md:px-10 px-6 md:py-2 py-1 overflow-hidden font-medium tracking-tighter text-white  bg-[#526D82] rounded-sm group">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#526D82] rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#526D82]"></span>
                <span className="relative lg:text-lg md:text-md text-sm">Quick view</span>
                </div>
            </Link>
            <h1 className="text-lg my-2 h-16 -mt-10">{product.title}</h1>

            <div className='flex justify-between items-center px-4'>
            <h2 className="font-semibold mb-2">৳ {product.price}</h2>
                 <button 
                    onClick={() => {
                        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
                        const updatedCart = [...cart];
                        
                        if (existingProductIndex !== -1) {
                        // If the product is already in the cart, update the quantity and price
                        updatedCart[existingProductIndex].quantity += 1; // Increase the quantity
                        updatedCart[existingProductIndex].price = updatedCart[existingProductIndex].quantity * product.price; 
                        setIsOpen(true)
                        // Update the price based on the quantity and original price
                        } else {
                        // If the product is not in the cart, add it to the cart
                        updatedCart.push({ ...product, quantity: 1 ,  price: product.price,  // Initialize the price based on the product's price
                      });
                        }

                        // Update cart state
                        setCart(updatedCart);
                        
                        // Update localStorage
                        localStorage.setItem("cart", JSON.stringify(updatedCart));
                        
                        // Show a success message
                        toast.success("Item Added to cart");
                        setIsOpen(true)
                    }}
                    className="flex justify-start text-sm p-1  items-center group-hover:shadow-lg gap-1 border-[#526D82] border rounded-sm"
                    >
                    Add To Bag <Plus className='group-hover:animate-ping' size={16}></Plus>
                    </button>


            </div> 
            </section>
        ))}
      
      </Slider>
      ):
      (
        <div className='flex justify-center items-center border px-6 py-4 rounded-lg border-[#526D82] border-dashed '>
            <div >
                <div className='flex justify-center'> 
                    <Frown  color='#526D82' />
                </div> 
                <h2 className='text-center text-[#253D47] md:text-x; text-lg my-2'>No products found</h2> 
            </div>   
        </div>
      )}      

        {/* Extra Sections | News Letter , Random Feature Prodcuts*/}
      <div>
        <NewsLetter></NewsLetter>
        <FeatureProducts categories={categories} filteredProducts={filteredProducts}></FeatureProducts>
      </div>
        {/* Extra Sections | News Letter , Random Feature Prodcuts*/}
    </div>
  );
};

export default ProductList;
