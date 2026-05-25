'use client';

import { useState, useEffect } from 'react';

const INTERESTS = [
  {
    id: 'technology',
    title: 'Technology & GUI',
    tag: 'TECHNOLOGY',
    desc: "I got into technology because graphical user interfaces (GUIs) completely fascinated me! The idea of designing responsive, visual operating decks led me directly into coding. It's an amazing feeling to build entirely new digital environments and interactive software from scratch. Now, I apply that same design passion to building custom frontend decks like the Ares City OS!",
    icon: '💻',
    type: 'tech'
  },
  {
    id: 'scifi',
    title: 'Sci-Fi & Fantasy',
    tag: 'SCI-FI / FANTASY',
    desc: "I am deeply passionate about sci-fi and fantasy cinematic universes. I love movies with cool futuristic worldbuilding, legendary space operas, and magical lore that spark my imagination. My top favorites are Star Wars, Harry Potter, Lord of the Rings, and Back to the Future—each one has such an engaging world and time-travel or magical logic!",
    icon: '🎬',
    type: 'scifi'
  },
  {
    id: 'music',
    title: 'Music & Vocal Performance',
    tag: 'MUSIC',
    desc: "I have a deep love for music, spanning classical compositions, modern pop, and vocal performance! In the classical realm, the pipe organ is my absolute favorite instrument because of its grand mechanical power, rich acoustics, and architectural sound. On the pop side, I love Taylor Swift and Noah Kahan for their narrative storytelling. Singing is also a massive part of my life—I absolutely love performing karaoke, singing along to my favorite tracks (which I've curated in my YouTube playlist), and singing in structured choirs. Blending my voice in a choir to create beautiful harmonies with others is incredibly fulfilling!",
    icon: '🎹',
    type: 'music'
  },
  {
    id: 'biking',
    title: 'Cycling & Freedom',
    tag: 'BIKING',
    desc: "Biking is one of my favorite outdoor activities! What I love most is the sheer freedom it gives me—I don't have to rely on public transportation schedules and can travel whenever I want. Cruising along the dome pathways is incredibly relaxing and gives me a great mental reset, even when slogging against tough headwinds.",
    icon: '🚲',
    type: 'biking'
  },
  {
    id: 'flag_football',
    title: 'Flag Football Playbook',
    tag: 'FLAG FOOTBALL',
    desc: "I am deeply passionate about flag football! I first got into it by watching YouTube videos and saw how fun the game is, especially with all the strategizing with teammates, its highly structured nature, and the fact that everyone on the field makes a difference. In other environments, I struggle to socialize with other people and it sometimes scares them away, but flag football has clear rules and social scripts that I understand, so I fit in very well. It also feels incredibly good to know that I can contribute and make a difference on the field.",
    icon: '🏈',
    type: 'flag_football'
  },
  {
    id: 'traveling',
    title: 'Traveling & Exploration',
    tag: 'TRAVELING',
    desc: "Traveling is one of my favorite passions because it allows me to explore more of the United States and other countries around the world! I love discovering new cities, learning about different cultures, and experiencing the unique geography of our planet beyond my home borders. It is an enriching journey that broadens my horizons.",
    icon: '✈️',
    type: 'traveling'
  },
  {
    id: 'neurodiversity',
    title: 'Neurodiversity & Self-Discovery',
    tag: 'NEURODIVERSITY',
    desc: "Neurodiversity is a deeply personal and meaningful interest to me. Studying and understanding neurodiversity helps me learn more about myself, embrace my unique cognitive wiring, and discover why I am sometimes misunderstood by others. It is an empowering journey of self-discovery, highlighting the beauty of different minds.",
    icon: '🧠',
    type: 'neurodiversity'
  }
];

export default function AresDashboard() {
  const birthDate = new Date('1996-07-19');
  
  const [marsAge, setMarsAge] = useState('15.8 Sols');
  const [activeInterest, setActiveInterest] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dynamic Mars Age calculation based on current time - client side only
  useEffect(() => {
    if (!isMounted) return;

    const calculateAge = () => {
      const now = new Date();
      const diffTime = Math.abs(now - birthDate);
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      // Mars orbit is 686.98 Earth Days
      const my = (diffDays / 686.98).toFixed(1);
      setMarsAge(`${my} Sols`);
    };
    calculateAge();
    
    // Interval check every minute
    const interval = setInterval(calculateAge, 60000);
    return () => clearInterval(interval);
  }, [isMounted]);

  return (
    <div className="dashboard-main-container">
      
      {/* Pure CSS Layout Engine */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-turntable {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-custom {
          animation: spin-turntable 8s linear infinite;
        }
        .hud-badge {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hud-badge:active {
          background: rgba(0, 240, 255, 0.2) !important;
          border-color: rgba(0, 240, 255, 0.5) !important;
          transform: scale(0.96) !important;
        }
        .social-link-port {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-link-port:active {
          background: rgba(0, 240, 255, 0.25) !important;
          border-color: rgba(0, 240, 255, 0.6) !important;
          transform: scale(0.94) !important;
        }
        .custom-close-btn:active {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: scale(0.96) !important;
        }

        /* Desktop Dashboard Centered Grid System */
        .dashboard-main-container {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: row;
          justify-content: center; /* Widescreen centering */
          align-items: center;     /* Widescreen centering */
          gap: 24px;
          padding: 24px;
          box-sizing: border-box;
          overflow: hidden;
          height: 100%;
          width: 100%;
          min-height: 0;
        }

        .dashboard-left-col {
          width: 100%;
          max-width: 800px; /* Expanded desktop size */
          background: rgba(10, 6, 6, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row; /* Horizontal columns split on desktop */
          gap: 28px;
          z-index: 10;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.05);
          max-height: 90%;
        }

        .terminal-left-pane {
          width: 280px;
          min-width: 280px;
          display: flex;
          flex-direction: column;
        }

        .terminal-right-pane {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0; /* Prevents overflow */
        }

        .profile-avatar-frame {
          width: 100%;
          height: 170px;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: radial-gradient(circle at center, rgba(0, 240, 255, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.08);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 2;
          flex-shrink: 0;
          margin-bottom: 16px;
        }

        .dashboard-left-col-badge-btn {
          font-family: monospace, var(--font-tech);
          font-size: 0.68rem;
          padding: 10px 14px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          width: 100%;
          text-align: left;
          color: var(--text-primary);
        }

        .dashboard-social-link {
          padding: 8px 4px;
          font-size: 0.62rem;
          justify-content: center;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        @media (max-width: 900px) {
          .dashboard-main-container {
            position: relative !important;
            inset: auto !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: stretch !important;
            gap: 16px !important;
            padding: 16px !important;
            overflow: visible !important;
            height: auto !important;
            min-height: 100% !important;
          }

          .profile-avatar-frame {
            width: 100% !important;
            min-width: 0 !important;
            height: 160px !important;
            margin-bottom: 16px !important;
          }

          .dashboard-left-col {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            flex-direction: column !important;
            gap: 16px !important;
            padding: 16px !important;
            height: auto !important;
            max-height: none !important;
          }

          .terminal-left-pane {
            width: 100% !important;
            min-width: 0 !important;
          }

          .dashboard-left-col-badge-btn {
            padding: 12px 16px !important;
          }

          .dashboard-social-link {
            padding: 12px 4px !important;
            font-size: 0.72rem !important;
          }
        }
      `}} />

      {/* THE CENTRAL PROFILE TERMINAL CARD */}
      <div className="dashboard-left-col">
        {/* Terminal Scanline glow overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(255, 255, 255, 0.02) 50%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          zIndex: 1
        }}></div>

        {/* LEFT PANE: Avatar, Stats, and Social Matrix */}
        <div className="terminal-left-pane" style={{ zIndex: 2 }}>
          {/* Profile Avatar Frame - holographic transparent layout */}
          <div className="profile-avatar-frame">
            <img 
              src="/assets/images/profile.png" 
              alt="Ephraim Becker Profile" 
              style={{
                height: '95%',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 10px rgba(0, 240, 255, 0.25))'
              }}
            />
            {/* Subtle Corner Telemetry Accents */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '6px', height: '6px', borderTop: '2px solid rgba(0,240,255,0.4)', borderLeft: '2px solid rgba(0,240,255,0.4)' }}></div>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', borderTop: '2px solid rgba(0,240,255,0.4)', borderRight: '2px solid rgba(0,240,255,0.4)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '6px', height: '6px', borderBottom: '2px solid rgba(0,240,255,0.4)', borderLeft: '2px solid rgba(0,240,255,0.4)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '6px', height: '6px', borderBottom: '2px solid rgba(0,240,255,0.4)', borderRight: '2px solid rgba(0,240,255,0.4)' }}></div>
          </div>

          {/* Core Stats Readout - Dynamic Hydration Gated */}
          <div style={{
            fontFamily: 'monospace, var(--font-tech)',
            fontSize: '0.8rem',
            color: '#00f0ff',
            letterSpacing: '0.5px',
            lineHeight: '1.6',
            borderBottom: '1px dashed rgba(255, 255, 255, 0.1)',
            paddingBottom: '10px',
            marginBottom: '14px',
            textAlign: 'left',
            textShadow: '0 0 6px rgba(0, 240, 255, 0.3)',
            flexShrink: 0
          }}>
            <div>CITIZEN: <span style={{ color: '#fff', fontWeight: 'bold' }}>Ephraim Becker</span></div>
            <div>MARS AGE: <span style={{ color: '#fff', fontWeight: 'bold' }}>{isMounted ? marsAge : '15.8 Sols'}</span></div>
          </div>

          {/* Complete 6-Link Social Registry Matrix */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '6px',
            marginTop: 'auto',
            flexShrink: 0
          }}>
            <a 
              href="https://github.com/EphraimB" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-port dashboard-social-link"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/ephraim-becker/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-port dashboard-social-link"
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com/emb180" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-port dashboard-social-link"
            >
              X
            </a>
            <a 
              href="https://www.youtube.com/channel/UCIHxAXYLxYlNaQiv0do0bUg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-port dashboard-social-link"
            >
              YouTube
            </a>
            <a 
              href="https://www.instagram.com/ephraim.becker/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-port dashboard-social-link"
            >
              Instagram
            </a>
            <a 
              href="https://www.facebook.com/ephraim.becker/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-port dashboard-social-link"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* RIGHT PANE: Biography Log and Classified Interests */}
        <div className="terminal-right-pane" style={{ zIndex: 2 }}>
          {/* Biography Block */}
          <div style={{
            textAlign: 'left',
            marginBottom: '16px',
            flexShrink: 0
          }}>
            <span style={{
              fontFamily: 'monospace, var(--font-tech)',
              fontSize: '0.62rem',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '4px'
            }}>// CITIZEN BIOGRAPHY LOG</span>
            <p style={{
              fontSize: '0.78rem',
              lineHeight: '1.5',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontWeight: 400
            }}>
              Ephraim Becker is a Computer Science major studying remote-class systems engineering. Backed by mathematical rigor in Calculus, his true passion lies in building highly interactive graphical user interfaces and responsive web layouts.
            </p>
          </div>

          {/* Clickable Interests Mini-Tags (One-Scan Dashboard View) */}
          <div style={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0
          }}>
            <span style={{
              fontFamily: 'monospace, var(--font-tech)',
              fontSize: '0.62rem',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '6px'
            }}>// CLASSIFIED INTEREST REGISTRY</span>
            
            <div className="left-card-column" style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
              {INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => setActiveInterest(interest)}
                  className="hud-badge dashboard-left-col-badge-btn"
                >
                  <span>[{interest.tag}]</span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>{interest.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FULL-SCREEN IMMERSIVE INTEREST DETAILS MODAL OVERLAY */}
      {activeInterest && (
        <div 
          onClick={() => setActiveInterest(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(4, 6, 12, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '720px',
              maxHeight: '92vh',
              background: 'rgba(10, 14, 30, 0.94)',
              border: '2px solid var(--color-accent)',
              borderColor: activeInterest.id === 'technology' ? '#00f0ff' : activeInterest.id === 'scifi' ? '#c259ff' : activeInterest.id === 'music' ? '#ffb300' : activeInterest.id === 'biking' ? '#00ff88' : activeInterest.id === 'traveling' ? '#ff007f' : activeInterest.id === 'neurodiversity' ? '#00ff88' : '#ff5722',
              borderRadius: '16px',
              boxShadow: '0 0 35px rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxSizing: 'border-box',
              textAlign: 'left'
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              <span style={{
                fontFamily: 'monospace, var(--font-tech)',
                fontSize: '0.65rem',
                color: activeInterest.id === 'technology' ? '#00f0ff' : activeInterest.id === 'scifi' ? '#c259ff' : activeInterest.id === 'music' ? '#ffb300' : activeInterest.id === 'biking' ? '#00ff88' : activeInterest.id === 'traveling' ? '#ff007f' : activeInterest.id === 'neurodiversity' ? '#00ff88' : '#ff5722',
                fontWeight: 'bold',
                letterSpacing: '1.5px'
              }}>
                // ACTIVE_SECTOR_SYNC: {activeInterest.tag}
              </span>
              <button 
                onClick={() => setActiveInterest(null)}
                className="hud-btn custom-close-btn"
                style={{
                  padding: '8px 18px',
                  fontSize: '0.72rem',
                  borderColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                [ ✕ CLOSE DECK ]
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="custom-scroll" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Description Narrative card */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '16px',
                  boxSizing: 'border-box'
                }}>
                  <span style={{
                    display: 'block',
                    fontFamily: 'monospace, var(--font-tech)',
                    fontSize: '0.55rem',
                    color: 'rgba(255, 255, 255, 0.4)',
                    letterSpacing: '1px',
                    marginBottom: '6px'
                  }}>// DATA DESCRIPTIVE LOG</span>
                  <p style={{
                    fontSize: '0.82rem',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.9)',
                    margin: 0
                  }}>
                    {activeInterest.desc}
                  </p>
                </div>

                {/* Tactical SVG Graphic Canvas */}
                <div>
                  <span style={{
                    display: 'block',
                    fontFamily: 'monospace, var(--font-tech)',
                    fontSize: '0.55rem',
                    color: 'rgba(255, 255, 255, 0.4)',
                    letterSpacing: '1px',
                    marginBottom: '8px'
                  }}>// VISUAL CORE GRAPHIC</span>
                  
                  {/* Technology vector graphic */}
                  {activeInterest.type === 'tech' && (
                    <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#080b13', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#141a29" />
                      <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
                      <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
                      <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // DESKTOP_VIEWER</text>
                      <g transform="translate(10, 24)">
                        <rect x="5" y="5" width="16" height="12" rx="2" fill="none" stroke="#00f0ff" strokeWidth="1" />
                        <path d="M 5,5 L 11,5 L 13,8 L 21,8 L 21,17 L 5,17 Z" fill="none" stroke="#00f0ff" strokeWidth="1" />
                        <text x="13" y="27" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">SYSTEMS</text>
                        <rect x="35" y="5" width="16" height="12" rx="2" fill="none" stroke="#2979ff" strokeWidth="1" />
                        <path d="M 35,5 L 41,5 L 43,8 L 51,8 L 51,17 L 35,17 Z" fill="none" stroke="#2979ff" strokeWidth="1" />
                        <text x="43" y="27" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">APPS</text>
                      </g>
                      <g transform="translate(110, 24)">
                        <circle cx="40" cy="25" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                        <path d="M 40,9 A 16 16 0 0 1 56,25" fill="none" stroke="#00f0ff" strokeWidth="2.5" />
                        <text x="40" y="28" fill="#fff" fontSize="6.5" fontFamily="monospace" textAnchor="middle">85%</text>
                        <text x="40" y="49" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">GUI INDEX</text>
                        <circle cx="120" cy="25" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                        <path d="M 120,9 A 16 16 0 1 1 104,25" fill="none" stroke="#00ff88" strokeWidth="2.5" />
                        <text x="120" y="28" fill="#fff" fontSize="6.5" fontFamily="monospace" textAnchor="middle">ONLINE</text>
                        <text x="120" y="49" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">CORES</text>
                      </g>
                    </svg>
                  )}

                  {/* Sci-Fi carousel graphic */}
                  {activeInterest.type === 'scifi' && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194,89,255,0.08)' }}>
                      <line x1="80" y1="5" x2="80" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <line x1="160" y1="5" x2="160" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <line x1="240" y1="5" x2="240" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <g>
                        <line x1="30" y1="50" x2="36" y2="44" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="36" y1="44" x2="58" y2="22" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
                        <text x="40" y="72" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">STAR WARS</text>
                      </g>
                      <g transform="translate(10, 0)">
                        <path d="M 110,48 L 122,23 L 118,48 L 128,48 M 115,22 L 125,12" fill="none" stroke="#ffe082" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 2px #ffe082)' }} />
                        <text x="110" y="72" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">H. POTTER</text>
                      </g>
                      <g>
                        <ellipse cx="200" cy="35" rx="12" ry="7" fill="none" stroke="#ffb300" strokeWidth="1.8" style={{ filter: 'drop-shadow(0 0 3px #ffb300)' }} />
                        <text x="200" y="72" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">L.O.T.R.</text>
                      </g>
                      <g>
                        <rect x="252" y="18" width="36" height="24" rx="2" fill="#080b13" stroke="rgba(255,255,255,0.1)" />
                        <text x="270" y="29" fill="#ff5722" fontSize="9" fontFamily="monospace" fontWeight="900" textAnchor="middle" style={{ filter: 'drop-shadow(0 0 2px #ff5722)' }}>88</text>
                        <text x="270" y="39" fill="#ff5722" fontSize="4.5" fontFamily="monospace" textAnchor="middle">MPH</text>
                        <text x="270" y="72" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B.T.T.F.</text>
                      </g>
                    </svg>
                  )}

                  {/* Music Vinyl spin graphic */}
                  {activeInterest.type === 'music' && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 179, 0, 0.2)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
                      <rect x="90" y="10" width="140" height="70" rx="6" fill="#141a29" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <g className="animate-spin-custom" style={{ transformOrigin: '150px 45px' }}>
                        <circle cx="150" cy="45" r="28" fill="#0c0d12" stroke="#222" strokeWidth="1" />
                        <circle cx="150" cy="45" r="24" fill="none" stroke="#242630" strokeWidth="0.8" />
                        <circle cx="150" cy="45" r="18" fill="none" stroke="#242630" strokeWidth="0.8" />
                        <circle cx="150" cy="45" r="8" fill="#ffb300" />
                        <circle cx="150" cy="45" r="1.5" fill="#000" />
                      </g>
                      <path d="M 215,28 L 195,28 L 172,40" fill="none" stroke="#cfd8dc" strokeWidth="2.2" strokeLinecap="round" />
                      <circle cx="215" cy="28" r="4.5" fill="#455a64" />
                      <text x="160" y="85" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">FAVORITES: TAYLOR SWIFT // PIPE ORGAN</text>
                    </svg>
                  )}

                  {/* Biking track graphic */}
                  {activeInterest.type === 'biking' && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
                      <path d="M 0,70 Q 160,30 320,70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                      <line x1="0" y1="70" x2="320" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
                      <g transform="translate(130, 20)">
                        <circle cx="10" cy="36" r="8" fill="none" stroke="#fff" strokeWidth="1.2" />
                        <circle cx="34" cy="36" r="8" fill="none" stroke="#fff" strokeWidth="1.2" />
                        <path d="M 10,36 L 20,36 L 26,24 L 14,24 Z" fill="none" stroke="#00ff88" strokeWidth="1.6" />
                        <line x1="34" y1="36" x2="30" y2="20" stroke="#00ff88" strokeWidth="1.6" />
                        <path d="M 30,20 L 26,18 L 32,18" fill="none" stroke="#fff" strokeWidth="1.5" />
                        <circle cx="23" cy="12" r="3" fill="#fff" />
                        <line x1="23" y1="12" x2="29" y2="19" stroke="#fff" strokeWidth="1.6" />
                      </g>
                      <text x="160" y="85" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CYCLING ROUTE: BIKE_WAY-A5 // 100% RELAXING</text>
                    </svg>
                  )}

                  {/* Flag Football tactical route chalkboard graphic */}
                  {activeInterest.type === 'flag_football' && (
                    <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 87, 34, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)' }}>
                      {/* Grid background */}
                      <line x1="40" y1="5" x2="40" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      <line x1="80" y1="5" x2="80" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      <line x1="120" y1="5" x2="120" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      <line x1="160" y1="5" x2="160" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      <line x1="200" y1="5" x2="200" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      <line x1="240" y1="5" x2="240" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      <line x1="280" y1="5" x2="280" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      
                      <line x1="5" y1="27" x2="315" y2="27" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      <line x1="5" y1="55" x2="315" y2="55" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      <line x1="5" y1="82" x2="315" y2="82" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                      {/* Playbook elements */}
                      <g>
                        <text x="160" y="80" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle">Q</text>
                      <circle cx="160" cy="77" r="7" fill="none" stroke="#fff" strokeWidth="1" />
                      
                      {/* Receivers (O) */}
                      <circle cx="120" cy="77" r="4" fill="none" stroke="#00f0ff" strokeWidth="1.2" />
                      <text x="120" y="80" fill="#00f0ff" fontSize="6" fontFamily="monospace" textAnchor="middle">X</text>

                      <circle cx="200" cy="77" r="4" fill="none" stroke="#00f0ff" strokeWidth="1.2" />
                      <text x="200" y="80" fill="#00f0ff" fontSize="6" fontFamily="monospace" textAnchor="middle">Z</text>

                      {/* Routes (Arrows) */}
                      {/* Left Out Route */}
                      <path d="M 120,73 L 120,40 L 70,40" fill="none" stroke="#ff5722" strokeWidth="1.5" strokeDasharray="3 2" />
                      <polygon points="70,37 63,40 70,43" fill="#ff5722" />
                      <text x="95" y="34" fill="#ff5722" fontSize="5.5" fontFamily="monospace" textAnchor="middle">OUT ROUTE</text>

                      {/* Right Post Route */}
                      <path d="M 200,73 L 200,30 L 165,10" fill="none" stroke="#00ff88" strokeWidth="1.5" />
                      <polygon points="167,7 160,10 168,14" fill="#00ff88" />
                      <text x="210" y="24" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="left">POST ROUTE</text>

                      {/* Defensive players (X) */}
                      <text x="120" y="30" fill="#ea4335" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">D</text>
                      <text x="200" y="20" fill="#ea4335" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">D</text>
                      <text x="160" y="50" fill="#ea4335" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">D</text>

                      <text x="160" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TACTICAL PLAYBOOK: playbook_matrix_09</text>
                    </g>
                  </svg>
                )}

                {/* Traveling global/US flight deck map graphic */}
                {activeInterest.type === 'traveling' && (
                  <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 0, 127, 0.22)', boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.08)' }}>
                    <defs>
                      <radialGradient id="pinkGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ff007f" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ff007f" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Latitudinal / longitudinal grids */}
                    <circle cx="160" cy="180" r="140" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.8" strokeDasharray="3 3" />
                    <circle cx="160" cy="180" r="90" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" />
                    <line x1="5" y1="55" x2="315" y2="55" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="160" y1="5" x2="160" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                    {/* Flight Routes (US Exploration + International transit) */}
                    <path d="M 50,75 Q 100,20 150,55" fill="none" stroke="#ff007f" strokeWidth="1.5" strokeDasharray="3 3" style={{ filter: 'drop-shadow(0 0 2.5px #ff007f)' }} />
                    <path d="M 150,55 Q 210,15 250,35" fill="none" stroke="#ff007f" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 2.5px #ff007f)' }} />
                    <path d="M 250,35 Q 280,50 280,75" fill="none" stroke="#ffb300" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Flight Markers / Labeled nodes */}
                    <g>
                      {/* LAX Node */}
                      <circle cx="50" cy="75" r="3.5" fill="#00f0ff" />
                      <circle cx="50" cy="75" r="7" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
                      <text x="50" y="87" fill="rgba(255,255,255,0.6)" fontSize="5.2" fontFamily="monospace" textAnchor="middle">LAX</text>
                      
                      {/* NYC Node */}
                      <circle cx="150" cy="55" r="3.5" fill="#ff007f" />
                      <circle cx="150" cy="55" r="7" fill="none" stroke="#ff007f" strokeWidth="0.5" />
                      <text x="150" y="67" fill="rgba(255,255,255,0.6)" fontSize="5.2" fontFamily="monospace" textAnchor="middle">NYC</text>

                      {/* London LHR Node */}
                      <circle cx="250" cy="35" r="3.5" fill="#00ff88" />
                      <circle cx="250" cy="35" r="7" fill="none" stroke="#00ff88" strokeWidth="0.5" />
                      <text x="250" y="27" fill="rgba(255,255,255,0.6)" fontSize="5.2" fontFamily="monospace" textAnchor="middle">LHR (LONDON)</text>

                      {/* Tokyo NRT Node */}
                      <circle cx="280" cy="75" r="3" fill="#ffb300" />
                      <text x="280" y="87" fill="rgba(255,255,255,0.6)" fontSize="5.2" fontFamily="monospace" textAnchor="middle">NRT (TOKYO)</text>
                    </g>

                    {/* Airplane Course Glyph (moving LAX ➔ NYC) */}
                    <g transform="translate(90, 48) rotate(15)">
                      <polygon points="0,0 8,-3 0,-6 -2,-3" fill="#ffffff" />
                    </g>
                    
                    <text x="160" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ROUTE_MAP: US_EXPLORATION_AND_GLOBAL_TRANSIT</text>
                  </svg>
                )}

                {/* Neurodiversity infinity loop & synapses graphic */}
                  {activeInterest.type === 'neurodiversity' && (
                    <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)' }}>
                      <defs>
                        {/* Beautiful HSL rainbow linear gradient */}
                        <linearGradient id="neuroRainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00f0ff" />
                          <stop offset="33%" stopColor="#c259ff" />
                          <stop offset="66%" stopColor="#ffb300" />
                          <stop offset="100%" stopColor="#00ff88" />
                        </linearGradient>
                      </defs>

                      {/* Neural network synapses background */}
                      <g opacity="0.3">
                        <line x1="60" y1="25" x2="100" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        <line x1="100" y1="50" x2="130" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        <line x1="220" y1="50" x2="260" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        <line x1="160" y1="50" x2="175" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        
                        <circle cx="60" cy="25" r="2.5" fill="#00f0ff" />
                        <circle cx="130" cy="30" r="2" fill="#c259ff" />
                        <circle cx="260" cy="75" r="2.5" fill="#00ff88" />
                        <circle cx="175" cy="20" r="2" fill="#ffb300" />
                      </g>

                      {/* High-fidelity glowing infinity loop */}
                      <path 
                        d="M 160,50 C 130,20 100,20 100,50 C 100,80 130,80 160,50 C 190,20 220,20 220,50 C 220,80 190,80 160,50 Z" 
                        fill="none" 
                        stroke="url(#neuroRainbowGradient)" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.4))' }} 
                      />

                      {/* Synapse hubs */}
                      <circle cx="100" cy="50" r="2.5" fill="#00f0ff" />
                      <circle cx="220" cy="50" r="2.5" fill="#00ff88" />
                      <circle cx="160" cy="50" r="2" fill="#c259ff" />

                      <text x="160" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SYNAPSE_CORE: cognitive_neurodiversity_infinite_loop</text>
                    </svg>
                  )}

                </div>

                {/* Embedded YouTube Transmission Deck */}
                {activeInterest.id === 'music' && (
                  <div style={{
                    marginTop: '5px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    padding: '16px',
                    boxSizing: 'border-box'
                  }}>
                    <span style={{
                      display: 'block',
                      fontFamily: 'monospace, var(--font-tech)',
                      fontSize: '0.55rem',
                      color: 'rgba(255, 255, 255, 0.4)',
                      letterSpacing: '1px',
                      marginBottom: '8px'
                    }}>// TRANSMISSION DECK // PLAYLIST EMBED</span>
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      paddingBottom: '56.25%', /* 16:9 aspect ratio */
                      height: 0,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1.5px solid rgba(255, 179, 0, 0.3)',
                      boxShadow: '0 0 15px rgba(255, 179, 0, 0.12)'
                    }}>
                      <iframe
                        src="https://www.youtube.com/embed/videoseries?list=PL3IqUVH23uWxWTt4bWtFqcBu7BooiWXpf"
                        title="Karaoke Favorites Playlist"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 0
                        }}
                      ></iframe>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
