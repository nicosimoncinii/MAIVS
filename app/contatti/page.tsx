"use client";
import { Navbar } from "../components/Navbar";

export default function Contatti() {
  return (
    <main style={{ 
      paddingTop: '74px', 
      background: 'transparent', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      
      <Navbar />
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          background: '#fff', 
          padding: '30px 30px', 
          borderRadius: '16px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          width: '100%', 
          maxWidth: '500px',
          border: '1px solid #f0f0f0',
          position: 'relative'
        }}>
          {/* Decorative small gold accent */}
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '4px', background: '#d4af37', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }} />
          
          <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '10px', textAlign: 'center' }}>
            Contattaci
          </h1>
          <p style={{ color: '#666', textAlign: 'center', marginBottom: '15px', fontSize: '0.9rem' }}>
            Hai domande su MAIVS o vuoi richiedere una consulenza personalizzata? Siamo a tua disposizione.
          </p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#333', fontWeight: 500 }}>Nome e Cognome</label>
              <input 
                type="text"
                placeholder="Dr. Mario Rossi"
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb', 
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#333', fontWeight: 500 }}>Email Professionale</label>
              <input 
                type="email"
                placeholder="mario.rossi@clinica.it"
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb', 
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#333', fontWeight: 500 }}>Messaggio</label>
              <textarea 
                rows={3}
                placeholder="Come possiamo aiutarti?"
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb', 
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  resize: 'none'
                }} 
              />
            </div>

            <button 
              type="submit"
              className="button button-primary"
              style={{ 
                marginTop: '10px',
                padding: '14px', 
                borderRadius: '8px', 
                background: '#d4af37', 
                color: '#fff', 
                border: 'none', 
                fontWeight: 'bold', 
                fontSize: '1.05rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
              }}
            >
              Invia Messaggio
            </button>
          </form>
          
          <div style={{ marginTop: '20px', textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>
            <p>O scrivici direttamente a:</p>
            <p style={{ color: '#d4af37', fontWeight: 'bold', marginTop: '5px' }}>info@maivs.com</p>
          </div>
        </div>
      </div>
    </main>
  );
}
