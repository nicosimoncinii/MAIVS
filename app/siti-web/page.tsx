"use client";

import { Navbar } from "../components/Navbar";
import { ArrowRight, CheckCircle, Code, Layout } from "lucide-react";

export default function SitiWebPage() {
  return (
    <main style={{ paddingTop: '74px', background: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center', background: 'transparent', color: '#111', position: 'relative', overflow: 'hidden' }}>
        
        <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', background: '#d4af37', filter: 'blur(150px)', opacity: 0.15, zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ color: '#d4af37', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px' }}>
            WEB DESIGN PER CLINICHE
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '20px', color: '#111' }}>
            Costruiamo la tua presenza digitale da zero.
          </h1>
          <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '40px' }}>
            Un sito web non deve essere solo bello. Deve convertire visitatori in pazienti ed essere perfettamente comprensibile alle Intelligenze Artificiali.
          </p>
          <a href="#contatti" className="button" style={{ background: '#d4af37', color: '#fff', padding: '15px 35px', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
            Richiedi un Preventivo
          </a>
        </div>
      </section>

      {/* Carosello Lavori Placeholder */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#111', marginBottom: '15px' }}>I nostri lavori</h2>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Siti web realizzati per cliniche di eccellenza.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', scrollSnapType: 'x mandatory' }}>
            {/* Placeholder items per il carosello */}
            {[1, 2, 3].map((item) => (
              <div key={item} style={{ minWidth: '350px', height: '250px', background: '#f5f5f5', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start', position: 'relative', overflow: 'hidden' }}>
                <Layout size={48} color="#ddd" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '15px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(5px)', borderTop: '1px solid #eee' }}>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>Progetto {item}</p>
                  <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>In arrivo</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Contatti */}
      <section id="contatti" style={{ padding: '80px 20px', background: 'transparent', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '2rem', color: '#111', marginBottom: '30px', textAlign: 'center' }}>Inizia il tuo progetto</h2>
          
          <form onSubmit={(e) => { e.preventDefault(); alert("Richiesta inviata con successo!"); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Nome Struttura / Medico</label>
              <input type="text" required style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} placeholder="Es. Clinica Rossi" />
            </div>
            <div>
              <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
              <input type="email" required style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} placeholder="info@clinicarossi.it" />
            </div>
            <div>
              <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Dettagli Progetto</label>
              <textarea required rows={4} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none', resize: 'vertical' }} placeholder="Descrivi brevemente di cosa hai bisogno..." defaultValue="Salve, avrei bisogno di creare un sito web da zero per la mia clinica." />
            </div>

            <button type="submit" style={{ background: '#111', color: '#fff', padding: '15px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.background = '#d4af37'} onMouseOut={(e) => e.currentTarget.style.background = '#111'}>
              Invia Richiesta <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}


