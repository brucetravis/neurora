import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import Header from './components/header/Header';
import ActiveProvider from './contexts/active/ActiveContext';
import Footer from './components/footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActiveProvider>
      <BrowserRouter>
      <Header />
        <App />
      <Footer />
      </BrowserRouter>
    </ActiveProvider>
  </React.StrictMode>
);
