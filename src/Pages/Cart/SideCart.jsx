import { AiOutlineClose } from "react-icons/ai";
import { useCart } from "../../Context/CartContextProvider";
import { useContext } from "react";
const SideCart = ({ isOpen, setIsOpen, children }) => {
  const [cart, setCart] = useCart();
  return (
    <main
      className={
        " fixed duration-500 overflow-hidden z-[30] bg-[#3C505A] bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0 "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-md right-0 absolute bg-[#F5F5F5] h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >

        <article className="relative w-screen max-w-md flex flex-col space-y-2  h-full">

          <header className="p-2 font-bold bg-[#F5F5F5] text-lg backdrop-blur-xl backdrop-brightness-150 ">
            <div className="flex justify-between  items-start px-2 ">
              <div className="flex flex-col justify-start hover:text-[#526D82] items-start ">
                <h2 className="text-base  uppercase">Shopping Bag <span className="font-Roboto text-xs"></span><span className="lowercase text-xs text-gray-700">({cart.length} item)</span></h2>

              </div>
              <AiOutlineClose className="w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>
          </header>
          {children}
        </article>
      </section>

      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};

export default SideCart;