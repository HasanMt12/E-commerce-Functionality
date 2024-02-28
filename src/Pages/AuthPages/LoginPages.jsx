import { useState } from "react";
import wave from "../../assets/Wave.svg"
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { IoIosArrowBack } from "react-icons/io";

const LoginPages = () => {
  const [selectedDive, setSelectedDive] = useState(1);

  const handleButtonClick = (diveNumber) => {
    setSelectedDive(diveNumber);
  };
  return (

    <div className="absolute top-0 -z-10 max-h-screen w-full md:pt-0 lg:py-[2%] md:py-0 py-0 bg-white">
      <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(184,158,7,0.65)] opacity-[0.3] blur-[80px]"></div>
      {/* only sm and md device  */}
      <div className="relative lg:hidden md:block block">
        <img src={wave} className="inset-0 transform rotate-180 min-h-[250px]" alt="Background" />
        <div className="absolute inset-0 flex flex-col text-white justify-start items-start">
          <div className="flex items-center lg:justify-center md:justify-start justify-start lg:ml-0 md:ml-8 ml-6">
            <Link to="/"><IoIosArrowBack className="my-4 text-xl font-semibold"></IoIosArrowBack></Link>
          </div>
          <div className="flex  items-center lg:hidden md:flex mt-10  md:justify-start justify-start md:ml-12 ml-10">
            <div>
              <h1 className="text-2xl font-bold">Welcome</h1>
              {selectedDive === 1 ? (<h1 className="mb-4 text-2xl font-bold">To Login</h1>) : (
                <h1 className="mb-4 text-2xl font-bold">To Sign Up</h1>
              )}

            </div>

          </div>
        </div>
      </div>
      {/* only sm and md device  */}


      <div className=" items-center justify-center  lg:ml-0 lg:flex hidden">
        <div className="flex items-center gap-5">
          <Link to="/"><IoIosArrowBack className="my-4 text-lg text-[#b89c07]"></IoIosArrowBack></Link>
          {selectedDive === 1 ? (<h2 className="text-[#b89c07] text-center text-2xl cursor-pointer font-semibold ">Welcome To Login</h2>) : (
            <h2 className="text-[#b89c07] cursor-pointer text-center text-2xl font-semibold ">Welcome To Sign Up</h2>
          )}
        </div>
      </div>


      <div className="flex items-center justify-center ">

        <div
          className="rounded-lg border border-gray-200 lg:border  md:border-none border-none bg-white lg:shadow-xl md:shadow-none shadow-none  flex-col flex  items-center justify-center sm:px-4">

          <div className="flex h-full flex-col justify-center gap-4 my-auto p-0  md:py-3 lg:min-w-[380px] md:min-w-[340px] min-w-[320px] ">
            {selectedDive === 1 ? (
              <LoginForm handleButtonClick={handleButtonClick}></LoginForm>
            ) : (
              <SignUpForm setSelectedDive={setSelectedDive} handleButtonClick={handleButtonClick}></SignUpForm>
            )}
          </div>
        </div>
      </div>
    </div>



  );
}

export default LoginPages;