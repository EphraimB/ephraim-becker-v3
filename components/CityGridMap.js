'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const SECTORS = [
  { id: 'metropolis', name: 'Metropolis Core', icon: '⚡', path: '/metropolis-core', coords: { x: '50%', y: '50%' }, weight: 1, label: 'Metropolis Hub' },
  { id: 'suite', name: 'Citizen Suite', icon: '🏨', path: '/', coords: { x: '50%', y: '16%' }, weight: 2, label: 'Penthouse District' },
  { id: 'portfolio', name: 'Portfolio Dome', icon: '📂', path: '/portfolio', coords: { x: '20%', y: '38%' }, weight: 3, label: 'Engineering Zone' },
  { id: 'biosphere', name: 'Biosphere Dome', icon: '🌿', path: '/atmosphere-dome', coords: { x: '20%', y: '75%' }, weight: 4, label: 'Eco-Agri Park' },
  { id: 'quantum', name: 'Quantum Net', icon: '🛰️', path: '/quantum-net', coords: { x: '80%', y: '75%' }, weight: 5, label: 'Telecom Grid' }
];

export default function CityGridMap() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSector, setActiveSector] = useState(SECTORS[1]); // Default to Suite
  const [isWalking, setIsWalking] = useState(false);

  // Set active sector dynamically based on route
  useEffect(() => {
    const current = SECTORS.find(s => s.path === pathname) || SECTORS[1];
    setActiveSector(current);
  }, [pathname]);

  const handleWarp = (targetSector) => {
    if (targetSector.path === pathname || isWalking) return;

    setIsWalking(true);

    // Apply "Corridor Walk" slide transition effects to DOM
    const workspace = document.querySelector('.os-workspace');
    const content = document.querySelector('.walking-content-container');

    if (workspace) workspace.classList.add('walking-transit-active');
    
    // Add sliding motion class
    if (content) {
      const isHeadingLeft = targetSector.weight > activeSector.weight;
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('walk-direction', isHeadingLeft ? 'left' : 'right');
      }
      content.classList.add(isHeadingLeft ? 'slide-left' : 'slide-right');
      content.classList.remove('slide-active');
    }

    // Route in middle of corridor transit sweep (220ms)
    setTimeout(() => {
      router.push(targetSector.path);
      
      // Cleanup sweeps after routing
      setTimeout(() => {
        if (workspace) workspace.classList.remove('walking-transit-active');
        setIsWalking(false);
      }, 500);
    }, 220);
  };

  return (
    <div style={{
      width: 'min(360px, 85vw)',
      height: '145px',
      position: 'relative',
      margin: '0 auto',
      background: '#161b22', /* Google Maps Dark Roadmap Background */
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      overflow: 'hidden'
    }}>
      {/* 2D Google-style Dark Mode Road Map Layout */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {/* Geographic Water/Forest Zones */}
        {/* Eco-Agri Biosphere (Light Green Shaded Region) */}
        <circle cx="20%" cy="75%" r="22" fill="rgba(46, 125, 50, 0.12)" stroke="rgba(46, 125, 50, 0.25)" strokeWidth="0.8" />
        
        {/* Municipal Central Reservoir/Plaza (Light Blue Shaded Region) */}
        <circle cx="50%" cy="50%" r="24" fill="rgba(21, 101, 192, 0.08)" stroke="rgba(21, 101, 192, 0.2)" strokeWidth="0.8" />
        
        {/* Telecom Grid Zone (Faint Grey Shaded Region) */}
        <circle cx="80%" cy="75%" r="20" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.8" />

        {/* Intricate Street/Road Grid Lines (Google Maps Roadmap style) */}
        {/* Gridded avenues */}
        <line x1="5%" y1="20%" x2="95%" y2="20%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
        <line x1="5%" y1="40%" x2="95%" y2="40%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
        <line x1="5%" y1="60%" x2="95%" y2="60%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
        <line x1="5%" y1="80%" x2="95%" y2="80%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
        
        <line x1="20%" y1="5%" x2="20%" y2="95%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
        <line x1="40%" y1="5%" x2="40%" y2="95%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
        <line x1="60%" y1="5%" x2="60%" y2="95%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
        <line x1="80%" y1="5%" x2="80%" y2="95%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />

        {/* Diagnostic Major Highway Route Tubes */}
        <line x1="50%" y1="50%" x2="50%" y2="16%" stroke="#2f3542" strokeWidth="3" />
        <line x1="50%" y1="50%" x2="20%" y2="38%" stroke="#2f3542" strokeWidth="3" />
        <line x1="50%" y1="50%" x2="20%" y2="75%" stroke="#2f3542" strokeWidth="3" />
        <line x1="50%" y1="50%" x2="80%" y2="75%" stroke="#2f3542" strokeWidth="3" />

        {/* Outer Circular Roadmap Loops */}
        <path d="M 50% 16% Q 30% 20% 20% 38%" fill="none" stroke="#2f3542" strokeWidth="2" />
        <path d="M 20% 38% Q 15% 55% 20% 75%" fill="none" stroke="#2f3542" strokeWidth="2" />
        <path d="M 20% 75% Q 50% 85% 80% 75%" fill="none" stroke="#2f3542" strokeWidth="2" />
        <path d="M 80% 75% Q 85% 45% 50% 16%" fill="none" stroke="#2f3542" strokeWidth="2" />

        {/* Google Maps BLUE ACTIVE ROUTE navigation line highlighting active path */}
        <line
          x1="50%"
          y1="50%"
          x2={activeSector.coords.x}
          y2={activeSector.coords.y}
          stroke="#1a73e8" /* Google Maps Navigation Blue */
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transition: 'all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)', filter: 'drop-shadow(0 0 2px rgba(26,115,232,0.6))' }}
        />

        {/* Street Name Labels (Faint, natural roadmap elements) */}
        <text x="52%" y="30%" fill="rgba(255,255,255,0.2)" fontSize="4.5" fontFamily="var(--font-sans)">Hyperloop N-Line</text>
        <text x="25%" y="60%" fill="rgba(255,255,255,0.2)" fontSize="4.5" fontFamily="var(--font-sans)" transform="rotate(-30 20 60)">Biosphere Expy</text>
        <text x="56%" y="68%" fill="rgba(255,255,255,0.2)" fontSize="4.5" fontFamily="var(--font-sans)">Plaza Blvd</text>
      </svg>

      {/* Floating pulsing Google Maps Teardrop Location Pin */}
      <div
        style={{
          position: 'absolute',
          left: activeSector.coords.x,
          top: activeSector.coords.y,
          transform: 'translate(-50%, -90%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)',
          pointerEvents: 'none'
        }}
      >
        <svg 
          viewBox="0 0 24 24" 
          width="20px" 
          height="20px" 
          style={{ 
            fill: '#ea4335', /* Google Red Pin */
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
            animation: 'pin-bounce 1s infinite alternate' 
          }}
        >
          <path d="M 12 2 C 6.48 2 2 6.48 2 12 C 2 17.52 12 22 12 22 C 12 22 22 17.52 22 12 C 22 6.48 17.52 2 12 2 Z M 12 15 C 10.34 15 9 13.66 9 12 C 9 10.34 10.34 9 12 9 C 13.66 9 15 10.34 15 12 C 15 13.66 13.66 15 12 15 Z" />
        </svg>
        {/* Tiny pin ground base shadow */}
        <ellipse 
          cx="10" 
          cy="1" 
          rx="4" 
          ry="1.2" 
          fill="rgba(0,0,0,0.3)" 
          style={{ 
            marginTop: '2px', 
            animation: 'shadow-scale 1s infinite alternate',
            transform: 'translateX(2px)' 
          }} 
        />
      </div>

      {/* Geodesic Dome Nodes */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 2 }}>
        {SECTORS.map((sector) => {
          const isCurrent = sector.path === pathname;
          
          return (
            <div
              key={sector.id}
              onClick={() => handleWarp(sector)}
              style={{
                position: 'absolute',
                left: sector.coords.x,
                top: sector.coords.y,
                transform: 'translate(-50%, -50%)',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: isCurrent ? 'rgba(26, 115, 232, 0.25)' : '#30363d',
                border: isCurrent ? '2px solid #1a73e8' : '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: isCurrent ? '0 0 10px rgba(26, 115, 232, 0.6)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                cursor: isWalking ? 'default' : 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              title={`${sector.name} — ${sector.label}`}
              className="dome-map-node"
            >
              {sector.icon}
              
              {/* Text label underneath node */}
              <span style={{
                position: 'absolute',
                top: '115%',
                fontFamily: 'var(--font-tech)',
                fontSize: '0.5rem',
                fontWeight: 700,
                color: isCurrent ? 'var(--color-accent)' : '#8b949e',
                letterSpacing: '0.3px',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                textShadow: isCurrent ? '0 0 5px rgba(var(--color-accent-rgb), 0.3)' : 'none'
              }}>
                {sector.id}
              </span>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes pin-bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-4px); }
        }
        @keyframes shadow-scale {
          from { transform: scale(1); opacity: 0.3; }
          to { transform: scale(0.85); opacity: 0.15; }
        }
        .dome-map-node:hover {
          border-color: #1a73e8 !important;
          background-color: rgba(26, 115, 232, 0.1) !important;
          transform: translate(-50%, -50%) scale(1.15) !important;
          box-shadow: 0 0 8px rgba(26, 115, 232, 0.4) !important;
        }
      `}</style>
    </div>
  );
}
