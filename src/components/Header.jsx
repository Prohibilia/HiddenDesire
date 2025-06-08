import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Header.css';

const LANGS = [
  { code: 'it', label: 'IT' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
];

export default function Header({ onAlbumClick, onQuestionnaireClick, onOpenDesireFlower, onOpenChat }) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-root">
      <div className="header-content refined-header">
        <button className="burger-btn refined-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className="burger-icon">&#9776;</span>
        </button>
        <button className="parla-btn refined-parla-btn" onClick={onOpenChat}>Parla con me!</button>
        <div className="header-title refined-title">
          <span className="header-title-left refined-title-part">Deseo</span>
          <img src="/images/logo.png" alt="logo" className="header-logo refined-logo no-border" />
          <span className="header-title-right refined-title-part">Oculto</span>
        </div>
        <div className="header-right">
          <button className="desire-flower-header-btn" onClick={onOpenDesireFlower}>
            <span role="img" aria-label="fiore">🌸</span> Le 7 dimensioni del tuo desiderio
          </button>
          <div className="header-lang">
            <button
              className={i18n.language === 'it' ? 'active' : ''}
              onClick={() => i18n.changeLanguage('it')}
            >IT</button>
            <button
              className={i18n.language === 'es' ? 'active' : ''}
              onClick={() => i18n.changeLanguage('es')}
            >ES</button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="burger-menu" onClick={() => setMenuOpen(false)}>
          <div className="burger-menu-content" onClick={e => e.stopPropagation()}>
            <button className="header-btn" onClick={() => { setMenuOpen(false); onQuestionnaireClick(); }}>Cuestionario</button>
            <button className="header-btn" onClick={() => { setMenuOpen(false); onAlbumClick(); }}>Album</button>
            <button className="header-btn">Profilo</button>
            <button className="header-btn">Logout</button>
          </div>
        </div>
      )}
    </header>
  );
} 