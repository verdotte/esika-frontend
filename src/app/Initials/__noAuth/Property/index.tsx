import React from 'react';
import SwipeProvider from 'app/modules/Contexts/SwipeContext';
import PropertyContainer from 'app/modules/_noAuth/Property';

const PropertyMobile = () => {
  return (
    <SwipeProvider>
      <PropertyContainer />
    </SwipeProvider>
  );
};

export default PropertyMobile;
