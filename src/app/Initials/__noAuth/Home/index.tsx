import React from 'react';
import HomePage from 'app/modules/_noAuth/Home';
import SwipeProvider from 'app/modules/Contexts/SwipeContext';

const Home = () => {
  return (
    <SwipeProvider>
      <HomePage />
    </SwipeProvider>
  );
};

export default Home;
