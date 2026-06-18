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
          line-height: 1.5; /* Explicit line-height to prevent vertical text clipping */
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

        /* 3-Column by 2-Row Grid Layout on Desktop - all cards exactly equal size */
        .museum-grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
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
          font-size: 0.68rem;
          color: #ffb300;
          letter-spacing: 1px;
          font-weight: bold;
        }

        .plaque-status {
          font-family: monospace;
          font-size: 0.62rem;
          color: rgba(255, 255, 255, 0.45);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .plaque-title {
          font-family: var(--font-tech), monospace;
          font-size: 1.05rem;
          color: #ffffff;
          margin: 0 0 6px 0;
          font-weight: bold;
          flex-shrink: 0;
          line-height: 1.4; /* Explicit line-height to prevent vertical text clipping */
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
          border-radius: 8px;
          padding: 10px 14px;
          font-family: monospace;
          margin-top: 8px;
          flex-shrink: 0;
        }

        .clock-readout-main {
          font-size: 1.45rem;
          color: #ffb300;
          text-align: center;
          padding: 4px 0;
          text-shadow: 0 0 10px rgba(255, 179, 0, 0.45);
          letter-spacing: 1.5px;
          border-bottom: 1px dashed rgba(0, 240, 255, 0.15);
          margin-bottom: 8px;
          font-weight: bold;
        }

        .telemetry-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 4px 12px;
        }

        .telemetry-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          padding: 2px 0;
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

        /* Diagnostic List styles */
        .diagnostic-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          font-family: monospace;
          padding: 4px 0;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
        }
        .diagnostic-row:last-child {
          border-bottom: none;
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

      {/* 3x2 Grid Container (Symmetrical 6-Card Layout) */}
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
              The journey to building this digital outpost began with a lifelong <span className="highlight-cyan">passion for science fiction</span>. Sci-fi inspires us to push human potential and reimagine technology.
            </p>
            <p>
              Choosing a Martian habitat theme for this website was a natural evolution of this passion, transforming a standard developer portfolio into an ambient simulation of <span className="highlight-amber">Ares City</span>.
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
              Immersive spaces often suffer from a discoverability crisis; portals built inside heavy 3D canvases are <span className="highlight-cyan">invisible to search engine crawlers (SEOs)</span>.
            </p>
            <p>
              To solve this, this site is engineered as a <span className="highlight-amber">native Next.js 2D HTML5 application</span>. Search spiders can index the citizen's portfolio archives and research files directly.
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
              Designing a navigation system that aligns with a sci-fi OS console theme while remaining responsive on mobile datapads was a major UX bottleneck.
            </p>
            <p>
              Initially, the plan was to build a fully responsive city map like Google Maps, but it wouldn't respond well. We found the perfect compromise with a <span className="highlight-cyan">locator tab and a slide-out, list-based map drawer</span> that kept the transit distance metrics intact.
            </p>
          </div>
        </div>

        {/* ROW 2 LEFT: PLAQUE 4 (SOLAR CLOCK & COMPACT WIDGET) */}
        <div className="plaque-card">
          <div className="plaque-header">
            <span className="plaque-label">// EXHIBIT 04: PLANETARY TIMEKEEPING</span>
            <span className="plaque-status">[ LIVE_SYNC ]</span>
          </div>
          <h4 className="plaque-title">Ares City Solar Clock</h4>
          <div className="plaque-body">
            <p>
              Martian Sols last 24h 39m 35s. The clock tracks Clancy Martian Year 38 (epoch start Nov 12, 2024), formatted as: <span className="highlight-cyan">Mars Year / Sol / Decimal Sol fraction</span>.
            </p>
            
            {/* Compact Telemetry Clock Widget */}
            <div className="clock-widget-container">
              <div className="clock-readout-main">
                {clockData.marsYear} / {clockData.currentSol} / {clockData.decimalStr}
              </div>

              <div className="telemetry-grid">
                <div className="telemetry-row">
                  <span className="telemetry-label">UTC Ref:</span>
                  <span className="telemetry-value">{clockData.utcTime.substring(5, 22)}</span>
                </div>

                <div className="telemetry-row">
                  <span className="telemetry-label">Total Sols:</span>
                  <span className="telemetry-value">{clockData.totalSols.toFixed(3)}</span>
                </div>

                <div className="telemetry-row">
                  <span className="telemetry-label">Ratio:</span>
                  <span className="telemetry-constant">1.0275 Days/Sol</span>
                </div>

                <div className="telemetry-row">
                  <span className="telemetry-label">Sol Fraction:</span>
                  <span className="telemetry-value">{clockData.solFraction.toFixed(4)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 CENTER: PLAQUE 5 (AI PARTNERSHIP) */}
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
              The citizen then audited the mathematical logic, refined the responsive map drawers, and customized the theme accents, preserving hand-crafted precision.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
