import React from 'react';
import UsrOrders from '../features/user/components/UsrOrders';
import Navbar from '../features/navbar/Navbar';

function UserOrdersPage() {
  return (
    <div className='bg-background '>
      <Navbar />
      <UsrOrders />
    </div>
  );
}

export default UserOrdersPage;