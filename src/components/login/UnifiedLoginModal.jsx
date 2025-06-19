import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './login.css';

export default function UnifiedLoginModal({ open, onClose, onLogin, onRegister }) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('login');

  if (!open) return null;

  // Funzione per il testo del bottone principale
  const mainBtnText = activeTab === 'login' ? t('accedi', 'Acceder') : t('registrati', 'Registrate');

  // Funzione per gestire submit dal pulsante esterno
  const handleMainAction = () => {
    const form = document.querySelector(activeTab === 'login' ? '.login-form' : '.register-form');
    if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

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
        <div className="login-modal-content">
          {activeTab === 'login' ? (
            <LoginForm onLogin={onLogin} open={open} hideSubmitBtn />
          ) : (
            <RegisterForm onRegister={onRegister} hideSubmitBtn />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0.7rem', gap: '1.2rem' }}>
          <button className="login-btn" onClick={handleMainAction} style={{ minWidth: 90, fontSize: '0.98rem' }}>
            {mainBtnText}
          </button>
          <button className="login-btn" onClick={onClose} style={{ minWidth: 90, fontSize: '0.98rem' }}>
            {t('wantToExit', t('uscire', 'Salir'))}
          </button>
        </div>
      </div>
    </div>
  );
} 