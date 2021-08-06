import React, {
    useCallback,
    useState,
    useEffect,
    useMemo,
  } from 'react';
  import Header from 'app/modules/__modules__/Header';
  import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
  import Footer from 'app/modules/_noAuth/Home/__modules__/Footer';
  import ChevroDownVector from 'app/modules/__modules__/_vectors/chevronDownVector';
  import CameraVector from 'app/modules/__modules__/_vectors/cameraVector';
  
  const AddProperty = () => {
    return (
      <div className="container mx-auto px-0 md:px-8 no-scrollbars">
        <Header className="fixed md:sticky z-20 md:z-10 top-0" />
  
        <div className="h-full mt-[5.5rem] sm:mt-14 my-4 mx-2 ">
          
          <div className=" bg-brand-thin/10 mt-4 mb-10 pb-1">
            <p className="text-center text-lg text-black pt-5 sm:pt-10">
              Add property
            </p>
            <div className="flex justify-center items-center pt-6">
              <div className="w-full block px-3 sm:px-[30%] pb-2">
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-brand-bold rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Title"
                />
                <textarea
                  className="resize-y border block w-full bg-gray-100 text-gray-700 border border-brand-bold rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Description"
                />
                <div className="flex justify-between items-center">
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-brand-bold rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="number"
                    placeholder="Price"
                  />
                  <div className="w-2/5 mb-3 inline-block relative">
                    <select className="appearance-none block w-full bg-gray-100 text-gray-500 border border-brand-bold rounded py-3 pl-4 pr-8 shadow leading-tight focus:bg-white focus:outline-none focus:shadow-outline">
                      <option>USD</option>
                      <option>CDF</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-[03%] flex items-center px-2 text-gray-700">
                      <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                    </div>
                  </div>
                </div>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-brand-bold rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Location"
                />
  
                <div className="w-full mb-3 inline-block relative">
                  <select className="appearance-none block w-full bg-gray-100 text-gray-500 border border-brand-bold rounded py-3 pl-4 pr-8 shadow leading-tight focus:bg-white focus:outline-none focus:shadow-outline">
                    <option>Bunia</option>
                    <option>Durba</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-[03%] flex items-center px-2 text-gray-700">
                    <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                  </div>
                </div>
                <div className="w-full mb-3 inline-block relative">
                  <select className="appearance-none block w-full bg-gray-100 text-gray-500 border border-brand-bold rounded py-3 pl-4 pr-8 shadow leading-tight focus:bg-white focus:outline-none focus:shadow-outline">
                    <option>House</option>
                    <option>Appartement</option>
                    <option>Hotel</option>
                    <option>Studio</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-[03%] flex items-center px-2 text-gray-700">
                    <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                  </div>
                </div>
                <div className="w-full mb-3 inline-block relative">
                  <select className="appearance-none block w-full bg-gray-100 text-gray-500 border border-brand-bold rounded py-3 pl-4 pr-8 shadow leading-tight focus:bg-white focus:outline-none focus:shadow-outline">
                    <option>Rent</option>
                    <option>Sell</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-[03%] flex items-center px-2 text-gray-700">
                    <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                  </div>
                </div>
                <div className="block mt-2 mb-2">
                  <p className="text-gray-600 text-md">Add photos</p>
                  <div className="h-20 w-20 sm:h-28 sm:w-28 flex mt-2 p-4 justify-center items-center bg-gray-100 border border-brand-bold rounded">
                    <label className="cursor-pointer ease-linear transition-all duration-150">
                      <CameraVector className="h-full w-full text-gray-700" />
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className="my-2 sm:my-3 bg-brand-bold rounded-lg p-2 px-5"
                  >
                    Add extra
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="my-2 sm:my-3 bg-brand-bold rounded-lg p-2 px-5"
                  >
                    Post property
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
  
  export default AddProperty;
  