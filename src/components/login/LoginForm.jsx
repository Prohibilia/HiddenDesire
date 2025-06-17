import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PasswordRecoveryInline from './PasswordRecoveryInline';
import './login.css';
import { loginUser } from '../../supaBase/supabaseAuth';

export default function LoginForm({ onLogin, open }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showRecovery, setShowRecovery] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) setShowRecovery(false);
  }, [open]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!showRecovery) {
      const { data, error } = await loginUser(form);
      if (error) {
        setError(error);
        return;
      }
      if (onLogin) onLogin(data);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder={t('username')}
        className="login-input"
        required
        autoFocus
        style={{ height: '42px' }}
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder={t('password')}
        className="login-input"
        required
        style={{ height: '42px' }}
      />
      <button
        type="button"
        className="login-forgot"
        onClick={() => { if (!showRecovery) setShowRecovery(true); }}
        tabIndex={0}
      >
        {t('hai_dimenticato_password')}
      </button>
      <div className={`recovery-inline-panel${showRecovery ? ' expanded' : ' collapsed'}`}>
        {showRecovery && (
          <PasswordRecoveryInline username={form.username} onClose={() => setShowRecovery(false)} />
        )}
      </div>
      <button type="submit" className="login-btn" disabled={showRecovery} style={{ borderTop: 'none' }}>
        {t('accedi')}
      </button>
      {error && <div className="login-error">{error}</div>}
    </form>
  );
} 