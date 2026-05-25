'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import HudBar from '../components/HudBar';
import '../styles/global.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Native coordinate tracking built directly into the layout shell
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Core Focus Tracker Setup
    const handleClick = (e) => {
      if (!e || !e.target || e.pointerType === 'touch') return;
      const focusable = e.target.closest('button, a, [role="button"], [tabindex]');
      if (focusable && typeof focusable.blur === 'function' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(focusable.tagName)) {
        setTimeout(() => { focusable.blur(); }, 0);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const isPortfolio = pathname === '/portfolio';
  
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
    <html lang="en" style={{ backgroundColor: '#0c0707', margin: 0, padding: 0, overflow: 'hidden' }}>
      <head>
        <title>Ephraim Becker — Citizen of Ares City</title>
        <meta name="description" content="Ephraim Becker's personal portfolio website redesign in the Ares City OS theme." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#0c0707' }}>
        
        {/* LAYER 1: DEEP BACKGROUND (Tracked dynamically across pages) */}
        <div 
          style={{ 
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${bgImage}')`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pointerEvents: 'none',
            zIndex: 0,
            transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0) scale(1.05)`,
            transition: 'filter 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.2s ease-out',
            filter: isPortfolio ? 'blur(24px) brightness(0.25)' : 'brightness(0.5)'
          }}
        />
        
        {/* Ambient Display Filters */}
        <div className="city-matrix-underlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'transparent' }} />
        <div className="hud-scanline" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }} />
 
        {/* LAYER 2: INTERACTIVE CONTENT OVERLAY SHEET */}
        <div 
          className="os-workspace"
          data-theme={currentTheme}
          style={{ 
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px',
            backgroundColor: 'transparent',
            background: 'none',
            color: '#fff',
            overflow: 'hidden'
          }}
        >
          {/* Header Telemetry Container */}
          <div style={{ width: '100%', zIndex: 10 }}>
            <HudBar sectorName={hudSectorName} />
          </div>
          
          {/* Main Content Node Insertion */}
          <div style={{ flex: 1, display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}