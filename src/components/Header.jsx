import React from 'react';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = ({ onOpenChat, onOpenDesireCard }) => {
  const { t, i18n } = useTranslation();
  // Gestione localizzazione per le due parole
  const isIT = i18n.language === 'it';
  const isES = i18n.language === 'es';
  let firstWord = 'Desiderio', secondWord = 'Occulto';
  if (isES) {
    firstWord = 'Deseo';
    secondWord = 'Oculto';
  }
  return (
    <>
      <header className="header-root">
        <div className="header-content refined-header">
          <button className="burger-btn refined-burger" aria-label="Menu">
            <span className="burger-icon">&#9776;</span>
          </button>
          <div className="header-title refined-title">
            <span className="header-title-left refined-title-part">{firstWord}</span>
            <img src="/images/logo.png" alt="logo" className="header-logo refined-logo no-border" />
            <span className="header-title-right refined-title-part">{secondWord}</span>
          </div>
          <div className="header-right">
            <div className="header-lang">
              <button className={i18n.language === 'it' ? 'active' : ''} onClick={() => i18n.changeLanguage('it')}>IT</button>
              <button className={i18n.language === 'es' ? 'active' : ''} onClick={() => i18n.changeLanguage('es')}>ES</button>
            </div>
          </div>
        </div>
      </header>
      <div className="header-buttons-below">
        <button className="elegant-button" onClick={onOpenChat}>{t('confidati_con_me')}</button>
        <button className="elegant-button" onClick={onOpenDesireCard}>{t('sette_dimensioni')}</button>
      </div>
    </>
  );
};

export default Header; 