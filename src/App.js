import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import  Cart  from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetials from "./features/porduct-list/components/ProductDetails"

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/login",
    element: (<LoginPage />),
  },
  {
    path: "/signup",
    element: (<SignupPage />),
  },
  {
    path: "/cart",
    element: (<Cart />),
  },
  {
    path: "/checkout",
    element: (<CheckoutPage />),
  },
  {
    path: "/productdetails",
    element: (<ProductDetials />),
  },
]);



function App() {
  return (
    <div className='App'>      
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
