import React from 'react';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import Header from 'app/modules/__modules__/Header';
import WishListCard from './wishListCard';

const WhishListActivity = () => {
  return (
    <>
      <Header />
      <WishListCard />
      <BottomNavbar />
    </>
  );
};

export default WhishListActivity;
