'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles.css';

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

      <div className={`walking-content-container ${transitState} research-content-container research-content-layout`}>
        
        {/* Lab Header Panel */}
        <div className="bubbly-panel research-header-panel research-header-panel--accent">
          <h2 className="research-title-text">
            ARES RESEARCH LAB // SECTOR 02
          </h2>
          <p className="research-desc-text">
            Ares Research Lab is where we dream and build the future of Martian life. Explore speculative projects designed to redefine human capability.
          </p>
        </div>

        {/* Featured Project Showcase: BCI Nanobot Pill */}
        <Link href="/research/nanobot-pill" className="bubbly-panel showcase-card research-showcase-card">
          
          {/* Subtle grid pattern background to enhance premium feeling */}
          <div className="research-grid-bg"></div>

          <div className="research-card-content">
            <div className="research-card-details">
              <span className="research-card-system-label">
                PROJECT // SYSTEM_BIOTECH_INTERFACE
              </span>
              
              <h3 className="showcase-title research-card-headline">
                BCI Nanobot Pill <span className="card-arrow research-card-arrow">➔</span>
              </h3>
              
              <p className="showcase-desc research-card-summary">
                A swallowable bio-compatible capsule that releases localized neural nanobots into the brain. These nanobots navigate to the cerebral cortex and assemble a fully integrated bio-computer directly within the neural pathways, rendering all physical devices, screens, and terminals completely redundant.
              </p>
              
              {/* Spec list */}
              <div className="showcase-specs-grid research-card-specs">
                <div>
                  <span className="spec-label research-spec-lbl">SPECULATIVE DEPLOYMENT</span>
                  <span className="spec-value research-spec-val">MY50 (Martian Year 50)</span>
                </div>
                <div>
                  <span className="spec-label research-spec-lbl">COMPLEXITY INDEX</span>
                  <span className="spec-value research-spec-val-accent">99% (CLASS-A STAGE)</span>
                </div>
                <div>
                  <span className="spec-label research-spec-lbl">INTERFACE TARGET</span>
                  <span className="spec-value research-spec-val">Cerebral Cortex Assembly</span>
                </div>
                <div>
                  <span className="spec-label research-spec-lbl">PROJECT STATUS</span>
                  <span className="spec-value research-spec-val-status">✓ UNDER PROPOSAL</span>
                </div>
              </div>

              {/* High-tech Action CTA Button */}
              <div className="research-card-action">
                <span className="hud-btn card-cta-btn">
                  [ LAUNCH SPEC ➔ ]
                </span>
              </div>
            </div>

            {/* BCI Telemetry Visual Frame */}
            <div className="bci-monitor-box research-telemetry-box">
              {/* Dissolve Terminal Hover Overlay */}
              <div className="monitor-hover-overlay">
                <span className="overlay-text">[ LAUNCH LINK ]</span>
                <span style={{ fontSize: '0.55rem', color: '#00ff88', marginTop: '8px', fontFamily: 'monospace', letterSpacing: '1px' }}>
                  READY FOR EXECUTION
                </span>
              </div>

              <span className="bci-monitor-title research-telemetry-title">
                BCI_SYNAPSE_MONITOR
              </span>
              
              {/* Factored out animated SVG representing the BCI Nanobot Pill in action */}
              <img 
                className="bci-monitor-svg research-telemetry-svg"
                src="/assets/svgs/bci_card_monitor.svg" 
                alt="BCI Synapse Monitor" 
                width="120" 
                height="120" 
              />

              <div className="research-telemetry-progress">
                <div className="bci-monitor-stats research-telemetry-stats">
                  <span>NANOBOT ASSEMBLY</span>
                  <span className="research-telemetry-status-value">ACTIVE</span>
                </div>
                <div className="hud-progress-container research-progress-track">
                  <div className="hud-progress-fill research-progress-fill"></div>
                </div>
              </div>
            </div>
          </div>

        </Link>

      </div>
    </div>
  );
}
