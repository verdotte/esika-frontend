import React, { FC } from 'react';
import HouseVector from '../_vectors/houseVector';

const BottomNavbar: FC = (): JSX.Element => {
  return (
    <div className="w-full flex justify-between fixed bottom-0 p-3 px-5 bg-white z-20 border-t shadow-md md:hidden">
      <div className="flex flex-col items-center text-xs">
        <HouseVector />
        <p>Home</p>
      </div>
      <div className="flex flex-col items-center text-xs">
        <HouseVector />
        <p>Explorer</p>
      </div>
      <div className="flex flex-col items-center text-xs">
        <HouseVector />
        <p>Category</p>
      </div>
      <div className="flex flex-col items-center text-xs">
        <HouseVector />
        <p>Profile</p>
      </div>
    </div>
  );
};

export default BottomNavbar;
