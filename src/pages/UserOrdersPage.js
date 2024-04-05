import React from "react";
import UsrOrders from "../features/user/components/UsrOrders";
import Navbar from "../features/navbar/Navbar";

function UserOrdersPage() {
  return (
    <div className="bg-background h-auto ">
      <Navbar />
      <h1 className="mx-auto text-2xl max-w-7xl px-4 sm:px-6 lg:px-8 mb-5"> My Orders</h1>
      <UsrOrders />
    </div>
  );
}

export default UserOrdersPage;
