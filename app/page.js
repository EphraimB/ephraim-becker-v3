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
    desc: "I love traveling because I want to explore new places that I have never explored before, discovering what their geography and culture are like rather than being stuck in the busy NYC area all the time. While I can't afford to travel right now, I hope to relocate to a less busy, more peaceful place when I graduate and get a job in my computer science field.",
    icon: '✈️',
    type: 'traveling'
  },
  {
    id: 'neurodiversity',
    title: 'Neurodiversity & Self-Discovery',
    tag: 'NEURODIVERSITY',
    desc: "Embracing self-discovery and neurodiversity has helped me understand my cognitive wiring and childhood feelings of being misunderstood. I have learned that autistic and allistic brains simply communicate differently, highlighted by double empathy. I am discovering concepts like autistic burnout and learning differences, and that autism is a natural cognitive variation rather than a disability.",
    icon: '🧠',
    type: 'neurodiversity'
  }
];

export default function AresDashboard() {
  const birthDate = new Date('1996-07-19');
  
  const [marsAge, setMarsAge] = useState('15.8 Sols');
  const [activeInterest, setActiveInterest] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const [techSlide, setTechSlide] = useState(0);
  const [scifiSlide, setScifiSlide] = useState(0);
  const [musicSlide, setMusicSlide] = useState(0);
  const [bikingSlide, setBikingSlide] = useState(0);
  const [footballSlide, setFootballSlide] = useState(0);
  const [travelingSlide, setTravelingSlide] = useState(0);
  const [neurodiversitySlide, setNeurodiversitySlide] = useState(0);

  // Set mounted state to prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset slide index when active interest changes
  useEffect(() => {
    setTechSlide(0);
    setScifiSlide(0);
    setMusicSlide(0);
    setBikingSlide(0);
    setFootballSlide(0);
    setTravelingSlide(0);
    setNeurodiversitySlide(0);
  }, [activeInterest]);

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
              Ephraim Becker is studying Computer Science at Adelphi University. Backed by mathematical rigor in Calculus, his true passion lies in building highly interactive graphical user interfaces, responsive web layouts, and futuristic spatial interfaces.
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
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                     <span style={{
                       display: 'block',
                       fontFamily: 'monospace, var(--font-tech)',
                       fontSize: '0.55rem',
                       color: 'rgba(255, 255, 255, 0.4)',
                       letterSpacing: '1px'
                     }}>
                       // DATA DESCRIPTIVE LOG {activeInterest.id === 'technology' && (techSlide === 0 ? '[ SYSTEM OVERVIEW_DECK ]' : `[ DECK_SLIDE 0${techSlide}/02 ]`)}
                       {activeInterest.id === 'scifi' && (scifiSlide === 0 ? '[ CINEMATIC OVERVIEW_DECK ]' : `[ DECK_SLIDE 0${scifiSlide}/02 ]`)}
                       {activeInterest.id === 'music' && (musicSlide === 0 ? '[ ACOUSTIC OVERVIEW_DECK ]' : `[ DECK_SLIDE 0${musicSlide}/02 ]`)}
                       {activeInterest.id === 'biking' && (bikingSlide === 0 ? '[ MOBILITY OVERVIEW_DECK ]' : `[ DECK_SLIDE 0${bikingSlide}/02 ]`)}
                       {activeInterest.id === 'flag_football' && (footballSlide === 0 ? '[ TACTICAL OVERVIEW_DECK ]' : `[ DECK_SLIDE 0${footballSlide}/02 ]`)}
                       {activeInterest.id === 'traveling' && (travelingSlide === 0 ? '[ TRAVELING OVERVIEW_DECK ]' : `[ DECK_SLIDE 0${travelingSlide}/02 ]`)}
                       {activeInterest.id === 'neurodiversity' && (neurodiversitySlide === 0 ? '[ COGNITIVE OVERVIEW_DECK ]' : `[ DECK_SLIDE 0${neurodiversitySlide}/03 ]`)}
                     </span>

                     {/* Paging Indicators specifically for Technology */}
                     {activeInterest.id === 'technology' && (
                       <div style={{ display: 'flex', gap: '6px' }}>
                         <button 
                           onClick={() => setTechSlide(0)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: techSlide === 0 ? '#00f0ff' : 'rgba(255,255,255,0.15)',
                             background: techSlide === 0 ? 'rgba(0,240,255,0.08)' : 'transparent',
                             color: techSlide === 0 ? '#00f0ff' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ OVERVIEW ]
                         </button>
                         <button 
                           onClick={() => setTechSlide(1)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: techSlide === 1 ? '#00f0ff' : 'rgba(255,255,255,0.15)',
                             background: techSlide === 1 ? 'rgba(0,240,255,0.08)' : 'transparent',
                             color: techSlide === 1 ? '#00f0ff' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 01 // GUI ]
                         </button>
                         <button 
                           onClick={() => setTechSlide(2)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: techSlide === 2 ? '#00f0ff' : 'rgba(255,255,255,0.15)',
                             background: techSlide === 2 ? 'rgba(0,240,255,0.08)' : 'transparent',
                             color: techSlide === 2 ? '#00f0ff' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 02 // GADGETS ]
                         </button>
                       </div>
                     )}

                     {/* Paging Indicators specifically for Sci-Fi / Fantasy */}
                     {activeInterest.id === 'scifi' && (
                       <div style={{ display: 'flex', gap: '6px' }}>
                         <button 
                           onClick={() => setScifiSlide(0)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: scifiSlide === 0 ? '#c259ff' : 'rgba(255,255,255,0.15)',
                             background: scifiSlide === 0 ? 'rgba(194,89,255,0.08)' : 'transparent',
                             color: scifiSlide === 0 ? '#c259ff' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ OVERVIEW ]
                         </button>
                         <button 
                           onClick={() => setScifiSlide(1)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: scifiSlide === 1 ? '#c259ff' : 'rgba(255,255,255,0.15)',
                             background: scifiSlide === 1 ? 'rgba(194,89,255,0.08)' : 'transparent',
                             color: scifiSlide === 1 ? '#c259ff' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 01 // SCI-FI ]
                         </button>
                         <button 
                           onClick={() => setScifiSlide(2)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: scifiSlide === 2 ? '#c259ff' : 'rgba(255,255,255,0.15)',
                             background: scifiSlide === 2 ? 'rgba(194,89,255,0.08)' : 'transparent',
                             color: scifiSlide === 2 ? '#c259ff' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 02 // FANTASY ]
                         </button>
                       </div>
                     )}

                     {/* Paging Indicators specifically for Music */}
                     {activeInterest.id === 'music' && (
                       <div style={{ display: 'flex', gap: '6px' }}>
                         <button 
                           onClick={() => setMusicSlide(0)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: musicSlide === 0 ? '#ffb300' : 'rgba(255,255,255,0.15)',
                             background: musicSlide === 0 ? 'rgba(255,179,0,0.08)' : 'transparent',
                             color: musicSlide === 0 ? '#ffb300' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ OVERVIEW ]
                         </button>
                         <button 
                           onClick={() => setMusicSlide(1)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: musicSlide === 1 ? '#ffb300' : 'rgba(255,255,255,0.15)',
                             background: musicSlide === 1 ? 'rgba(255,179,0,0.08)' : 'transparent',
                             color: musicSlide === 1 ? '#ffb300' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 01 // ORGANS & ARTISTS ]
                         </button>
                         <button 
                           onClick={() => setMusicSlide(2)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: musicSlide === 2 ? '#ffb300' : 'rgba(255,255,255,0.15)',
                             background: musicSlide === 2 ? 'rgba(255,179,0,0.08)' : 'transparent',
                             color: musicSlide === 2 ? '#ffb300' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 02 // VOCAL & CHOIR ]
                         </button>
                       </div>
                     )}

                     {/* Paging Indicators specifically for Biking */}
                     {activeInterest.id === 'biking' && (
                       <div style={{ display: 'flex', gap: '6px' }}>
                         <button 
                           onClick={() => setBikingSlide(0)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: bikingSlide === 0 ? '#00ff88' : 'rgba(255,255,255,0.15)',
                             background: bikingSlide === 0 ? 'rgba(0,255,136,0.08)' : 'transparent',
                             color: bikingSlide === 0 ? '#00ff88' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ OVERVIEW ]
                         </button>
                         <button 
                           onClick={() => setBikingSlide(1)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: bikingSlide === 1 ? '#00ff88' : 'rgba(255,255,255,0.15)',
                             background: bikingSlide === 1 ? 'rgba(0,255,136,0.08)' : 'transparent',
                             color: bikingSlide === 1 ? '#00ff88' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 01 // TIME & ROUTING ]
                         </button>
                         <button 
                           onClick={() => setBikingSlide(2)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: bikingSlide === 2 ? '#00ff88' : 'rgba(255,255,255,0.15)',
                             background: bikingSlide === 2 ? 'rgba(0,255,136,0.08)' : 'transparent',
                             color: bikingSlide === 2 ? '#00ff88' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 02 // ENDURANCE ]
                         </button>
                       </div>
                     )}

                     {/* Paging Indicators specifically for Flag Football */}
                     {activeInterest.id === 'flag_football' && (
                       <div style={{ display: 'flex', gap: '6px' }}>
                         <button 
                           onClick={() => setFootballSlide(0)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: footballSlide === 0 ? '#ff5722' : 'rgba(255,255,255,0.15)',
                             background: footballSlide === 0 ? 'rgba(255,87,34,0.08)' : 'transparent',
                             color: footballSlide === 0 ? '#ff5722' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ OVERVIEW ]
                         </button>
                         <button 
                           onClick={() => setFootballSlide(1)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: footballSlide === 1 ? '#ff5722' : 'rgba(255,255,255,0.15)',
                             background: footballSlide === 1 ? 'rgba(255,87,34,0.08)' : 'transparent',
                             color: footballSlide === 1 ? '#ff5722' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 01 // PLAYMAKER & THRILLS ]
                         </button>
                         <button 
                           onClick={() => setFootballSlide(2)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: footballSlide === 2 ? '#ff5722' : 'rgba(255,255,255,0.15)',
                             background: footballSlide === 2 ? 'rgba(255,87,34,0.08)' : 'transparent',
                             color: footballSlide === 2 ? '#ff5722' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 02 // HUDDLES & STRATEGY ]
                         </button>
                       </div>
                     )}

                     {/* Paging Indicators specifically for Traveling */}
                     {activeInterest.id === 'traveling' && (
                       <div style={{ display: 'flex', gap: '6px' }}>
                         <button 
                           onClick={() => setTravelingSlide(0)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: travelingSlide === 0 ? '#ff007f' : 'rgba(255,255,255,0.15)',
                             background: travelingSlide === 0 ? 'rgba(255,0,127,0.08)' : 'transparent',
                             color: travelingSlide === 0 ? '#ff007f' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ OVERVIEW ]
                         </button>
                         <button 
                           onClick={() => setTravelingSlide(1)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: travelingSlide === 1 ? '#ff007f' : 'rgba(255,255,255,0.15)',
                             background: travelingSlide === 1 ? 'rgba(255,0,127,0.08)' : 'transparent',
                             color: travelingSlide === 1 ? '#ff007f' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 01 // GEOGRAPHY & CULTURE ]
                         </button>
                         <button 
                           onClick={() => setTravelingSlide(2)}
                           className="hud-btn"
                           style={{
                             padding: '2px 8px',
                             fontSize: '0.55rem',
                             borderColor: travelingSlide === 2 ? '#ff007f' : 'rgba(255,255,255,0.15)',
                             background: travelingSlide === 2 ? 'rgba(255,0,127,0.08)' : 'transparent',
                             color: travelingSlide === 2 ? '#ff007f' : 'rgba(255,255,255,0.6)',
                             borderRadius: '4px',
                             cursor: 'pointer'
                           }}
                         >
                           [ 02 // RELOCATION PLANS ]
                         </button>
                       </div>
                     )}

                     {/* Paging Indicators specifically for Neurodiversity */}
                      {activeInterest.id === 'neurodiversity' && (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button 
                            onClick={() => setNeurodiversitySlide(0)}
                            className="hud-btn"
                            style={{
                              padding: '2px 8px',
                              fontSize: '0.55rem',
                              borderColor: neurodiversitySlide === 0 ? '#00ff88' : 'rgba(255,255,255,0.15)',
                              background: neurodiversitySlide === 0 ? 'rgba(0,255,136,0.08)' : 'transparent',
                              color: neurodiversitySlide === 0 ? '#00ff88' : 'rgba(255,255,255,0.6)',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            [ OVERVIEW ]
                          </button>
                          <button 
                            onClick={() => setNeurodiversitySlide(1)}
                            className="hud-btn"
                            style={{
                              padding: '2px 8px',
                              fontSize: '0.55rem',
                              borderColor: neurodiversitySlide === 1 ? '#00ff88' : 'rgba(255,255,255,0.15)',
                              background: neurodiversitySlide === 1 ? 'rgba(0,255,136,0.08)' : 'transparent',
                              color: neurodiversitySlide === 1 ? '#00ff88' : 'rgba(255,255,255,0.6)',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            [ 01 // FRIENDSHIP & ENERGY ]
                          </button>
                          <button 
                            onClick={() => setNeurodiversitySlide(2)}
                            className="hud-btn"
                            style={{
                              padding: '2px 8px',
                              fontSize: '0.55rem',
                              borderColor: neurodiversitySlide === 2 ? '#00ff88' : 'rgba(255,255,255,0.15)',
                              background: neurodiversitySlide === 2 ? 'rgba(0,255,136,0.08)' : 'transparent',
                              color: neurodiversitySlide === 2 ? '#00ff88' : 'rgba(255,255,255,0.6)',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            [ 02 // DOUBLE EMPATHY & STIGMA ]
                          </button>
                          <button 
                            onClick={() => setNeurodiversitySlide(3)}
                            className="hud-btn"
                            style={{
                              padding: '2px 8px',
                              fontSize: '0.55rem',
                              borderColor: neurodiversitySlide === 3 ? '#00ff88' : 'rgba(255,255,255,0.15)',
                              background: neurodiversitySlide === 3 ? 'rgba(0,255,136,0.08)' : 'transparent',
                              color: neurodiversitySlide === 3 ? '#00ff88' : 'rgba(255,255,255,0.6)',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            [ 03 // BURNOUT & LEARNING ]
                          </button>
                        </div>
                      )}
                   </div>

                   <div style={{
                     fontSize: '0.82rem',
                     lineHeight: '1.6',
                     color: 'rgba(255, 255, 255, 0.9)',
                     margin: 0,
                     minHeight: '80px',
                     transition: 'all 0.25s ease'
                   }}>
                     {activeInterest.id === 'technology' ? (
                       techSlide === 0 ? (
                         <div>
                           <span style={{ display: 'block', marginBottom: '8px' }}>
                             Technology is my ultimate sandbox! I am deeply fascinated by the design of graphical user interfaces (GUIs) that bring code to life visually, and I am equally passionate about looking forward to futuristic gadgets and the latest consumer tech. Explore each detailed section below:
                           </span>
                           <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                             <button
                               onClick={() => setTechSlide(1)}
                               className="hud-btn"
                               style={{
                                 flex: 1,
                                 padding: '6px 10px',
                                 fontSize: '0.7rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 borderColor: '#00f0ff',
                                 background: 'rgba(0, 240, 255, 0.05)',
                                 color: '#00f0ff',
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 textAlign: 'center'
                               }}
                             >
                               [ EXPLORE GUI SYSTEMS ➔ ]
                             </button>
                             <button
                               onClick={() => setTechSlide(2)}
                               className="hud-btn"
                               style={{
                                 flex: 1,
                                 padding: '6px 10px',
                                 fontSize: '0.7rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 borderColor: '#00ff88',
                                 background: 'rgba(0, 255, 136, 0.05)',
                                 color: '#00ff88',
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 textAlign: 'center'
                               }}
                             >
                               [ EXPLORE FUTURISTIC GADGETS ➔ ]
                             </button>
                           </div>
                         </div>
                       ) : techSlide === 1 ? (
                         <div>
                           <span>
                             I got into technology because graphical user interfaces (GUIs) completely fascinated me! The idea of designing responsive, visual operating decks led me directly into coding. It's an amazing feeling to build entirely new digital environments and interactive software from scratch. Now, I apply that same design passion to building custom frontend decks like the Ares City OS!
                           </span>
                           <div style={{ marginTop: '10px' }}>
                             <button
                               onClick={() => setTechSlide(0)}
                               style={{
                                 background: 'transparent',
                                 border: 'none',
                                 color: 'rgba(255,255,255,0.4)',
                                 fontSize: '0.65rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 cursor: 'pointer',
                                 padding: 0
                               }}
                             >
                               [ ↩ BACK TO OVERVIEW ]
                             </button>
                           </div>
                         </div>
                       ) : (
                         <div>
                           <span>
                             Beyond software interfaces, I am deeply passionate about futuristic hardware and pioneering gadgets! I always look forward to exploring the latest and greatest consumer tech, next-generation mobile devices, holographic displays, and experimental wearables. Keeping pace with cutting-edge tech innovations inspires me to think about what is possible tomorrow and fuels my drive to incorporate forward-looking concepts directly into my computer science work.
                           </span>
                           <div style={{ marginTop: '10px' }}>
                             <button
                               onClick={() => setTechSlide(0)}
                               style={{
                                 background: 'transparent',
                                 border: 'none',
                                 color: 'rgba(255,255,255,0.4)',
                                 fontSize: '0.65rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 cursor: 'pointer',
                                 padding: 0
                               }}
                             >
                               [ ↩ BACK TO OVERVIEW ]
                             </button>
                           </div>
                         </div>
                       )
                     ) : activeInterest.id === 'scifi' ? (
                       scifiSlide === 0 ? (
                         <div>
                           <span style={{ display: 'block', marginBottom: '8px' }}>
                             I am deeply inspired by the boundless imagination of science fiction and fantasy cinematic universes! For me, sci-fi is a gateway to imagining the next big thing—where high-tech gadgets and advanced user interfaces on screen directly fuel my passion for coding real-world systems. Meanwhile, fantasy worlds capture my heart with their magic, rich storytelling, and legendary journeys. A masterpiece like Back to the Future perfectly bridges both worlds, combining time-traveling science fiction gadgetry with the whimsical magic of timeline shifts and destiny! Explore each detailed realm below:
                           </span>
                           <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                             <button
                               onClick={() => setScifiSlide(1)}
                               className="hud-btn"
                               style={{
                                 flex: 1,
                                 padding: '6px 10px',
                                 fontSize: '0.7rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 borderColor: '#c259ff',
                                 background: 'rgba(194, 89, 255, 0.05)',
                                 color: '#c259ff',
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 textAlign: 'center'
                               }}
                             >
                               [ EXPLORE SCIENCE FICTION ➔ ]
                             </button>
                             <button
                               onClick={() => setScifiSlide(2)}
                               className="hud-btn"
                               style={{
                                 flex: 1,
                                 padding: '6px 10px',
                                 fontSize: '0.7rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 borderColor: '#ffe082',
                                 background: 'rgba(255, 224, 130, 0.05)',
                                 color: '#ffe082',
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 textAlign: 'center'
                               }}
                             >
                               [ EXPLORE FANTASY & MAGIC ➔ ]
                             </button>
                           </div>
                         </div>
                       ) : scifiSlide === 1 ? (
                         <div>
                           <span>
                             Sci-Fi is where my tech and design interest runs wild! I love watching legendary space operas and futuristic movies to imagine the next generation of user interfaces and hardware. From the iconic, highly structured LCARS terminal screens in Star Trek, to the floating blue holograms, lightsabers, and stormtrooper lasers in Star Wars, and even the sleek, talking J.A.R.V.I.S. holographic system in Iron Man, these cinematic creations inspire me. Similarly, Back to the Future's customized time-traveling DeLorean, Doc Brown's legendary Flux Capacitor, and the wild mechanics of temporal displacement fuel my love for futuristic hardware!
                           </span>
                           <div style={{ marginTop: '10px' }}>
                             <button
                               onClick={() => setScifiSlide(0)}
                               style={{
                                 background: 'transparent',
                                 border: 'none',
                                 color: 'rgba(255,255,255,0.4)',
                                 fontSize: '0.65rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 cursor: 'pointer',
                                 padding: 0
                               }}
                             >
                               [ ↩ BACK TO OVERVIEW ]
                             </button>
                           </div>
                         </div>
                       ) : (
                         <div>
                           <span>
                             While sci-fi is driven by high-tech logic, fantasy captured my imagination through pure wonder and rich storytelling! Masterpieces like Harry Potter and The Lord of the Rings depict detailed worlds filled with deep history, magic, and legendary quests of self-discovery. These cinematic masterpieces tell exceptionally good stories, reminding me of the importance of narrative. Even Back to the Future functions as a beautiful storybook adventure—where the 'magic' of changing history, family destiny, and Doc Brown's whimsical inventions remind us of the emotional resonance in building premium user experiences.
                           </span>
                           <div style={{ marginTop: '10px' }}>
                             <button
                               onClick={() => setScifiSlide(0)}
                               style={{
                                 background: 'transparent',
                                 border: 'none',
                                 color: 'rgba(255,255,255,0.4)',
                                 fontSize: '0.65rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 cursor: 'pointer',
                                 padding: 0
                               }}
                             >
                               [ ↩ BACK TO OVERVIEW ]
                             </button>
                           </div>
                         </div>
                       )
                     ) : activeInterest.id === 'music' ? (
                       musicSlide === 0 ? (
                         <div>
                           <span style={{ display: 'block', marginBottom: '8px' }}>
                             Music is the emotional pulse of my life! My musical journey truly began with my transition to Reform Judaism, where the powerful tradition of singing prayers aloud first captured my heart. This spiritual path introduced me to the majestic, professional sound of the pipe organ, and ignited my love for rich pop storytelling like Taylor Swift and Noah Kahan. Beyond listening, music is interactive—fueling my passion for performing karaoke and singing in choirs. Explore each dimension below:
                           </span>
                           <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                             <button
                               onClick={() => setMusicSlide(1)}
                               className="hud-btn"
                               style={{
                                 flex: 1,
                                 padding: '6px 10px',
                                 fontSize: '0.7rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 borderColor: '#ffb300',
                                 background: 'rgba(255, 179, 0, 0.05)',
                                 color: '#ffb300',
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 textAlign: 'center'
                               }}
                             >
                               [ EXPLORE ORGANS & ARTISTS ➔ ]
                             </button>
                             <button
                               onClick={() => setMusicSlide(2)}
                               className="hud-btn"
                               style={{
                                 flex: 1,
                                 padding: '6px 10px',
                                 fontSize: '0.7rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 borderColor: '#00ff88',
                                 background: 'rgba(0, 255, 136, 0.05)',
                                 color: '#00ff88',
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 textAlign: 'center'
                               }}
                             >
                               [ EXPLORE VOCALS & CHOIR ➔ ]
                             </button>
                           </div>
                         </div>
                       ) : musicSlide === 1 ? (
                         <div>
                           <span>
                             My transition to Reform Judaism opened my eyes to music's power. Unlike the quiet prayers of Orthodox traditions, Reform temples sing everything, introducing me to the grand pipe organ for the very first time with its exceptionally professional sound, mechanical complexity, and rich, hall-filling acoustics! Later, I fell in love with Taylor Swift for her dramatic, emotionally raw pop storytelling. Looking for more relatable music, I asked ChatGPT for recommendations and fell in love with Noah Kahan, particularly the song "Someone Like You" on his "I Was / I Am" album, which speaks deeply to my own journey.
                           </span>
                           <div style={{ marginTop: '10px' }}>
                             <button
                               onClick={() => setMusicSlide(0)}
                               style={{
                                 background: 'transparent',
                                 border: 'none',
                                 color: 'rgba(255,255,255,0.4)',
                                 fontSize: '0.65rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 cursor: 'pointer',
                                 padding: 0
                               }}
                             >
                               [ ↩ BACK TO OVERVIEW ]
                             </button>
                           </div>
                         </div>
                       ) : (
                         <div>
                           <span>
                             I decided to take my love for music further and make it active! After a temple friend invited me to a local karaoke group, I discovered the sheer joy of vocal performance, singing along to my favorite pop and folk tracks. This passion led me directly into choir singing, where blending voices in harmony creates a powerful communal bond. I even challenged myself by taking a chorale class at Adelphi University to refine my vocal technique, learn structured sight-reading, and perform classical choral literature!
                           </span>
                           <div style={{ marginTop: '10px' }}>
                             <button
                               onClick={() => setMusicSlide(0)}
                               style={{
                                 background: 'transparent',
                                 border: 'none',
                                 color: 'rgba(255,255,255,0.4)',
                                 fontSize: '0.65rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 cursor: 'pointer',
                                 padding: 0
                               }}
                             >
                               [ ↩ BACK TO OVERVIEW ]
                             </button>
                           </div>
                         </div>
                       )
                     ) : activeInterest.id === 'biking' ? (
                       bikingSlide === 0 ? (
                         <div>
                           <span style={{ display: 'block', marginBottom: '8px' }}>
                             Biking represents the ultimate power of self-reliance and daily challenge in my life! While it's not simply my favorite leisure activity, it is far more fun and engaging than sitting in public transit or having someone drive me. Biking puts me in full, independent control of my journey. What started as a quest on Google Maps for a faster commute to Adelphi University transformed into a daily, all-weather test of endurance and distance. Explore each dimension of my cycling journey below:
                           </span>
                           <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                             <button
                               onClick={() => setBikingSlide(1)}
                               className="hud-btn"
                               style={{
                                 flex: 1,
                                 padding: '6px 10px',
                                 fontSize: '0.7rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 borderColor: '#00ff88',
                                 background: 'rgba(0, 255, 136, 0.05)',
                                 color: '#00ff88',
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 textAlign: 'center'
                               }}
                             >
                               [ EXPLORE TIME & ROUTING ➔ ]
                             </button>
                             <button
                               onClick={() => setBikingSlide(2)}
                               className="hud-btn"
                               style={{
                                 flex: 1,
                                 padding: '6px 10px',
                                 fontSize: '0.7rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 borderColor: '#00ff88',
                                 background: 'rgba(0, 255, 136, 0.05)',
                                 color: '#00ff88',
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 textAlign: 'center'
                               }}
                             >
                               [ EXPLORE DAILY ENDURANCE ➔ ]
                             </button>
                           </div>
                         </div>
                       ) : bikingSlide === 1 ? (
                         <div>
                           <span>
                             The core of biking for me is absolute independence and time-efficiency! It began when I was mapping out public transportation routes to Adelphi University on Google Maps. I was astonished to see that cycling there would save me a full half hour over public transit, completing the trip in just 45 minutes! Biking liberates me from rigid transit schedules and relying on others to drive me. Being in full control of my speed and navigation is incredibly empowering—especially when catching a fast, exhilarating tailwind!
                           </span>
                           <div style={{ marginTop: '10px' }}>
                             <button
                               onClick={() => setBikingSlide(0)}
                               style={{
                                 background: 'transparent',
                                 border: 'none',
                                 color: 'rgba(255,255,255,0.4)',
                                 fontSize: '0.65rem',
                                 fontFamily: 'monospace, var(--font-tech)',
                                 cursor: 'pointer',
                                 padding: 0
                               }}
                             >
                               [ ↩ BACK TO OVERVIEW ]
                             </button>
                           </div>
                         </div>
                       ) : (
                         <div>
                           <span>
                             At first, I didn't think I could manage to bike to campus every single weekday. But a friend inspired me to push past my self-imposed limits and commit to it every day—no matter what. Since then, I've embraced the challenge, riding consistently even in the pouring rain and slogging against powerful headwind currents. Over time, this daily discipline expanded my limits, inspiring me to tackle much longer distances. I even tested myself by biking over 2 hours one way to see if I could get to Manhattan, and I did it a few times with no problem round trip, proving that any weather or mileage barrier can be conquered!
                            </span>
                            <div style={{ marginTop: '10px' }}>
                              <button
                                onClick={() => setBikingSlide(0)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'rgba(255,255,255,0.4)',
                                  fontSize: '0.65rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              >
                                [ ↩ BACK TO OVERVIEW ]
                              </button>
                            </div>
                          </div>
                        )
                      ) : activeInterest.id === 'flag_football' ? (
                     footballSlide === 0 ? (
                       <div>
                         <span style={{ display: 'block', marginBottom: '8px' }}>
                           Flag football represents a thrilling intersection of team strategy, structured play, and social inclusion! I first got into the sport by watching YouTube videos showing how much fun people have playing it. Every single position and action makes a difference on the field. Because the game has highly structured rules and clear social scripts, it provides an environment where I can easily follow, understand, and connect with others. Explore the strategic and playmaker dimensions of my flag football journey below:
                         </span>
                         <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                           <button
                             onClick={() => setFootballSlide(1)}
                             className="hud-btn"
                             style={{
                               flex: 1,
                               padding: '6px 10px',
                               fontSize: '0.7rem',
                               fontFamily: 'monospace, var(--font-tech)',
                               borderColor: '#ff5722',
                               background: 'rgba(255, 87, 34, 0.05)',
                               color: '#ff5722',
                               borderRadius: '4px',
                               cursor: 'pointer',
                               textAlign: 'center'
                             }}
                           >
                             [ EXPLORE PLAYMAKER & THRILLS ➔ ]
                           </button>
                           <button
                             onClick={() => setFootballSlide(2)}
                             className="hud-btn"
                             style={{
                               flex: 1,
                               padding: '6px 10px',
                               fontSize: '0.7rem',
                               fontFamily: 'monospace, var(--font-tech)',
                               borderColor: '#ff5722',
                               background: 'rgba(255, 87, 34, 0.05)',
                               color: '#ff5722',
                               borderRadius: '4px',
                               cursor: 'pointer',
                               textAlign: 'center'
                             }}
                           >
                             [ EXPLORE HUDDLES & STRATEGY ➔ ]
                           </button>
                         </div>
                       </div>
                     ) : footballSlide === 1 ? (
                       <div>
                         <span>
                           There is a unique thrill in executing plays and making an impact! I feel a huge rush making a nice catch and having my teammates get excited and celebrate with me. On defense, intercepting a pass brings an incredible thrill. It is a highly structured sport where everyone makes a difference, and we can directly help teammates out—whether by running route scripts or blocking for them on the field. Flag football provides clear rules and social scripts that allow me to communicate and fit in very well without social struggles.
                         </span>
                         <div style={{ marginTop: '10px' }}>
                           <button
                             onClick={() => setFootballSlide(0)}
                             style={{
                               background: 'transparent',
                               border: 'none',
                               color: 'rgba(255,255,255,0.4)',
                               fontSize: '0.65rem',
                               fontFamily: 'monospace, var(--font-tech)',
                               cursor: 'pointer',
                               padding: 0
                             }}
                           >
                             [ ↩ BACK TO OVERVIEW ]
                           </button>
                         </div>
                       </div>
                     ) : (
                       <div>
                         <span>
                           The ultimate power of flag football lies in team unity! Strategizing in huddles and being "all in it together as a team" makes me feel deeply included and valued. We operate in sync, discussing tactics, calling play scripts, and working as one cohesive unit to execute. Everyone has a specific role, yet we succeed only when we support one another, turning the playbook into a powerful platform for active collaboration and shared success.
                         </span>
                         <div style={{ marginTop: '10px' }}>
                           <button
                             onClick={() => setFootballSlide(0)}
                             style={{
                               background: 'transparent',
                               border: 'none',
                               color: 'rgba(255,255,255,0.4)',
                               fontSize: '0.65rem',
                               fontFamily: 'monospace, var(--font-tech)',
                               cursor: 'pointer',
                               padding: 0
                             }}
                           >
                             [ ↩ BACK TO OVERVIEW ]
                           </button>
                         </div>
                       </div>
                     )
                   ) : activeInterest.id === 'traveling' ? (
                        travelingSlide === 0 ? (
                          <div>
                            <span style={{ display: 'block', marginBottom: '8px' }}>
                              Exploring the unknown and seeking cultural discovery defines my travel aspirations! I love traveling because I want to explore new places that I have never seen before, discovering what their geography and culture are like. I want to break free from being stuck in the busy New York City area all the time. While I can't afford to travel right now, the dream of discovery fuels my forward momentum. Discover my travel aspirations and future relocation plans below:
                            </span>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                              <button
                                onClick={() => setTravelingSlide(1)}
                                className="hud-btn"
                                style={{
                                  flex: 1,
                                  padding: '6px 10px',
                                  fontSize: '0.7rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  borderColor: '#ff007f',
                                  background: 'rgba(255, 0, 127, 0.05)',
                                  color: '#ff007f',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  textAlign: 'center'
                                }}
                              >
                                [ EXPLORE GEOGRAPHY & CULTURE ➔ ]
                              </button>
                              <button
                                onClick={() => setTravelingSlide(2)}
                                className="hud-btn"
                                style={{
                                  flex: 1,
                                  padding: '6px 10px',
                                  fontSize: '0.7rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  borderColor: '#ff007f',
                                  background: 'rgba(255, 0, 127, 0.05)',
                                  color: '#ff007f',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  textAlign: 'center'
                                }}
                              >
                                [ EXPLORE RELOCATION PLANS ➔ ]
                              </button>
                            </div>
                          </div>
                        ) : travelingSlide === 1 ? (
                          <div>
                            <span>
                              For me, traveling is about expanding horizons! I want to explore entirely new environments, understanding their unique local geography, physical landscapes, and rich cultural stories. Being stuck in the NYC area all the time feels limiting, and I yearn to discover new cities and scenery first-hand. Even though I cannot afford to travel right now due to financial constraints, my passion for mapping out new geographical locations and imagining their culture remains a powerful inspiration.
                            </span>
                            <div style={{ marginTop: '10px' }}>
                              <button
                                onClick={() => setTravelingSlide(0)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'rgba(255,255,255,0.4)',
                                  fontSize: '0.65rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              >
                                [ ↩ BACK TO OVERVIEW ]
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span>
                              My long-term goal is to establish a home in a more peaceful environment! I don't like NYC so much because of how incredibly busy, crowded, and fast-paced it is. Once I graduate from college and secure a job in my computer science field, I hope to relocate permanently to a less busy, more serene place where I can enjoy spatial independence and a calmer way of life.
                            </span>
                            <div style={{ marginTop: '10px' }}>
                              <button
                                onClick={() => setTravelingSlide(0)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'rgba(255,255,255,0.4)',
                                  fontSize: '0.65rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              >
                                [ ↩ BACK TO OVERVIEW ]
                              </button>
                            </div>
                          </div>
                        )
                      ) : (
                      activeInterest.id === 'neurodiversity' ? (
                        neurodiversitySlide === 0 ? (
                          <div>
                            <span style={{ display: 'block', marginBottom: '8px' }}>
                              Embracing neurodiversity has transformed my understanding of my cognitive wiring. Throughout my life, I wondered why I felt so different and misunderstood, but learning about cognitive variations has unlocked a journey of self-discovery and acceptance. Explore the core dimensions of my neurodiversity journey below:
                            </span>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                              <button
                                onClick={() => setNeurodiversitySlide(1)}
                                className="hud-btn"
                                style={{
                                  flex: '1 1 140px',
                                  padding: '6px 8px',
                                  fontSize: '0.65rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  borderColor: '#00ff88',
                                  background: 'rgba(0, 255, 136, 0.05)',
                                  color: '#00ff88',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  textAlign: 'center'
                                }}
                              >
                                [ 01 // FRIENDSHIP & ENERGY ➔ ]
                              </button>
                              <button
                                onClick={() => setNeurodiversitySlide(2)}
                                className="hud-btn"
                                style={{
                                  flex: '1 1 140px',
                                  padding: '6px 8px',
                                  fontSize: '0.65rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  borderColor: '#00ff88',
                                  background: 'rgba(0, 255, 136, 0.05)',
                                  color: '#00ff88',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  textAlign: 'center'
                                }}
                              >
                                [ 02 // DOUBLE EMPATHY & STIGMA ➔ ]
                              </button>
                              <button
                                onClick={() => setNeurodiversitySlide(3)}
                                className="hud-btn"
                                style={{
                                  flex: '1 1 140px',
                                  padding: '6px 8px',
                                  fontSize: '0.65rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  borderColor: '#00ff88',
                                  background: 'rgba(0, 255, 136, 0.05)',
                                  color: '#00ff88',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  textAlign: 'center'
                                }}
                              >
                                [ 03 // BURNOUT & LEARNING ➔ ]
                              </button>
                            </div>
                          </div>
                        ) : neurodiversitySlide === 1 ? (
                          <div>
                            <span>
                              For neurotypicals looking at this: autistic people do not "not care about other people"—we simply socialize and form friendships differently! Our energy levels fluctuate and are not the same every single day. Socializing drains our social battery heavily. When we withdraw or need space, it is not due to a lack of interest or care, but is instead about managing intense sensory input, coping with a fully drained battery, or needing quiet rest to recover.
                            </span>
                            <div style={{ marginTop: '10px' }}>
                              <button
                                onClick={() => setNeurodiversitySlide(0)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'rgba(255,255,255,0.4)',
                                  fontSize: '0.65rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              >
                                [ ↩ BACK TO OVERVIEW ]
                              </button>
                            </div>
                          </div>
                        ) : neurodiversitySlide === 2 ? (
                          <div>
                            <span>
                              A major key to self-acceptance is double empathy—the reality that autistic individuals communicate and empathize very easily and naturally with other autistic peers, just as allistic (non-autistic) individuals do with their own allistic peers. Growing up in old-school traditional values that had no room for neurodiversity, my perception was temporarily skewed, making me view other autistic people as less socially capable when that is not the case. Unlearning these stigmas has taught me we are fully capable of rich socialization on our own terms.
                            </span>
                            <div style={{ marginTop: '10px' }}>
                              <button
                                onClick={() => setNeurodiversitySlide(0)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'rgba(255,255,255,0.4)',
                                  fontSize: '0.65rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              >
                                [ ↩ BACK TO OVERVIEW ]
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span>
                              Discovering concepts like autistic burnout (severe physical and mental exhaustion caused by masking and sensory overload) and unique learning differences has been life-changing. I now recognize that autism is a natural cognitive variation (neurotype) rather than a pathology or disability. Embracing these insights allows me to honor my specific learning style and prioritize authentic recovery and rest.
                            </span>
                            <div style={{ marginTop: '10px' }}>
                              <button
                                onClick={() => setNeurodiversitySlide(0)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'rgba(255,255,255,0.4)',
                                  fontSize: '0.65rem',
                                  fontFamily: 'monospace, var(--font-tech)',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              >
                                [ ↩ BACK TO OVERVIEW ]
                              </button>
                            </div>
                          </div>
                        )
                      ) : (
                        <span>{activeInterest.desc}</span>
                      )
                   )}
                    </div>
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
                  {activeInterest.type === 'tech' && techSlide === 0 && (
                    <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#080b13', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#141a29" />
                      <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
                      <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
                      <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // TECH_INTEGRATION_CORE</text>
                      
                      <g opacity="0.1">
                        <line x1="0" y1="40" x2="320" y2="40" stroke="#00f0ff" strokeWidth="0.5" />
                        <line x1="0" y1="70" x2="320" y2="70" stroke="#00f0ff" strokeWidth="0.5" />
                        <line x1="160" y1="15" x2="160" y2="110" stroke="#00f0ff" strokeWidth="0.5" />
                      </g>

                      {/* Left Side: GUI Terminal Node */}
                      <g transform="translate(15, 20)">
                        <rect x="5" y="10" width="80" height="50" rx="3" fill="none" stroke="#00f0ff" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 2px rgba(0,240,255,0.3))' }} />
                        <rect x="10" y="15" width="70" height="30" rx="1.5" fill="#060910" stroke="rgba(0,240,255,0.2)" strokeWidth="0.8" />
                        <line x1="15" y1="20" x2="45" y2="20" stroke="#00f0ff" strokeWidth="1" />
                        <line x1="15" y1="26" x2="35" y2="26" stroke="#00ff88" strokeWidth="0.8" />
                        <line x1="15" y1="32" x2="55" y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                        <circle cx="65" cy="25" r="5" fill="none" stroke="#2979ff" strokeWidth="1" />
                        <text x="45" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">GUI SYSTEMS</text>
                      </g>

                      {/* Center: SYNC LINK */}
                      <g transform="translate(110, 55)">
                        <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 2" />
                        <path d="M 40,-8 L 50,0 L 40,8" fill="none" stroke="#00ff88" strokeWidth="1" />
                        <path d="M 60,-8 L 50,0 L 60,8" fill="none" stroke="#00f0ff" strokeWidth="1" />
                        <rect x="33" y="-6" width="34" height="12" rx="2" fill="#141a29" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                        <text x="50" y="2.5" fill="#00f0ff" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SYNAPSE</text>
                      </g>

                      {/* Right Side: Gadget Holographic Emitter Node */}
                      <g transform="translate(225, 20)">
                        <ellipse cx="40" cy="35" rx="25" ry="10" fill="none" stroke="#00ff88" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 2px rgba(0,255,136,0.3))' }} />
                        <ellipse cx="40" cy="35" rx="10" ry="4" fill="none" stroke="#00f0ff" strokeWidth="1" />
                        <path d="M 30,35 Q 40,10 50,35" fill="none" stroke="#c259ff" strokeWidth="1" strokeDasharray="2 1" />
                        <circle cx="40" cy="15" r="3" fill="#fff" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
                        <line x1="40" y1="35" x2="40" y2="15" stroke="rgba(0,255,136,0.4)" strokeWidth="0.8" />
                        <text x="40" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">GADGET CORES</text>
                      </g>

                      <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">HYBRID_PORT: interactive_deck_v3</text>
                      <text x="310" y="102" fill="#00f0ff" fontSize="5.5" fontFamily="monospace" textAnchor="end">INTEGRATION: ACTIVE</text>
                    </svg>
                  )}

                  {activeInterest.type === 'tech' && techSlide === 1 && (
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

                  {activeInterest.type === 'tech' && techSlide === 2 && (
                    <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#080b13', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#141a29" />
                      <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
                      <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
                      <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // FUTURISTIC_GADGET_SCHEMATIC</text>
                      <g opacity="0.15">
                        <line x1="0" y1="40" x2="320" y2="40" stroke="#00f0ff" strokeWidth="0.5" />
                        <line x1="0" y1="70" x2="320" y2="70" stroke="#00f0ff" strokeWidth="0.5" />
                        <line x1="80" y1="15" x2="80" y2="110" stroke="#00f0ff" strokeWidth="0.5" />
                        <line x1="240" y1="15" x2="240" y2="110" stroke="#00f0ff" strokeWidth="0.5" />
                      </g>
                      <g transform="translate(160, 60)" style={{ filter: 'drop-shadow(0 0 4px #00f0ff)' }}>
                        <path d="M -50,15 L -20,5 Q 0,0 20,5 L 50,15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
                        <path d="M -50,-15 L -20,-5 Q 0,0 20,-5 L 50,-15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
                        <ellipse cx="0" cy="0" rx="18" ry="6" fill="#141a29" stroke="#00f0ff" strokeWidth="2" />
                        <ellipse cx="0" cy="0" rx="8" ry="3" fill="none" stroke="#00ff88" strokeWidth="1.5" />
                        <circle cx="0" cy="0" r="1.5" fill="#fff" />
                        <path d="M -12,0 L -30,-35 L 30,-35 L 12,0 Z" fill="url(#gadgetHoloGlow)" opacity="0.25" />
                        <g transform="translate(0, -32)" opacity="0.9">
                          <circle cx="0" cy="0" r="12" fill="none" stroke="#00ff88" strokeWidth="1" strokeDasharray="3 1" />
                          <text x="0" y="3" fill="#00ff88" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">MY38</text>
                          <circle cx="-25" cy="-5" r="5" fill="none" stroke="#00f0ff" strokeWidth="0.8" />
                          <path d="M -25,-8 L -25,-5 L -23,-5" fill="none" stroke="#00f0ff" strokeWidth="0.8" />
                          <rect x="18" y="-10" width="10" height="8" rx="1.5" fill="none" stroke="#c259ff" strokeWidth="0.8" />
                          <line x1="21" y1="-6" x2="25" y2="-6" stroke="#c259ff" strokeWidth="0.8" />
                        </g>
                      </g>
                      <defs>
                        <linearGradient id="gadgetHoloGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">CORE: quantum_emitter_v4.2</text>
                      <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">STATUS: LATEST // ACTIVE</text>
                    </svg>
                  )}

                  {/* Sci-Fi carousel graphic */}
                  {activeInterest.type === 'scifi' && scifiSlide === 0 && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194,89,255,0.08)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#151324" />
                      <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
                      <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
                      <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // CINEMATIC_INTEGRATION_CORE</text>

                      <g opacity="0.1">
                        <line x1="0" y1="40" x2="320" y2="40" stroke="#c259ff" strokeWidth="0.5" />
                        <line x1="160" y1="15" x2="160" y2="90" stroke="#c259ff" strokeWidth="0.5" />
                      </g>

                      {/* Left side: Sci-Fi node (Lightsaber / Laser Emitter) */}
                      <g transform="translate(15, 20)">
                        <line x1="10" y1="40" x2="35" y2="20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px #00f0ff)' }} />
                        <line x1="10" y1="40" x2="18" y2="34" stroke="#555" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="50" cy="15" r="10" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 1" />
                        <text x="35" y="52" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">SCI-FI TELEMETRY</text>
                      </g>

                      {/* Center Link: Chrono Synapse */}
                      <g transform="translate(110, 45)">
                        <path d="M 10,0 Q 50,-10 90,0" fill="none" stroke="rgba(194, 89, 255, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="50" cy="-4" r="3.5" fill="#141a29" stroke="#ffe082" strokeWidth="1" />
                        <text x="50" y="0.5" fill="#ffe082" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SYNAPSE</text>
                      </g>

                      {/* Right side: Fantasy node (Magic Wand / Synapse Node) */}
                      <g transform="translate(210, 20)">
                        <line x1="75" y1="40" x2="50" y2="20" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 2px #ffe082)' }} />
                        <path d="M 46,16 L 49,16 L 47,19 Z" fill="#ffe082" style={{ filter: 'drop-shadow(0 0 3px #ffe082)' }} />
                        <circle cx="50" cy="20" r="1.5" fill="#fff" />
                        <circle cx="42" cy="22" r="0.8" fill="#fff" />
                        <circle cx="58" cy="16" r="0.8" fill="#fff" />
                        <text x="45" y="52" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">FANTASY LORE</text>
                      </g>

                      <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: cinema_sync_v2.0</text>
                      <text x="310" y="84" fill="#c259ff" fontSize="5.5" fontFamily="monospace" textAnchor="end">INTEGRATION: ACTIVE</text>
                    </svg>
                  )}

                  {activeInterest.type === 'scifi' && scifiSlide === 1 && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194,89,255,0.08)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#151324" />
                      <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
                      <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
                      <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // FUTURE_INTERFACE_GRID</text>
                      
                      {/* LCARS-style block elements on the left */}
                      <g transform="translate(10, 20)">
                        <path d="M 5,5 L 30,5 A 5 5 0 0 1 35,10 L 35,18 L 10,18 A 5 5 0 0 0 5,23 L 5,35" fill="none" stroke="#ffe082" strokeWidth="2.5" />
                        <rect x="12" y="10" width="10" height="4" fill="#c259ff" />
                        <rect x="24" y="10" width="8" height="4" fill="#00f0ff" />
                        <text x="20" y="27" fill="rgba(255,255,255,0.5)" fontSize="5" fontFamily="monospace">LCARS v9</text>
                      </g>

                      {/* Iron Man circular HUD overlay in the center */}
                      <g transform="translate(160, 50)" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}>
                        <circle cx="0" cy="0" r="22" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="4 2" />
                        <circle cx="0" cy="0" r="14" fill="none" stroke="#ffe082" strokeWidth="1.2" />
                        <path d="M -8,-8 L 8,8 M -8,8 L 8,-8" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="0.6" />
                        <circle cx="0" cy="0" r="4" fill="#00ff88" />
                        <text x="25" y="-12" fill="#ffe082" fontSize="5" fontFamily="monospace">JARVIS_ONLINE</text>
                        <line x1="12" y1="-8" x2="22" y2="-12" stroke="#00f0ff" strokeWidth="0.6" />
                      </g>

                      {/* Star Wars holographic vector on the right */}
                      <g transform="translate(245, 20)">
                        <path d="M 10,40 Q 30,10 50,40 Z" fill="none" stroke="#00ff88" strokeWidth="1.2" opacity="0.8" />
                        <line x1="30" y1="48" x2="30" y2="40" stroke="#00ff88" strokeWidth="1" />
                        <ellipse cx="30" cy="48" rx="12" ry="4" fill="#080b13" stroke="#00f0ff" strokeWidth="1" />
                        <path d="M 18,48 L 30,25 L 42,48" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.8" />
                        <text x="30" y="58" fill="rgba(255,255,255,0.6)" fontSize="5" fontFamily="monospace" textAnchor="middle">HOLO_PROJECTOR</text>
                      </g>
                    </svg>
                  )}

                  {activeInterest.type === 'scifi' && scifiSlide === 2 && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194,89,255,0.08)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#151324" />
                      <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
                      <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
                      <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // FANTASY_LEGENDARY_DECK</text>

                      {/* Harry Potter: Magic Wand and golden snitch on the left */}
                      <g transform="translate(15, 20)">
                        <line x1="10" y1="40" x2="45" y2="15" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px #ffe082)' }} />
                        <circle cx="48" cy="13" r="2.5" fill="#fff" />
                        {/* Golden Snitch */}
                        <circle cx="20" cy="18" r="4.5" fill="#ffe082" style={{ filter: 'drop-shadow(0 0 2px #ffe082)' }} />
                        <path d="M 20,13.5 C 10,10 5,16 15.5,18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                        <path d="M 20,13.5 C 30,10 35,16 24.5,18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                        <text x="30" y="52" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">MAGIC & WANDS</text>
                      </g>

                      {/* Lord of the Rings: One Ring in the center */}
                      <g transform="translate(160, 42)">
                        <circle cx="0" cy="0" r="13" fill="none" stroke="#ffb300" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 4px #ffb300)' }} />
                        <circle cx="0" cy="0" r="10" fill="none" stroke="#ea4335" strokeWidth="0.8" opacity="0.6" />
                        <text x="0" y="30" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">THE ONE RING</text>
                      </g>

                      {/* Back to the future: Delorean speed meter on the right */}
                      <g transform="translate(255, 20)">
                        <rect x="0" y="5" width="50" height="30" rx="3" fill="#080b13" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        <text x="25" y="18" fill="#ff5722" fontSize="11" fontFamily="monospace" fontWeight="900" textAnchor="middle" style={{ filter: 'drop-shadow(0 0 2px #ff5722)' }}>88</text>
                        <text x="25" y="29" fill="#ff5722" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">MPH</text>
                        <text x="25" y="52" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">TEMPORAL LOGIC</text>
                      </g>
                    </svg>
                  )}

                  {/* Music Vinyl spin graphic */}
                  {activeInterest.type === 'music' && musicSlide === 0 && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 179, 0, 0.2)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#1b1508" />
                      <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
                      <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
                      <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // ACOUSTIC_INTEGRATION_CORE</text>

                      <g opacity="0.1">
                        <line x1="0" y1="40" x2="320" y2="40" stroke="#ffb300" strokeWidth="0.5" />
                        <line x1="160" y1="15" x2="160" y2="90" stroke="#ffb300" strokeWidth="0.5" />
                      </g>

                      {/* Left side: Organ Pipes / Piano Keys */}
                      <g transform="translate(15, 20)">
                        <rect x="5" y="5" width="4" height="25" fill="#ffb300" opacity="0.8" />
                        <rect x="11" y="0" width="4" height="30" fill="#ffe082" />
                        <rect x="17" y="8" width="4" height="22" fill="#ffb300" opacity="0.8" />
                        <rect x="23" y="3" width="4" height="27" fill="#ffe082" />
                        <rect x="29" y="12" width="4" height="18" fill="#ffb300" opacity="0.8" />
                        <text x="17" y="52" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">PIPE ORGAN CORES</text>
                      </g>

                      {/* Center Link: Synapse */}
                      <g transform="translate(110, 45)">
                        <path d="M 10,0 Q 50,10 90,0" fill="none" stroke="rgba(255, 179, 0, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="50" y="4" fill="#00ff88" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SYNAPSE</text>
                      </g>

                      {/* Right side: Vocal Wave / Microphone */}
                      <g transform="translate(225, 20)">
                        <circle cx="20" cy="15" r="5" fill="none" stroke="#00ff88" strokeWidth="1.2" />
                        <line x1="20" y1="20" x2="20" y2="30" stroke="#00ff88" strokeWidth="1.5" />
                        <line x1="15" y1="30" x2="25" y2="30" stroke="#00ff88" strokeWidth="1.2" />
                        <path d="M 5,20 Q 20,40 35,20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        <text x="20" y="52" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">VOCAL CHANNELS</text>
                      </g>

                      <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: acoustical_sync_v1.2</text>
                      <text x="310" y="84" fill="#ffb300" fontSize="5.5" fontFamily="monospace" textAnchor="end">INTEGRATION: ACTIVE</text>
                    </svg>
                  )}

                  {activeInterest.type === 'music' && musicSlide === 1 && (
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
                      <text x="160" y="85" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">FAVORITES: TAYLOR SWIFT // NOAH KAHAN // PIPE ORGAN</text>
                    </svg>
                  )}

                  {activeInterest.type === 'music' && musicSlide === 2 && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#081c13" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // VOCAL_SPECTRUM_HUD</text>

                      {/* Waveform graphic */}
                      <g transform="translate(10, 20)">
                        <path d="M 10,25 Q 30,5 50,25 T 90,25 T 130,25 T 170,25 T 210,25 T 250,25 T 290,25" fill="none" stroke="#00ff88" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,136,0.6))' }} />
                        <path d="M 10,25 Q 30,15 50,25 T 90,25 T 130,25 T 170,25 T 210,25 T 250,25 T 290,25" fill="none" stroke="#00f0ff" strokeWidth="0.8" opacity="0.6" />
                        <line x1="10" y1="25" x2="290" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="3 3" />
                      </g>

                      <text x="160" y="80" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">VIBRATO DETECTOR // KARAOKE SCRIPT CORES: 44.1kHz</text>
                    </svg>
                  )}

                  {/* Biking overview slide 0 */}
                  {activeInterest.type === 'biking' && bikingSlide === 0 && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#081c13" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // MOBILITY_INTEGRATION_CORE</text>

                      {/* Left side: Bicycle gear/wheel schematic */}
                      <g transform="translate(45, 50)">
                        <circle cx="0" cy="0" r="22" fill="none" stroke="#00ff88" strokeWidth="1" strokeDasharray="3 2" />
                        <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                        <circle cx="0" cy="0" r="8" fill="none" stroke="#00ff88" strokeWidth="1.5" />
                        <circle cx="0" cy="0" r="2" fill="#fff" />
                        <line x1="0" y1="-22" x2="0" y2="22" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" />
                        <line x1="-22" y1="0" x2="22" y2="0" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" />
                        <line x1="-15.5" y1="-15.5" x2="15.5" y2="15.5" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" />
                        <line x1="-15.5" y1="15.5" x2="15.5" y2="-15.5" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" />
                        <text x="0" y="32" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">GEAR HUB SPECS</text>
                      </g>

                      {/* Center Link: Synapse / Delta Link */}
                      <g>
                        <path d="M 67,50 C 120,30 190,70 243,50" fill="none" stroke="#00ff88" strokeWidth="1.2" strokeDasharray="3 3" />
                        <text x="155" y="46" fill="#fff" fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity="0.7">TRANSIT DELTA LINK</text>
                        <rect x="120" y="52" width="70" height="8" rx="2" fill="rgba(0, 255, 136, 0.08)" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.5" />
                        <text x="155" y="58" fill="#00ff88" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">INDEPENDENCE: 100%</text>
                      </g>

                      {/* Right side: Transit map routing nodes */}
                      <g>
                        <path d="M 245,60 L 265,40 L 285,60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        <circle cx="245" cy="60" r="3" fill="#00f0ff" />
                        <circle cx="265" cy="40" r="3.5" fill="#00ff88" stroke="#fff" strokeWidth="0.5" />
                        <circle cx="285" cy="60" r="3" fill="#00f0ff" />
                        <text x="265" y="74" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">COMMUTE NODES</text>
                      </g>

                      <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: mobility_core_v1.0</text>
                      <text x="310" y="84" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">INTEGRATION: ARMED</text>
                    </svg>
                  )}

                  {/* Biking time & routing slide 1 */}
                  {activeInterest.type === 'biking' && bikingSlide === 1 && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#081c13" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // ROUTING_EFFICIENCY_DECK</text>

                      {/* Map grid background */}
                      <g opacity="0.15">
                        <line x1="10" y1="20" x2="310" y2="20" stroke="#00ff88" strokeWidth="0.5" />
                        <line x1="10" y1="40" x2="310" y2="40" stroke="#00ff88" strokeWidth="0.5" />
                        <line x1="10" y1="60" x2="310" y2="60" stroke="#00ff88" strokeWidth="0.5" />
                        <line x1="50" y1="15" x2="50" y2="80" stroke="#00ff88" strokeWidth="0.5" />
                        <line x1="110" y1="15" x2="110" y2="80" stroke="#00ff88" strokeWidth="0.5" />
                        <line x1="170" y1="15" x2="170" y2="80" stroke="#00ff88" strokeWidth="0.5" />
                        <line x1="230" y1="15" x2="230" y2="80" stroke="#00ff88" strokeWidth="0.5" />
                        <line x1="290" y1="15" x2="290" y2="80" stroke="#00ff88" strokeWidth="0.5" />
                      </g>

                      {/* Transit winding slow route */}
                      <path d="M 20,65 L 50,65 L 50,45 L 110,45 L 110,25 L 140,25" fill="none" stroke="rgba(255, 87, 34, 0.4)" strokeWidth="1.5" strokeDasharray="2 2" />
                      <text x="60" y="38" fill="rgba(255, 87, 34, 0.8)" fontSize="5" fontFamily="monospace">TRANSIT: 75 MINS</text>

                      {/* Biking route (direct & glowing) */}
                      <path d="M 20,65 L 80,65 L 140,25" fill="none" stroke="#00ff88" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 3px rgba(0,255,136,0.6))' }} />
                      
                      {/* Start node */}
                      <circle cx="20" cy="65" r="4" fill="#00ff88" stroke="#fff" strokeWidth="0.8" />
                      <text x="20" y="58" fill="#fff" fontSize="4.5" fontFamily="monospace" fontWeight="bold">HOME</text>

                      {/* End node */}
                      <circle cx="140" cy="25" r="4" fill="#00f0ff" stroke="#fff" strokeWidth="0.8" />
                      <text x="140" y="18" fill="#fff" fontSize="4.5" fontFamily="monospace" fontWeight="bold">ADELPHI</text>

                      {/* Telemetry panel */}
                      <g transform="translate(180, 22)">
                        <rect x="0" y="0" width="130" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1" />
                        <text x="10" y="12" fill="#00ff88" fontSize="7" fontFamily="monospace" fontWeight="bold">DELTA: -30 MINS</text>
                        <text x="10" y="24" fill="#fff" fontSize="6.5" fontFamily="monospace">BIKE COMMUTE: 45m</text>
                        <text x="10" y="34" fill="rgba(255,255,255,0.6)" fontSize="5" fontFamily="monospace">MAPS RATIO: 1.66x FASTER</text>
                        <text x="10" y="44" fill="#00f0ff" fontSize="5.5" fontFamily="monospace" fontWeight="bold">TAILWIND SPEED BOOST</text>
                      </g>

                      <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SCHEDULING: INDEPENDENT</text>
                      <text x="310" y="84" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">ROUTE A5: SAVINGS CORE</text>
                    </svg>
                  )}

                  {/* Biking daily endurance slide 2 */}
                  {activeInterest.type === 'biking' && bikingSlide === 2 && (
                    <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#081c13" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // ENDURANCE_WEATHER_GRID</text>

                      {/* Diagonal rain-drops representing severe precipitation and headwinds */}
                      <g stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.8" strokeLinecap="round">
                        <line x1="20" y1="20" x2="10" y2="40" />
                        <line x1="60" y1="20" x2="50" y2="40" />
                        <line x1="100" y1="20" x2="90" y2="40" />
                        <line x1="140" y1="20" x2="130" y2="40" />
                        <line x1="180" y1="20" x2="170" y2="40" />
                        <line x1="220" y1="20" x2="210" y2="40" />
                        <line x1="260" y1="20" x2="250" y2="40" />
                        <line x1="300" y1="20" x2="290" y2="40" />
                        <line x1="40" y1="40" x2="30" y2="60" />
                        <line x1="80" y1="40" x2="70" y2="60" />
                        <line x1="120" y1="40" x2="110" y2="60" />
                        <line x1="160" y1="40" x2="150" y2="60" />
                        <line x1="200" y1="40" x2="190" y2="60" />
                        <line x1="240" y1="40" x2="230" y2="60" />
                        <line x1="280" y1="40" x2="270" y2="60" />
                        <line x1="30" y1="60" x2="20" y2="80" />
                        <line x1="70" y1="60" x2="60" y2="80" />
                        <line x1="110" y1="60" x2="100" y2="80" />
                        <line x1="150" y1="60" x2="140" y2="80" />
                        <line x1="190" y1="60" x2="180" y2="80" />
                        <line x1="230" y1="60" x2="220" y2="80" />
                        <line x1="270" y1="60" x2="260" y2="80" />
                      </g>

                      {/* Headwind vectors */}
                      <g stroke="#00ff88" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
                        <path d="M 120,32 L 95,32 M 100,28 L 95,32 L 100,36" fill="none" />
                        <path d="M 175,55 L 150,55 M 155,51 L 150,55 L 155,59" fill="none" />
                        <text x="145" y="27" fill="#00ff88" fontSize="4.5" fontFamily="monospace">HEADWIND CURRENT</text>
                      </g>

                      {/* Left side circular gauge */}
                      <g transform="translate(45, 50)">
                        <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                        <circle cx="0" cy="0" r="18" fill="none" stroke="#00ff88" strokeWidth="3" strokeDasharray="80 30" strokeDashoffset="15" />
                        <text x="0" y="2.5" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">92%</text>
                        <text x="0" y="26" fill="rgba(255,255,255,0.6)" fontSize="5" fontFamily="monospace" textAnchor="middle">GRIT RATIO</text>
                      </g>

                      {/* Telemetry panel */}
                      <g transform="translate(205, 22)">
                        <rect x="0" y="0" width="105" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1" />
                        <text x="8" y="12" fill="#00ff88" fontSize="6.5" fontFamily="monospace" fontWeight="bold">DAILY GOAL: ACTIVE</text>
                        <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">ALL-WEATHER ENVIRO</text>
                        <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">INSPIRING COMPANION</text>
                        <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">LIMITS: EXPANDED</text>
                      </g>

                      <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">ATMOSPHERE: PRECIPITATION_RAIN</text>
                      <text x="310" y="84" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">ENDURANCE: MAX_LEVEL</text>
                    </svg>
                  )}

                  {/* Flag Football tactical overview slide 0 */}
                  {activeInterest.type === 'flag_football' && footballSlide === 0 && (
                    <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 87, 34, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#1b100a" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // PLAYBOOK_INCLUSION_CORE</text>

                      {/* Left side: Playbook tactician's route chart */}
                      <g transform="translate(15, 20)">
                        <circle cx="20" cy="40" r="7" fill="none" stroke="#ff5722" strokeWidth="1" />
                        <text x="20" y="43" fill="#ff5722" fontSize="8" fontFamily="monospace" textAnchor="middle">Q</text>
                        <circle cx="45" cy="40" r="3" fill="#00f0ff" />
                        <circle cx="70" cy="40" r="3" fill="#00f0ff" />
                        <path d="M 45,40 Q 55,15 75,15" fill="none" stroke="#ff5722" strokeWidth="1.2" strokeDasharray="3 2" />
                        <polygon points="75,12 72,17 78,17" fill="#ff5722" />
                        <text x="45" y="58" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">TACTICAL MATRIX</text>
                      </g>

                      {/* Center Link: Synapse / Delta Link */}
                      <g>
                        <path d="M 100,50 C 135,30 185,70 220,50" fill="none" stroke="#ff5722" strokeWidth="1.2" strokeDasharray="3 3" />
                        <text x="160" y="46" fill="#fff" fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity="0.75">INCLUSION DELTA LINK</text>
                        <rect x="125" y="52" width="70" height="8" rx="2" fill="rgba(255, 87, 34, 0.08)" stroke="rgba(255, 87, 34, 0.3)" strokeWidth="0.5" />
                        <text x="160" y="58" fill="#ff5722" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ROLE VALUE: 100%</text>
                      </g>

                      {/* Right side: Inclusion network node graph */}
                      <g transform="translate(210, 20)">
                        <circle cx="50" cy="30" r="4.5" fill="#ff5722" stroke="#fff" strokeWidth="0.8" />
                        <circle cx="30" cy="15" r="3" fill="#00f0ff" />
                        <circle cx="70" cy="15" r="3" fill="#00f0ff" />
                        <circle cx="30" cy="45" r="3" fill="#00f0ff" />
                        <circle cx="70" cy="45" r="3" fill="#00f0ff" />
                        <line x1="50" y1="30" x2="30" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                        <line x1="50" y1="30" x2="70" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                        <line x1="50" y1="30" x2="30" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                        <line x1="50" y1="30" x2="70" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                        <text x="50" y="60" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">TEAM DYNAMICS</text>
                      </g>

                      <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: playbook_sync_v1.0</text>
                      <text x="310" y="102" fill="#ff5722" fontSize="5.5" fontFamily="monospace" textAnchor="end">INCLUSION: MAXIMIZED</text>
                    </svg>
                  )}

                  {/* Flag Football playmaker thrills slide 1 */}
                  {activeInterest.type === 'flag_football' && footballSlide === 1 && (
                    <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 87, 34, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#1b100a" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // PLAYMAKER_HIGHLIGHT_GRID</text>

                      {/* Map grid background */}
                      <g opacity="0.1">
                        <line x1="10" y1="20" x2="310" y2="20" stroke="#ff5722" strokeWidth="0.5" />
                        <line x1="10" y1="50" x2="310" y2="50" stroke="#ff5722" strokeWidth="0.5" />
                        <line x1="10" y1="80" x2="310" y2="80" stroke="#ff5722" strokeWidth="0.5" />
                        <line x1="50" y1="15" x2="50" y2="100" stroke="#ff5722" strokeWidth="0.5" />
                        <line x1="110" y1="15" x2="110" y2="100" stroke="#ff5722" strokeWidth="0.5" />
                        <line x1="170" y1="15" x2="170" y2="100" stroke="#ff5722" strokeWidth="0.5" />
                        <line x1="230" y1="15" x2="230" y2="100" stroke="#ff5722" strokeWidth="0.5" />
                      </g>

                      {/* Left side: Interception tracker */}
                      <g transform="translate(10, 20)">
                        <circle cx="45" cy="30" r="18" fill="none" stroke="rgba(255, 87, 34, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="45" cy="30" r="10" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1" />
                        <circle cx="45" cy="30" r="3" fill="#ff5722" />
                        <path d="M 15,48 L 35,35 L 45,30" fill="none" stroke="#ff5722" strokeWidth="2.2" style={{ filter: 'drop-shadow(0 0 3px rgba(255,87,34,0.6))' }} />
                        <text x="45" y="58" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">INTERCEPT RADAR</text>
                      </g>

                      {/* Telemetry panel */}
                      <g transform="translate(180, 25)">
                        <rect x="0" y="0" width="130" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(255, 87, 34, 0.2)" strokeWidth="1" />
                        <text x="10" y="12" fill="#ff5722" fontSize="6.5" fontFamily="monospace" fontWeight="bold">HIGHLIGHT: PASS INT</text>
                        <text x="10" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">TOUCHDOWN CAPTURE</text>
                        <text x="10" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">TEAM EXCITEMENT: PEAK</text>
                        <text x="10" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">SOCIAL SCRIPTS: SUCCESS</text>
                      </g>

                      <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">PREDICTION: INTERCEPT_OK</text>
                      <text x="310" y="102" fill="#ff5722" fontSize="5.5" fontFamily="monospace" textAnchor="end">THRILL_INDEX: 100%</text>
                    </svg>
                  )}

                  {/* Flag Football huddles & playbook strategy slide 2 */}
                  {activeInterest.type === 'flag_football' && footballSlide === 2 && (
                    <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 87, 34, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)' }}>
                      <rect x="0" y="0" width="320" height="15" fill="#1b100a" />
                      <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // STRATEGIC_PLAYBOOK_MATRIX</text>

                      {/* Playbook route design */}
                      <g transform="translate(10, 20)">
                        <circle cx="80" cy="40" r="7" fill="none" stroke="#fff" strokeWidth="1" />
                        <text x="80" y="43" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle">Q</text>
                        <circle cx="40" cy="40" r="4" fill="none" stroke="#ff5722" strokeWidth="1.2" />
                        <text x="40" y="43" fill="#ff5722" fontSize="6" fontFamily="monospace" textAnchor="middle">X</text>
                        <circle cx="120" cy="40" r="4" fill="none" stroke="#ff5722" strokeWidth="1.2" />
                        <text x="120" y="43" fill="#ff5722" fontSize="6" fontFamily="monospace" textAnchor="middle">Z</text>
                        
                        {/* Playbook routes */}
                        <path d="M 40,36 L 40,15 L 15,15" fill="none" stroke="#ff5722" strokeWidth="1.5" strokeDasharray="3 2" />
                        <polygon points="15,12 8,15 15,18" fill="#ff5722" />
                        <text x="28" y="10" fill="#ff5722" fontSize="5.5" fontFamily="monospace">OUT ROUTE</text>
                        
                        <path d="M 120,36 L 120,10" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 2" />
                        <line x1="114" y1="10" x2="126" y2="10" stroke="#00f0ff" strokeWidth="1.5" />
                        <text x="123" y="19" fill="#00f0ff" fontSize="5.5" fontFamily="monospace">BLOCK LINE</text>
                        <text x="80" y="58" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">HUDDLE STRATEGY</text>
                      </g>

                      {/* Telemetry panel */}
                      <g transform="translate(195, 25)">
                        <rect x="0" y="0" width="115" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(255, 87, 34, 0.2)" strokeWidth="1" />
                        <text x="8" y="12" fill="#ff5722" fontSize="6.5" fontFamily="monospace" fontWeight="bold">PLAYBOOK: ACTIVE</text>
                        <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">HUDDLE SYNC: OK</text>
                        <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">STRUCTURED SOCIAL</text>
                        <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">ROLE: BLOCKER</text>
                      </g>

                      <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SCHEDULING: TACTICAL</text>
                      <text x="310" y="102" fill="#ff5722" fontSize="5.5" fontFamily="monospace" textAnchor="end">TEAM UNITY: SECURED</text>
                    </svg>
                  )}

                {/* Traveling global/US flight deck map graphic - Slide 0 */}
                {activeInterest.type === 'traveling' && travelingSlide === 0 && (
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

                {/* Traveling geographic topography survey grid - Slide 1 */}
                {activeInterest.type === 'traveling' && travelingSlide === 1 && (
                  <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 0, 127, 0.22)', boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.08)' }}>
                    <rect x="0" y="0" width="320" height="15" fill="#1b000a" />
                    <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // GEOGRAPHIC_SURVEY_DECK</text>

                    {/* Grid Background */}
                    <g opacity="0.05">
                      <line x1="0" y1="35" x2="320" y2="35" stroke="#ff007f" strokeWidth="0.5" />
                      <line x1="0" y1="65" x2="320" y2="65" stroke="#ff007f" strokeWidth="0.5" />
                      <line x1="0" y1="95" x2="320" y2="95" stroke="#ff007f" strokeWidth="0.5" />
                      <line x1="80" y1="15" x2="80" y2="110" stroke="#ff007f" strokeWidth="0.5" />
                      <line x1="160" y1="15" x2="160" y2="110" stroke="#ff007f" strokeWidth="0.5" />
                      <line x1="240" y1="15" x2="240" y2="110" stroke="#ff007f" strokeWidth="0.5" />
                    </g>

                    {/* Left: Compass / Coordinate Vector */}
                    <g transform="translate(15, 20)">
                      {/* Topography wavy contours */}
                      <path d="M 5,45 Q 25,20 45,35 T 85,25" fill="none" stroke="rgba(255, 0, 127, 0.2)" strokeWidth="1.2" />
                      <path d="M 5,55 Q 30,30 50,45 T 85,35" fill="none" stroke="rgba(255, 0, 127, 0.3)" strokeWidth="1.2" />
                      <path d="M 5,65 Q 35,40 55,55 T 85,45" fill="none" stroke="rgba(255, 0, 127, 0.15)" strokeWidth="1" />
                      
                      {/* Compass rose / crosshair */}
                      <circle cx="110" cy="35" r="14" fill="none" stroke="#ff007f" strokeWidth="1" strokeDasharray="2 1" />
                      <line x1="110" y1="17" x2="110" y2="53" stroke="#ff007f" strokeWidth="0.8" />
                      <line x1="92" y1="35" x2="128" y2="35" stroke="#ff007f" strokeWidth="0.8" />
                      <polygon points="110,25 113,35 107,35" fill="#ff007f" />
                      <text x="110" y="16" fill="#ff007f" fontSize="5" fontFamily="monospace" textAnchor="middle">N</text>
                      <text x="50" y="58" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">TOPOGRAPHIC SCANNER</text>
                    </g>

                    {/* Right: Telemetry Panel */}
                    <g transform="translate(180, 25)">
                      <rect x="0" y="0" width="130" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(255, 0, 127, 0.2)" strokeWidth="1" />
                      <text x="10" y="12" fill="#ff007f" fontSize="6.5" fontFamily="monospace" fontWeight="bold">EXPLORATION: ACTIVE</text>
                      <text x="10" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">GEOGRAPHY SCAN: ON</text>
                      <text x="10" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">CULTURAL PROFILE: READY</text>
                      <text x="10" y="42" fill="#00ff88" fontSize="5" fontFamily="monospace" fontWeight="bold">BUDGET RATIO: ASPIRATIONAL</text>
                    </g>

                    <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SECTOR: BEYOND_NYC_METRO</text>
                    <text x="310" y="102" fill="#ff007f" fontSize="5.5" fontFamily="monospace" textAnchor="end">TERRAIN_SURVEY: 100%</text>
                  </svg>
                )}

                {/* Traveling relocation grid - Slide 2 */}
                {activeInterest.type === 'traveling' && travelingSlide === 2 && (
                  <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 0, 127, 0.22)', boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.08)' }}>
                    <rect x="0" y="0" width="320" height="15" fill="#1b000a" />
                    <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // COLONY_RELOCATION_GRID</text>

                    {/* Congested NYC Node vs Peaceful Outpost Node */}
                    <g transform="translate(10, 20)">
                      {/* Busy NYC Congested Grid Node */}
                      <circle cx="35" cy="35" r="16" fill="rgba(234, 67, 53, 0.08)" stroke="#ea4335" strokeWidth="0.8" strokeDasharray="2 2" />
                      <circle cx="35" cy="35" r="5" fill="#ea4335" />
                      <line x1="23" y1="35" x2="47" y2="35" stroke="#ea4335" strokeWidth="0.8" />
                      <line x1="35" y1="23" x2="35" y2="47" stroke="#ea4335" strokeWidth="0.8" />
                      <text x="35" y="58" fill="#ea4335" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NYC: CONGESTED</text>
                      
                      {/* Transition Path Vector */}
                      <path d="M 60,35 Q 95,15 130,35" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 3" style={{ filter: 'drop-shadow(0 0 2px #fff)' }} />
                      <polygon points="130,35 122,31 125,37" fill="#ffffff" />
                      <text x="95" y="22" fill="#fff" fontSize="5" fontFamily="monospace" textAnchor="middle" opacity="0.8">TRANSITION</text>

                      {/* Serene Outpost Node */}
                      <circle cx="155" cy="35" r="12" fill="none" stroke="#00ff88" strokeWidth="1.2" />
                      <circle cx="155" cy="35" r="4.5" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
                      <text x="155" y="58" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OUTPOST: PEACEFUL</text>
                    </g>

                    {/* Right side: Relocation stats */}
                    <g transform="translate(195, 25)">
                      <rect x="0" y="0" width="115" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(255, 0, 127, 0.2)" strokeWidth="1" />
                      <text x="8" y="12" fill="#ff007f" fontSize="6.5" fontFamily="monospace" fontWeight="bold">GOAL: RELOCATION</text>
                      <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">POST-GRAD TARGET</text>
                      <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">CONGESTION: MINIMAL</text>
                      <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">JOBS LINK: ON GRAD</text>
                    </g>

                    <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">TRAJECTORY: OUTWARD_BOUND</text>
                    <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">DENSITY RATIO: LOW</text>
                  </svg>
                )}

                {/* Neurodiversity synaptic overview - Slide 0 */}
                {activeInterest.type === 'neurodiversity' && neurodiversitySlide === 0 && (
                  <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)' }}>
                    <rect x="0" y="0" width="320" height="15" fill="#001a08" />
                    <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // COGNITIVE_MAPPING_CORE</text>

                    {/* Network paths */}
                    <g opacity="0.3">
                      <line x1="40" y1="40" x2="80" y2="25" stroke="#00ff88" strokeWidth="0.8" />
                      <line x1="80" y1="25" x2="120" y2="55" stroke="#00f0ff" strokeWidth="0.8" />
                      <line x1="120" y1="55" x2="160" y2="35" stroke="#00ff88" strokeWidth="0.8" />
                      <line x1="160" y1="35" x2="200" y2="65" stroke="#00f0ff" strokeWidth="0.8" />
                      <line x1="200" y1="65" x2="240" y2="45" stroke="#00ff88" strokeWidth="0.8" />
                      <line x1="240" y1="45" x2="280" y2="75" stroke="#00f0ff" strokeWidth="0.8" />
                    </g>

                    {/* Glowing Synaptic Hubs */}
                    <g>
                      <circle cx="40" cy="40" r="3" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 2px #00ff88)' }} />
                      <circle cx="80" cy="25" r="4.5" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }} />
                      <circle cx="120" cy="55" r="3" fill="#00ff88" />
                      <circle cx="160" cy="35" r="4" fill="#00f0ff" />
                      <circle cx="200" cy="65" r="3" fill="#00ff88" />
                      <circle cx="240" cy="45" r="4.5" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }} />
                      <circle cx="280" cy="75" r="3" fill="#00ff88" />
                    </g>

                    {/* Low opacity circular scan sweep */}
                    <circle cx="160" cy="50" r="32" fill="none" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="160" cy="50" r="22" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
                    
                    <text x="160" y="54" fill="#fff" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold" opacity="0.9" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' }}>NEURAL NET: COHERENT</text>

                    <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: synapse_mapping_v3.2</text>
                    <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">UNDERSTANDING: INITIATED</text>
                  </svg>
                )}

                {/* Social battery & sensory load factor HUD - Slide 1 */}
                {activeInterest.type === 'neurodiversity' && neurodiversitySlide === 1 && (
                  <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)' }}>
                    <rect x="0" y="0" width="320" height="15" fill="#001a08" />
                    <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // SOCIAL_BATTERY_HUD</text>

                    {/* Left: Social Battery Meter */}
                    <g transform="translate(15, 25)">
                      <text x="0" y="8" fill="rgba(255,255,255,0.7)" fontSize="5.5" fontFamily="monospace">SOCIAL_BATTERY</text>
                      <rect x="0" y="14" width="50" height="22" rx="3" fill="none" stroke="#00ff88" strokeWidth="1.5" />
                      <rect x="50" y="20" width="3" height="10" fill="#00ff88" rx="1" />
                      
                      <rect x="3" y="17" width="8" height="16" fill="#00ff88" />
                      <rect x="13" y="17" width="8" height="16" fill="#00ff88" />
                      <rect x="23" y="17" width="8" height="16" fill="#00ff88" opacity="0.3" />
                      <rect x="33" y="17" width="8" height="16" fill="#00ff88" opacity="0.1" />
                      <rect x="43" y="17" width="4" height="16" fill="#00ff88" opacity="0.1" />
                      <text x="0" y="46" fill="#ff007f" fontSize="6" fontFamily="monospace" fontWeight="bold">STATUS: DRAINING</text>
                    </g>

                    {/* Center: Sensory Gauge */}
                    <g transform="translate(95, 25)">
                      <text x="35" y="8" fill="rgba(255,255,255,0.7)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">SENSORY_LOAD_FACTOR</text>
                      
                      <path d="M 10,40 A 25,25 0 0,1 60,40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 15,40 A 20,20 0 0,1 55,40" fill="none" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="15 5" />
                      <path d="M 20,40 A 15,15 0 0,1 50,40" fill="none" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 25,40 A 10,10 0 0,1 45,40" fill="none" stroke="#ff007f" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
                      
                      <line x1="35" y1="40" x2="48" y2="22" stroke="#ff007f" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="35" cy="40" r="2" fill="#fff" />
                      <text x="35" y="47" fill="#ff007f" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OVERLOAD ALERT</text>
                    </g>

                    {/* Right: Recovery panel */}
                    <g transform="translate(195, 22)">
                      <rect x="0" y="0" width="110" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1" />
                      <text x="8" y="12" fill="#00ff88" fontSize="6" fontFamily="monospace" fontWeight="bold">INPUT RATE: HIGH</text>
                      <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">BATTERY: 38% CAPACITY</text>
                      <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">RECOVERY: 4.2h REST REQ</text>
                      <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">SENSORY CHANNELS: MAX</text>
                    </g>

                    <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">BATTERY: lithium_social_v4.5</text>
                    <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">ALERT_LEVEL: MODERATE</text>
                  </svg>
                )}

                {/* Double Empathy socialization waves - Slide 2 */}
                {activeInterest.type === 'neurodiversity' && neurodiversitySlide === 2 && (
                  <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)' }}>
                    <rect x="0" y="0" width="320" height="15" fill="#001a08" />
                    <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // DOUBLE_EMPATHY_RESONANCE</text>

                    {/* Autistic Social Resonance Wave (Top - Emerald Green/Cyan) */}
                    <path d="M 20,40 Q 55,15 90,40 T 160,40 T 230,40 T 300,40" fill="none" stroke="#00ff88" strokeWidth="2.2" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
                    <text x="30" y="32" fill="#00ff88" fontSize="5.5" fontFamily="monospace" fontWeight="bold">AUTISTIC RESONANCE</text>

                    {/* Allistic Social Resonance Wave (Bottom - Dusk Orange/Pink) */}
                    <path d="M 20,70 Q 55,95 90,70 T 160,70 T 230,70 T 300,70" fill="none" stroke="#ff007f" strokeWidth="2" strokeDasharray="3 2" style={{ filter: 'drop-shadow(0 0 2.5px #ff007f)' }} />
                    <text x="30" y="80" fill="#ff007f" fontSize="5.5" fontFamily="monospace" fontWeight="bold">ALLISTIC RESONANCE</text>

                    {/* Center Synapse Bridge */}
                    <line x1="160" y1="40" x2="160" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="160" cy="55" r="4" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
                    <text x="168" y="57" fill="#00f0ff" fontSize="5" fontFamily="monospace">SYNC: STABLE</text>

                    <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">MODEL: dual_empathy_resonance_v1.0</text>
                    <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">SOCIAL SYNC: RESOLVED</text>
                  </svg>
                )}

                {/* Neurodiversity infinity loop & burnout meter - Slide 3 */}
                {activeInterest.type === 'neurodiversity' && neurodiversitySlide === 3 && (
                  <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)' }}>
                    <defs>
                      <linearGradient id="neuroRainbowGradientFinal" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00f0ff" />
                        <stop offset="33%" stopColor="#00ff88" />
                        <stop offset="66%" stopColor="#ffe082" />
                        <stop offset="100%" stopColor="#00ff88" />
                      </linearGradient>
                    </defs>

                    <rect x="0" y="0" width="320" height="15" fill="#001a08" />
                    <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // NEUROTYPE_VARIATION_GRID</text>

                    {/* Left: Glowing infinity loop */}
                    <g transform="translate(5, 5)">
                      <path 
                        d="M 75,45 C 55,20 35,20 35,45 C 35,70 55,70 75,45 C 95,20 115,20 115,45 C 115,70 95,70 75,45 Z" 
                        fill="none" 
                        stroke="url(#neuroRainbowGradientFinal)" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 4px rgba(0, 255, 136, 0.5))' }} 
                      />
                      <circle cx="35" cy="45" r="2" fill="#00f0ff" />
                      <circle cx="115" cy="45" r="2" fill="#00ff88" />
                      <text x="75" y="80" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">INFINITY VECTOR</text>
                    </g>

                    {/* Center: segmented burnout recovery level bar chart */}
                    <g transform="translate(135, 25)">
                      <text x="0" y="10" fill="rgba(255,255,255,0.7)" fontSize="5.5" fontFamily="monospace">BURNOUT_RECOVERY</text>
                      
                      {/* Meter bar backgrounds */}
                      <rect x="0" y="15" width="55" height="6" rx="1.5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      {/* Active green segments */}
                      <rect x="1" y="16" width="10" height="4" fill="#00ff88" />
                      <rect x="12" y="16" width="10" height="4" fill="#00ff88" />
                      <rect x="23" y="16" width="10" height="4" fill="#00ff88" />
                      <rect x="34" y="16" width="10" height="4" fill="#00ff88" opacity="0.4" />
                      <rect x="45" y="16" width="8" height="4" fill="#00ff88" opacity="0.1" />
                      
                      <text x="0" y="32" fill="#00ff88" fontSize="5.5" fontFamily="monospace" fontWeight="bold">ENERGY STATUS: 78%</text>
                    </g>

                    {/* Right: Telemetry Panel */}
                    <g transform="translate(205, 22)">
                      <rect x="0" y="0" width="105" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1" />
                      <text x="8" y="12" fill="#00ff88" fontSize="6.5" fontFamily="monospace" fontWeight="bold">TYPE: AUTISTIC</text>
                      <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">COGNITIVE: OK</text>
                      <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">DISABILITY: FALSE</text>
                      <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">ALLISTIC SYNC: OFF</text>
                    </g>

                    <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">STATUS: INDEPENDENT_MIND</text>
                    <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">PATHOLOGY_RATING: 0%</text>
                  </svg>
                )}

                </div>

                {/* Embedded YouTube Transmission Deck */}
                {activeInterest.id === 'music' && musicSlide === 2 && (
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
