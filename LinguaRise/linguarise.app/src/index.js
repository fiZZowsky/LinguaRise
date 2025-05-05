import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './lib/authConfig';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <MsalProvider instance={msalInstance}>
    <BrowserRouter>
      <LoadingProvider>
        <LanguageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LanguageProvider>
      </LoadingProvider>
    </BrowserRouter>
  </MsalProvider>
  // </React.StrictMode>
);

reportWebVitals();
