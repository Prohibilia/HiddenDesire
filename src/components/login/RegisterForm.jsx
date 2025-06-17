import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { registerUser } from '../../supaBase/supabaseAuth';
import './login.css';

const SECURITY_QUESTIONS = [
  'domanda_custom',
  'domanda_amore',
  'domanda_animale',
  'domanda_citta',
  'domanda_film',
  'domanda_insegnante',
];

export default function RegisterForm({ onRegister }) {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    customQuestion: '',
    securityAnswer: '',
  });
  const [error, setError] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customQuestions, setCustomQuestions] = useState([]);
  const selectRef = useRef(null);
  const [customInputValue, setCustomInputValue] = useState('');
  const customInputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const usernameInputRef = useRef(null);
  const [usernameError, setUsernameError] = useState('');

  const isCustom = form.securityQuestion === t('domanda_custom');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'username') setUsernameError('');
  };

  const handleQuestionChange = e => {
    const value = e.target.value;
    setForm(f => ({ ...f, securityQuestion: value, customQuestion: '' }));
    if (value === t('domanda_custom')) {
      setShowCustomInput(true);
      setTimeout(() => {
        if (customInputRef.current) customInputRef.current.focus();
      }, 0);
    } else {
      setShowCustomInput(false);
      setCustomInputValue('');
    }
  };

  const handleCustomInputKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newQuestion = customInputValue.trim();
      if (newQuestion && !customQuestions.includes(newQuestion)) {
        setCustomQuestions(qs => [...qs, newQuestion]);
        setForm(f => ({ ...f, securityQuestion: newQuestion, customQuestion: '' }));
        setShowCustomInput(false);
        setCustomInputValue('');
        setTimeout(() => {
          if (selectRef.current) selectRef.current.value = newQuestion;
        }, 0);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowCustomInput(false);
      setCustomInputValue('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUsernameError('');
    if (form.password !== form.confirmPassword) {
      setError(t('le_password_non_coincidono'));
      return;
    }
    let securityQuestionToSave = form.securityQuestion;
    if (isCustom) {
      if (!customInputValue.trim()) {
        setError(t('scegli_domanda_sicurezza'));
        return;
      }
      securityQuestionToSave = customInputValue.trim();
    }
    if (!securityQuestionToSave) {
      setError(t('scegli_domanda_sicurezza'));
      return;
    }
    if (!form.securityAnswer) {
      setError(t('inserisci_risposta_sicurezza'));
      return;
    }
    setError('');
    setLoading(true);
    const { data, error } = await registerUser({
      username: form.username,
      password: form.password,
      dimensions: {},
      securityQuestion: securityQuestionToSave,
      securityAnswer: form.securityAnswer,
    });
    setLoading(false);
    if (error) {
      if (error.message && error.message.includes('duplicate key value')) {
        setUsernameError(i18n.language === 'es' ? '¡El usuario ya existe!' : 'Questo nome utente esiste già!');
        setTimeout(() => {
          if (usernameInputRef.current) usernameInputRef.current.focus();
        }, 100);
        return;
      }
      setError(error.message || 'Errore durante la registrazione');
      return;
    }
    setShowSuccess(true);
    setForm({
      username: '',
      password: '',
      confirmPassword: '',
      securityQuestion: '',
      customQuestion: '',
      securityAnswer: '',
    });
    setCustomInputValue('');
    setShowCustomInput(false);
    setTimeout(() => {
      setShowSuccess(false);
      if (onRegister) onRegister(data);
    }, 2000);
  };

  const allQuestions = [t('domanda_custom'), ...SECURITY_QUESTIONS.slice(1).map(q => t(q)), ...customQuestions].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <form className="register-form" onSubmit={handleSubmit} autoComplete="off" style={{position:'relative'}}>
        {usernameError && (
          <div style={{
            marginBottom: '0.5em',
            background: '#fff',
            color: '#e53935',
            borderRadius: '8px',
            padding: '0.5em 1em',
            fontFamily: "'Playfair Display', serif",
            fontSize: '1em',
            boxShadow: '0 2px 8px #0001',
            minWidth: '180px',
            maxWidth: '320px',
            whiteSpace: 'nowrap',
            position: 'relative',
            left: 0,
            fontWeight: 'normal',
            border: '1.5px solid #e53935',
            textAlign: 'left',
            letterSpacing: '0.01em',
          }}>
            {usernameError}
          </div>
        )}
        <input
          ref={usernameInputRef}
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder={t('username')}
          className="login-input"
          required
          autoFocus
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={t('password')}
          className="login-input"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder={t('conferma_password')}
          className="login-input"
          required
        />
        <div style={{position:'relative'}}>
          <select
            ref={selectRef}
            name="securityQuestion"
            value={form.securityQuestion}
            onChange={handleQuestionChange}
            className="login-input"
            required
            style={{position:'relative', zIndex:1, width:'100%', boxSizing:'border-box'}}
          >
            <option value="" disabled hidden>{t('scegli_domanda_sicurezza')}</option>
            <option value={t('domanda_custom')}>{t('domanda_custom')}</option>
            {allQuestions.filter(q => q !== t('domanda_custom')).map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
          {showCustomInput && (
            <input
              ref={customInputRef}
              type="text"
              value={customInputValue}
              onChange={e => setCustomInputValue(e.target.value)}
              onKeyDown={handleCustomInputKeyDown}
              placeholder={t('scrivi_domanda_custom')}
              className="login-input"
              autoFocus
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                zIndex: 2,
                boxSizing: 'border-box'
              }}
            />
          )}
        </div>
        <input
          type="text"
          name="securityAnswer"
          value={form.securityAnswer}
          onChange={handleChange}
          placeholder={t('risposta_domanda_sicurezza')}
          className="login-input"
          required
          autoComplete="off"
        />
        {error && !error.includes('duplicate key value') && <div className="login-error">{error}</div>}
        <button type="submit" className="login-btn" disabled={loading}>
          {t('registrati')}
        </button>
        {loading && (
          <div style={{textAlign:'center', marginTop:'1em'}}>
            <div className="simple-spinner" style={{margin:'0 auto'}}></div>
            <div style={{color:'#ffd77a', fontFamily:"'Playfair Display', serif", fontSize:'1.1em', marginTop:'0.5em'}}>
              {i18n.language === 'es' ? 'Te estoy registrando...' : 'Ti sto registrando...'}
            </div>
            <style>{`
              .simple-spinner {
                border: 4px solid #ffd77a44;
                border-top: 4px solid #ffd77a;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                animation: spin 0.8s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
      </form>
      {showSuccess && (
        <div className="login-modal-overlay" style={{zIndex:2000}}>
          <div className="login-modal-container" style={{textAlign:'center', padding:'2em'}}>
            <div style={{color:'#ffd77a', fontFamily:"'Playfair Display', serif", fontSize:'1.3em', marginBottom:'1em'}}>
              {i18n.language === 'es' ? '¡Registración completada! Gracias.' : 'Registrazione completata! Grazie.'}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .dot-anim {
          display: inline-block;
          width: 1.5em;
          text-align: left;
        }
        .dot-anim:after {
          content: '...';
          animation: dots 1.2s steps(3, end) infinite;
        }
        @keyframes dots {
          0%, 20% { color: rgba(255,215,122,0); }
          40% { color: #ffd77a; }
          60% { color: #ffd77a; }
          80%, 100% { color: rgba(255,215,122,0); }
        }
      `}</style>
    </>
  );
} 