import React from 'react';
import { useApp } from '../context/AppContext';

const Toasts = () => {
  const { toasts } = useApp();

  const getIcon = (type) => {
    switch(type) {
      case 'success': return 'fa-check-circle';
      case 'error': return 'fa-exclamation-circle';
      default: return 'fa-info-circle';
    }
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <i className={`fas ${getIcon(toast.type)}`}></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toasts;
