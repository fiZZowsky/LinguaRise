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
import { UserProvider } from './context/UserContext';
import { AlertProvider } from './context/AlertContext';
import Alert from './components/Alert';

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
        <UserProvider>
          <BrowserRouter>
            <LoadingProvider>
              <LanguageProvider>
                <AlertProvider>
                  <Alert />
                  <App />
                </AlertProvider>
              </LanguageProvider>
            </LoadingProvider>
          </BrowserRouter>
        </UserProvider>
      </MsalProvider>
    );
  }
}

initializeApp();

reportWebVitals();
