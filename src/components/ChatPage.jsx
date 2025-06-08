import React, { useRef, useState, useEffect } from 'react';
import './ChatPage.css';
import { useTranslation } from 'react-i18next';
import DesireFlowerPage from './DesireFlowerPage';
import { useDesire } from './DesireContext';

const initialMessages = [
  {
    id: 1,
    text: (
      <>
        <b>Benvenuta...</b><br />
        Questa è una conversazione solo tra te e me, in uno spazio segreto e protetto. Qui puoi parlare di tutto, senza paure: io non giudico, sono pronto ad ascoltare ogni sfumatura del tuo desiderio,  e ogni ombra delle tuo fantasia.
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

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const { t } = useTranslation();
  const [showDesireFlowerPage, setShowDesireFlowerPage] = useState(false);
  const { desireValues, setDesireValues, sintesi } = useDesire();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
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

  if (showDesireFlowerPage) {
    return <DesireFlowerPage onClose={() => setShowDesireFlowerPage(false)} />;
  }
  return (
    <div className="chat-outer chat-outer-panel" style={{paddingTop: 0, marginTop: 0}}>
      <div className="desire-flower-sintesi desire-flower-sintesi-elegant" style={{marginBottom: '2.2rem'}}>{sintesi}</div>
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
            />
            <button type="submit" className="chat-send-btn" aria-label="Invia">
              <img src="/images/envelope.png" alt="invia" className="chat-send-icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 