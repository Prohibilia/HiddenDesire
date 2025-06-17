import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';

type HeaderProps = {
  isTransparent?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isTransparent = false }) => {
  const { t, i18n } = useTranslation();
  const languages = [
    { code: 'it', label: 'IT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'pt', label: 'PT' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header 
      className={`w-full px-4 py-3 flex justify-between items-center ${
        isTransparent ? 'bg-transparent' : 'bg-midnight-900'
      }`}
    >
      <div className="flex items-center justify-center">
        <h1 className="text-gold font-cinzel font-bold text-xl md:text-3xl flex items-center">
          <span>{t('header.desiderio')}</span>
          <BookOpen className="mx-2 text-gold" size={28} />
          <span>{t('header.occulto')}</span>
        </h1>
      </div>
      <div className="flex space-x-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`px-2 py-1 rounded font-cinzel ${
              i18n.language === lang.code
                ? 'text-gold border border-gold'
                : 'text-white/70 hover:text-gold'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;