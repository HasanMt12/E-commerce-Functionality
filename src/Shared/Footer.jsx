import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
} from "react-icons/fa6";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const CustomerCareLinks = [
  {
    title: "Delivery Information",
    link: "/",
  },
  {
    title: "Terms & Conditions",
    link: "/",
  },
  {
    title: "About Us",
    link: "/",
  },
  {
    title: "Return & Refund Policies",
    link: "/",
  },
];

const Footer = () => {
  const handlePhoneClick = () => {
    window.open('tel:01602-848424');
  };
  return (
    <div className="bg-[#253D47]">
      <div className="container bg">
        <div className="grid md:grid-cols-3 pb-20 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col justify-center">
            <p className="text-white font-semibold">Replic Mart</p>
            </div>
          </div>
            <p className="text-white  lg:pr-24 pt-3">
              We (Replic Mart) always sell authentic products at reasonable prices.
            </p>
          
           
          </div>

          {/* Footer links */}
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            <div className="py-8 px-4">
              <h1 className="text-xl text-white font-bold sm:text-left mb-3">
              CUSTOMER CARE
              </h1>
              <ul className="space-y-3">
                {CustomerCareLinks?.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-white  hover:text-[#CCBE43] duration-300"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* second col links */}
            <div className="py-8 px-4">
              <h1 className="text-xl text-white font-bold sm:text-left mb-3">
                Quick Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks?.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-white  hover:text-[#CCBE43] duration-300"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Address */}
            <div className="py-8 px-4 col-span-2 sm:col-auto">
              <h1 className="text-xl text-white font-bold sm:text-left mb-3">Address</h1>
              <div>
                <div className="flex text-white items-center gap-3">
                  <FaLocationArrow />
                  <p>Dhaka, Bangladesh</p>
                </div>
                <div onClick={handlePhoneClick} title="Place Call" className="flex text-white cursor-pointer items-center gap-3 mt-6">
                  <FaMobileAlt />
                  <p>01602848424</p>
                </div>

                {/* social links */}
                <div className="flex text-white items-center gap-3 mt-6">
                  <a target="_blank" href="https://www.instagram.com" >
                    <FaInstagram  className="text-3xl duration-300" />
                  </a>
                  <a target="_blank" href="https://www.facebook.com" >
                    <FaFacebook className="text-3xl  duration-200" />
                  </a>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
