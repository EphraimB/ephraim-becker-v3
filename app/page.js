'use client';

import { useState, useEffect } from 'react';
import CityGridMap from '../components/CityGridMap';

export default function CitizenSuite() {
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

      {/* Bubbly floating panel columns */}
      <div className={`walking-content-container homepage-grid ${transitState}`}>
        
        {/* Far-Left Column: Roomscale Standing Profile Spacer */}
        <div className="roomscale-profile-spacer" style={{ width: '100%', height: '100%' }}></div>

        {/* Left Column Bubbly Panels */}
        <div className="left-card-column" style={{ gap: '20px' }}>
          
          {/* Registry Stats Bubbly Panel */}
          <div className="bubbly-panel">
            <h2 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '4px', textAlign: 'center' }}>
              EPHRAIM BECKER
            </h2>
            <div style={{ fontSize: '0.62rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center', marginBottom: '14px' }}>
              Computer Science Major
            </div>

            <div style={{
              fontSize: '0.78rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Affiliation</span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Adelphi University</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Registry Age</span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>15 Mars Years</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Clearance</span>
                <span style={{ color: 'var(--neon-emerald)', fontWeight: 600, letterSpacing: '0.5px' }}>CLASS-A REMOTE</span>
              </div>
            </div>
          </div>

          {/* Social Media Ports Bubbly Panel */}
          <div className="bubbly-panel">
            <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.62rem', color: 'var(--color-accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center', display: 'block' }}>
              Social Media Ports
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              <a href="https://github.com/EphraimB" target="_blank" rel="noopener noreferrer" className="social-link-port" style={{ padding: '6px 8px', fontSize: '0.6rem', textAlign: 'center', justifyContent: 'center' }}>GitHub</a>
              <a href="https://www.linkedin.com/in/ephraim-becker/" target="_blank" rel="noopener noreferrer" className="social-link-port" style={{ padding: '6px 8px', fontSize: '0.6rem', textAlign: 'center', justifyContent: 'center' }}>LinkedIn</a>
              <a href="https://www.instagram.com/ephraim.becker/" target="_blank" rel="noopener noreferrer" className="social-link-port" style={{ padding: '6px 8px', fontSize: '0.6rem', textAlign: 'center', justifyContent: 'center' }}>Instagram</a>
              <a href="https://twitter.com/emb180" target="_blank" rel="noopener noreferrer" className="social-link-port" style={{ padding: '6px 8px', fontSize: '0.6rem', textAlign: 'center', justifyContent: 'center' }}>X (Twitter)</a>
              <a href="https://www.youtube.com/channel/UCIHxAXYLxYlNaQiv0do0bUg" target="_blank" rel="noopener noreferrer" className="social-link-port" style={{ padding: '6px 8px', fontSize: '0.6rem', textAlign: 'center', justifyContent: 'center' }}>YouTube</a>
              <a href="https://www.facebook.com/ephraim.becker/" target="_blank" rel="noopener noreferrer" className="social-link-port" style={{ padding: '6px 8px', fontSize: '0.6rem', textAlign: 'center', justifyContent: 'center' }}>Facebook</a>
            </div>
          </div>

        </div>

        {/* Right Column Bubbly Panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0 }} className="custom-scroll">
          
          {/* Bio Bubbly Panel */}
          <div className="bubbly-panel">
            <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.8rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Biography Overview
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              I am Ephraim Becker, an undergraduate Computer Science student at **Adelphi University** on Earth, linked remotely to the **Ares City Dome Grid** from Cedarhurst, NY. As a Remote Cadet in the Martian academic cohort, I study advanced systems architecture, coordinate subspace communications logs, and research distributed hyperloop network modeling.
            </p>
          </div>

          {/* Interests Bubbly Panel */}
          <div className="bubbly-panel" style={{ padding: '20px 24px' }}>
            <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.8rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Interests & Passions
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <span className="hud-badge" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>💻 Technology & Coding</span>
              <span className="hud-badge" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>🎬 Sci-Fi / Fantasy</span>
              <span className="hud-badge" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>🎵 Music</span>
              <span className="hud-badge" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>🚴 Biking</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
