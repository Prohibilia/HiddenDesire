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
    <form onSubmit={handleSubmit} className="recovery-inline-form" style={{
      backgroundColor: '#2a0e0e',
      border: '1px solid #ffd77a',
      borderRadius: '10px',
      padding: '1.5em',
      width: '100%',
      maxWidth: '400px',
      fontFamily: "'Playfair Display', serif",
      color: '#ffd77a',
      marginTop: '1.2em',
      boxSizing: 'border-box',
    }}>
      <div style={{
        marginBottom: '1em',
        fontSize: '1.1rem',
        fontStyle: 'italic',
        lineHeight: '1.4',
        color: '#ffd77a',
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
        style={{
          width: '100%',
          padding: '0.6em',
          backgroundColor: '#111',
          border: '1px solid #ffd77a',
          color: '#ffd77a',
          fontSize: '1rem',
          fontFamily: "'Playfair Display', serif",
          marginBottom: '0.8em',
          borderRadius: '7px',
          outline: 'none',
        }}
        autoComplete="off"
        required
      />
      {error && <div style={{ color: '#ff7777', marginBottom: '0.8em' }}>{error}</div>}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1em',
        marginTop: '0.2em',
      }}>
        <button type="submit" className="login-btn" style={{
          flex: 1,
          backgroundColor: 'transparent',
          border: '1px solid #ffd77a',
          color: '#ffd77a',
          padding: '0.6em',
          fontFamily: "'Playfair Display', serif",
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '1.08rem',
          cursor: 'pointer',
        }}>{t('invia')}</button>
        <button type="button" className="login-btn" onClick={onClose} style={{
          flex: 1,
          backgroundColor: 'transparent',
          border: '1px solid #ffd77a',
          color: '#ffd77a',
          padding: '0.6em',
          fontFamily: "'Playfair Display', serif",
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '1.08rem',
          cursor: 'pointer',
        }}>{t('annulla')}</button>
      </div>
      {success && (
        <div style={{color:'#ffd77a', fontFamily:'Playfair Display', fontStyle:'italic', marginTop:'0.7em'}}>
          {t('risposta_corretta_nuova_password')}
        </div>
      )}
    </form>
  );
} 