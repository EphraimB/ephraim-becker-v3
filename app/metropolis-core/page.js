'use client';

import { useState, useEffect } from 'react';
import CityGridMap from '../../components/CityGridMap';

export default function MetropolisCore() {
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
            Metropolis Transit Core & Loop Status
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Central civic hyperloop registry. Oversee transit speeds, electromagnetic corridor shields, and solar storm pressure indices across the Ares City geodesic domes:
          </p>
        </div>

        {/* Content columns split into bubbly panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '25px', flex: 1, minHeight: 0 }}>
          
          {/* Left Column Bubbly Loops (Scrollable list of bubbly panels) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} className="custom-scroll">
            
            {/* Loop 1 */}
            <div className="bubbly-panel" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  METROPOLIS-CORE LOOP
                </h4>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>Ares Core Civic Transit Line</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--neon-emerald)', fontSize: '0.78rem', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>
                  982 km/h
                </div>
                <span style={{ fontSize: '0.55rem', background: 'rgba(0,255,136,0.1)', color: 'var(--neon-emerald)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)' }}>
                  OPTIMAL
                </span>
              </div>
            </div>

            {/* Loop 2 */}
            <div className="bubbly-panel" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  BIOSPHERE CORRIDOR
                </h4>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>Agricultural / Dome 02 Link</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--neon-emerald)', fontSize: '0.78rem', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>
                  740 km/h
                </div>
                <span style={{ fontSize: '0.55rem', background: 'rgba(0,255,136,0.1)', color: 'var(--neon-emerald)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)' }}>
                  NOMINAL
                </span>
              </div>
            </div>

            {/* Loop 3 */}
            <div className="bubbly-panel" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  INTER-SECTOR SIGNAL LOOP
                </h4>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>Quantum Tower Comms Line</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--neon-amber)', fontSize: '0.78rem', fontFamily: 'var(--font-tech)', fontWeight: 600 }}>
                  420 km/h
                </div>
                <span style={{ fontSize: '0.55rem', background: 'rgba(255,179,0,0.1)', color: 'var(--neon-amber)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)' }}>
                  STORM WARNING
                </span>
              </div>
            </div>

          </div>

          {/* Right Column Bubbly Stats panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Shield Diags bubbly panel */}
            <div className="bubbly-panel" style={{ gap: '12px' }}>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.65rem', color: 'var(--color-accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Shield Diagnostics
              </span>
              
              <div style={{ fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Corridor Integrity</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>99.94%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '99.94%', background: 'var(--color-accent)' }}></div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Electromagnetic Shield</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>96.2%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '96.2%', background: 'var(--color-accent)' }}></div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Coolant Flux</span>
                  <span style={{ color: 'var(--neon-emerald)', fontWeight: 600 }}>STABLE</span>
                </div>
              </div>
            </div>

            {/* Load summary bubbly panel */}
            <div className="bubbly-panel" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
                Hyperloop Network Load
              </div>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-tech)', color: 'var(--text-primary)', fontWeight: 700 }}>
                42.8%
              </div>
              <span style={{ fontSize: '0.65rem', color: 'var(--neon-emerald)' }}>LOW DOME CONGESTION</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
