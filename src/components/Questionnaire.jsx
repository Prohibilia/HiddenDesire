import React, { useState, useEffect } from 'react';
import './PhotoAlbum.css';

const disclaimer = `🌿 Aviso de consentimiento y seguridad\n¡Bienvenida! Este cuestionario está diseñado para ayudarte a descubrir y reflexionar sobre aspectos más profundos de tu sumisión.\n👉 Esto es solo una herramienta de autoexploración.`;

const questions = [
  {
    section: '1️⃣ Identidad y experiencias previas',
    items: [
      { type: 'text', label: '¿Cómo describirías tu identidad erótica? (por ejemplo: para nada sumisa, poco sumisa, muy sumisa, esclava, curiosa, otra).' },
      { type: 'text', label: '¿Has tenido ya experiencias reales de sumisión? Si es así, cuéntanos brevemente las más significativas.' },
      { type: 'stars', label: '¿Qué tan cómoda te sientes al recibir órdenes y ceder el control? (1-5).' },
    ],
  },
  {
    section: '2️⃣ Rituales de entrega y pertenencia',
    items: [
      { type: 'stars', label: 'Ser presentada a tu dominante con un collar.' },
      { type: 'stars', label: 'Ser declarada "propiedad" a través de un ritual simbólico.' },
      { type: 'stars', label: 'Tener que pedir permiso para explotar.' },
      { type: 'stars', label: 'Saber que él tiene el "derecho total de uso" sobre ti.' },
      { type: 'stars', label: 'Aceptar castigos en caso de desobediencia.' },
      { type: 'text', label: 'Comentario libre: ¿Qué emociones te provocan estos rituales? ¿Te atraen o te intimidan?' },
    ],
  },
  {
    section: '3️⃣ Entrenamiento físico',
    items: [
      { type: 'stars', label: 'Preparación anal y dilatación progresiva.' },
      { type: 'stars', label: '¿Te gusta sentirte dilatada por el amo que prepara tu hueco como le gusta a él?' },
      { type: 'stars', label: 'Estimulación intensa de los pezones.' },
      { type: 'stars', label: '¿Te calienta un dolor intenso pero breve en los pezones, seguido por caricias y besos?' },
      { type: 'stars', label: 'Entrenamiento de la garganta profunda (deepthroat).' },
      { type: 'stars', label: 'Trabajar tu vulva para acostumbrarla a largas sesiones de placer o uso.' },
      { type: 'stars', label: '¿Cómo te calienta que sea trabajada tu vulva para ser mejor usada?' },
      { type: 'text', label: 'Comentario libre: ¿Cómo te hace sentir la idea de ser "adiestrada" físicamente para que seas más usable por el amo?' },
    ],
  },
  {
    section: '4️⃣ Bondage e inmovilización',
    items: [
      { type: 'stars', label: 'Ser atada con cuerdas (shibari).' },
      { type: 'stars', label: 'Inmovilización completa (manos y pies).' },
      { type: 'stars', label: 'Antifaces o vendas para tapar la vista.' },
      { type: 'stars', label: 'Ser usada como mesa, por ejemplo, que tu amo pueda comer sushi usando tu panza como mesita.' },
      { type: 'text', label: 'Comentario libre: ¿Qué papel juega la restricción para ti? ¿Es más excitante o más angustiante? ¿O de qué forma te calienta?' },
    ],
  },
  {
    section: '5️⃣ Castigos y disciplina',
    items: [
      { type: 'stars', label: 'Spanking manual.' },
      { type: 'stars', label: 'Fusta o paddle.' },
      { type: 'stars', label: 'Castigos verbales o humillación suave.' },
      { type: 'stars', label: 'Privación del placer (edging, negación del orgasmo).' },
      { type: 'text', label: 'Comentario libre: ¿Qué tipo de castigo te hace sentir más sumisa?' },
    ],
  },
  {
    section: '6️⃣ Uso de objetos y control físico',
    items: [
      { type: 'stars', label: '¿Te calienta que el amo te mande a llevar plugs anales o vaginales?' },
      { type: 'stars', label: 'Que use plugs o vibradores controlados a distancia.' },
      { type: 'stars', label: 'Sexo anal "fuerte" y controlado.' },
      { type: 'stars', label: 'Llevar un plug en público, debajo de la ropa, como señal de marcación del amo.' },
      { type: 'text', label: 'Comentario libre: ¿Cuál es el límite que sientes que quieres explorar aquí?' },
    ],
  },
  {
    section: '7️⃣ Lenguaje y humillación',
    items: [
      { type: 'stars', label: '¿Cuánto te calienta que te digan: "Prepara bien el culo que te voy a romper como te gusta"?' },
      { type: 'stars', label: '¿Cuánto te calienta que te digan: "Hoy voy a trabajarte el culo y la concha a fondo"?' },
      { type: 'stars', label: '¿Cuánto te calienta que te digan: "Prepárate en posición para ser usada"?' },
      { type: 'stars', label: '¿Cuánto te calienta que te digan: "Abre este culo y sé una perra obediente o te lo rompo más"?' },
    ],
  },
  {
    section: '8️⃣ Roles y escenarios',
    items: [
      { type: 'stars', label: 'Daddy/little girl' },
      { type: 'stars', label: 'Amo/esclava' },
      { type: 'stars', label: 'Maestro/alumna' },
      { type: 'stars', label: 'Policía/detenida' },
      { type: 'stars', label: 'Otro (especifica).' },
      { type: 'text', label: 'Comentario libre: ¿Qué escenario sientes más cercano a ti?' },
    ],
  },
  {
    section: '9️⃣ Posiciones y situaciones que te calientan',
    items: [
      { type: 'stars', label: 'Ser preparada con culo y concha expuestos y levantados para sentirte más usable.' },
      { type: 'stars', label: '¿Penetración del culo sin mucha preparación (hecha por un amo experto que conoce tus límites y cuánto te gusta que te duela para sentirte más tomada y luego explotar)?' },
      { type: 'stars', label: '¿Te calienta la idea de ser llenada en culo y concha con plug y vibrador por el amo mientras estás expuesta y ser trabajada hasta que explotes?' },
    ],
  },
  {
    section: '🔟 Aftercare y necesidad de contención',
    items: [
      { type: 'stars', label: 'Después de una experiencia intensa, ¿necesitas caricias y palabras dulces o prefieres seguir en la energía más fuerte?' },
      { type: 'text', label: '¿Qué tipo de aftercare te hace sentir más protegida y completa?' },
    ],
  },
  {
    section: 'Necesidad de envolvimiento sentimental',
    items: [
      { type: 'text', label: 'Con un amo hábil, que sabe trabajarte bien dentro de tus limites, ¿puedes llegar al orgasmo fuerte si te trabaja bien con la justa intensidad y mando o necesitas necesariamente un involucramiento sentimental? Comenta.' },
    ],
  },
  {
    section: '🌿✨ Sección de evaluación del cuestionario',
    items: [
      { type: 'text', label: '¿Te parece adecuado para valorar el perfil de una sumisa?' },
      { type: 'text', label: '¿Te ha resultado demasiado fuerte o intenso en algunas preguntas?' },
      { type: 'text', label: '¿Faltan preguntas o prácticas que personalmente te calientan o te gustaría explorar?' },
      { type: 'text', label: '¿El lenguaje utilizado te resulta cómodo y excitante, o lo cambiarías para sentirte más cómoda y natural?' },
      { type: 'text', label: '📝 Escribe aquí en detalle lo que cambiarías, añadirías, etc.' },
    ],
  },
];

function Star5({ filled, onClick }) {
  return (
    <span className={filled ? 'star star-filled' : 'star'} onClick={onClick}>
      ★
    </span>
  );
}

async function fetchQuestionnaire() {
  const res = await fetch('/.netlify/functions/questionnaire');
  if (!res.ok) return {};
  return await res.json();
}
async function saveQuestionnaire(answers) {
  await fetch('/.netlify/functions/questionnaire', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers),
  });
}

export default function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const [report, setReport] = useState('');
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    fetchQuestionnaire().then(data => setAnswers(data));
  }, []);

  const handleStars = (qIdx, iIdx, value) => {
    setAnswers(a => {
      const updated = {
        ...a,
        [`${qIdx}_${iIdx}`]: { ...a[`${qIdx}_${iIdx}`], stars: value }
      };
      saveQuestionnaire(updated);
      return updated;
    });
  };
  const handleText = (qIdx, iIdx, value) => {
    setAnswers(a => {
      const updated = {
        ...a,
        [`${qIdx}_${iIdx}`]: { ...a[`${qIdx}_${iIdx}`], text: value }
      };
      saveQuestionnaire(updated);
      return updated;
    });
  };

  const generateReport = () => {
    let txt = '';
    questions.forEach((section, qIdx) => {
      txt += `=== ${section.section} ===\n`;
      section.items.forEach((item, iIdx) => {
        txt += `\nQ: ${item.label}\n`;
        if (item.type === 'stars') {
          const stars = answers[`${qIdx}_${iIdx}`]?.stars;
          txt += `Voto: ${stars ? stars + ' stelle' : 'Nessun voto'}\n`;
        }
        const comment = answers[`${qIdx}_${iIdx}`]?.text;
        if (comment) {
          txt += `Commento: ${comment}\n`;
        }
      });
      txt += '\n';
    });
    setReport(txt);
    setShowReport(true);
  };

  const saveReport = () => {
    const blob = new Blob([report], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Questionario.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="album-outer" style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={generateReport} style={{ marginBottom: 18, alignSelf: 'flex-start', fontFamily: 'Cinzel', fontWeight: 700, fontSize: '1.08rem', background: '#181313', color: '#d4af37', border: '2px solid #d4af37', borderRadius: 8, padding: '0.6em 1.2em', cursor: 'pointer' }}>Genera report</button>
      {showReport && (
        <div style={{ width: '100%', marginBottom: 24 }}>
          <textarea
            style={{ width: '100%', minHeight: 220, fontSize: '1.01rem', fontFamily: 'monospace', background: '#222', color: '#d4af37', border: '1.5px solid #d4af37', borderRadius: 8, marginBottom: 8, padding: '1em' }}
            value={report}
            readOnly
          />
          <button onClick={saveReport} style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: '1.01rem', background: '#181313', color: '#d4af37', border: '2px solid #d4af37', borderRadius: 8, padding: '0.5em 1.1em', cursor: 'pointer' }}>Salva come file</button>
        </div>
      )}
      <div className="album-card" style={{ marginBottom: 32, background: '#181313', border: '2px solid #d4af37', color: '#d4af37', fontFamily: 'Cinzel', fontSize: '1.08rem', padding: '2.2rem 1.5rem', textAlign: 'left', whiteSpace: 'pre-line', width: '100%' }}>
        {disclaimer}
      </div>
      {questions.map((q, qIdx) => (
        <div key={q.section} className="album-card" style={{ marginBottom: 32, width: '100%' }}>
          <div className="album-excita-label" style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.7rem' }}>{q.section}</div>
          {q.items.map((item, iIdx) => (
            <div key={iIdx} style={{ marginBottom: 18, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: '#d4af37', fontFamily: 'Cinzel', fontSize: '1.01rem', marginBottom: 4, textAlign: 'center', width: '100%' }}>{item.label}</div>
              {item.type === 'stars' && (
                <div style={{ margin: '0.3rem 0 0.7rem 0', fontSize: '1.5rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
                  {[1,2,3,4,5].map(n => (
                    <Star5
                      key={n}
                      filled={answers[`${qIdx}_${iIdx}`]?.stars >= n}
                      onClick={() => handleStars(qIdx, iIdx, n)}
                    />
                  ))}
                </div>
              )}
              {(item.type === 'stars' || item.type === 'text') && (
                <textarea
                  className="album-comment"
                  style={{ marginTop: 8, minHeight: 40, fontSize: '0.92rem', width: '100%', boxSizing: 'border-box', display: 'block' }}
                  placeholder="Importante: aquí tu comentario. ¿Cómo te gustaría...?"
                  value={answers[`${qIdx}_${iIdx}`]?.text || ''}
                  onChange={e => handleText(qIdx, iIdx, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}