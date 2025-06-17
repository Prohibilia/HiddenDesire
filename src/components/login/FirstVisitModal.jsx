import React from 'react';
import { useTranslation } from 'react-i18next';
import './login.css';

export default function FirstVisitModal({ open, onRegister, onClose }) {
  const { t } = useTranslation();
  if (!open) return null;
  return (
    <div className="login-modal-overlay">
      <div className="login-modal-container">
        <div className="first-visit-content">
          <div className="first-visit-section" dangerouslySetInnerHTML={{__html: t('first_visit_intro')}} />
          <div className="first-visit-section" dangerouslySetInnerHTML={{__html: t('first_visit_experience')}} />
          <div className="first-visit-section" dangerouslySetInnerHTML={{__html: t('first_visit_login')}} />
          <div className="first-visit-section" dangerouslySetInnerHTML={{__html: t('first_visit_privacy')}} />
        </div>
        <div className="modal-buttons">
          <button className="login-btn" onClick={onRegister}>{t('registrami')}</button>
          <button className="login-btn" onClick={onClose}>{t('semmai_dopo')}</button>
        </div>
      </div>
    </div>
  );
} 