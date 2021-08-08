import React from 'react';
import Header from 'app/modules/__modules__/Header';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import AddVector from 'app/modules/__modules__/_vectors/addVector';
import { onImageError } from 'app/modules/utils/helpers';
import AgentPropertyCard from 'app/modules/__modules__/_Cards/AgentPropertyCard';

const Properties = () => {
  return (
    <div className="container mx-auto px-0 md:px-8 no-scrollbars">
      <Header className="fixed md:sticky z-20 md:z-10 top-0" />

      <div className="h-full mt-[5.5rem] sm:mt-14 my-4 mx-2 ">
        <div className="bg-brand-thin/10 mt-4 mb-10 pb-1 ">
          <div className="flex justify-between items-center pt-6 px-2 sm:px-32">
            <ShowWidget
              condition
              fallback={
                <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse" />
              }
            >
              <img
                src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="User avatar"
                className="w-11 h-11 sm:w-16 sm:h-16 rounded-full object-cover"
                onError={onImageError}
              />
            </ShowWidget>

            <p className="text-center text-lg text-black">
              My proprieties
            </p>
            <AddVector className="text-blue-500 h-10 w-10 sm:h-14 sm:w-14 cursor-pointer" />
          </div>

          <div className="block my-3 sm:px-32 sm:flex sm:flex-wrap sm:content-start sm:pt-8  sm:items-center overflow-hidden">
            <AgentPropertyCard />
            <AgentPropertyCard />
            <AgentPropertyCard />
          </div>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Properties;
