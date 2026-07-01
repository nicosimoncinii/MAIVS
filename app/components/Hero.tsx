"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TabletMockup } from "./TabletMockup";
import Link from "next/link";

export function Hero() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    window.location.href = `/analisi?url=${encodeURIComponent(url)}`;
  };

  return (
    <>
      <style>{`
        .hero-container {
          position: relative;
          display: grid;
          grid-template-columns: minmax(330px, 0.86fr) minmax(0, 1.14fr);
          align-items: center;
          gap: 40px;
          padding: clamp(42px, 6vh, 76px) clamp(22px, 5vw, 72px);
          max-width: 1400px;
          margin: 0 auto;
        }
        .hero-content {
          text-align: left;
        }
        .hero-form {
          display: flex;
          flex-direction: row;
          gap: 10px;
          background: var(--surface);
          padding: 10px;
          border-radius: 8px;
          border: 1px solid var(--border);
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          margin-bottom: 20px;
        }
        .hero-tablet-wrapper {
          display: block;
        }
        
        /* Tablet & Mobile Responsiveness */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 60px 20px;
          }
          .hero-content {
            text-align: center;
            margin: 0 auto;
          }
          .hero-tablet-wrapper {
            display: none; /* Hide tablet on tablet and mobile screens */
          }
          .hero-form {
            margin: 0 auto 20px auto;
          }
        }

        /* Small Mobile */
        @media (max-width: 600px) {
          .hero-form {
            flex-direction: column;
            background: transparent;
            border: none;
            padding: 0;
            gap: 15px;
            box-shadow: none;
          }
          .hero-form input {
            background: var(--surface) !important;
            border: 1px solid var(--border) !important;
            border-radius: 8px;
            padding: 15px !important;
          }
          .hero-form button {
            width: 100%;
            padding: 15px !important;
          }
        }
      `}</style>
      
      <div className="hero-wrapper" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: 'transparent' }}>
        <section className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <p style={{ color: '#d4af37', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px' }}>
            VISIBILITÀ IA PER CLINICHE DI ECCELLENZA
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '20px', color: '#111' }}>
            Scopri come le IA vedono la tua clinica
          </h1>
          <p style={{ color: '#666', fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginBottom: '30px', maxWidth: '600px', display: 'inline-block' }}>
            I pazienti non cercheranno più su Google. Chiederanno a ChatGPT, Gemini e Perplexity. La tua struttura è pronta?
          </p>

          <form onSubmit={handleSubmit} className="hero-form">
            <input 
              type="url" 
              placeholder="https://www.tuaclinica.it" 
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#111', outline: 'none', padding: '10px 15px', fontSize: '1rem' }}
            />
            <button 
              type="submit" 
              style={{ background: '#d4af37', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', whiteSpace: 'nowrap' }}
            >
              Analizza URL
            </button>
          </form>

          <Link href="/siti-web" style={{ color: '#888', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#d4af37'} onMouseOut={(e) => e.currentTarget.style.color = '#888'}>
            Non hai ancora un sito web? <span style={{ borderBottom: '1px solid #d4af37', color: '#d4af37', fontWeight: 'bold' }}>Creiamolo noi.</span>
          </Link>
          
        </motion.div>

        <motion.div
          className="hero-tablet-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <TabletMockup />
        </motion.div>
      </section>
      </div>
    </>
  );
}


