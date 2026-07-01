"use client";
import { Navbar } from "../components/Navbar";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Impostazioni() {
  const { data: session, status: sessionStatus } = useSession();
  
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, clinic, password: password || undefined }),
      });
      
      if (res.ok) {
        setStatus("success");
        setPassword(""); // Clear password field after update
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (sessionStatus === "loading") {
    return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Caricamento...</div>;
  }

  if (sessionStatus === "unauthenticated") {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <main style={{ paddingTop: '74px', background: 'transparent', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>
      
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#111' }}>Area Personale</h1>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{ background: 'transparent', border: '1px solid #e5e7eb', color: '#666', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Esci (Logout)
          </button>
        </div>

        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#111', marginBottom: '20px' }}>Impostazioni Profilo</h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Nome e Cognome</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Nome Clinica</label>
              <input type="text" value={clinic} onChange={(e) => setClinic(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} placeholder="Opzionale" />
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', margin: '20px 0', paddingTop: '20px' }}>
              <h4 style={{ color: '#111', marginBottom: '15px' }}>Sicurezza</h4>
              <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Nuova Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} placeholder="Lascia vuoto per non modificare" />
            </div>

            {status === "success" && (
              <p style={{ color: 'green', fontWeight: 'bold' }}>Profilo aggiornato con successo!</p>
            )}
            {status === "error" && (
              <p style={{ color: 'red', fontWeight: 'bold' }}>Errore durante l'aggiornamento.</p>
            )}

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="button button-primary"
              style={{ background: '#111', color: '#fff', padding: '15px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '10px' }}
            >
              {status === "loading" ? "Salvataggio..." : "Salva Modifiche"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}


