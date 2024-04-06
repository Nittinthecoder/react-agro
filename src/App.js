import React from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/shopping-cart/CartSlice";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import PageNotFound from "./pages/404";
import OrderSucessPage from "./features/order/OrderSucess";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import AdminHome from "./pages/AdminHome";
import ProductForm from "./features/admin/components/ProductForm";
import ProductFormPage from "./pages/ProductFormPage";
import AdminOrderPage from "./pages/AdminOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrderPage></AdminOrderPage></ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <Cart />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/productdetails/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/admin/productform",
    element: (
      <ProtectedAdmin>
        <ProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productform/edit/:id",
    element: (
      <ProtectedAdmin>
        <ProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productdetails/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "/ordersucess/:id",
    element: (
      <Protected>
        <OrderSucessPage />
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
