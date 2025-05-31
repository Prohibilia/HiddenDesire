import React, { useState } from 'react';
import Header from './components/Header';
import SplashPage from './components/SplashPage';
import ChatPage from './components/ChatPage';
import PhotoAlbum from './components/PhotoAlbum';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);

  const handleUnlock = () => {
    setShowSplash(false);
    setTimeout(() => setShowChat(true), 100);
  };

  const handleAlbumClick = () => {
    setShowAlbum(true);
    setShowSplash(false);
    setShowChat(false);
  };

  return (
    <div className="app-root">
      <Header onAlbumClick={handleAlbumClick} />
      {showAlbum && <PhotoAlbum />}
      {!showAlbum && showSplash && <SplashPage onUnlock={handleUnlock} />}
      {!showAlbum && showChat && <div className="fade-in"><ChatPage /></div>}
    </div>
  );
}

export default App; 