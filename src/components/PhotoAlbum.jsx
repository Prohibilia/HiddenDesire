import React, { useState, useEffect } from 'react';
import './PhotoAlbum.css';

// Elenco statico delle immagini (in ambiente statico React non si può leggere la dir)
const photoList = [
  "Foto.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.06_7d6be721.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.06_eea343dd.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.07_421c608c.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.07_b0cb16b0.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.07_dfcf26c3.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.07_f5ce928a.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.08_30b6838f.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.08_5e99d243.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.09_142f3a56.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.09_2ee0b22a.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.09_80212bc3.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.09_c153dba8.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.10_00177eba.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.10_355af19a.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.10_bc1acdd4.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.10_c67f5cc7.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.10_e7d99e7f.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.11_13f559e9.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.11_50f4b42a.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.11_aa3428c8.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.11_e7105919.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.12_6e2d0e25.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.12_966324ef.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.12_9a85a2dd.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.12_d5eb2a34.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.12_e5bedb57.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.13_2814eaeb.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.13_87edb444.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.13_96b21b47.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.13_acfa8e31.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.14_064f92b2.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.14_33ca18e2.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.14_7b63ee7a.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.14_cbeeb04c.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.14_cfaa6841.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.15_3dcb0fe3.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.15_412ea293.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.15_43ddf694.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.15_832eaae8.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.15_89610511.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.15_ab72074b.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.16_11f3e115.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.16_192f41b3.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.16_609d8308.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.16_62f3fb47.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.16_ad088094.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.16_b6960a28.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.16_bf4470f8.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.17_19f1279e.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.17_4d162e71.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.17_4d5ceeef.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.17_556c99ab.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.17_9c53b9e2.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.17_f786aee4.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.18_081f7b17.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.18_129d0adb.jpg",
  "Immagine WhatsApp 2025-05-31 ore 12.40.18_cf98e1f1.jpg"
];

const introText = `🌹✨ Adesso ti propongo un gioco intenso: visto che ti sei già confidata con me e senti di voler fare un passo ulteriore nella scoperta dei tuoi angoli segreti – qualcosa che forse finora hai tenuto nascosto per pudore, per timore, o chissà cos'altro!

Qui siamo solo io e te. Io non ti giudico, la sessualità vissuta pienamente è uno dei più bei regali che ci possiamo donare. Conosco quanto il mondo femminile sia ricco, profondo, a volte sorprendentemente audace e altre volte più silenzioso e inespresso.

Il gioco è questo: ti mostrerò alcune immagini. Voglio che a ciascuna foto tu dia un voto da 1 a 5 stelline, in base a quanto ti eccita – 1 stellina se proprio non ti piace o non ti suscita nulla. Se puoi, aggiungi un breve commento quando una foto ti eccita molto o per niente, raccontando cosa ti fa sentire o cosa ti evoca quella foto.

Indica anche se quell'esperienza l'hai già vissuta o se la vorresti provare.

In base alle tue risposte, io delineerò un profilo che – secondo me – ti rappresenta. Naturalmente è solo il mio punto di vista: potrai dirmi cosa ne pensi, correggermi o aggiungere sfumature.

A me servirà per conoscerti meglio, ma spero che questo gioco possa anche aiutarti a scoprire certi angoli di te stessa che forse ancora non conosci. Angoli nascosti nella penombra del pudore… ma qui, in questo spazio, possiamo esplorarli insieme, in libertà e totale sicurezza. 🌹✨`;

async function fetchVotes() {
  const res = await fetch('/.netlify/functions/votes');
  if (!res.ok) return {};
  return await res.json();
}
async function saveVotes(votes) {
  await fetch('/.netlify/functions/votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(votes),
  });
}

function Star({ filled, onClick }) {
  return (
    <span className={filled ? 'star star-filled' : 'star'} onClick={onClick}>
      ★
    </span>
  );
}

export default function PhotoAlbum() {
  const [votes, setVotes] = useState({});
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVotes()
      .then(data => {
        const fixedVotes = {};
        photoList.forEach(photo => {
          fixedVotes[photo] = {
            stars: data[photo]?.stars || 0,
            flaco: !!data[photo]?.flaco,
            gustaria: !!data[photo]?.gustaria,
            comment: data[photo]?.comment || ""
          };
        });
        setVotes(fixedVotes);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert('Errore nel caricamento voti: ' + err.message);
      });
  }, []);

  const updateVotes = (newVotes) => {
    setVotes(newVotes);
    saveVotes(newVotes);
  };

  const handleVote = (photo, stars) => {
    console.log(`Voto cambiato per ${photo}: ${stars} stelle`);
    const newVotes = { ...votes, [photo]: { ...votes[photo], stars } };
    setVotes(newVotes);
    saveVotes(newVotes);
  };
  const handleCheck = (photo, key, checked) => {
    console.log(`Checkbox cambiata per ${photo}: ${key} = ${checked}`);
    const newVotes = { ...votes, [photo]: { ...votes[photo], [key]: checked } };
    setVotes(newVotes);
    saveVotes(newVotes);
  };
  const handleComment = (photo, comment) => {
    console.log(`Commento cambiato per ${photo}: ${comment}`);
    const newVotes = { ...votes, [photo]: { ...votes[photo], comment } };
    setVotes(newVotes);
  };
  const handleCommentBlur = (photo) => {
    saveVotes(votes);
  };

  const openModal = (photo) => setModal(photo);
  const closeModal = () => setModal(null);

  if (loading) return <div className="album-outer"><div>Caricamento voti...</div></div>;

  return (
    <div className="album-outer">
      <div className="album-grid">
        {photoList.map(photo => (
          <div className="album-card" key={photo}>
            <img
              src={`/photos/${photo}`}
              alt="photo"
              className="album-photo"
              onClick={() => openModal(photo)}
            />
            <div className="album-excita-label">Me excita:</div>
            <div className="album-stars">
              {[1,2,3,4,5].map(n => (
                <Star
                  key={n}
                  filled={votes[photo]?.stars >= n}
                  onClick={() => handleVote(photo, n)}
                />
              ))}
            </div>
            <label className="album-check">
              <input
                type="checkbox"
                checked={!!votes[photo]?.flaco}
                onChange={e => handleCheck(photo, 'flaco', e.target.checked)}
              />
              El ya lo hace igual
            </label>
            <label className="album-check">
              <input
                type="checkbox"
                checked={!!votes[photo]?.gustaria}
                onChange={e => handleCheck(photo, 'gustaria', e.target.checked)}
              />
              Me gustaría probar
            </label>
            <textarea
              className="album-comment"
              placeholder="O comenta lo que te excita o lo que no te gusta!"
              value={votes[photo]?.comment || ''}
              onChange={e => handleComment(photo, e.target.value)}
              onBlur={() => handleCommentBlur(photo)}
            />
          </div>
        ))}
      </div>
      {modal && (
        <div className="album-modal-bg" onClick={closeModal}>
          <div className="album-modal" onClick={e => e.stopPropagation()}>
            <img src={`/photos/${modal}`} alt="photo" className="album-modal-photo album-modal-photo-large" />
            <div className="album-excita-label modal-excita-label">Me excita:</div>
            <div className="album-stars modal-stars">
              {[1,2,3,4,5].map(n => (
                <Star
                  key={n}
                  filled={votes[modal]?.stars >= n}
                  onClick={() => handleVote(modal, n)}
                />
              ))}
            </div>
            <label className="album-check modal-check">
              <input
                type="checkbox"
                checked={!!votes[modal]?.flaco}
                onChange={e => handleCheck(modal, 'flaco', e.target.checked)}
              />
              Flaco ya lo hace igual
            </label>
            <label className="album-check modal-check">
              <input
                type="checkbox"
                checked={!!votes[modal]?.gustaria}
                onChange={e => handleCheck(modal, 'gustaria', e.target.checked)}
              />
              Me gustaría probar
            </label>
            <textarea
              className="album-comment modal-comment"
              placeholder="O comenta lo que te excita o lo que no te gusta!"
              value={votes[modal]?.comment || ''}
              onChange={e => handleComment(modal, e.target.value)}
              onBlur={() => handleCommentBlur(modal)}
            />
            <button className="album-modal-close" onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
} 