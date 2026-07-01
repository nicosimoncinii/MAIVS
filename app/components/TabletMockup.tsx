"use client";

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

export function TabletMockup() {
  return (
    <div className="tablet-stage" aria-label="Clinic visibility score preview">
      <div className="tablet-device">
        <div className="tablet-side-button" aria-hidden="true" />
        <div className="tablet-camera" aria-hidden="true" />

        <div className="tablet-screen" style={{ background: '#fff', overflow: 'hidden' }}>
          
          {/* Miniature version of the A4 Report filling the screen */}
          <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <article style={{ 
              background: '#fff', 
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100%',
              margin: '0'
            }}>
              <header className="a4-report-header" style={{ padding: '15px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#111', display: 'block', fontSize: '0.9rem' }}>MAIVS</strong>
                  <span style={{ color: '#d4af37', fontSize: '0.8rem' }}>Valutazione</span>
                </div>
                <small style={{ fontSize: '1.5rem', color: '#f0f0f0', fontWeight: 'bold' }}>01</small>
              </header>

              <div className="a4-title-block" style={{ padding: '15px' }}>
                <span style={{ color: '#666', fontSize: '0.7rem', textTransform: 'uppercase' }}>Cartella clinica digitale</span>
                <h3 style={{ margin: '5px 0', color: '#111', fontSize: '1.1rem' }}>Clinical AI Visibility Check</h3>
                <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>Parametri consultati prima del risultato</p>
              </div>

              <div className="a4-clinic-row" style={{ display: 'flex', padding: '0 15px 15px', gap: '10px', alignItems: 'center' }}>
                <div className="a4-icon" style={{ width: '30px', height: '30px' }}>
                  <ReportIcon />
                </div>
                <div>
                  <strong style={{ display: 'block', color: '#111', fontSize: '0.85rem' }}>Clinica Estetica Milano</strong>
                  <span style={{ color: '#888', fontSize: '0.75rem' }}>#AI-260519-CE-MI</span>
                </div>
              </div>

              <div className="a4-main-area" style={{ padding: '0 15px', flex: 1 }}>
                <div className="a4-note-box" style={{ background: '#fafafa', padding: '10px', borderRadius: '8px', border: '1px solid #f0f0f0', marginBottom: '15px' }}>
                  <span style={{ color: '#d4af37', fontSize: '0.75rem', fontWeight: 'bold' }}>Analisi</span>
                  <p style={{ margin: '5px 0 0', color: '#444', fontSize: '0.8rem', lineHeight: 1.4 }}>La prima fase mostra quali segnali pubblici sono stati letti.</p>
                </div>

                <div className="a4-table">
                  <span className="a4-section-label" style={{ color: '#d4af37', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                    Report parameters
                  </span>
                  {[
                    ["Presenza locale", "Google Business, mappe"],
                    ["Reputazione", "Recensioni, frequenza"],
                    ["Sito", "Servizi, aree trattate"]
                  ].map(([label, value]) => (
                    <div key={`${label}-${value}`} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e5e7eb', paddingBottom: '6px', marginBottom: '6px' }}>
                      <b style={{ color: '#333', fontSize: '0.75rem' }}>{label}</b>
                      <span style={{ color: '#666', fontSize: '0.75rem', textAlign: 'right' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="a4-side-box" style={{ padding: '15px', background: '#fafafa', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', marginTop: '15px' }}>
                <span style={{ color: '#d4af37', fontSize: '0.75rem', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Competitor rilevati</span>
                {[
                  ["Clinica Nova Salute", "68/100"],
                  ["Studio Armonia", "61/100"]
                ].map(([label, value]) => (
                  <div key={`${label}-${value}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <b style={{ color: '#333', fontSize: '0.75rem' }}>{label}</b>
                    <em style={{ color: '#666', fontSize: '0.75rem', fontStyle: 'normal' }}>{value}</em>
                  </div>
                ))}
              </aside>
            </article>
          </div>

        </div>
      </div>
    </div>
  );
}
