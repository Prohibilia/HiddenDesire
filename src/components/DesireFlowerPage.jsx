import React, { useMemo } from 'react';
import DesireFlowerPopup from './DesireFlowerPopup.jsx';
import './DesireFlowerPage.css';
import { useDesire } from './DesireContext';

const DIMENSIONS = [
  { key: 'ruolo', min: 'Confidente', max: 'Amante', values: ['confidente', 'amante'] },
  { key: 'tono', min: 'Tenero', max: 'Autoritario', values: ['tenero', 'autoritario'] },
  { key: 'linguaggio', min: 'Poetico', max: 'Crudo', values: ['poetico', 'crudo'] },
  { key: 'intensita', min: 'Sottile', max: 'Esplicito', values: ['sottile', 'esplicito'] },
  { key: 'stimolazione', min: 'Rassicurante', max: 'Imprevedibile', values: ['rassicurante', 'imprevedibile'] },
  { key: 'iniziativa', min: 'Guido io', max: 'Voglio essere presa', values: ['guiderai tu', 'obbedirai'] },
  { key: 'gioco', min: 'Reale', max: 'Fantastico', values: ['nel reale', 'nel fantastico'] },
];

function synthesizeDesire(values) {
  // Ruolo
  const ruolo = values[0] > 60 ? 'amante' : 'confidente';
  // Tono
  const tono = values[1] > 60 ? 'severo' : 'tenero';
  // Linguaggio
  const linguaggio = values[2] > 60 ? 'con un linguaggio forte' : 'poetico';
  // Iniziativa
  const guida = values[5] > 60 ? 'dovrai obbedire' : 'mi guiderai tu';
  // Gioco
  const regno = values[6] > 60 ? 'fantasia' : 'realtà';

  // Costruzione frase
  let frase = `Sarò il tuo ${ruolo} ${tono}, ${linguaggio}, ${guida}, giocheremo nel regno della ${regno}. Ma posso diventare ciò che vuoi. XXXXXXXXLo decidi tu scegliendo sotto le 7 dimensioni del tuo desiderio!`;
  // Iniziale maiuscola
  frase = frase.charAt(0).toUpperCase() + frase.slice(1);
  return frase;
}

const DEFAULT_VALUES = [0, 0, 0, 0, 0, 0, 0]; // profilo confidente/dolce

export default function DesireFlowerPage({ onClose }) {
  const { desireValues, setDesireValues, sintesi } = useDesire();
  return (
    <div className="desire-flower-page-outer">
      <div className="desire-flower-page-header">
        <span className="desire-flower-page-title desire-flower-page-title-light">Le 7 dimensioni del tuo desiderio</span>
        <button className="desire-flower-page-close" onClick={onClose} title="Chiudi">✕</button>
      </div>
      <div className="desire-flower-sintesi desire-flower-sintesi-elegant">{sintesi}</div>
      <div className="desire-flower-page-content">
        <DesireFlowerPopup open values={desireValues} onChangeValues={setDesireValues} onClose={vals => { if (vals) setDesireValues(vals); onClose(); }} />
      </div>
    </div>
  );
} 