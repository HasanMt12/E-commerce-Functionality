import { createBrowserRouter, } from "react-router-dom";
import Main from "../layouts/main/Main";
import Home from "../ui/home/Home";
import LoginPages from "../Pages/AuthPages/LoginPages";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import ShoppingCart from "../Pages/ShoppingCart/ShoppingCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
        children: [
            {
              path: "/",
              element: <Home />
            },
            {
              path: "/login",
              element: <LoginPages />
          },
          {
            path: "/product/:id",
            element: <ProductDetails></ProductDetails>
            },,
            {
              path: "/shopping-cart",
              element: <ShoppingCart></ShoppingCart>
            },

        ]
    },

]);


export default router;