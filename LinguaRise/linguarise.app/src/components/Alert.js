import React from 'react';
import { useAlert }       from '../hooks/useAlert';
import { AlertType }      from '../data/alertTypes';
import '../assets/styles/alert.css';

const ALERT_ICONS = {
  [AlertType.INFO]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-4a1 1 0 100 2 1 1 0 000-2zm2 8a1 1 0 10-2 0v-4a1 1 0 102 0v4z"/>
    </svg>
  ),
  [AlertType.DANGER]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.6a1.75 1.75 0 01-1.492 2.601H3.232a1.75 1.75 0 01-1.491-2.601l6.516-11.6zM9 7a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd"/>
    </svg>
  ),
  [AlertType.ERROR]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.828-11.172a1 1 0 10-1.414-1.414L10 8.586 8.586 7.172a1 1 0 00-1.414 1.414L8.586 10l-1.414 1.414a1 1 0 101.414 1.414L10 11.414l1.414 1.414a1 1 0 001.414-1.414L11.414 10l1.414-1.414z" clipRule="evenodd"/>
    </svg>
  ),
};

const ALERT_TITLES = {
  [AlertType.INFO]:   'Informacja',
  [AlertType.DANGER]: 'Ostrzeżenie',
  [AlertType.ERROR]:  'Błąd',
};

const Alert = () => {
  const { alert, hideAlert } = useAlert();
  if (!alert.visible) return null;

  const { type, message } = alert;
  const icon  = ALERT_ICONS[type]  || ALERT_ICONS[AlertType.INFO];
  const title = ALERT_TITLES[type] || 'Alert';

  return (
    <div className="alert-overlay">
      <div className="alert-backdrop" />
      <div className="alert-wrapper">
        <div className="card">
          <div className="header">
            <span className="icon">{icon}</span>
            <p className="alert-type">{title}</p>
          </div>
          <p className="message">{message}</p>
          <div className="actions">
            <button className="read" onClick={hideAlert}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
