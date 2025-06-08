import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SplashPage from './components/SplashPage';
import ChatPage from './components/ChatPage';
import PhotoAlbum from './components/PhotoAlbum';
import Questionnaire from './components/Questionnaire';
import DesireFlowerPage from './components/DesireFlowerPage';
import { DesireProvider } from './components/DesireContext';
import './App.css';

function AppRoutes() {
  const [showSplash, setShowSplash] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [desireValues, setDesireValues] = useState(Array(7).fill(50));
  const navigate = useNavigate();

  const handleUnlock = () => {
    setShowSplash(false);
    setTimeout(() => setShowChat(true), 100);
  };

  const handleAlbumClick = () => {
    setShowAlbum(true);
    setShowSplash(false);
    setShowChat(false);
    setShowQuestionnaire(false);
  };

  const handleQuestionnaireClick = () => {
    setShowQuestionnaire(true);
    setShowAlbum(false);
    setShowSplash(false);
    setShowChat(false);
  };

  const handleOpenDesireFlower = () => {
    navigate('/desire-flower');
  };

  return (
    <div className="app-root">
      <Header onAlbumClick={handleAlbumClick} onQuestionnaireClick={handleQuestionnaireClick} onOpenDesireFlower={handleOpenDesireFlower} />
      <Routes>
        <Route path="/desire-flower" element={<DesireFlowerPage />} />
        <Route path="/album" element={<PhotoAlbum />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/" element={
          <>
            {showSplash && <SplashPage onUnlock={handleUnlock} />}
            {showChat && <div className="fade-in"><ChatPage /></div>}
          </>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <DesireProvider>
      <Router>
        <AppRoutes />
      </Router>
    </DesireProvider>
  );
}

export default App; 