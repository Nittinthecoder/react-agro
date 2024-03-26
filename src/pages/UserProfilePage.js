import React from 'react';
import UserProfile from '../features/user/components/UsrProfile';
import Navbar from '../features/navbar/Navbar';

function UserProfilePage() {
  return (
    <div className='bg-background '>
      <Navbar />
      <UserProfile />
    </div>
  );
}

export default UserProfilePage;