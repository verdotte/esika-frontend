import React from 'react';
import { useHistory } from 'react-router';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import ChevronLeftVector from 'app/modules/__modules__/_vectors/chevronLetfVector';
import { useFetchAgentProperties } from 'app/modules/Hooks/useFetchUser';

const AgentProperties = () => {
  const history = useHistory();
  // const {  } = useProfile();
  useFetchAgentProperties();

  return (
    <div>
      <div className="container mx-auto px-0 md:px-8 no-scrollbars">
        <div className="h-full mt-4 mb-16 md:mt-2 mx-7 sm:mx-0">
          <div className="ml-[-1.3rem] pb-4">
            <span
              role="button"
              tabIndex={0}
              onKeyDown={() => null}
              onClick={() => {
                return history.push('/profile');
              }}
            >
              <ChevronLeftVector className="h-8 w-8 text-gray-500" />
            </span>
            <div className="pt-6">
              <p className="text-sm sm:text-xl">Statistiques</p>
            </div>
            <div className="py-5 flex justify-around items-center">
              <div className="py-1 px-5 rounded-lg shadow-xl border border-gray-200">
                <p className="py-1 text-sm sm:text-xl text-center">
                  0
                </p>
                <p className="py-1 text-sm sm:text-xl">Hotel</p>
              </div>
              <div className="py-1 px-5 rounded-lg shadow-xl border border-gray-200">
                <p className="py-1 text-sm sm:text-xl text-center">
                  0
                </p>
                <p className="py-1 text-sm sm:text-xl">Appartement</p>
              </div>
              <div className="py-1 px-5 rounded-lg shadow-xl border border-gray-200">
                <p className="py-1 text-sm sm:text-xl text-center">
                  0
                </p>
                <p className="py-1 text-sm sm:text-xl">Maison</p>
              </div>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default AgentProperties;
