import React, { useState, useEffect } from 'react';
import { useDesire } from './DesireContext';
import { useTranslation } from 'react-i18next';
import './DesireFlowerPage.css';

function computePayoffVars(values, t) {
  return {
    ruolo: t(`desireFlower.values.${values[0] > 60 ? 'amante' : 'confidente'}`),
    tono: t(`desireFlower.values.${values[1] > 60 ? 'severo' : 'tenero'}`),
    linguaggio: t(`desireFlower.values.${values[2] > 60 ? 'con un linguaggio forte' : 'poetico'}`),
    guida: t(`desireFlower.values.${values[5] > 60 ? 'dovrai obbedire' : 'mi guiderai tu'}`),
    regno: t(`desireFlower.values.${values[6] > 60 ? 'fantasia' : 'realtà'}`)
  };
}

export default function DesireFlowerPage() {
  const { desireValues, setDesireValues } = useDesire();
  const [localValues, setLocalValues] = useState(desireValues);
  const [selected, setSelected] = useState(0);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLocalValues(desireValues);
  }, [desireValues]);

  // Prendi i dati dei cerchi dalla traduzione
  const circles = t('desireFlower.circles', { returnObjects: true });

  const handleSliderChange = (value) => {
    const newValues = [...localValues];
    newValues[selected] = parseInt(value);
    setLocalValues(newValues);
  };

  function getSelectedLabel(idx) {
    const d = circles[idx];
    const v = localValues[idx];
    if (v < 40) return d.min;
    if (v > 60) return d.max;
    return '';
  }

  const d = circles[selected];
  const payoffVars = computePayoffVars(localValues, t);

  return (
    <div className="desire-flower-page-outer">
      <div className="desire-flower-page-header" style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <h1 className="desire-flower-page-title" style={{
          fontFamily: 'Great Vibes, cursive',
          fontSize: '3.2rem',
          color: '#ffe08a',
          fontWeight: 600,
          letterSpacing: '0.01em',
          textShadow: '0 0 18px #e6c97a99, 0 2px 18px #000',
          textAlign: 'center',
          margin: '0 auto 0.2rem auto',
          background: 'none',
          padding: 0,
          border: 'none',
          boxShadow: 'none',
        }}>{t('desireFlower.title')}</h1>
        <div style={{
          fontFamily: 'Great Vibes, cursive',
          fontSize: '2.1rem',
          color: '#ffe7a1',
          fontWeight: 400,
          fontStyle: 'italic',
          textAlign: 'center',
          marginTop: '0.1rem',
          marginBottom: '1.2rem',
          letterSpacing: '0.01em',
          textShadow: '0 0 8px #e6c97a55, 0 2px 8px #000',
        }}>{t('desireFlower.tempTitle')}</div>
      </div>
      <div className="desire-flower-page-content">
        <div className="desire-flower-sintesi-elegant" style={{marginBottom: '2.2rem'}}>{t('desireFlower.payoff', payoffVars)}</div>
        <div className="desire-flower-circles" style={{ width: 600, height: 600, position: 'relative' }}>
          <svg className="desire-flower-arch-svg" width="600" height="600" style={{position:'absolute', left:0, top:0, zIndex:0, pointerEvents:'none'}}>
            <circle cx="300" cy="300" r="240" fill="none" stroke="#ffe7a1" strokeWidth="1.2" />
          </svg>
          {circles.map((d, i) => {
            const angle = (360/7)*i - 90;
            const rad = 240;
            const x = 300 + rad * Math.cos(angle * Math.PI/180);
            const y = 300 + rad * Math.sin(angle * Math.PI/180);
            const selectedLabel = getSelectedLabel(i);
            // Colore dinamico: da blu intenso (#3a7bd5) a rosso scuro (#8b1e1e)
            const intensity = localValues[i] / 100;
            const r = Math.round(58 + (139-58)*intensity); // da 58 (3a) a 139 (8b)
            const g = Math.round(123 + (30-123)*intensity); // da 123 (7b) a 30 (1e)
            const b = Math.round(213 + (30-213)*intensity); // da 213 (d5) a 30 (1e)
            const bgColor = `rgb(${r},${g},${b})`;
            return (
              <div
                key={d.caption}
                className={`desire-circle${selected===i ? ' selected' : ''}`}
                style={{ left: x, top: y, position:'absolute', transform: 'translate(-50%,-50%)', cursor:'pointer', zIndex:selected===i?2:1, background: bgColor, transition: 'background 0.4s' }}
                onClick={() => setSelected(i)}
              >
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
                  <span>{d.caption}</span>
                  {selectedLabel && (
                    <div className="desire-circle-selected-label">{selectedLabel}</div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="desire-flower-center">
            <div className="desire-slogan" style={{marginBottom: '0.7rem', marginTop: '0.7rem'}}>{d.slogan}</div>
            <div className="desire-slider-labels" style={{marginBottom: '0.5rem'}}>
              <span
                style={{
                  color: `rgba(212, 175, 55, ${Math.max(0.4, 1 - localValues[selected] / 100)})`,
                  filter: `drop-shadow(0 0 ${Math.round(8 * (1 - localValues[selected] / 100))}px #d4af37)`
                }}
              >
                {d.emojiMin} {d.min}
              </span>
              <span
                style={{
                  color: `rgba(212, 175, 55, ${Math.max(0.4, localValues[selected] / 100)})`,
                  filter: `drop-shadow(0 0 ${Math.round(8 * (localValues[selected] / 100))}px #d4af37)`
                }}
              >
                {d.max} {d.emojiMax}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={localValues[selected]}
              onChange={(e) => handleSliderChange(e.target.value)}
              style={{width: '60%', marginTop: '1.2rem', height: '3px', background: 'linear-gradient(90deg, #ffe08a 0%, #d4af37 100%)', borderRadius: '2px'}}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 