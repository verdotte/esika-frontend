import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import Header from 'app/modules/__modules__/Header';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import Footer from 'app/modules/_noAuth/Home/__modules__/Footer';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import { onImageError } from 'app/modules/utils/helpers';

const Profile = () => {
  return (
    <div className="container mx-auto px-0 md:px-8 no-scrollbars">
      <Header className="fixed md:sticky z-20 md:z-10 top-0" />

      <div className="h-full mt-[5.5rem] sm:mt-14 my-4 mx-2 ">
        
        <div className="bg-brand-thin/10 p-3 mb-5 ">
          <p className="text-center text-lg text-black sm:py-5">
            Personal info
          </p>
          <div className="mt-3 mb-10 sm:flex sm:justify-center sm:items-center">
            <form className="w-full max-w-sm">
              <div className="flex justify-center items-center mb-5">
                <ShowWidget
                  condition={true}
                  fallback={
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 animate-pulse" />
                  }
                >
                  <div className="relative block w-20 h-20 sm:w-24 sm:h-24 sm:mb-3">
                    <img
                      src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      alt="User avatar"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                      onError={onImageError}
                    />
                    <VerifiedIcon className="absolute bottom-0 right-0 text-blue-500 text-sm h-5 w-5" />
                  </div>
                </ShowWidget>
              </div>
              <ShowWidget
                condition={true}
                fallback={
                  <div className="h-6 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                }
              >
                <div className="flex items-center border-b-2 border-gray-400 mb-3 py-1">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-0 leading-tight focus:outline-none"
                    type="text"
                    placeholder="FirstName"
                    aria-label="Full name"
                  />
                  <button
                    className="flex-shrink-0 border-transparent border-4 text-gray-700 hover:text-teal-800 text-sm py-1 px-0 rounded"
                    type="button"
                  >
                    Edit
                  </button>
                </div>
              </ShowWidget>
              <ShowWidget
                condition={true}
                fallback={
                  <div className="h-6 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                }
              >
                <div className="flex items-center border-b-2 border-gray-400 mb-3 py-1">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-0 leading-tight focus:outline-none"
                    type="text"
                    placeholder="SecondName"
                    aria-label="Full name"
                  />
                  <button
                    className="flex-shrink-0 border-transparent border-4 text-gray-700 hover:text-teal-800 text-sm py-1 px-0 rounded"
                    type="button"
                  >
                    Edit
                  </button>
                </div>
              </ShowWidget>
              <ShowWidget
                condition={true}
                fallback={
                  <div className="h-6 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                }
              >
                <div className="flex items-center border-b-2 border-gray-400 mb-3 py-1">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-0 leading-tight focus:outline-none"
                    type="number"
                    placeholder="Number"
                    aria-label="Full name"
                  />
                  <button
                    className="flex-shrink-0 border-transparent border-4 text-gray-700 hover:text-teal-800 text-sm py-1 px-0 rounded"
                    type="button"
                  >
                    Edit
                  </button>
                </div>
              </ShowWidget>
              <ShowWidget
                condition={true}
                fallback={
                  <div className="h-6 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                }
              >
                <div className="flex items-center border-b-2 border-gray-400 mb-3 py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-0 leading-tight focus:outline-none"
                    type="email"
                    placeholder="Email"
                    aria-label="Full name"
                  />
                  <button
                    className="flex-shrink-0 border-transparent border-4 text-gray-700 hover:text-teal-800 text-sm py-1 px-0 rounded"
                    type="button"
                  >
                    Add
                  </button>
                </div>
              </ShowWidget>
            </form>
          </div>
        </div>

        <div className="bg-brand-thin/10 p-3 mb-5">
          <p className="text-center text-lg text-black pt-2">
            Account
          </p>
          <div className="block sm:flex sm:justify-center sm:items-center">
            <div className="mt-4 mb-4 sm:mt-6 sm:mb-4">
              <p className="text-gray-600 text-md mb-1">
                Account type :{' '}
                <span className="text-black text-md">Owner</span>
              </p>
              <p className="text-gray-600 text-md mb-1">
                Account status :{' '}
                <span className="text-black text-md">Verified</span>
              </p>
              <p className="text-gray-600 text-md mb-1">
                Subscription status :{' '}
                <span className="text-black text-md">
                  20 September 2022
                </span>
              </p>
              <div className="flex justify-center items-center mt-4 sm:mt-8">
                {/* <button className=" mt-3 font-medium bg-brand-bold text-md hover:text-gray-500 text-gray-700 hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">
                    Desactiver my Account
                    </button> */}
                <button
                  type="button"
                  className="bg-brand-bold text-md font-medium rounded-lg py-3 px-5"
                >
                  Desactiver my Account
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default Profile;
