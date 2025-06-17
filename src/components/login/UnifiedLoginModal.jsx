import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './login.css';

export default function UnifiedLoginModal({ open, onClose, onLogin, onRegister }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('login');

  if (!open) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-container">
        <div className="login-tabs">
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
            type="button"
          >
            {t('fammi_entrare')}
          </button>
          <button
            className={activeTab === 'register' ? 'active' : ''}
            onClick={() => setActiveTab('register')}
            type="button"
          >
            {t('registrami')}
          </button>
        </div>
        <button className="login-modal-close" onClick={onClose} aria-label="Chiudi">×</button>
        <div className="login-modal-content">
          {activeTab === 'login' ? (
            <LoginForm onLogin={onLogin} open={open} />
          ) : (
            <RegisterForm onRegister={onRegister} />
          )}
        </div>
      </div>
    </div>
  );
} 