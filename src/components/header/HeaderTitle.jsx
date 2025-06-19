import React from 'react';
import logo from '/images/logo.png';
import './HeaderTitle.css';

const HeaderTitle = () => (
  <div className="header-title-fixed">
    <span className="title-text-fixed">Deseo</span>
    <img src={logo} alt="Logo" className="header-logo-fixed" />
    <span className="title-text-fixed">Oculto</span>
  </div>
);

export default HeaderTitle; 