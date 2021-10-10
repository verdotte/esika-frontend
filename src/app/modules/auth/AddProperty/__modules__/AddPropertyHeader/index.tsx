import React from 'react';
import { Link } from 'react-router-dom';

const AddPropertyHeader = () => {
  return (
    <div className="w-full flex justify-between bg-gray-50 py-3 sm:py-5 md:py-8 px-3 sm:px-0 md:px-0 border-b shadow-sm md:border-none md:shadow-none fixed sm:sticky md:sticky z-20 md:z-10 top-0">
      <Link to="/" className="w-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Esika
        </h1>
        <p className="text-xs md:text-sm xl:text-md">
          Trouver une maison
        </p>
      </Link>
    </div>
  );
};

export default AddPropertyHeader;
