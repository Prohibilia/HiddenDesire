import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './components/splash/SplashPage';
import ChatPage from './components/chat/ChatPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleEnterChat = () => {
    setShowSplash(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      {showSplash ? (
        <SplashPage onEnterChat={handleEnterChat} />
      ) : (
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<Navigate to="/chat\" replace />} />
        </Routes>
      )}
    </div>
  );
}

export default App;