import React from 'react';
import { useTranslation } from 'react-i18next';
import './Header.css';

const LANGS = [
  { code: 'it', label: 'IT' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
];

export default function Header({ onAlbumClick }) {
  const { t, i18n } = useTranslation();
  return (
    <header className="header-root">
      <div className="header-content">
        <div className="header-left">
          <button className="header-btn" onClick={onAlbumClick}>Album</button>
        </div>
        <div className="header-title">
          <span className="header-title-left">{t('title')}</span>
          <img src="/images/logo.png" alt="logo" className="header-logo" />
          <span className="header-title-right">{t('title2')}</span>
        </div>
        <div className="header-actions">
          <button className="header-btn">Profilo</button>
          <button className="header-btn">Logout</button>
          <div className="header-lang">
            {LANGS.map(l => (
              <button
                key={l.code}
                className={i18n.resolvedLanguage === l.code ? 'active' : ''}
                onClick={() => i18n.changeLanguage(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
} 