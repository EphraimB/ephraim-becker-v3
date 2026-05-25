'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import HudBar from '../components/HudBar';
import '../styles/global.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Safe Focus/Active Blurring Listener (wrapped in defensive try-catch)
    const handleClick = (e) => {
      try {
        if (!e || !e.target) return;
        // Skip blurring on touch/coarse devices to prevent click cancellation on iOS and Android
        if (e.pointerType === 'touch') return;
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
        
        if (typeof e.target.closest !== 'function') return;
        
        const focusable = e.target.closest('button, a, [role="button"], [tabindex]');
        if (focusable && 
            typeof focusable.blur === 'function' && 
            !['INPUT', 'TEXTAREA', 'SELECT'].includes(focusable.tagName)) {
          setTimeout(() => {
            try {
              focusable.blur();
            } catch (err) {
              console.error("Diagnostic: focusable.blur failed", err);
            }
          }, 0);
        }
      } catch (err) {
        console.error("Diagnostic: global click handler failed", err);
      }
    };

    // 2. Futuristic System Diagnostic Error Overlay
    const handleError = (event) => {
      const msg = event.message || (event.error && event.error.message) || "Unknown system error";
      showDiagnosticError(msg);
    };

    const handleRejection = (event) => {
      const msg = (event.reason && event.reason.message) || "Unhandled subspace rejection";
      showDiagnosticError(msg);
    };

    const showDiagnosticError = (msg) => {
      let overlay = document.getElementById('ares-system-diagnostics');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'ares-system-diagnostics';
        overlay.style.cssText = `
          position: fixed;
          top: 10px;
          left: 10px;
          right: 10px;
          background: rgba(180, 20, 20, 0.95);
          border: 2px solid #ff3b30;
          border-radius: 10px;
          color: #fff;
          padding: 12px;
          font-family: monospace;
          font-size: 11px;
          z-index: 100000;
          box-shadow: 0 0 20px rgba(255, 59, 48, 0.5);
          pointer-events: auto;
        `;
        document.body.appendChild(overlay);
      }
      overlay.innerHTML = `<strong>⚠️ ARES CITY COMMS FAILURE:</strong><br/>${msg}<br/><br/><button onclick="this.parentElement.remove()" style="background:#fff;color:#000;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">[ CLEAR PACKET ]</button>`;
    };

    // 3. Touch Gesture Diagnostic Tracker
    const handleTapLog = (e) => {
      try {
        if (!e || !e.target) return;
        const tag = e.target.tagName;
        const id = e.target.id ? `#${e.target.id}` : '';
        const classes = e.target.className && typeof e.target.className === 'string' 
          ? `.${e.target.className.trim().split(/\s+/).join('.')}` 
          : '';
        
        let tapIndicator = document.getElementById('ares-tap-indicator');
        if (!tapIndicator) {
          tapIndicator = document.createElement('div');
          tapIndicator.id = 'ares-tap-indicator';
          tapIndicator.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 240, 255, 0.92);
            border: 1px solid var(--neon-cyan);
            color: #080b13;
            padding: 5px 12px;
            border-radius: 16px;
            font-family: monospace;
            font-size: 10px;
            z-index: 100000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
            font-weight: bold;
            box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
          `;
          document.body.appendChild(tapIndicator);
        }
        tapIndicator.innerText = `📡 TAP REGISTERED: <${tag}${id}${classes.substring(0, 25)}>`;
        tapIndicator.style.opacity = '1';
        setTimeout(() => {
          try {
            tapIndicator.style.opacity = '0';
          } catch(e){}
        }, 1000);
      } catch (err) {
        console.error("Diagnostic: handleTapLog failed", err);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleTapLog, { passive: true });
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleTapLog);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  let bgImage = '/assets/images/backgrounds/citizen-suite.png';
  let currentTheme = 'suite';
  let hudSectorName = 'Citizen Suite';

  if (pathname === '/metropolis-core') {
    bgImage = '/assets/images/backgrounds/metropolis-core.png';
    currentTheme = 'metropolis';
    hudSectorName = 'Metropolis Core';
  } else if (pathname === '/atmosphere-dome') {
    bgImage = '/assets/images/backgrounds/atmosphere-dome.png';
    currentTheme = 'biosphere';
    hudSectorName = 'Biosphere Dome';
  } else if (pathname === '/quantum-net') {
    bgImage = '/assets/images/backgrounds/quantum-net.png';
    currentTheme = 'quantum';
    hudSectorName = 'Quantum Net';
  } else if (pathname === '/portfolio') {
    bgImage = '/assets/images/backgrounds/metropolis-core.png';
    currentTheme = 'metropolis';
    hudSectorName = 'Portfolio Archives';
  }

  return (
    <html lang="en">
      <head>
        <title>Ephraim Becker — Citizen of Ares City</title>
        <meta name="description" content="Ephraim Becker's personal portfolio website redesign in the Ares City OS theme." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Full-Screen Immersive Penthouse Background */}
        <div 
          className="background-canvas" 
          key={bgImage}
          style={{ backgroundImage: `url('${bgImage}')`, pointerEvents: 'none' }}
        ></div>
        
        {/* Underlays */}
        <div className="city-matrix-underlay" key={`underlay-${currentTheme}`} style={{ pointerEvents: 'none' }}></div>
        <div className="hud-scanline" style={{ pointerEvents: 'none' }}></div>
 
        {/* Global children render wrapper */}
        <div className="os-workspace" data-theme={currentTheme}>
          <HudBar sectorName={hudSectorName} />
          
          <div className="workspace-deck">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

