import React, { useState } from 'react';
import './DesireFlowerPopup.css';
import DesireSelector from './DesireSelector';

const DIMENSIONS = [
  {
    key: 'ruolo',
    caption: 'Il mio ruolo',
    slogan: 'Quanto vuoi che io sia per te?',
    min: 'Confidente',
    max: 'Amante',
    emojiMin: '🤝',
    emojiMax: '💋',
  },
  {
    key: 'tono',
    caption: 'Tono',
    slogan: 'Che tipo di energia desideri?',
    min: 'Tenero',
    max: 'Autoritario',
    emojiMin: '🕊️',
    emojiMax: '🔥',
  },
  {
    key: 'linguaggio',
    caption: 'Linguaggio',
    slogan: 'Come vuoi che ti parli?',
    min: 'Poetico',
    max: 'Crudo',
    emojiMin: '🌸',
    emojiMax: '😈',
  },
  {
    key: 'intensita',
    caption: 'Intensità',
    slogan: 'Fin dove vuoi spingerti adesso?',
    min: 'Sottile',
    max: 'Esplicito',
    emojiMin: '💫',
    emojiMax: '💣',
  },
  {
    key: 'stimolazione',
    caption: 'Stimolazione',
    slogan: 'Vuoi essere più sorpresa o rassicurata?',
    min: 'Rassicurante',
    max: 'Imprevedibile',
    emojiMin: '🌿',
    emojiMax: '🎭',
  },
  {
    key: 'iniziativa',
    caption: 'Iniziativa',
    slogan: 'Vuoi guidare o lasciarti guidare?',
    min: 'Guido io',
    max: 'Voglio essere presa',
    emojiMin: '💃',
    emojiMax: '🕴️',
  },
  {
    key: 'gioco',
    caption: 'Realtà o fantasia',
    slogan: 'In che universo vuoi giocare?',
    min: 'Reale',
    max: 'Fantastico',
    emojiMin: '🌍',
    emojiMax: '🧚‍♀️',
  },
];

function getTemperatureColor(val) {
  // 0 = dorato, 100 = rosso
  const r = Math.round(212 + (255-212)*(val/100));
  const g = Math.round(175 - 100*(val/100));
  const b = Math.round(55 - 55*(val/100));
  return `rgb(${r},${g},${b})`;
}

function getFlameColor(val) {
  // 0 = blu, 100 = rosso
  const r = Math.round(30 + 225*(val/100));
  const g = Math.round(80 - 60*(val/100));
  const b = Math.round(255 - 255*(val/100));
  return `rgb(${r},${g},${b})`;
}

export default function DesireFlowerPopup({ open, onClose, values: parentValues, onChangeValues }) {
  const [selected, setSelected] = useState(0);
  const [values, setValues] = useState(parentValues || Array(7).fill(50));
  const [showSummary, setShowSummary] = useState(false);

  // Aggiorna i valori locali e notifica il parent
  const handleSlider = v => {
    setValues(vals => {
      const newVals = vals.map((val, i) => i === selected ? v : val);
      if (onChangeValues) onChangeValues(newVals);
      return newVals;
    });
  };

  // Aggiorna i valori locali se cambiano dal parent
  React.useEffect(() => {
    if (parentValues && parentValues.some((v, i) => v !== values[i])) {
      setValues(parentValues);
    }
    // eslint-disable-next-line
  }, [parentValues]);

  const handleCircleClick = idx => {
    setSelected(idx);
    setShowSummary(false);
  };

  const handleClose = () => {
    setShowSummary(true);
    setTimeout(() => onClose && onClose(values), 1200);
  };

  // Sintesi testo e temperatura media
  const temp = values.reduce((a,b) => a+b, 0) / values.length;
  const summary = DIMENSIONS.map((d, i) => `${d.caption}: ${Math.round(values[i])}`).join(' | ');

  // Funzione per etichetta selezionata
  function getSelectedLabel(idx) {
    const d = DIMENSIONS[idx];
    const v = values[idx];
    if (v < 40) return d.min;
    if (v > 60) return d.max;
    return '';
  }

  if (!open) return null;

  const d = DIMENSIONS[selected];

  return (
    <div className="desire-flower-compact">
      <div className="desire-flower-circles" style={{ width: 600, height: 600, position: 'relative' }}>
        <svg className="desire-flower-arch-svg" width="600" height="600" style={{position:'absolute', left:0, top:0, zIndex:0, pointerEvents:'none'}}>
          <circle cx="300" cy="300" r="240" fill="none" stroke="#ffe7a1" strokeWidth="1.2" />
        </svg>
        {DIMENSIONS.map((d, i) => {
          const angle = (360/7)*i - 90;
          const rad = 240;
          const x = 300 + rad * Math.cos(angle * Math.PI/180);
          const y = 300 + rad * Math.sin(angle * Math.PI/180);
          const selectedLabel = getSelectedLabel(i);
          return (
            <div
              key={d.key}
              className={`desire-circle${selected===i ? ' selected' : ''}`}
              style={{ left: x, top: y, position:'absolute', transform: 'translate(-50%,-50%)', cursor:'pointer', zIndex:selected===i?2:1 }}
              onClick={() => handleCircleClick(i)}
            >
              <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
                <span>{d.caption.charAt(0).toUpperCase() + d.caption.slice(1).toLowerCase()}</span>
                {selectedLabel && (
                  <div className="desire-circle-selected-label">{selectedLabel}</div>
                )}
              </div>
            </div>
          );
        })}
        <div className="desire-flower-center">
          <DesireSelector
            slogan={d.slogan}
            minLabel={d.emojiMin + ' ' + d.min}
            maxLabel={d.max + ' ' + d.emojiMax}
            value={values[selected]}
            onChange={handleSlider}
          />
        </div>
      </div>
    </div>
  );
} 