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
    <div className={`splash-root${fade ? ' fade-out' : ''}`} style={{background:'transparent', padding:0}}>
      <div className="splash-center" style={{background:'transparent', padding:0, width:'100%', alignItems:'center', display:'flex', flexDirection:'column'}}>
          <div className="splash-slogan" style={{marginTop:'20px', marginBottom:'10px', marginLeft:'auto', marginRight:'auto', textAlign:'center', width:'100%'}}>
            {t('splash.slogan')}
          </div>
          <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', background:'transparent', margin:'0 0 10px 0', padding:0}}>
            <img src="/images/Door.png" alt="porta" style={{width:'117vw', maxWidth:'546px', height:'auto', display:'block', background:'transparent', border:'none', boxShadow:'none', margin:'0 auto', padding:0, cursor:'pointer'}} onClick={handleUnlock} />
          </div>
          <button
            className="splash-enter-btn"
            onClick={handleUnlock}
            style={{marginTop:0, marginBottom:'10px', marginLeft:'auto', marginRight:'auto', display:'block'}}
          >
            {t('fammi_entrare', t('entra', 'Entra'))}
          </button>
          <div className="splash-payoff">{t('payoff')}</div>
      </div>
      <div className="splash-copyright" style={{display:'flex', justifyContent:'center', alignItems:'center', color:'#ffd77a', fontFamily:"'Playfair Display', serif", fontSize:'0.98rem', marginTop:'0.5rem', marginBottom:'0.5rem', letterSpacing:'0.01em', width:'100%'}}>
        {t('copyright', 'Todos los derechos reservados © 2025')}
      </div>
      </div>
    </div>
  );
} 