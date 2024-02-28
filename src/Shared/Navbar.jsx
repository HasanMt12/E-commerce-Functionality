import { useContext, useEffect, useState } from "react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";

const MenuLinks = [
  {
    id: 1,
    name: "NEW",
    link: "/#",
  },
  {
    id: 2,
    name: "PERFUME",
    link: "/#shop",
  },
  {
    id: 3,
    name: "SKINCARE",
    link: "/#about",
  },
  
];

const DropdownLinks = [
  {
    id: 1,
    name: "Contact US",
    link: "/",
  },
  {
    id: 2,
    name: "About Us",
    link: "/",
  },
  {
    id: 3,
    name: "Return & Refund Policies",
    link: "/",
  },
];

import Head from "./Head";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userLogout";
import { CartContext } from "../Context/CartContextProvider";


const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const {  cart } = useContext(CartContext);
  // console.log(userState)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = 100; // You can adjust this threshold value as needed
      setIsFixed(offset > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const location = useLocation();

  return (
    <>
      <div >
        <Head />
        <div className={`fixed  w-full z-20 transition-all duration-300 ${isFixed ? 'top-0' : 'relative'}`}>
          <header className={isFixed ? 'bg-gray-200 bg-clip-padding shadow-sm backdrop-filter-none  backdrop-blur-xl brightness-50 bg-opacity-10  px-0' : 'bg-clip-padding backdrop-filter md:backdrop-filter-none  backdrop-blur-lg bg-opacity-10  px-0'}>
           
            <div className={`${isFixed ? "py-1" : ""}  py-2 container `}>
              <div className=" flex justify-between items-center">
                {/* Logo and Links section */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col justify-center">
                    <Link to="/">
                    <p className="text-[#27374D] bg-[#9DB2BF] px-2 py-1 rounded-lg lg:text-md md:text-sm text-xs font-semibold">Replic Mart</p>
                    </Link>
                  </div>
                  {/* Menu Items */}
                  <div className="hidden lg:block">
                    <ul className="flex items-center gap-4">
                      {MenuLinks.map((data, index) => (
                        <li key={index}>
                          <a
                            href={data.link}
                            className="inline-block px-4 font-semibold text-gray-500 hover:text-black  duration-200"
                          >
                            {" "}
                            {data.name}
                          </a>
                        </li>
                      ))}
                      {/* Dropdown  */}
                      <li className="relative cursor-pointer group">
                        <a
                          href="#"
                          className="flex items-center gap-[2px] font-semibold text-gray-500  py-2"
                        >
                          Support
                          <span>
                            <FaCaretDown className="group-hover:rotate-180 duration-300" />
                          </span>
                        </a>

                        {/* Dropdown Links */}
                        <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md  ">
                          <ul className="space-y-2">
                            {DropdownLinks.map((data, index) => (
                              <li key={index}>
                                <a
                                  className="text-gray-500   duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold"
                                  href={data.link}
                                >
                                  {data.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Navbar Right section */}
                <div className="flex justify-between items-center gap-4">
                  
                  {/* Search Bar section */}
                  {userState?.userInfo?.data?.email ? (
                    <div className="lg:block md:hidden hidden">
                      <h2 className="text-sm text-slate-700">Hi! {userState?.userInfo?.data?.name}</h2>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="bordered"
                            size="sm"
                          >
                            My Account
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="/my-profile"> <Link to="/my-profile">My Orders</Link></DropdownItem>
                          <DropdownItem > <Link to="/my-profile">My Address</Link></DropdownItem>
                          {userState?.userInfo?.data?.admin === true &&
                            <DropdownItem key="copy"><Link to="/dashboard">Admin Dashboard</Link></DropdownItem>
                          }
                          <DropdownItem onClick={logoutHandler} key="logout" color="danger">
                            Log Out
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  ) : (
                    <Link to="/login" className=""> <p className="text-[#30394D] lg:block md:hidden hidden cursor-pointer font-semibold">
                      Log In
                    </p></Link>
                  )}

              
                  {/* Order-button section */}  
                    {userState?.userInfo?.data?.email ? (
                    <div className="sm:hidden block">
                      <h2 className="text-sm text-slate-700">Hi! {userState?.userInfo?.data?.name}</h2>
                        <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="bordered"
                            size="sm"
                          >
                            My Account
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem> <Link to="/my-profile" className="-mr-10">My Orders</Link></DropdownItem>
                          <DropdownItem> <Link to="/my-profile">My Address</Link></DropdownItem>
                          {userState?.userInfo?.data?.admin === true &&
                            <DropdownItem key="copy"><Link to="/dashboard">Admin Dashboard</Link></DropdownItem>
                          }
                          <DropdownItem onClick={logoutHandler} key="logout" color="danger">
                            Log Out
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  ) : (
                    <Link to="/login" className=""> <p className="text-[#30394D] sm:hidden block  cursor-pointer font-semibold">
                      Log In
                    </p></Link>
                  )}
                  
                  {isOpen ? (
                    <button onClick={() => setIsOpen(false)} className="relative p-3">
                      <FaCartShopping className="text-xl text-gray-600 " />
                      <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                        {cart.length}
                      </div>
                    </button>
                  ) : (

                    <button onClick={() => setIsOpen(true)} className="relative p-3">
                      <FaCartShopping className="text-xl text-gray-600 " />
                      <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                      {cart.length}
                      </div>
                    </button>
                  )}

                  {/* Dark Mode section */}

                </div>
              </div>
            </div>
          </header>
        </div>

      </div>
     
    </>
  )
}

export default Navbar