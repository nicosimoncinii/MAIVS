"use client";

import { useState, useEffect } from "react";

const reportPages = [
  {
    id: "evaluation",
    label: "Valutazione",
    number: "01",
    title: "Clinical AI Visibility Check",
    subtitle: "Parametri consultati prima del risultato",
    score: null,
    rows: [
      ["Presenza locale", "Google Business, mappe, dati NAP"],
      ["Reputazione", "Recensioni, tono, frequenza"],
      ["Sito", "Servizi, struttura, aree trattate"],
      ["Fonti", "Citazioni locali e segnali pubblici"]
    ],
    sideTitle: "Competitor rilevati",
    sideRows: [
      ["Clinica Nova Salute", "68/100"],
      ["Studio Medico Armonia", "61/100"],
      ["Centro Specialistico Verdi", "57/100"]
    ],
    footerLabel: "Fonti consultate",
    footerValue: "Mappe, recensioni, sito, fonti locali",
    note: "La prima fase mostra quali segnali pubblici sono stati letti e quali competitor risultano piu riconoscibili."
  },
  {
    id: "result",
    label: "Risultato",
    number: "02",
    title: "AI Visibility Result",
    subtitle: "Punteggio globale della clinica",
    score: 42,
    rows: [
      ["ChatGPT", "39%"],
      ["Gemini", "44%"],
      ["Perplexity", "41%"]
    ],
    sideTitle: "Indicatori principali",
    sideRows: [
      ["Presenza locale", "37/100"],
      ["Chiarezza sito", "51/100"],
      ["Coerenza fonti", "39/100"]
    ],
    footerLabel: "Interpretazione",
    footerValue: "Visibilita presente ma ancora debole",
    note: "La clinica ha una presenza digitale reale, ma ancora poco chiara nei punti che aiutano un paziente a scegliere."
  },
  {
    id: "improve",
    label: "Miglioralo",
    number: "03",
    title: "Improvement Prescription",
    subtitle: "Azioni consigliate per aumentare autorevolezza",
    score: null,
    rows: [
      ["Priorita 01", "Pagine trattamento piu specifiche"],
      ["Priorita 02", "Prove di fiducia piu evidenti"],
      ["Priorita 03", "Dati pubblici coerenti"],
      ["Priorita 04", "Struttura web piu solida"]
    ],
    sideTitle: "Direzione suggerita",
    sideRows: [
      ["Sito", "Riorganizzare"],
      ["Contenuti", "Rendere verificabili"],
      ["Conversione", "Semplificare percorsi"]
    ],
    footerLabel: "Priorita",
    footerValue: "Rendere il sito piu chiaro prima di aumentare traffico",
    note: "Prima di aumentare campagne o traffico, conviene rendere il sito piu chiaro, misurabile e coerente."
  }
];

function ReportIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" style={{ stroke: '#d4af37', fill: 'none', strokeWidth: 2 }}>
      <path d="M18 50V18h28v32" />
      <path d="M24 50V28h16v22" />
      <path d="M28 24h8" />
      <path d="M32 20v8" />
      <path d="M14 50h36" />
      <path d="M24 34h3M37 34h3M24 40h3" />
    </svg>
  );
}

export function MedicalA4Reports() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Only cycle on mobile
    if (window.innerWidth > 1024) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reportPages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .a4-container {
          position: relative;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          overflow: hidden;
          padding: 40px 0;
        }
        
        .a4-deck-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          position: relative;
        }

        .a4-deck-card {
          position: relative;
          background: #fff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border-radius: 8px;
        }

        /* Desktop STATIC blur (no cycling) */
        @media (min-width: 1025px) {
          .a4-deck-card:nth-child(2) {
            filter: blur(2px);
            pointer-events: none;
            user-select: none;
          }
          .a4-deck-card:nth-child(3) {
            filter: blur(5px);
            opacity: 0.8;
            pointer-events: none;
            user-select: none;
          }
          .unlock-overlay-mobile {
            display: none !important;
          }
        }

        /* Desktop CTA Overlay on the right side */
        .unlock-overlay-desktop {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 66%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,1) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          text-align: center;
          z-index: 20;
          pointer-events: none;
        }
        
        .unlock-overlay-desktop *, .unlock-overlay-mobile * {
          pointer-events: auto;
        }

        /* MOBILE DECK OF CARDS */
        @media (max-width: 1024px) {
          .a4-container {
            padding: 20px 0 0 0;
          }
          
          .unlock-overlay-desktop {
            display: none !important;
          }
          
          .a4-deck-wrapper {
            display: block;
            height: 700px;
            margin: 0 auto;
          }

          .a4-deck-card {
            position: absolute;
            left: 50%;
            width: 100%;
            max-width: 500px;
            transform-origin: center top;
            transition: transform 1.5s ease-in-out, filter 1.5s ease-in-out, opacity 1.5s ease-in-out;
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          }

          /* Ensure cards stick out to the sides visibly */
          .position-0 {
            z-index: 3;
            transform: translateX(-50%) translateY(0) scale(1);
            filter: none;
            opacity: 1;
          }
          .position-1 {
            z-index: 2;
            /* Shift right heavily so it peeks out visibly */
            transform: translateX(-43%) translateY(15px) scale(0.95) rotate(5deg);
            filter: blur(3px);
            opacity: 0.9;
            pointer-events: none;
            user-select: none;
          }
          .position-2 {
            z-index: 1;
            /* Shift left heavily so it peeks out visibly */
            transform: translateX(-57%) translateY(30px) scale(0.9) rotate(-5deg);
            filter: blur(6px);
            opacity: 0.8;
            pointer-events: none;
            user-select: none;
          }

          .unlock-overlay-mobile {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            right: 0;
            height: 250px; /* Reduced height so it doesn't swallow the cards */
            background: linear-gradient(to top, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding: 20px;
            text-align: center;
            z-index: 20;
            pointer-events: none;
          }
        }

        @media (max-width: 480px) {
          .a4-deck-card {
            max-width: 90vw;
          }
          /* Adjust side peeking for small phones */
          .position-1 {
            transform: translateX(-40%) translateY(15px) scale(0.92) rotate(4deg);
          }
          .position-2 {
            transform: translateX(-60%) translateY(30px) scale(0.88) rotate(-4deg);
          }
        }
      `}</style>
      
      <section className="report-phases-section" id="sample-report">
        <div className="report-section-mini-heading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'center' }}>
          <span style={{ color: '#d4af37', letterSpacing: '0.2em', fontWeight: 'bold', fontSize: '0.9rem' }}>REPORT COMPLETO</span>
          <h2 style={{ fontSize: '2.5rem', margin: '10px 0', color: '#111' }}>Esempio di Analisi MAIVS</h2>
          <p style={{ maxWidth: '600px', color: '#666' }}>Esplora il nostro referto cartaceo digitale. I dati completi sono riservati.</p>
        </div>

        <div className="a4-container">
          
          <div className="a4-deck-wrapper">
            {reportPages.map((page, index) => {
              // On desktop, the classes position-0, position-1, position-2 are ignored by CSS.
              // So activeIndex cycling has zero visual effect on desktop layout.
              const position = (index - activeIndex + reportPages.length) % reportPages.length;

              return (
                <article 
                  className={`a4-report-page a4-deck-card position-${position}`}
                  key={page.id}
                >
                  <div className="a4-paper-fold" aria-hidden="true" />
                  <header className="a4-report-header" style={{ padding: '20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#111', display: 'block' }}>MAIVS</strong>
                      <span style={{ color: '#d4af37' }}>{page.label}</span>
                    </div>
                    <small style={{ fontSize: '2rem', color: '#f0f0f0', fontWeight: 'bold' }}>{page.number}</small>
                  </header>

                  <div className="a4-title-block" style={{ padding: '20px' }}>
                    <span style={{ color: '#666', fontSize: '0.85rem', textTransform: 'uppercase' }}>Cartella clinica digitale</span>
                    <h3 style={{ margin: '5px 0', color: '#111' }}>{page.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>{page.subtitle}</p>
                  </div>

                  <div className="a4-clinic-row" style={{ display: 'flex', padding: '0 20px 20px', gap: '15px', alignItems: 'center' }}>
                    <div className="a4-icon" style={{ width: '40px', height: '40px' }}>
                      <ReportIcon />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#111' }}>Clinica Estetica Milano</strong>
                      <span style={{ color: '#888', fontSize: '0.85rem' }}>#AI-260519-CE-MI</span>
                    </div>
                  </div>

                  <div className="a4-main-area" style={{ padding: '0 20px', flex: 1 }}>
                    {page.score ? (
                      <div className="a4-score-box" style={{ background: '#fafafa', padding: '20px', borderRadius: '8px', border: '1px solid #f0f0f0', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: '#666', fontSize: '0.85rem' }}>AI Visibility Score</span>
                          <div>
                            <strong style={{ fontSize: '3rem', color: '#d4af37' }}>{page.score}</strong>
                            <small style={{ color: '#888' }}>/100</small>
                          </div>
                        </div>
                        <i aria-hidden="true" style={{ display: 'block', height: '4px', background: '#e5e7eb', borderRadius: '2px', marginTop: '10px' }}>
                          <b style={{ display: 'block', height: '100%', background: '#d4af37', width: `${page.score}%`, borderRadius: '2px' }} />
                        </i>
                      </div>
                    ) : (
                      <div className="a4-note-box" style={{ background: '#fafafa', padding: '15px', borderRadius: '8px', border: '1px solid #f0f0f0', marginBottom: '20px' }}>
                        <span style={{ color: '#d4af37', fontSize: '0.85rem', fontWeight: 'bold' }}>Analisi</span>
                        <p style={{ margin: '5px 0 0', color: '#444', fontSize: '0.9rem', lineHeight: 1.5 }}>{page.note}</p>
                      </div>
                    )}

                    <div className="a4-table">
                      <span className="a4-section-label" style={{ color: '#d4af37', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>
                        {page.score ? "Visibility by platform" : "Report parameters"}
                      </span>
                      {page.rows.map(([label, value]) => (
                        <div key={`${label}-${value}`} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e5e7eb', paddingBottom: '8px', marginBottom: '8px' }}>
                          <b style={{ color: '#333', fontSize: '0.9rem' }}>{label}</b>
                          <span style={{ color: '#666', fontSize: '0.9rem', textAlign: 'right' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <aside className="a4-side-box" style={{ padding: '20px', background: '#fafafa', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ color: '#d4af37', fontSize: '0.85rem', display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>{page.sideTitle}</span>
                    {page.sideRows.map(([label, value]) => (
                      <div key={`${label}-${value}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <b style={{ color: '#333', fontSize: '0.85rem' }}>{label}</b>
                        <em style={{ color: '#666', fontSize: '0.85rem', fontStyle: 'normal' }}>{value}</em>
                      </div>
                    ))}
                  </aside>

                  <footer className="a4-footer-note" style={{ padding: '20px', background: 'transparent' }}>
                    <div style={{ marginBottom: '5px' }}>
                      <span style={{ color: '#666', fontSize: '0.85rem', display: 'block' }}>{page.footerLabel}</span>
                      <b style={{ color: '#111', fontSize: '0.9rem' }}>{page.footerValue}</b>
                    </div>
                    <p style={{ color: '#888', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>{page.note}</p>
                  </footer>
                </article>
              );
            })}
          </div>
          
          <div className="unlock-overlay-desktop">
            <h3 style={{ fontSize: '2rem', color: '#111', marginBottom: '15px' }}>Sblocca il report completo</h3>
            <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>
              Richiedi l'analisi completa della tua clinica per scoprire il punteggio esatto e il piano d'azione dettagliato.
            </p>
            <a href="#" className="button" style={{ 
              background: '#d4af37', 
              color: '#fff', 
              padding: '15px 30px', 
              borderRadius: '8px', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              fontSize: '1.1rem',
              boxShadow: '0 10px 20px rgba(212, 175, 55, 0.3)'
            }}>
              Richiedi Analisi Gratuita
            </a>
          </div>

          <div className="unlock-overlay-mobile">
            <a href="#" className="button" style={{ 
              background: '#d4af37', 
              color: '#fff', 
              padding: '15px 30px', 
              borderRadius: '8px', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              fontSize: '1.1rem',
              boxShadow: '0 10px 20px rgba(212, 175, 55, 0.3)',
              marginBottom: '20px'
            }}>
              Richiedi Analisi Gratuita
            </a>
          </div>

        </div>
      </section>
    </>
  );
}

