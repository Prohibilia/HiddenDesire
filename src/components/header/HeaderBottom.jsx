import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './HeaderBottom.css';

export default function HeaderBottom({ isLoggedIn, username, onLoginClick, onLogout }) {
  const { t, i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const currentLang = i18n.language?.toUpperCase() || 'IT';

  const handleLangSwitch = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
  };

  return (
    <div className="header-controls-grid">
      <div className="header-controls-left">
        <button 
          className="burger-btn"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Menu"
        >
          ≡
        </button>
      </div>
      <div className="header-controls-center">
        {!isLoggedIn ? (
          <button
            className="login-btn-minimal"
            onClick={onLoginClick}
          >
            {t('accedi', 'Acceder')}
          </button>
        ) : (
          <button
            className="user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            title={username}
          >
            {username ? username[0].toUpperCase() : '?'}
          </button>
        )}
      </div>
      <div className="header-controls-right">
        <div className="lang-switcher-minimal">
          <button
            className={`lang-btn-minimal ${currentLang === 'IT' ? 'active' : ''}`}
            onClick={() => handleLangSwitch('IT')}
            type="button"
          >
            IT
          </button>
          <button
            className={`lang-btn-minimal ${currentLang === 'ES' ? 'active' : ''}`}
            onClick={() => handleLangSwitch('ES')}
            type="button"
          >
            ES
          </button>
        </div>
      </div>
      {isLoggedIn && showUserMenu && (
        <div className="user-menu">
          <button
            className="logout-btn"
            onClick={() => {
              setShowUserMenu(false);
              onLogout();
            }}
          >
            {t('logout', 'Logout')}
          </button>
        </div>
      )}
    </div>
  );
} 