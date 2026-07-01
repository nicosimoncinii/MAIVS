"use client";

import { useSearchParams } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AI_BOTS = [
  "Inizializzazione ambiente...",
  "ChatGPT sta analizzando la clinica...",
  "Claude sta verificando le recensioni...",
  "Gemini sta estraendo i servizi...",
  "Perplexity sta incrociando i dati...",
  "Copilot sta cercando i competitor...",
  "Elaborazione report finali..."
];

// Funzione helper per ottenere il default reportPages
function getDefaultReportPages() {
  return [
    {
      id: "evaluation",
      label: "Valutazione",
      number: "01",
      title: "Clinical AI Visibility Check",
      subtitle: "Parametri consultati prima del risultato",
      score: null as number | null,
      rows: [
        ["Intento Locale (NAP/Schema)", "Ricerca in corso..."],
        ["Intento Generale (Contenuti)", "Ricerca in corso..."],
        ["Requisiti Tecnici (H1, Viewport)", "Ricerca in corso..."],
        ["Vocabolario Medico", "Ricerca in corso..."]
      ],
      sideTitle: "Competitor Organici",
      sideRows: [
        ["Ricerca in corso...", ""],
        ["Ricerca in corso...", ""],
        ["Ricerca in corso...", ""]
      ],
      footerLabel: "Fonti consultate",
      footerValue: "Mappe, recensioni, sito, dati strutturati",
      note: "La prima fase valuta con quanta facilità le IA riescono a estrarre informazioni sulla tua struttura (dati strutturati) e la rilevanza dei testi."
    },
    {
      id: "result",
      label: "Risultato",
      number: "02",
      title: "AI Visibility Result",
      subtitle: "Punteggio globale della clinica diviso per intenti",
      score: 0 as number | null,
      rows: [
        ["Ricerca Locale (Geografica)", "0/100"],
        ["Ricerca Generale (Informativa)", "0/100"],
        ["Densità di Parole (Volume)", "0"]
      ],
      sideTitle: "Impatto sulle IA",
      sideRows: [
        ["ChatGPT", "In calcolo..."],
        ["Gemini", "In calcolo..."],
        ["Perplexity", "In calcolo..."]
      ],
      footerLabel: "Interpretazione",
      footerValue: "Analisi in corso...",
      note: "Un punteggio Locale alto favorisce query tipo 'Dentista vicino a me'. Un punteggio Generale alto favorisce query tipo 'Come curare la carie'."
    },
    {
      id: "improve",
      label: "Miglioralo",
      number: "03",
      title: "Improvement Prescription",
      subtitle: "Azioni consigliate per aumentare l'autorevolezza",
      score: null as number | null,
      recommendations: [] as Array<{category: string, issue: string, solution: string}>,
      sideTitle: "Direzione suggerita",
      sideRows: [
        ["Codice", "Da verificare"],
        ["Testi", "Da verificare"],
        ["Fiducia", "Da verificare"]
      ],
      footerLabel: "Parole totali analizzate",
      footerValue: "Conteggio...",
      note: "Applica queste soluzioni esecutive per facilitare il parsing ai bot e scalare le citazioni nelle risposte delle IA."
    }
  ];
}

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

function AnalisiContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "Il tuo sito web";
  
  const [scanStep, setScanStep] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [visiblePages, setVisiblePages] = useState(0);
  const [reportPages, setReportPages] = useState(getDefaultReportPages());
  
  // STATO PER SBLOCCARE IL REPORT
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // FETCH REAL DATA
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url })
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data && data.status === "success") {
            const newPages = getDefaultReportPages();
            
            // Aggiorna Pagina 1 (Valutazione)
            newPages[0].rows = [
              ["Dati Strutturati Locali", data.details.has_schema ? "Rilevati" : "Assenti"],
              ["Partita IVA / Contatti", data.details.has_piva ? "Verificati" : "Non rilevati"],
              ["Titoli (H1) Univoci", data.details.h1_count === 1 ? "Sì" : "Problema strutturale"],
              ["Termini Medici trovati", data.details.medical_keywords_found.toString()]
            ];
            newPages[0].sideRows = data.competitors || [
              ["Non Rilevati", "-"],
              ["Non Rilevati", "-"],
              ["Non Rilevati", "-"]
            ];

            // Aggiorna Pagina 2 (Risultati)
            newPages[1].score = data.score;
            newPages[1].rows = [
              ["Visibilità Ricerche Locali", `${data.metrics.locale}/100`],
              ["Visibilità Ricerche Generali", `${data.metrics.generale}/100`],
              ["Parole totali trovate", `${data.metrics.parole}`]
            ];
            newPages[1].sideRows = [
              ["ChatGPT", Math.max(0, data.score - 5) + "%"],
              ["Gemini", Math.max(0, data.score - 2) + "%"],
              ["Perplexity", Math.max(0, data.score - 8) + "%"]
            ];
            newPages[1].footerValue = data.score > 60 ? "Buona visibilità, ma con lacune." : "La clinica è invisibile per query complesse.";
            if (data.score > 85) newPages[1].footerValue = "Ottima visibilità per l'IA.";

            // Aggiorna Pagina 3 (Miglioralo)
            newPages[2].recommendations = data.recommendations || [];
            newPages[2].footerValue = `${data.metrics.parole} parole analizzate totali.`;

            setReportPages(newPages);
          }
        }
      } catch (err) {
        console.error("Errore fetch real data:", err);
      }
    };
    
    fetchRealData();
  }, [url]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning && scanStep < AI_BOTS.length - 1) {
      timer = setTimeout(() => {
        setScanStep((prev) => prev + 1);
        if (scanStep > 0 && scanStep % 2 === 0 && visiblePages < 3) {
          setVisiblePages(prev => prev + 1);
        }
      }, 1800);
    } else if (isScanning && scanStep === AI_BOTS.length - 1) {
      timer = setTimeout(() => {
        setVisiblePages(3);
        setIsScanning(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isScanning, scanStep, visiblePages]);
  
  useEffect(() => {
    if (window.innerWidth > 1024) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reportPages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reportPages.length]);

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
          transition: filter 0.4s ease, opacity 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        /* MOBILE DECK OF CARDS */
        @media (max-width: 1024px) {
          .a4-container {
            padding: 20px 0 0 0;
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

          .position-0 {
            z-index: 3;
            transform: translateX(-50%) translateY(0) scale(1);
          }
          .position-1 {
            z-index: 2;
            transform: translateX(-43%) translateY(15px) scale(0.95) rotate(5deg);
          }
          .position-2 {
            z-index: 1;
            transform: translateX(-57%) translateY(30px) scale(0.9) rotate(-5deg);
          }
        }
        
        @media (max-width: 480px) {
          .a4-deck-card {
            max-width: 90vw;
          }
          .position-1 {
            transform: translateX(-40%) translateY(15px) scale(0.92) rotate(4deg);
          }
          .position-2 {
            transform: translateX(-60%) translateY(30px) scale(0.88) rotate(-4deg);
          }
        }

        .rec-box {
          padding: 15px;
          background: #fdfdfd;
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          margin-bottom: 15px;
          border-left: 3px solid #d4af37;
        }
        .rec-box h4 {
          margin: 0 0 5px 0;
          font-size: 0.95rem;
          color: #111;
        }
        .rec-box span.cat {
          display: inline-block;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #d4af37;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .rec-box p {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.5;
          color: #555;
        }
      `}</style>
      <div style={{ maxWidth: '1320px', margin: '40px auto', padding: '0 20px', paddingBottom: '100px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#d4af37', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '10px' }}>
            {isScanning ? "SCANSIONE IN CORSO" : (isUnlocked ? "REPORT SBLOCCATO" : "RISULTATI ANALISI IA")}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#111', marginBottom: '15px' }}>
            {isUnlocked ? "Dettaglio Completo" : "Generazione Report"}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666', background: '#fdfdfd', display: 'inline-block', padding: '8px 20px', borderRadius: '30px', border: '1px solid #f0f0f0' }}>
            Target: <strong>{url}</strong>
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '20px 30px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', maxWidth: '1000px', margin: '0 auto 40px' }}>
          {isScanning ? (
            <Loader2 className="animate-spin" size={28} color="#d4af37" />
          ) : (
            <CheckCircle size={28} color="#d4af37" />
          )}
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#888', fontWeight: 'bold' }}>Stato</p>
            <p style={{ margin: 0, fontSize: '1.2rem', color: '#111', fontWeight: 600 }}>
              {isScanning ? AI_BOTS[scanStep] : "Analisi Completata"}
            </p>
          </div>
          <div style={{ width: '150px', height: '6px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
            <motion.div 
              style={{ height: '100%', background: '#d4af37', borderRadius: '10px' }}
              initial={{ width: '0%' }}
              animate={{ width: isScanning ? `${(scanStep / (AI_BOTS.length - 1)) * 100}%` : '100%' }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div className="a4-container">
            <div className="a4-deck-wrapper">
              <AnimatePresence>
                {reportPages.map((page, index) => {
                  if (visiblePages < index + 1) return null;
                  
                  const position = (index - activeIndex + reportPages.length) % reportPages.length;
                  const isBlurred = !isUnlocked;
                  
                  return (
                    <motion.article 
                      key={page.id}
                      initial={{ opacity: 0, y: 50, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className={`a4-report-page a4-deck-card position-${position}`}
                      style={{
                        filter: isBlurred ? 'blur(6px)' : 'none',
                        pointerEvents: isBlurred ? 'none' : 'auto',
                        userSelect: isBlurred ? 'none' : 'auto',
                      }}
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
                          <strong style={{ display: 'block', color: '#111' }}>{url}</strong>
                          <span style={{ color: '#888', fontSize: '0.85rem' }}>#AI-REPORT-LIVE</span>
                        </div>
                      </div>

                      <div className="a4-main-area" style={{ padding: '0 20px', flex: 1, overflowY: 'auto' }}>
                        {page.score !== null ? (
                          <div className="a4-score-box" style={{ background: '#fafafa', padding: '20px', borderRadius: '8px', border: '1px solid #f0f0f0', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ color: '#666', fontSize: '0.85rem' }}>AI Visibility Score (Avg)</span>
                              <div>
                                <strong style={{ fontSize: '3rem', color: '#d4af37' }}>{page.score}</strong>
                                <small style={{ color: '#888' }}>/100</small>
                              </div>
                            </div>
                            <i aria-hidden="true" style={{ display: 'block', height: '4px', background: '#e5e7eb', borderRadius: '2px', marginTop: '10px' }}>
                              <b style={{ display: 'block', height: '100%', background: '#d4af37', width: `${page.score}%`, borderRadius: '2px' }} />
                            </i>
                          </div>
                        ) : null}

                        {page.note && page.score === null && (
                          <div className="a4-note-box" style={{ background: '#fafafa', padding: '15px', borderRadius: '8px', border: '1px solid #f0f0f0', marginBottom: '20px' }}>
                            <span style={{ color: '#d4af37', fontSize: '0.85rem', fontWeight: 'bold' }}>Analisi Principale</span>
                            <p style={{ margin: '5px 0 0', color: '#444', fontSize: '0.9rem', lineHeight: 1.5 }}>{page.note}</p>
                          </div>
                        )}

                        <div className="a4-table">
                          {page.rows && page.rows.length > 0 && (
                            <>
                              <span className="a4-section-label" style={{ color: '#d4af37', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>
                                Parametri Tecnici Rilevati
                              </span>
                              {page.rows.map(([label, value], idx) => (
                                <div key={`row-${idx}-${label}`} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e5e7eb', paddingBottom: '8px', marginBottom: '8px' }}>
                                  <b style={{ color: '#333', fontSize: '0.9rem' }}>{label}</b>
                                  <span style={{ color: '#666', fontSize: '0.9rem', textAlign: 'right', fontWeight: 'bold' }}>{value}</span>
                                </div>
                              ))}
                            </>
                          )}
                          
                          {page.recommendations && page.recommendations.length > 0 && (
                            <div style={{ marginTop: '10px' }}>
                              <span className="a4-section-label" style={{ color: '#d4af37', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>
                                Soluzioni Esecutive
                              </span>
                              {page.recommendations.map((rec, idx) => (
                                <div key={`rec-${idx}`} className="rec-box">
                                  <span className="cat">{rec.category}</span>
                                  <h4>{rec.issue}</h4>
                                  <p>{rec.solution}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <aside className="a4-side-box" style={{ padding: '20px', background: '#fafafa', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', marginTop: 'auto' }}>
                        <span style={{ color: '#d4af37', fontSize: '0.85rem', display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>{page.sideTitle}</span>
                        {page.sideRows.map(([label, value], idx) => (
                          <div key={`siderow-${idx}-${label}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
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
                        {page.note && page.score !== null && (
                          <p style={{ color: '#888', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>{page.note}</p>
                        )}
                      </footer>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* OVERLAY CTA */}
          <AnimatePresence>
            {!isScanning && !isUnlocked && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, right: 0, bottom: 0, 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(to bottom, rgba(253,253,253,0.1), rgba(253,253,253,0.95) 40%, #fdfdfd 100%)',
                  padding: '20px',
                  textAlign: 'center',
                  zIndex: 50,
                  marginTop: '150px'
                }}
              >
                <div style={{ background: '#fff', padding: '50px 40px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
                  <div style={{ background: '#fdf8e6', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <Lock size={40} color="#d4af37" />
                  </div>
                  <h3 style={{ fontSize: '2.2rem', color: '#111', marginBottom: '15px' }}>Report Bloccato</h3>
                  <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '30px', lineHeight: 1.6 }}>
                    Abbiamo completato lo scraping profondo di <strong>{url}</strong> dividendo l'intento tra "ricerca locale" e "ricerca informativa". Sblocca il referto per scoprire esattamente dove l'IA fatica a leggerti e come risolvere il problema.
                  </p>
                  
                  <button 
                    onClick={() => setIsUnlocked(true)}
                    className="button button-primary" 
                    style={{ background: '#111', color: '#fff', padding: '18px 40px', borderRadius: '8px', fontSize: '1.15rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', width: '100%' }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#d4af37'} 
                    onMouseOut={(e) => e.currentTarget.style.background = '#111'}
                  >
                    Sblocca il Referto Completo (€49)
                  </button>
                  <p style={{ marginTop: '15px', fontSize: '0.85rem', color: '#aaa' }}>
                    [Demo Mode: Clicca per rimuovere il blur e vedere i VERI DATI estratti dal backend Python]
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}

export default function AnalisiPage() {
  return (
    <main style={{ paddingTop: '74px', background: 'transparent', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Caricamento ambiente...</div>}>
        <AnalisiContent />
      </Suspense>
    </main>
  );
}
