"use client";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

export default function Registrati() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clinic, setClinic] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, clinic }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        window.location.href = "/login";
      } else {
        setErrorMsg(data.error || "Si è verificato un errore.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Errore di connessione al server.");
      setStatus("error");
    }
  };

  return (
    <main style={{ paddingTop: '74px', background: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      

      <Navbar />
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          background: '#fff', 
          padding: '30px 40px', 
          borderRadius: '12px', 
          border: '1px solid #e5e7eb', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
          width: '100%',
          maxWidth: '500px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Sfondo dorato decorativo sfocato */}
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: '#d4af37', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%', zIndex: 0 }} />

          <div style={{ position: 'relative', zIndex: 10 }}>
            <h1 style={{ fontSize: '1.75rem', color: '#111', marginBottom: '5px', textAlign: 'center' }}>Crea un Account</h1>
            <p style={{ color: '#666', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>Inizia ad analizzare la visibilità della tua clinica</p>

            {status === "success" ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#d4af37', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 20px' }}>✓</div>
                <h3 style={{ fontSize: '1.5rem', color: '#111', marginBottom: '10px' }}>Reindirizzamento...</h3>
                <p style={{ color: '#666', marginBottom: '20px' }}>Il tuo account è stato creato con successo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '4px', fontSize: '0.9rem' }}>Nome e Cognome</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} placeholder="Dr. Mario Rossi" />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '4px', fontSize: '0.9rem' }}>Nome Clinica (Opzionale)</label>
                  <input type="text" value={clinic} onChange={(e) => setClinic(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} placeholder="Clinica Estetica Milano" />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '4px', fontSize: '0.9rem' }}>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} placeholder="mario.rossi@clinica.it" />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '4px', fontSize: '0.9rem' }}>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} placeholder="••••••••" />
                </div>

                {status === "error" && (
                  <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center', margin: 0 }}>
                    {errorMsg}
                  </p>
                )}

                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="button button-primary"
                  style={{ background: '#d4af37', color: '#fff', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '5px', width: '100%' }}
                >
                  {status === "loading" ? "Creazione in corso..." : "Registrati"}
                </button>
              </form>
            )}

            <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
              Hai già un account? <a href="/login" style={{ color: '#d4af37', fontWeight: 'bold', textDecoration: 'none' }}>Accedi</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


