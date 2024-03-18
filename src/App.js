import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import  Cart  from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

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
    element: (<ProductDetailsPage />),
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
