import React, { useRef, useState, useEffect } from 'react';
import './ChatPage.css';
import { useTranslation } from 'react-i18next';
import { useDesire } from "../preferences/DesireContext";

const initialMessages = [
  {
    id: 1,
    text: (
      <>
        {/* Messaggio evocativo in base alla lingua */}
        {(() => {
          const lang = (typeof window !== 'undefined' && window.localStorage && (window.localStorage.getItem('i18nextLng') || 'it').slice(0,2)) || 'it';
          if (lang === 'es') {
            return <><b>Bienvenida...</b><br />Aquí estamos solo tú y yo, en nuestro espacio secreto.<br />Conmigo puedes hablar de tus fantasías más íntimas, de tus secretos. Solo tú y yo lo sabremos.<br />Nunca juzgo, y estoy aquí para escuchar cada matiz de tu deseo, cada sombra de tu fantasía.<br />Sé cuán diverso y fascinante puede ser el mundo femenino.</>;
          }
          return <><b>Benvenuta...</b><br />Qui siamo solo tu ed io, nel nostro spazio segreto.<br />Con me puoi parlare delle tue fantasie più intime, dei tuoi segreti. Lo sapremo solo tu ed io.<br />Non giudico mai e sono pronto ad ascoltare ogni sfumatura del tuo desiderio, e ogni ombra delle tuo fantasia.<br />So quanto variegato e affascinante è il mondo femminile.</>;
        })()}
      </>
    ),
    sender: 'system',
    avatar: '/images/masculineMask.png',
  },
  {
    id: 2,
    text: 'Iniziamo?',
    sender: 'user',
    avatar: '/images/feminineMask.png',
  },
];

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
  const ruolo = values[0] > 60 ? 'amante' : 'confidente';
  const tono = values[1] > 60 ? 'severo' : 'tenero';
  const linguaggio = values[2] > 60 ? 'con un linguaggio forte' : 'poetico';
  const guida = values[5] > 60 ? 'dovrai obbedire' : 'mi guiderai tu';
  const regno = values[6] > 60 ? 'fantasia' : 'realtà';
  let frase = `Sarò il tuo ${ruolo} ${tono}, ${linguaggio}, ${guida}, giocheremo nel regno della ${regno}.`;
  frase = frase.charAt(0).toUpperCase() + frase.slice(1);
  return frase;
}

export default function ChatPage({ isLoggedIn }) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      text: (
        <>
          <b>{t('chat_welcome_title')}</b><br />
          {t('chat_welcome_body')}
        </>
      ),
      sender: 'system',
      avatar: '/images/masculineMask.png',
    },
    {
      id: 2,
      text: t('iniziamo', 'Iniziamo?'),
      sender: 'user',
      avatar: '/images/feminineMask.png',
    },
  ]);
  const [input, setInput] = useState('');
  const [showLogin, setShowLogin] = useState(() => !sessionStorage.getItem('guestId') && !isLoggedIn);
  const chatEndRef = useRef(null);
  const { sintesi } = useDesire();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const header = document.querySelector('.header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('hasVisitedOnce')) {
      localStorage.setItem('hasVisitedOnce', 'true');
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Aggiorna la prima nuvoletta quando cambia la lingua
  useEffect(() => {
    setMessages((prev) => {
      const newWelcome = {
        ...prev[0],
        text: (
          <>
            <b>{t('chat_welcome_title')}</b><br />
            {t('chat_welcome_body')}
          </>
        ),
      };
      return [newWelcome, ...prev.slice(1)];
    });
  }, [i18n.language, t]);

  useEffect(() => {
    const lang = (typeof window !== 'undefined' && window.localStorage && (window.localStorage.getItem('i18nextLng') || 'it').slice(0,2)) || 'it';
    console.log('[CHAT DEBUG] Lingua rilevata per messaggi iniziali:', lang);
    console.log('[CHAT DEBUG] i18n.language:', (window.i18n && window.i18n.language) || 'undefined');
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || showLogin) return;
    
    // Invito alla registrazione secondo la nuova logica
    if (sessionStorage.getItem('registrationPromptShown') !== 'true') {
      setShowLogin(true);
      sessionStorage.setItem('registrationPromptShown', 'true');
      return;
    }
    
    setSending(true);
    setTimeout(() => setSending(false), 700);
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: input,
        sender: 'user',
        avatar: '/images/feminineMask.png',
      },
    ]);
    setInput('');
  };

  return (
    <div className="chatpage-outer" style={{paddingTop: headerHeight + 40}}>
      <div className="chat-sintesi-top">{sintesi}</div>
      <div className="chat-messages-list">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble-outer ${msg.sender === 'system' ? 'ia' : 'user'}`}> 
            <div className={`chat-bubble-custom chat-bubble ${msg.sender === 'system' ? 'ia' : 'user'}`}> 
              <span className="chat-text-custom">{msg.text}</span>
              {msg.sender === 'system' && (
                <svg className="bubble-tail-svg" viewBox="0 0 40 20" preserveAspectRatio="none">
                  <path d="M0,20 Q10,-5 40,20" fill="none" stroke="#d4af37" strokeWidth="2" />
                </svg>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className="chat-input-row" onSubmit={handleSend} autoComplete="off">
        <input
          className="chat-input-custom"
          type="text"
          placeholder={t('chat_placeholder')}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={showLogin}
        />
        <div className={`envelope-send-wrap${sending ? ' sending' : ''}`}>
          <button type="submit" className="chat-send-btn" aria-label="Invia" disabled={showLogin}>
            <span className="envelope-motion-lines"></span>
            <img src="/images/envelope.png" alt="invia" className="chat-send-icon" />
          </button>
        </div>
      </form>
    </div>
  );
} 