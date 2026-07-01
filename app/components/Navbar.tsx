"use client";
import { useState } from "react";
import { navItems } from "./data";
import { LogoMark } from "./LogoMark";
import { Menu, X, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Filter out LOGIN from navItems if logged in, or just handle it manually.
  // Actually, LOGIN is currently in data.ts. It's better to remove it from data.ts and hardcode it here.
  // We'll just filter it out here for now.
  const filteredNavItems = navItems.filter(item => {
    if (session && item.label === "LOGIN") return false;
    return true;
  });

  return (
    <>
      <style>{`
        .mobile-menu-overlay {
          position: fixed;
          top: 74px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          z-index: 9998;
          display: flex;
          flex-direction: column;
          padding: 40px 20px;
          gap: 30px;
          border-top: 1px solid #e5e7eb;
          transform: translateY(-100%);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          pointer-events: none;
        }

        .mobile-menu-overlay.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-nav-link {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111;
          text-decoration: none;
          text-align: center;
          letter-spacing: 0.1em;
        }

        .mobile-nav-link:hover {
          color: #d4af37;
        }

        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #111;
          padding: 5px;
        }

        @media (max-width: 780px) {
          .hamburger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .header-cta, .user-avatar-btn {
            display: none !important;
          }
        }
      `}</style>
      
      <header className="site-header">
        <div className="nav-inner">
          <a className="brand" href="/" aria-label="MAIVS home">
            <LogoMark />
            <span className="brand-copy">
              <strong>MAIVS</strong>
              <small>Medical AI Visibility Score</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {filteredNavItems.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>

          {session ? (
            <Link href="/impostazioni" className="user-avatar-btn" aria-label="Area Personale" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: '#d4af37', color: '#fff', textDecoration: 'none' }}>
              <User size={20} />
            </Link>
          ) : (
            <a className="header-cta" href="/registrati">
              REGISTRATI
            </a>
          )}

          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        {filteredNavItems.map((item) => (
          <a 
            href={item.href} 
            key={item.label} 
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        
        {session ? (
          <a 
            href="/impostazioni" 
            className="mobile-nav-link"
            style={{ color: '#d4af37', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User size={24} /> AREA PERSONALE
          </a>
        ) : (
          <a 
            href="/registrati" 
            className="mobile-nav-link"
            style={{ color: '#d4af37', marginTop: '20px' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            REGISTRATI
          </a>
        )}
      </div>
    </>
  );
}
