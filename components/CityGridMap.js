'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const SECTORS = [
  { 
    id: 'metropolis', 
    name: 'Metropolis Core', 
    icon: '⚡', 
    path: '/metropolis-core', 
    coords: { x: 380, y: 90 }, 
    weight: 1, 
    label: 'Metropolis Hub',
    color: 'var(--neon-cyan)',
    desc: 'Central civic transit plaza & loop registry',
    time: 'Hyperloop Station'
  },
  { 
    id: 'suite', 
    name: 'Citizen Suite', 
    icon: '🏨', 
    path: '/', 
    coords: { x: 380, y: 30 }, 
    weight: 2, 
    label: 'Penthouse District',
    color: 'var(--neon-violet)',
    desc: 'Private residence & CS Registry deck',
    time: '2 min walk'
  },
  { 
    id: 'portfolio', 
    name: 'Portfolio Dome', 
    icon: '📂', 
    path: '/portfolio', 
    coords: { x: 305, y: 55 }, 
    weight: 3, 
    label: 'Engineering Zone',
    color: '#2979ff',
    desc: 'Holographic software & database archives',
    time: '5 min walk'
  },
  { 
    id: 'biosphere', 
    name: 'Biosphere Dome', 
    icon: '🌿', 
    path: '/atmosphere-dome', 
    coords: { x: 305, y: 125 }, 
    weight: 4, 
    label: 'Eco-Agri Park',
    color: 'var(--neon-emerald)',
    desc: 'Botanical O2 farms & climate control',
    time: '7 min walk'
  },
  { 
    id: 'quantum', 
    name: 'Quantum Net', 
    icon: '🛰️', 
    path: '/quantum-net', 
    coords: { x: 455, y: 125 }, 
    weight: 5, 
    label: 'Telecom Grid',
    color: 'var(--neon-amber)',
    desc: 'Interstellar comms & subspace signal spires',
    time: '8 min walk'
  }
];

export default function CityGridMap() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSector, setActiveSector] = useState(SECTORS[1]); // Default to Suite
  const [hoveredSector, setHoveredSector] = useState(null);
  const [isWalking, setIsWalking] = useState(false);

  // Synchronize sector state with active route
  useEffect(() => {
    const current = SECTORS.find(s => s.path === pathname) || SECTORS[1];
    setActiveSector(current);
    setIsWalking(false); // Unlock navigation on mount
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
      const activeWeight = activeSector.weight || 2;
      const targetWeight = targetSector.weight || 2;
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
    <div className="google-dome-navigator">
      
      {/* ================= MAP LAYOUT PANEL ================= */}
      <div className="map-view-deck">
        
        {/* GPS Coordinates Telemetry Overlay */}
        <div className="gps-coordinates-overlay">
          ARES GPS: 45.3129° N, 12.8021° W // HABITAT DOME-01
        </div>

        {/* North Compass Needle Indicator */}
        <div className="compass-needle-overlay">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <polygon points="12,2 16,18 12,14 8,18" fill="var(--neon-violet)" />
            <text x="10" y="24" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="var(--font-tech)">N</text>
          </svg>
        </div>

        {/* 2D Glass Dome covered Map Drawing */}
        <svg viewBox="0 0 760 180" className="map-vector-canvas">
          <defs>
            <radialGradient id="marsDesertGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e0c09" />
              <stop offset="100%" stopColor="#0d0403" />
            </radialGradient>
            <radialGradient id="domeInternalGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d111c" />
              <stop offset="100%" stopColor="#05070c" />
            </radialGradient>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ================= OUTSIDE DOME: DESOLATE MARS SURFACE ================= */}
          <rect width="100%" height="100%" fill="url(#marsDesertGrad)" />

          {/* Rugged Mars Terrain Topographic Curves */}
          <path d="M -10,35 Q 120,5 250,45 T 510,15 T 770,35" fill="none" stroke="#4a1911" strokeWidth="1" opacity="0.35" />
          <path d="M -10,145 Q 180,165 370,125 T 770,145" fill="none" stroke="#4a1911" strokeWidth="1" opacity="0.35" />
          <path d="M 40,-15 Q 230,45 420,-5 T 770,-15" fill="none" stroke="#4a1911" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
          <path d="M -10,95 Q 130,75 270,115 T 540,85 T 770,105" fill="none" stroke="#4a1911" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />

          {/* Monospace telemetry labels outside dome */}
          <text x="65" y="93" fill="rgba(234, 67, 53, 0.22)" fontSize="5.5" fontFamily="var(--font-tech)" letterSpacing="1">UNPROTECTED MARS WILDERNESS</text>
          <text x="695" y="93" fill="rgba(234, 67, 53, 0.22)" fontSize="5.5" fontFamily="var(--font-tech)" letterSpacing="1" text-anchor="end">OUTER CRATER WASTELAND</text>

          {/* ================= INTERNAL CITY: THE GEODESIC HABITAT DOME ================= */}
          
          {/* Main Geodesic Dome boundary circle (Inside is protected city space, outside is red Mars) */}
          <circle cx="380" cy="90" r="82" fill="url(#domeInternalGrad)" stroke="var(--neon-cyan)" strokeWidth="2.2" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.4))' }} />

          {/* Intricate Circular Grid (Concentric Ring Streets inside dome) */}
          <circle cx="380" cy="90" r="24" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
          <circle cx="380" cy="90" r="48" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
          <circle cx="380" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />

          {/* Dome spokes (Structural dividing trusses radiating from Metropolis center) */}
          <line x1="380" y1="90" x2="380" y2="8" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="380" y1="90" x2="309" y2="49" stroke="rgba(0, 240, 255, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="380" y1="90" x2="309" y2="131" stroke="rgba(0, 240, 255, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="380" y1="90" x2="451" y2="131" stroke="rgba(0, 240, 255, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="380" y1="90" x2="451" y2="49" stroke="rgba(0, 240, 255, 0.18)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Intricate radial street segments inside dome */}
          <line x1="380" y1="90" x2="380" y2="172" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
          <line x1="380" y1="90" x2="298" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
          <line x1="380" y1="90" x2="462" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />

          {/* Diagnostic major highway routing tubes */}
          <line x1="380" y1="90" x2="380" y2="30" stroke="#181e2b" strokeWidth="3" />
          <line x1="380" y1="90" x2="305" y2="55" stroke="#181e2b" strokeWidth="3" />
          <line x1="380" y1="90" x2="305" y2="125" stroke="#181e2b" strokeWidth="3" />
          <line x1="380" y1="90" x2="455" y2="125" stroke="#181e2b" strokeWidth="3" />

          {/* ACTIVE BLUE ROUTE guidance path (highlights route from Core to current active sector) */}
          {activeSector.id !== 'metropolis' && (
            <line
              x1="380"
              y1="90"
              x2={activeSector.coords.x}
              y2={activeSector.coords.y}
              stroke="#00f0ff" /* Glowing Cyan Route line for high contrast */
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#routeGlow)"
              className="active-navigation-route"
              style={{ transition: 'all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
            />
          )}

          {/* ================= COLOR-SHADED DOME DISTRICTS (Clickable segmented shapes) ================= */}
          
          {/* CITIZEN SUITE: Penthouse District (Top Segment) */}
          <Link href="/" passHref legacyBehavior>
            <g 
              className="maps-district-group suite-district"
              onClick={(e) => handleWarp(e, SECTORS[1])}
              onMouseEnter={() => setHoveredSector(SECTORS[1])}
              onMouseLeave={() => setHoveredSector(null)}
            >
              {/* Shaded curved polygon sector zone */}
              <path d="M 350,16 Q 380,10 410,16 L 400,44 Q 380,42 360,44 Z" className="district-shading" />
              {/* Building footprints inside district */}
              <rect x="362" y="20" width="14" height="8" className="building-footprint" />
              <rect x="384" y="20" width="14" height="8" className="building-footprint" />
              <rect x="372" y="32" width="16" height="6" className="building-footprint" />
              
              {/* CARTOGRAPHIC BACKING BUBBLE (High contrast text background pill) */}
              <rect x="340" y="36" width="80" height="11" rx="4.5" className="contrast-label-capsule" style={{ stroke: 'rgba(194,89,255,0.45)' }} />
              {/* Neighborhood name overlay label */}
              <text x="380" y="44" className="district-label-text">PENTHOUSE DIST.</text>
            </g>
          </Link>

          {/* METROPOLIS CORE: Civic Plaza (Center Sector) */}
          <Link href="/metropolis-core" passHref legacyBehavior>
            <g 
              className="maps-district-group metropolis-district"
              onClick={(e) => handleWarp(e, SECTORS[0])}
              onMouseEnter={() => setHoveredSector(SECTORS[0])}
              onMouseLeave={() => setHoveredSector(null)}
            >
              {/* Central hub shaded plaza circle */}
              <circle cx="380" cy="90" r="19" className="district-shading" />
              <circle cx="380" cy="90" r="5" className="building-footprint" style={{ fill: 'rgba(255,255,255,0.08)' }} />
              
              {/* CARTOGRAPHIC BACKING BUBBLE */}
              <rect x="340" y="86" width="80" height="11" rx="4.5" className="contrast-label-capsule" style={{ stroke: 'rgba(0,240,255,0.45)' }} />
              {/* Central text label */}
              <text x="380" y="94" className="district-label-text central-label">METROPOLIS CORE</text>
            </g>
          </Link>

          {/* PORTFOLIO DOME: Engineering Zone (Top-Left Sector) */}
          <Link href="/portfolio" passHref legacyBehavior>
            <g 
              className="maps-district-group portfolio-district"
              onClick={(e) => handleWarp(e, SECTORS[2])}
              onMouseEnter={() => setHoveredSector(SECTORS[2])}
              onMouseLeave={() => setHoveredSector(null)}
            >
              {/* Shaded sector polygon */}
              <path d="M 265,40 Q 295,25 325,35 L 335,65 Q 305,75 275,65 Z" className="district-shading" />
              
              {/* Server footprints inside zone */}
              <rect x="278" y="44" width="8" height="12" className="building-footprint" />
              <rect x="290" y="44" width="8" height="12" className="building-footprint" />
              <rect x="312" y="44" width="8" height="12" className="building-footprint" />
              
              {/* CARTOGRAPHIC BACKING BUBBLE */}
              <rect x="265" y="61" width="80" height="11" rx="4.5" className="contrast-label-capsule" style={{ stroke: 'rgba(41,121,255,0.45)' }} />
              {/* Text label */}
              <text x="305" y="69" className="district-label-text">ENGINEERING ZONE</text>
            </g>
          </Link>

          {/* BIOSPHERE DOME: Eco-Agri Park (Bottom-Left Sector) */}
          <Link href="/atmosphere-dome" passHref legacyBehavior>
            <g 
              className="maps-district-group biosphere-district"
              onClick={(e) => handleWarp(e, SECTORS[3])}
              onMouseEnter={() => setHoveredSector(SECTORS[3])}
              onMouseLeave={() => setHoveredSector(null)}
            >
              {/* Shaded sector segment */}
              <path d="M 275,115 Q 305,105 335,115 L 325,145 Q 295,155 265,140 Z" className="district-shading" />
              
              {/* Circular hydroponic pods and green canals */}
              <circle cx="282" cy="126" r="6" className="building-footprint" style={{ stroke: 'rgba(0, 255, 136, 0.25)' }} />
              <rect x="294" y="122" width="22" height="4" className="building-footprint" rx="2" />
              
              {/* CARTOGRAPHIC BACKING BUBBLE */}
              <rect x="270" y="131" width="70" height="11" rx="4.5" className="contrast-label-capsule" style={{ stroke: 'rgba(0,255,136,0.45)' }} />
              {/* Text label */}
              <text x="305" y="139" className="district-label-text">ECO-AGRI PARK</text>
            </g>
          </Link>

          {/* QUANTUM NET: Telecom Grid (Bottom-Right Sector) */}
          <Link href="/quantum-net" passHref legacyBehavior>
            <g 
              className="maps-district-group quantum-district"
              onClick={(e) => handleWarp(e, SECTORS[4])}
              onMouseEnter={() => setHoveredSector(SECTORS[4])}
              onMouseLeave={() => setHoveredSector(null)}
            >
              {/* Shaded sector polygon */}
              <path d="M 425,115 Q 455,105 485,115 L 495,140 Q 465,155 435,145 Z" className="district-shading" />
              
              {/* Grid antennas and solar collector rows */}
              <line x1="442" y1="126" x2="478" y2="126" stroke="rgba(255, 179, 0, 0.35)" strokeWidth="1" strokeDasharray="2 2" className="building-footprint" />
              <rect x="450" y="132" width="8" height="6" className="building-footprint" />
              
              {/* CARTOGRAPHIC BACKING BUBBLE */}
              <rect x="420" y="131" width="70" height="11" rx="4.5" className="contrast-label-capsule" style={{ stroke: 'rgba(255,179,0,0.45)' }} />
              {/* Text label */}
              <text x="455" y="139" className="district-label-text">TELECOM GRID</text>
            </g>
          </Link>

          {/* Transparent Glass Geodesic dome glaze reflection */}
          <circle cx="380" cy="90" r="82" fill="rgba(0, 240, 255, 0.02)" pointerEvents="none" />
          <path d="M 302,68 A 82 82 0 0 1 458,68" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.8" pointerEvents="none" />
          <path d="M 334,70 A 50 50 0 0 1 426,70" fill="none" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.6" pointerEvents="none" />

          {/* Sinuous inner street label names */}
          <text x="386" y="58" className="street-overlay-label" transform="rotate(-90 386 58)">Core Corridor</text>

        </svg>

        {/* Pulsing Red Teardrop Pin over active sector */}
        <div
          style={{
            position: 'absolute',
            left: `${(activeSector.coords.x / 760) * 100}%`,
            top: `${(activeSector.coords.y / 180) * 100}%`,
            transform: 'translate(-50%, -90%)',
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)',
            pointerEvents: 'none'
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            width="22px" 
            height="22px" 
            style={{ 
              fill: '#ea4335', /* High Contrast Red Teardrop Pin */
              filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.55))',
              animation: 'pin-bounce 1s infinite alternate' 
            }}
          >
            <path d="M 12 2 C 6.48 2 2 6.48 2 12 C 2 17.52 12 22 12 22 C 12 22 22 17.52 22 12 C 22 6.48 17.52 2 12 2 Z M 12 15 C 10.34 15 9 13.66 9 12 C 9 10.34 10.34 9 12 9 C 13.66 9 15 10.34 15 12 C 15 13.66 13.66 15 12 15 Z" />
          </svg>
          <ellipse 
            cx="10" 
            cy="1" 
            rx="4" 
            ry="1.2" 
            fill="rgba(0,0,0,0.4)" 
            style={{ 
              marginTop: '1px', 
              animation: 'shadow-scale 1s infinite alternate',
              transform: 'translateX(2px)' 
            }} 
          />
        </div>

        {/* Distance Scale Bar Overlay (Bottom-Left) */}
        <div className="maps-scale-bar-overlay">
          <div className="scale-line"></div>
          <span>500 m</span>
        </div>

        {/* ================= DYNAMIC FLOATING DISTRICT TOOLTIP CARD ================= */}
        {hoveredSector && (
          <div 
            className="google-district-tooltip-card"
            style={{
              left: `${(hoveredSector.coords.x / 760) * 100}%`,
              top: `${(hoveredSector.coords.y / 180) * 100}%`,
              borderColor: hoveredSector.color,
              boxShadow: `0 10px 28px rgba(0,0,0,0.5), 0 0 15px ${hoveredSector.color}25`
            }}
          >
            <div className="tooltip-header">
              <span className="tooltip-icon">{hoveredSector.icon}</span>
              <div className="tooltip-title-block">
                <div className="tooltip-name">{hoveredSector.name}</div>
                <div className="tooltip-sub" style={{ color: hoveredSector.color }}>{hoveredSector.label.toUpperCase()}</div>
              </div>
            </div>
            <div className="tooltip-body">
              {hoveredSector.desc}
            </div>
            <div className="tooltip-footer">
              <span className="tooltip-time-val">{hoveredSector.time}</span>
              <span className="tooltip-click-cta">Click to Warp</span>
            </div>
            <div className="tooltip-arrow" style={{ borderTopColor: hoveredSector.color }}></div>
          </div>
        )}

      </div>

      <style jsx global>{`
        /* ================= DOME MAP 2D ROADMAP SYSTEM STYLES ================= */
        .google-dome-navigator {
          display: flex;
          width: min(760px, 92vw);
          height: 180px;
          position: relative;
          background: #080a10;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.06);
          overflow: visible !important; /* Critical to prevent tooltip clipping */
          user-select: none;
          z-index: 10;
        }

        .map-view-deck {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          overflow: visible !important; /* Critical to prevent tooltip clipping */
        }

        .map-vector-canvas {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 17px;
        }

        /* Overlay text metadata */
        .gps-coordinates-overlay {
          position: absolute;
          top: 8px;
          left: 14px;
          font-family: var(--font-tech);
          font-size: 0.52rem;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.5px;
          font-weight: 700;
          pointer-events: none;
          z-index: 3;
        }

        .compass-needle-overlay {
          position: absolute;
          top: 8px;
          right: 14px;
          pointer-events: none;
          z-index: 3;
          display: flex;
          align-items: center;
          background: rgba(13, 17, 28, 0.85);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 4px;
          border-radius: 4px;
        }

        .maps-scale-bar-overlay {
          position: absolute;
          bottom: 8px;
          left: 14px;
          pointer-events: none;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .scale-line {
          width: 35px;
          height: 3px;
          border-left: 1.5px solid rgba(255,255,255,0.7);
          border-right: 1.5px solid rgba(255,255,255,0.7);
          border-bottom: 1px solid rgba(255,255,255,0.7);
        }

        .maps-scale-bar-overlay span {
          font-family: var(--font-tech);
          font-size: 0.45rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 700;
          letter-spacing: 0.2px;
        }

        /* Active Blue Path Route Animation */
        .active-navigation-route {
          stroke-dasharray: 6 3;
          animation: route-flow 1.5s linear infinite;
        }

        @keyframes route-flow {
          to { stroke-dashoffset: -18; }
        }

        /* Faint road name overlays */
        .street-overlay-label {
          font-family: var(--font-tech);
          font-size: 0.48rem;
          fill: rgba(0, 240, 255, 0.22);
          letter-spacing: 0.5px;
          font-weight: 700;
          pointer-events: none;
          text-anchor: middle;
        }

        /* ================= DOME DISTRICTS (Interactive polygons) ================= */
        .maps-district-group {
          cursor: pointer;
          pointer-events: all;
        }

        /* Default District shading zones */
        .district-shading {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          stroke: transparent;
          stroke-width: 1.2;
        }

        .building-footprint {
          fill: rgba(255, 255, 255, 0.02);
          stroke: rgba(255, 255, 255, 0.035);
          stroke-width: 0.4;
          transition: all 0.3s ease;
        }

        /* High-Contrast Cartographic Backing Bubble Capsules */
        .contrast-label-capsule {
          fill: rgba(6, 9, 20, 0.86);
          stroke-width: 0.7;
          transition: all 0.3s ease;
        }

        .district-label-text {
          font-family: var(--font-tech);
          font-size: 0.52rem;
          fill: rgba(255, 255, 255, 0.65);
          font-weight: 900;
          letter-spacing: 0.8px;
          text-anchor: middle;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .district-label-text.central-label {
          font-size: 0.48rem;
          fill: rgba(255, 255, 255, 0.6);
        }

        /* Interactive colorings per district on hover */
        .suite-district .district-shading { fill: rgba(194, 89, 255, 0.03); }
        .suite-district:hover .district-shading { 
          fill: rgba(194, 89, 255, 0.12); 
          stroke: rgba(194, 89, 255, 0.45);
        }
        .suite-district:hover .building-footprint {
          fill: rgba(194, 89, 255, 0.1);
          stroke: rgba(194, 89, 255, 0.2);
        }
        .suite-district:hover .contrast-label-capsule {
          fill: rgba(6, 9, 20, 0.95);
          stroke: var(--neon-violet) !important;
        }
        .suite-district:hover .district-label-text {
          fill: var(--neon-violet);
          text-shadow: 0 0 5px rgba(194, 89, 255, 0.6);
        }

        .metropolis-district .district-shading { fill: rgba(0, 240, 255, 0.03); }
        .metropolis-district:hover .district-shading { 
          fill: rgba(0, 240, 255, 0.12); 
          stroke: rgba(0, 240, 255, 0.45);
        }
        .metropolis-district:hover .building-footprint {
          fill: rgba(0, 240, 255, 0.1);
          stroke: rgba(0, 240, 255, 0.2);
        }
        .metropolis-district:hover .contrast-label-capsule {
          fill: rgba(6, 9, 20, 0.95);
          stroke: var(--neon-cyan) !important;
        }
        .metropolis-district:hover .district-label-text {
          fill: var(--neon-cyan);
          text-shadow: 0 0 5px rgba(0, 240, 255, 0.6);
        }

        .portfolio-district .district-shading { fill: rgba(41, 121, 255, 0.02); }
        .portfolio-district:hover .district-shading { 
          fill: rgba(41, 121, 255, 0.12); 
          stroke: rgba(41, 121, 255, 0.45);
        }
        .portfolio-district:hover .building-footprint {
          fill: rgba(41, 121, 255, 0.08);
          stroke: rgba(41, 121, 255, 0.18);
        }
        .portfolio-district:hover .contrast-label-capsule {
          fill: rgba(6, 9, 20, 0.95);
          stroke: #2979ff !important;
        }
        .portfolio-district:hover .district-label-text {
          fill: #2979ff;
          text-shadow: 0 0 5px rgba(41, 121, 255, 0.6);
        }

        .biosphere-district .district-shading { fill: rgba(0, 255, 136, 0.02); }
        .biosphere-district:hover .district-shading { 
          fill: rgba(0, 255, 136, 0.12); 
          stroke: rgba(0, 255, 136, 0.45);
        }
        .biosphere-district:hover .building-footprint {
          fill: rgba(0, 255, 136, 0.08);
          stroke: rgba(0, 255, 136, 0.18);
        }
        .biosphere-district:hover .contrast-label-capsule {
          fill: rgba(6, 9, 20, 0.95);
          stroke: var(--neon-emerald) !important;
        }
        .biosphere-district:hover .district-label-text {
          fill: var(--neon-emerald);
          text-shadow: 0 0 5px rgba(0, 255, 136, 0.6);
        }

        .quantum-district .district-shading { fill: rgba(255, 179, 0, 0.02); }
        .quantum-district:hover .district-shading { 
          fill: rgba(255, 179, 0, 0.12); 
          stroke: rgba(255, 179, 0, 0.45);
        }
        .quantum-district:hover .building-footprint {
          fill: rgba(255, 179, 0, 0.08);
          stroke: rgba(255, 179, 0, 0.18);
        }
        .quantum-district:hover .contrast-label-capsule {
          fill: rgba(6, 9, 20, 0.95);
          stroke: var(--neon-amber) !important;
        }
        .quantum-district:hover .district-label-text {
          fill: var(--neon-amber);
          text-shadow: 0 0 5px rgba(255, 179, 0, 0.6);
        }

        /* Highlight active states based on route */
        .suite-district.active-district .district-label-text { fill: var(--neon-violet); }
        .metropolis-district.active-district .district-label-text { fill: var(--neon-cyan); }
        .portfolio-district.active-district .district-label-text { fill: #2979ff; }
        .biosphere-district.active-district .district-label-text { fill: var(--neon-emerald); }
        .quantum-district.active-district .district-label-text { fill: var(--neon-amber); }

        /* ================= GOOGLE DISTRICT TOOLTIP CARD ================= */
        .google-district-tooltip-card {
          position: absolute;
          transform: translate(-50%, -125%);
          background: rgba(10, 13, 22, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 8px;
          padding: 8px 12px;
          width: 190px;
          pointer-events: none;
          z-index: 100;
          font-family: var(--font-sans);
          transition: transform 0.1s ease;
          backdrop-filter: blur(10px);
          animation: tooltip-show 0.15s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        @keyframes tooltip-show {
          from { opacity: 0; transform: translate(-50%, -118%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -125%) scale(1); }
        }

        .tooltip-header {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-bottom: 5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 4px;
        }

        .tooltip-icon {
          font-size: 1rem;
        }

        .tooltip-title-block {
          display: flex;
          flex-direction: column;
        }

        .tooltip-name {
          font-family: var(--font-tech);
          font-weight: 700;
          font-size: 0.65rem;
          color: var(--text-primary);
          letter-spacing: 0.2px;
        }

        .tooltip-sub {
          font-family: var(--font-tech);
          font-size: 0.45rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .tooltip-body {
          font-size: 0.55rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .tooltip-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-tech);
          font-size: 0.45rem;
        }

        .tooltip-time-val {
          color: var(--text-primary);
          font-weight: 700;
        }

        .tooltip-click-cta {
          color: #1a73e8;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.2px;
        }

        .tooltip-arrow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 99%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid rgba(10, 13, 22, 0.96);
        }

        @keyframes pin-bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-4px); }
        }

        @keyframes shadow-scale {
          from { transform: scale(1); opacity: 0.3; }
          to { transform: scale(0.85); opacity: 0.15; }
        }

        /* ================= MOBILE RESPONSIVE STYLING ================= */
        @media (max-width: 768px) {
          .google-dome-navigator {
            height: 140px;
          }
          .district-label-text {
            font-size: 0.45rem;
          }
          .google-district-tooltip-card {
            width: 155px;
            padding: 6px 10px;
          }
          .tooltip-name {
            font-size: 0.55rem;
          }
          .tooltip-body {
            display: none;
          }
          .gps-coordinates-overlay {
            font-size: 0.45rem;
            top: 4px;
            left: 8px;
          }
          .compass-needle-overlay {
            top: 4px;
            right: 8px;
          }
        }
      `}</style>
    </div>
  );
}
