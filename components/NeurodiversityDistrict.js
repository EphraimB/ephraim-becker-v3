'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import exhibitData from '../data/neurodiversity-exhibit.json';

export default function NeurodiversityDistrict({ activeSector = 'plaza' }) {
  const router = useRouter();
  const pathname = usePathname();

  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Meetup Hearth check-in states
  const [meetupName, setMeetupName] = useState('');
  const [specialtyBadge, setSpecialtyBadge] = useState('communicator');
  const [registeredCitizens, setRegisteredCitizens] = useState([
    { name: 'Ephraim Becker', badge: 'architect' },
    { name: 'Sarah K.', badge: 'guard' },
    { name: 'Marcus V.', badge: 'communicator' }
  ]);
  const [registrationMessage, setRegistrationMessage] = useState('');

  // Dialogue Switcher states (Comms Grove)
  const [commsFilter, setCommsFilter] = useState('nd'); // Default to ND Explicit

  // Dialogue Connection Tuner states (Comms Grove)
  const [signalNT, setSignalNT] = useState(40);
  const [signalND, setSignalND] = useState(80);
  const [isSyncLocked, setIsSyncLocked] = useState(false);

  // Sensory Attunement Sliders (Sensory Garden)
  const [lightingLvl, setLightingLvl] = useState(30); // Dim/Soothing preset by default
  const [crowdLvl, setCrowdLvl] = useState(4); // Low density
  const [soundLvl, setSoundLvl] = useState(25); // Quiet decibels
  const [notifLvl, setNotifLvl] = useState(1); // Relaxed alert rate
  const [speedLvl, setSpeedLvl] = useState(2.5); // Soft/slow motion sweep

  // Selected Lexicon Term object (Lexicon Pavilion)
  const [activeStarNode, setActiveStarNode] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Soft transition handler utilizing Next.js path routing
  const changeRoute = (route) => {
    if (pathname === route) return;
    router.push(route);
  };

  const handleRegisterMeetup = (e) => {
    e.preventDefault();
    if (!meetupName.trim()) return;
    
    setRegisteredCitizens(prev => [
      ...prev,
      { name: meetupName.trim(), badge: specialtyBadge }
    ]);
    
    const badgeLabel = 
      specialtyBadge === 'architect' ? 'Habitat Architect' :
      specialtyBadge === 'guard' ? 'Sensory Supporter' :
      specialtyBadge === 'communicator' ? 'Clear Communicator' : 'Sports Coordinator';

    setRegistrationMessage(`✅ Welcomed! Checked in as Citizen [${meetupName.trim()}] with [${badgeLabel}] badge.`);
    setMeetupName('');
    setTimeout(() => setRegistrationMessage(''), 5000);
  };

  const handleAutoSync = () => {
    setSignalNT(50);
    setSignalND(50);
    setIsSyncLocked(true);
  };

  useEffect(() => {
    const diff = Math.abs(signalNT - signalND);
    if (diff <= 2 && signalNT >= 45 && signalNT <= 55) {
      setIsSyncLocked(true);
    } else {
      setIsSyncLocked(false);
    }
  }, [signalNT, signalND]);

  // Set predefined sensory presets
  const applyDeficitPreset = () => {
    setLightingLvl(100);
    setCrowdLvl(50);
    setSoundLvl(85);
    setNotifLvl(20);
    setSpeedLvl(0.2);
  };

  const applyInclusivePreset = () => {
    setLightingLvl(30);
    setCrowdLvl(4);
    setSoundLvl(25);
    setNotifLvl(1);
    setSpeedLvl(2.5);
  };

  // Render Sensory Garden Dynamic Visual Overlay styling
  const sensoryOverlayStyle = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 5,
    borderRadius: '16px',
    transition: `all ${speedLvl}s ease`,
    background: `rgba(10, 14, 30, ${crowdLvl * 0.008})`,
    filter: `brightness(${1.2 - lightingLvl * 0.007}) blur(${crowdLvl * 0.03}px) contrast(${1 + (soundLvl - 30) * 0.004})`,
    boxShadow: notifLvl > 12 ? 'inset 0 0 20px rgba(255, 87, 34, 0.15)' : 'none'
  };

  return (
    <div className="citizen-card-shell neuro-page-shell" style={{ flexDirection: 'column' }}>
      
      {/* Immersive Martian Biosphere Core CSS and Viewport Fixes */}
      <style dangerouslySetInnerHTML={{ __html: `
        .background-canvas {
          filter: brightness(0.68) contrast(1.01) !important;
        }
        .reduce-motion, .reduce-motion * {
          animation: none !important;
          transition: none !important;
        }
        .neuro-page-shell {
          height: calc(100vh - 140px);
          max-height: calc(100vh - 140px);
          min-height: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .museum-floor-nav-deck {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-bottom: 16px;
          flex-shrink: 0;
          z-index: 10;
        }
        .museum-nav-btn {
          padding: 10px 4px;
          font-family: var(--font-tech);
          font-size: 0.68rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          background: rgba(10, 14, 30, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.65);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          text-align: center;
          outline: none;
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.02);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .museum-nav-btn:hover {
          border-color: rgba(0, 255, 136, 0.3);
          color: #00ff88;
          background: rgba(0, 255, 136, 0.04);
        }
        .museum-nav-btn.active {
          border-color: #00ff88;
          color: #00ff88;
          background: rgba(0, 255, 136, 0.08);
          box-shadow: 0 4px 15px rgba(0, 255, 136, 0.12), inset 0 1px 3px rgba(0, 255, 136, 0.04);
          text-shadow: 0 0 4px rgba(0, 255, 136, 0.3);
        }
        .museum-view-corridor {
          flex: 1;
          display: flex;
          flex-direction: row;
          gap: 20px;
          min-height: 0;
          height: 100%;
          max-height: 100%;
        }
        .museum-left-feed {
          flex: 1.1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
          height: 100%;
        }
        .museum-right-diagnostics {
          flex: 1.9;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
          height: 100%;
        }

        .bubbly-panel {
          background: rgba(6, 9, 20, 0.3) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 16px !important;
          padding: 20px !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
        }

        .starmap-canvas-box {
          background: rgba(4, 6, 12, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 0 25px rgba(0,0,0,0.8);
          flex: 1;
          min-height: 250px;
        }
        .starmap-constellation-node {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .starmap-constellation-node:hover circle.glow-ring {
          stroke-width: 1.5px;
          opacity: 0.6;
          r: 9px;
        }
        .constellation-drawer-overlay {
          position: absolute;
          top: 0;
          right: 0;
          width: 320px;
          height: 100%;
          background: rgba(10, 14, 30, 0.94);
          border-left: 2px solid #00ff88;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.7);
          z-index: 50;
          display: flex;
          flex-direction: column;
          animation: slide-drawer 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        @keyframes slide-drawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .custom-scroll {
          overflow-y: auto;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.1);
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 240, 255, 0.3);
        }

        .signup-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          margin-bottom: 10px;
        }
        .badge-btn {
          padding: 8px 4px;
          font-family: monospace;
          font-size: 0.6rem;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          outline: none;
        }
        .badge-btn:hover {
          border-color: rgba(0, 240, 255, 0.3);
          color: #00f0ff;
        }
        .badge-btn.active {
          background: rgba(0, 255, 136, 0.08);
          border-color: #00ff88;
          color: #00ff88;
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.15);
          font-weight: bold;
        }

        .attunement-slider {
          flex: 1;
          accent-color: #00ff88;
          cursor: pointer;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.1);
        }

        @media (max-width: 900px) {
          .neuro-page-shell {
            height: auto !important;
            max-height: none !important;
            min-height: auto !important;
          }
          .museum-floor-nav-deck {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .museum-view-corridor {
            flex-direction: column !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
          }
          .museum-left-feed, .museum-right-diagnostics {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            flex: none !important;
            width: 100% !important;
          }
        }
      `}} />

      {/* Main OS content container */}
      <div className={`walking-content-container slide-active`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Architectural Signage Navigation Deck */}
        <div className="museum-floor-nav-deck">
          <button 
            onClick={() => changeRoute('/neurodiversity')} 
            className={`museum-nav-btn ${activeSector === 'plaza' ? 'active' : ''}`}
          >
            🏛️ Welcome Plaza
          </button>
          <button 
            onClick={() => changeRoute('/neurodiversity/comms-grove')} 
            className={`museum-nav-btn ${activeSector === 'communication' ? 'active' : ''}`}
          >
            📡 Dialogue Bridges
          </button>
          <button 
            onClick={() => changeRoute('/neurodiversity/sensory-garden')} 
            className={`museum-nav-btn ${activeSector === 'sensory' ? 'active' : ''}`}
          >
            🌿 Sensory Biome
          </button>
          <button 
            onClick={() => changeRoute('/neurodiversity/lexicon-pavilion')} 
            className={`museum-nav-btn ${activeSector === 'lexicon' ? 'active' : ''}`}
          >
            🌌 Synaptic Map
          </button>
          <button 
            onClick={() => changeRoute('/neurodiversity/meetup-campfire')} 
            className={`museum-nav-btn ${activeSector === 'meetup' ? 'active' : ''}`}
          >
            👥 Cozy Hearth
          </button>
        </div>

        {/* Dynamic Sector Rendering */}
        <div className="museum-view-corridor">
          
          {/* ====================================
              1. DISTRICT WELCOME PLAZA SECTOR (DRAMATIC SIMPLIFICATION)
              ==================================== */}
          {activeSector === 'plaza' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', margin: '0 auto', maxWidth: '900px', padding: '10px 0 20px 0' }}>
              
              {/* Soft Translucent Welcome Signage Plaque */}
              <div className="bubbly-panel" style={{ textAlign: 'center', padding: '24px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '3px', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  // LAWN WELCOME // PORTAL DIRECTORY
                </span>
                <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.4rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px' }}>
                  Welcome Plaza
                </h1>
                
                <div style={{ fontSize: '0.8rem', color: '#8a9bb5', lineHeight: '1.65', margin: '0 auto', maxWidth: '460px', textAlign: 'center', fontFamily: 'monospace' }}>
                  Welcome to the entryway plaza of the Neurodiversity Lawn. This park biome is designed for sensory comfort, clear communication, and community connection.
                  <br/><br/>
                  Select a pathway node below to explore our shared spaces.
                </div>
              </div>

              {/* Spatial Destination Pathways Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {[
                  {
                    title: '📡 Dialogue Bridges',
                    subtitle: 'Comms Grove',
                    route: '/neurodiversity/comms-grove',
                    desc: 'Explore dual communication styles, unmasking dynamics, and the double empathy problem through interactive bridges and wave-phase alignment tuners.',
                    color: '#ffb300',
                    rgb: '255, 179, 0'
                  },
                  {
                    title: '🌿 Sensory Garden Biome',
                    subtitle: 'Adaptive Biome',
                    route: '/neurodiversity/sensory-garden',
                    desc: 'Interact with dome lighting, sound decibels, citizens density, and sweep speeds to experience how custom environmental adjustments restore nervous system energy reserves.',
                    color: '#00f0ff',
                    rgb: '0, 240, 255'
                  },
                  {
                    title: '🌌 Synaptic Map Pavilion',
                    subtitle: 'Lexicon Vaults',
                    route: '/neurodiversity/lexicon-pavilion',
                    desc: 'Wander through a three-dimensional open-air starmap connecting key terminology, monotropic cognitive focus, and systemic adult burnout cascades.',
                    color: '#c259ff',
                    rgb: '194, 89, 255'
                  },
                  {
                    title: '👥 Community Hearth Campfire',
                    subtitle: 'Support Hearth',
                    route: '/neurodiversity/meetup-campfire',
                    desc: 'Gather around the glowing hearth under the evening sky-canopy to check-in, share supportive advocate log entries, and read active community events.',
                    color: '#00ff88',
                    rgb: '0, 255, 136'
                  }
                ].map((dest) => (
                  <div
                    key={dest.route}
                    onClick={() => changeRoute(dest.route)}
                    style={{
                      background: 'rgba(6, 9, 20, 0.35)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '20px 24px',
                      cursor: 'pointer',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.borderColor = dest.color;
                      e.currentTarget.style.boxShadow = `0 8px 30px rgba(${dest.rgb}, 0.12)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: dest.color, letterSpacing: '1px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {dest.subtitle}
                      </span>
                      <span style={{ fontSize: '0.62rem', color: dest.color, fontFamily: 'monospace' }}>[ PATHWAY ➔ ]</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.05rem', color: '#fff', margin: 0, fontWeight: 700 }}>
                      {dest.title}
                    </h3>
                    <p style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.5', margin: 0, textAlign: 'justify' }}>
                      {dest.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
 
          {/* ====================================
              2. COMMUNICATION GROVE SECTOR ( DIALOGUE BRIDGES )
              ==================================== */}
          {activeSector === 'communication' && (
            <div className="museum-view-corridor" style={{ width: '100%', gap: '20px' }}>
              
              {/* Left Panel: Dialogue Bridges Switcher */}
              <div className="museum-left-feed" style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    // COMMS GROVE // DIALOGUE BRIDGES
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.92rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Dialogue Bridges
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                    Different minds process conversation subtexts differently. Toggle below to compare standard **Subtextual (Implicit)** expectations with clear **Coordinated (Explicit)** interaction rules.
                  </p>

                  {/* Filter selector */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '4px' }}>
                    <button
                      onClick={() => setCommsFilter('nt')}
                      className={`badge-btn ${commsFilter === 'nt' ? 'active' : ''}`}
                      style={{ borderColor: commsFilter === 'nt' ? '#ff5722' : 'rgba(255,255,255,0.08)', color: commsFilter === 'nt' ? '#ff5722' : '#8a9bb5', background: commsFilter === 'nt' ? 'rgba(255,87,34,0.08)' : 'rgba(0,0,0,0.3)' }}
                    >
                      [ ❌ SUBTEXTUAL / IMPLICIT ]
                    </button>
                    <button
                      onClick={() => setCommsFilter('nd')}
                      className={`badge-btn ${commsFilter === 'nd' ? 'active' : ''}`}
                      style={{ borderColor: commsFilter === 'nd' ? '#00ff88' : 'rgba(255,255,255,0.08)', color: commsFilter === 'nd' ? '#00ff88' : '#8a9bb5', background: commsFilter === 'nd' ? 'rgba(0,255,136,0.08)' : 'rgba(0,0,0,0.3)' }}
                    >
                      [ ✅ COORDINATED / EXPLICIT ]
                    </button>
                  </div>
                </div>

                {/* Chat Feed Panel */}
                <div className="bubbly-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'block' }}>
                    ACTIVE COMMUNITY BRIDGE CHAT:
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {commsFilter === 'nt' ? (
                      <>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #ff5722' }}>
                          <strong style={{ display: 'block', fontSize: '0.66rem', color: '#ff5722', fontFamily: 'monospace' }}>Citizen A (Subtextual Request):</strong>
                          <p style={{ fontSize: '0.74rem', color: '#fff', margin: '4px 0 0 0', fontStyle: 'italic' }}>
                            "Wow, the air filters in this segment are getting really loud today, don't you think?"
                          </p>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #8a9bb5' }}>
                          <strong style={{ display: 'block', fontSize: '0.66rem', color: '#8a9bb5', fontFamily: 'monospace' }}>Citizen B (Direct Interpretation):</strong>
                          <p style={{ fontSize: '0.74rem', color: '#fff', margin: '4px 0 0 0' }}>
                            "Yes, they are indeed. The decibel monitors show they are operating at 65 dB." *(B continues working, unaware A wanted them to turn down or adjust the dials)*
                          </p>
                        </div>

                        <div style={{ background: 'rgba(255, 87, 34, 0.05)', border: '1px solid rgba(255, 87, 34, 0.2)', padding: '10px', borderRadius: '8px', marginTop: '4px' }}>
                          <strong style={{ display: 'block', fontSize: '0.6rem', color: '#ff5722', fontFamily: 'monospace', marginBottom: '2px' }}>
                            📡 SYSTEM DIAGNOSTIC ANALYSIS:
                          </strong>
                          <p style={{ margin: 0, fontSize: '0.66rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.35 }}>
                            *❌ PROTOCOL MISMATCH. Citizen A expected a subtle request for support. Citizen B processed only the literal data query. Core battery overhead drained by cognitive guessing overlays.*
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #00ff88' }}>
                          <strong style={{ display: 'block', fontSize: '0.66rem', color: '#00ff88', fontFamily: 'monospace' }}>Citizen A (Explicit Direct Request):</strong>
                          <p style={{ fontSize: '0.74rem', color: '#fff', margin: '4px 0 0 0' }}>
                            "I am experiencing sensory overstimulation from the air filter hum. Could you help me lower the speed toggle to 30% for the next hour?"
                          </p>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #00f0ff' }}>
                          <strong style={{ display: 'block', fontSize: '0.66rem', color: '#00f0ff', fontFamily: 'monospace' }}>Citizen B (Direct Execution):</strong>
                          <p style={{ fontSize: '0.74rem', color: '#fff', margin: '4px 0 0 0' }}>
                            "Understood. Lowering speed toggle to 30% now. Speed synchronized. Does this level feel comfortable for you?"
                          </p>
                        </div>

                        <div style={{ background: 'rgba(0, 255, 136, 0.05)', border: '1px solid rgba(0, 255, 136, 0.2)', padding: '10px', borderRadius: '8px', marginTop: '4px' }}>
                          <strong style={{ display: 'block', fontSize: '0.6rem', color: '#00ff88', fontFamily: 'monospace', marginBottom: '2px' }}>
                            📡 SYSTEM DIAGNOSTIC ANALYSIS:
                          </strong>
                          <p style={{ margin: 0, fontSize: '0.66rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.35 }}>
                            *✅ EXPLICIT ALIGNMENT SYNCHRONIZED. Complete protocol match. Guessing overlays bypassed entirely. Processor overhead at 0%, restoring nervous system battery levels to optimal nominal range.*
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Panel: Cooperative Connection Tuner */}
              <div className="museum-right-diagnostics custom-scroll" style={{ flex: 1.9, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="bubbly-panel" style={{ padding: '16px', border: '1.5px solid rgba(0, 240, 255, 0.25)', boxShadow: '0 0 20px rgba(0, 240, 255, 0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed rgba(0, 240, 255, 0.2)', paddingBottom: '6px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#00f0ff', fontWeight: 'bold', letterSpacing: '1px' }}>
                      📡 COOPERATIVE CONNECTION TUNER (DOUBLE EMPATHY METHOD)
                    </span>
                    <span style={{ 
                      fontSize: '0.54rem', 
                      fontFamily: 'monospace', 
                      color: isSyncLocked ? '#00ff88' : '#ffb300',
                      fontWeight: 'bold',
                      background: isSyncLocked ? 'rgba(0,255,136,0.06)' : 'rgba(255,179,0,0.06)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: `1px solid ${isSyncLocked ? '#00ff88' : '#ffb300'}`
                    }}>
                      {isSyncLocked ? '⚡ BRIDGE: LOCKED & SYNCED' : '⚠️ BRIDGE: OUT OF PHASE'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.68rem', color: '#8a9bb5', lineHeight: 1.4, margin: '0 0 12px 0', textAlign: 'justify' }}>
                    The **Double Empathy Mismatch** occurs when divergent neurotypes fail to align communication signals. By adjusting the sliders below to mutual expectations, you build a shared protocol. Achieve sync (both signals at **50%**) to lock the bridge, or click Auto-Sync.
                  </p>

                  {/* Signal Waves Graph Canvas */}
                  <div style={{ background: '#030509', border: '1.5px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px 14px', position: 'relative', overflow: 'hidden', height: '90px', boxSizing: 'border-box' }}>
                    <svg viewBox="0 0 240 70" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <line x1="5" y1="35" x2="235" y2="35" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      
                      {!isSyncLocked && (
                        <path 
                          d={`M 5,35 Q 30,${35 - (signalNT - 50) * 0.5} 60,35 T 120,35 T 180,35 T 235,35`} 
                          fill="none" 
                          stroke="#ff5722" 
                          strokeWidth="1.2" 
                          strokeDasharray={reduceMotion ? 'none' : '4 2'} 
                          style={{ animation: reduceMotion ? 'none' : 'dash 15s linear infinite' }}
                        />
                      )}

                      {!isSyncLocked && (
                        <path 
                          d={`M 5,35 Q 30,${35 + (signalND - 50) * 0.5} 60,35 T 120,35 T 180,35 T 235,35`} 
                          fill="none" 
                          stroke="#ffb300" 
                          strokeWidth="1.2" 
                          style={{ opacity: 0.85 }}
                        />
                      )}

                      {isSyncLocked && (
                        <path 
                          d="M 5,35 Q 30,35 60,35 T 120,35 T 180,35 T 235,35" 
                          fill="none" 
                          stroke="#00ff88" 
                          strokeWidth="2.5" 
                          style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }}
                        />
                      )}
                    </svg>
                  </div>

                  {/* Sliders Grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#ff5722', width: '130px', flexShrink: 0 }}>
                        INHABITANT A EXPECTATIONS:
                      </span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={signalNT}
                        onChange={(e) => setSignalNT(Number(e.target.value))}
                        disabled={isSyncLocked}
                        className="attunement-slider"
                        style={{ accentColor: '#ff5722', cursor: isSyncLocked ? 'not-allowed' : 'pointer' }}
                      />
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff', width: '30px', textAlign: 'right', flexShrink: 0 }}>
                        {signalNT}%
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#ffb300', width: '130px', flexShrink: 0 }}>
                        INHABITANT B EXPECTATIONS:
                      </span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={signalND}
                        onChange={(e) => setSignalND(Number(e.target.value))}
                        disabled={isSyncLocked}
                        className="attunement-slider"
                        style={{ accentColor: '#ffb300', cursor: isSyncLocked ? 'not-allowed' : 'pointer' }}
                      />
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff', width: '30px', textAlign: 'right', flexShrink: 0 }}>
                        {signalND}%
                      </span>
                    </div>
                  </div>

                  {/* Auto Sync action bar */}
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '14px', borderTop: '1px dashed rgba(0, 240, 255, 0.1)', paddingTop: '10px' }}>
                    {!isSyncLocked ? (
                      <button
                        onClick={handleAutoSync}
                        className="hud-btn"
                        style={{ borderColor: '#00ff88', color: '#00ff88', background: 'rgba(0, 255, 136, 0.06)', fontSize: '0.62rem', padding: '4px 12px' }}
                      >
                        [ 📡 SYNCHRONIZE SIGNALS ]
                      </button>
                    ) : (
                      <button
                        onClick={() => { setSignalNT(40); setSignalND(80); setIsSyncLocked(false); }}
                        className="hud-btn"
                        style={{ borderColor: '#ff5722', color: '#ff5722', background: 'rgba(255, 87, 34, 0.05)', fontSize: '0.62rem', padding: '4px 12px' }}
                      >
                        [ ✕ DETACH SIGNALS ]
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================
              3. SENSORY GARDEN SECTOR ( SENSORY ATTUNEMENT BIOME )
              ==================================== */}
          {activeSector === 'sensory' && (
            <div className="museum-view-corridor" style={{ width: '100%', gap: '20px', position: 'relative' }}>
              
              {/* Dynamic Glassmorphic filter overlay */}
              <div style={sensoryOverlayStyle}></div>

              {/* Left Column: Interactive Sensory Adaptation Panel */}
              <div className="museum-left-feed" style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 10 }}>
                <div className="bubbly-panel">
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00f0ff', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    // SENSORY GARDEN // BIOME ADAPTATION INTERACTIVE DIALS
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.92rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Sensory Adaptation Biome
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, margin: '0 0 12px 0' }}>
                    Divergent minds process sensory telemetry with different thresholds. Customize the botanical dome's variables below to experience how accommodations restore peace, or apply direct presets.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                    <button
                      onClick={applyDeficitPreset}
                      className="badge-btn"
                      style={{ borderColor: '#ff5722', color: '#ff5722', background: 'rgba(255,87,34,0.06)' }}
                    >
                      ⚠️ SENSORY GLARE PRESET
                    </button>
                    <button
                      onClick={applyInclusivePreset}
                      className="badge-btn"
                      style={{ borderColor: '#00ff88', color: '#00ff88', background: 'rgba(0,255,136,0.06)' }}
                    >
                      🌿 LOUNGE QUIET PRESET
                    </button>
                  </div>

                  {/* Sliders Deck */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    {/* Lighting */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>💡 DOME LIGHTING LUMENS:</span>
                        <strong style={{ color: lightingLvl > 75 ? '#ff5722' : '#00ff88' }}>{lightingLvl}%</strong>
                      </div>
                      <input 
                        type="range" min="10" max="100" value={lightingLvl}
                        onChange={(e) => setLightingLvl(Number(e.target.value))}
                        className="attunement-slider"
                      />
                    </div>

                    {/* Crowd */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>👥 SOCIAL DENSITY (CROWD):</span>
                        <strong style={{ color: crowdLvl > 35 ? '#ff5722' : '#00ff88' }}>{crowdLvl} ACTIVE DONS</strong>
                      </div>
                      <input 
                        type="range" min="0" max="50" value={crowdLvl}
                        onChange={(e) => setCrowdLvl(Number(e.target.value))}
                        className="attunement-slider"
                      />
                    </div>

                    {/* Sound */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>🔊 DOME HUM DECIBELS (SOUND):</span>
                        <strong style={{ color: soundLvl > 70 ? '#ff5722' : '#00ff88' }}>{soundLvl} dB</strong>
                      </div>
                      <input 
                        type="range" min="10" max="100" value={soundLvl}
                        onChange={(e) => setSoundLvl(Number(e.target.value))}
                        className="attunement-slider"
                      />
                    </div>

                    {/* Notifications */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>🚨 OS NOTIFICATION TICK RATES:</span>
                        <strong style={{ color: notifLvl > 12 ? '#ff5722' : '#00ff88' }}>{notifLvl} ALERTS / SOL</strong>
                      </div>
                      <input 
                        type="range" min="0" max="20" value={notifLvl}
                        onChange={(e) => setNotifLvl(Number(e.target.value))}
                        className="attunement-slider"
                      />
                    </div>

                    {/* Animation speed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>🏃 ANIMATION TICK INTERVAL (MOTION):</span>
                        <strong style={{ color: speedLvl < 0.6 ? '#ff5722' : '#00ff88' }}>{speedLvl}s SWEEP</strong>
                      </div>
                      <input 
                        type="range" min="2" max="40" value={speedLvl * 10}
                        onChange={(e) => setSpeedLvl(Number(e.target.value) / 10)}
                        className="attunement-slider"
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column: Live Soothing Environment Telemetry Output */}
              <div className="museum-right-diagnostics custom-scroll" style={{ flex: 1.9, display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 10 }}>
                
                {/* Simulated telemetry HUD display */}
                <div className="bubbly-panel" style={{ border: '1.5px solid rgba(0, 240, 255, 0.2)', padding: '16px' }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#00f0ff', fontWeight: 'bold', display: 'block', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '8px' }}>
                    📡 ACTIVE BIOME COMFORT METRICS
                  </span>

                  {/* Metrics grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontFamily: 'monospace' }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>ILLUMINATION LEVEL</span>
                      <strong style={{ fontSize: '0.8rem', color: lightingLvl > 75 ? '#ff5722' : '#00ff88' }}>
                        {lightingLvl > 75 ? '⚠️ HIGH GLARE' : '✓ NOMINAL'}
                      </strong>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>SOCIAL DENSITY</span>
                      <strong style={{ fontSize: '0.8rem', color: crowdLvl > 35 ? '#ff5722' : '#00ff88' }}>
                        {crowdLvl > 35 ? '⚠️ HIGH COMPRESSION' : '✓ ENERGETIC NOMINAL'}
                      </strong>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>AMBIENT SOUND</span>
                      <strong style={{ fontSize: '0.8rem', color: soundLvl > 70 ? '#ff5722' : '#00ff88' }}>
                        {soundLvl > 70 ? '⚠️ LOUD DECIBELS' : '✓ RECOVERY ACTIVE'}
                      </strong>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>NERVOUS SYSTEM COMFORT BUFFER</span>
                      <strong style={{ fontSize: '0.8rem', color: (lightingLvl > 75 || crowdLvl > 35 || soundLvl > 70 || notifLvl > 12) ? '#ff5722' : '#00ff88' }}>
                        {(lightingLvl > 75 || crowdLvl > 35 || soundLvl > 70 || notifLvl > 12) ? '🔋 EXPEDITE DRAIN (3.2x)' : '🔋 STABLE RESTORE (+8.5)'}
                      </strong>
                    </div>
                  </div>

                  <p style={{ margin: '14px 0 0 0', fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, textAlign: 'justify' }}>
                    <strong>Adaptive Environment Reflection:</strong> In standard public infrastructure, environments are locked to rigid, unalterable variables. This forces neurodivergent people to continually mask overstimulation, draining their buffer reserves. In an **inclusive society**, architecture is adaptive: adjustable dimming, quiet pockets, and flexible sensory attunement dials give individuals the control needed to protect their wellbeing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ====================================
              4. LEXICON PAVILION SECTOR ( SYNAPTIC MAP PAVILION )
              ==================================== */}
          {activeSector === 'lexicon' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', minHeight: 0, height: '100%', position: 'relative' }}>
              <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  🌌 Synaptic Map Pavilion
                </h3>
                <p style={{ fontSize: '0.74rem', color: '#8a9bb5', lineHeight: 1.5, margin: 0 }}>
                  Concepts in neurodiversity do not exist in isolation. Click on the glowing starmap constellation nodes to display definitions, or use the **Connected Spatial Relationship Grid** below to see how monotropic deep-focus, unmasking filters, and cognitive recharge dynamics physically link together as a living knowledge system.
                </p>
              </div>

              {/* Connected Spatial Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', background: 'rgba(4,6,12,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px', boxSizing: 'border-box' }}>
                {[
                  { id: 'monotropism', title: 'I. Monotropism', link: 'leads to continuous stealth masking', desc: 'Single-channel deep cognitive focus', color: '#ffb300' },
                  { id: 'masking', title: 'II. Masking', link: 'causes ongoing energy battery drain', desc: 'Stealth social compliance overlays', color: '#00f0ff' },
                  { id: 'burnout', title: 'III. Burnout', link: 'triggers system timeout loops', desc: 'Nervous system battery crash & fatigue', color: '#ff5722' },
                  { id: 'executive', title: 'IV. PDA Profile', link: 'demands absolute citizen autonomy', desc: 'Need for high autonomy & request balance', color: '#00ff88' }
                ].map((node, idx) => (
                  <div 
                    key={node.id}
                    onClick={() => {
                      const item = LEXICON_ITEMS.find(x => x.id === node.id || x.id.includes(node.id));
                      if (item) setActiveStarNode(item);
                    }}
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: `1.2px solid ${node.color}`,
                      borderRadius: '8px',
                      padding: '10px',
                      cursor: 'pointer',
                      boxShadow: `0 0 10px rgba(${node.color === '#00ff88' ? '0,255,136' : (node.color === '#ffb300' ? '255,179,0' : (node.color === '#ff5722' ? '255,87,34' : '0,240,255'))}, 0.05)`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <strong style={{ fontSize: '0.66rem', color: node.color, fontFamily: 'monospace' }}>{node.title.toUpperCase()}</strong>
                    <span style={{ fontSize: '0.58rem', color: '#fff', fontWeight: 'bold' }}>{node.desc}</span>
                    <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', marginTop: '2px', borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '4px' }}>
                      ↳ {node.link}
                    </span>
                  </div>
                ))}
              </div>

              {/* Starmap Interactive Canvas */}
              <div className="starmap-canvas-box">
                <svg viewBox="0 0 240 140" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="amberStarGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffb300" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="cyanStarGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.5">
                    <line x1="30" y1="35" x2="65" y2="25" />
                    <line x1="65" y1="25" x2="110" y2="40" />
                    <line x1="110" y1="40" x2="155" y2="30" />
                    <line x1="155" y1="30" x2="200" y2="45" />

                    <line x1="30" y1="35" x2="55" y2="75" />
                    <line x1="65" y1="25" x2="90" y2="85" />
                    <line x1="110" y1="40" x2="130" y2="90" />
                    <line x1="155" y1="30" x2="175" y2="80" />
                    
                    <line x1="55" y1="75" x2="90" y2="85" />
                    <line x1="90" y1="85" x2="130" y2="90" />
                    <line x1="130" y1="90" x2="175" y2="80" />
                    <line x1="175" y1="80" x2="210" y2="70" />
                  </g>

                  {LEXICON_ITEMS.map((item, idx) => {
                    const isSelected = activeStarNode?.id === item.id;
                    const glowColor = item.category === 'energy' ? 'url(#amberStarGlow)' : (item.category === 'cognitive' ? 'url(#cyanStarGlow)' : 'url(#starGlow)');
                    const strokeColor = item.category === 'energy' ? '#ffb300' : (item.category === 'cognitive' ? '#00f0ff' : '#00ff88');

                    return (
                      <g 
                        key={item.id} 
                        onClick={() => setActiveStarNode(item)}
                        className="starmap-constellation-node"
                      >
                        <circle cx={item.cx} cy={item.cy} r={isSelected ? '14' : '9'} fill={glowColor} className="glow-ring" />
                        <circle cx={item.cx} cy={item.cy} r="3" fill="#fff" />
                        <circle 
                          cx={item.cx} 
                          cy={item.cy} 
                          r={isSelected ? '6.5' : '4.5'} 
                          fill="none" 
                          stroke={strokeColor} 
                          strokeWidth={isSelected ? '1.5' : '0.8'} 
                        />
                        <text 
                          x={item.cx} 
                          y={item.cy + 10} 
                          fill={isSelected ? strokeColor : 'rgba(255,255,255,0.45)'} 
                          fontSize="3.8" 
                          fontFamily="monospace" 
                          textAnchor="middle"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {item.title.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Concept definition drawer overlay */}
                {activeStarNode && (
                  <div className="constellation-drawer-overlay" style={{ borderLeftColor: activeStarNode.category === 'energy' ? '#ffb300' : (activeStarNode.category === 'cognitive' ? '#00f0ff' : '#00ff88') }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#00f0ff', fontWeight: 'bold' }}>
                        // SYNAPTIC MAP DEF DECK
                      </span>
                      <button 
                        onClick={() => setActiveStarNode(null)} 
                        style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="custom-scroll" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>
                          {activeStarNode.category.toUpperCase()} STATE
                        </span>
                        <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#fff', textTransform: 'uppercase', margin: '4px 0 2px 0' }}>
                          {activeStarNode.title}
                        </h4>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                          {activeStarNode.pronunciation}
                        </span>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.45, fontStyle: 'italic', borderLeft: `2.5px solid ${activeStarNode.category === 'energy' ? '#ffb300' : (activeStarNode.category === 'cognitive' ? '#00f0ff' : '#00ff88')}`, paddingLeft: '8px' }}>
                        {activeStarNode.shortDef}
                      </p>

                      <p style={{ margin: 0, fontSize: '0.74rem', color: '#fff', lineHeight: 1.5, textAlign: 'justify' }}>
                        <strong>Diagnostic analysis:</strong> {activeStarNode.longDef}
                      </p>

                      <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px' }}>
                        <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'monospace', color: '#00f0ff', marginBottom: '2px' }}>
                          📡 MEMOIR_LOGENTRY.DAT:
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#8a9bb5', lineHeight: 1.4, textAlign: 'justify' }}>
                          {activeStarNode.storyReflection}
                        </p>
                      </div>

                      <div style={{ background: 'rgba(0, 255, 136, 0.02)', border: '1px solid rgba(0, 255, 136, 0.1)', borderRadius: '8px', padding: '10px' }}>
                        <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', marginBottom: '2px' }}>
                          💡 INCLUSIVE PRACTICE:
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#fff', lineHeight: 1.4 }}>
                          {activeStarNode.takeaway}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ====================================
              5. MEETUP & ADVOCACY CAMPFIRE SECTOR ( COMMUNITY HEARTH CIRCLE )
              ==================================== */}
          {activeSector === 'meetup' && (
            <div className="museum-view-corridor" style={{ width: '100%', gap: '20px' }}>
              
              {/* Left Column: Campfire Schedule Bulletin */}
              <div className="museum-left-feed" style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="bubbly-panel" style={{ padding: '16px' }}>
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    // COMMUNITY HEARTH // ACTIVE CAMPFIRE GROVE
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.92rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    Community Hearth Campfire
                  </h3>
                  <p style={{ fontSize: '0.74rem', color: '#8a9bb5', lineHeight: 1.45, margin: 0, textAlign: 'justify' }}>
                    Welcome to the campfire circle at the Advocacy Meetup Grove! Colony citizens hang out here under the synthetic dome sky to socialize, play low-gravity dome-sports, share coffee, form mutual support groups, and establish explicit communication bridges.
                  </p>
                </div>

                {/* Bulletin Board */}
                <div className="bubbly-panel" style={{ padding: '14px', border: '1px solid rgba(0, 240, 255, 0.2)', background: 'rgba(6, 9, 20, 0.8)' }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#00ff88', fontWeight: 'bold', display: 'block', borderBottom: '1px dashed rgba(0, 240, 255, 0.15)', paddingBottom: '6px', marginBottom: '8px' }}>
                    📅 COMMUNITY CALENDAR
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { time: 'Sol 14 18:00', title: '👥 Weekly Cooperative Synapse', desc: 'Hangout, casual networking, and campfire coffee chats.' },
                      { time: 'Sol 18 15:00', title: '🏃 Low-G Dome-Sports & Discus League', desc: 'Sensory-friendly, low-demand athletic matches on East Lawn.' },
                      { time: 'Sol 22 20:00', title: '📡 Explicit Comms & Self-Advocacy Workshop', desc: 'Practical rules, double-empathy debugging, and workspace design.' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '8px 10px' }}>
                        <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00f0ff', display: 'block' }}>{item.time}</span>
                        <strong style={{ fontSize: '0.68rem', color: '#fff', fontFamily: 'monospace', display: 'block', margin: '2px 0' }}>{item.title}</strong>
                        <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)', display: 'block', lineHeight: 1.2 }}>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Citizen check-in */}
                <div className="bubbly-panel" style={{ padding: '14px' }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#00ff88', fontWeight: 'bold', display: 'block', borderBottom: '1px dashed rgba(255, 255, 255, 0.08)', paddingBottom: '6px', marginBottom: '8px' }}>
                    👥 REGISTER YOUR PRESENCE
                  </span>

                  <form onSubmit={handleRegisterMeetup} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input 
                      type="text"
                      placeholder="[ ENTER CITIZEN HANDLE... ]"
                      value={meetupName}
                      onChange={(e) => setMeetupName(e.target.value)}
                      style={{
                        padding: '8px 10px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '0.68rem',
                        fontFamily: 'monospace',
                        outline: 'none'
                      }}
                    />

                    <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'block' }}>
                      SELECT SPECIALTY PARK ROLE BADGE:
                    </span>

                    <div className="signup-grid">
                      {[
                        { id: 'architect', label: '🛠️ Habitat Architect' },
                        { id: 'guard', label: '🌿 Sensory Supporter' },
                        { id: 'communicator', label: '📡 Clear Comms' },
                        { id: 'sports', label: '🏃 Sports Coord' }
                      ].map(badge => (
                        <button
                          key={badge.id}
                          type="button"
                          onClick={() => setSpecialtyBadge(badge.id)}
                          className={`badge-btn ${specialtyBadge === badge.id ? 'active' : ''}`}
                        >
                          {badge.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={!meetupName.trim()}
                      className="hud-btn"
                      style={{
                        padding: '6px',
                        fontSize: '0.62rem',
                        borderColor: '#00ff88',
                        color: '#00ff88',
                        background: 'rgba(0, 255, 136, 0.05)',
                        opacity: meetupName.trim() ? 1 : 0.4,
                        cursor: meetupName.trim() ? 'pointer' : 'not-allowed'
                      }}
                    >
                      [ ➕ JOIN COZY HEARTH ]
                    </button>
                  </form>

                  {registrationMessage && (
                    <div style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#00ff88', textAlign: 'center', marginTop: '8px' }}>
                      {registrationMessage}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Dynamic Logbook Feed & Pledging */}
              <div className="museum-right-diagnostics custom-scroll" style={{ flex: 1.9, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="bubbly-panel" style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '200px' }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#00ff88', fontWeight: 'bold', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                    📡 COMMUNITY LOGBOOK & HEARTH FEEDS
                  </span>

                  <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                    {[
                      { name: 'Ephraim Becker', msg: 'Just adjusted the park spotlights near the reflection pond to a low-glare warm frequency. Monotropic focus layers feel nominal! 🦆', sol: 'Sol 08' },
                      { name: 'Sarah K.', msg: 'Organizing a low-gravity frisbee match on the East Lawn next Sol! Simple direct rules, zero pressure, sensory quiet. Who is in?', sol: 'Sol 11' },
                      { name: 'Marcus V.', msg: 'I really appreciate the explicit verbal check-in sheets we established for the engineering core. It cut double-empathy desync in half!', sol: 'Sol 13' },
                      ...registeredCitizens.slice(3).map(cit => {
                        const badgeLabel = 
                          cit.badge === 'architect' ? 'Habitat Architect' :
                          cit.badge === 'guard' ? 'Sensory Supporter' :
                          cit.badge === 'communicator' ? 'Clear Communicator' : 'Sports Coordinator';
                        return {
                          name: cit.name,
                          msg: `Just checked in as a ${badgeLabel}! Let's build explicit bridges! 👥`,
                          sol: 'Sol 14 (Just Now)'
                        };
                      })
                    ].map((chat, idx) => (
                      <div key={idx} style={{ fontSize: '0.68rem', borderBottom: '1px dashed rgba(255,255,255,0.03)', paddingBottom: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                          <strong style={{ color: '#00ff88', fontFamily: 'monospace' }}>{chat.name}</strong>
                          <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)' }}>{chat.sol}</span>
                        </div>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.78)', lineHeight: 1.35 }}>{chat.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

const LEXICON_ITEMS = exhibitData.lexiconItems;
