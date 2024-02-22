import React, { useEffect, useRef, useState } from "react";

import { useCartContext } from "./contexts/CartContext";

import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import ProductDetails from "./Pages/ProductDetails";
import LandingPage from "./Pages/LandingPage";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import WishList from "./Pages/WishList";
import ProductsPage from "./Pages/ProductsPage";
import SuccessPayment from "./Pages/SuccessPayment";
import CancelPayment from "./Pages/CancelPayment";
function App() {

  
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>Error</div>,
      children: [
        { element: <LandingPage />, index: true },
        {path:"/products",element:<ProductsPage/>},
        { path: ":category/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        {path:"/wishlist",element:<PrivateRoute><WishList /></PrivateRoute>},
        { path: "/checkout", element:<PrivateRoute><Checkout /></PrivateRoute>},
        {path:"/login",element:<LoginForm/>},
        {path:"/register",element:<RegisterForm/>},
        {path:"/success",element:<SuccessPayment/>},
        {path:"/cancel",element:<CancelPayment/>},
        { path: "*", element: <div>Error</div> },
      ],
    },
  ]);

  return (
    <>
      <div>
       
        <ToastContainer className={"toast-container"} />
        <RouterProvider router={Router} />
      </div>
    </>
  );
}

export default App;
