import { Hero } from "./components/Hero";
import { HowAiSeesYou } from "./components/HowAiSeesYou";
import { MedicalA4Reports } from "./components/MedicalA4Reports";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main style={{ paddingTop: '74px' }}>
      <Navbar />
      <Hero />
      <MedicalA4Reports />
      <HowAiSeesYou />

      {/* Chi Siamo Section */}
      <section id="about-us" style={{ padding: '100px 20px', background: 'transparent', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          <p style={{ color: '#d4af37', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px' }}>
            CHI SIAMO
          </p>
          
          <h2 style={{ fontSize: '2.5rem', color: '#111', marginBottom: '40px' }}>
            Il volto dietro MAIVS
          </h2>

          <div style={{ 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            background: '#e5e7eb', 
            marginBottom: '30px',
            border: '4px solid #fff',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* INSERISCI LA TUA FOTO QUI (Tag <img>) */}
            <span style={{ color: '#aaa', fontSize: '0.9rem' }}>[ La tua foto tonda ]</span>
          </div>

          <div style={{ maxWidth: '700px', color: '#555', fontSize: '1.15rem', lineHeight: 1.8 }}>
            {/* INSERISCI LA TUA DESCRIZIONE QUI */}
            <p>
              [ Qui andrà la descrizione che mi fornirai. Sarà un testo elegante e professionale che racconta la tua storia, la tua esperienza nel settore medico o tecnologico, e il motivo per cui hai creato MAIVS. ]
            </p>
          </div>

        </div>
      </section>
      
      {/* Luxury Footer CTA */}
      <footer style={{ padding: '80px 20px', background: 'transparent', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <h2 style={{ color: 'var(--text)', fontSize: '2.5rem', marginBottom: '20px' }}>
          Pronto a dominare le ricerche IA?
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Richiedi ora il tuo report personalizzato e scopri la tua MAIVS (Medical AI Visibility Score).
        </p>
        <a href="#" className="button button-primary" style={{ background: 'var(--accent-gold)', color: '#000', padding: '15px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
          Richiedi Analisi Gratuita
        </a>
      </footer>
    </main>
  );
}

