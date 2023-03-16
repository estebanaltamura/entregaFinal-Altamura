import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartContextProvider } from './components/Contexts/CartContextProvider';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartContextProvider>    
        <App />
      </CartContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


