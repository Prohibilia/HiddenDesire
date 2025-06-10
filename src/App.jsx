import React, { useState } from 'react';
import Header from './components/Header';
import SplashPage from './components/SplashPage';
import ChatPage from './components/ChatPage';
import PhotoAlbum from './components/PhotoAlbum';
import Questionnaire from './components/Questionnaire';
import DesireCardPage from './components/DesireCardPage';
import { DesireProvider } from './components/DesireContext';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showDesireCardPage, setShowDesireCardPage] = useState(false);
  const [previousPage, setPreviousPage] = useState(null);

  const handleUnlock = () => {
    setShowSplash(false);
    setTimeout(() => setShowChat(true), 100);
  };

  const handleAlbumClick = () => {
    setShowAlbum(true);
    setShowSplash(false);
    setShowChat(false);
    setShowQuestionnaire(false);
    setShowDesireCardPage(false);
  };

  const handleQuestionnaireClick = () => {
    setShowQuestionnaire(true);
    setShowAlbum(false);
    setShowSplash(false);
    setShowChat(false);
    setShowDesireCardPage(false);
  };

  const handleOpenDesireCard = () => {
    if (showChat) setPreviousPage('chat');
    else if (showAlbum) setPreviousPage('album');
    else if (showQuestionnaire) setPreviousPage('questionnaire');
    else if (showSplash) setPreviousPage('splash');
    setShowDesireCardPage(true);
    setShowAlbum(false);
    setShowSplash(false);
    setShowChat(false);
    setShowQuestionnaire(false);
  };

  const handleCloseDesireCard = () => {
    setShowDesireCardPage(false);
    if (previousPage === 'chat') setShowChat(true);
    else if (previousPage === 'album') setShowAlbum(true);
    else if (previousPage === 'questionnaire') setShowQuestionnaire(true);
    else if (previousPage === 'splash') setShowSplash(true);
    setPreviousPage(null);
  };

  const handleOpenChat = () => {
    setShowChat(true);
    setShowAlbum(false);
    setShowSplash(false);
    setShowQuestionnaire(false);
    setShowDesireCardPage(false);
  };

  return (
    <DesireProvider>
      <div className="app-root">
        <Header onAlbumClick={handleAlbumClick} onQuestionnaireClick={handleQuestionnaireClick} onOpenDesireCard={handleOpenDesireCard} onOpenChat={handleOpenChat} />
        {showDesireCardPage && <DesireCardPage onClose={handleCloseDesireCard} />}
        {showQuestionnaire && <Questionnaire />}
        {showAlbum && <PhotoAlbum />}
        {showSplash && <SplashPage onUnlock={handleUnlock} />}
        {showChat && <ChatPage />}
      </div>
    </DesireProvider>
  );
}

export default App; 