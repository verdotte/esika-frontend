import React from 'react';
import ReactDOM from 'react-dom';
import AppProviders from 'appProviders';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
);
reportWebVitals();
