import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollProvider from './contexts/scroll/ScrollContext';
import ActiveProvider from './contexts/active/ActiveContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollProvider>
        <ActiveProvider>
          <App />
        </ActiveProvider>
      </ScrollProvider>
    </BrowserRouter>
  </React.StrictMode>
);

