import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/ProductSlice'
import authReducer from '../features/auth/authSlice'
import cartReducer from "../features/shopping-cart/CartSlice"
import orderReducer from "../features/order/orderSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
