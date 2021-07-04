import React from 'react';
import { Router } from 'react-router-dom';
import browserHistory from './app/modules/utils/helpers/browserHistory';
import Routes from './app/Routes';
import appRoutes from './app/Routes/__routes__';
import './app/static/styles/style.css';

const App = () => {
  return (
    <Router history={browserHistory}>
      <Routes routes={appRoutes} />
    </Router>
  );
};

export default App;
