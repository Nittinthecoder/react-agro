import React from 'react';
import OrderSucess from '../features/order/OrderSucess';
import Navbar from '../features/navbar/Navbar';

function UserOrdersPage() {
  return (
    <div className='bg-accent'>
      <Navbar />
      <OrderSucess />
    </div>
  );
}

export default UserOrdersPage;