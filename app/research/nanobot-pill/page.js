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
    { id: 'overview', label: 'Overview' },
    { id: 'payload', label: 'The Capsule' },
    { id: 'assembly', label: 'The Nanobots' },
    { id: 'eclipse', label: 'No More Devices' }
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
                PROJECT DECK // SPECULATIVE BIOTECH
              </span>
              <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.5rem', color: '#ffffff', margin: '6px 0 10px 0', fontWeight: 'bold' }}>
                BCI Nanobot Pill
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                The future of human connection is here. Experience the blueprint of hardware-free computing, direct to your brain.
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
                  <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', color: 'var(--color-accent)', marginBottom: '8px', fontWeight: 'bold' }}>
                    Simply swallow. Say hello to hardware-free.
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                    The BCI Pill is a tiny, bio-compatible capsule that completely replaces your screens, keypads, and communication decks. By safely releasing microscopic builders directly into your neural pathways, it compiles a fully integrated bio-computer in your brain. No screens. No weight. Just pure connection.
                  </p>
                </div>
              )}

              {activeTab === 'payload' && (
                <div style={{ animation: 'slide-in-fast 0.25s ease-out' }}>
                  <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', color: 'var(--color-accent)', marginBottom: '8px', fontWeight: 'bold' }}>
                    Ingeniously organic. Dissolves in minutes.
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                    We made the pill shell out of pure, plant-based cellulose. It feels like swallowing a standard vitamin, but acts like a smart delivery capsule. Once in your system, it dissolves gently in under 4 minutes, releasing its intelligent nanobot payload safely into the bloodstream without a single side effect.
                  </p>
                </div>
              )}

              {activeTab === 'assembly' && (
                <div style={{ animation: 'slide-in-fast 0.25s ease-out' }}>
                  <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', color: 'var(--color-accent)', marginBottom: '8px', fontWeight: 'bold' }}>
                    12 million tiny builders. Working in harmony.
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                    Inside each capsule is a network of 12.4 million microscopic biocompatible nodes. Powered by your body’s natural glucose, these smart nodes navigate safely to the cerebral cortex. They map and connect with your brain's existing synapses without changing who you are.
                  </p>
                </div>
              )}

              {activeTab === 'eclipse' && (
                <div style={{ animation: 'slide-in-fast 0.25s ease-out' }}>
                  <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', color: 'var(--color-accent)', marginBottom: '8px', fontWeight: 'bold' }}>
                    Goodbye screens. Hello visual infinity.
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                    Once synced, the bio-computer communicates directly with your visual cortex. Digital interfaces appear floating naturally in your field of vision, only visible to you. Send messages, navigate Ares City, and access the quantum net instantly—no pockets, no wires, no chargers.
                  </p>
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
                {/* SVG 1: Overview Tab — Synaptic Grid Compilation */}
                {activeTab === 'overview' && (
                  <svg width="100%" height="220" viewBox="0 0 100 100" style={{ display: 'block' }}>
                    {/* Grid Layout Background */}
                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                    {/* Brain Outline Path */}
                    <path 
                      d="M 50 15 C 30 15, 20 25, 20 45 C 20 60, 30 75, 45 80 C 47 82, 53 82, 55 80 C 70 75, 80 60, 80 45 C 80 25, 70 15, 50 15 Z" 
                      fill="none" 
                      stroke="rgba(var(--color-accent-rgb), 0.3)" 
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                    />

                    {/* Scanning laser line sweeping vertically */}
                    <line x1="15" y1="0" x2="85" y2="0" stroke="rgba(var(--color-accent-rgb), 0.6)" strokeWidth="1">
                      <animate attributeName="y1" values="15;80;15" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="y2" values="15;80;15" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;1;0.2" dur="4s" repeatCount="indefinite" />
                    </line>

                    {/* Glowing Neural Grid Compilation */}
                    <g>
                      {/* Connection lines */}
                      <line x1="35" y1="35" x2="50" y2="30" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.4">
                        <animate attributeName="opacity" values="0.1;0.7;0.1" dur="3s" repeatCount="indefinite" />
                      </line>
                      <line x1="50" y1="30" x2="65" y2="35" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.4">
                        <animate attributeName="opacity" values="0.7;0.1;0.7" dur="3s" repeatCount="indefinite" />
                      </line>
                      <line x1="35" y1="35" x2="30" y2="55" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.4" />
                      <line x1="65" y1="35" x2="70" y2="55" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.4" />
                      <line x1="30" y1="55" x2="50" y2="65" stroke="#00ff88" strokeWidth="0.5" opacity="0.4">
                        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" />
                      </line>
                      <line x1="70" y1="55" x2="50" y2="65" stroke="#00f0ff" strokeWidth="0.5" opacity="0.4">
                        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                      </line>
                      <line x1="50" y1="30" x2="50" y2="65" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.2" />

                      {/* Pulsing Synapses */}
                      <circle cx="35" cy="35" r="2.5" fill="var(--color-accent)">
                        <animate attributeName="r" values="2;3.5;2" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="65" cy="35" r="2.5" fill="var(--color-accent)">
                        <animate attributeName="r" values="2.5;1.5;2.5" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="50" cy="30" r="3" fill="#00ff88">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="30" cy="55" r="2.5" fill="#00ff88">
                        <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="70" cy="55" r="2.5" fill="#00f0ff">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="50" cy="65" r="3.5" fill="var(--color-accent)">
                        <animate attributeName="r" values="3.5;5;3.5" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </svg>
                )}

                {/* SVG 2: Payload Tab — Capsule (The Pill) Dissolving */}
                {activeTab === 'payload' && (
                  <svg width="100%" height="220" viewBox="0 0 100 100" style={{ display: 'block' }}>
                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                    
                    {/* Dissolving Capsule Shell */}
                    <path 
                      d="M 25 50 C 25 40, 35 40, 50 40 L 50 60 C 35 60, 25 60, 25 50 Z" 
                      fill="none" 
                      stroke="var(--color-accent)" 
                      strokeWidth="1.5"
                    >
                      <animate attributeName="stroke-dasharray" values="100; 15; 100" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.95;0.4;0.95" dur="3s" repeatCount="indefinite" />
                    </path>
                    
                    <path 
                      d="M 75 50 C 75 40, 65 40, 50 40 L 50 60 C 65 60, 75 60, 75 50 Z" 
                      fill="none" 
                      stroke="#00f0ff" 
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                    >
                      <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite" />
                    </path>

                    {/* Cellulose particles dissolving away */}
                    <g fill="var(--color-accent)" opacity="0.6">
                      <circle cx="45" cy="40" r="1.2">
                        <animate attributeName="cx" values="45;32" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="40;25" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="55" cy="60" r="0.9">
                        <animate attributeName="cx" values="55;68" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="60;72" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </g>

                    {/* Capsule Core Nanobots Swarm inside */}
                    <g>
                      <circle cx="40" cy="50" r="2.2" fill="#00ff88">
                        <animate attributeName="cx" values="40;48;40" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="50;46;50" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="60" cy="48" r="1.8" fill="#00f0ff">
                        <animate attributeName="cx" values="60;51;60" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="48;53;48" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="50" cy="52" r="2" fill="var(--color-accent)">
                        <animate attributeName="cy" values="52;44;52" dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="cx" values="50;55;50" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="45" cy="46" r="1.5" fill="#ffffff">
                        <animate attributeName="cy" values="46;53;46" dur="1.7s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="55" cy="54" r="1.2" fill="#00ff88">
                        <animate attributeName="cx" values="55;46;55" dur="2.2s" repeatCount="indefinite" />
                      </circle>
                    </g>

                    {/* Active release halo */}
                    <ellipse cx="50" cy="50" rx="14" ry="11" fill="none" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1">
                      <animate attributeName="rx" values="14;36" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="ry" values="11;28" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite" />
                    </ellipse>
                  </svg>
                )}

                {/* SVG 3: Assembly Tab — Synaptic Cleft Gap Assembly */}
                {activeTab === 'assembly' && (
                  <svg width="100%" height="220" viewBox="0 0 100 100" style={{ display: 'block' }}>
                    {/* Left Axon Terminal membrane (pre-synaptic) */}
                    <path 
                      d="M -10 20 L 25 20 C 35 20, 38 30, 38 50 C 38 70, 35 80, 25 80 L -10 80" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.12)" 
                      strokeWidth="1.5" 
                    />
                    <path 
                      d="M -10 20 L 25 20 C 35 20, 38 30, 38 50 C 38 70, 35 80, 25 80 L -10 80" 
                      fill="none" 
                      stroke="var(--color-accent)" 
                      strokeWidth="1" 
                      opacity="0.65"
                    />

                    {/* Right Dendrite membrane (post-synaptic) */}
                    <path 
                      d="M 110 20 L 75 20 C 65 20, 62 30, 62 50 C 62 70, 65 80, 75 80 L 110 80" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.12)" 
                      strokeWidth="1.5" 
                    />
                    <path 
                      d="M 110 20 L 75 20 C 65 20, 62 30, 62 50 C 62 70, 65 80, 75 80 L 110 80" 
                      fill="none" 
                      stroke="#00f0ff" 
                      strokeWidth="1" 
                      opacity="0.65"
                    />

                    {/* Post-synaptic Receptors */}
                    <circle cx="63" cy="30" r="1.5" fill="#00f0ff" />
                    <circle cx="62" cy="50" r="1.5" fill="#00f0ff" />
                    <circle cx="63" cy="70" r="1.5" fill="#00f0ff" />

                    {/* Transmitter vesicles inside pre-synaptic terminal */}
                    <circle cx="20" cy="35" r="2.5" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" />
                    <circle cx="15" cy="50" r="3" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" />
                    <circle cx="22" cy="62" r="2" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" />

                    {/* Active builder nanobots self-assembling in the gap */}
                    {/* Builder Nanobot A */}
                    <g transform="translate(43, 33)">
                      <circle cx="0" cy="0" r="2.2" fill="#00ff88">
                        <animate attributeName="r" values="2.2;3.2;2.2" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                      <line x1="-5" y1="0" x2="5" y2="0" stroke="#00ff88" strokeWidth="0.5" />
                      <line x1="0" y1="-5" x2="0" y2="5" stroke="#00ff88" strokeWidth="0.5" />
                    </g>

                    {/* Builder Nanobot B */}
                    <g transform="translate(54, 52)">
                      <circle cx="0" cy="0" r="2.2" fill="var(--color-accent)">
                        <animate attributeName="r" values="2.2;3.2;2.2" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                      <line x1="-4" y1="-4" x2="4" y2="4" stroke="var(--color-accent)" strokeWidth="0.5" />
                      <line x1="-4" y1="4" x2="4" y2="-4" stroke="var(--color-accent)" strokeWidth="0.5" />
                    </g>

                    {/* Builder Nanobot C */}
                    <g transform="translate(46, 68)">
                      <circle cx="0" cy="0" r="2.2" fill="#00f0ff">
                        <animate attributeName="r" values="2.2;3.2;2.2" dur="1.4s" repeatCount="indefinite" />
                      </circle>
                      <line x1="-5" y1="0" x2="5" y2="0" stroke="#00f0ff" strokeWidth="0.5" />
                      <line x1="0" y1="-5" x2="0" y2="5" stroke="#00f0ff" strokeWidth="0.5" />
                    </g>

                    {/* Synaptic signals (firing laser paths) bridging the assembly */}
                    <path d="M 38 35 L 43 33" stroke="#00ff88" strokeWidth="0.8" opacity="0.6">
                      <animate attributeName="stroke-dasharray" values="0,10; 10,0" dur="1s" repeatCount="indefinite" />
                    </path>
                    <path d="M 43 33 L 63 30" stroke="#00ff88" strokeWidth="0.8" opacity="0.6">
                      <animate attributeName="stroke-dasharray" values="0,10; 10,0" dur="1s" repeatCount="indefinite" />
                    </path>
                    
                    <path d="M 38 50 L 54 52" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.6">
                      <animate attributeName="stroke-dasharray" values="0,10; 10,0" dur="1.4s" repeatCount="indefinite" />
                    </path>
                    <path d="M 54 52 L 62 50" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.6">
                      <animate attributeName="stroke-dasharray" values="0,10; 10,0" dur="1.4s" repeatCount="indefinite" />
                    </path>

                    <path d="M 38 65 L 46 68" stroke="#00f0ff" strokeWidth="0.8" opacity="0.6">
                      <animate attributeName="stroke-dasharray" values="0,10; 10,0" dur="1.2s" repeatCount="indefinite" />
                    </path>
                    <path d="M 46 68 L 63 70" stroke="#00f0ff" strokeWidth="0.8" opacity="0.6">
                      <animate attributeName="stroke-dasharray" values="0,10; 10,0" dur="1.2s" repeatCount="indefinite" />
                    </path>

                    {/* Scanning sync line */}
                    <path 
                      d="M 50 15 A 35 35 0 0 1 50 85" 
                      fill="none" 
                      stroke="rgba(0, 240, 255, 0.15)" 
                      strokeWidth="1.5"
                      strokeDasharray="5,10"
                    >
                      <animate attributeName="stroke-dashoffset" values="0; 30" dur="3s" repeatCount="indefinite" />
                    </path>
                  </svg>
                )}

                {/* SVG 4: Eclipse Tab — HUD Overlay visual */}
                {activeTab === 'eclipse' && (
                  <svg width="100%" height="220" viewBox="0 0 100 100" style={{ display: 'block' }}>
                    {/* HUD Circular reticles */}
                    <circle cx="50" cy="50" r="36" stroke="rgba(var(--color-accent-rgb), 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="50" cy="50" r="29" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1.5" strokeDasharray="6,4" fill="none">
                      <animateTransform 
                        attributeName="transform" 
                        type="rotate" 
                        from="0 50 50" 
                        to="360 50 50" 
                        dur="15s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                    
                    <circle cx="50" cy="50" r="22" stroke="var(--color-accent)" strokeWidth="0.8" strokeDasharray="4,12" fill="none">
                      <animateTransform 
                        attributeName="transform" 
                        type="rotate" 
                        from="360 50 50" 
                        to="0 50 50" 
                        dur="10s" 
                        repeatCount="indefinite" 
                      />
                    </circle>

                    {/* Diagnostics crosshair alignment */}
                    <line x1="50" y1="8" x2="50" y2="20" stroke="var(--color-accent)" strokeWidth="1" />
                    <line x1="50" y1="80" x2="50" y2="92" stroke="var(--color-accent)" strokeWidth="1" />
                    <line x1="8" y1="50" x2="20" y2="50" stroke="var(--color-accent)" strokeWidth="1" />
                    <line x1="80" y1="50" x2="92" y2="50" stroke="var(--color-accent)" strokeWidth="1" />

                    {/* Dynamic HUD corners */}
                    <path d="M 28 32 L 28 27 L 33 27" fill="none" stroke="#00ff88" strokeWidth="1.2" />
                    <path d="M 72 32 L 72 27 L 67 27" fill="none" stroke="#00ff88" strokeWidth="1.2" />
                    <path d="M 28 68 L 28 73 L 33 73" fill="none" stroke="#00ff88" strokeWidth="1.2" />
                    <path d="M 72 68 L 72 73 L 67 73" fill="none" stroke="#00ff88" strokeWidth="1.2" />

                    {/* Center focus indicator */}
                    <circle cx="50" cy="50" r="2.5" fill="#ffffff">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
                    </circle>

                    {/* Simulated bio-data streams scrolling overlay */}
                    <g fill="#00f0ff" opacity="0.7" fontSize="3.2" fontFamily="monospace" fontWeight="bold">
                      <text x="56" y="38">SYS_UP: 99.8%</text>
                      <text x="56" y="44">CORTEX: READY</text>
                      <text x="56" y="50">BCI_LINK: EST</text>
                      <text x="56" y="56">PING: 0.12ms</text>
                    </g>
                    
                    <g fill="var(--color-accent)" opacity="0.7" fontSize="3.2" fontFamily="monospace" fontWeight="bold">
                      <text x="22" y="38">MY50</text>
                      <text x="21" y="44">SEC_B</text>
                      <text x="22" y="50">ECLIPSE</text>
                    </g>

                    {/* Horizon display grid */}
                    <path d="M 12 50 C 35 48, 65 48, 88 50" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.8" />
                  </svg>
                )}

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
