import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SplashPage.css';

const TOOLTIP_TEXT = {
  it: "Parlandoci, scoprirò gli angoli più reconditi del tuo erotismo. Ti svelerò il tuo profilo e faremo insieme un viaggio. Creerò per te atmosfere erotiche ed esperienze immaginarie... e – se lo vorrai – ti aiuterò a trasformarle in realtà!",
  es: "Hablando conmigo, descubriré los rincones más recónditos de tu erotismo. Te revelaré tu perfil y haremos juntos un viaje. Crearé para ti atmósferas eróticas y experiencias imaginarias... y —si lo deseas— te ayudaré a transformarlas en realidad."
};

export default function SplashPage({ onUnlock }) {
  const { t, i18n } = useTranslation();
  const [fade, setFade] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleUnlock = () => {
    setFade(true);
    setTimeout(() => {
      onUnlock();
    }, 900);
  };

  const tooltipText = TOOLTIP_TEXT[i18n.language] || TOOLTIP_TEXT.it;

  return (
    <div className="splash-outer">
    <div className={`splash-root${fade ? ' fade-out' : ''}`}>
      <div className="splash-center">
          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
            <img
              src="/images/masculineMask.png"
              alt="maschera maschile"
              style={{ width: 240, height: 240, cursor: 'pointer', border: 'none', borderRadius: '18px', background: 'transparent', boxShadow: 'none' }}
              onClick={() => setShowTooltip(v => !v)}
            />
            {showTooltip && (
              <div
                onClick={() => setShowTooltip(false)}
                style={{
                  position: 'absolute',
                  top: 250,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(24,19,19,0.98)',
                  border: '3px solid #d4af37',
                  borderRadius: '18px',
                  boxShadow: '0 4px 24px #000a',
                  padding: '0.7rem 2.8rem',
                  minWidth: 480,
                  maxWidth: 700,
                  zIndex: 100,
                  fontFamily: 'Great Vibes, cursive',
                  color: '#ffe08a',
                  textAlign: 'center',
                  fontSize: '1.55rem',
                  letterSpacing: '0.01em',
                  textShadow: '0 0 8px #e6c97a55, 0 2px 8px #000',
                  borderImage: 'repeating-linear-gradient(135deg, #d4af37, #ffe08a 20%, #d4af37 40%) 1',
                  cursor: 'pointer',
                  lineHeight: 1.25,
                }}
              >
                {tooltipText}
              </div>
            )}
          </div>
          <div className="splash-slogan">
            En Deseo Oculto vivirás una experiencia única. Podrás explorar tus fantasías más íntimas, conversando con un hombre imaginario que no te juzga, te escucha… y se convierte exactamente en lo que deseas. Confidente, amante tierno o amo severo: tú decides!
          </div>
          <div className="splash-img-wrap" onClick={handleUnlock} style={{ cursor: 'pointer' }}>
          <img src="/images/splash.png" alt="porta" className="splash-img" />
        </div>
        <div className="splash-payoff">{t('payoff')}</div>
      </div>
      <div className="splash-disclaimer">{t('disclaimer')}</div>
      </div>
    </div>
  );
} 