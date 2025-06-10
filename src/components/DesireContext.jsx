import React, { createContext, useContext, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const DEFAULT_VALUES = [0, 0, 0, 0, 0, 0, 0];

function synthesizeDesire(values, t) {
  const ruolo = values[0] > 60 ? t('role.3.label') : t('role.0.label');
  const tono = values[1] > 60 ? t('tone.3.label') : t('tone.0.label');
  const linguaggio = values[2] > 60 ? t('style.3.label') : t('style.0.label');
  const guida = values[5] > 60 ? t('lead.3.label') : t('lead.0.label');
  const regno = values[6] > 60 ? t('fantasy.3.label') : t('fantasy.0.label');
  return t('sintesi', { ruolo, tono, linguaggio, guida, regno });
}

const DesireContext = createContext();

export function DesireProvider({ children }) {
  const { t } = useTranslation();
  const [desireValues, setDesireValues] = useState(DEFAULT_VALUES);
  const sintesi = useMemo(() => synthesizeDesire(desireValues, t), [desireValues, t]);
  return (
    <DesireContext.Provider value={{ desireValues, setDesireValues, sintesi }}>
      {children}
    </DesireContext.Provider>
  );
}

export function useDesire() {
  return useContext(DesireContext);
} 