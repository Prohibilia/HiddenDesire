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
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [showLogin, setShowLogin] = useState(() => !sessionStorage.getItem('guestId') && !isLoggedIn);
  const chatEndRef = useRef(null);
  const { t } = useTranslation();
  const { sintesi } = useDesire();

  useEffect(() => {
    if (!localStorage.getItem('hasVisitedOnce')) {
      localStorage.setItem('hasVisitedOnce', 'true');
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || showLogin) return;
    
    // Invito alla registrazione secondo la nuova logica
    if (sessionStorage.getItem('registrationPromptShown') !== 'true') {
      setShowLogin(true);
      sessionStorage.setItem('registrationPromptShown', 'true');
      return;
    }
    
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
    <>
      <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'1.5rem', marginBottom:'-0.5rem'}}>
        <button className="elegant-button" style={{minWidth:'200px', fontSize:'1.2em'}} onClick={() => window.location.href='/dimensioni'}>
          {t('le_7_dimensioni', '')}
        </button>
      </div>
      <div className="desire-flower-sintesi desire-flower-sintesi-elegant desire-flower-sintesi-wallpaper">{sintesi}</div>
      <div className="chat-outer chat-outer-panel" style={{paddingTop: 0, marginTop: 0}}>
        <div className="chat-inner-panel">
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg chat-msg-${msg.sender}`}>
                <div className="chat-bubble">
                  <div className="avatar-container">
                    <img src={msg.sender === 'system' ? '/images/masculineMask.png' : '/images/feminineMask.png'} alt="mask" className="chat-avatar-inside" />
                  </div>
                  <span className="chat-text">{msg.text}</span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-input-row" onSubmit={handleSend} autoComplete="off">
            <div className="chat-input-bubble">
              <div className="avatar-container">
                <img src="/images/feminineMask.png" alt="maschera femminile" className="chat-avatar-inside" />
              </div>
              <input
                className="chat-input"
                type="text"
                placeholder={t('chat_placeholder')}
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={showLogin}
              />
              <button type="submit" className="chat-send-btn" aria-label="Invia" disabled={showLogin}>
                <img src="/images/envelope.png" alt="invia" className="chat-send-icon" />
              </button>
            </div>
          </form>
        </div>
    </div>
    </>
  );
} 