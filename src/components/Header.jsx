import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const LockIcon = () => (
  <img src="/images/lucchetto.svg" alt="Lock" className="refined-logo" style={{height:'2.5rem', background:'#181313', borderRadius:'12px', border:'2px solid #d4af37', padding:'0.2rem'}} />
);

export default function Header({ isLoggedIn, username, onLoginClick, onLogout }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const currentLang = i18n.language?.toUpperCase() || 'IT';

  const handleLangSwitch = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
  };

  return (
    <>
      {/* Fascia nera raffinata */}
      <div className="header-root refined-header" style={{position:'relative', zIndex:100}}>
        {/* Hamburger */}
        <button className="burger-btn refined-burger" onClick={() => setShowMenu(!showMenu)} aria-label="Menu">
          <span className="burger-icon">≡</span>
        </button>

        {/* Titolo centrale raffinato */}
        <div className="refined-title" style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', display:'flex', alignItems:'center', gap:'2.2rem'}}>
          <span className="refined-title-part">Deseo</span>
          <LockIcon />
          <span className="refined-title-part">Oculto</span>
        </div>

        {/* Lingua, user/login, X a destra */}
        <div style={{position:'absolute', right:32, top:24, display:'flex', alignItems:'center', gap:'1.2rem'}}>
          {/* Lingua: due pulsanti IT/ES */}
          <div className="header-lang">
            <button
              className={currentLang === 'IT' ? 'active' : ''}
              onClick={() => handleLangSwitch('IT')}
              type="button"
            >
              IT
            </button>
            <button
              className={currentLang === 'ES' ? 'active' : ''}
              onClick={() => handleLangSwitch('ES')}
              type="button"
            >
              ES
            </button>
          </div>
          {/* Se non loggato mostra Accedi, se loggato mostra user */}
          {!isLoggedIn ? (
            <button
              className="header-btn"
              style={{minWidth:'90px', fontSize:'1.1em', borderRadius:'8px', padding:'0.3em 1.2em'}}
              onClick={onLoginClick}
            >
              {t('accedi', 'Accedi')}
            </button>
          ) : (
            <button
              className="header-btn"
              style={{borderRadius:'50%', width:'2.2em', height:'2.2em', background:'#ffd77a', color:'#2a0e0e', fontWeight:'bold', fontSize:'1.1em', boxShadow:'0 2px 8px #0002', padding:0, margin:0, display:'inline-flex', alignItems:'center', justifyContent:'center'}}
              onClick={() => setShowUserMenu(!showUserMenu)}
              title={username}
            >
              {username ? username[0].toUpperCase() : '?'}
            </button>
          )}
          {/* X per chiudere menu/modal (puoi collegarla a una funzione se serve) */}
          <button
            className="header-btn"
            style={{fontSize:'1.5em', background:'none', border:'none', color:'#ffd77a', marginLeft:'0.5em'}}
            aria-label="Chiudi"
          >
            ×
          </button>
        </div>

        {/* User menu (hover) */}
        {isLoggedIn && showUserMenu && (
          <div
            style={{
              position:'absolute',
              top:'60px',
              right:'2.5em',
              background:'#2a0e0e',
              color:'#ffd77a',
              borderRadius:'10px',
              boxShadow:'0 2px 12px #000a',
              minWidth:'120px',
              zIndex:2000,
              fontFamily:"'Playfair Display', serif",
              fontSize:'1em',
            }}
          >
            <button
              style={{background:'none', border:'none', color:'#ffd77a', width:'100%', padding:'0.7em 1.2em', textAlign:'left', cursor:'pointer', borderRadius:'10px'}}
              onClick={() => {
                setShowUserMenu(false);
                onLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Fascia bottoni raffinata sotto header */}
      <div style={{width:'100vw', background:'#5a2323', display:'flex', justifyContent:'center', alignItems:'center', padding:'2.2rem 0 1.2rem 0', gap:'2.5rem'}}>
        <button className="elegant-button" style={{minWidth:'200px', fontSize:'1.2em'}} onClick={() => navigate('/chat')}>{t('conosciamoci', 'Conozcámonos')}</button>
        <button className="elegant-button" style={{minWidth:'200px', fontSize:'1.2em'}} onClick={() => navigate('/dimensioni')}>{t('le_7_dimensioni', 'Las 7 dimensiones')}</button>
      </div>
    </>
  );
} 