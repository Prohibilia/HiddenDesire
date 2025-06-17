import React, { useState, useEffect } from 'react';
import { useDesire } from './DesireContext';
import { useTranslation } from 'react-i18next';
import './DesireCardPage.css';
import UnifiedLoginModal from '../login/UnifiedLoginModal';
// Se serve la modale motivazionale:
// import FirstVisitModal from "../login/FirstVisitModal";

// Funzione per calcolare la dimensione della fiamma
function getFlameSize() {
  return 64; // 2x più grande
}

function safeT(t, key, fallback) {
  const val = t(key);
  return val === key ? (fallback || key) : val;
}

export default function DesireCardPage({ onClose }) {
  const { desireValues, setDesireValues, sintesi } = useDesire();
  const [localValues, setLocalValues] = useState(desireValues);
  const [selected, setSelected] = useState(0);
  const [showInvite, setShowInvite] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLocalValues(desireValues);
  }, [desireValues]);

  const keys = [
    'role', 'tone', 'style', 'erotic', 'mind', 'lead', 'fantasy'
  ];

  const dKey = keys[selected];
  const d = {
    key: dKey,
    caption: safeT(t, `${dKey}.caption`),
    explain: safeT(t, `${dKey}.explain`),
    payoff: safeT(t, `${dKey}.payoff`, ''),
    min: safeT(t, `${dKey}.min`),
    max: safeT(t, `${dKey}.max`),
    emojiMin: safeT(t, `${dKey}.emojiMin`, ''),
    emojiMax: safeT(t, `${dKey}.emojiMax`, ''),
    levels: [0,1,2,3,4].map(i => ({
      label: safeT(t, `${dKey}.${i}.label`),
      desc: safeT(t, `${dKey}.${i}.desc`)
    }))
  };
  const realLevels = d.levels.filter(l => l.label && l.label !== `${dKey}.${d.levels.indexOf(l)}.label`);
  const sliderMax = realLevels.length - 1;
  const sliderValue = Math.max(0, Math.min(sliderMax, Math.round((localValues[selected] ?? 0) / (100 / sliderMax))));

  const handleSliderChange = (value) => {
    const newValues = [...localValues];
    newValues[selected] = Math.round((value / sliderMax) * 100);
    setLocalValues(newValues);
    setDesireValues(newValues);

    // Invito alla registrazione secondo la nuova logica
    if (sessionStorage.getItem('registrationPromptShown') !== 'true') {
      setShowInvite(true);
      sessionStorage.setItem('registrationPromptShown', 'true');
      if (!localStorage.getItem('hasVisitedOnce')) {
        localStorage.setItem('hasVisitedOnce', 'true');
      }
      return;
    }
  };

  // Titoli card precedente e successiva
  const prevTitle = selected > 0 ? safeT(t, `${keys[selected-1]}.caption`) : '';
  const nextTitle = selected < keys.length-1 ? safeT(t, `${keys[selected+1]}.caption`) : '';

  const flameSize = getFlameSize();

  if (showInvite) {
    return <ModalExitPrompt
      open={showInvite}
      registrationInvite={true}
      onReturn={() => { setShowInvite(false); setShowLogin(true); }}
      onClose={() => setShowInvite(false)}
    />;
  }
  if (showLogin) {
    return <UnifiedLoginModal
      open={showLogin}
      onClose={() => setShowLogin(false)}
      onLogin={() => setShowLogin(false)}
      onRegister={() => setShowLogin(false)}
    />;
  }

  return (
    <div className="desire-card-page-outer desire-card-bg-elegant">
      <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'1.2rem', marginBottom:'0.7rem'}}>
        <button className="login-btn" style={{minWidth:'180px', fontSize:'1.1em'}} onClick={() => window.location.href='/chat'}>
          Torna alla chat
        </button>
      </div>
      {/* Sintesi delle scelte sopra la card */}
      <div className="desire-sintesi-figure">{sintesi}</div>
      <div className="desire-card-page-content">
        <div className="desire-card desire-card-figure">
          {/* Titolo grande dentro la card */}
          <div className="desire-card-title-figure">{d.caption}</div>
          {/* Domanda sotto il titolo */}
          <div className="desire-card-explain-figure">{d.explain}</div>
          {/* Payoff riassuntivo opzionale */}
          {d.payoff && <div className="desire-card-payoff-figure">{d.payoff}</div>}
          {/* Estremi slider */}
          <div className="desire-slider-labels-figure">
            <span>{d.emojiMin} {d.min}</span>
            <span>{d.max} {d.emojiMax}</span>
          </div>
          <input
            type="range"
            min={0}
            max={sliderMax}
            value={sliderValue}
            onChange={e => handleSliderChange(Number(e.target.value))}
            className="desire-slider-figure"
          />
          {/* Etichetta dinamica sotto lo slider, font corsivo, grande, wrappata */}
          <div className="desire-circle-selected-label-figure">
            <span className="desire-label-bold-figure">{d.levels[sliderValue].label}</span>{' '}
            <span className="desire-label-desc-figure">{d.levels[sliderValue].desc}</span>
          </div>
          {/* Fiamma ampia che cresce con il valore dello slider */}
          <div className="desire-nav-flame-figure-wide">
            <img
              src="/images/flames.png"
              alt="fiamma"
              style={{
                width: `${60 + sliderValue * 40}px`,
                height: 'auto',
                transition: 'width 0.3s',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
          {/* Navigazione card con etichette sulla stessa linea delle frecce */}
          <div className="desire-card-navigation-figure-flat">
            <span className="desire-nav-title-figure-flat">{prevTitle}</span>
            <button
              className="desire-nav-button-figure-flat"
              disabled={selected === 0}
              onClick={() => setSelected(selected - 1)}
              aria-label="Precedente"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 8L12 16L20 24" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="desire-nav-sep-figure-flat">|</span>
            <button
              className="desire-nav-button-figure-flat"
              disabled={selected === keys.length - 1}
              onClick={() => setSelected(selected + 1)}
              aria-label="Successivo"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8L20 16L12 24" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="desire-nav-title-figure-flat">{nextTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 