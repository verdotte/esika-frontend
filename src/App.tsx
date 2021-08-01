import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProviders from 'appProviders';
import Routes from './app/Routes';
import appRoutes from './app/Routes/__routes__';
import './app/static/styles/style.css';

const App = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes routes={appRoutes} />
      </AppProviders>
    </BrowserRouter>
  );
};

export default App;
