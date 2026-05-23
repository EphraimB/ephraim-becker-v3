'use client';

import { useState, useEffect } from 'react';
import CityGridMap from '../../components/CityGridMap';

export default function PortfolioDome() {
  const [transitState, setTransitState] = useState('slide-active');

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
    <div className="citizen-card-shell" style={{ flexDirection: 'column' }}>
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Floating navigation map bubble */}
      <div className="floating-nav-bubble">
        <CityGridMap />
      </div>

      {/* Bubbly floating content area */}
      <div className={`walking-content-container ${transitState}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        
        {/* Intro Bubbly Panel */}
        <div className="bubbly-panel" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
            Holographic Project Archives
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Browse the engineering software systems, databases, and structural code repositories designed by Ephraim Becker under his Adelphi computer science coursework and Ares remote study link:
          </p>
        </div>

        {/* Scrollable Project Bubbles */}
        <div className="custom-scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Project 1 */}
          <div className="bubbly-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', color: 'var(--text-primary)' }}>Ares City Grid Matrix</h4>
              <span style={{ fontSize: '0.58rem', border: '1px solid var(--neon-emerald)', color: 'var(--neon-emerald)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)' }}>
                OPERATIONAL
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '10px' }}>
              Designed a distributed routing matrix coordinating autonomous bullet hyperloops across all 5 key sectors. Achieved a **99.98% transit efficiency index** and eliminated node congestion bottlenecks.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '0.62rem', background: 'rgba(255, 255, 255, 0.03)', padding: '1px 6px', borderRadius: '3px', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>Vanilla ES6+</span>
                <span style={{ fontSize: '0.62rem', background: 'rgba(255, 255, 255, 0.03)', padding: '1px 6px', borderRadius: '3px', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>HTML5 Canvas</span>
              </div>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)' }}>MY37 - Present</span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bubbly-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', color: 'var(--text-primary)' }}>Quantum Net Link (QNL-1)</h4>
              <span style={{ fontSize: '0.58rem', border: '1px solid var(--neon-emerald)', color: 'var(--neon-emerald)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)' }}>
                ONLINE
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '10px' }}>
              Authored the primary sub-atomic noise-filtering library for deep space communications. Enables clear signal transmission through high-density solar storm radiation fields using spectral algorithms.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '0.62rem', background: 'rgba(255, 255, 255, 0.03)', padding: '1px 6px', borderRadius: '3px', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>WebSockets</span>
                <span style={{ fontSize: '0.62rem', background: 'rgba(255, 255, 255, 0.03)', padding: '1px 6px', borderRadius: '3px', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>Signal Processors</span>
              </div>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)' }}>MY36</span>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bubbly-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', color: 'var(--text-primary)' }}>Eco-Dome Microclimate Automator</h4>
              <span style={{ fontSize: '0.58rem', border: '1px solid var(--neon-emerald)', color: 'var(--neon-emerald)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)' }}>
                NOMINAL
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '10px' }}>
              Engineered automated feedback loops for cascading hydroponic columns inside the Biosphere Sector. Coordinates dome humidity, light frequencies, and nutrient drips based on real-time botanical oxygen-exhaust telemetry.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '0.62rem', background: 'rgba(255, 255, 255, 0.03)', padding: '1px 6px', borderRadius: '3px', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>SVG Telemetry</span>
                <span style={{ fontSize: '0.62rem', background: 'rgba(255, 255, 255, 0.03)', padding: '1px 6px', borderRadius: '3px', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>JSON Sync</span>
              </div>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)' }}>MY35</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
