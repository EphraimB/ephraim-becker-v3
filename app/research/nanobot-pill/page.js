'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NanobotPillDetails() {
  const [transitState, setTransitState] = useState('slide-active');
  const [activeTab, setActiveTab] = useState('overview');

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

  const tabs = [
    { id: 'overview', label: '01 // SPEC OVERVIEW' },
    { id: 'payload', label: '02 // NANOBOT PAYLOAD' },
    { id: 'assembly', label: '03 // CORTEX SYNC' },
    { id: 'eclipse', label: '04 // DEVICE ECLIPSE' }
  ];

  return (
    <div className="citizen-card-shell nanobot-pill-shell">
      {/* Immersive Sweeper Overlay */}
      <div className="walking-motion-overlay nanobot-pill-walking-overlay"></div>

      <div 
        className={`walking-content-container ${transitState} nanobot-pill-content-container`} 
        style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px', maxWidth: '950px', margin: '0 auto' }}
      >
        
        {/* Back navigation button */}
        <Link 
          href="/research" 
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.sessionStorage.setItem('walk-direction', 'left');
            }
          }}
          className="hud-btn" 
          style={{ width: 'fit-content', alignSelf: 'flex-start' }}
        >
          [ ↩ BACK TO RESEARCH LAB ]
        </Link>

        {/* Main Content Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'stretch' }} className="research-grid-deck">
          
          {/* LEFT: Project Spec details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Tech Title Panel */}
            <div className="bubbly-panel">
              <span style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 'bold', letterSpacing: '1.5px' }}>
                BIOTECH_CORE // SPECULATIVE_BLUEPRINT_SYNC
              </span>
              <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.5rem', color: '#ffffff', margin: '6px 0 10px 0', fontWeight: 'bold' }}>
                BCI Nanobot Pill — Project Blueprint
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Speculative schematics detailing the biochemical delivery mechanisms, cerebral nanobot navigation pathways, and synaptic bio-computer assembly protocols inside the human brain.
              </p>
            </div>

            {/* Modular Tab navigation */}
            <div className="bubbly-panel" style={{ padding: '15px 20px' }}>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
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

            {/* Spec Content Card */}
            <div className="bubbly-panel" style={{ flex: 1, minHeight: '220px' }}>
              
              {activeTab === 'overview' && (
                <div style={{ animation: 'slide-in-fast 0.25s ease-out' }}>
                  <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.95rem', color: '#ffffff', marginBottom: '12px' }}>
                    // SECTION 01: BIODEGRADABLE CAPSULE CORE
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '15px' }}>
                    The vehicle of delivery is a swallowable bio-compatible capsule constructed from cellulose-graphene hybrid lattices. This capsule is specifically engineered to withstand transit through the esophagus and stomach fluids before rapidly dissolving in the alkaline environment of the duodenum.
                  </p>
                  <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong style={{ color: '#ffffff' }}>Graphene lattice shell:</strong> Prevents physical compression failure during ingestion.</li>
                    <li><strong style={{ color: '#ffffff' }}>Rapid dissolution curve:</strong> Completely dissolves in under 4 minutes upon exposure to duodenal gastric buffers.</li>
                    <li><strong style={{ color: '#ffffff' }}>Micro-shield seal:</strong> Protects the sensitive nanobot payload from early exposure to digestive acids.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'payload' && (
                <div style={{ animation: 'slide-in-fast 0.25s ease-out' }}>
                  <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.95rem', color: '#ffffff', marginBottom: '12px' }}>
                    // SECTION 02: NEURAL-NAVIGATIONAL NANOBOTS
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '15px' }}>
                    Upon dissolution of the shell, the capsule releases a payload of 12.4 million sub-micrometer neural nanobots. Using synthetic flagella for flagellate propulsion, these biocompatible nodes navigate the bloodstream, cross the blood-brain barrier under localized electromagnetic guidance fields, and migrate to the cerebral cortex.
                  </p>
                  <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong style={{ color: '#ffffff' }}>Flagellar Propulsion:</strong> Synthetic biocompatible flagella powered by local bloodstream glucose.</li>
                    <li><strong style={{ color: '#ffffff' }}>BBB Translocation:</strong> Safely passes through the blood-brain barrier via tight-junction channels.</li>
                    <li><strong style={{ color: '#ffffff' }}>Geodesic Magnetic Guidance:</strong> Directed in real-time by the colony's local dome telemetry grids.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'assembly' && (
                <div style={{ animation: 'slide-in-fast 0.25s ease-out' }}>
                  <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.95rem', color: '#ffffff', marginBottom: '12px' }}>
                    // SECTION 03: SYNAPTIC ASSEMBLY & BIOCONFIGURATION
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '15px' }}>
                    Once in the cerebral cortex, the nanobots organize themselves into a synchronized network. They map existing dendrite and synaptic pathways and build a sub-atomic bio-computational grid core. This core interfaces directly with the visual cortex to project digital structures onto the user's retina.
                  </p>
                  <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong style={{ color: '#ffffff' }}>Synaptic Mapping:</strong> Non-destructive scanning of existing neural pathways.</li>
                    <li><strong style={{ color: '#ffffff' }}>Retinal UI Projection:</strong> Displays terminal decks and data streams directly onto the visual field.</li>
                    <li><strong style={{ color: '#ffffff' }}>Quantum Sync:</strong> Direct communication with the Ares City quantum network framework.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'eclipse' && (
                <div style={{ animation: 'slide-in-fast 0.25s ease-out' }}>
                  <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.95rem', color: '#ffffff', marginBottom: '12px' }}>
                    // SECTION 04: REDUNDANCY & THE PHYSICAL DEVICE ECLIPSE
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '15px' }}>
                    The ultimate goal of the BCI Nanobot Pill project is the complete redundancy of external hardware. By integrating computational logic, deep space links, and visualization grids directly into the biological nervous system, physical terminals, screens, and wearable headsets become entirely redundant.
                  </p>
                  <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong style={{ color: '#ffffff' }}>Zero-Weight Comm Links:</strong> Instant, hardware-free communication across Ares City.</li>
                    <li><strong style={{ color: '#ffffff' }}>Biomimetic Security:</strong> Encryption keys locked directly to the citizen's unique synaptic pulse signature.</li>
                    <li><strong style={{ color: '#ffffff' }}>Ecological Conservation:</strong> Eradicates electronic waste, mining for device metals, and hardware assembly pollution in the Martian colony.</li>
                  </ul>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT: Speculative Telemetry visual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Visualizer Panel */}
            <div className="bubbly-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyItems: 'space-between', justifyContent: 'space-between' }}>
              <span className="net-label" style={{ display: 'block', marginBottom: '8px' }}>
                // CORTICAL ASSEMBLY SCHEMATICS
              </span>

              <div 
                style={{ 
                  flex: 1, 
                  background: 'rgba(2, 3, 6, 0.95)', 
                  border: '1.5px solid rgba(var(--color-accent-rgb), 0.25)', 
                  borderRadius: '10px', 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  minHeight: '220px',
                  overflow: 'hidden'
                }}
              >
                {/* SVG Brain Synaptic Grid Map */}
                <svg width="100%" height="220" viewBox="0 0 100 100" style={{ display: 'block' }}>
                  {/* Grid layout */}
                  <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                  {/* Stylized Brain Silhouette using path */}
                  <path 
                    d="M 50 15 C 30 15, 20 25, 20 45 C 20 60, 30 75, 45 80 C 47 82, 53 82, 55 80 C 70 75, 80 60, 80 45 C 80 25, 70 15, 50 15 Z" 
                    fill="none" 
                    stroke="rgba(var(--color-accent-rgb), 0.25)" 
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                  />

                  {/* Cortical regions */}
                  <path d="M 50 15 L 50 80" stroke="rgba(var(--color-accent-rgb), 0.15)" strokeWidth="1" />
                  <path d="M 20 45 L 80 45" stroke="rgba(var(--color-accent-rgb), 0.15)" strokeWidth="1" />

                  {/* Pulsing nanobots assembly */}
                  <g>
                    {/* Synaptic nodes */}
                    <circle cx="35" cy="35" r="2" fill="var(--color-accent)">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="65" cy="35" r="2" fill="var(--color-accent)">
                      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="30" cy="55" r="2" fill="#00ff88">
                      <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="70" cy="55" r="2" fill="#00f0ff">
                      <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="70" r="2.5" fill="var(--color-accent)">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
                    </circle>

                    {/* Laser sync connections */}
                    <line x1="35" y1="35" x2="65" y2="35" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.3" />
                    <line x1="35" y1="35" x2="30" y2="55" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.3" />
                    <line x1="65" y1="35" x2="70" y2="55" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.3" />
                    <line x1="30" y1="55" x2="50" y2="70" stroke="#00ff88" strokeWidth="0.5" opacity="0.3" />
                    <line x1="70" y1="55" x2="50" y2="70" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
                  </g>
                </svg>

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
                  <span>CORTEX ASSEMBLY SYNC</span>
                  <span style={{ color: '#00ff88' }}>99%</span>
                </div>
              </div>

              {/* Status Diagnostic specs */}
              <div style={{ marginTop: '15px', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.62rem', fontFamily: 'monospace' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>UPLINK SIGNAL:</span>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>SECURE TRANS-LINK</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>GRID FREQUENCY:</span>
                  <span style={{ color: '#ffffff' }}>489.12 GHz</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>CORTICAL TEMPERATURE:</span>
                  <span style={{ color: '#00ff88' }}>37.0°C [NOMINAL]</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
