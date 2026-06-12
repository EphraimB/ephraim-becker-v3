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
    const interval = setInterval(updateTelemetry, 100); // Higher frequency for smooth telemetry updates
    return () => clearInterval(interval);
  }, [isMounted]);

  return (
    <div className="citizen-card-shell museum-shell custom-scroll">
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay museum-walking-overlay"></div>

      {/* Styled styles locally */}
      <style dangerouslySetInnerHTML={{ __html: `
        .museum-shell {
          width: 100%;
          height: 100%;
          padding: 10px 20px 40px 20px;
          box-sizing: border-box;
          display: flex !important;
          flex-direction: column;
          justify-content: flex-start !important;
          align-items: center;
        }
        @media (max-width: 900px) {
          .museum-shell {
            height: auto !important;
            padding: 10px 10px 40px 10px;
          }
        }
        .museum-content-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .bubbly-panel {
          background: rgba(4, 6, 12, 0.94) !important;
          border: 1.5px solid rgba(0, 240, 255, 0.18);
          border-radius: 12px;
          padding: 22px 26px;
          backdrop-filter: blur(16px);
          WebkitBackdropFilter: blur(16px);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.08);
        }
        .museum-info-panel {
          border-left: 4px solid #00f0ff;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 240, 255, 0.1);
        }
        .museum-info-heading {
          font-family: var(--font-tech), monospace;
          font-size: 1.3rem;
          color: #00f0ff;
          margin: 0 0 8px 0;
          letter-spacing: 2px;
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.3);
        }
        .museum-info-text {
          font-size: 0.85rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
        }
        .plaques-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 900px) {
          .plaques-grid {
            grid-template-columns: 1fr;
          }
        }
        .plaque-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
        }
        .plaque-card:hover {
          border-color: #00f0ff;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.1),
                      0 0 25px rgba(0, 240, 255, 0.18);
          transform: translateY(-2px);
        }
        .plaque-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 10px;
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
          color: rgba(255, 255, 255, 0.4);
        }
        .plaque-title {
          font-family: var(--font-tech), monospace;
          font-size: 1.05rem;
          color: #ffffff;
          margin: 4px 0 0 0;
          font-weight: bold;
        }
        .plaque-desc {
          font-size: 0.8rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.75);
          margin: 0;
        }
        .plaque-desc p {
          margin: 0 0 12px 0;
        }
        .plaque-desc p:last-child {
          margin: 0;
        }
        .highlight-cyan {
          color: #00f0ff;
          font-weight: bold;
        }
        .highlight-amber {
          color: #ffb300;
          font-weight: bold;
        }

        /* Clock Telemetry Widget Styles */
        .clock-widget-container {
          background: rgba(4, 8, 16, 0.88);
          border: 1px solid rgba(0, 240, 255, 0.25);
          border-radius: 8px;
          padding: 14px;
          font-family: monospace;
          margin-top: 10px;
          box-shadow: inset 0 0 10px rgba(0, 240, 255, 0.05);
        }
        .clock-widget-title {
          font-size: 0.62rem;
          color: #00f0ff;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          display: block;
          margin-bottom: 8px;
          border-bottom: 1px dashed rgba(0, 240, 255, 0.2);
          padding-bottom: 4px;
        }
        .clock-readout-main {
          font-size: 1.15rem;
          color: #ffb300;
          text-align: center;
          padding: 8px 0;
          text-shadow: 0 0 10px rgba(255, 179, 0, 0.35);
          letter-spacing: 1px;
          border-bottom: 1px dashed rgba(0, 240, 255, 0.2);
          margin-bottom: 8px;
        }
        .telemetry-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.64rem;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .telemetry-row:last-child {
          border-bottom: none;
        }
        .telemetry-label {
          color: rgba(255, 255, 255, 0.45);
        }
        .telemetry-value {
          color: #00f0ff;
          font-weight: bold;
        }
        .telemetry-constant {
          color: #00ff88;
        }
      `}} />

      <div className={`walking-content-container ${transitState} museum-content-container`}>
        {/* Upper Information Panel */}
        <div className="bubbly-panel museum-info-panel">
          <h3 className="museum-info-heading">
            🏛️ Ares City Museum of Web Engineering
          </h3>
          <p className="museum-info-text">
            Welcome to the historical archives of the Citizen Suite. This exhibition document outlines the engineering challenges, core timekeeping architectures, and co-creation paradigms that went into building this high-fidelity immersive web experience.
          </p>
        </div>

        {/* Plaques Grid */}
        <div className="plaques-grid">
          
          {/* PLAQUE 1: SEO & 2D WEB */}
          <div className="bubbly-panel plaque-card">
            <div className="plaque-header">
              <span className="plaque-label">// EXHIBIT 01: STRUCTURAL FOUNDATION</span>
              <span className="plaque-status">[ ONLINE // STABLE ]</span>
            </div>
            <div>
              <h4 className="plaque-title">Traditional 2D Web & SEO Pathways</h4>
            </div>
            <div className="plaque-desc">
              <p>
                A core design struggle of immersive spaces is balancing the <span className="highlight-cyan">atmosphere of a 3D colony simulator</span> with the <span className="highlight-cyan">discoverability of the World Wide Web</span>. Many immersive sites rely on heavy WebGL canvases, WebXR layers, or single-page blobs. While visually striking, these formats render content invisible to search engine crawlers (SEOs).
              </p>
              <p>
                To solve this, this portfolio is built as a <span className="highlight-amber">native, semantic 2D web application</span>. Utilizing Next.js static layout rendering, search engine spiders can easily index the archives, project descriptions, and academic files.
              </p>
              <p>
                By overlaying absolute background canvases, translucent scanlines, and responsive floating HUD panels onto a standard HTML5 skeleton, the site achieves high atmospheric immersion without sacrificing indexability.
              </p>
            </div>
          </div>

          {/* PLAQUE 2: RESPONSIVE TACTICAL NAV */}
          <div className="bubbly-panel plaque-card">
            <div className="plaque-header">
              <span className="plaque-label">// EXHIBIT 02: SPATIAL TRANSIT</span>
              <span className="plaque-status">[ ONLINE // STABLE ]</span>
            </div>
            <div>
              <h4 className="plaque-title">Responsive Tactical Navigation</h4>
            </div>
            <div className="plaque-desc">
              <p>
                Designing a menu system that feels like a tactical military console while remaining accessible on desktop screens and handheld datapads (mobile devices) was a major architectural bottleneck.
              </p>
              <p>
                Traditional header navbars or typical slide-out hamburger menus shattered the illusion of being logged into a localized colony OS. The compromise was the development of the <span className="highlight-cyan">Floating Locator Tab</span> and the <span className="highlight-amber">Slide-out Tactical Map Drawer</span>.
              </p>
              <p>
                The Locator Tab sits silently on the left edge, displaying coordinates of the current sector. Tapping it slides out the full-screen tactical vector map. On desktop, this map displays a detailed coordinate grid, and on mobile, it scales into a thumb-friendly touch card list that tracks real-time biking and transit metrics.
              </p>
            </div>
          </div>

          {/* PLAQUE 3: SOLAR CLOCK & LIVE DECODER */}
          <div className="bubbly-panel plaque-card" style={{ gridColumn: 'span 2' }}>
            <div className="plaque-header">
              <span className="plaque-label">// EXHIBIT 03: PLANETARY TIMEKEEPING</span>
              <span className="plaque-status">[ CALIBRATING // LIVE_SYNC ]</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 450px' }}>
                <h4 className="plaque-title">The Ares City Solar Clock</h4>
                <div className="plaque-desc" style={{ marginTop: '8px' }}>
                  <p>
                    Martian timekeeping differs significantly from Earth's 24-hour cycles. A Martian day, known as a <span className="highlight-cyan">Sol</span>, is approximately 39 minutes and 35.244 seconds longer than an Earth day. To ground this portal in Mars immersion, a custom clock ticker displays Ares City Time.
                  </p>
                  <p>
                    The solar clock is calibrated using a specific epoch: <span className="highlight-cyan">Martian Year 38 (MY38)</span>, which began on <span className="highlight-amber">November 12, 2024 at 00:00:00 UTC</span>. The clock tracks elapsed milliseconds from this epoch, computes the decimal ratio of Martian Sols (by dividing Earth days by <span className="highlight-cyan">1.02749125</span>), and displays the result.
                  </p>
                  <p>
                    Instead of translating Sols back into Earth-like hours, minutes, and seconds, the clock represents time in a telemetry format: <span className="highlight-amber">Mars Year / Sol of the Year / 4-digit Sol progress decimal</span>. This choice avoids artificial hour boundaries and yields an authentic extraterrestrial readout.
                  </p>
                </div>
              </div>

              {/* LIVE TELEMETRY DECODER WIDGET */}
              <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
                <div className="clock-widget-container">
                  <span className="clock-widget-title">📡 Live Solar Clock Decoder</span>
                  
                  <div className="clock-readout-main">
                    {clockData.marsYear} / {clockData.currentSol} / {clockData.decimalStr}
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Earth UTC Reference:</span>
                    <span className="telemetry-value" style={{ fontSize: '0.55rem' }}>{clockData.utcTime}</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Clancy MY38 Epoch:</span>
                    <span className="telemetry-value">2024-11-12 00:00:00 UTC</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Elapsed Milliseconds:</span>
                    <span className="telemetry-value">{clockData.elapsedMs.toLocaleString()} ms</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Elapsed Earth Days:</span>
                    <span className="telemetry-value">{clockData.elapsedEarthDays.toFixed(6)}</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Sol-to-Day Ratio:</span>
                    <span className="telemetry-constant">1.02749125 Earth Days / Sol</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Total Sols Since Epoch:</span>
                    <span className="telemetry-value">{clockData.totalSols.toFixed(6)} Sols</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Calculated Mars Year:</span>
                    <span className="telemetry-value">MY {clockData.marsYear} (668.6 Sols/year)</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Current Sol of Year:</span>
                    <span className="telemetry-value">Sol {clockData.currentSol}</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">Sol Fractional Progress:</span>
                    <span className="telemetry-value">{(clockData.solFraction).toFixed(6)}</span>
                  </div>

                  <div className="telemetry-row">
                    <span className="telemetry-label">4-Digit LED Telemetry:</span>
                    <span className="telemetry-constant">{clockData.decimalStr} (Fraction * 10,000)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PLAQUE 4: AI CO-CREATION */}
          <div className="bubbly-panel plaque-card" style={{ gridColumn: 'span 2' }}>
            <div className="plaque-header">
              <span className="plaque-label">// EXHIBIT 04: CO-CREATION PARADIGM</span>
              <span className="plaque-status">[ ONLINE // STABLE ]</span>
            </div>
            <div>
              <h4 className="plaque-title">AI Partnership & "Vibe Coding"</h4>
            </div>
            <div className="plaque-desc">
              <p>
                This portal is a product of modern collaborative AI engineering. Rather than writing every CSS grid coordinate and clock calculation line-by-line from scratch, the architecture was built through a cycle of <span className="highlight-cyan">vibe coding</span>—using AI models to generate layout prototypes, theme setups, and functional boilerplate code, and then manually refining them.
              </p>
              <p>
                AI was tasked with generating the core calculations for the Martian solar clock, rendering layout wireframes, and setting up CSS grid structures. The developer then stepped in to audit the math, refine the responsiveness of the navigation drawer, tweak the HSL color ranges to fit the exact aesthetic, and ensure compatibility with standard Next.js routing structures.
              </p>
              <p>
                The resulting codebase is an example of <span className="highlight-amber">human-directed, AI-accelerated engineering</span>: robust, responsive, highly specific in its styling details, and fully representative of the author's original creative vision.
              </p>
            </div>
          </div>

        </div>

        {/* Back Link Panel */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '30px' }}>
          <Link href="/">
            <button 
              className="hud-btn"
              style={{
                borderColor: '#00f0ff',
                color: '#00f0ff',
                padding: '10px 24px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-tech), monospace',
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)',
                cursor: 'pointer',
                background: 'rgba(0, 240, 255, 0.05)',
                transition: 'all 0.2s',
                borderRadius: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 240, 255, 0.15)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
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
    </div>
  );
}
