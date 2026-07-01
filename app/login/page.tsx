"use client";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setStatus("error");
    } else {
      setStatus("success");
      window.location.href = "/"; // Redirect to Home on success
    }
  };

  return (
    <main style={{ paddingTop: '74px', background: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      

      <Navbar />
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          background: '#fff', 
          padding: '50px 40px', 
          borderRadius: '12px', 
          border: '1px solid #e5e7eb', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
          width: '100%',
          maxWidth: '450px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Sfondo dorato decorativo sfocato */}
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: '#d4af37', filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%', zIndex: 0 }} />

          <div style={{ position: 'relative', zIndex: 10 }}>
            <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '10px', textAlign: 'center' }}>Bentornato</h1>
            <p style={{ color: '#666', textAlign: 'center', marginBottom: '30px' }}>Accedi alla dashboard MAIVS</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} 
                  placeholder="mario.rossi@clinica.it" 
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#111', fontWeight: 'bold', marginBottom: '8px' }}>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fafafa', outline: 'none' }} 
                  placeholder="••••••••" 
                />
              </div>

              {status === "error" && (
                <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>Credenziali non valide o non configurate.</p>
              )}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="button button-primary"
                style={{ background: '#d4af37', color: '#fff', padding: '15px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '10px', width: '100%' }}
              >
                {status === "loading" ? "Accesso in corso..." : "Accedi"}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '30px', color: '#666', fontSize: '0.95rem' }}>
              Non hai ancora un account? <a href="/registrati" style={{ color: '#d4af37', fontWeight: 'bold', textDecoration: 'none' }}>Registrati</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


