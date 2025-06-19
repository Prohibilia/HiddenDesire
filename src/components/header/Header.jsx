import React from 'react';
import HeaderTitle from './HeaderTitle';
import HeaderBottom from './HeaderBottom';
import './Header.css';

const Header = ({ isLoggedIn, username, onLoginClick, onLogout }) => {
  return (
    <header className="header">
      <HeaderTitle />
      <div className="header-controls-bar">
        <HeaderBottom 
          isLoggedIn={isLoggedIn}
          username={username}
          onLoginClick={onLoginClick}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
};

export default Header; 