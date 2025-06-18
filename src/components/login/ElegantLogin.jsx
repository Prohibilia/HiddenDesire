import React, { useState } from 'react';
import './ElegantLogin.css';

const ElegantLogin = () => {
  const [mode, setMode] = useState('login');

  return (
    <div className="elegant-login-card">
      <div className="elegant-tab-bar">
        <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Entra</button>
        <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Registrate</button>
      </div>
      <form className="elegant-login-form">
        <input type="text" placeholder="Nombre" className="elegant-input" />
        <input type="password" placeholder="Contraseña" className="elegant-input" />
        <a href="#" className="elegant-forgot">¿Has olvidado tu contraseña?</a>
        <div className="elegant-form-buttons">
          <button type="submit" className="elegant-gold-btn">Acceder</button>
          <button type="button" className="elegant-ghost-btn">Salir</button>
        </div>
      </form>
      <div className="elegant-login-svg-wrap">
        <svg viewBox="0 0 340 30" width="100%" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2 Q170 40 340 2" stroke="#d4af37" strokeWidth="2.2" fill="none"/>
          <path d="M320 18 Q330 25 340 18" stroke="#d4af37" strokeWidth="2" fill="none"/>
          <path d="M0 18 Q10 25 20 18" stroke="#d4af37" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </div>
  );
};

export default ElegantLogin; 