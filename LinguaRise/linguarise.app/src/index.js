import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from './lib/msalConfig';

msalInstance.initialize().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
        <BrowserRouter>
          <MsalProvider instance={msalInstance}>
            <LoadingProvider>
              <App />
            </LoadingProvider>
          </MsalProvider>
        </BrowserRouter>
    </React.StrictMode>
  );
});

reportWebVitals();
