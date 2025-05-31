import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-midnight-900">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <h2 className="text-gold font-cinzel text-3xl">{t('chat.title')}</h2>
      </div>
    </div>
  );
};

export default ChatPage;