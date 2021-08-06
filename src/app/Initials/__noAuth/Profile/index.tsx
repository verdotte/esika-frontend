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
import AddVector from 'app/modules/__modules__/_vectors/addVector';
import LocationVector from 'app/modules/__modules__/_vectors/LocationVector';
import ChevroDownVector from 'app/modules/__modules__/_vectors/chevronDownVector';
import CameraVector from 'app/modules/__modules__/_vectors/cameraVector';
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

        <div className="bg-brand-thin/10 mt-4 mb-10 pb-1">
          <div className="flex justify-between items-center pt-6 px-2 sm:px-32">
            <ShowWidget
              condition={true}
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
          <div className="block sm:flex sm:flex-wrap sm:pt-8 sm:justify-center sm:items-center">
            <div className="sm:w-[40%] bg-white my-8 sm:my-5 mx-3 border-2">
              <ShowWidget
                condition={true}
                fallback={
                  <div className="w-full h-40 sm:w-full sm:h-40 bg-gray-200 animate-pulse" />
                }
              >
                <div className="border-b-2 w-full">
                  <img
                    src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt="House on hood"
                    className="w-full h-40 object-cover"
                    onError={onImageError}
                  />
                </div>
              </ShowWidget>

              <div className="border-b-2 w-full">
                <div className="p-4">
                  <ShowWidget
                    condition={true}
                    fallback={
                      <div className="h-5 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                    }
                  >
                    <p className="text-center text-xl text-black">
                      Title
                    </p>
                  </ShowWidget>

                  <ShowWidget
                    condition={true}
                    fallback={
                      <div className="h-5 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                    }
                  >
                    <div className="flex justify-center items-center mt-3 mb-2">
                      <LocationVector className="text-blue-500 h-5 w-5 sm:h-5 sm:w-5" />
                      <p className=" text-black pl-1">Location</p>
                    </div>
                  </ShowWidget>

                  <ShowWidget
                    condition={true}
                    fallback={
                      <div className="h-5 mt-3 mb-5 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                    }
                  >
                    <div className="flex justify-center items-center mt-2 mb-2">
                      <p className="text-center">100 000 fc/mois</p>
                      <p className="ml-5 px-1 text-center text-gray-700 bg-brand-semi-bold">
                        Rent
                      </p>
                    </div>
                  </ShowWidget>

                  <div className="flex justify-center items-center mt-3 mb-1">
                    <button
                      type="button"
                      className="bg-brand-bold rounded-lg p-2 px-5 "
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ml-5 bg-brand-bold rounded-lg p-2 px-5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:w-[40%] bg-white my-8 sm:my-5  mx-3 border-2">
              <ShowWidget
                condition={true}
                fallback={
                  <div className="w-full h-40 sm:w-16 sm:h-16 bg-gray-200 animate-pulse" />
                }
              >
                <div className="border-b-2 w-full">
                  <img
                    src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt="House on hood"
                    className="w-full h-40 object-cover"
                    onError={onImageError}
                  />
                </div>
              </ShowWidget>

              <div className="border-b-2 w-full">
                <div className="p-4">
                  <ShowWidget
                    condition={true}
                    fallback={
                      <div className="h-5 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                    }
                  >
                    <p className="text-center text-xl text-black">
                      Title
                    </p>
                  </ShowWidget>

                  <ShowWidget
                    condition={true}
                    fallback={
                      <div className="h-5 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                    }
                  >
                    <div className="flex justify-center items-center mt-3 mb-2">
                      <LocationVector className="text-blue-500 h-5 w-5 sm:h-5 sm:w-5" />
                      <p className=" text-black pl-1">Location</p>
                    </div>
                  </ShowWidget>

                  <ShowWidget
                    condition={true}
                    fallback={
                      <div className="h-5 mt-3 mb-5 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                    }
                  >
                    <div className="flex justify-center items-center mt-2 mb-2">
                      <p className="text-center">100 000 fc/mois</p>
                      <p className="ml-5 px-1 text-center text-gray-700 bg-brand-semi-bold">
                        Rent
                      </p>
                    </div>
                  </ShowWidget>

                  <div className="flex justify-center items-center mt-3 mb-1">
                    <button
                      type="button"
                      className="bg-brand-bold rounded-lg p-2 px-5 "
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ml-5 bg-brand-bold rounded-lg p-2 px-5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:w-[40%] bg-white my-8 sm:my-5  mx-3 border-2">
              <ShowWidget
                condition={true}
                fallback={
                  <div className="w-full h-40 sm:w-16 sm:h-16 bg-gray-200 animate-pulse" />
                }
              >
                <div className="border-b-2 w-full">
                  <img
                    src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt="House on hood"
                    className="w-full h-40 object-cover"
                    onError={onImageError}
                  />
                </div>
              </ShowWidget>

              <div className="border-b-2 w-full">
                <div className="p-4">
                  <ShowWidget
                    condition={true}
                    fallback={
                      <div className="h-5 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                    }
                  >
                    <p className="text-center text-xl text-black">
                      Title
                    </p>
                  </ShowWidget>

                  <ShowWidget
                    condition={true}
                    fallback={
                      <div className="h-5 my-3 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                    }
                  >
                    <div className="flex justify-center items-center mt-3 mb-2">
                      <LocationVector className="text-blue-500 h-5 w-5 sm:h-5 sm:w-5" />
                      <p className=" text-black pl-1">Location</p>
                    </div>
                  </ShowWidget>

                  <ShowWidget
                    condition={true}
                    fallback={
                      <div className="h-5 mt-3 mb-5 py-1 sm:mt-0 bg-gray-200 animate-pulse" />
                    }
                  >
                    <div className="flex justify-center items-center mt-2 mb-2">
                      <p className="text-center">100 000 fc/mois</p>
                      <p className="ml-5 px-1 text-center text-gray-700 bg-brand-semi-bold">
                        Rent
                      </p>
                    </div>
                  </ShowWidget>

                  <div className="flex justify-center items-center mt-3 mb-1">
                    <button
                      type="button"
                      className="bg-brand-bold rounded-lg p-2 px-5 "
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ml-5 bg-brand-bold rounded-lg p-2 px-5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <div className="w-full mb-3 inline-block relative">
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

      <div className="flex justify-center items-center">
        <button
          type="button"
          className="ml-5 bg-brand-bold rounded-lg p-2 px-5"
        >
          Logout
        </button>
      </div>

      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default Profile;
