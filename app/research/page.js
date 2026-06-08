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
              <svg width="120" height="120" viewBox="0 0 100 100" style={{ margin: '10px 0' }}>
                <circle cx="50" cy="50" r="45" stroke="rgba(var(--color-accent-rgb), 0.15)" strokeWidth="1" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="rgba(var(--color-accent-rgb), 0.3)" strokeWidth="1.5" strokeDasharray="5,5" fill="none" />
                
                {/* Neural Connections */}
                <line x1="50" y1="50" x2="30" y2="30" stroke="var(--color-accent)" strokeWidth="1" opacity="0.6" />
                <line x1="50" y1="50" x2="70" y2="30" stroke="var(--color-accent)" strokeWidth="1" opacity="0.6" />
                <line x1="50" y1="50" x2="40" y2="75" stroke="var(--color-accent)" strokeWidth="1" opacity="0.6" />
                <line x1="50" y1="50" x2="75" y2="65" stroke="var(--color-accent)" strokeWidth="1" opacity="0.6" />

                {/* Pulsing Nodes */}
                <circle cx="50" cy="50" r="4" fill="var(--color-accent)" />
                <circle cx="30" cy="30" r="3" fill="#00ff88" />
                <circle cx="70" cy="30" r="3" fill="#00f0ff" />
                <circle cx="40" cy="75" r="3" fill="var(--color-accent)" />
                <circle cx="75" cy="65" r="3" fill="#00ff88" />
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
