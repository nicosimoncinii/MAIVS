"use client";

import { Navbar } from "../components/Navbar";
import { ShieldCheck, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main style={{ paddingTop: '74px', background: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', maxWidth: '1000px', width: '100%' }}>
          
          {/* Order Summary */}
          <div style={{ background: '#111', color: '#fff', padding: '40px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#d4af37', filter: 'blur(80px)', opacity: 0.3, zIndex: 0 }} />
            
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#fff' }}>Riepilogo Ordine</h2>
              <p style={{ color: '#aaa', marginBottom: '40px' }}>Analisi completa della visibilità IA</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <CheckCircle color="#d4af37" size={20} />
                  <span style={{ color: '#ddd' }}>Report dettagliato ChatGPT e Claude</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <CheckCircle color="#d4af37" size={20} />
                  <span style={{ color: '#ddd' }}>Lista esatta dei competitor raccomandati</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <CheckCircle color="#d4af37" size={20} />
                  <span style={{ color: '#ddd' }}>Piano d'azione pratico per risolvere i problemi</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', color: '#fff' }}>Totale</span>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d4af37' }}>€49</span>
              </div>
            </div>
          </div>

          {/* Checkout Form Placeholder */}
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#111', marginBottom: '30px' }}>Dettagli di Pagamento</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Integrazione pagamento da implementare (es. Stripe)"); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
                <input type="email" required style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} placeholder="mario.rossi@clinica.it" />
              </div>
              
              <div>
                <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Dati Carta</label>
                <div style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>•••• •••• •••• ••••</span>
                  <span>MM/AA CVC</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={14} /> Pagamento crittografato SSL
                </p>
              </div>

              <button type="submit" style={{ background: '#111', color: '#fff', padding: '15px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '20px', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.background = '#d4af37'} onMouseOut={(e) => e.currentTarget.style.background = '#111'}>
                Paga e Sblocca l'Analisi
              </button>
            </form>
          </div>

        </div>

      </div>
    </main>
  );
}


