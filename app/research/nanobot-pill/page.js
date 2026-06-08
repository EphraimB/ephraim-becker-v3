'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function NanobotPillDetails() {
  const [transitState, setTransitState] = useState('slide-active');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Interactive HUD States
  const [hudFilterActive, setHudFilterActive] = useState(false);
  const [thoughtSyncActive, setThoughtSyncActive] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hoveredApp, setHoveredApp] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [hoveredWaypoint, setHoveredWaypoint] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 180, y: 120 });
  
  // Active Scenario inside Phase 5
  const [activeScenario, setActiveScenario] = useState('productivity');
  const [isPlayingMedia, setIsPlayingMedia] = useState(true);
  const [timeString, setTimeString] = useState('');

  const scrollRef = useRef(null);
  const viewportRef = useRef(null);

  // Live ticking clock for spatial anchors
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeString(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle slide entrance transition
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

  // Sync scroll positioning to activeTab
  const handleScroll = (e) => {
    const container = e.currentTarget;
    const sections = ['overview', 'payload', 'adaptation', 'assembly', 'eclipse'];
    let currentActive = 'overview';

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        if (rect.top - containerRect.top <= containerRect.height / 2) {
          currentActive = id;
        }
      }
    }
    setActiveTab(currentActive);
  };

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Parallax Mouse Movement
  const handleMouseMove = (e) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    setParallax({
      x: x * 8, // Max offset 8px
      y: y * 8
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  // Sub-Vocal Typewriter Simulation Loop
  useEffect(() => {
    if (!thoughtSyncActive) {
      setTypedText('');
      return;
    }

    const phrases = [
      { text: '> [SYNAPSE LINK] USER INTENT: /query_colony_feed', delay: 1000 },
      { text: '> [BCI OS] CONNECTING TO MESON NET...', delay: 800 },
      { text: '> [DOWNLINK] QUANTUM RELAY SECTOR 02 SYNCED [0.4ms]', delay: 1200 },
      { text: '> [SYNAPSE LINK] USER INTENT: /spawn_wall_clock', delay: 1400 },
      { text: '> [BCI OS] SNAP LOG: Clock anchor locked on Living Room Wall', delay: 1000 },
      { text: '> [SYNAPSE LINK] USER INTENT: /project_wristwatch', delay: 1500 },
      { text: '> [BCI OS] HUD LOG: Arm wrist watch vector calibrated', delay: 1200 },
      { text: '> [BCI OS] COGNITIVE BATTERY POWER DRAW: 0.35mg/min', delay: 600 }
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isTyping = true;
    let textBuffer = [''];
    let timer;

    const runTypewriter = () => {
      if (!thoughtSyncActive) return;

      const currentPhrase = phrases[currentPhraseIndex];
      if (isTyping) {
        if (currentCharIndex <= currentPhrase.text.length) {
          setTypedText(() => {
            const lines = [...textBuffer];
            lines[lines.length - 1] = currentPhrase.text.slice(0, currentCharIndex);
            return lines.join('\n');
          });
          currentCharIndex++;
          timer = setTimeout(runTypewriter, 25);
        } else {
          isTyping = false;
          timer = setTimeout(runTypewriter, currentPhrase.delay);
        }
      } else {
        textBuffer.push(currentPhrase.text);
        if (textBuffer.length > 4) {
          textBuffer.shift();
        }
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        currentCharIndex = 0;
        isTyping = true;
        textBuffer.push('');
        timer = setTimeout(runTypewriter, 150);
      }
    };

    timer = setTimeout(runTypewriter, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [thoughtSyncActive]);

  // Telemetry details based on activeTab
  const getBiophysicalStats = () => {
    switch (activeTab) {
      case 'overview':
        return {
          phase: 'PHASE 01 // DISSOLUTION',
          status: 'SWALLOWED // SHELL DEGRADING',
          capsuleIntegrity: '78%',
          bbbCrossing: 'PENDING',
          synapticMapping: '0.0%',
          latency: '-- ms',
          glucose: '0.00 mg/min',
          temp: '37.0°C',
          skinTemp: '36.8°C [NOMINAL]',
          radiation: 'PENDING',
          oxygenSat: '99.1% [DOME_AIR]',
          gravity: '1.00g [TERRESTRIAL]',
          systemState: 'ESTABLISHING'
        };
      case 'payload':
        return {
          phase: 'PHASE 02 // UPTAKE',
          status: 'VESSEL TRANSPORT // CROSSING BBB',
          capsuleIntegrity: '0%',
          bbbCrossing: '89% ACTIVE',
          synapticMapping: '0.0%',
          latency: '98 ms',
          glucose: '0.12 mg/min',
          temp: '37.1°C',
          skinTemp: '36.5°C [STABLE]',
          radiation: 'CALIBRATING',
          oxygenSat: '99.0%',
          gravity: '1.00g',
          systemState: 'UPLINK_SYNCING'
        };
      case 'adaptation':
        return {
          phase: 'PHASE 03 // PHYSO_ADAPTATION',
          status: 'GENETIC INTEGRATION COMPLETED',
          capsuleIntegrity: '0%',
          bbbCrossing: '100% SUCCESS',
          synapticMapping: '0.0%',
          latency: '85 ms',
          glucose: '0.98 mg/min',
          temp: '37.0°C [STABLE]',
          skinTemp: '18.5°C [ADAPTED]',
          radiation: '99.4% REJECTED',
          oxygenSat: '98.6% [HYPOXIA_OK]',
          gravity: '0.38g [STABILIZED]',
          systemState: 'ADAPTED'
        };
      case 'assembly':
        return {
          phase: 'PHASE 04 // CORTICAL MAPPING',
          status: 'ANCHORING IN SYNAPTIC CLEFTS',
          capsuleIntegrity: '0%',
          bbbCrossing: '100% SUCCESS',
          synapticMapping: '64.5%',
          latency: '24 ms',
          glucose: '0.85 mg/min',
          temp: '37.3°C',
          skinTemp: '18.5°C',
          radiation: '99.4% REJECTED',
          oxygenSat: '98.6%',
          gravity: '0.38g',
          systemState: 'INTERFACING'
        };
      case 'eclipse':
        return {
          phase: 'PHASE 05 // RETINA BCI OS',
          status: 'SYSTEM ONLINE // HUD ACTIVE',
          capsuleIntegrity: '0%',
          bbbCrossing: '100% SUCCESS',
          synapticMapping: '100% SUCCESS',
          latency: '0.8 ms',
          glucose: '0.42 mg/min',
          temp: '37.0°C',
          skinTemp: '18.5°C',
          radiation: '99.4% REJECTED',
          oxygenSat: '98.6%',
          gravity: '0.38g',
          systemState: 'ACTIVE'
        };
      default:
        return {};
    }
  };

  const stats = getBiophysicalStats();

  const tabs = [
    { id: 'overview', label: '1. Ingestion' },
    { id: 'payload', label: '2. Uptake' },
    { id: 'adaptation', label: '3. Adaptation' },
    { id: 'assembly', label: '4. Assembly' },
    { id: 'eclipse', label: '5. Retina OS' }
  ];

  const scenarios = [
    {
      id: 'productivity',
      icon: '💼',
      title: 'Spatial Productivity',
      description: 'Snap functional widgets to physical walls. Keep a ticking clock on the wall and calendars floating above your desk.'
    },
    {
      id: 'entertainment',
      icon: '🍿',
      title: 'Infinite Entertainment',
      description: 'Project giant glassmorphic media screens in mid-air. Stream video layers and coordinate spatial audio waves.'
    },
    {
      id: 'traverse',
      icon: '🏃',
      title: 'Active Traverse',
      description: 'Navigate the Martian terrain. Project navigation guides on the floor and a biometric wristwatch onto your wrist.'
    }
  ];

  const appList = [
    { id: 'map', label: 'Colony Map', icon: '🗺️' },
    { id: 'comms', label: 'Quantum Net', icon: '📡' },
    { id: 'diag', label: 'Synaptic Health', icon: '🧠' },
    { id: 'logs', label: 'OS Logs', icon: '📜' }
  ];

  const waypoints = [
    { id: 'dome', name: 'RESEARCH LAB DOME', x: '55%', y: '35%', desc: 'Ares Tech Hub // Dist: 140m // Temp: 21.0°C' },
    { id: 'relay', name: 'QUANTUM COMMS TOWER', x: '82%', y: '50%', desc: 'Matrix Relay // Latency: 0.12ms // Signal: 100%' }
  ];

  return (
    <div className="citizen-card-shell nanobot-pill-shell">
      {/* Local keyframes and style overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline-sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes rotate-reticle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes alert-flash {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        @keyframes snap-scale {
          0% { transform: scale(0.7); opacity: 0; filter: blur(4px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes wave-pulse {
          0%, 100% { height: 10px; }
          50% { height: 35px; }
        }
        .gaze-ring-overlay {
          pointer-events: none;
          position: absolute;
          border: 1.5px solid var(--color-accent);
          border-radius: 50%;
          animation: pulse-ring 1.8s infinite linear;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .apple-headline {
          font-family: var(--font-sans);
          font-weight: 700;
          letter-spacing: -0.8px;
          line-height: 1.15;
          background: linear-gradient(180deg, #ffffff 30%, #888888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .apple-sub {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-weight: 400;
        }
      `}} />

      {/* Immersive Sweeper Overlay */}
      <div className="walking-motion-overlay nanobot-pill-walking-overlay"></div>

      <div 
        className={`walking-content-container ${transitState} nanobot-pill-content-container`} 
        style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '15px', maxWidth: '1080px', margin: '0 auto', minHeight: 0, height: '100%' }}
      >
        
        {/* Back navigation & Header Area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link 
            href="/research" 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.sessionStorage.setItem('walk-direction', 'left');
              }
            }}
            className="hud-btn" 
            style={{ width: 'fit-content' }}
          >
            [ ↩ BACK TO LAB DECK ]
          </Link>
          <span style={{ fontSize: '0.62rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 'bold', letterSpacing: '1px' }}>
            ARES LABS // RETINA BCI OS
          </span>
        </div>

        {/* Tab navigation - Quick Scroll Jumps */}
        <div className="bubbly-panel" style={{ padding: '8px 12px', background: 'rgba(6, 9, 20, 0.45)' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`hud-btn ${activeTab === tab.id ? 'active-tab-override' : ''}`}
                style={{
                  flex: 1,
                  fontSize: '0.68rem',
                  borderColor: activeTab === tab.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.08)',
                  background: activeTab === tab.id ? 'rgba(var(--color-accent-rgb), 0.1)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--text-secondary)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '20px', flex: 1, minHeight: 0, height: '100%' }} className="research-grid-deck">
          
          {/* LEFT: Scrollable story container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="custom-scroll"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px', 
              height: '100%', 
              overflowY: 'auto' 
            }}
          >
            
            {/* Story Card 1 */}
            {/* Story Card 1 */}
            <div id="overview" className="bubbly-panel" style={{ minHeight: '330px', padding: '22px 26px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px' }}>
                STAGE 01 // SIMPLE INGESTION
              </span>
              <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                Swallow. Sync. Enjoy.
              </h2>
              <p className="apple-sub" style={{ marginBottom: '15px' }}>
                It starts with a simple vitamin-sized capsule. The BCI Pill replaces the weight of screens, keyboards, and battery packs with a direct connection inside your mind.
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Swallowed with a sip of water, the organic cellulose shell dissolves naturally in your stomach in under 4 minutes. As it dissolves, it releases 12.4 million microscopic helper nodes safely into your system, with zero side effects.
              </p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                <div>⏱️ TIME: ~4 Min</div>
                <div>🧪 SHELL: Plant Cellulose</div>
                <div>🩹 ENTRY: 100% Non-Invasive</div>
              </div>
            </div>

            {/* Story Card 2 */}
            {/* Story Card 2 */}
            <div id="payload" className="bubbly-panel" style={{ minHeight: '330px', padding: '22px 26px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px' }}>
                STAGE 02 // NATURAL TRAVEL
              </span>
              <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                Safe Transit.
              </h2>
              <p className="apple-sub" style={{ marginBottom: '15px' }}>
                Once swallowed, the nodes use your natural circulation to travel. They are chemically coded to find and pass through the brain's natural filters.
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Over a 20-minute journey, they glide smoothly into place inside your visual center. No surgeries, no wires, and no discomfort—just a natural pathway to a new way of seeing.
              </p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                <div>⏱️ TRAVEL: ~20 Min</div>
                <div>📍 TARGET: Visual Center</div>
                <div>🛡️ SAFETY: Clinically Approved</div>
              </div>
            </div>

            {/* Story Card 3 */}
            {/* Story Card 3 */}
            <div id="adaptation" className="bubbly-panel" style={{ minHeight: '330px', padding: '22px 26px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px' }}>
                STAGE 03 // PHYSICAL ADAPTATION
              </span>
              <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                Mars. Just like Earth.
              </h2>
              <p className="apple-sub" style={{ marginBottom: '15px' }}>
                The core goal of the BCI Pill is to let you step onto the Martian surface as comfortably as you walk on Earth. Before the software boots, it adjusts your body to the environment.
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                - **Warmth**: Calibrates your metabolism so the freezing -55°C Martian cold feels like a mild summer breeze.
                <br />- **Shielding**: Toughens your skin cells to naturally block solar radiation.
                <br />- **Oxygen**: Optimizes your breathing to make full use of Mars's thin atmosphere.
                <br />- **Gravity**: Keeps your muscles and bones strong in low gravity.
              </p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                <div>🌡️ SKIN: 18.5°C</div>
                <div>🧬 RAD COAT: 99.4% REJECT</div>
                <div>🫁 O2 SAT: 98.6%</div>
                <div>🛰️ GRAVITY: 0.38g</div>
              </div>
            </div>

            {/* Story Card 4 */}
            {/* Story Card 4 */}
            <div id="assembly" className="bubbly-panel" style={{ minHeight: '330px', padding: '22px 26px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px' }}>
                STAGE 04 // CREATING THE LINK
              </span>
              <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                Connecting to Your Thoughts.
              </h2>
              <p className="apple-sub" style={{ marginBottom: '15px' }}>
                Once in your visual center, the nodes settle gently around your synapses—the bridges where your brain cells communicate with each other.
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Powered entirely by your body's natural sugar, they map your thoughts without changing who you are, translating your mental commands into digital instructions in under 45 minutes.
              </p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                <div>⏱️ SETUP: ~45 Min</div>
                <div>🔋 FUEL: Natural Glucose</div>
                <div>🧠 STATUS: Safe & Secure</div>
              </div>
            </div>

            {/* Story Card 5 */}
            {/* Story Card 5 */}
            <div id="eclipse" className="bubbly-panel" style={{ minHeight: '330px', padding: '20px 24px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px' }}>
                STAGE 05 // SYSTEM ACTIVE
              </span>
              <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                Hello, Spatial Computing.
              </h2>
              <p className="apple-sub" style={{ marginBottom: '16px', fontSize: '0.88rem' }}>
                The link is complete. The BCI OS projects virtual windows directly into your line of sight, visible only to you. Scroll horizontally below to choose scenarios and see how you can anchor widgets to the physical world.
              </p>
              
              {/* Horizontal scroll selector deck */}
              <div 
                className="hide-scrollbar" 
                style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  overflowX: 'auto', 
                  paddingBottom: '5px',
                  scrollSnapType: 'x mandatory',
                  width: '100%'
                }}
              >
                {scenarios.map(sc => (
                  <div 
                    key={sc.id} 
                    onClick={() => setActiveScenario(sc.id)}
                    style={{
                      flex: '0 0 190px',
                      scrollSnapAlign: 'start',
                      background: activeScenario === sc.id ? 'rgba(var(--color-accent-rgb), 0.12)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${activeScenario === sc.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '6px' }}>{sc.icon}</span>
                    <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.72rem', color: '#ffffff', margin: '0 0 4px 0' }}>{sc.title}</h4>
                    <p style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }}>{sc.description}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* RIGHT: Telemetry Dashboard & Layered Composites */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%', minHeight: 0 }}>
            
            {/* Viewport Box */}
            <div 
              className="bubbly-panel" 
              style={{ 
                flex: 1, 
                padding: '12px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                minHeight: '380px',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(6, 9, 20, 0.75)'
              }}
            >
              
              <span className="net-label" style={{ display: 'block', fontSize: '0.6rem', color: 'var(--color-accent)', marginBottom: '5px' }}>
                // LAYERED VISUAL COMPOSITE
              </span>

              {/* Viewport Frame */}
              <div 
                ref={viewportRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  flex: 1, 
                  background: 'rgba(2, 3, 6, 0.98)', 
                  border: '1px solid rgba(var(--color-accent-rgb), 0.2)', 
                  borderRadius: '12px', 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: activeTab === 'eclipse' ? 'none' : 'default'
                }}
              >
                
                {/* Composite: Ingestion (Phase 1) */}
                {activeTab === 'overview' && (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <img 
                      src="/assets/images/bci/bci_ingestion.png" 
                      alt="BCI Ingestion Background" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    />
                    <img 
                      src="/assets/svgs/bci_payload.svg" 
                      alt="BCI Ingestion SVG Overlay" 
                      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', objectFit: 'contain', zIndex: 2 }}
                    />
                  </div>
                )}

                {/* Composite: Uptake (Phase 2) */}
                {activeTab === 'payload' && (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <img 
                      src="/assets/images/bci/bci_uptake.png" 
                      alt="BCI Uptake Background" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    />
                    <img 
                      src="/assets/svgs/bci_overview.svg" 
                      alt="BCI Uptake SVG Overlay" 
                      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', objectFit: 'contain', zIndex: 2 }}
                    />
                  </div>
                )}

                {/* Composite: Adaptation (Phase 3) */}
                {activeTab === 'adaptation' && (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <img 
                      src="/assets/images/bci/bci_adaptation.png" 
                      alt="BCI Adaptation Background" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
                    />
                    {/* Inline biological/thermal grid overlay */}
                    <svg 
                      width="100%" 
                      height="100%" 
                      viewBox="0 0 100 100" 
                      preserveAspectRatio="none" 
                      style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}
                    >
                      <rect x="8" y="8" width="84" height="84" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1,2" opacity="0.6" />
                      <line x1="8" y1="50" x2="92" y2="50" stroke="#ff4400" strokeWidth="0.5" strokeDasharray="1,1" opacity="0.8" />
                      <path d="M 12 12 L 20 12 M 12 12 L 12 20" fill="none" stroke="#ffb300" strokeWidth="0.6"/>
                      <path d="M 88 12 L 80 12 M 88 12 L 88 20" fill="none" stroke="#ffb300" strokeWidth="0.6"/>
                      <path d="M 12 88 L 20 88 M 12 88 L 12 80" fill="none" stroke="#ffb300" strokeWidth="0.6"/>
                      <path d="M 88 88 L 80 88 M 88 88 L 88 80" fill="none" stroke="#ffb300" strokeWidth="0.6"/>
                      
                      <text x="14" y="20" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● METABOLIC HEAT ACTIVE [-55C NOMINAL]</text>
                      <text x="14" y="25" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● RADIATION DENSE DEFENSE: 99.4%</text>
                      <text x="14" y="30" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● O2 RESPIRED SATURATION: 98.6%</text>
                      <text x="14" y="35" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● MUSCLE-BONE GRAVITY GAIN: 0.38G</text>
                    </svg>
                  </div>
                )}

                {/* Composite: Assembly (Phase 4) */}
                {activeTab === 'assembly' && (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <img 
                      src="/assets/images/bci/bci_assembly.png" 
                      alt="BCI Assembly Background" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    />
                    <img 
                      src="/assets/svgs/bci_assembly.svg" 
                      alt="BCI Assembly SVG Overlay" 
                      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', objectFit: 'contain', zIndex: 2 }}
                    />
                  </div>
                )}

                {/* Simulated XR BCI HUD viewport (Phase 5) */}
                {activeTab === 'eclipse' && (
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      position: 'relative', 
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '12px'
                    }}
                  >
                    
                    {/* Simulated Scenario Environment Background with Parallax */}
                    <div 
                      style={{ 
                        position: 'absolute',
                        top: '-15px',
                        left: '-15px',
                        right: '-15px',
                        bottom: '-15px',
                        zIndex: 1,
                        background: 'radial-gradient(circle at 50% 50%, rgba(4, 6, 12, 0.4) 0%, rgba(4, 6, 12, 1) 90%)',
                        transform: `translate3d(${parallax.x * -0.5}px, ${parallax.y * -0.5}px, 0)`,
                        transition: 'transform 0.1s ease-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {/* High-fidelity Dome passthrough background */}
                      <img 
                        src="/assets/images/backgrounds/atmosphere-dome.png" 
                        alt="Martian Dome Interior" 
                        style={{ width: '110%', height: '110%', objectFit: 'cover', opacity: 0.45 }}
                      />

                      {/* Vector lines of the environment */}
                      <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.12, pointerEvents: 'none', zIndex: 2 }}>
                        {activeScenario === 'productivity' && (
                          <g stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none">
                            <line x1="0" y1="220" x2="400" y2="220" />
                            <line x1="80" y1="220" x2="80" y2="0" />
                            <line x1="320" y1="220" x2="320" y2="0" />
                          </g>
                        )}
                        {activeScenario === 'entertainment' && (
                          <g stroke="var(--color-accent)" strokeWidth="0.6" fill="none">
                            <circle cx="200" cy="150" r="130" opacity="0.3" />
                            <circle cx="200" cy="150" r="90" opacity="0.5" />
                          </g>
                        )}
                        {activeScenario === 'traverse' && (
                          <g stroke="rgba(255,179,0,0.5)" strokeWidth="0.8" fill="none">
                            <path d="M 0,260 Q 200,180 400,260" />
                            <path d="M 0,220 Q 200,130 400,220" />
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* Martian Hazard warning grid overlay */}
                    {hudFilterActive && (
                      <div 
                        style={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 2,
                          border: '2px solid rgba(255, 120, 0, 0.4)',
                          background: 'repeating-linear-gradient(0deg, rgba(255, 100, 0, 0.02) 0px, rgba(255, 100, 0, 0.02) 2px, transparent 2px, transparent 8px)',
                          animation: 'hazard-pulse 3s infinite ease-in-out',
                          pointerEvents: 'none'
                        }}
                      >
                        <div 
                          style={{
                            width: '100%',
                            height: '20px',
                            background: 'linear-gradient(rgba(255, 120, 0, 0), rgba(255, 120, 0, 0.25), rgba(255, 120, 0, 0))',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            animation: 'scanline-sweep 2.5s infinite linear'
                          }}
                        ></div>
                        <div 
                          style={{
                            position: 'absolute',
                            top: '40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(255, 70, 0, 0.85)',
                            border: '1px solid #ff7700',
                            borderRadius: '4px',
                            padding: '3px 10px',
                            color: '#ffffff',
                            fontFamily: 'var(--font-tech)',
                            fontSize: '0.55rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            letterSpacing: '1px',
                            animation: 'alert-flash 1s infinite ease-in-out'
                          }}
                        >
                          ⚠️ DUST STORM WARNING ON-GRID INTERFACE ENGAGED
                        </div>
                      </div>
                    )}

                    {/* Spatial widgets based on scenario */}
                    <div 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        zIndex: 3,
                        transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0)`,
                        transition: 'transform 0.1s ease-out',
                        pointerEvents: 'none'
                      }}
                    >
                      {/* Productivity Mode elements */}
                      {activeScenario === 'productivity' && (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                          
                          {/* Snapped wall clock widget */}
                          <div 
                            className="bubbly-panel"
                            style={{ 
                              position: 'absolute', 
                              left: '65%', 
                              top: '20%', 
                              padding: '10px 14px', 
                              background: 'rgba(6,9,20,0.85)',
                              border: '1.5px solid var(--color-accent)',
                              boxShadow: '0 0 15px var(--glass-glow)',
                              borderRadius: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: '100px',
                              animation: 'snap-scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
                              pointerEvents: 'auto'
                            }}
                          >
                            <span style={{ fontSize: '0.5rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)' }}>
                              WALL ANCHOR
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 'bold', fontFamily: 'monospace', marginTop: '3px', animation: 'text-shadow-glow 2s infinite' }}>
                              {timeString || '10:42:00'}
                            </span>
                          </div>

                          {/* Floating Calendar task widget */}
                          <div 
                            className="bubbly-panel"
                            style={{ 
                              position: 'absolute', 
                              left: '12%', 
                              top: '35%', 
                              padding: '10px', 
                              background: 'rgba(6,9,20,0.8)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '12px',
                              width: '130px',
                              fontSize: '0.55rem',
                              animation: 'snap-scale 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
                              pointerEvents: 'auto'
                            }}
                          >
                            <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontFamily: 'var(--font-tech)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '3px', marginBottom: '5px' }}>
                              SOL SCHEDULE
                            </div>
                            <div style={{ color: '#ffffff' }}>🗓️ SOL 14: Lab Sync</div>
                            <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>⚙️ Syncing OS anchors</div>
                          </div>
                        </div>
                      )}

                      {/* Entertainment Mode elements */}
                      {activeScenario === 'entertainment' && (
                        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          
                          {/* Floating Media Screen */}
                          <div 
                            className="bubbly-panel"
                            style={{ 
                              width: '240px', 
                              height: '130px', 
                              background: 'rgba(6,9,20,0.9)', 
                              border: '1.5px solid var(--color-accent)',
                              boxShadow: '0 0 20px var(--glass-glow)',
                              borderRadius: '14px',
                              padding: '10px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              animation: 'snap-scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
                              pointerEvents: 'auto'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)' }}>
                              <span>📽️ COLONY CORE FEED</span>
                              <span style={{ color: isPlayingMedia ? '#00ff88' : '#ff4400' }}>{isPlayingMedia ? 'STREAMING' : 'PAUSED'}</span>
                            </div>

                            {/* Simulated Video Waves */}
                            <div style={{ flex: 1, display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
                              {[...Array(10)].map((_, i) => (
                                <div 
                                  key={i} 
                                  style={{
                                    width: '6px',
                                    height: isPlayingMedia ? '20px' : '5px',
                                    background: 'var(--color-accent)',
                                    borderRadius: '3px',
                                    animation: isPlayingMedia ? `wave-pulse ${0.6 + i * 0.08}s infinite ease-in-out` : 'none',
                                    transition: 'all 0.3s ease'
                                  }}
                                ></div>
                              ))}
                            </div>

                            {/* Widescreen controls */}
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.55rem' }}>
                              <button 
                                onClick={() => setIsPlayingMedia(!isPlayingMedia)} 
                                style={{ border: 'none', background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderRadius: '4px', padding: '2px 8px', cursor: 'none' }}
                              >
                                {isPlayingMedia ? 'PAUSE' : 'PLAY'}
                              </button>
                              <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: isPlayingMedia ? '65%' : '25%', height: '100%', background: 'var(--color-accent)', transition: 'width 2s linear' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Traverse Active Mode elements */}
                      {activeScenario === 'traverse' && (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                          
                          {/* Wristwatch anchor layout */}
                          <div 
                            className="bubbly-panel"
                            style={{ 
                              position: 'absolute', 
                              left: '10%', 
                              bottom: '12%', 
                              padding: '8px 12px', 
                              background: 'rgba(6,9,20,0.92)',
                              border: '1.5px solid var(--color-accent)',
                              boxShadow: '0 0 15px var(--glass-glow)',
                              borderRadius: '12px',
                              width: '125px',
                              animation: 'snap-scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
                              pointerEvents: 'auto'
                            }}
                          >
                            <span style={{ fontSize: '0.48rem', color: 'var(--text-secondary)', display: 'block', fontFamily: 'var(--font-tech)' }}>
                              WRIST WATCH PROJECTION
                            </span>
                            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ffffff', margin: '2px 0 4px 0', fontFamily: 'monospace' }}>
                              💓 74 BPM
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.5rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                              <div>O₂ FLOW: 14.1%</div>
                              <div>SYS LATENCY: 0.1ms</div>
                            </div>
                          </div>

                          {/* Navigation path line in passthrough */}
                          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                            <path 
                              d="M 300,140 Q 220,180 150,220" 
                              fill="none" 
                              stroke="var(--color-accent)" 
                              strokeWidth="2" 
                              strokeDasharray="4,4" 
                              style={{ animation: 'scanline-sweep 3s infinite linear' }}
                            />
                            <circle cx="150" cy="220" r="5" fill="var(--color-accent)" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Interactive Waypoints */}
                    <div 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        zIndex: 3,
                        transform: `translate3d(${parallax.x * 0.4}px, ${parallax.y * 0.4}px, 0)`,
                        transition: 'transform 0.1s ease-out',
                        pointerEvents: 'none'
                      }}
                    >
                      {waypoints.map(point => (
                        <div 
                          key={point.id} 
                          style={{ 
                            position: 'absolute', 
                            left: point.x, 
                            top: point.y, 
                            pointerEvents: 'auto',
                            transform: 'translate(-50%, -50%)'
                          }}
                          onMouseEnter={() => setHoveredWaypoint(point.id)}
                          onMouseLeave={() => setHoveredWaypoint(null)}
                        >
                          <div 
                            style={{ 
                              width: '8px', 
                              height: '8px', 
                              background: hoveredWaypoint === point.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)', 
                              border: '1px solid #ffffff',
                              borderRadius: '50%',
                              cursor: 'crosshair',
                              boxShadow: '0 0 8px var(--color-accent)',
                              transition: 'all 0.2s ease',
                              position: 'relative'
                            }}
                          >
                            {hoveredWaypoint === point.id && (
                              <div className="gaze-ring-overlay" style={{ width: '26px', height: '26px', left: '-10px', top: '-10px' }}></div>
                            )}
                          </div>

                          {hoveredWaypoint === point.id && (
                            <div 
                              style={{ 
                                position: 'absolute', 
                                left: '14px', 
                                top: '-20px', 
                                background: 'rgba(6, 9, 20, 0.95)', 
                                border: '1px solid var(--color-accent)', 
                                borderRadius: '6px', 
                                padding: '6px 10px', 
                                width: '180px', 
                                zIndex: 10,
                                backdropFilter: 'blur(8px)',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                                pointerEvents: 'none',
                                animation: 'slide-in-fast 0.2s ease-out'
                              }}
                            >
                              <div style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#ffffff', fontFamily: 'var(--font-tech)' }}>
                                {point.name}
                              </div>
                              <div style={{ fontSize: '0.5rem', color: 'var(--text-secondary)', fontFamily: 'monospace', marginTop: '3px', lineHeight: '1.2' }}>
                                {point.desc}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* HUD CONTROL PANEL */}
                    <div 
                      style={{ 
                        zIndex: 4, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        transform: `translate3d(${parallax.x * 0.8}px, ${parallax.y * 0.8}px, 0)`,
                        transition: 'transform 0.1s ease-out'
                      }}
                    >
                      {/* Left biometrics specs board */}
                      <div 
                        className="bubbly-panel" 
                        style={{ 
                          padding: '6px 10px', 
                          background: 'rgba(6, 9, 20, 0.65)', 
                          backdropFilter: 'blur(10px)',
                          borderRadius: '8px', 
                          border: '1px solid rgba(255,255,255,0.06)',
                          fontSize: '0.55rem', 
                          fontFamily: 'monospace' 
                        }}
                      >
                        <div style={{ color: '#00ff88' }}>● LINK ACTIVE [99.8%]</div>
                        <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>🔋 GLUCOSE DRAW: 0.42mg/m</div>
                      </div>

                      {/* Right action toggles */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <button 
                          onClick={() => setHudFilterActive(!hudFilterActive)}
                          className={`hud-btn ${hudFilterActive ? 'active-tab-override' : ''}`}
                          style={{ 
                            fontSize: '0.55rem', 
                            padding: '3px 8px', 
                            borderRadius: '4px',
                            borderColor: hudFilterActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)'
                          }}
                        >
                          {hudFilterActive ? '[ STOP WARNING ]' : '[ ENGAGE WARN GRID ]'}
                        </button>
                        <button 
                          onClick={() => setThoughtSyncActive(!thoughtSyncActive)}
                          className={`hud-btn ${thoughtSyncActive ? 'active-tab-override' : ''}`}
                          style={{ 
                            fontSize: '0.55rem', 
                            padding: '3px 8px', 
                            borderRadius: '4px',
                            borderColor: thoughtSyncActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)'
                          }}
                        >
                          {thoughtSyncActive ? '[ TERMINAL STOP ]' : '[ THINK COMMANDS ]'}
                        </button>
                      </div>
                    </div>

                    {/* Middle thought terminal logs */}
                    <div 
                      style={{ 
                        zIndex: 4, 
                        flex: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        position: 'relative' 
                      }}
                    >
                      {thoughtSyncActive ? (
                        <div 
                          className="bubbly-panel" 
                          style={{ 
                            width: '260px', 
                            maxHeight: '100px', 
                            padding: '10px', 
                            background: 'rgba(6, 9, 20, 0.85)', 
                            border: '1px solid var(--color-accent)', 
                            borderRadius: '10px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                            transform: `translate3d(${parallax.x * 1.1}px, ${parallax.y * 1.1}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '3px', marginBottom: '5px', fontSize: '0.5rem', fontFamily: 'var(--font-tech)', color: 'var(--color-accent)' }}>
                            <span>🧠 CORTICAL SYNAPSE STREAM</span>
                            <span>LIVE SYNC</span>
                          </div>
                          <pre 
                            style={{ 
                              margin: 0, 
                              fontSize: '0.5rem', 
                              fontFamily: 'monospace', 
                              color: 'var(--text-primary)', 
                              lineHeight: '1.3', 
                              whiteSpace: 'pre-wrap', 
                              textAlign: 'left'
                            }}
                          >
                            {typedText}
                            <span style={{ animation: 'cursor-blink 1s infinite', color: 'var(--color-accent)' }}>_</span>
                          </pre>
                        </div>
                      ) : (
                        <div 
                          style={{ 
                            color: 'rgba(255,255,255,0.15)', 
                            fontFamily: 'var(--font-tech)', 
                            fontSize: '0.58rem', 
                            textAlign: 'center',
                            pointerEvents: 'none',
                            transform: `translate3d(${parallax.x * 0.4}px, ${parallax.y * 0.4}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                          }}
                        >
                          [ THOUGHT COMMAND FEED READY ]
                        </div>
                      )}
                    </div>

                    {/* BOTTOM: App Dock simulating gaze launcher */}
                    <div 
                      style={{ 
                        zIndex: 4, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: '6px',
                        transform: `translate3d(${parallax.x * 1.2}px, ${parallax.y * 1.2}px, 0)`,
                        transition: 'transform 0.1s ease-out'
                      }}
                    >
                      <div 
                        style={{ 
                          display: 'flex', 
                          gap: '8px', 
                          background: 'rgba(6, 9, 20, 0.72)', 
                          border: '1px solid rgba(255,255,255,0.08)', 
                          padding: '6px 12px', 
                          borderRadius: '20px', 
                          backdropFilter: 'blur(12px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
                        }}
                      >
                        {appList.map(app => (
                          <div 
                            key={app.id} 
                            style={{ position: 'relative' }}
                            onMouseEnter={() => setHoveredApp(app.id)}
                            onMouseLeave={() => setHoveredApp(null)}
                            onClick={() => setSelectedApp(selectedApp === app.id ? null : app.id)}
                          >
                            <button 
                              style={{ 
                                width: '28px', 
                                height: '28px', 
                                borderRadius: '50%', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                background: selectedApp === app.id ? 'rgba(var(--color-accent-rgb), 0.25)' : hoveredApp === app.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                                fontSize: '0.9rem',
                                cursor: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.25s ease'
                              }}
                            >
                              {app.icon}
                            </button>

                            {hoveredApp === app.id && (
                              <div 
                                className="gaze-ring-overlay" 
                                style={{ 
                                  width: '40px', 
                                  height: '40px', 
                                  left: '-7px', 
                                  top: '-7px' 
                                }}
                              ></div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Info label display */}
                      <div style={{ height: '10px', display: 'flex', justifyContent: 'center' }}>
                        {hoveredApp && (
                          <span style={{ fontSize: '0.5rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', letterSpacing: '0.5px' }}>
                            GAZE FOCUS: {appList.find(a => a.id === hoveredApp)?.label}
                          </span>
                        )}
                        {!hoveredApp && selectedApp && (
                          <span style={{ fontSize: '0.5rem', color: '#00ff88', fontFamily: 'monospace' }}>
                            [ACTIVE APP]: {appList.find(a => a.id === selectedApp)?.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Simulated Eye-Gaze Pointer Dot */}
                    <div 
                      style={{ 
                        position: 'absolute', 
                        left: `${cursorPos.x}px`, 
                        top: `${cursorPos.y}px`, 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: 'rgba(255, 179, 0, 0.8)', 
                        boxShadow: '0 0 6px #ffb300', 
                        zIndex: 100, 
                        pointerEvents: 'none',
                        transform: 'translate(-50%, -50%)',
                        transition: 'width 0.1s, height 0.1s'
                      }}
                    ></div>

                  </div>
                )}

                {/* Status indicator bottom left overlay */}
                {activeTab !== 'eclipse' && (
                  <div 
                    style={{ 
                      position: 'absolute', 
                      bottom: '10px', 
                      left: '10px', 
                      right: '10px', 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontFamily: 'monospace',
                      fontSize: '0.55rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <span>SYSTEM CALIBRATION</span>
                    <span style={{ color: activeTab === 'assembly' ? '#ffb300' : activeTab === 'payload' ? '#ff4400' : '#00ff88' }}>
                      {activeTab === 'overview' ? 'INGESTION STAGE' : activeTab === 'payload' ? 'BBB TRANSIT' : 'ALIGNMENT SEQUENCE'}
                    </span>
                  </div>
                )}

              </div>

              {/* Status Diagnostic biophysics specs */}
              <div style={{ marginTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.6rem', fontFamily: 'monospace' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>UPLINK STATE:</span>
                  <span style={{ color: stats.systemState === 'ACTIVE' ? '#00ff88' : 'var(--color-accent)', fontWeight: 'bold' }}>
                    {stats.systemState}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>CAPSULE INTEGRITY:</span>
                  <span style={{ color: '#ffffff' }}>{stats.capsuleIntegrity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>BBB PENETRATION:</span>
                  <span style={{ color: '#ffffff' }}>{stats.bbbCrossing}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>SYNAPTIC MAPPING:</span>
                  <span style={{ color: stats.synapticMapping === '100% SUCCESS' ? '#00ff88' : '#ffffff' }}>
                    {stats.synapticMapping}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>BIOMETRIC TEMP [CORE/SKIN]:</span>
                  <span style={{ color: '#ffffff' }}>{stats.temp} / {stats.skinTemp}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>RAD PROTECTION / BLOOD O₂ SAT:</span>
                  <span style={{ color: '#00ff88' }}>{stats.radiation} / {stats.oxygenSat}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>GRAVITY ADAPT / NEURAL LATENCY:</span>
                  <span style={{ color: '#00ff88' }}>{stats.gravity} / {stats.latency}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
