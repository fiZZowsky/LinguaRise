import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { LanguageProvider } from './context/LanguageContext';
import { msalInstance } from "./lib/authConfig";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MsalProvider instance={msalInstance}>
    <BrowserRouter>
      <LoadingProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </LoadingProvider>
    </BrowserRouter>
  </MsalProvider>
);

reportWebVitals();
