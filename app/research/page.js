'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ResearchLab() {
  const [transitState, setTransitState] = useState('slide-active');
  const [activeTelemetry, setActiveTelemetry] = useState(true);

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

  return (
    <div className="citizen-card-shell research-shell">
      {/* Immersive Transit Sweeper Overlay */}
      <div className="walking-motion-overlay research-walking-overlay"></div>

      <div 
        className={`walking-content-container ${transitState} research-content-container`} 
        style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '25px', maxWidth: '850px', margin: '0 auto' }}
      >
        
        {/* Lab Header Panel */}
        <div className="bubbly-panel research-header-panel" style={{ borderLeft: '3px solid var(--color-accent)' }}>
          <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.3rem', color: 'var(--color-accent)', textShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.3)', marginBottom: '6px' }}>
            ARES RESEARCH LAB // SECTOR 02
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
            Ares Research Lab is where we dream and build the future of Martian life. Explore speculative projects designed to redefine human capability.
          </p>
        </div>

        {/* Featured Project Showcase: BCI Nanobot Pill */}
        <Link href="/research/nanobot-pill" className="bubbly-panel" style={{ padding: '30px', position: 'relative', overflow: 'hidden', display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
          
          {/* Subtle grid pattern background to enhance premium feeling */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', background: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', zIndex: 1, position: 'relative' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 'bold', letterSpacing: '1px' }}>
                PROJECT // SYSTEM_BIOTECH_INTERFACE
              </span>
              
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.6rem', color: '#ffffff', margin: '6px 0 15px 0', fontWeight: 'bold' }}>
                BCI Nanobot Pill
              </h3>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '20px' }}>
                A swallowable bio-compatible capsule that releases localized neural nanobots into the brain. These nanobots navigate to the cerebral cortex and assemble a fully integrated bio-computer directly within the neural pathways, rendering all physical devices, screens, and terminals completely redundant.
              </p>
              
              {/* Spec list */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '15px' }}>
                <div>
                  <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>SPECULATIVE DEPLOYMENT</span>
                  <span style={{ fontSize: '0.85rem', color: '#ffffff', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>MY50 (Martian Year 50)</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>COMPLEXITY INDEX</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>99% (CLASS-A STAGE)</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>INTERFACE TARGET</span>
                  <span style={{ fontSize: '0.85rem', color: '#ffffff', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>Cerebral Cortex Assembly</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>PROJECT STATUS</span>
                  <span style={{ fontSize: '0.85rem', color: '#00ff88', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>✓ UNDER PROPOSAL</span>
                </div>
              </div>
            </div>

            {/* BCI Telemetry Visual Frame */}
            <div 
              style={{ 
                width: '240px', 
                background: 'rgba(2, 3, 6, 0.9)', 
                border: '1.5px solid rgba(var(--color-accent-rgb), 0.25)', 
                borderRadius: '12px', 
                padding: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                height: '240px',
                boxShadow: '0 0 15px rgba(var(--color-accent-rgb), 0.1)',
                flexShrink: 0,
                margin: '0 auto'
              }}
            >
              <span style={{ fontSize: '0.55rem', color: 'var(--color-accent)', fontFamily: 'monospace', letterSpacing: '1px', fontWeight: 'bold' }}>
                BCI_SYNAPSE_MONITOR
              </span>
              
              {/* Custom SVG Neural Core Graphic */}
              {/* Animated SVG representation of the BCI Nanobot Pill in action */}
              <svg width="120" height="120" viewBox="0 0 100 100" style={{ margin: '10px 0' }}>
                {/* Concentric frequency waves radiating from neural sync core */}
                <circle cx="50" cy="25" r="18" stroke="rgba(var(--color-accent-rgb), 0.15)" strokeWidth="0.8" fill="none">
                  <animate attributeName="r" values="8;30" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="25" r="18" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" fill="none">
                  <animate attributeName="r" values="8;30" dur="4s" begin="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0" dur="4s" begin="2s" repeatCount="indefinite" />
                </circle>

                {/* Synaptic Net / Neural Connections */}
                <g opacity="0.85">
                  <line x1="30" y1="20" x2="50" y2="25" stroke="rgba(var(--color-accent-rgb), 0.4)" strokeWidth="0.8" />
                  <line x1="50" y1="25" x2="70" y2="20" stroke="rgba(var(--color-accent-rgb), 0.4)" strokeWidth="0.8" />
                  <line x1="30" y1="20" x2="35" y2="40" stroke="rgba(var(--color-accent-rgb), 0.4)" strokeWidth="0.8" />
                  <line x1="50" y1="25" x2="35" y2="40" stroke="rgba(var(--color-accent-rgb), 0.4)" strokeWidth="0.8" />
                  <line x1="50" y1="25" x2="65" y2="40" stroke="rgba(var(--color-accent-rgb), 0.4)" strokeWidth="0.8" />
                  <line x1="70" y1="20" x2="65" y2="40" stroke="rgba(var(--color-accent-rgb), 0.4)" strokeWidth="0.8" />

                  {/* Pulsing Synaptic Nodes */}
                  <circle cx="30" cy="20" r="3" fill="#00ff88">
                    <animate attributeName="r" values="2.2;3.8;2.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="70" cy="20" r="3" fill="#00f0ff">
                    <animate attributeName="r" values="2.2;3.8;2.2" dur="2s" begin="0.7s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="25" r="4.5" fill="var(--color-accent)">
                    <animate attributeName="r" values="3.5;5.5;3.5" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="35" cy="40" r="2.5" fill="var(--color-accent)">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="65" cy="40" r="2.5" fill="#00ff88">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Rising swarm of nanobots ascending from capsule to neural grid */}
                <circle cx="50" cy="72" r="1.2" fill="#00ff88">
                  <animate attributeName="cy" values="72;25" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="cx" values="50;40;50" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="48" cy="72" r="1" fill="#00f0ff">
                  <animate attributeName="cy" values="72;35" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                  <animate attributeName="cx" values="48;58;48" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                </circle>
                <circle cx="52" cy="72" r="0.9" fill="var(--color-accent)">
                  <animate attributeName="cy" values="72;20" dur="3.2s" begin="1.2s" repeatCount="indefinite" />
                  <animate attributeName="cx" values="52;46;52" dur="3.2s" begin="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur="3.2s" begin="1.2s" repeatCount="indefinite" />
                </circle>

                {/* Micro-Capsule Pill Core at the bottom */}
                <g>
                  {/* Subtle hover drift */}
                  <animateTransform 
                    attributeName="transform" 
                    type="translate" 
                    values="0,0; 0,-1.5; 0,0" 
                    dur="3s" 
                    repeatCount="indefinite" 
                  />
                  <g transform="rotate(-15 50 78)">
                    {/* Pill Capsule shell outline */}
                    <rect x="36" y="74" width="28" height="10" rx="5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                    {/* Active biocompatible half (neon amber) */}
                    <path d="M 36 79 A 5 5 0 0 1 41 74 L 50 74 L 50 84 L 41 84 A 5 5 0 0 1 36 79 Z" fill="var(--color-accent)" opacity="0.85" />
                    {/* Transparent half containing nanobot micro-payload */}
                    <circle cx="55" cy="77" r="0.7" fill="#00ff88" />
                    <circle cx="59" cy="80" r="0.7" fill="#00f0ff" />
                    <circle cx="54" cy="81" r="0.6" fill="var(--color-accent)" opacity="0.6" />
                  </g>
                </g>
              </svg>

              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', fontFamily: 'monospace', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                  <span>NANOBOT ASSEMBLY</span>
                  <span style={{ color: '#00ff88' }}>ACTIVE</span>
                </div>
                <div className="hud-progress-container" style={{ height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div className="hud-progress-fill" style={{ width: '99%', background: 'var(--color-accent)', height: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </Link>

      </div>
    </div>
  );
}
