import React from 'react';
import { HeartSolidVector } from 'app/modules/__modules__/_vectors/heartSolideVector';
import { wishLists } from '../data';
import './style.css';
import { Link } from 'react-router-dom';

const WishListCard = () => {
  return (
    <div className="container mt-14 md:mt-8 mx-auto px-4 md:px-8 ">
      <div className="text-3xl ">Wishlists</div>
      {/* <div className="  grid grid-cols-1 md:grid-cols-2  mt-8 md:mt-12 ">
        <div className="bg-gray-200 p-2 h-40 rounded-lg relative">
          <HeartSolidVector />
        </div>
        <div className="p-8 ">data</div>
      </div> */}
      {wishLists.map((data, index) => {
        return (
          <div
            className="grid grid-cols-1 md:grid-cols-2  mt-8 md:mt-12 border-b pb-6 border-gray-200 items-center"
            key={index}
          >
            <Link
              to="/properties/HotelMotemaoXeOnYMOwxCx"
              className=" overflow-hidden imgLimiter bg-blue-100 p-2 h-60  rounded-lg relative "
            >
              <img
                src={data.image}
                alt="image"
                className=" rounded-lg bg-cover w-full h-full"
              />
              <HeartSolidVector className=" w-7 h-7 text-red-700 absolute top-2 left-2 " />
            </Link>
            <div className=" w-full px-0  md:px-4  ">
              <div>Situé à {data.location}</div>
              <div className="text-xl mt-2 font-bold ">
                {data.title}
              </div>
              <div className="hidden mt-2 md:block">{data.specs}</div>
              <div className=" w-28 mt-2 bg-yellow-400 ">
                {data.price}
              </div>
            </div>
          </div>
        );
      })}
      )
    </div>
  );
};

export default WishListCard;
