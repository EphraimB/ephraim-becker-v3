'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const SECTORS = [
  { id: 'suite', name: 'Suite', icon: '🏨', path: '/', weight: 1, label: 'Residence' },
  { id: 'metropolis', name: 'Metropolis', icon: '⚡', path: '/metropolis-core', weight: 2, label: 'Transit Hub' },
  { id: 'portfolio', name: 'Portfolio', icon: '📂', path: '/portfolio', weight: 3, label: 'Archives' },
  { id: 'biosphere', name: 'Biosphere', icon: '🌿', path: '/atmosphere-dome', weight: 4, label: 'Eco Dome' },
  { id: 'quantum', name: 'Quantum', icon: '🛰️', path: '/quantum-net', weight: 5, label: 'Telecom Net' }
];

export default function CityGridMap() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSector, setActiveSector] = useState(SECTORS[0]);
  const [isWalking, setIsWalking] = useState(false);
  const [showRadarMap, setShowRadarMap] = useState(false);

  // Synchronize active sector with path
  useEffect(() => {
    const current = SECTORS.find(s => s.path === pathname) || SECTORS[0];
    setActiveSector(current);
    setIsWalking(false);
  }, [pathname]);

  const handleWarp = (e, targetSector) => {
    if (e) e.preventDefault();
    if (!targetSector || !activeSector) return;
    if (targetSector.path === pathname || isWalking) return;

    setIsWalking(true);

    const workspace = document.querySelector('.os-workspace');
    const content = document.querySelector('.walking-content-container');

    if (workspace) workspace.classList.add('walking-transit-active');
    
    if (content) {
      const activeWeight = activeSector.weight || 1;
      const targetWeight = targetSector.weight || 1;
      const isHeadingLeft = targetWeight > activeWeight;
      
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('walk-direction', isHeadingLeft ? 'left' : 'right');
      }
      content.classList.add(isHeadingLeft ? 'slide-left' : 'slide-right');
      content.classList.remove('slide-active');
    }

    setTimeout(() => {
      router.push(targetSector.path);
    }, 220);
  };

  return (
    <div className="hyperloop-transit-container">
      {/* Sleek, Non-Blocking Navigation Dock Pill */}
      <nav className="hyperloop-transit-dock">
        <div className="dock-label">HYPERLOOP TRANSIT:</div>
        
        <div className="dock-links">
          {SECTORS.map((sector) => {
            const isCurrent = sector.path === pathname;
            return (
              <Link key={sector.id} href={sector.path} passHref legacyBehavior>
                <a
                  onClick={(e) => handleWarp(e, sector)}
                  className={`dock-link-btn ${isCurrent ? 'active-link' : ''}`}
                >
                  <span className="dock-link-icon">{sector.icon}</span>
                  <span className="dock-link-text">{sector.name.toUpperCase()}</span>
                  {isCurrent && <div className="active-glow-dot"></div>}
                </a>
              </Link>
            );
          })}
        </div>

        {/* Small Optional Holographic Radar Toggle Button */}
        <button 
          className={`radar-toggle-btn ${showRadarMap ? 'radar-active' : ''}`}
          onClick={() => setShowRadarMap(!showRadarMap)}
          title="Toggle Tactical Dome Hologram Map"
        >
          🗺️ <span className="radar-btn-text">RADAR MAP</span>
        </button>
      </nav>

      {/* Floating Compact Holographic Geodesic Radar Map (Only visible on demand!) */}
      {showRadarMap && (
        <div className="floating-hologram-radar animate-radar-in">
          <div className="radar-header">
            <span className="radar-dot"></span>
            TACTICAL GRID MAP // SOL SCAN
          </div>
          
          <svg viewBox="0 0 160 160" className="radar-svg">
            <defs>
              <radialGradient id="radarScan" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0, 240, 255, 0.05)" />
                <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
              </radialGradient>
            </defs>

            {/* Sweep radar coordinate lines */}
            <circle cx="80" cy="80" r="70" fill="url(#radarScan)" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1.2" />
            <circle cx="80" cy="80" r="45" fill="none" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="0.8" />
            <circle cx="80" cy="80" r="20" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.8" />
            
            {/* Sector spokes */}
            <line x1="80" y1="80" x2="80" y2="10" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="80" y1="80" x2="135" y2="110" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="80" y1="80" x2="25" y2="110" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="80" y1="80" x2="135" y2="50" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="80" y1="80" x2="25" y2="50" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />

            {/* Glowing active path line */}
            {activeSector.id !== 'metropolis' && (
              <line 
                x1="80" 
                y1="80" 
                x2={activeSector.id === 'suite' ? 80 : activeSector.id === 'portfolio' ? 45 : activeSector.id === 'biosphere' ? 45 : 115} 
                y2={activeSector.id === 'suite' ? 30 : activeSector.id === 'portfolio' ? 55 : activeSector.id === 'biosphere' ? 105 : 105} 
                stroke="var(--neon-cyan)" 
                strokeWidth="2.5" 
                strokeDasharray="4 2"
                style={{ animation: 'radar-line-flow 1s linear infinite' }}
              />
            )}

            {/* Glowing active red pin location marker */}
            <circle 
              cx={activeSector.id === 'suite' ? 80 : activeSector.id === 'portfolio' ? 45 : activeSector.id === 'biosphere' ? 45 : activeSector.id === 'quantum' ? 115 : 80} 
              cy={activeSector.id === 'suite' ? 30 : activeSector.id === 'portfolio' ? 55 : activeSector.id === 'biosphere' ? 105 : activeSector.id === 'quantum' ? 105 : 80} 
              r="4.5" 
              fill="#ea4335" 
              style={{ animation: 'radar-dot-pulse 0.8s infinite alternate' }} 
            />

            {/* Structural geodesic dome nodes labels */}
            <text x="80" y="24" className="radar-node-label">SUITE</text>
            <text x="35" y="52" className="radar-node-label" textAnchor="end">PORTFOLIO</text>
            <text x="35" y="112" className="radar-node-label" textAnchor="end">BIOSPHERE</text>
            <text x="125" y="112" className="radar-node-label">QUANTUM</text>
            <text x="80" y="83" className="radar-node-label" style={{ fill: 'var(--neon-cyan)' }} textAnchor="middle">CORE</text>
          </svg>
          
          <div className="radar-footer">
            COORDINATE MATRIX: SEC_{activeSector.id.toUpperCase()}
          </div>
        </div>
      )}

      <style jsx global>{`
        /* ================= ARES TRANSIT NAVIGATION DOCK PILL ================= */
        .hyperloop-transit-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          overflow: visible !important;
          z-index: 100;
        }

        .hyperloop-transit-dock {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 42px;
          background: rgba(6, 9, 20, 0.82);
          border: 1px solid var(--glass-border);
          border-radius: 21px;
          padding: 0 16px 0 20px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.05),
                      0 0 20px rgba(var(--color-accent-rgb), 0.06);
          backdrop-filter: var(--glass-blur);
          transition: all var(--transition-normal);
          max-width: min(680px, 92vw);
        }

        .hyperloop-transit-dock:hover {
          border-color: rgba(var(--color-accent-rgb), 0.3);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.55), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.06),
                      0 0 25px rgba(var(--color-accent-rgb), 0.1);
        }

        .dock-label {
          font-family: var(--font-tech);
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 1px;
          font-weight: 700;
          white-space: nowrap;
        }

        .dock-links {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dock-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 14px;
          color: var(--text-secondary);
          font-family: var(--font-tech);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: all var(--transition-fast);
          position: relative;
        }

        .dock-link-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }

        .active-link {
          color: var(--text-primary) !important;
          background: rgba(var(--color-accent-rgb), 0.12);
          border: 1px solid rgba(var(--color-accent-rgb), 0.25);
          box-shadow: 0 0 10px rgba(var(--color-accent-rgb), 0.15);
        }

        .dock-link-icon {
          font-size: 0.75rem;
        }

        .active-glow-dot {
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 5px var(--color-accent);
        }

        /* Radar map toggle button */
        .radar-toggle-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          font-family: var(--font-tech);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 5px 12px;
          border-radius: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .radar-toggle-btn:hover {
          background: rgba(0, 240, 255, 0.1);
          border-color: rgba(0, 240, 255, 0.35);
          color: var(--neon-cyan);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.15);
        }

        .radar-active {
          background: rgba(0, 240, 255, 0.15) !important;
          border-color: var(--neon-cyan) !important;
          color: var(--neon-cyan) !important;
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.3) !important;
        }

        /* ================= FLOATING HOLOGRAM RADAR MAP OVERLAY ================= */
        .floating-hologram-radar {
          position: absolute;
          top: 48px;
          right: 0px;
          width: 175px;
          background: rgba(8, 11, 20, 0.94);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6), 
                      0 0 20px rgba(0, 240, 255, 0.2);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .animate-radar-in {
          animation: radar-slide-in 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        @keyframes radar-slide-in {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .radar-header {
          font-family: var(--font-tech);
          font-size: 0.48rem;
          color: var(--neon-cyan);
          font-weight: 700;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
          width: 100%;
          border-bottom: 1px solid rgba(0, 240, 255, 0.15);
          padding-bottom: 4px;
        }

        .radar-dot {
          width: 4px;
          height: 4px;
          background: var(--neon-cyan);
          border-radius: 50%;
          box-shadow: 0 0 4px var(--neon-cyan);
          animation: blink-radar-dot 0.8s infinite alternate;
        }

        .radar-svg {
          width: 155px;
          height: 155px;
          display: block;
        }

        .radar-node-label {
          font-family: var(--font-tech);
          font-size: 0.38rem;
          fill: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          letter-spacing: 0.2px;
          text-anchor: middle;
          pointer-events: none;
        }

        .radar-footer {
          width: 100%;
          text-align: center;
          font-family: var(--font-tech);
          font-size: 0.4rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.3px;
          margin-top: 4px;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 4px;
        }

        @keyframes blink-radar-dot {
          from { opacity: 0.2; }
          to { opacity: 1; }
        }

        @keyframes radar-dot-pulse {
          from { r: 3.5px; filter: drop-shadow(0 0 1px #ea4335); }
          to { r: 5px; filter: drop-shadow(0 0 4px #ea4335); }
        }

        @keyframes radar-line-flow {
          to { stroke-dashoffset: -12; }
        }

        /* ================= MOBILE RESPONSIVE TRANSIT DOCK STYLES ================= */
        @media (max-width: 768px) {
          .hyperloop-transit-dock {
            gap: 10px;
            padding: 0 10px 0 12px;
            height: 38px;
          }
          .dock-label {
            display: none; /* Hide Hyperloop label to save space on mobile */
          }
          .dock-link-text {
            display: none; /* Hide link text labels to only show minimal sector icons */
          }
          .dock-link-btn {
            padding: 5px 8px;
          }
          .radar-btn-text {
            display: none; /* Hide radar text label to show icon only */
          }
          .floating-hologram-radar {
            top: 44px;
            right: 50%;
            transform: translateX(50%); /* Center radar on mobile */
          }
          @keyframes radar-slide-in {
            from { opacity: 0; transform: translate(50%, -10px) scale(0.95); }
            to { opacity: 1; transform: translate(50%, 0) scale(1); }
          }
        }
      `}</style>
    </div>
  );
}
