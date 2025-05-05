import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { msalInstance, initializePromise } from './lib/msalInstance';

async function bootStrap() {
  await initializePromise;

  await msalInstance.handleRedirectPromise();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
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
  );

  reportWebVitals();
}

bootStrap();