'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import TransmitterForm from '../components/TransmitterForm';

function CitizenSuiteCore() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Theme Mood States (Martian Rust, Ares Cyan, Dusk Violet, Deep Gold)
  const MOODS = [
    { name: 'Dusk Violet', class: 'suite', color: '#c259ff', rgb: '194, 89, 255' },
    { name: 'Martian Rust', class: 'mars', color: '#e05624', rgb: '224, 86, 36' },
    { name: 'Ares Cyan', class: 'metropolis', color: '#00f0ff', rgb: '0, 240, 255' },
    { name: 'Deep Gold', class: 'quantum', color: '#ffb300', rgb: '255, 179, 0' }
  ];
  
  const [activeMood, setActiveMood] = useState(MOODS[0]);
  
  // Holographic Workspace Console App State (dossier, transmitter, domes)
  const [activeTab, setActiveTab] = useState('dossier');
  
  // Biography Detail Folder Dossier Selection
  const [selectedFolder, setSelectedFolder] = useState('profile');
  
  // Interactive Transits & Telemetry Stats States
  const [integrityPercent, setIntegrityPercent] = useState(99.94);
  const [hyperloopLoad, setHyperloopLoad] = useState(42.8);
  const [oxygenLevel, setOxygenLevel] = useState(21.4);
  const [domeTemp, setDomeTemp] = useState(-45.2);
  const [pressureKpa, setPressureKpa] = useState(101.3);
  
  // Subspace Comms Messages Log State
  const [logs, setLogs] = useState([
    { id: 1, sol: 542, time: '12:04', sender: 'Terra Fleet Command', message: 'Subspace data matrix sync nominal. Credentials verified.' },
    { id: 2, sol: 541, time: '18:15', sender: 'Ares City Admin Core', message: 'Registry logs updated. Welcome back, University Student Becker.' },
    { id: 3, sol: 540, time: '09:30', sender: 'Adelphi Link Node', message: 'Course packet synchronizer verified: College Calculus & Database Systems.' }
  ]);
  
  // Parallax & 3D Interactive Console Coordinates
  const [consoleTransform, setConsoleTransform] = useState({ rx: 0, ry: 0 });
  const [idleMode, setIdleMode] = useState(false);
  const idleTimerRef = useRef(null);
  
  // Handle direct url focused query params & pathname routes
  useEffect(() => {
    if (pathname === '/atmosphere-dome' || pathname === '/metropolis-core') {
      setActiveTab('domes');
    } else if (pathname === '/quantum-net') {
      setActiveTab('transmitter');
    } else {
      const focused = searchParams.get('focusedApp');
      if (focused === 'transit' || focused === 'atmosphere') {
        setActiveTab('domes');
      } else if (focused === 'transmitter') {
        setActiveTab('transmitter');
      }
    }
  }, [searchParams, pathname]);

  // Setup dynamic fluctuating sensors to make the room feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setIntegrityPercent(prev => +(prev + (Math.random() - 0.5) * 0.02).toFixed(2));
      setHyperloopLoad(prev => +(Math.max(20, Math.min(90, prev + (Math.random() - 0.5) * 1.5))).toFixed(1));
      setOxygenLevel(prev => +(Math.max(19, Math.min(23, prev + (Math.random() - 0.5) * 0.05))).toFixed(2));
      setDomeTemp(prev => +(prev + (Math.random() - 0.5) * 0.2).toFixed(1));
      setPressureKpa(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Idle Viewport mode setup
  useEffect(() => {
    const resetIdleTimer = () => {
      setIdleMode(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIdleMode(true);
      }, 10000); // 10 seconds of inactivity triggers ambient cinematic mode
    };
    
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('mousedown', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);
    
    resetIdleTimer();
    return () => {
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('mousedown', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // 3D Parallax Mouse Tracking Effect
  const handleMouseMove = (e) => {
    if (typeof window === 'undefined') return;
    const consoleElement = e.currentTarget;
    const rect = consoleElement.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth angle calculations (tilt max 6 degrees)
    const rx = -(y / (rect.height / 2)) * 5;
    const ry = (x / (rect.width / 2)) * 5;
    
    setConsoleTransform({ rx, ry });
  };
  
  const handleMouseLeave = () => {
    setConsoleTransform({ rx: 0, ry: 0 });
  };

  // Subspace form callback
  const handleNewLog = (packet) => {
    const pad = (num) => String(num).padStart(2, '0');
    const now = packet.timestamp || new Date();
    
    // Simulate Solar Sol calculation
    const my38StartUTC = Date.UTC(2024, 10, 12, 0, 0, 0);
    const timeDeltaMs = now.getTime() - my38StartUTC;
    const totalSols = (timeDeltaMs / (1000 * 60 * 60 * 24)) / 1.02749125;
    const currentSol = Math.floor(totalSols);
    const solFraction = totalSols - currentSol;
    const solSeconds = Math.floor(solFraction * 24 * 60 * 60);
    const solHour = Math.floor(solSeconds / 3600);
    const solMinute = Math.floor((solSeconds % 3600) / 60);

    const newLog = {
      id: Date.now(),
      sol: currentSol,
      time: `${pad(solHour)}:${pad(solMinute)}`,
      sender: packet.sender || 'Terra Link Node',
      message: packet.message
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Transition out to Portfolio Archives
  const navigateToPortfolio = () => {
    const workspace = document.querySelector('.os-workspace');
    if (workspace) workspace.classList.add('walking-transit-active');
    setTimeout(() => {
      router.push('/portfolio');
    }, 500);
  };

  return (
    <div 
      className={`citizen-card-shell spatial-homepage-grid ${idleMode ? 'ambient-idle-state' : ''}`}
      style={{
        // Update active mood colors dynamically via inline styles
        '--color-accent': activeMood.color,
        '--color-accent-rgb': activeMood.rgb
      }}
    >
      {/* ==========================================================
         1. CITY TELEMETRY ZONE (Projected on Penthouse Window Glass)
         ========================================================== */}
      <div 
        className="gaze-target"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 30px',
          borderRight: '1px dashed rgba(255, 255, 255, 0.08)',
          pointerEvents: 'auto',
          position: 'relative'
        }}
      >
        {/* Dynamic Starry Telemetry HUD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
            <div className="window-telemetry-text">System Beacon // Ares-IV Penthouse</div>
            <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px', fontFamily: 'monospace' }}>
              GRID LINK: LAT_A-04.9 // LONG_B-84.1
            </div>
          </div>

          {/* Environmental Conditions Readout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div className="window-telemetry-text" style={{ fontSize: '0.55rem' }}>Dome Temperature</div>
              <div className="window-telemetry-value">{domeTemp}°C</div>
            </div>
            <div>
              <div className="window-telemetry-text" style={{ fontSize: '0.55rem' }}>Atm Pressure</div>
              <div className="window-telemetry-value">{pressureKpa} kPa</div>
            </div>
            <div>
              <div className="window-telemetry-text" style={{ fontSize: '0.55rem' }}>O₂ Concentration</div>
              <div className="window-telemetry-value">{oxygenLevel}%</div>
            </div>
            <div>
              <div className="window-telemetry-text" style={{ fontSize: '0.55rem' }}>Carbon Dissipation</div>
              <div className="window-telemetry-value">390 ppm</div>
            </div>
          </div>
          
          {/* Geodesic Dome Integrity meter */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)' }}>
              <span className="window-telemetry-text" style={{ fontSize: '0.55rem' }}>GEODESIC SHIELD INTEGRITY</span>
              <span style={{ fontFamily: 'var(--font-tech)', color: 'var(--color-accent)' }}>{integrityPercent}%</span>
            </div>
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${integrityPercent}%`, background: 'var(--color-accent)', boxShadow: '0 0 8px var(--color-accent)' }}></div>
            </div>
          </div>
        </div>

        {/* Dynamic Transit Radar Visualizer */}
        <div style={{ margin: '30px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <span className="window-telemetry-text" style={{ fontSize: '0.58rem', letterSpacing: '2.5px' }}>Colony Radar Transit Grid</span>
          <div style={{ position: 'relative', width: '150px', height: '150px' }}>
            <svg width="150" height="150" viewBox="0 0 100 100" style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }}>
              <defs>
                <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.12" />
                  <stop offset="80%" stopColor="var(--color-accent)" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Radar Rings */}
              <circle cx="50" cy="50" r="45" className="radar-grid" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="30" className="radar-grid" />
              <circle cx="50" cy="50" r="15" className="radar-grid" strokeDasharray="1 2" />
              
              {/* Crosshairs */}
              <line x1="5" y1="50" x2="95" y2="50" className="radar-grid" />
              <line x1="50" y1="5" x2="50" y2="95" className="radar-grid" />
              
              {/* Radar Sweep */}
              <path d="M 50 50 L 50 5 A 45 45 0 0 1 95 50 Z" className="radar-sweep" />
              
              {/* Fluctuating Target blips */}
              <circle cx="30" cy="40" r="1.5" fill="var(--color-accent)" style={{ animation: 'blink-led 1.2s infinite' }} />
              <circle cx="75" cy="65" r="2" fill="var(--neon-amber)" style={{ animation: 'blink-led 2s infinite' }} />
              <circle cx="60" cy="25" r="1.5" fill="var(--neon-emerald)" style={{ animation: 'blink-led 1.6s infinite' }} />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '6px', height: '6px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px #fff' }} />
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.55rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.45)' }}>
            <span>SHUTTLES IN ORBIT: 03</span>
            <span>HYPERLOOP LOAD: {hyperloopLoad}%</span>
          </div>
        </div>

        {/* Ambient Colony Notifications Readout */}
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '16px 20px', textAlign: 'left' }}>
          <div className="window-telemetry-text" style={{ fontSize: '0.55rem', color: 'var(--neon-amber)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ width: '4px', height: '4px', background: 'var(--neon-amber)', borderRadius: '50%', display: 'inline-block', animation: 'blink-led 1s infinite' }}></span>
            Colony Broadcast Net
          </div>
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4, margin: 0 }}>
            CivilNet Alert: Solar flare forecast for Sol 543 requires corridor magnetic shields to operate at 98.6% intensity. All citizen transit nodes active.
          </p>
        </div>
      </div>

      {/* ==========================================================
         2. SPATIAL OPERATING CONSOLE (Floating above Coffee Table)
         ========================================================== */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'auto'
        }}
      >
        {/* Floating 3D perspective glass console box */}
        <div 
          className="spatial-glass-panel spatial-3d-console"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 28px',
            position: 'relative',
            '--rx': `${consoleTransform.rx}deg`,
            '--ry': `${consoleTransform.ry}deg`
          }}
        >
          {/* Header Console Tabs */}
          <div 
            style={{ 
              display: 'flex', 
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
              paddingBottom: '10px', 
              marginBottom: '20px',
              gap: '6px'
            }}
          >
            {[
              { id: 'dossier', label: 'Dossier', icon: '👤' },
              { id: 'transmitter', label: 'Subspace Transmitter', icon: '📡' },
              { id: 'domes', label: 'Habitat Networks', icon: '🌿' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: activeTab === tab.id ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-sans)',
                  color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  fontWeight: 600
                }}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* ================= TAB CONTENT 1: BIOGRAPHY DOSSIER ================= */}
          {activeTab === 'dossier' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              
              {/* Sub-Folders switcher */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {[
                  { id: 'profile', label: 'Active Citizen Core' },
                  { id: 'studies', label: 'CS & Calculus Logic' },
                  { id: 'socials', label: 'Flag Football & Choir' }
                ].map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    style={{
                      background: selectedFolder === folder.id ? 'rgba(var(--color-accent-rgb), 0.1)' : 'rgba(255,255,255,0.01)',
                      border: '1.5px solid',
                      borderColor: selectedFolder === folder.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.04)',
                      borderRadius: '8px',
                      padding: '5px 12px',
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-tech)',
                      color: selectedFolder === folder.id ? '#fff' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {folder.label}
                  </button>
                ))}
              </div>

              {/* Folder Render Deck */}
              <div className="custom-scroll" style={{ flex: 1, textAlign: 'left' }}>
                
                {selectedFolder === 'profile' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade">
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <img 
                        src="/assets/images/profile.png" 
                        alt="Ephraim Becker" 
                        style={{ width: '80px', height: '80px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', objectFit: 'cover' }}
                      />
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '0.5px' }}>Ephraim Becker</h3>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                          <span style={{ fontSize: '0.55rem', border: '1px solid var(--color-accent)', color: 'var(--color-accent)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)', fontWeight: 700 }}>STUDENT CADET</span>
                          <span style={{ fontSize: '0.55rem', border: '1px solid var(--neon-emerald)', color: 'var(--neon-emerald)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)', fontWeight: 700 }}>UI/UX ENGINEER</span>
                        </div>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: 0 }}>
                      Welcome to my Citizen Suite Penthouse! I am Ephraim Becker. From my home in Cedarhurst on Earth, I coordinate as a Remote CS Student linked to Adelphi University, developing highly visual frontend interfaces, low-level program designs, and predictive software engines.
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: 0 }}>
                      This platform represents a spatial window overlooking Ares City—a fully integrated environment showcasing my technical portfolio assets, core studies, and colony systems records. Open the tabs above to explore or warp directly into the practical archives!
                    </p>
                  </div>
                )}

                {selectedFolder === 'studies' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade">
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)', margin: 0 }}>Adelphi Link: Database Indexing & Discrete Logic</h4>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                      Earthside, my academic major focuses heavily on software architecture. I specialize in discrete logic structures, search tree indexing efficiencies, and building clean data schemas. 
                    </p>
                    
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)', margin: '8px 0 0 0' }}>Calculus Coordinate Math as a Logic Sharpener</h4>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                      To keep my computational logic perfectly sharp, I tackle college-level Calculus. Analyzing complex limits, derivatives (`dy/dx`), and integrals trains my brain in coordinate math, which maps directly to coordinate grid rendering and procedural graphic algorithms.
                    </p>
                    
                    {/* Tiny Calculus SVG Graphic */}
                    <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px' }}>
                      <svg viewBox="0 0 300 60" width="100%" height="45px">
                        <line x1="10" y1="30" x2="290" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                        <line x1="45" y1="5" x2="45" y2="55" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                        <path d="M 45,45 Q 120,-10 180,35 T 280,20" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                        <text x="55" y="15" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">lim (Δx-&gt;0) Δy/Δx</text>
                        <text x="180" y="50" fill="var(--color-accent)" fontSize="6" fontFamily="monospace">∫ f(x) dx = F(b) - F(a)</text>
                      </svg>
                    </div>
                  </div>
                )}

                {selectedFolder === 'socials' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade">
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)', margin: 0 }}>Flag Football: Playbook Blueprints & Coordination</h4>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                      Flag football is one of my deepest athletic passions! Because I have autism, fluid open-ended social small talk can feel incredibly draining. Flag football provides a wonderful structured ecosystem. We huddle in focused coordination, review the playbook, align on routes, and use clear, predefined scripts to coordinate team plays seamlessly. 
                    </p>
                    
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)', margin: '8px 0 0 0' }}>Pipe Organ Mechanics & Choral Vocal Harmony</h4>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                      Musically, I love acoustic storytelling pop (Taylor Swift, Noah Kahan) as well as classical. The pipe organ is my favorite instrument because of its grand mechanical architecture and powerful, layered acoustic registration. I also sing in a local choir, blending my voice in precise choral harmony, and enjoy the raw vocal fun of karaoke.
                    </p>
                  </div>
                )}

              </div>
              
              {/* Simulated active fabrication queue alert at bottom */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.62rem', fontFamily: 'var(--font-tech)' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>FABRICATION BAY ACTIVE // SOL_542</span>
                <span style={{ color: 'var(--neon-amber)', animation: 'blink-led 1s infinite alternate' }}>[ BLUEPRINT COMPILING: WIZARD_CONV_V7.3 ]</span>
              </div>
            </div>
          )}

          {/* ================= TAB CONTENT 2: SUBSPACE MESSENGER ================= */}
          {activeTab === 'transmitter' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }} className="animate-fade">
              <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '20px', flex: 1, minHeight: 0 }}>
                
                {/* Message input column */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
                  <TransmitterForm onNewLog={handleNewLog} />
                </div>
                
                {/* Message logs column */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
                  <span className="window-telemetry-text" style={{ fontSize: '0.55rem', marginBottom: '8px', color: 'var(--color-accent)' }}>Transceiver Reception Log</span>
                  
                  <div 
                    className="custom-scroll" 
                    style={{ 
                      flex: 1, 
                      background: 'rgba(0,0,0,0.3)', 
                      border: '1px solid rgba(255,255,255,0.04)', 
                      borderRadius: '10px', 
                      padding: '12px',
                      fontSize: '0.68rem',
                      fontFamily: 'monospace',
                      textAlign: 'left'
                    }}
                  >
                    {logs.map((log) => (
                      <div key={log.id} style={{ marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                        <span style={{ color: 'var(--color-accent)' }}>[Sol {log.sol} - {log.time}] Up-Link</span><br/>
                        <span style={{ color: 'rgba(255,255,255,0.4)' }}>From {log.sender}:</span><br/>
                        <span style={{ color: '#fff' }}>&quot;{log.message}&quot;</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= TAB CONTENT 3: HABITAT SYSTEMS & TRANSITS ================= */}
          {activeTab === 'domes' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }} className="animate-fade">
              
              {/* 2x2 Grid of Dome Telemetry Sub-Systems (merged Metropolis Core & Biosphere Dome) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', flex: 1, minHeight: 0 }} className="custom-scroll">
                
                {/* Sector 1: Metropolis hyperloops */}
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', textAlign: 'left' }}>
                  <div className="window-telemetry-text" style={{ fontSize: '0.55rem', color: 'var(--color-accent)', marginBottom: '10px' }}>⚡ Metropolis Loop Speed</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Civic Center Transit</span>
                      <strong style={{ color: '#fff' }}>982 km/h</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Biosphere Corridor</span>
                      <strong style={{ color: '#fff' }}>740 km/h</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Quantum Comms Loop</span>
                      <strong style={{ color: 'var(--neon-amber)' }}>420 km/h</strong>
                    </div>
                  </div>
                </div>

                {/* Sector 2: Geodesic Climate Stabilizers */}
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', textAlign: 'left' }}>
                  <div className="window-telemetry-text" style={{ fontSize: '0.55rem', color: 'var(--color-accent)', marginBottom: '10px' }}>🌿 Dome Biosphere Status</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Humidity Level</span>
                      <strong style={{ color: '#fff' }}>62.8%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Biomass Yield</span>
                      <strong style={{ color: 'var(--neon-emerald)' }}>94.6%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Agri-Stabilizer Loop</span>
                      <strong style={{ color: 'var(--neon-emerald)' }}>NOMINAL</strong>
                    </div>
                  </div>
                </div>

                {/* Sector 3: Hyperloop Magnet shield */}
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', textAlign: 'left', gridColumn: '1 / -1' }}>
                  <div className="window-telemetry-text" style={{ fontSize: '0.55rem', color: 'var(--color-accent)', marginBottom: '10px' }}>🛡️ Electromagnetic Shield Flux Diagnostics</div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
                        <span>Corridor Core Flux</span>
                        <span>99.94%</span>
                      </div>
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '99.94%', background: 'var(--color-accent)' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
                        <span>EM Shield Intensity</span>
                        <span>96.2%</span>
                      </div>
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '96.2%', background: 'var(--color-accent)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Bottom Panel Controls (Habitat Integrated wall pads & Gateway egress links) */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: '24px', 
            gap: '20px' 
          }}
        >
          {/* Wall-Integrated Habitat Mood light controller core */}
          <div 
            style={{ 
              background: 'rgba(6, 8, 14, 0.4)', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              borderRadius: '16px', 
              padding: '12px 18px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              backdropFilter: 'blur(15px)'
            }}
          >
            <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-tech)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Mood Core:
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {MOODS.map((mood) => (
                <button
                  key={mood.class}
                  onClick={() => setActiveMood(mood)}
                  className={`mood-pin ${activeMood.class === mood.class ? 'active' : ''}`}
                  title={`Shift to ${mood.name}`}
                  style={{
                    backgroundColor: mood.color,
                    color: mood.color,
                    border: activeMood.class === mood.class ? '2px solid #fff' : '1px solid rgba(255,255,255,0.3)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Gateway egress transition links */}
          <button
            onClick={navigateToPortfolio}
            className="hud-btn"
            style={{
              padding: '14px 28px',
              borderRadius: '16px',
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '1.5px',
              background: 'rgba(var(--color-accent-rgb), 0.15)',
              borderColor: 'var(--color-accent)',
              boxShadow: '0 4px 20px rgba(var(--color-accent-rgb), 0.15)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            📂 Access Archives <span>➔</span>
          </button>
        </div>

      </div>
      
      {/* Dynamic Keyframes inject */}
      <style jsx global>{`
        .animate-fade {
          animation: spatial-fade-in 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        @keyframes spatial-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Cinematic Serene Idle Transition */
        .ambient-idle-state .gaze-target {
          opacity: 0.2;
        }
        .ambient-idle-state .spatial-glass-panel {
          opacity: 0.15;
          transform: perspective(1200px) scale(0.99) translateZ(-10px) !important;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

export default function CitizenSuite() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'var(--font-tech)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>
        📡 Synchronizing Penthouse Core...
      </div>
    }>
      <CitizenSuiteCore />
    </Suspense>
  );
}
