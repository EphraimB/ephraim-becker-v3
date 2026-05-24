'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CityGridMap from '../components/CityGridMap';

const DIALOG_NODES = {
  greeting: {
    text: "Welcome to my Citizen Suite! I'm Ephraim Becker. From my home in Cedarhurst on Earth, I'm linked as a Remote Cadet to Adelphi University, studying computer science and keeping my logic sharp with Calculus. When I'm not coding or synchronizing planetary grid flows, I'm usually lost in Sci-Fi, playing music, or biking. What part of my journey would you like to explore?",
    choices: [
      { text: "How did you get into tech?", next: "tech" },
      { text: "Tell me about your studies!", next: "studies" },
      { text: "What do you do for fun?", next: "interests" },
      { text: "Let's travel Ares City!", next: "travel" }
    ],
    graphic: 'space'
  },
  tech: {
    text: "It started when I first saw graphical user interfaces (GUIs)—they completely fascinated me! The idea of designing responsive, visual operating decks led me to coding. It's just so cool that I can build entirely new digital worlds from scratch. Now, I design interfaces for Ares City OS!",
    choices: [
      { text: "That's cool! What do you study?", next: "studies" },
      { text: "Awesome! Tell me about your hobbies!", next: "interests" },
      { text: "Let's explore Ares City sectors!", next: "travel" }
    ],
    graphic: 'gui'
  },
  studies: {
    text: "Earthside, I study computer science, database structures, and general education pathways. I also tackle Calculus to sync earthside engineering with Mars municipal grids. It's a lot of logic, but highly rewarding!",
    choices: [
      { text: "Calculus? Is that tough?", next: "math" },
      { text: "How did you get into coding?", next: "tech" },
      { text: "What do you do when not studying?", next: "interests" }
    ],
    graphic: 'studies'
  },
  math: {
    text: "It keeps my logic circuits sharp! Calculus helps me model municipal grid flows and planetary coordinates, but honestly, my real passion remains building visual software and responsive interfaces.",
    choices: [
      { text: "Tell me about your GUI passion!", next: "tech" },
      { text: "What are your other hobbies?", next: "interests" },
      { text: "Let's warp to a dome!", next: "travel" }
    ],
    graphic: 'math'
  },
  interests: {
    text: "Beyond technology, I'm highly passionate about Sci-Fi and Fantasy worlds, listening to and playing music, and biking around Cedarhurst on Earth (which I remotely model here in Ares City). It keeps my mind and body active!",
    choices: [
      { text: "Show me your coding interests!", next: "tech" },
      { text: "What do you study?", next: "studies" },
      { text: "Ready to travel Ares City?", next: "travel" }
    ],
    graphic: 'interests'
  },
  travel: {
    text: "Ready to depart the Citizen Suite? Select a dome coordinate below to trigger your hyperloop warp, or we can keep chatting!",
    choices: [
      { text: "🔄 Start Conversation Over", next: "greeting" }
    ],
    graphic: 'travel'
  }
};

const NODE_KEYS = ['greeting', 'tech', 'studies', 'math', 'interests', 'travel'];

export default function CitizenSuite() {
  const router = useRouter();
  const [transitState, setTransitState] = useState('slide-active');
  const [currentNode, setCurrentNode] = useState('greeting');
  const [isWalking, setIsWalking] = useState(false);

  // Synchronize entry transition classes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const walkDir = window.sessionStorage.getItem('walk-direction');
      if (walkDir === 'left') {
        setTransitState('slide-right');
      } else if (walkDir === 'right') {
        setTransitState('slide-left');
      }
      window.sessionStorage.removeItem('walk-direction');
      
      const timer = setTimeout(() => {
        setTransitState('slide-active');
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  // Keyboard navigation for dialogue nodes (Left/Right Arrows navigate chronologically)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      const currentIndex = NODE_KEYS.indexOf(currentNode);
      if (e.key === 'ArrowRight' && currentIndex < NODE_KEYS.length - 1) {
        setCurrentNode(NODE_KEYS[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentNode(NODE_KEYS[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentNode]);

  // Warp transitions for Travel Node sector COORDINATES links
  const handleWarpFromStep = (e, path, targetWeight) => {
    if (e) e.preventDefault();
    if (isWalking) return;
    setIsWalking(true);

    const workspace = document.querySelector('.os-workspace');
    const content = document.querySelector('.walking-content-container');

    if (workspace) workspace.classList.add('walking-transit-active');
    
    if (content) {
      const isHeadingLeft = targetWeight > 2; // Suite is weight 2
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('walk-direction', isHeadingLeft ? 'left' : 'right');
      }
      content.classList.add(isHeadingLeft ? 'slide-left' : 'slide-right');
      content.classList.remove('slide-active');
    }

    setTimeout(() => {
      router.push(path);
    }, 220);
  };

  const activeNode = DIALOG_NODES[currentNode] || DIALOG_NODES.greeting;

  return (
    <div className="citizen-card-shell" style={{ flexDirection: 'column', overflow: 'visible' }}>
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Floating navigation map bubble (CityGridMap returns null globally per requirements) */}
      <div className="floating-nav-bubble">
        <CityGridMap />
      </div>

      {/* Spacious 2-Column Grid Centering Your Cutout & Speech Bubble */}
      <div 
        className={`walking-content-container homepage-grid ${transitState}`} 
        style={{ 
          overflow: 'visible',
          gridTemplateColumns: '210px min(580px, 62vw)', /* Shrunk spacer to bring bubble exactly next to mouth */
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        
        {/* Far-Left Column: Spatial gap overlaying the natural background cutout */}
        <div className="roomscale-profile-spacer" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}></div>

        {/* Right Column: Single High-Contrast Branching Stepper Speech Bubble */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 0, overflow: 'visible' }}>
          
          <div className="comic-speech-bubble" style={{ display: 'flex', flexDirection: 'column', minHeight: '305px', justifyContent: 'space-between' }}>
            
            {/* Stepper Header (Telemetry indicators) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.5px' }}>
                TRANSMITTING COORD: PENTHOUSE_A-02
              </span>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.58rem', color: 'rgba(0,0,0,0.4)', marginRight: '4px' }}>
                  NODE: {currentNode.toUpperCase()}
                </span>
                {NODE_KEYS.map((key) => (
                  <div 
                    key={key} 
                    onClick={() => setCurrentNode(key)}
                    style={{
                      width: '12px',
                      height: '6px',
                      borderRadius: '3px',
                      background: key === currentNode ? 'var(--color-accent)' : 'rgba(0, 0, 0, 0.1)',
                      boxShadow: key === currentNode ? '0 0 5px var(--color-accent)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Stepper Body: Dynamic Branching Dialogue & Custom Vector Graphics */}
            <div 
              aria-live="polite" 
              style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}
            >
              
              {/* Conversational dialogue text */}
              <p style={{ fontSize: '0.88rem', lineHeight: '1.55', fontWeight: 500 }}>
                {activeNode.text.split('Ephraim Becker').map((part, i, arr) => (
                  i === arr.length - 1 ? part : <span key={i}>{part}<strong>Ephraim Becker</strong></span>
                ))}
              </p>

              {/* DYNAMIC BESPOKE SVG GRAPHICS */}
              
              {/* Graphic 1: High-fidelity Space & Real Planets (greeting node) */}
              {activeNode.graphic === 'space' && (
                <svg viewBox="0 0 320 100" width="100%" height="95px" style={{ marginTop: '14px', background: 'radial-gradient(circle at center, #0a0d17 0%, #04060c 100%)', borderRadius: '10px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
                  <defs>
                    <linearGradient id="earthOcean" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1976d2" />
                      <stop offset="100%" stopColor="#0d47a1" />
                    </linearGradient>
                    <linearGradient id="marsDunes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d84315" />
                      <stop offset="100%" stopColor="#801313" />
                    </linearGradient>
                  </defs>

                  {/* Stars field */}
                  <circle cx="20" cy="20" r="0.6" fill="#fff" opacity="0.8" />
                  <circle cx="70" cy="15" r="0.8" fill="#fff" opacity="0.6" style={{ animation: 'blink-led 1.8s infinite' }} />
                  <circle cx="110" cy="30" r="0.5" fill="#fff" opacity="0.9" />
                  <circle cx="150" cy="15" r="0.8" fill="#ffb300" opacity="0.5" style={{ animation: 'blink-led 2s infinite' }} />
                  <circle cx="190" cy="25" r="0.6" fill="#fff" opacity="0.7" />
                  <circle cx="270" cy="20" r="0.8" fill="#fff" opacity="0.8" style={{ animation: 'blink-led 1.5s infinite' }} />
                  <circle cx="290" cy="35" r="0.5" fill="#fff" opacity="0.9" />
                  
                  <circle cx="40" cy="80" r="0.6" fill="#fff" opacity="0.9" />
                  <circle cx="85" cy="70" r="0.5" fill="#fff" opacity="0.6" />
                  <circle cx="130" cy="85" r="0.8" fill="#fff" opacity="0.8" style={{ animation: 'blink-led 2.2s infinite' }} />
                  <circle cx="210" cy="80" r="0.6" fill="#fff" opacity="0.8" />

                  {/* Nebulae */}
                  <ellipse cx="160" cy="50" rx="70" ry="25" fill="rgba(194, 89, 255, 0.04)" style={{ filter: 'blur(10px)' }} />
                  <ellipse cx="80" cy="40" rx="55" ry="20" fill="rgba(0, 240, 255, 0.03)" style={{ filter: 'blur(8px)' }} />

                  {/* Real Earth Globe */}
                  <g>
                    <circle cx="60" cy="50" r="23" fill="none" stroke="rgba(0, 240, 255, 0.22)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 3px rgba(0,240,255,0.4))' }} />
                    <circle cx="60" cy="50" r="21" fill="url(#earthOcean)" />
                    <path d="M 45,36 Q 52,38 54,42 Q 58,40 56,46 Q 52,48 55,54 Q 57,59 55,62 Q 52,65 48,68 Q 44,60 46,55 Q 49,50 45,45 Z" fill="#2e7d32" opacity="0.85" />
                    <path d="M 50,30 Q 56,29 55,33 Q 50,34 49,32 Z" fill="#e0f2f1" opacity="0.9" />
                    <path d="M 72,40 Q 75,44 78,43 L 80,48 Q 78,54 75,56 Q 73,50 71,46 Z" fill="#2e7d32" opacity="0.8" />
                    <path d="M 42,42 Q 52,35 68,44" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
                    <path d="M 46,56 Q 56,62 72,52" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
                    <path d="M 60,29 A 21 21 0 0 1 60,71 A 21 21 0 0 0 60,29 Z" fill="rgba(0,0,0,0.4)" />
                    <text x="60" y="53" fill="#ffffff" fontSize="6.5" fontFamily="var(--font-tech)" fontWeight={900} textAnchor="middle" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>EARTH</text>
                  </g>

                  {/* Real Mars Globe */}
                  <g>
                    <circle cx="260" cy="50" r="23" fill="none" stroke="rgba(255, 179, 0, 0.22)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 3px rgba(255,179,0,0.4))' }} />
                    <circle cx="260" cy="50" r="21" fill="url(#marsDunes)" />
                    <path d="M 250,42 Q 255,46 262,44 Q 268,48 266,54 Q 258,58 254,54 Q 248,50 248,46 Z" fill="#4e1d13" opacity="0.65" />
                    <path d="M 248,60 Q 258,62 266,59 Q 272,66 260,68 Z" fill="#4e1d13" opacity="0.55" />
                    <ellipse cx="260" cy="30" rx="7" ry="2.2" fill="#ffffff" opacity="0.95" style={{ filter: 'drop-shadow(0 0 1px #fff)' }} />
                    <ellipse cx="260" cy="70" rx="5" ry="1.5" fill="#ffffff" opacity="0.8" />
                    <path d="M 260,29 A 21 21 0 0 1 260,71 A 21 21 0 0 0 260,29 Z" fill="rgba(0,0,0,0.45)" />
                    <text x="260" y="53" fill="#ffffff" fontSize="6.5" fontFamily="var(--font-tech)" fontWeight={900} textAnchor="middle" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>MARS</text>
                  </g>

                  <line x1="84" y1="50" x2="236" y2="50" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="5 5" style={{ animation: 'signal-beam 2s linear infinite', filter: 'drop-shadow(0 0 2px #00f0ff)' }} />
                  <circle cx="160" cy="50" r="3.5" fill="#00ff88" style={{ animation: 'packet-glide 2s infinite linear', filter: 'drop-shadow(0 0 3px #00ff88)' }} />
                </svg>
              )}

              {/* Graphic 2: Custom glowing Martian OS GUI Mockup (tech node) */}
              {activeNode.graphic === 'gui' && (
                <svg viewBox="0 0 320 95" width="100%" height="95px" style={{ marginTop: '14px', background: '#080b13', borderRadius: '10px', border: '1px solid rgba(0, 240, 255, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
                  <rect x="0" y="0" width="320" height="15" fill="#141a29" />
                  <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
                  <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
                  <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
                  <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="var(--font-tech)" textAnchor="middle">ARES_OS // DESKTOP_VIEWER</text>

                  {/* Left Desktop Folders */}
                  <g transform="translate(10, 24)">
                    <rect x="5" y="5" width="16" height="12" rx="2" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
                    <path d="M 5,5 L 11,5 L 13,8 L 21,8 L 21,17 L 5,17 Z" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
                    <text x="13" y="27" fill="rgba(255,255,255,0.6)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle">SYSTEMS</text>

                    <rect x="35" y="5" width="16" height="12" rx="2" fill="none" stroke="#2979ff" strokeWidth="1" />
                    <path d="M 35,5 L 41,5 L 43,8 L 51,8 L 51,17 L 35,17 Z" fill="none" stroke="#2979ff" strokeWidth="1" />
                    <text x="43" y="27" fill="rgba(255,255,255,0.6)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle">APPS</text>
                  </g>

                  {/* Right Telemetry Dial Graphs */}
                  <g transform="translate(110, 24)">
                    <circle cx="40" cy="25" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    <path d="M 40,9 A 16 16 0 0 1 56,25" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" />
                    <text x="40" y="28" fill="#fff" fontSize="5.5" fontFamily="var(--font-tech)" textAnchor="middle">85%</text>
                    <text x="40" y="49" fill="rgba(255,255,255,0.5)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle">GUI INTEREST</text>
                    
                    <circle cx="120" cy="25" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    <path d="M 120,9 A 16 16 0 1 1 104,25" fill="none" stroke="#00f0ff" strokeWidth="2.5" />
                    <text x="120" y="28" fill="#fff" fontSize="5.5" fontFamily="var(--font-tech)" textAnchor="middle">ONLINE</text>
                    <text x="120" y="49" fill="rgba(255,255,255,0.5)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle">WARP CORES</text>
                  </g>
                </svg>
              )}

              {/* Graphic 3: Calculus coordinate slopes grid (studies node) */}
              {activeNode.graphic === 'studies' && (
                <svg viewBox="0 0 300 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#0a0d17', borderRadius: '10px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194, 89, 255, 0.08)' }}>
                  <line x1="20" y1="38" x2="280" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                  <line x1="60" y1="10" x2="60" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                  
                  <path d="M 60,55 Q 120,-15 190,45 T 280,25" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" style={{ filter: 'drop-shadow(0 0 2px var(--color-accent))' }} />

                  <text x="70" y="22" fill="rgba(255,255,255,0.5)" fontSize="6.5" fontFamily="monospace">dy/dx = lim Δx-&gt;0 (Δy/Δx)</text>
                  <text x="180" y="60" fill="var(--color-accent)" fontSize="6.5" fontFamily="monospace">∫ f(x) dx</text>
                </svg>
              )}

              {/* Graphic 4: Math curves (math node) */}
              {activeNode.graphic === 'math' && (
                <svg viewBox="0 0 300 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#0a0d17', borderRadius: '10px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194, 89, 255, 0.08)' }}>
                  <line x1="20" y1="38" x2="280" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                  <line x1="150" y1="10" x2="150" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                  
                  <path d="M 20,38 Q 80,10 150,38 T 280,38" fill="none" stroke="#2979ff" strokeWidth="1.6" />
                  <path d="M 20,20 Q 80,65 150,38 T 280,55" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" strokeDasharray="3 3" />

                  <text x="30" y="22" fill="rgba(255,255,255,0.5)" fontSize="6.5" fontFamily="monospace">f(x) = sin(x)</text>
                  <text x="210" y="22" fill="var(--color-accent)" fontSize="6.5" fontFamily="monospace">f&apos;(x) = cos(x)</text>
                </svg>
              )}

              {/* Graphic 5: High-contrast, light accented interests badges (interests node) */}
              {activeNode.graphic === 'interests' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px', justifyContent: 'center' }}>
                  <span className="hud-badge" style={{ fontSize: '0.74rem', padding: '5px 12px', background: 'rgba(var(--color-accent-rgb), 0.08)', color: '#080b13', border: '1.5px solid rgba(var(--color-accent-rgb), 0.35)', fontWeight: 700 }}>💻 Technology & Coding</span>
                  <span className="hud-badge" style={{ fontSize: '0.74rem', padding: '5px 12px', background: 'rgba(var(--color-accent-rgb), 0.08)', color: '#080b13', border: '1.5px solid rgba(var(--color-accent-rgb), 0.35)', fontWeight: 700 }}>🎬 Sci-Fi / Fantasy</span>
                  <span className="hud-badge" style={{ fontSize: '0.74rem', padding: '5px 12px', background: 'rgba(var(--color-accent-rgb), 0.08)', color: '#080b13', border: '1.5px solid rgba(var(--color-accent-rgb), 0.35)', fontWeight: 700 }}>🎵 Music</span>
                  <span className="hud-badge" style={{ fontSize: '0.74rem', padding: '5px 12px', background: 'rgba(var(--color-accent-rgb), 0.08)', color: '#080b13', border: '1.5px solid rgba(var(--color-accent-rgb), 0.35)', fontWeight: 700 }}>🚴 Biking</span>
                </div>
              )}

              {/* Graphic 6: Dome Sector Navigation links (travel node) */}
              {activeNode.graphic === 'travel' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '10px' }}>
                  <a 
                    href="/metropolis-core" 
                    onClick={(e) => handleWarpFromStep(e, '/metropolis-core', 2)}
                    className="social-link-port" 
                    style={{ padding: '8px 10px', fontSize: '0.65rem', justifyContent: 'center', background: '#080b13', color: '#fff', border: '1.5px solid var(--neon-cyan)', boxShadow: '0 0 8px rgba(0,240,255,0.1)', fontWeight: 700 }}
                  >
                    ⚡ METROPOLIS HUB
                  </a>
                  <a 
                    href="/portfolio" 
                    onClick={(e) => handleWarpFromStep(e, '/portfolio', 3)}
                    className="social-link-port" 
                    style={{ padding: '8px 10px', fontSize: '0.65rem', justifyContent: 'center', background: '#080b13', color: '#fff', border: '1.5px solid #2979ff', boxShadow: '0 0 8px rgba(41,121,255,0.1)', fontWeight: 700 }}
                  >
                    📂 PORTFOLIO DOME
                  </a>
                  <a 
                    href="/atmosphere-dome" 
                    onClick={(e) => handleWarpFromStep(e, '/atmosphere-dome', 4)}
                    className="social-link-port" 
                    style={{ padding: '8px 10px', fontSize: '0.65rem', justifyContent: 'center', background: '#080b13', color: '#fff', border: '1.5px solid var(--neon-emerald)', boxShadow: '0 0 8px rgba(0,255,136,0.1)', fontWeight: 700 }}
                  >
                    🌿 BIOSPHERE PARK
                  </a>
                  <a 
                    href="/quantum-net" 
                    onClick={(e) => handleWarpFromStep(e, '/quantum-net', 5)}
                    className="social-link-port" 
                    style={{ padding: '8px 10px', fontSize: '0.65rem', justifyContent: 'center', background: '#080b13', color: '#fff', border: '1.5px solid var(--neon-amber)', boxShadow: '0 0 8px rgba(255,179,0,0.1)', fontWeight: 700 }}
                  >
                    🛰️ QUANTUM NET
                  </a>
                </div>
              )}

            </div>

            {/* Stepper Footer: Dynamic Conversational Response Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px' }}>
              
              {/* Renders branching reaction options based on current state node */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {activeNode.choices.map((choice, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentNode(choice.next)}
                    className="hud-btn animate-fade"
                    style={{
                      padding: '8px 18px',
                      fontSize: '0.72rem',
                      background: 'rgba(var(--color-accent-rgb), 0.12)',
                      borderColor: 'var(--color-accent)',
                      color: '#080b13',
                      fontWeight: 700,
                      borderRadius: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    [ {choice.text} ]
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      <style jsx global>{`
        /* Stepper Animations */
        @keyframes step-fade-in {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes signal-beam {
          to { stroke-dashoffset: -20; }
        }

        @keyframes packet-glide {
          0% { cx: 84px; }
          100% { cx: 236px; }
        }

        .animate-fade {
          animation: step-fade-in 0.25s ease-out;
        }

        @keyframes blink-led {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
