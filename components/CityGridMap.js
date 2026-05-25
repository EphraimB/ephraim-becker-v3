'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// 1. Pressurized Colony Network Coordinates Map (in meters)
const COORDS = {
  '/': { x: 0, y: 0, name: 'CITIZEN SUITE' },
  '/portfolio': { x: -220, y: 0, name: 'PORTFOLIO ARCHIVES' },
  'academics': { x: 0, y: 120, name: 'ACADEMIC SYNC' }, // Academics sector toggled
  '/atmosphere-dome': { x: -150, y: 150, name: 'BIOSPHERE DOME' },
  '/quantum-net': { x: -150, y: -150, name: 'QUANTUM NET' },
  '/metropolis-core': { x: 250, y: 0, name: 'METROPOLIS CORE' }
};

export default function CityGridMap({ isDrawer = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mapHoverNode, setMapHoverNode] = useState(null);
  const [academicSyncActive, setAcademicSyncActive] = useState(false);

  // Helper to check if a route is currently active
  const isRouteActive = (route) => pathname === route;

  // Teleportation navigator
  const handleTeleport = (route) => {
    if (route) {
      router.push(route);
    }
  };

  // 2. Real-Time Spatial Walking Distance & Time Calculator (Corridor walk at 1.2 m/s)
  const getWalkingDetails = (toPathOrKey) => {
    const fromPath = pathname || '/';
    const from = COORDS[fromPath] || COORDS['/'];
    const to = COORDS[toPathOrKey] || COORDS['/'];
    
    if (fromPath === toPathOrKey) {
      return '[📍 CURRENT SECTOR / ACTIVE NEXUS]';
    }
    
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.round(Math.sqrt(dx * dx + dy * dy));
    
    const speed = 1.2; // meters per second walking speed
    const timeSeconds = Math.round(distance / speed);
    const mins = Math.floor(timeSeconds / 60);
    const secs = timeSeconds % 60;
    
    const timeStr = mins > 0 ? `${mins}m ${secs.toString().padStart(2, '0')}s` : `${secs}s`;
    const fromName = from.name || 'ACTIVE BASE';
    
    return `🏃 ${distance}m walk from ${fromName} (${timeStr} corridor transit)`;
  };

  // Sector Themes for HUD Stack
  const sectors = [
    {
      id: 'suite',
      label: 'ACTIVE NEXUS // CITIZEN SUITE',
      title: 'CITIZEN SUITE',
      route: '/',
      color: '#ff5722',
      rgb: '255, 87, 34',
      icon: '🏠',
      desc: 'Central colony command penthouse'
    },
    {
      id: 'portfolio',
      label: 'SECTOR 01 // PORTFOLIO',
      title: 'PORTFOLIO ARCHIVES',
      route: '/portfolio',
      color: '#c259ff',
      rgb: '194, 89, 255',
      icon: '📂',
      desc: 'Retrospective engineering files'
    }
  ];

  // ================= RENDER INTERACTIVE ACADEMIC TELEMETRY EXPANSION =================
  const renderAcademicTelemetryContent = (isInline) => {
    return (
      <div 
        style={{
          marginTop: isInline ? '10px' : '0',
          borderTop: isInline ? '1.5px solid rgba(0, 240, 255, 0.25)' : 'none',
          paddingTop: isInline ? '12px' : '0',
          textAlign: 'left',
          animation: 'modal-scale-up 0.25s cubic-bezier(0.25, 0.8, 0.25, 1) forwards'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'monospace, var(--font-tech)', fontSize: '0.65rem', color: '#00f0ff', fontWeight: 'bold', letterSpacing: '1px' }}>
            📡 SYSTEM_SYNC // ACADEMIC_LOG
          </span>
          {!isInline && (
            <button 
              onClick={() => setAcademicSyncActive(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                padding: '4px'
              }}
            >
              [✕]
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: isInline ? 'column' : 'row', gap: '14px' }}>
          {/* Academy details */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.74rem', color: '#ffffff', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '3px' }}>
              Adelphi University CSC
            </div>
            <div style={{ fontSize: '0.58rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace', marginBottom: '8px' }}>
              REMOTE CADET // SOLS ARCHIVES
            </div>
            <p style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: '1.45' }}>
              Studying database query efficiencies, binary search tree logic, index optimization architectures, and mathematical logic pathways via Calculus.
            </p>
          </div>

          {/* Integral SVG graph */}
          <div 
            style={{ 
              width: isInline ? '100%' : '160px', 
              background: '#04060c', 
              borderRadius: '6px', 
              border: '1.5px solid rgba(0, 240, 255, 0.15)', 
              padding: '8px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}
          >
            <span style={{ fontSize: '0.52rem', color: '#00f0ff', fontFamily: 'monospace', display: 'block', textAlign: 'center', marginBottom: '4px' }}>
              CALCULUS_SLOPE (dy/dx)
            </span>
            <svg viewBox="0 0 100 45" width="100%" height="34px">
              <line x1="5" y1="38" x2="95" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <line x1="20" y1="5" x2="20" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <path d="M 20,38 Q 45,5 75,20 T 95,5" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
              <circle cx="75" cy="20" r="2.5" fill="#ffb300" />
            </svg>
            <span style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', textAlign: 'center', marginTop: '4px' }}>
              INTEGRAL LIMIT: NOMINAL
            </span>
          </div>
        </div>
      </div>
    );
  };


  // ================= BLUEPRINT HOLOGRAPHIC BACKGROUND SVG =================
  const renderBlueprintBackgroundMap = () => {
    return (
      <div 
        className="blueprint-map-backdrop"
        style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: 0.08, 
          pointerEvents: 'none', 
          zIndex: 0, 
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 400 400" 
          preserveAspectRatio="xMidYMid slice"
          style={{ display: 'block' }}
        >
          {/* Concentric scanning coordinates (Vatican organic top-down cue) */}
          <circle cx="200" cy="200" r="180" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="200" cy="200" r="130" fill="none" stroke="#00f0ff" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="80" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="200" cy="200" r="30" fill="none" stroke="#00f0ff" strokeWidth="0.8" />
          
          {/* Main coordinate crosshairs */}
          <line x1="10" y1="200" x2="390" y2="200" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="200" y1="10" x2="200" y2="390" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="4 4" />
          
          {/* Airtight containment perimeter wall boundary polygon */}
          <polygon 
            points="80,260 40,180 80,100 180,40 320,40 360,110 360,200 320,280 200,320"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
          />
          
          {/* Maglev transit track pathway at base */}
          <path 
            d="M 65,260 C 120,310 280,310 335,260" 
            fill="none" 
            stroke="#00f0ff" 
            strokeWidth="2" 
            strokeDasharray="3 5" 
          />
          
          {/* Atmospheric Generator Nodes */}
          <circle cx="80" cy="100" r="4" fill="#00ff88" opacity="0.5" />
          <circle cx="320" cy="40" r="4" fill="#00ff88" opacity="0.5" />
          <circle cx="360" cy="200" r="4" fill="#00ff88" opacity="0.5" />
          
          {/* Interconnecting cyber pressurized tubes */}
          <line x1="200" y1="120" x2="200" y2="280" stroke="#c259ff" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="100" y1="200" x2="300" y2="200" stroke="#c259ff" strokeWidth="0.8" strokeDasharray="2 4" />
        </svg>
      </div>
    );
  };


  // ================= MAIN LAYOUT =================

  return (
    <div 
      className="drawer-hud-console"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#020306',
        color: '#ffffff',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* 1. Immersive holographic map background blueprint */}
      {renderBlueprintBackgroundMap()}

      {/* 2. Top Status HUD Bar */}
      <div 
        className="map-coordinate-overlay"
        style={{
          padding: isDrawer ? '10px 16px' : '12px 20px',
          fontSize: '0.62rem',
          fontFamily: 'monospace, var(--font-tech)',
          borderBottom: '1.5px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(0, 0, 0, 0.35)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'rgba(255, 255, 255, 0.6)',
          letterSpacing: '1px',
          flexShrink: 0,
          zIndex: 1,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        <span>ARES_HABITAT // REALTIME_NAV_CONSOLE</span>
        {mapHoverNode && <span style={{ color: '#00f0ff' }}>[ TARGET: {mapHoverNode.toUpperCase()} ]</span>}
      </div>

      {/* 3. Scrollable list of highly-tactile HUD cards */}
      <div 
        className="custom-scroll" 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: isDrawer ? '12px 16px 20px 16px' : '16px 20px 24px 20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          zIndex: 1
        }}
      >
        <div style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '2px', textAlign: 'center', fontWeight: 'bold' }}>
          Pressurized Corridor Route Configurator
        </div>

        {sectors.map((sector) => {
          const isAcad = sector.id === 'academics';
          const isCurrentActive = isAcad ? academicSyncActive : isRouteActive(sector.route);

          return (
            <div 
              key={sector.id}
              onClick={() => {
                if (isAcad) {
                  setAcademicSyncActive(!academicSyncActive);
                } else {
                  handleTeleport(sector.route);
                }
              }}
              onMouseEnter={() => setMapHoverNode(sector.title)}
              onMouseLeave={() => setMapHoverNode(null)}
              className="touch-card"
              style={{
                background: 'rgba(4, 6, 12, 0.72)',
                border: `1.5px solid ${isCurrentActive ? sector.color : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '10px',
                padding: '14px 16px',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                boxShadow: isCurrentActive ? `0 0 15px rgba(${sector.rgb}, 0.15)` : 'none',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)'
              }}
            >
              {/* Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: isCurrentActive ? sector.color : 'rgba(255, 255, 255, 0.45)', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                  {sector.label}
                </span>
                {isCurrentActive && (
                  <span 
                    className="active-pulse-dot" 
                    style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      background: sector.color, 
                      boxShadow: `0 0 8px ${sector.color}`,
                      animation: 'pulse-dot 1.2s infinite alternate'
                    }}
                  ></span>
                )}
              </div>

              {/* Title & Redirection Target Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'monospace, var(--font-tech)', fontSize: '0.86rem', color: '#ffffff', fontWeight: 'bold' }}>
                  {sector.icon} {sector.title}
                </span>
                <span style={{ fontSize: '0.58rem', color: isCurrentActive ? sector.color : 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace', fontWeight: 600 }}>
                  {isAcad ? (academicSyncActive ? '[TAP TO BREAK SYNC]' : '[TAP TO SYNC DATA]') : (isCurrentActive ? '[📍 CURRENT LOCATION]' : '[➔ TELEPORT]')}
                </span>
              </div>

              {/* Dynamic walking distance metrics or inline details */}
              <div 
                style={{ 
                  fontSize: '0.65rem', 
                  color: isCurrentActive ? '#ffffff' : 'rgba(255,255,255,0.5)', 
                  fontFamily: 'monospace', 
                  textAlign: 'left', 
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {/* Dynamically calculated pressurized walks */}
                {getWalkingDetails(sector.route || 'academics')}
              </div>

              {/* Sector Description */}
              <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textAlign: 'left', marginTop: '2px', borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '4px' }}>
                {sector.desc}
              </div>

              {/* Inline Academics Sync expansion */}
              {isAcad && academicSyncActive && renderAcademicTelemetryContent(true)}

            </div>
          );
        })}
      </div>

      {/* 4. Absolute Academic overlay for desktop dashboard homepage when toggled */}
      {!isDrawer && academicSyncActive && (
        <div 
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            maxHeight: '190px',
            background: 'rgba(6, 10, 18, 0.94)',
            border: '2px solid #00f0ff',
            borderRadius: '8px',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.25)',
            padding: '14px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 30
          }}
        >
          {renderAcademicTelemetryContent(false)}
        </div>
      )}

    </div>
  );
}
