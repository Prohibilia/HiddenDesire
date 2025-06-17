import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from './Header';

interface SplashPageProps {
  onEnterChat: () => void;
}

const SplashPage: React.FC<SplashPageProps> = ({ onEnterChat }) => {
  const { t } = useTranslation();
  const [isLeavingPage, setIsLeavingPage] = useState(false);

  const handleLockClick = () => {
    setIsLeavingPage(true);
    // Wait for the animation to complete before changing pages
    setTimeout(() => {
      onEnterChat();
    }, 1000); // Match this with the animation duration
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col damask-bg">
      <Header isTransparent={true} />
      
      <AnimatePresence>
        {!isLeavingPage && (
          <motion.div 
            className="flex-grow flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative max-w-lg mx-auto my-8">
              <img 
                src="/images/splash.png" 
                alt={t('splash.doorAlt')}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
              
              {/* Invisible button over the lock area */}
              <button 
                onClick={handleLockClick}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[10%] w-16 h-16 rounded-full bg-transparent focus:outline-none"
                aria-label={t('splash.clickLock')}
              />
            </div>
            
            <motion.p 
              className="text-gold font-cinzel text-xl md:text-2xl lg:text-3xl text-center max-w-2xl mx-auto my-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {t('splash.payoff')}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="w-full p-4 text-center text-white/60 font-cinzel text-sm">
        {t('splash.copyright')}
      </footer>
    </div>
  );
};

export default SplashPage;