'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    title: 'Classical & Pop Music',
    tag: 'MUSIC',
    desc: "I have a deep love for music, spanning both classical compositions and modern pop. In the classical realm, the pipe organ is my absolute favorite musical instrument because of its grand mechanical power, rich acoustics, and architectural sound. On the pop side, I love narrative pop albums by Taylor Swift and Noah Kahan for their emotional storytelling and acoustic folk-pop arrangements.",
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
    desc: "I am deeply passionate about flag football! What caught my attention was how fast-paced, highly strategic, and non-contact it is—relying on speed, route running, and playbook coordinates rather than physical hits. Because I have autism, natural socializing can feel draining, but flag football operates on predefined social scripts (like 'nice catch!' or 'good job!') and structured huddles, taking away social pressure and allowing me to be a highly valued part of a team without the stress of small talk.",
    icon: '🏈',
    type: 'flag_football'
  }
];

export default function AresDashboard() {
  const router = useRouter();
  const birthDate = new Date('1996-07-19');
  
  const [marsAge, setMarsAge] = useState('15.8 Sols');
  const [activeInterest, setActiveInterest] = useState(null);
  const [academicSyncActive, setAcademicSyncActive] = useState(false);
  const [mapHoverNode, setMapHoverNode] = useState(null);

  // Dynamic Mars Age calculation based on current time
  useEffect(() => {
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
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'row',
      gap: '24px',
      padding: '24px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      height: '100%',
      width: '100%'
    }} className="dashboard-main-container">
      
      {/* Styles injector for custom micro-animations & responsive collapse */}
      <style jsx global>{`
        @keyframes spin-turntable {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes signal-pulse {
          0% { r: 6px; opacity: 0.8; }
          100% { r: 16px; opacity: 0; }
        }
        @keyframes scanline-pass {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-spin-custom {
          animation: spin-turntable 8s linear infinite;
        }
        .pulse-ring {
          animation: signal-pulse 2s cubic-bezier(0.25, 0, 0, 1) infinite;
        }
        
        /* Responsive adjustments */
        @media (max-width: 950px) {
          .dashboard-main-container {
            flex-direction: column !important;
            overflow-y: auto !important;
            height: auto !important;
            position: relative !important;
            inset: auto !important;
            padding: 12px !important;
            gap: 16px !important;
          }
          .dashboard-left-col {
            width: 100% !important;
            min-width: 100% !important;
            height: auto !important;
          }
          .dashboard-right-col {
            height: 480px !important;
            min-height: 480px !important;
          }
        }
      `}</style>

      {/* LEFT COLUMN: The Premium Profile Terminal Card */}
      <div 
        className="dashboard-left-col"
        style={{
          width: '380px',
          minWidth: '380px',
          background: 'rgba(10, 6, 6, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Terminal Scanline glow overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(255, 255, 255, 0.02) 50%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          zIndex: 1
        }}></div>

        {/* Profile Avatar Frame - holographic transparent layout */}
        <div style={{
          width: '100%',
          height: '160px',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'radial-gradient(circle at center, rgba(0, 240, 255, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.08)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 2,
          flexShrink: 0
        }}>
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

        {/* Core Stats Readout - Earth Age Removed */}
        <div style={{
          fontFamily: 'monospace, var(--font-tech)',
          fontSize: '0.8rem',
          color: '#00f0ff',
          letterSpacing: '0.5px',
          lineHeight: '1.6',
          borderBottom: '1px dashed rgba(255, 255, 255, 0.1)',
          paddingBottom: '10px',
          marginBottom: '12px',
          textAlign: 'left',
          textShadow: '0 0 6px rgba(0, 240, 255, 0.3)',
          zIndex: 2,
          flexShrink: 0
        }}>
          <div>CITIZEN: <span style={{ color: '#fff', fontWeight: 'bold' }}>Ephraim Becker</span></div>
          <div>MARS AGE: <span style={{ color: '#fff', fontWeight: 'bold' }}>{marsAge}</span></div>
        </div>

        {/* Biography Block */}
        <div style={{
          textAlign: 'left',
          marginBottom: '14px',
          zIndex: 2,
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
            fontSize: '0.76rem',
            lineHeight: '1.45',
            color: 'rgba(255, 255, 255, 0.85)',
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontWeight: 400
          }}>
            Ephraim Becker is a Computer Science major studying remote-class systems engineering. Backed by mathematical rigor in Calculus, his true passion lies in building highly interactive graphical user interfaces and responsive web layouts.
          </p>
        </div>

        {/* Clickable Interests Mini-Tags (One-Scan Dashboard View - Spacing fully optimized) */}
        <div style={{
          textAlign: 'left',
          marginBottom: '16px',
          zIndex: 2,
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
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            overflowY: 'auto',
            paddingRight: '4px'
          }} className="left-card-column">
            {INTERESTS.map((interest) => (
              <button
                key={interest.id}
                onClick={() => setActiveInterest(interest)}
                className="hud-badge"
                style={{
                  fontFamily: 'monospace, var(--font-tech)',
                  fontSize: '0.68rem',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  color: 'var(--text-primary)'
                }}
              >
                <span>[{interest.tag}]</span>
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>{interest.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Complete 6-Link Social Registry Matrix */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px',
          marginTop: 'auto',
          zIndex: 2,
          flexShrink: 0
        }}>
          <a 
            href="https://github.com/EphraimB" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link-port"
            style={{ padding: '6px 4px', fontSize: '0.62rem', justifyContent: 'center', textDecoration: 'none' }}
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/ephraim-becker/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link-port"
            style={{ padding: '6px 4px', fontSize: '0.62rem', justifyContent: 'center', textDecoration: 'none' }}
          >
            LinkedIn
          </a>
          <a 
            href="https://twitter.com/emb180" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link-port"
            style={{ padding: '6px 4px', fontSize: '0.62rem', justifyContent: 'center', textDecoration: 'none' }}
          >
            X
          </a>
          <a 
            href="https://www.youtube.com/channel/UCIHxAXYLxYlNaQiv0do0bUg" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link-port"
            style={{ padding: '6px 4px', fontSize: '0.62rem', justifyContent: 'center', textDecoration: 'none' }}
          >
            YouTube
          </a>
          <a 
            href="https://www.instagram.com/ephraim.becker/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link-port"
            style={{ padding: '6px 4px', fontSize: '0.62rem', justifyContent: 'center', textDecoration: 'none' }}
          >
            Instagram
          </a>
          <a 
            href="https://www.facebook.com/ephraim.becker/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link-port"
            style={{ padding: '6px 4px', fontSize: '0.62rem', justifyContent: 'center', textDecoration: 'none' }}
          >
            Facebook
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN: The 2D Interactive Vector Map */}
      <div 
        className="dashboard-right-col"
        style={{
          flex: 1,
          background: 'rgba(6, 9, 20, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0,0,0,0.6)'
        }}
      >
        {/* Core coordinates header overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '16px',
          zIndex: 5,
          fontFamily: 'monospace, var(--font-tech)',
          fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '1px',
          pointerEvents: 'none',
          textAlign: 'left'
        }}>
          ARES_SYSTEM // NAVIGATION_MAP // DOME_LINK_ONLINE
          {mapHoverNode && <span style={{ color: '#00f0ff', marginLeft: '12px' }}>[ SELECTED: {mapHoverNode.toUpperCase()} ]</span>}
        </div>

        {/* 2D Auto-scaling Tactical Map Canvas (meet preserves full viewport) */}
        <svg 
          viewBox="0 0 800 500" 
          width="100%" 
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{
            flex: 1,
            display: 'block'
          }}
        >
          <defs>
            {/* Dusk Violet circular glow */}
            <radialGradient id="violetGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c259ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c259ff" stopOpacity="0" />
            </radialGradient>
            {/* Cyan glowing dots */}
            <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Radar Sweep scanning graphic circles */}
          <circle cx="400" cy="250" r="230" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="400" cy="250" r="170" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
          <circle cx="400" cy="250" r="100" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle cx="400" cy="250" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

          {/* Coordinate grid tactical crosshairs lines */}
          <line x1="170" y1="250" x2="630" y2="250" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" strokeDasharray="5 5" />
          <line x1="400" y1="80" x2="400" y2="420" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" strokeDasharray="5 5" />

          {/* Tactical road segments / colony navigation networks */}
          {/* Central linked nodes roads - moved safe inward coordinates */}
          <line x1="400" y1="250" x2="260" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="400" y1="250" x2="540" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="400" y1="250" x2="400" y2="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="260" y1="180" x2="290" y2="330" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
          <line x1="540" y1="180" x2="510" y2="330" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
          <line x1="290" y1="330" x2="510" y2="330" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />

          {/* SECTOR 03: BIOSPHERE DOME (Top center hub) */}
          <g 
            onClick={() => router.push('/atmosphere-dome')}
            onMouseEnter={() => setMapHoverNode('Sector 03: Biosphere Dome')}
            onMouseLeave={() => setMapHoverNode(null)}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            <circle cx="400" cy="110" r="16" fill="rgba(0, 255, 136, 0.05)" stroke="rgba(0, 255, 136, 0.4)" strokeWidth="1.5" />
            <circle cx="400" cy="110" r="6" fill="#00ff88" />
            <text x="400" y="85" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace, var(--font-tech)" textAnchor="middle">SECTOR 03: BIOSPHERE</text>
          </g>

          {/* SECTOR 04: QUANTUM NET (Bottom left hub) */}
          <g 
            onClick={() => router.push('/quantum-net')}
            onMouseEnter={() => setMapHoverNode('Sector 04: Quantum Net')}
            onMouseLeave={() => setMapHoverNode(null)}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            <circle cx="290" cy="330" r="16" fill="rgba(255, 179, 0, 0.05)" stroke="rgba(255, 179, 0, 0.4)" strokeWidth="1.5" />
            <circle cx="290" cy="330" r="6" fill="#ffb300" />
            <text x="290" y="360" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace, var(--font-tech)" textAnchor="middle">SECTOR 04: QUANTUM NET</text>
          </g>

          {/* SECTOR 05: METROPOLIS CORE (Bottom right hub) */}
          <g 
            onClick={() => router.push('/metropolis-core')}
            onMouseEnter={() => setMapHoverNode('Sector 05: Metropolis Core')}
            onMouseLeave={() => setMapHoverNode(null)}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            <circle cx="510" cy="330" r="16" fill="rgba(0, 240, 255, 0.05)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1.5" />
            <circle cx="510" cy="330" r="6" fill="#00f0ff" />
            <text x="510" y="360" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace, var(--font-tech)" textAnchor="middle">SECTOR 05: METROPOLIS</text>
          </g>

          {/* SECTOR 01: PORTFOLIO ARCHIVES (Left highlighted hub - Dusk Violet Glow - Centered text avoids clipping) */}
          <g 
            onClick={() => router.push('/portfolio')}
            onMouseEnter={() => setMapHoverNode('Sector 01: Portfolio Archives')}
            onMouseLeave={() => setMapHoverNode(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Dusk Violet Pulsing glowing rings */}
            <circle cx="260" cy="180" r="28" fill="url(#violetGlow)" pointerEvents="none" />
            <circle cx="260" cy="180" r="14" fill="none" stroke="#c259ff" strokeWidth="1" className="pulse-ring" />
            
            {/* Core Node shape */}
            <circle cx="260" cy="180" r="18" fill="rgba(10, 6, 20, 0.8)" stroke="#c259ff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px #c259ff)' }} />
            <circle cx="260" cy="180" r="6" fill="#c259ff" />
            
            {/* Centered label above node */}
            <text x="260" y="142" fill="#c259ff" fontSize="9.5" fontWeight="bold" fontFamily="monospace, var(--font-tech)" textAnchor="middle">SECTOR 01: PORTFOLIO</text>
            <text x="260" y="152" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="monospace, var(--font-tech)" textAnchor="middle">[CLICK TO TRANSLATE]</text>
          </g>

          {/* SECTOR 02: ACADEMIC MODULES (Right highlighted hub - Cybernetic Cyan Glow - Centered text completely solves clipping) */}
          <g 
            onClick={() => setAcademicSyncActive(!academicSyncActive)}
            onMouseEnter={() => setMapHoverNode('Sector 02: Academic Modules')}
            onMouseLeave={() => setMapHoverNode(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Cyan circular glow */}
            <circle cx="540" cy="180" r="28" fill="url(#cyanGlow)" pointerEvents="none" />
            <circle cx="540" cy="180" r="14" fill="none" stroke="#00f0ff" strokeWidth="1" className="pulse-ring" />
            
            {/* Core Node shape */}
            <circle cx="540" cy="180" r="18" fill="rgba(6, 12, 20, 0.8)" stroke="#00f0ff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px #00f0ff)' }} />
            <polygon points="540,174 545,183 535,183" fill="#00f0ff" />
            
            {/* Centered label above node */}
            <text x="540" y="142" fill="#00f0ff" fontSize="9.5" fontWeight="bold" fontFamily="monospace, var(--font-tech)" textAnchor="middle">SECTOR 02: ACADEMICS</text>
            <text x="540" y="152" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="monospace, var(--font-tech)" textAnchor="middle">[CLICK TO SYNC TELEMETRY]</text>
          </g>

          {/* Central Ares colony coordinate crosshair */}
          <circle cx="400" cy="250" r="8" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <line x1="390" y1="250" x2="410" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="400" y1="240" x2="400" y2="260" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <text x="400" y="275" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace, var(--font-tech)" textAnchor="middle">COLONY_CORE</text>

        </svg>

        {/* Dynamic Holographic Academic Modules telemetry panel */}
        {academicSyncActive && (
          <div 
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              maxHeight: '190px',
              background: 'rgba(6, 10, 18, 0.92)',
              border: '1.5px solid #00f0ff',
              borderRadius: '8px',
              boxShadow: '0 0 25px rgba(0, 240, 255, 0.25)',
              padding: '14px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              animation: 'modal-scale-up 0.25s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
              zIndex: 30
            }}
          >
            {/* Telemetry Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,240,255,0.2)', paddingBottom: '6px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'monospace, var(--font-tech)', fontSize: '0.65rem', color: '#00f0ff', fontWeight: 'bold', letterSpacing: '1px' }}>
                📡 SYSTEM_SYNC // ACADEMIC_TELEMETRY_LOG
              </span>
              <button 
                onClick={() => setAcademicSyncActive(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem'
                }}
              >
                [✕]
              </button>
            </div>

            {/* Academic Content Columns */}
            <div style={{ display: 'flex', gap: '16px', flex: 1, minHeight: 0, overflowY: 'auto' }} className="custom-scroll">
              
              {/* College Credentials */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '4px' }}>Adelphi University CSC</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: '6px' }}>REMOTE CADET // DOUBLE CLASS STATUS</div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: '1.4' }}>
                  Studying database query efficiencies, binary search tree logic, index optimization architectures, and mathematical logic pathways via Calculus.
                </p>
              </div>

              {/* Calculus coordinates curve visualization (Vector decoration) */}
              <div style={{ width: '150px', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', border: '1px solid rgba(0,240,255,0.1)', padding: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.52rem', color: '#00f0ff', fontFamily: 'monospace', display: 'block', textAlign: 'center' }}>CALCULUS_SLOPE (dy/dx)</span>
                <svg viewBox="0 0 100 45" width="100%" height="32px">
                  <line x1="5" y1="38" x2="95" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                  <line x1="20" y1="5" x2="20" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                  <path d="M 20,38 Q 45,5 75,20 T 95,5" fill="none" stroke="#00f0ff" strokeWidth="1.2" />
                  <circle cx="75" cy="20" r="2" fill="#ffb300" />
                </svg>
                <span style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', textAlign: 'center' }}>INTEGRAL LIMIT: NOMINAL</span>
              </div>

            </div>
          </div>
        )}
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
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '720px',
              background: 'rgba(10, 14, 30, 0.94)',
              border: '2px solid var(--color-accent)',
              borderColor: activeInterest.id === 'technology' ? '#00f0ff' : activeInterest.id === 'scifi' ? '#c259ff' : activeInterest.id === 'music' ? '#ffb300' : activeInterest.id === 'biking' ? '#00ff88' : '#e65100',
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
                color: activeInterest.id === 'technology' ? '#00f0ff' : activeInterest.id === 'scifi' ? '#c259ff' : activeInterest.id === 'music' ? '#ffb300' : activeInterest.id === 'biking' ? '#00ff88' : '#ff5722',
                fontWeight: 'bold',
                letterSpacing: '1.5px'
              }}>
                // ACTIVE_SECTOR_SYNC: {activeInterest.tag}
              </span>
              <button 
                onClick={() => setActiveInterest(null)}
                className="hud-btn"
                style={{
                  padding: '4px 12px',
                  fontSize: '0.65rem',
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

                      <text x="160" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TACTICAL PLAYBOOK: route_matrix_09</text>
                    </svg>
                  )}

                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
