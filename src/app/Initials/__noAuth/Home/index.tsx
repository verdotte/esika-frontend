import React from 'react';
import HomePage from 'app/modules/_noAuth/Home';
import SwipeProvider from 'app/modules/Contexts/SwipeContext';
import SearchProvider from 'app/modules/Contexts/SearchContext';

const Home = () => {
  return (
    <SearchProvider>
      <SwipeProvider>
        <HomePage />
      </SwipeProvider>
    </SearchProvider>
  );
};

export default Home;
