import React from 'react';
import ReactDOM from 'react-dom/client';
import  Map  from './components/Map';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Map />
  </React.StrictMode>
);

