import React, { createContext, useContext, useState, useMemo } from 'react';

const DEFAULT_VALUES = [0, 0, 0, 0, 0, 0, 0];

function synthesizeDesire(values) {
  const ruolo = values[0] > 60 ? 'amante' : 'confidente';
  const tono = values[1] > 60 ? 'severo' : 'tenero';
  const linguaggio = values[2] > 60 ? 'con un linguaggio forte' : 'poetico';
  const guida = values[5] > 60 ? 'dovrai obbedire' : 'mi guiderai tu';
  const regno = values[6] > 60 ? 'fantasia' : 'realtà';
  let frase = `Sarò il tuo ${ruolo} ${tono}, ${linguaggio}, ${guida}, giocheremo nel regno della ${regno}. Ma posso diventare ciò che vuoi. Lo decidi tu scegliendo sotto le 7 dimensioni del tuo desiderio!`;
  frase = frase.charAt(0).toUpperCase() + frase.slice(1);
  return frase;
}

const DesireContext = createContext();

export function DesireProvider({ children }) {
  const [desireValues, setDesireValues] = useState(DEFAULT_VALUES);
  const sintesi = useMemo(() => synthesizeDesire(desireValues), [desireValues]);
  return (
    <DesireContext.Provider value={{ desireValues, setDesireValues, sintesi }}>
      {children}
    </DesireContext.Provider>
  );
}

export function useDesire() {
  return useContext(DesireContext);
} 