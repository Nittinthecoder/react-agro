import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

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
    path: "/Cart",
    element: (<Cart />),
  },
  {
    path: "/Checkout",
    element: (<Checkout />),
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
