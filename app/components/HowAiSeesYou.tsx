"use client";

import { motion } from "framer-motion";

export function HowAiSeesYou() {
  const steps = [
    { 
      step: '01', 
      title: 'Scraping Testuale', 
      desc: "L'algoritmo isola il testo rimuovendo la grafica. Cerca terminologie mediche e analizza la struttura." 
    },
    { 
      step: '02', 
      title: 'Check Reputazionale', 
      desc: "L'IA incrocia i tuoi dati con fonti esterne. Verifica recensioni e coerenza dei dati NAP nel web." 
    },
    { 
      step: '03', 
      title: 'Match Semantico', 
      desc: "Calcola la pertinenza. Valuta se la tua clinica è la risposta migliore per le richieste dei pazienti." 
    }
  ];

  return (
    <>
      <style>{`
        .timeline-section {
          padding: 80px 20px;
          background: transparent;
          border-top: 1px solid #f5f5f5;
          border-bottom: 1px solid #f5f5f5;
          overflow: hidden;
        }
        
        .timeline-title-wrap {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .timeline-h2 {
          font-size: 2.5rem;
          margin: 0 0 15px 0;
          color: #111111;
          font-weight: bold;
        }

        .timeline-wrapper {
          position: relative;
          padding-top: 30px;
          padding-left: 0;
        }
        
        .timeline-bg-line {
          position: absolute;
          top: 36px;
          bottom: auto;
          left: 10%;
          right: 10%;
          height: 2px;
          width: auto;
          background: #f0f0f0;
          z-index: 0;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          position: relative;
          z-index: 2;
        }

        .timeline-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .timeline-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #d4af37;
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
          margin-bottom: 30px;
          margin-top: -2px;
          position: relative;
          left: auto;
          flex-shrink: 0;
        }
        
        .timeline-text-wrap {
          flex: 1;
        }

        /* Mobile Adjustments */
        @media (max-width: 1024px) {
          .timeline-title-wrap {
            margin-bottom: 40px;
          }
          .timeline-h2 {
            font-size: 2rem;
          }
          .timeline-wrapper {
            padding-top: 0;
            padding-left: 30px;
            max-width: 500px;
            margin: 0 auto;
          }
          .timeline-bg-line {
            top: 0;
            bottom: 0;
            left: 9px;
            right: auto;
            height: 100%;
            width: 2px;
          }
          .timeline-grid {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }
          .timeline-item {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
          }
          .timeline-dot {
            margin-bottom: 0;
            margin-top: 5px;
            position: absolute;
            left: -28px;
          }
        }
      `}</style>
      
      <section id="how-it-works" className="timeline-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="timeline-title-wrap">
            <h2 className="timeline-h2">
              Come le IA decodificano il tuo URL
            </h2>
            <p style={{ color: '#666666', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              I motori di ricerca basati su Intelligenza Artificiale non guardano il design del tuo sito. Ne scansionano il codice per estrarre dati puri in 3 passaggi:
            </p>
          </div>

          <div className="timeline-wrapper">
            
            <div className="timeline-bg-line" />

            {/* Desktop Animated Line */}
            <motion.div 
              className="desktop-only-line"
              initial={{ width: 0 }}
              whileInView={{ width: '80%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: '36px',
                left: '10%',
                height: '2px',
                background: '#d4af37',
                zIndex: 1
              }}
            />

            {/* Mobile Animated Line */}
            <motion.div 
              className="mobile-only-line"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: 0,
                left: '9px',
                width: '2px',
                background: '#d4af37',
                zIndex: 1
              }}
            />

            <style>{`
              @media (max-width: 1024px) {
                .desktop-only-line { display: none !important; }
              }
              @media (min-width: 1025px) {
                .mobile-only-line { display: none !important; }
              }
            `}</style>

            <div className="timeline-grid">
              {steps.map((item, index) => (
                <div key={item.step} className="timeline-item">
                  
                  <motion.div 
                    className="timeline-dot"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.4, duration: 0.4 }}
                  />

                  <motion.div 
                    className="timeline-text-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.4 + 0.2, duration: 0.6 }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#d4af37', display: 'block', marginBottom: '8px', letterSpacing: '0.1em' }}>
                      STEP {item.step}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', margin: '0 0 8px 0', color: '#111', fontWeight: '600' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#555', fontSize: '1rem', margin: '0 auto', lineHeight: 1.6, maxWidth: '300px' }}>
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
