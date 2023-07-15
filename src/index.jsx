import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppRouting from './app-routing';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <AppRouting />
  </React.StrictMode>
);
