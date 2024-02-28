import { createBrowserRouter, } from "react-router-dom";
import Main from "../layouts/main/Main";
import Home from "../ui/home/Home";
import LoginPages from "../Pages/AuthPages/LoginPages";

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

        ]
    },

]);


export default router;