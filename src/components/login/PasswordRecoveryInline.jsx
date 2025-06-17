import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Simulazione di fetch domanda/risposta (da sostituire con backend reale)
const mockUserDB = {
  'alice': {
    question: 'Qual è il nome del tuo primo animale domestico?',
    answerHash: 'hash123',
  },
  'test': {
    question: 'Domanda di test?',
    answerHash: 'hash123',
  },
};
function hash(str) {
  return 'hash' + str.trim().toLowerCase();
}

export default function PasswordRecoveryInline({ username, onClose }) {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const answerInputRef = useRef(null);

  useEffect(() => {
    if (username) {
      const user = mockUserDB[username.trim().toLowerCase()];
      if (user) {
        setQuestion(user.question);
        setError('');
        // Focus the answer input when question is loaded
        setTimeout(() => {
          if (answerInputRef.current) {
            answerInputRef.current.focus();
          }
        }, 100);
      } else {
        setQuestion('');
        setError(t('utente_non_trovato'));
      }
    }
  }, [username, t]);

  const handleSubmit = e => {
    e.preventDefault();
    const user = mockUserDB[username.trim().toLowerCase()];
    if (user && hash(answer) === user.answerHash) {
      setSuccess(true);
      setError('');
    } else {
      setError(t('risposta_errata'));
    }
  };

  if (!username) return null;

  return (
    <div className="recovery-inline-panel">
      {question && !success && (
        <form onSubmit={handleSubmit} className="recovery-inline-form">
          <div className="recovery-inline-question" style={{
            color: '#ffd77a',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            marginBottom: '0.7em',
            fontSize: '1.08rem',
            lineHeight: '1.4'
          }}>
            {t('rispondi_a_domanda')}<br />
            <span style={{ fontWeight: 'bold' }}>{question}</span>
          </div>
          <input
            ref={answerInputRef}
            type="text"
            placeholder={t('risposta_domanda_sicurezza')}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            className="login-input"
            style={{ height: '42px' }}
            autoComplete="off"
            required
          />
          {error && <div className="login-error">{error}</div>}
          <div style={{display:'flex', gap:'1em', justifyContent:'center', marginTop:'0.7em'}}>
            <button type="submit" className="login-btn" style={{ borderTop: 'none' }}>{t('invia')}</button>
            <button type="button" className="login-btn" onClick={onClose} style={{ borderTop: 'none' }}>{t('annulla')}</button>
          </div>
        </form>
      )}
      {success && (
        <div className="recovery-inline-success" style={{color:'#ffd77a', fontFamily:'Playfair Display', fontStyle:'italic', marginTop:'0.7em'}}>
          {t('risposta_corretta_nuova_password')}
        </div>
      )}
    </div>
  );
} 