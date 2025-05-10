import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { LanguageProvider } from './context/LanguageContext';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './lib/authConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function initializeApp() {
  try {
    if (typeof msalInstance.initialize === 'function') {
      await msalInstance.initialize();
    }
    await msalInstance.handleRedirectPromise();
  } catch (err) {
    console.error('MSAL initialization error:', err);
  } finally {
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
  }
}

initializeApp();

reportWebVitals();
