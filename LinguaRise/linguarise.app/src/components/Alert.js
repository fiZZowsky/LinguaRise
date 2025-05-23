import React from 'react';
import { useAlert } from '../hooks/useAlert';
import '../assets/styles/alert.css';

const Alert = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert.visible) return null;

  const bgClass = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  }[alert.type];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={hideAlert} />
      <div className={`${bgClass} border px-4 py-3 rounded-lg shadow-lg z-60 max-w-sm text-center`}>        
        <span className="block font-medium mb-1">{alert.type.toUpperCase()}</span>
        <p className="text-sm">{alert.message}</p>
      </div>
    </div>
  );
};

export default Alert;