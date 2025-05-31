import React, { useRef, useState, useEffect } from 'react';
import './ChatPage.css';
import { useTranslation } from 'react-i18next';

const initialMessages = [
  {
    id: 1,
    text: (
      <>
        <span role="img" aria-label="rose">🌹</span> <span role="img" aria-label="sparkles">✨</span> <b>Benvenuta...</b><br />
        Questa è una conversazione solo tra te e me, in uno spazio segreto e protetto. Qui puoi parlare di tutto, senza paure: io non giudico, sono pronto ad ascoltare ogni sfumatura del tuo desiderio e ogni ombra delle tuo fantasia.
      </>
    ),
    sender: 'system',
    avatar: '/images/masculineMask.png',
  },
  {
    id: 2,
    text: 'Iniziamo?',
    sender: 'user',
    avatar: '/images/FeminineMask.png',
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const { t } = useTranslation();

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
        avatar: '/images/FeminineMask.png',
      },
    ]);
    setInput('');
  };

  return (
    <div className="chat-outer">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-msg chat-msg-${msg.sender}`}>
            <img src={msg.avatar} alt="mask" className="chat-avatar" />
            <div className="chat-bubble">
              <span className="chat-text">{msg.text}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className="chat-input-row" onSubmit={handleSend} autoComplete="off">
        <div className="chat-input-bubble">
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
  );
} 