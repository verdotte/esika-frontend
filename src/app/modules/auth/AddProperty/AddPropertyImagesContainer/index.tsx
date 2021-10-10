import React from 'react';
import AddPropertyHeader from '../__modules__/AddPropertyHeader';
import AddPropertyImages from '../__modules__/PropertyImages';

const AddImagesPropertyContainer = () => {
  return (
    <div className="bg-gray-50">
      <div className="bg-gray-50 container pb-8 mx-auto px-0 sm:px-12 md:px-20 lg:px-44 no-scrollbars">
        <AddPropertyHeader />
        <AddPropertyImages />
      </div>
    </div>
  );
};

export default AddImagesPropertyContainer;
