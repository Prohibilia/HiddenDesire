import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Disclaimer from './components/disclaimer/Disclaimer';
import Header from './components/header/Header';
import SplashPage from './components/splash/SplashPage';
import ChatPage from './components/chat/ChatPage';
import PhotoAlbum from './components/PhotoAlbum';
import Questionnaire from './components/Questionnaire';
import DesireCardPage from './components/preferences/DesireCardPage';
import { DesireProvider } from './components/preferences/DesireContext';
import FirstVisitModal from './components/login/FirstVisitModal';
import UnifiedLoginModal from './components/login/UnifiedLoginModal';
import DisclaimerModal from './components/disclaimer/DisclaimerModal';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [showFirstVisit, setShowFirstVisit] = useState(() => !localStorage.getItem('hasVisitedOnce'));
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [userId, setUserId] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [pendingChat, setPendingChat] = useState(false);

  useEffect(() => {
    console.log('[DEBUG] useEffect showDisclaimer:', showDisclaimer, '| pendingChat:', pendingChat, '| disclaimerAccepted:', sessionStorage.getItem('disclaimerAccepted'));
  }, [showDisclaimer, pendingChat]);

  useEffect(() => {
    if (showWelcome) {
      console.log('[DEBUG] Lingua attiva i18n:', i18n.language, '| t(welcome_back):', t('welcome_back'));
    }
  }, [showWelcome, i18n.language]);

  const handleFirstVisitRegister = () => {
    setShowFirstVisit(false);
    setShowLogin(true);
    localStorage.setItem('hasVisitedOnce', 'true');
  };
  const handleFirstVisitClose = () => {
    setShowFirstVisit(false);
    localStorage.setItem('hasVisitedOnce', 'true');
  };

  // Quando login va a buon fine
  const handleLoginSuccess = (data) => {
    console.log('[DEBUG] handleLoginSuccess data:', data);
    setShowLogin(false);
    setIsLoggedIn(true);
    if (data && data.username) setUsername(data.username);
    if (data && data.id) setUserId(data.id);
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 2500);
  };

  // Quando registrazione va a buon fine
  const handleRegisterSuccess = (data) => {
    console.log('[DEBUG] handleRegisterSuccess data:', data);
    setShowLogin(false);
    setIsLoggedIn(true);
    if (data && data.username) setUsername(data.username);
    if (data && data.id) setUserId(data.id);
    // NON mostrare il toast di benvenuto
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserId('');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  const handleDisclaimerDecline = () => {
    // Qui puoi aggiungere la logica per gestire il rifiuto
    // Per esempio, reindirizzare a una pagina di uscita
    window.location.href = 'https://www.google.com';
  };

  return (
    <DesireProvider userId={userId}>
      <FirstVisitModal
        open={showFirstVisit}
        onRegister={handleFirstVisitRegister}
        onClose={handleFirstVisitClose}
      />
      <UnifiedLoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLoginSuccess}
        onRegister={handleRegisterSuccess}
      />
      <div className="app-root">
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          onLoginClick={() => setShowLogin(true)}
          onLogout={handleLogout}
        />
        {showDisclaimer && (
          <DisclaimerModal
            isOpen={showDisclaimer}
            onAccept={() => {
              console.log('[DEBUG] Disclaimer ACCEPTED! pendingChat:', pendingChat);
              setShowDisclaimer(false);
              sessionStorage.setItem('disclaimerAccepted', 'true');
              if (pendingChat) {
                setPendingChat(false);
                console.log('[DEBUG] Redirecting to /chat after disclaimer accept');
                window.location.href = '/chat';
              }
            }}
            onDecline={handleDisclaimerDecline}
          />
        )}
        {showWelcome && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            pointerEvents: 'none',
          }}>
            <div style={{
              background: 'rgba(30, 10, 10, 0.92)',
              color: '#ffd77a',
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontWeight: 600,
              borderRadius: '22px',
              boxShadow: '0 4px 32px #000a',
              padding: '2.2rem 3.5rem',
              textAlign: 'center',
              textShadow: '0 0 18px #ffd77a99, 0 2px 18px #000',
              letterSpacing: '0.04em',
              maxWidth: '90vw',
            }}>
              {t('welcome_back')}
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<SplashPage onUnlock={() => {
            console.log('[DEBUG] onUnlock called, disclaimerAccepted:', sessionStorage.getItem('disclaimerAccepted'));
            if (!sessionStorage.getItem('disclaimerAccepted')) {
              setShowDisclaimer(true);
              setPendingChat(true);
              console.log('[DEBUG] Disclaimer needed, setShowDisclaimer(true), setPendingChat(true)');
            } else {
              console.log('[DEBUG] Disclaimer already accepted, redirecting to /chat');
              window.location.href = '/chat';
            }
          }} />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/dimensioni" element={<DesireCardPage />} />
          <Route path="/album" element={<PhotoAlbum />} />
          <Route path="/questionario" element={<Questionnaire />} />
        </Routes>
      </div>
    </DesireProvider>
  );
}

export default App;