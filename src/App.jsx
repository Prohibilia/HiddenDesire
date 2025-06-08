import React, { useState } from 'react';
import Header from './components/Header';
import SplashPage from './components/SplashPage';
import ChatPage from './components/ChatPage';
import PhotoAlbum from './components/PhotoAlbum';
import Questionnaire from './components/Questionnaire';
import DesireFlowerPage from './components/DesireFlowerPage';
import { DesireProvider } from './components/DesireContext';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showDesireFlowerPage, setShowDesireFlowerPage] = useState(false);
  const [previousPage, setPreviousPage] = useState(null);
  const [desireValues, setDesireValues] = useState(Array(7).fill(50));

  const handleUnlock = () => {
    setShowSplash(false);
    setTimeout(() => setShowChat(true), 100);
  };

  const handleAlbumClick = () => {
    setShowAlbum(true);
    setShowSplash(false);
    setShowChat(false);
    setShowQuestionnaire(false);
    setShowDesireFlowerPage(false);
  };

  const handleQuestionnaireClick = () => {
    setShowQuestionnaire(true);
    setShowAlbum(false);
    setShowSplash(false);
    setShowChat(false);
    setShowDesireFlowerPage(false);
  };

  const handleOpenDesireFlower = () => {
    if (showChat) setPreviousPage('chat');
    else if (showAlbum) setPreviousPage('album');
    else if (showQuestionnaire) setPreviousPage('questionnaire');
    else if (showSplash) setPreviousPage('splash');
    setShowDesireFlowerPage(true);
    setShowAlbum(false);
    setShowSplash(false);
    setShowChat(false);
    setShowQuestionnaire(false);
  };

  const handleCloseDesireFlower = () => {
    setShowDesireFlowerPage(false);
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
    setShowDesireFlowerPage(false);
  };

  return (
    <DesireProvider>
      <div className="app-root">
        <Header onAlbumClick={handleAlbumClick} onQuestionnaireClick={handleQuestionnaireClick} onOpenDesireFlower={handleOpenDesireFlower} onOpenChat={handleOpenChat} />
        {showDesireFlowerPage && <DesireFlowerPage onClose={handleCloseDesireFlower} />}
        {showQuestionnaire && !showDesireFlowerPage && <Questionnaire />}
        {showAlbum && !showDesireFlowerPage && <PhotoAlbum />}
        {!showAlbum && !showQuestionnaire && !showDesireFlowerPage && showSplash && <SplashPage onUnlock={handleUnlock} />}
        {!showAlbum && !showQuestionnaire && !showDesireFlowerPage && showChat && <div className="fade-in"><ChatPage /></div>}
      </div>
    </DesireProvider>
  );
}

export default App; 