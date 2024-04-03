import React from 'react';
import UserProfile from '../features/user/components/UsrProfile';
import Navbar from '../features/navbar/Navbar';

function UserProfilePage() {
  return (
    <div className='bg-background '>
      <Navbar />
      <h1 className='mx-auto text-3xl max-w-7xl px-4 sm:px-6 lg:px-8 mb-10'> My Profile</h1>
      <UserProfile />
    </div>
  );
}

export default UserProfilePage;