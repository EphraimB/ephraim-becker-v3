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
      {/* Local high-tech hover and animation styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .showcase-card {
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s, box-shadow 0.3s !important;
        }
        .showcase-card:hover {
          transform: translateY(-4px) scale(1.015) !important;
          border-color: var(--color-accent) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.1),
                      0 0 45px rgba(var(--color-accent-rgb), 0.3) !important;
        }
        .showcase-card:hover h3 {
          color: var(--color-accent) !important;
          text-shadow: 0 0 8px rgba(var(--color-accent-rgb), 0.4);
        }
        .showcase-card:hover .card-arrow {
          transform: translateX(5px);
        }
        .showcase-card:hover .hud-btn {
          background: rgba(var(--color-accent-rgb), 0.16) !important;
          border-color: var(--color-accent) !important;
          box-shadow: 0 0 12px rgba(var(--color-accent-rgb), 0.35) !important;
          color: var(--color-accent) !important;
        }
        .monitor-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(4, 6, 12, 0.95);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s ease;
          z-index: 5;
        }
        .showcase-card:hover .monitor-hover-overlay {
          opacity: 1;
        }
        .monitor-hover-overlay .overlay-text {
          font-family: var(--font-tech);
          color: var(--color-accent);
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          text-shadow: 0 0 8px rgba(var(--color-accent-rgb), 0.6);
          animation: pulse-glow 1.2s infinite alternate ease-in-out;
        }
        @keyframes pulse-glow {
          0% { transform: scale(0.96); opacity: 0.7; }
          100% { transform: scale(1.04); opacity: 1; }
        }
        .card-cta-btn {
          padding: 8px 16px !important;
          font-size: 0.65rem !important;
        }
        @media (max-width: 900px) {
          .showcase-card {
            padding: 16px 20px !important;
          }
          .showcase-title {
            font-size: 1.2rem !important;
            margin: 4px 0 8px 0 !important;
          }
          .showcase-desc {
            font-size: 0.76rem !important;
            line-height: 1.45 !important;
            margin-bottom: 12px !important;
          }
          .showcase-specs-grid {
            gap: 8px 12px !important;
            padding-top: 10px !important;
            margin-bottom: 12px !important;
          }
          .spec-label {
            font-size: 0.5rem !important;
          }
          .spec-value {
            font-size: 0.72rem !important;
          }
          .card-cta-btn {
            padding: 5px 10px !important;
            font-size: 0.52rem !important;
          }
          /* Resize BCI Monitor Box to be much smaller and compact on mobile */
          .bci-monitor-box {
            width: 170px !important;
            height: 170px !important;
            padding: 10px !important;
            border-radius: 8px !important;
            box-shadow: 0 0 10px rgba(var(--color-accent-rgb), 0.08) !important;
          }
          .bci-monitor-svg {
            width: 75px !important;
            height: 75px !important;
            margin: 4px 0 !important;
          }
          .bci-monitor-title {
            font-size: 0.48rem !important;
          }
          .bci-monitor-stats {
            font-size: 0.46rem !important;
          }
          .monitor-hover-overlay .overlay-text {
            font-size: 0.65rem !important;
            letter-spacing: 1px !important;
          }
        }
      `}} />

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
        <Link href="/research/nanobot-pill" className="bubbly-panel showcase-card" style={{ padding: '30px', position: 'relative', overflow: 'hidden', display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
          
          {/* Subtle grid pattern background to enhance premium feeling */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', background: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', zIndex: 1, position: 'relative' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 'bold', letterSpacing: '1px' }}>
                PROJECT // SYSTEM_BIOTECH_INTERFACE
              </span>
              
              <h3 className="showcase-title" style={{ fontFamily: 'var(--font-tech)', fontSize: '1.6rem', color: '#ffffff', margin: '6px 0 15px 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                BCI Nanobot Pill <span style={{ color: 'var(--color-accent)', fontSize: '1.3rem', transition: 'transform 0.25s ease' }} className="card-arrow">➔</span>
              </h3>
              
              <p className="showcase-desc" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '20px' }}>
                A swallowable bio-compatible capsule that releases localized neural nanobots into the brain. These nanobots navigate to the cerebral cortex and assemble a fully integrated bio-computer directly within the neural pathways, rendering all physical devices, screens, and terminals completely redundant.
              </p>
              
              {/* Spec list */}
              <div className="showcase-specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '15px' }}>
                <div>
                  <span className="spec-label" style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>SPECULATIVE DEPLOYMENT</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', color: '#ffffff', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>MY50 (Martian Year 50)</span>
                </div>
                <div>
                  <span className="spec-label" style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>COMPLEXITY INDEX</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>99% (CLASS-A STAGE)</span>
                </div>
                <div>
                  <span className="spec-label" style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>INTERFACE TARGET</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', color: '#ffffff', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>Cerebral Cortex Assembly</span>
                </div>
                <div>
                  <span className="spec-label" style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>PROJECT STATUS</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', color: '#00ff88', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>✓ UNDER PROPOSAL</span>
                </div>
              </div>

              {/* High-tech Action CTA Button */}
              <div style={{ marginTop: '20px' }}>
                <span className="hud-btn card-cta-btn">
                  [ LAUNCH SPEC ➔ ]
                </span>
              </div>
            </div>

            {/* BCI Telemetry Visual Frame */}
            <div 
              className="bci-monitor-box"
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
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Dissolve Terminal Hover Overlay */}
              <div className="monitor-hover-overlay">
                <span className="overlay-text">[ LAUNCH LINK ]</span>
                <span style={{ fontSize: '0.55rem', color: '#00ff88', marginTop: '8px', fontFamily: 'monospace', letterSpacing: '1px' }}>
                  READY FOR EXECUTION
                </span>
              </div>

              <span className="bci-monitor-title" style={{ fontSize: '0.55rem', color: 'var(--color-accent)', fontFamily: 'monospace', letterSpacing: '1px', fontWeight: 'bold' }}>
                BCI_SYNAPSE_MONITOR
              </span>
              
              {/* Factored out animated SVG representing the BCI Nanobot Pill in action */}
              <img 
                className="bci-monitor-svg"
                src="/assets/svgs/bci_card_monitor.svg" 
                alt="BCI Synapse Monitor" 
                width="120" 
                height="120" 
                style={{ display: 'block', margin: '10px 0' }} 
              />

              <div style={{ width: '100%' }}>
                <div className="bci-monitor-stats" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', fontFamily: 'monospace', color: 'var(--text-secondary)', marginBottom: '3px' }}>
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
