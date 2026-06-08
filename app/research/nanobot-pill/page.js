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
  const [cursorPos, setCursorPos] = useState({ x: 150, y: 110 });

  const scrollRef = useRef(null);
  const viewportRef = useRef(null);

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
    const sections = ['overview', 'payload', 'assembly', 'eclipse'];
    let currentActive = 'overview';

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Check if element is scrolling past the midpoint of the container viewport
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
    
    // Normalize coordinates between -1 and 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    // Position simulated gaze cursor
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    setParallax({
      x: x * 10, // Max offset 10px
      y: y * 10
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
      { text: '> [SYNAPSE LINK] INTENT RETRIEVED: /query_colony_feed', delay: 1000 },
      { text: '> [BCI OS] ACQUIRING MESH MATRIX STATIONS...', delay: 800 },
      { text: '> [DOWNLINK] MATRIX SECTOR 02 SYNCED [99.2%]', delay: 1200 },
      { text: '> [SYNAPSE LINK] INTENT RETRIEVED: /check_life_support', delay: 1400 },
      { text: '> [BCI OS] O2 OUTFLOW STATUS: 100% NOMINAL', delay: 1000 },
      { text: '> [BCI OS] SOLAR GLUCOSE CONSUMPTION: 0.42mg/min', delay: 1500 },
      { text: '> [SYNAPSE LINK] INTENT RETRIEVED: /activate_waypoint_marker', delay: 1200 },
      { text: '> [BCI OS] SCANNING LOCAL SECTORS...', delay: 600 }
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
          timer = setTimeout(runTypewriter, 30);
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
        timer = setTimeout(runTypewriter, 200);
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
          systemState: 'UPLINK_SYNCING'
        };
      case 'assembly':
        return {
          phase: 'PHASE 03 // CORTICAL MAPPING',
          status: 'ANCHORING IN SYNAPTIC CLEFTS',
          capsuleIntegrity: '0%',
          bbbCrossing: '100% SUCCESS',
          synapticMapping: '64.5%',
          latency: '24 ms',
          glucose: '0.85 mg/min',
          temp: '37.3°C',
          systemState: 'INTERFACING'
        };
      case 'eclipse':
        return {
          phase: 'PHASE 04 // RETINA BCI OS',
          status: 'SYSTEM ONLINE // HUD ACTIVE',
          capsuleIntegrity: '0%',
          bbbCrossing: '100% SUCCESS',
          synapticMapping: '100% SUCCESS',
          latency: '0.8 ms',
          glucose: '0.42 mg/min',
          temp: '37.0°C',
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
    { id: 'assembly', label: '3. Assembly' },
    { id: 'eclipse', label: '4. Retina OS' }
  ];

  const appList = [
    { id: 'map', label: 'Colony Map', icon: '🗺️' },
    { id: 'comms', label: 'Quantum Net', icon: '📡' },
    { id: 'diag', label: 'Synaptic Health', icon: '🧠' },
    { id: 'logs', label: 'OS Logs', icon: '📜' }
  ];

  const waypoints = [
    { id: 'dome', name: 'RESEARCH LAB DOME', x: '55%', y: '35%', desc: 'Ares Tech Hub // Dist: 140m // Temp: 21.0°C' },
    { id: 'relay', name: 'QUANTUM COMMS TOWER', x: '82%', y: '50%', desc: 'Matrix Relay // Latency: 0.12ms // Signal: 100%' },
    { id: 'outpost', name: 'OUTPOST HUB SECTOR 08', x: '22%', y: '65%', desc: 'Colony Boundary // Status: RESTRICTED' }
  ];

  return (
    <div className="citizen-card-shell nanobot-pill-shell">
      {/* Local keyframes and HUD overrides */}
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
        .gaze-ring-overlay {
          pointer-events: none;
          position: absolute;
          border: 1.5px solid var(--color-accent);
          border-radius: 50%;
          animation: pulse-ring 1.8s infinite linear;
        }
      `}} />

      {/* Immersive Sweeper Overlay */}
      <div className="walking-motion-overlay nanobot-pill-walking-overlay"></div>

      <div 
        className={`walking-content-container ${transitState} nanobot-pill-content-container`} 
        style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '15px', maxWidth: '1050px', margin: '0 auto', minHeight: 0, height: '100%' }}
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
            ARES LABS // PROJECT NO-DEVICE
          </span>
        </div>

        {/* Tab navigation - Quick Scroll Jumps */}
        <div className="bubbly-panel" style={{ padding: '10px 15px' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '15px', flex: 1, minHeight: 0, height: '100%' }} className="research-grid-deck">
          
          {/* LEFT: Scrollable story container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="custom-scroll"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px', 
              height: '100%', 
              overflowY: 'auto' 
            }}
          >
            
            {/* Story Card 1 */}
            <div id="overview" className="bubbly-panel" style={{ minHeight: '340px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="net-label" style={{ fontSize: '0.65rem', border: '1px solid var(--color-accent)', padding: '2px 8px', borderRadius: '4px' }}>
                  PHASE 01
                </span>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#ffffff', margin: 0 }}>
                  Oral Ingestion & Shell Dissolution
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '12px' }}>
                The BCI Pill is an organic, plant-based capsule that feels exactly like a standard daily multivitamin. Made from customized biocompatible cellulose, it is swallowed with a sip of water at the research station.
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Within 4 minutes of entering the stomach, acid catalysts trigger the structural breakdown of the outer coating. The capsule dissolves cleanly, releasing a localized, bio-magnetic suspension fluid containing exactly 12.4 million micro-node builders directly into the gastric lining capillaries.
              </p>
              
              <div style={{ marginTop: '15px', display: 'flex', gap: '15px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                <div>⏱️ TIME: ~4 Minutes</div>
                <div>🧪 SHELL: Plant Cellulose</div>
                <div>🔋 POWER: Latent Gastric Currents</div>
              </div>
            </div>

            {/* Story Card 2 */}
            <div id="payload" className="bubbly-panel" style={{ minHeight: '340px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="net-label" style={{ fontSize: '0.65rem', border: '1px solid var(--color-accent)', padding: '2px 8px', borderRadius: '4px' }}>
                  PHASE 02
                </span>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#ffffff', margin: 0 }}>
                  Bloodstream Uptake & BBB Crossing
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '12px' }}>
                Once inside the bloodstream, the microscopic nodes do not float aimlessly. Embedded with chemical markers matching the specific blood-brain barrier receptor keys, they navigate safely towards the cerebral vascular tree.
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Harnessing the body's natural cardiovascular velocity, they anchor at the tight junctions of brain capillaries. Using localized ionic gradients, the nodes slide smoothly through the blood-brain barrier (BBB) over a 20-minute cycle, completely bypassing mechanical tissue intrusion.
              </p>
              
              <div style={{ marginTop: '15px', display: 'flex', gap: '15px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                <div>⏱️ TIME: ~20 Minutes</div>
                <div>📍 TARGET: Cerebral Vascular Bed</div>
                <div>🩹 INTRUSION: 0.0% (Cellular Slip)</div>
              </div>
            </div>

            {/* Story Card 3 */}
            <div id="assembly" className="bubbly-panel" style={{ minHeight: '340px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="net-label" style={{ fontSize: '0.65rem', border: '1px solid var(--color-accent)', padding: '2px 8px', borderRadius: '4px' }}>
                  PHASE 03
                </span>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#ffffff', margin: 0 }}>
                  Synaptic Cleft Alignment & Mapping
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '12px' }}>
                Inside the brain parenchyma, the micro-nodes distribute themselves into synaptic junctions. They attach to astrocytes and dendrites, forming a network grid over the occipital, parietal, and frontal lobes.
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Powered entirely by ambient cellular glucose, they listen to neural action potentials. They map your synapses without altering or interrupting biological thought pathways. The nodes form a carbon-graphene interface that translates electrical signals into high-frequency binary data packages.
              </p>
              
              <div style={{ marginTop: '15px', display: 'flex', gap: '15px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                <div>⏱️ TIME: ~45 Minutes</div>
                <div>🔋 FUEL: Blood Glucose (0.8mg/m)</div>
                <div>⚡ CONNECTIONS: 12.4M Nodes</div>
              </div>
            </div>

            {/* Story Card 4 */}
            <div id="eclipse" className="bubbly-panel" style={{ minHeight: '340px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="net-label" style={{ fontSize: '0.65rem', border: '1px solid var(--color-accent)', padding: '2px 8px', borderRadius: '4px' }}>
                  PHASE 04
                </span>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#ffffff', margin: 0 }}>
                  Retina BCI OS Active
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '12px' }}>
                The alignment sequence is complete. A localized bio-magnetic frequency creates a secure link between the node mesh and your visual cortex, booting the "Retina BCI OS."
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                You now possess a completely internal, hardware-free spatial computing system. Digital elements render dynamically in your visual field, aligning to real physical objects. Tap, control, and communicate through mental vocalizations—completely invisible to anyone else.
              </p>
              
              <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--color-accent)' }}>
                <div>👁️ INTERFACE: Visual Cortex Projection</div>
                <div>🧠 CONTROL: Sub-Vocal Thought Sync</div>
              </div>
            </div>

          </div>

          {/* RIGHT: Telemetry Dashboard & Active XR HUD */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%', minHeight: 0 }}>
            
            {/* Immersive Viewport / Static Telemetry Screen */}
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
                overflow: 'hidden'
              }}
            >
              
              <span className="net-label" style={{ display: 'block', fontSize: '0.6rem', color: 'var(--color-accent)', marginBottom: '5px' }}>
                // CORTICAL SCHEMATIC VIEWPORT
              </span>

              {/* Conditional Rendering: Phases 1-3 Show SVGs; Phase 4 Shows interactive HUD */}
              <div 
                ref={viewportRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  flex: 1, 
                  background: 'rgba(2, 3, 6, 0.98)', 
                  border: '1px solid rgba(var(--color-accent-rgb), 0.25)', 
                  borderRadius: '12px', 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: activeTab === 'eclipse' ? 'none' : 'default'
                }}
              >
                
                {/* Visualizer: Phases 1-3 */}
                {activeTab !== 'eclipse' && (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {activeTab === 'overview' && (
                      <img 
                        src="/assets/svgs/bci_payload.svg" 
                        alt="BCI Capsule Payload" 
                        style={{ width: '85%', height: '85%', objectFit: 'contain', transition: 'all 0.5s ease' }} 
                      />
                    )}
                    {activeTab === 'payload' && (
                      <img 
                        src="/assets/svgs/bci_overview.svg" 
                        alt="BCI Overview Schematic" 
                        style={{ width: '85%', height: '85%', objectFit: 'contain', transition: 'all 0.5s ease' }} 
                      />
                    )}
                    {activeTab === 'assembly' && (
                      <img 
                        src="/assets/svgs/bci_assembly.svg" 
                        alt="BCI Synaptic Assembly" 
                        style={{ width: '85%', height: '85%', objectFit: 'contain', transition: 'all 0.5s ease' }} 
                      />
                    )}
                    
                    {/* Diagnostic Matrix lines overlay */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1px dashed rgba(255, 179, 0, 0.05)', pointerEvents: 'none' }}></div>
                  </div>
                )}

                {/* Simulated XR BCI HUD viewport (Phase 4) */}
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
                    
                    {/* Simulated Passthrough environment with Parallax */}
                    <div 
                      style={{ 
                        position: 'absolute',
                        top: '-15px',
                        left: '-15px',
                        right: '-15px',
                        bottom: '-15px',
                        zIndex: 1,
                        background: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.4) 0%, rgba(4, 6, 12, 1) 90%)',
                        transform: `translate3d(${parallax.x * -0.6}px, ${parallax.y * -0.6}px, 0)`,
                        transition: 'transform 0.1s ease-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {/* Stylized Vector Grid of Ares City dome interior */}
                      <svg width="110%" height="110%" viewBox="0 0 400 300" style={{ opacity: 0.15, pointerEvents: 'none' }}>
                        <defs>
                          <radialGradient id="netGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <rect x="0" y="0" width="400" height="300" fill="url(#netGlow)" />
                        
                        {/* Horizon Mountains */}
                        <path d="M 0,260 L 50,220 L 120,250 L 180,210 L 250,260 L 310,230 L 400,270 L 400,300 L 0,300 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        
                        {/* Curved Dome Ribs */}
                        <path d="M 0,300 Q 200,-50 400,300" fill="none" stroke="rgba(255,179,0,0.12)" strokeWidth="0.8" />
                        <path d="M 50,300 Q 200,20 350,300" fill="none" stroke="rgba(255,179,0,0.08)" strokeWidth="0.8" />
                        <path d="M -50,300 Q 200,-120 450,300" fill="none" stroke="rgba(255,179,0,0.05)" strokeWidth="0.8" />
                        
                        {/* Ground Grid perspective lines */}
                        <line x1="200" y1="260" x2="0" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                        <line x1="200" y1="260" x2="80" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                        <line x1="200" y1="260" x2="160" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                        <line x1="200" y1="260" x2="240" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                        <line x1="200" y1="260" x2="320" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                        <line x1="200" y1="260" x2="400" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
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
                        {/* Scanline sweeping down */}
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
                        
                        {/* Alert banner */}
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
                          ⚠️ RADIATION OUTPOST WARNING GRID ENGAGED // STORM PROTOCOL ACTIVE
                        </div>
                      </div>
                    )}

                    {/* Spatial Scanning Waypoints with Parallax */}
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
                          {/* Pin dot */}
                          <div 
                            style={{ 
                              width: '10px', 
                              height: '10px', 
                              background: hoveredWaypoint === point.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)', 
                              border: '1.5px solid #ffffff',
                              borderRadius: '50%',
                              cursor: 'crosshair',
                              boxShadow: '0 0 10px var(--color-accent)',
                              transition: 'all 0.2s ease',
                              position: 'relative'
                            }}
                          >
                            {/* Hover expanding ring */}
                            {hoveredWaypoint === point.id && (
                              <div className="gaze-ring-overlay" style={{ width: '30px', height: '30px', left: '-11.5px', top: '-11.5px' }}></div>
                            )}
                          </div>

                          {/* Pin info panel callout */}
                          {hoveredWaypoint === point.id && (
                            <div 
                              style={{ 
                                position: 'absolute', 
                                left: '16px', 
                                top: '-20px', 
                                background: 'rgba(6, 9, 20, 0.95)', 
                                border: '1px solid var(--color-accent)', 
                                borderRadius: '6px', 
                                padding: '6px 10px', 
                                width: '190px', 
                                zIndex: 10,
                                backdropFilter: 'blur(8px)',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.5), 0 0 10px rgba(var(--color-accent-rgb), 0.2)',
                                pointerEvents: 'none',
                                animation: 'slide-in-fast 0.2s ease-out'
                              }}
                            >
                              <div style={{ fontSize: '0.62rem', fontWeight: 'bold', color: '#ffffff', fontFamily: 'var(--font-tech)' }}>
                                {point.name}
                              </div>
                              <div style={{ fontSize: '0.52rem', color: 'var(--text-secondary)', fontFamily: 'monospace', marginTop: '3px', lineHeight: '1.2' }}>
                                {point.desc}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* HUD CONTROL PANEL (Quick Actions) */}
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
                      {/* Left: Atmospheric specs glass board */}
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
                        <div style={{ color: '#00ff88' }}>● O₂ OUTFLOW: 14.1%</div>
                        <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>⚡ POWER DRAW: 0.15W</div>
                      </div>

                      {/* Right: Quick toggles */}
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
                          {hudFilterActive ? '[ DISENGAGE GRID ]' : '[ ENGAGE HAZARD GRID ]'}
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
                          {thoughtSyncActive ? '[ STOP THOUGHT SYNC ]' : '[ START THOUGHT SYNC ]'}
                        </button>
                      </div>
                    </div>

                    {/* Middle: Floating glass command terminal & gaze tracker */}
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
                      {/* Thought-Sync Terminal Display */}
                      {thoughtSyncActive ? (
                        <div 
                          className="bubbly-panel" 
                          style={{ 
                            width: '260px', 
                            maxHeight: '110px', 
                            padding: '10px', 
                            background: 'rgba(6, 9, 20, 0.85)', 
                            border: '1.5px solid var(--color-accent)', 
                            borderRadius: '10px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 15px var(--glass-glow)',
                            transform: `translate3d(${parallax.x * 1.1}px, ${parallax.y * 1.1}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '3px', marginBottom: '5px', fontSize: '0.52rem', fontFamily: 'var(--font-tech)', color: 'var(--color-accent)' }}>
                            <span>🧠 CORTICAL COMMAND INTENT FEED</span>
                            <span>LIVE SYNC</span>
                          </div>
                          <pre 
                            style={{ 
                              margin: 0, 
                              fontSize: '0.52rem', 
                              fontFamily: 'monospace', 
                              color: 'var(--text-primary)', 
                              lineHeight: '1.4', 
                              whiteSpace: 'pre-wrap', 
                              textAlign: 'left'
                            }}
                          >
                            {typedText}
                            <span style={{ animation: 'cursor-blink 1s infinite', color: 'var(--color-accent)', fontWeight: 'bold' }}>_</span>
                          </pre>
                        </div>
                      ) : (
                        <div 
                          style={{ 
                            color: 'rgba(255,255,255,0.2)', 
                            fontFamily: 'var(--font-tech)', 
                            fontSize: '0.62rem', 
                            textAlign: 'center',
                            pointerEvents: 'none',
                            transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0)`,
                            transition: 'transform 0.1s ease-out'
                          }}
                        >
                          [ ACTIVATE THOUGHT SYNC IN QUICK ACTIONS ]
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
                        transform: `translate3d(${parallax.x * 1.3}px, ${parallax.y * 1.3}px, 0)`,
                        transition: 'transform 0.1s ease-out'
                      }}
                    >
                      
                      {/* Apps Row */}
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
                                width: '30px', 
                                height: '30px', 
                                borderRadius: '50%', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                background: selectedApp === app.id ? 'rgba(var(--color-accent-rgb), 0.25)' : hoveredApp === app.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                                fontSize: '1rem',
                                cursor: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.25s ease'
                              }}
                            >
                              {app.icon}
                            </button>

                            {/* Collapsing calibration ring on hover */}
                            {hoveredApp === app.id && (
                              <div 
                                className="gaze-ring-overlay" 
                                style={{ 
                                  width: '44px', 
                                  height: '44px', 
                                  left: '-7px', 
                                  top: '-7px' 
                                }}
                              ></div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Info label display for hovered/active apps */}
                      <div style={{ height: '10px', display: 'flex', justifyContent: 'center' }}>
                        {hoveredApp && (
                          <span style={{ fontSize: '0.52rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', letterSpacing: '0.5px', animation: 'slide-in-fast 0.15s ease-out' }}>
                            GAZE LOCKED ON: {appList.find(a => a.id === hoveredApp)?.label}
                          </span>
                        )}
                        {!hoveredApp && selectedApp && (
                          <span style={{ fontSize: '0.52rem', color: '#00ff88', fontFamily: 'monospace' }}>
                            [ACTIVE COMPONENT]: {appList.find(a => a.id === selectedApp)?.label}
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
                        transition: 'width 0.1s, height 0.1s, background-color 0.1s'
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
                    <span>CORTEX MAPPED SYNC</span>
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
                  <span style={{ color: 'var(--text-secondary)' }}>BIOMETRIC TEMP:</span>
                  <span style={{ color: stats.temp === '37.3°C' ? '#ff4400' : '#ffffff' }}>{stats.temp}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>NEURAL LATENCY:</span>
                  <span style={{ color: '#00ff88' }}>{stats.latency}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
