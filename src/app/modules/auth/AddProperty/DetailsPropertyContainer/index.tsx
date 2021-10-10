import React from 'react';
import AddPropertyDetails from '../__modules__/PropertyDetails';
import AddPropertyHeader from '../__modules__/AddPropertyHeader';

const AddDetailsPropertyContainer = () => {
  return (
    <div className="bg-gray-50">
      <div className="bg-gray-50 container pb-8 mx-auto px-0 sm:px-12 md:px-20 lg:px-44 no-scrollbars">
        <AddPropertyHeader />
        <AddPropertyDetails />
      </div>
    </div>
  );
};

export default AddDetailsPropertyContainer;
