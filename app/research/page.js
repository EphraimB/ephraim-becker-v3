'use client';

import { useState, useEffect, useRef } from 'react';
import INITIAL_TECH from '../../data/future-tech.json';

export default function SpeculativeTechLab() {
  const [transitState, setTransitState] = useState('slide-active');
  const [isMounted, setIsMounted] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // speculative tech state
  const [techList, setTechList] = useState([]);
  const [activeTech, setActiveTech] = useState(null);

  // Proposal Form states
  const [proposalName, setProposalName] = useState('');
  const [proposalYear, setProposalYear] = useState('MY50');
  const [proposalCategory, setProposalCategory] = useState('Biotech & Comms');
  const [proposalComplexity, setProposalComplexity] = useState(50);
  const [proposalDesc, setProposalDesc] = useState('');
  
  // Submission sync animation state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatusText, setSyncStatusText] = useState('');

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

  // Hydration safety & Initial load
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('ares-future-tech');
    if (saved) {
      try {
        setTechList(JSON.parse(saved));
      } catch (e) {
        setTechList(INITIAL_TECH);
      }
    } else {
      setTechList(INITIAL_TECH);
    }
  }, []);

  // Save to localStorage when techList updates
  useEffect(() => {
    if (isMounted && techList.length > 0) {
      localStorage.setItem('ares-future-tech', JSON.stringify(techList));
    }
  }, [techList, isMounted]);

  // Categories list
  const categories = ['All', 'Biotech & Comms', 'Energy Systems', 'Planetary Infrastructure', 'Bio-dome Automation', 'Spatial Transit'];

  // Handle Search & Filter logic
  const filteredTech = techList.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tech.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle speculative technology proposal submit
  const handleProposeTech = (e) => {
    e.preventDefault();
    if (!proposalName || !proposalDesc) return;

    setIsSyncing(true);
    setSyncProgress(0);
    setSyncStatusText('INITIALIZING QUANTUM TRANS-LINK...');

    // Multi-phase telemetry sync sequence
    const syncPhases = [
      { progress: 20, text: 'ESTABLISHING SECURE LAB UPLINK...' },
      { progress: 50, text: 'CALIBRATING GEODESIC RESISTANCE...' },
      { progress: 80, text: 'SYNCING BLUEPRINT SPECIFICATIONS...' },
      { progress: 100, text: 'ARCHIVAL SUCCESSFUL // DATA INTEGRITY RATIFIED' }
    ];

    let currentPhase = 0;
    const interval = setInterval(() => {
      if (currentPhase < syncPhases.length) {
        setSyncProgress(syncPhases[currentPhase].progress);
        setSyncStatusText(syncPhases[currentPhase].text);
        currentPhase++;
      } else {
        clearInterval(interval);
        
        // Add new technology to the list
        const newTech = {
          id: `custom_${Date.now()}`,
          name: proposalName,
          category: proposalCategory,
          year: proposalYear,
          description: proposalDesc,
          complexity: parseInt(proposalComplexity),
          status: 'SIMULATED / DESIGN STAGE'
        };

        setTechList(prev => [newTech, ...prev]);
        
        // Reset form inputs
        setProposalName('');
        setProposalYear('MY50');
        setProposalCategory('Biotech & Comms');
        setProposalComplexity(50);
        setProposalDesc('');
        
        // End loading sequence
        setTimeout(() => {
          setIsSyncing(false);
          setSyncProgress(0);
        }, 1200);
      }
    }, 700);
  };

  return (
    <div className="citizen-card-shell research-shell">
      {/* Immersive Sweeper Overlay */}
      <div className="walking-motion-overlay research-walking-overlay"></div>

      <div className={`walking-content-container ${transitState} research-content-container`} style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px' }}>
        
        {/* Main Header / Info Panel */}
        <div className="bubbly-panel research-header-panel">
          <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.4rem', color: 'var(--color-accent)', textShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.3)', marginBottom: '8px' }}>
            ARES SPECULATIVE TECHNOLOGY LAB // SECTOR 02
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Welcome to the colony's central speculative laboratory deck. Here, citizens catalog technologies proposed for future phases of Ares City's Martian civilization. Filter existing proposals or use the Holographic Proposal Terminal to sync your own designs to the colony mainframe.
          </p>
        </div>

        {/* Two-Column Workspace Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', alignItems: 'stretch' }} className="research-grid-deck">
          
          {/* LEFT:Speculative Tech Archive Listing & Filter Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Filter Deck Panel */}
            <div className="bubbly-panel" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Search */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: '200px' }}>
                  <label className="net-label" style={{ fontSize: '0.6rem' }}>Search speculative archives</label>
                  <input
                    type="text"
                    placeholder="🔍 Filter future concepts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="net-input"
                    style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                  />
                </div>

                {/* Category Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '180px' }}>
                  <label className="net-label" style={{ fontSize: '0.6rem' }}>Sector Class Tag</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="net-input"
                    style={{ fontSize: '0.8rem', padding: '5px 10px', background: 'rgba(4,6,12,0.85)', cursor: 'pointer' }}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Speculative Tech Grid/List */}
            <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', maxHeight: '520px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                {isMounted && filteredTech.length === 0 ? (
                  <div className="bubbly-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>🛰️</span>
                    <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>NO FUTURISTIC PATTERNS DETECTED</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Modify your search keyword or adjust the filter classifications.</p>
                  </div>
                ) : (
                  isMounted && filteredTech.map((tech) => {
                    const isActive = activeTech?.id === tech.id;
                    return (
                      <div
                        key={tech.id}
                        onClick={() => setActiveTech(isActive ? null : tech)}
                        className="bubbly-panel"
                        style={{
                          padding: '16px 20px',
                          cursor: 'pointer',
                          borderColor: isActive ? 'var(--color-accent)' : 'var(--glass-border)',
                          boxShadow: isActive ? '0 0 15px rgba(var(--color-accent-rgb), 0.2)' : 'none',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
                          <div>
                            <span style={{ fontSize: '0.62rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 'bold' }}>
                              [{tech.category.toUpperCase()}] // TARGET SOL: {tech.year}
                            </span>
                            <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#ffffff', margin: '4px 0 8px 0' }}>
                              {tech.name}
                            </h4>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                              {tech.description}
                            </p>
                          </div>
                          
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)' }}>
                              COMPLEXITY INDEX
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)' }}>
                              {tech.complexity}%
                            </div>
                            <span style={{
                              display: 'inline-block',
                              marginTop: '6px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              fontSize: '0.55rem',
                              color: 'var(--text-secondary)',
                              fontFamily: 'monospace'
                            }}>
                              {tech.status}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Expandable Telemetry diagnostics */}
                        {isActive && (
                          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.06)', animation: 'slide-in-fast 0.25s ease-out' }}>
                            <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--color-accent)', display: 'block', marginBottom: '8px' }}>
                              📡 LOCAL_TELEMETRY // LIVE DIAGNOSTICS SYNAPSE
                            </span>
                            <div style={{ display: 'flex', gap: '15px', background: '#020306', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)' }}>COGNITIVE COMPLEXITY RATING:</span>
                                <div className="hud-progress-container" style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                  <div className="hud-progress-fill" style={{ width: `${tech.complexity}%`, background: 'var(--color-accent)', height: '100%' }}></div>
                                </div>
                                <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                  Calibration threshold meets MY38 colony safety criteria.
                                </span>
                              </div>
                              <div style={{ width: '120px', flexShrink: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px dashed rgba(255,255,255,0.1)' }}>
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-secondary)' }}>SYSTEM STATUS</span>
                                <span style={{ fontSize: '0.7rem', color: '#00ff88', fontFamily: 'var(--font-tech)', fontWeight: 'bold', display: 'block', marginTop: '2px' }}>
                                  ✓ RATIFIED
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: Holographic Proposal Terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Speculative Telemetry Visual Panel */}
            <div className="bubbly-panel" style={{ flexShrink: 0 }}>
              <span className="net-label" style={{ display: 'block', marginBottom: '8px' }}>// LAB TELEMETRY DIAGNOSTICS</span>
              <div style={{ background: '#020306', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '15px', height: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                {/* SVG wave signal */}
                <svg width="100%" height="45" style={{ display: 'block' }}>
                  <path 
                    d="M 0 22.5 Q 15 5, 30 22.5 T 60 22.5 T 90 22.5 T 120 22.5 T 150 22.5 T 180 22.5 T 210 22.5 T 240 22.5 T 270 22.5 T 300 22.5 T 330 22.5 T 360 22.5" 
                    className="wave-line" 
                    style={{ stroke: 'var(--color-accent)', filter: 'drop-shadow(0 0 4px rgba(var(--color-accent-rgb), 0.4))' }}
                  />
                </svg>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                  <div>WAV: QUANTUM_SYNC</div>
                  <div style={{ color: 'var(--color-accent)' }}>FREQ: 893.2 Msol</div>
                </div>
              </div>
            </div>

            {/* Proposal Submission Terminal */}
            <div className="bubbly-panel" style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.9rem', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', marginBottom: '15px' }}>
                HOLOGRAPHIC PROPOSAL TERMINAL
              </h3>

              {isSyncing ? (
                /* Interactive calibration loader overlay */
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '30px 10px' }}>
                  <div className="transporter-ring-graphic" style={{ marginBottom: '20px', width: '70px', height: '70px' }}>
                    <div className="transporter-ring-pulse" style={{ borderColor: 'var(--color-accent)' }}></div>
                    <div className="transporter-ring-core" style={{ background: 'var(--color-accent)', boxShadow: '0 0 15px var(--color-accent)' }}></div>
                  </div>
                  
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.72rem', color: 'var(--color-accent)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {syncStatusText}
                  </span>
                  
                  <div className="hud-progress-container" style={{ width: '85%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginTop: '12px' }}>
                    <div className="hud-progress-fill" style={{ width: `${syncProgress}%`, background: 'var(--color-accent)', height: '100%', transition: 'width 0.4s' }}></div>
                  </div>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', display: 'block', marginTop: '6px' }}>
                    SYNC VALUE: {syncProgress}%
                  </span>
                </div>
              ) : (
                <form onSubmit={handleProposeTech} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="net-form-group">
                    <label className="net-label">Futuristic Technology Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sub-dermal Solar Shieler..."
                      value={proposalName}
                      onChange={(e) => setProposalName(e.target.value)}
                      className="net-input"
                      style={{ fontSize: '0.8rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    <div className="net-form-group">
                      <label className="net-label">Deployment Year</label>
                      <select
                        value={proposalYear}
                        onChange={(e) => setProposalYear(e.target.value)}
                        className="net-input"
                        style={{ fontSize: '0.8rem', background: 'rgba(4,6,12,0.85)' }}
                      >
                        <option value="MY40">MY40 (2030)</option>
                        <option value="MY45">MY45 (2039)</option>
                        <option value="MY50">MY50 (2048)</option>
                        <option value="MY60">MY60 (2067)</option>
                        <option value="MY75">MY75 (2095)</option>
                        <option value="MY100">MY100 (2142)</option>
                      </select>
                    </div>

                    <div className="net-form-group">
                      <label className="net-label">Classification</label>
                      <select
                        value={proposalCategory}
                        onChange={(e) => setProposalCategory(e.target.value)}
                        className="net-input"
                        style={{ fontSize: '0.8rem', background: 'rgba(4,6,12,0.85)' }}
                      >
                        <option value="Biotech & Comms">Biotech & Comms</option>
                        <option value="Energy Systems">Energy Systems</option>
                        <option value="Planetary Infrastructure">Planetary Infrastructure</option>
                        <option value="Bio-dome Automation">Bio-dome Automation</option>
                        <option value="Spatial Transit">Spatial Transit</option>
                      </select>
                    </div>
                  </div>

                  <div className="net-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <label className="net-label">Complexity Index</label>
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)' }}>
                        {proposalComplexity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={proposalComplexity}
                      onChange={(e) => setProposalComplexity(e.target.value)}
                      className="range-slider-control"
                      style={{ marginTop: '5px' }}
                    />
                  </div>

                  <div className="net-form-group">
                    <label className="net-label">Speculative Description</label>
                    <textarea
                      required
                      placeholder="Detail how the technology functions, its structural purpose, and how it will improve human life or ecological sustainability in Ares City..."
                      value={proposalDesc}
                      onChange={(e) => setProposalDesc(e.target.value)}
                      className="net-textarea"
                      style={{ fontSize: '0.8rem', height: '80px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="hud-btn"
                    style={{ width: '100%', marginTop: '5px' }}
                  >
                    🚀 SYNC PROPOSAL TO MAINFRAME
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
