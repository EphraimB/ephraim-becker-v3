'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AresMuseum() {
  const [transitState, setTransitState] = useState('slide-active');
  const [isMounted, setIsMounted] = useState(false);

  // Live Telemetry Clock States
  const [clockData, setClockData] = useState({
    utcTime: '',
    elapsedMs: 0,
    elapsedEarthDays: 0,
    totalSols: 0,
    marsYear: 38,
    currentSol: 0,
    decimalStr: '0000',
    solFraction: 0,
  });

  // Handle slide entrance transition
  useEffect(() => {
    setIsMounted(true);
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

  // Update Live Telemetry Clock
  useEffect(() => {
    if (!isMounted) return;

    function updateTelemetry() {
      const now = new Date();
      
      // Clancy Martian Year 38 Start Epoch: Nov 12, 2024
      const my38StartUTC = Date.UTC(2024, 10, 12, 0, 0, 0);
      const timeDeltaMs = now.getTime() - my38StartUTC;
      
      const deltaEarthDays = timeDeltaMs / (1000 * 60 * 60 * 24);
      const totalSolsSinceMY38 = deltaEarthDays / 1.02749125;
      
      const solsElapsed = Math.max(0, totalSolsSinceMY38);
      const my = 38 + Math.floor(solsElapsed / 668.6);
      const currentSol = Math.floor(solsElapsed % 668.6);
      
      const solFraction = solsElapsed - Math.floor(solsElapsed);
      const decimalVal = Math.floor(solFraction * 10000);
      const decimalStr = String(decimalVal).padStart(4, '0');

      setClockData({
        utcTime: now.toUTCString(),
        elapsedMs: timeDeltaMs,
        elapsedEarthDays: deltaEarthDays,
        totalSols: totalSolsSinceMY38,
        marsYear: my,
        currentSol: currentSol,
        decimalStr: decimalStr,
        solFraction: solFraction,
      });
    }

    updateTelemetry();
    const interval = setInterval(updateTelemetry, 100);
    return () => clearInterval(interval);
  }, [isMounted]);

  return (
    <div className="citizen-card-shell museum-shell">
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay museum-walking-overlay"></div>

      {/* Styled styles locally */}
      <style dangerouslySetInnerHTML={{ __html: `
        .museum-shell {
          width: 100%;
          height: 100%;
          padding: 5px 20px 15px 20px;
          box-sizing: border-box;
          display: flex !important;
          flex-direction: column;
          justify-content: flex-start !important;
          align-items: stretch;
          overflow: hidden;
        }
        
        .museum-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding: 8px 16px;
          background: rgba(4, 6, 12, 0.72);
          border-left: 3px solid #00f0ff;
          border-right: 1px solid rgba(0, 240, 255, 0.15);
          border-top: 1px solid rgba(0, 240, 255, 0.15);
          border-bottom: 1px solid rgba(0, 240, 255, 0.15);
          border-radius: 6px;
          flex-shrink: 0;
          backdrop-filter: blur(8px);
          WebkitBackdropFilter: blur(8px);
        }
        
        .museum-header-title {
          font-family: var(--font-tech), monospace;
          font-size: 1.05rem;
          color: #00f0ff;
          margin: 0;
          letter-spacing: 1.5px;
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.35);
          line-height: 1.2;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .museum-header-desc {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-family: monospace;
        }

        /* 3-Column by 2-Row Grid Layout on Desktop to fit 5 plaques */
        .museum-grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 15px;
          flex: 1;
          min-height: 0;
          width: 100%;
        }

        .plaque-card {
          display: flex;
          flex-direction: column;
          background: rgba(4, 6, 12, 0.94) !important;
          border: 1.5px solid rgba(0, 240, 255, 0.15);
          border-radius: 10px;
          padding: 12px 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          WebkitBackdropFilter: blur(16px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .plaque-card:hover {
          border-color: #00f0ff;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.1),
                      0 0 20px rgba(0, 240, 255, 0.15);
        }

        .plaque-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 6px;
          margin-bottom: 6px;
          flex-shrink: 0;
        }

        .plaque-label {
          font-family: var(--font-tech), monospace;
          font-size: 0.65rem;
          color: #ffb300;
          letter-spacing: 1px;
          font-weight: bold;
        }

        .plaque-status {
          font-family: monospace;
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.45);
        }

        .plaque-title {
          font-family: var(--font-tech), monospace;
          font-size: 0.95rem;
          color: #ffffff;
          margin: 0 0 6px 0;
          font-weight: bold;
          flex-shrink: 0;
          line-height: 1.2;
          letter-spacing: 0.5px;
        }

        .plaque-body {
          flex: 1;
          min-height: 0;
          font-family: var(--font-sans), sans-serif;
          font-size: 0.9rem;
          line-height: 1.45;
          color: var(--text-primary);
          overflow: hidden;
        }

        .plaque-body p {
          margin: 0 0 6px 0;
        }
        .plaque-body p:last-child {
          margin: 0;
        }

        .highlight-cyan {
          color: #00f0ff;
          font-weight: 600;
        }
        
        .highlight-amber {
          color: #ffb300;
          font-weight: 600;
        }

        /* Compact Telemetry Clock Widget */
        .clock-widget-container {
          background: rgba(2, 4, 8, 0.6);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 6px;
          padding: 6px 12px;
          font-family: monospace;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .clock-readout-main {
          font-size: 1.15rem;
          color: #ffb300;
          text-align: center;
          padding: 2px 0;
          text-shadow: 0 0 8px rgba(255, 179, 0, 0.35);
          letter-spacing: 1px;
          border-bottom: 1px dashed rgba(0, 240, 255, 0.15);
          margin-bottom: 4px;
          font-weight: bold;
        }

        .telemetry-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px 12px;
        }

        .telemetry-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.64rem;
          padding: 1px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
        }

        .telemetry-label {
          color: rgba(255, 255, 255, 0.55);
        }

        .telemetry-value {
          color: #00f0ff;
          font-weight: bold;
        }

        .telemetry-constant {
          color: #00ff88;
        }

        .museum-footer {
          display: flex;
          justify-content: center;
          margin-top: 8px;
          flex-shrink: 0;
        }

        /* Responsive Mobile Layout Override */
        @media (max-width: 900px) {
          .museum-shell {
            height: auto !important;
            overflow-y: auto !important;
            padding: 10px 10px 30px 10px;
          }
          .museum-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .museum-grid-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            height: auto !important;
          }
          .plaque-card {
            grid-column: auto !important;
            flex-shrink: 0;
            height: auto !important;
          }
          .plaque-body {
            overflow: visible !important;
            font-size: 0.8rem !important;
          }
          .plaque-title {
            font-size: 0.88rem !important;
          }
          .plaque-label {
            font-size: 0.6rem !important;
          }
          .plaque-status {
            font-size: 0.55rem !important;
          }
        }
      `}} />

      {/* Immersive Header Panel */}
      <div className="museum-header">
        <h2 className="museum-header-title">
          🏛️ Ares City Museum of Web Engineering
        </h2>
        <p className="museum-header-desc">
          SYSTEM_SYNC // ARCHIVAL_EXHIBITION_DECK
        </p>
      </div>

      {/* 3-Column by 2-Row Grid Container */}
      <div className="museum-grid-container">
        
        {/* ROW 1 LEFT: PLAQUE 1 (SCI-FI INSPIRATION) */}
        <div className="plaque-card">
          <div className="plaque-header">
            <span className="plaque-label">// EXHIBIT 01: THE SCI-FI INSPIRATION</span>
            <span className="plaque-status">[ ONLINE // STABLE ]</span>
          </div>
          <h4 className="plaque-title">The Sci-Fi Passion & Ares Outpost</h4>
          <div className="plaque-body">
            <p>
              The journey to building this digital outpost began with a lifelong <span className="highlight-cyan">passion for science fiction</span>. Sci-fi has always been more than speculative storytelling—it is an inspiring lens through which we view human potential.
            </p>
            <p>
              Choosing a Martian habitat theme for this website was a natural evolution of this passion. It transforms a standard developer portfolio into an ambient, immersive simulation of <span className="highlight-amber">Ares City</span>.
            </p>
            <p>
              By placing the user inside a high-tech colony workspace (replete with HUD systems and solar clocks), the interface bridges creative sci-fi world-building with modern web engineering.
            </p>
          </div>
        </div>

        {/* ROW 1 CENTER: PLAQUE 2 (SEO & 2D WEB) */}
        <div className="plaque-card">
          <div className="plaque-header">
            <span className="plaque-label">// EXHIBIT 02: STRUCTURAL FOUNDATION</span>
            <span className="plaque-status">[ ONLINE // STABLE ]</span>
          </div>
          <h4 className="plaque-title">Traditional 2D Web & SEO Pathways</h4>
          <div className="plaque-body">
            <p>
              Immersive spaces often suffer from a discoverability crisis. Portals built inside heavy 3D canvases or WebXR frameworks are <span className="highlight-cyan">invisible to planetary search engine crawlers (SEOs)</span>.
            </p>
            <p>
              To resolve this, this site is engineered as a <span className="highlight-amber">native Next.js 2D HTML5 application</span>. Search spiders can index the citizen's portfolio archives and research files directly.
            </p>
            <p>
              Overlaying absolute background canvas matrices and translucent HUD components onto a semantic document structure delivers a rich sci-fi atmosphere without sacrificing web standards or SEO discoverability.
            </p>
          </div>
        </div>

        {/* ROW 1 RIGHT: PLAQUE 3 (RESPONSIVE NAV) */}
        <div className="plaque-card">
          <div className="plaque-header">
            <span className="plaque-label">// EXHIBIT 03: SPATIAL TRANSIT</span>
            <span className="plaque-status">[ ONLINE // STABLE ]</span>
          </div>
          <h4 className="plaque-title">Responsive Tactical Navigation</h4>
          <div className="plaque-body">
            <p>
              Designing a navigation system that aligns with a sci-fi OS console theme while functioning on both desktop monitors and mobile datapads was a major UX bottleneck. Traditional navbars and standard hamburger menus shattered the localized Martian OS illusion.
            </p>
            <p>
              Initially, the plan was to build a <span className="highlight-cyan">fully responsive city map interface (similar to Google Maps)</span>. However, testing showed that a raw map canvas failed to respond well or remain usable across various screen sizes.
            </p>
            <p>
              The perfect compromise was the development of the peeking <span className="highlight-cyan">Locator Tab</span> and a slide-out <span className="highlight-amber">list-based Tactical Map Drawer</span>. This drawer dynamically calculates and displays pressurized bike and walk transit distance/duration metrics, preserving the spatial feel without map layout breakage.
            </p>
          </div>
        </div>

        {/* ROW 2 LEFT & CENTER: PLAQUE 4 (SOLAR CLOCK & WIDGET) - SPANS 2 COLUMNS */}
        <div className="plaque-card" style={{ gridColumn: 'span 2' }}>
          <div className="plaque-header">
            <span className="plaque-label">// EXHIBIT 04: PLANETARY TIMEKEEPING</span>
            <span className="plaque-status">[ LIVE_SYNC ]</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', height: '100%', minHeight: 0 }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 className="plaque-title" style={{ margin: 0 }}>Ares City Solar Clock</h4>
              <div className="plaque-body" style={{ marginTop: '6px' }}>
                <p>
                  Martian timekeeping operates on Sols (24h 39m 35.244s). The clock tracks Clancy Martian Year 38 (epoch start Nov 12, 2024). Time is formatted as: <span className="highlight-cyan">Mars Year / Sol / 4-Digit decimal fraction</span>.
                </p>
                <p>
                  Instead of translating Sols back into artificial Earth hours and minutes, the clock represents time as a telemetry ratio of Sol progress. This decoder widget calculates this Sol progress in real-time.
                </p>
              </div>
            </div>
            
            <div style={{ width: '260px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Telemetry Clock Widget */}
              <div className="clock-widget-container" style={{ margin: 0 }}>
                <div className="clock-readout-main">
                  {clockData.marsYear} / {clockData.currentSol} / {clockData.decimalStr}
                </div>

                <div className="telemetry-grid">
                  <div className="telemetry-row">
                    <span className="telemetry-label">UTC Ref:</span>
                    <span className="telemetry-value" style={{ fontSize: '0.48rem' }}>{clockData.utcTime.substring(5, 22)}</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Epoch:</span>
                    <span className="telemetry-value">2024-11-12 UTC</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Earth Days:</span>
                    <span className="telemetry-value">{clockData.elapsedEarthDays.toFixed(3)}</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Ratio:</span>
                    <span className="telemetry-constant">1.0275 Days/Sol</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Total Sols:</span>
                    <span className="telemetry-value">{clockData.totalSols.toFixed(3)}</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Sol Fraction:</span>
                    <span className="telemetry-value">{clockData.solFraction.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 RIGHT: PLAQUE 5 (AI PARTNERSHIP) */}
        <div className="plaque-card">
          <div className="plaque-header">
            <span className="plaque-label">// EXHIBIT 05: CO-CREATION PARADIGM</span>
            <span className="plaque-status">[ ONLINE // STABLE ]</span>
          </div>
          <h4 className="plaque-title">AI Partnership & "Vibe Coding"</h4>
          <div className="plaque-body">
            <p>
              This interface is the result of human-directed, AI-accelerated vibe coding. AI generated the structural frameworks, calculated the Martian epoch Sol constant delta, and plotted the initial CSS layout tokens.
            </p>
            <p>
              The citizen then audited the mathematical logic, refined the responsive map drawers, and customized the HSL cyber-cyan theme accents. This partnership allowed rapid prototyping while preserving hand-crafted layout precision.
            </p>
          </div>
        </div>

      </div>

      {/* Footer Return Button */}
      <div className="museum-footer">
        <Link href="/">
          <button 
            className="hud-btn"
            style={{
              borderColor: '#00f0ff',
              color: '#00f0ff',
              padding: '6px 16px',
              fontSize: '0.68rem',
              fontFamily: 'var(--font-tech), monospace',
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)',
              cursor: 'pointer',
              background: 'rgba(0, 240, 255, 0.05)',
              transition: 'all 0.2s',
              borderRadius: '6px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.15)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.05)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.1)';
            }}
          >
            [ ↩ RETURN TO CITIZEN SUITE ]
          </button>
        </Link>
      </div>

    </div>
  );
}
