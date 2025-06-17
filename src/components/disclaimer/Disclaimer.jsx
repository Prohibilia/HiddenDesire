import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import './Disclaimer.css';

const LANGS = [
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' }
];

const Disclaimer = ({ onAccept, onDecline }) => {
  const { t } = useTranslation();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [showConfirmSection, setShowConfirmSection] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollContainerRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const buttonsRowRef = useRef(null);
  const [lang, setLang] = useState(i18n.language || (navigator.language || 'es').slice(0, 2));

  // Imposta la lingua di default su quella del browser
  useEffect(() => {
    const browserLang = (navigator.language || 'es').slice(0, 2);
    if (['it', 'es'].includes(browserLang)) {
      i18n.changeLanguage(browserLang);
      setLang(browserLang);
    } else {
      i18n.changeLanguage('es');
      setLang('es');
    }
  }, []);

  // Cambia lingua
  const handleLangChange = (code) => {
    console.log('Cambio lingua richiesto:', code);
    i18n.changeLanguage(code).then(() => {
      setLang(code);
      console.log('Lingua effettiva dopo changeLanguage:', i18n.language);
    });
  };

  // Forza la lingua su 'it' per debug e logga le risorse
  useEffect(() => {
    i18n.changeLanguage('it');
    console.log('Lingua attiva:', i18n.language);
    console.log('Bundle:', i18n.getResourceBundle(i18n.language, 'translation'));
    console.log('t(disclaimer.wantToProceed):', t('disclaimer.wantToProceed'));
  }, [t]);

  useEffect(() => {
    console.log('Lingua attiva (useEffect):', i18n.language);
  }, [lang]);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isAtBottom = 
        container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
      setHasScrolledToBottom(isAtBottom);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  // Scroll automatico quando compaiono le checkbox
  useEffect(() => {
    if (showConfirmSection && scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 200);
    }
  }, [showConfirmSection]);

  // Scroll automatico quando appare il tooltip
  useEffect(() => {
    if (showTooltip && scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [showTooltip]);

  const handleProceed = () => {
    if (hasScrolledToBottom) {
      setShowConfirmSection(true);
      setTimeout(() => setShowTooltip(false), 100);
    }
  };

  const handleConfirm = (e) => {
    if (isAdult && hasAccepted) {
      setShowTooltip(false);
      onAccept();
    } else {
      setShowTooltip(true);
      if (confirmButtonRef.current) {
        confirmButtonRef.current.focus();
      }
    }
  };

  // Nascondi tooltip se cambiano le checkbox
  useEffect(() => {
    if (showTooltip && isAdult && hasAccepted) {
      setShowTooltip(false);
    }
  }, [isAdult, hasAccepted, showTooltip]);

  return (
    <div className="disclaimer-container">
      <h1 className="disclaimer-title">{t('disclaimer.title').replace('📜 ', '')}</h1>
      <div 
        ref={scrollContainerRef} 
        className={`disclaimer-content${showConfirmSection ? ' expanded' : ''}`}
      >
        <p>{t('disclaimer.intro')}</p>
        <h2>{t('disclaimer.notProfessional')}</h2>
        <p>{t('disclaimer.aiVoice')}</p>
        <p>{t('disclaimer.learning')}</p>
        <h2>{t('disclaimer.safety')}</h2>
        <p>{t('disclaimer.contentWarning')}</p>
        <ul>
          <li>{t('disclaimer.fantasy')}</li>
          <li>{t('disclaimer.notReal')}</li>
          <li>{t('disclaimer.consensual')}</li>
          <li>{t('disclaimer.legal')}</li>
        </ul>
        <p>{t('disclaimer.notPromoting')}</p>
        <ul>
          <li>{t('disclaimer.noNonConsensual')}</li>
          <li>{t('disclaimer.noProstitution')}</li>
          <li>{t('disclaimer.noIllegal')}</li>
        </ul>
        <h2>{t('disclaimer.yourFreedom')}</h2>
        <p>{t('disclaimer.yourRights')}</p>
        <ul>
          <li>{t('disclaimer.stopChat')}</li>
          <li>{t('disclaimer.modifyTone')}</li>
          <li>{t('disclaimer.safetyCommands')}</li>
        </ul>
        <h2>{t('disclaimer.summary')}</h2>
        <p>{t('disclaimer.summaryText')}</p>
        <h2>{t('disclaimer.consciousChoice')}</h2>
        <p>{t('disclaimer.requirements')}</p>
        <ul>
          <li>{t('disclaimer.adultDeclaration')}</li>
          <li>{t('disclaimer.acceptance')}</li>
        </ul>
        <p>{t('disclaimer.exit')}</p>
        {showConfirmSection && (
          <div className="confirmation-section">
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={isAdult}
                  onChange={(e) => setIsAdult(e.target.checked)}
                />
                {t('disclaimer.declareAdult')}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={hasAccepted}
                  onChange={(e) => setHasAccepted(e.target.checked)}
                />
                {t('disclaimer.acceptDisclaimer')}
              </label>
            </div>
            {showTooltip && (
              <div className="disclaimer-tooltip disclaimer-tooltip-static">
                {t('disclaimer.mustBeAdultAndAccept')}
              </div>
            )}
            <div className="disclaimer-buttons row" ref={buttonsRowRef}>
              <button
                className="confirm-button"
                ref={confirmButtonRef}
                onClick={handleConfirm}
                type="button"
              >
                {t('disclaimer.confirm')}
              </button>
              <button
                className="decline-button"
                onClick={onDecline}
                type="button"
              >
                {t('disclaimer.wantToExit')}
              </button>
            </div>
          </div>
        )}
      </div>
      {!showConfirmSection && hasScrolledToBottom && (
        <div className="disclaimer-buttons row">
          <button
            className="proceed-button"
            onClick={handleProceed}
            type="button"
          >
            {t('disclaimer.wantToProceed')}
          </button>
          <button
            className="decline-button"
            onClick={onDecline}
            type="button"
          >
            {t('disclaimer.wantToExit')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Disclaimer; 