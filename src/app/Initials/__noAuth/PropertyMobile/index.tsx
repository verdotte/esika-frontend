import React from 'react';
import PropertyMobileContainer from 'app/modules/_noAuth/PropertyMobile';
import SwipeProvider from 'app/modules/Contexts/SwipeContext';

const PropertyMobile = () => {
  return (
    <SwipeProvider>
      <PropertyMobileContainer />
    </SwipeProvider>
  );
};

export default PropertyMobile;
