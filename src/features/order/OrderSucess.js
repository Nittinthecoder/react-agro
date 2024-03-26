import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../shopping-cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../auth/authSlice";
import { resetOrder } from "./orderSlice";
import { selectCurrentOrder } from "../order/orderSlice";


function OrderSucess() {
  const params = useParams() 
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const currentOrder =  useSelector(selectCurrentOrder);
  
  useEffect(()=>{
   // reset cart
   dispatch(resetCartAsync(user.id))
   // reset currentOrder
   dispatch(resetOrder())
  },[dispatch,user])

  return (
    <>   
        {!params.id && <Navigate to="/" replace={true}></Navigate>}
        
        <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8 bg-background h-screen ">
          <div className="text-center ">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl ">
              Your Order No : {params.id}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Thanks for ordering
            </p>
            <div className="mt-10 flex items-center justify-between gap-x-6">
              <p className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold  shadow-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!
              </p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
              to="/orders"
                  //TODO: add path for your orders here  <--
                className="rounded-md bg-primary animate-bounce px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:text-text hover:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Your Orders <span aria-hidden="true"></span>
              </Link>
            </div>
          </div>
        </main>
    </>
  );
}

export default OrderSucess;
