// import { NextUIProvider } from "@nextui-org/react"
import { RouterProvider } from "react-router-dom"
import router from './routes/router'
// import { useEffect } from "react";
// import "./App.css"

// import Aos from "aos"
// import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

//use this effect for aos
function App() {
  // useEffect(function () {
  //   Aos.init({ duration: 800 });
  // }, []);

  return (
    <>
      <NextUIProvider> 
      
      <RouterProvider router={router}></RouterProvider>
       <Toaster position="top-center" reverseOrder={false}></Toaster>
      </NextUIProvider>
      
    </>
  )
}

export default App