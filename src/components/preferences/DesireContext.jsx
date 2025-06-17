import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { upsertUserDimensions, getUserDimensions7 } from '../../supaBase/supabaseDimensions';

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

export function DesireProvider({ children, userId }) {
  const { t } = useTranslation();
  const [desireValues, setDesireValues] = useState(DEFAULT_VALUES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const sintesi = useMemo(() => synthesizeDesire(desireValues, t), [desireValues, t]);

  // Carica le dimensioni da dimensions7 se l'utente è loggato
  useEffect(() => {
    if (!userId) return;
    getUserDimensions7(userId)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error loading dimensions:', error);
          setError(error.message);
          return;
        }
        if (data && typeof data.dimension_1 === 'number') {
          setDesireValues([
            data.dimension_1,
            data.dimension_2,
            data.dimension_3,
            data.dimension_4,
            data.dimension_5,
            data.dimension_6,
            data.dimension_7
          ]);
        }
      })
      .catch(err => {
        console.error('Error in dimension loading:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  // Salva le dimensioni su dimensions7 ogni volta che cambiano
  useEffect(() => {
    if (!userId) return;
    upsertUserDimensions(userId, desireValues)
      .then(({ error }) => {
        if (error) {
          console.error('Error saving dimensions:', error);
          setError(error.message);
        } else {
          setError(null);
        }
      })
      .catch(err => {
        console.error('Error in dimension saving:', err);
        setError(err.message);
      });
  }, [userId, desireValues]);

  const value = {
    desireValues,
    setDesireValues,
    sintesi,
    isLoading,
    error
  };

  return (
    <DesireContext.Provider value={value}>
      {children}
    </DesireContext.Provider>
  );
}

export function useDesire() {
  const context = useContext(DesireContext);
  if (context === undefined) {
    throw new Error('useDesire must be used within a DesireProvider');
  }
  return context;
} 