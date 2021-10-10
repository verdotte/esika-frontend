import React from 'react';
import AddPropertyHeader from '../__modules__/AddPropertyHeader';
import PropertyAddress from '../__modules__/PropertyAddress';

const AddAddressePropertyContainer = () => {
  return (
    <div className="bg-gray-50">
      <div className="bg-gray-50 container pb-8 mx-auto px-0 sm:px-12 md:px-20 lg:px-44 no-scrollbars">
        <AddPropertyHeader />
        <PropertyAddress />
      </div>
    </div>
  );
};

export default AddAddressePropertyContainer;
