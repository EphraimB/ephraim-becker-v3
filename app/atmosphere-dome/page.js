'use client';

import { useState, useEffect } from 'react';
import CityGridMap from '../../components/CityGridMap';

export default function AtmosphereDome() {
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
            Biosphere Dome Environmental Controls
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Monitor cyber-botanical oxygen exhaust fields, atmospheric pressure regulation, and cascading geothermal drip metrics across the Agricultural Agri-Grid sector:
          </p>
        </div>

        {/* Content columns split into bubbly panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '25px', flex: 1, minHeight: 0 }}>
          
          {/* Left Column Bubbly Environmental panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* O2 Saturation Bubbly Panel */}
            <div className="bubbly-panel" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>O₂ SATURATION</span>
                <span style={{ color: 'var(--neon-emerald)', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-tech)' }}>21.4%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '85%', background: 'var(--neon-emerald)' }}></div>
              </div>
              <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Normal humanoid breathability thresholds.</span>
            </div>

            {/* Pressure Bubbly Panel */}
            <div className="bubbly-panel" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>ATM PRESSURE</span>
                <span style={{ color: 'var(--neon-emerald)', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-tech)' }}>101.3 kPa</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', background: 'var(--neon-emerald)' }}></div>
              </div>
              <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>1.00 Earth Standard atmospheres nominal.</span>
            </div>

            {/* Biomass Bubbly Panel */}
            <div className="bubbly-panel" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>BIOMASS INTENSITY</span>
                <span style={{ color: 'var(--neon-emerald)', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-tech)' }}>94.6%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '94.6%', background: 'var(--neon-emerald)' }}></div>
              </div>
              <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Cyber-botanical yield and soil indices.</span>
            </div>

          </div>

          {/* Right Column Bubbly Stabilizing graph & telemetry */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* stabilizing SVG bubbly panel */}
            <div className="bubbly-panel" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.62rem', color: 'var(--color-accent)', position: 'absolute', top: '15px', left: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Microclimate Stabilization Loops
              </span>

              {/* Geodesic Dome SVG Schematic */}
              <svg width="180px" height="130px" viewBox="0 0 100 80" style={{ marginTop: '10px' }}>
                <path d="M 10 70 A 40 40 0 0 1 90 70 Z" fill="none" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="1.5" />
                <path d="M 20 70 A 30 30 0 0 1 80 70 Z" fill="none" stroke="rgba(0, 255, 136, 0.08)" strokeWidth="1" />
                <line x1="50%" y1="70" x2="50%" y2="30" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="25%" y1="70" x2="35%" y2="40" stroke="rgba(0, 255, 136, 0.1)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="75%" y1="70" x2="65%" y2="40" stroke="rgba(0, 255, 136, 0.1)" strokeWidth="1" strokeDasharray="2 2" />
                
                <circle cx="50" cy="30" r="3" fill="var(--color-accent)" style={{ animation: 'pulse-node 1.5s infinite alternate' }} />
                <circle cx="35" cy="40" r="2" fill="var(--neon-emerald)" style={{ animation: 'pulse-node 2s infinite alternate' }} />
                <circle cx="65" cy="40" r="2" fill="var(--neon-emerald)" style={{ animation: 'pulse-node 2.2s infinite alternate' }} />
              </svg>
              
              <div style={{ marginTop: '12px', textAlign: 'center', fontFamily: 'var(--font-tech)', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                CURRENT MICROCLIMATE PROFILE: <span style={{ color: 'var(--text-primary)' }}>SUB-TROPICAL AGRI-SHIELD-02</span>
              </div>
            </div>

            {/* Dials row bubbly panels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
              
              {/* Humidity bubbly panel */}
              <div className="bubbly-panel" style={{ textAlign: 'center', padding: '15px' }}>
                <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>HUMIDITY LOCK</span>
                <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-tech)', color: 'var(--text-primary)', fontWeight: 700, marginTop: '2px' }}>
                  62.8%
                </div>
              </div>

              {/* CO2 bubbly panel */}
              <div className="bubbly-panel" style={{ textAlign: 'center', padding: '15px' }}>
                <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CO₂ DISSIPATION</span>
                <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-tech)', color: 'var(--text-primary)', fontWeight: 700, marginTop: '2px' }}>
                  390 ppm
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes pulse-node {
          from { opacity: 0.3; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 4px var(--color-accent)); }
        }
      `}</style>
    </div>
  );
}
