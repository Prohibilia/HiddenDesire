import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SplashPage.css';

export default function SplashPage({ onUnlock }) {
  const { t } = useTranslation();
  const [fade, setFade] = useState(false);

  const handleUnlock = () => {
    setFade(true);
    setTimeout(() => {
      onUnlock();
    }, 900);
  };

  return (
    <div className="splash-outer">
      <div className={`splash-root${fade ? ' fade-out' : ''}`}>
        <div className="splash-center">
          <div className="splash-slogan">
            XXXXXXXEn Deseo Oculto vivirás una experiencia única. Podrás explorar tus fantasías más íntimas, conversando con un hombre imaginario que no te juzga, te escucha… y se convierte exactamente en lo que deseas. Confidente, amante tierno o amo severo: tú decides!
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