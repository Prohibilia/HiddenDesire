import React, { createContext, useContext, useState, useMemo } from 'react';

const DEFAULT_VALUES = [0, 0, 0, 0, 0, 0, 0];

function synthesizeDesire(values) {
  return {
    ruolo: values[0] > 60 ? 'amante' : 'confidente',
    tono: values[1] > 60 ? 'severo' : 'tenero',
    linguaggio: values[2] > 60 ? 'con un linguaggio forte' : 'poetico',
    guida: values[5] > 60 ? 'dovrai obbedire' : 'mi guiderai tu',
    regno: values[6] > 60 ? 'fantasia' : 'realtà',
  };
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