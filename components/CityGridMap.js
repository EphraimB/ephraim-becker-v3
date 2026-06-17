'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import NavIconSvg from './NavIconSvg';

const COORDS = {
  '/': { x: 0, y: 0, name: 'CITIZEN SUITE' },
  '/portfolio': { x: -449, y: -30, name: 'PORTFOLIO ARCHIVES' },
  '/research': { x: -449, y: 30, name: 'RESEARCH LAB' },
  '/research/nanobot-pill': { x: -449, y: 30, name: 'RESEARCH LAB - BCI PILL' },
  '/park': { x: 150, y: -100, name: 'ARES CITY PARK' },
  '/neurodiversity': { x: 150, y: -100, name: 'ARES CITY PARK - NEURODIVERSITY LAWN - WELCOME PLAZA' },
  '/neurodiversity/comms-grove': { x: 150, y: -100, name: 'ARES CITY PARK - NEURODIVERSITY LAWN - DIALOGUE BRIDGES' },
  '/neurodiversity/sensory-garden': { x: 150, y: -100, name: 'ARES CITY PARK - NEURODIVERSITY LAWN - SENSORY GARDEN' },
  '/neurodiversity/lexicon-pavilion': { x: 150, y: -100, name: 'ARES CITY PARK - NEURODIVERSITY LAWN - LEXICON PAVILION' },
  '/neurodiversity/meetup-campfire': { x: 150, y: -100, name: 'ARES CITY PARK - NEURODIVERSITY LAWN - COMMUNITY HEARTH' },
  'academics': { x: 0, y: 120, name: 'ACADEMIC SYNC' },
  '/museum': { x: 180, y: 80, name: 'ARES CITY MUSEUM' }
};

// Realistic walking speed and distance constants
const WALK_SPEED = 1.35; // meters per second walking speed
const WALK_DISTANCE = 50; // meters (indoor hallway walk)

// Formats meters into kilometers with decimal precision when it reaches or exceeds 1km (1000m)
const formatDistance = (meters) => {
  if (meters >= 1000) {
    const km = meters / 1000;
    return `${parseFloat(km.toFixed(1))}km`;
  }
  return `${meters}m`;
};

// Dynamic Day/Night Background calculation based on Sol fraction
const getDynamicBackground = (fraction) => {
  let t = 0;
  if (fraction >= 0.2 && fraction < 0.3) {
    t = (fraction - 0.2) / 0.1;
  } else if (fraction >= 0.3 && fraction < 0.7) {
    t = 1;
  } else if (fraction >= 0.7 && fraction < 0.8) {
    t = 1 - (fraction - 0.7) / 0.1;
  } else {
    t = 0;
  }

  // Day colors: dusty Martian red (RGB: [42, 14, 10])
  // Night colors: deep dark blue/violet (RGB: [8, 8, 28])
  const r = Math.round(8 + t * (42 - 8));
  const g = Math.round(8 + t * (14 - 8));
  const b = Math.round(28 + t * (10 - 28));

  // Secondary gradient color
  const r2 = Math.round(13 + t * (46 - 13));
  const g2 = Math.round(13 + t * (16 - 13));
  const b2 = Math.round(43 + t * (12 - 43));

  return `linear-gradient(135deg, rgb(${r}, ${g}, ${b}) 0%, rgb(${r2}, ${g2}, ${b2}) 100%)`;
};

// Sci-Fi Scrambled text component
function ScrambledText({ text, animate }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!animate) {
      setDisplayText(text);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const chars = 'XXYYZZ0123456789%@#$&*+=?';
    const duration = 25;
    const totalFrames = 20;
    frameRef.current = 0;

    intervalRef.current = setInterval(() => {
      frameRef.current += 1;
      const progress = frameRef.current / totalFrames;

      if (progress >= 1) {
        setDisplayText(text);
        clearInterval(intervalRef.current);
        return;
      }

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          const charProgress = index / text.length;
          if (charProgress < progress) {
            return char;
          }
          if (/\d/.test(char)) {
            return Math.floor(Math.random() * 10).toString();
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(scrambled);
    }, duration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animate, text]);

  return <span>{displayText}</span>;
}

export default function CityGridMap({ isDrawer = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mapHoverNode, setMapHoverNode] = useState(null);
  const [academicSyncActive, setAcademicSyncActive] = useState(false);
  const [isDistrictExpanded, setIsDistrictExpanded] = useState(true);
  const [hoveredSectorId, setHoveredSectorId] = useState(null);
  const [solFraction, setSolFraction] = useState(0.5);

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const my38StartUTC = Date.UTC(2024, 10, 12, 0, 0, 0);
      const timeDeltaMs = now.getTime() - my38StartUTC;
      const deltaEarthDays = timeDeltaMs / (1000 * 60 * 60 * 24);
      const totalSolsSinceMY38 = deltaEarthDays / 1.02749125;
      const solsElapsed = Math.max(0, totalSolsSinceMY38);
      setSolFraction(solsElapsed - Math.floor(solsElapsed));
    }
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const [chargingRoute, setChargingRoute] = useState(null);

  // Helper to check if a route is currently active
  const isRouteActive = (route) => pathname === route;

  // Teleportation navigator
  const handleTeleport = (route) => {
    if (!route || chargingRoute) return;
    setChargingRoute(route);
    setTimeout(() => {
      router.push(route);
      setChargingRoute(null);
    }, 300);
  };

  // 2. Real-Time Spatial Biking Distance & Time Calculator (Cycle at 5.0 m/s with 10x spatial coordinate scale for realism)
  const getBikingDetails = (toPathOrKey, animate) => {
    const fromPath = pathname || '/';
    const from = COORDS[fromPath] || COORDS['/'];
    const to = COORDS[toPathOrKey] || COORDS['/'];

    if (fromPath === toPathOrKey) {
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '12px', height: '12px', display: 'inline-block', flexShrink: 0, color: 'currentColor' }}>
            <NavIconSvg type="pin" />
          </span>
          <ScrambledText text="CURRENT SECTOR / ACTIVE NEXUS" animate={animate} />
        </span>
      );
    }

    if (toPathOrKey === '/park' && (fromPath === '/park' || fromPath.startsWith('/neurodiversity'))) {
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '12px', height: '12px', display: 'inline-block', flexShrink: 0, color: 'currentColor' }}>
            <NavIconSvg type="pin" />
          </span>
          <ScrambledText text="CURRENT SECTOR / ACTIVE NEXUS" animate={animate} />
        </span>
      );
    }

    if ((fromPath === '/research' && toPathOrKey === '/research/nanobot-pill') || 
        (fromPath === '/research/nanobot-pill' && toPathOrKey === '/research')) {
      const walkTimeSeconds = Math.round(WALK_DISTANCE / WALK_SPEED);
      const mins = Math.floor(walkTimeSeconds / 60);
      const secs = walkTimeSeconds % 60;
      const timeStr = mins > 0 ? `${mins}m ${secs.toString().padStart(2, '0')}s` : `${secs}s`;
      const walkText = `${formatDistance(WALK_DISTANCE)} walk from ${from.name} (${timeStr} indoor hallway walk)`;
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '12px', height: '12px', display: 'inline-block', flexShrink: 0, color: 'currentColor' }}>
            <NavIconSvg type="walk" />
          </span>
          <ScrambledText text={walkText} animate={animate} />
        </span>
      );
    }

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    // Scale coordinate units by 10 to represent realistic dome-to-dome distances in meters
    const distance = Math.round(Math.sqrt(dx * dx + dy * dy)) * 10;

    const speed = 5.0; // meters per second cycling speed (18 km/h or 11.2 mph)
    const timeSeconds = Math.round(distance / speed);
    const mins = Math.floor(timeSeconds / 60);
    const secs = timeSeconds % 60;

    const timeStr = mins > 0 ? `${mins}m ${secs.toString().padStart(2, '0')}s` : `${secs}s`;
    const fromName = from.name || 'ACTIVE BASE';
    const bikeText = `${formatDistance(distance)} cycle from ${fromName} (${timeStr} bike lane transit)`;

    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span style={{ width: '12px', height: '12px', display: 'inline-block', flexShrink: 0, color: 'currentColor' }}>
          <NavIconSvg type="bike" />
        </span>
        <ScrambledText text={bikeText} animate={animate} />
      </span>
    );
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
      icon: 'suite',
      desc: 'Central colony command penthouse'
    },
    {
      id: 'portfolio',
      label: 'SECTOR 01 // PORTFOLIO',
      title: 'PORTFOLIO ARCHIVES',
      route: '/portfolio',
      color: '#c259ff',
      rgb: '194, 89, 255',
      icon: 'portfolio',
      desc: 'Retrospective engineering files'
    },
    {
      id: 'research',
      label: 'SECTOR 02 // RESEARCH',
      title: 'RESEARCH LAB',
      route: '/research',
      color: '#ffb300',
      rgb: '255, 179, 0',
      icon: 'research',
      desc: 'Speculative quantum engineering & future colony concepts'
    },
    {
      id: 'museum',
      label: 'COLONY HISTORY // MUSEUM',
      title: 'ARES CITY MUSEUM',
      route: '/museum',
      color: '#00f0ff',
      rgb: '0, 240, 255',
      icon: 'museum',
      desc: 'Colony history & website engineering blueprints'
    },
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
            <img
              src="/assets/svgs/citygrid_calculus.svg"
              alt="Calculus slope graph"
              width="100%"
              height="34px"
              style={{ display: 'block' }}
            />
            <span style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', textAlign: 'center', marginTop: '4px' }}>
              INTEGRAL LIMIT: NOMINAL
            </span>
          </div>
        </div>
      </div>
    );
  };


  // ================= ARES CITY HABITAT BACKGROUND IMAGE =================
  const renderBlueprintBackgroundMap = () => {
    return (
      <div
        className="blueprint-map-backdrop"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}
      >
        <img
          src="/assets/images/backgrounds/ares-city-habitat.png"
          alt="Ares City Habitat"
          width="100%"
          height="100%"
          style={{ display: 'block', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
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
        flex: 1,
        minHeight: 0,
        background: getDynamicBackground(solFraction),
        color: '#ffffff',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: 'background 1.5s ease-in-out'
      }}
    >
      {/* 1. Immersive holographic map background blueprint */}
      {renderBlueprintBackgroundMap()}

      {/* 2. Top Status HUD Bar */}
      <div
        className="map-coordinate-overlay"
        style={{
          padding: isDrawer ? '8px 12px' : '12px 20px',
          fontSize: isDrawer ? '0.56rem' : '0.62rem',
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
          WebkitBackdropFilter: 'blur(10px)',
          gap: '10px'
        }}
      >
        <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          {isDrawer ? 'NAV_CONSOLE' : 'ARES_HABITAT // REALTIME_NAV_CONSOLE'}
        </span>
        <span style={{
          color: mapHoverNode ? '#00f0ff' : 'rgba(255, 255, 255, 0.25)',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          maxWidth: isDrawer ? '220px' : 'none',
          flexShrink: 0,
          transition: 'all 0.15s ease'
        }}>
          [ TARGET: {mapHoverNode ? mapHoverNode.toUpperCase() : 'ARES_SYSTEM'} ]
        </span>
      </div>

      {/* 3. Scrollable list of highly-tactile HUD cards */}
      <div
        className="custom-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: isDrawer ? '12px 16px 40px 16px' : '16px 20px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 1
        }}
      >
        <div style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '2px', textAlign: 'center', fontWeight: 'bold' }}>
          Pressurized Bike Lane Route Configurator
        </div>

        {sectors.map((sector) => {
          const isAcad = sector.id === 'academics';
          const isCurrentActive = isAcad
            ? academicSyncActive
            : (sector.id === 'neurodiversity'
              ? (pathname === '/park' || pathname.startsWith('/neurodiversity'))
              : (sector.id === 'research'
                ? (pathname === '/research' || pathname.startsWith('/research/'))
                : isRouteActive(sector.route)));

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
              onMouseEnter={() => {
                setMapHoverNode(sector.title);
                setHoveredSectorId(sector.id);
              }}
              onMouseLeave={() => {
                setMapHoverNode(null);
                setHoveredSectorId(null);
              }}
              className="touch-card"
              style={{
                background: 'rgba(4, 6, 12, 0.72)',
                border: `1.5px solid ${isCurrentActive ? sector.color : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '10px',
                padding: '14px 16px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                boxShadow: isCurrentActive ? `0 0 15px rgba(${sector.rgb}, 0.15)` : 'none',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                flexShrink: 0
              }}
            >
              {/* Teleport Charge Overlay */}
              {chargingRoute === sector.route && (
                <div
                  className="teleport-charge-overlay"
                  style={{
                    background: `rgba(${sector.rgb}, 0.25)`,
                    boxShadow: `inset 0 0 20px rgba(${sector.rgb}, 0.5)`
                  }}
                />
              )}
              {/* Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0, gap: '8px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: isCurrentActive ? sector.color : 'rgba(255, 255, 255, 0.45)', fontWeight: 'bold', letterSpacing: '0.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0, flex: 1 }}>
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
                      animation: 'pulse-dot 1.2s infinite alternate',
                      flexShrink: 0
                    }}
                  ></span>
                )}
              </div>

              {/* Title & Redirection Target Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minWidth: 0, gap: '12px' }}>
                <span style={{ fontFamily: 'monospace, var(--font-tech)', fontSize: '0.86rem', color: '#ffffff', fontWeight: 'bold', display: 'flex', alignItems: 'flex-start', gap: '8px', minWidth: 0, flexShrink: 1, flex: 1 }}>
                  <span className="sector-card-icon" style={{ width: '18px', height: '18px', display: 'inline-block', flexShrink: 0, color: isCurrentActive ? sector.color : 'rgba(255, 255, 255, 0.45)', transition: 'transform 0.2s ease, filter 0.2s ease', marginTop: '1px' }}>
                    <NavIconSvg type={sector.icon} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
                    {sector.title}
                  </span>
                </span>
                <span style={{ fontSize: '0.58rem', color: isCurrentActive ? sector.color : 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace', fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap', marginTop: '3px' }}>
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
                {/* Dynamically calculated pressurized bike commutes */}
                {getBikingDetails(sector.route || 'academics', hoveredSectorId === sector.id)}
              </div>

              {/* Sector Description */}
              <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textAlign: 'left', marginTop: '2px', borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '4px' }}>
                {sector.desc}
              </div>

              {/* Tactical area sublist for Ares City Park */}
              {sector.id === 'neurodiversity' && (
                <div
                  style={{
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(0, 255, 136, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                  onClick={(e) => {
                    // Prevent parent card-level click if clicking inside sublist
                    e.stopPropagation();
                  }}
                >
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(0, 255, 136, 0.6)', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    [ PARK SECTORS ]
                  </span>

                  {/* Item 1: Habitat Entrance Plaza & Gardens */}
                  <div
                    onClick={() => {
                      handleTeleport('/park');
                    }}
                    className="touch-card-sublink"
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.65rem',
                      fontFamily: 'monospace',
                      background: pathname === '/park' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(0,0,0,0.3)',
                      border: `1px solid ${pathname === '/park' ? '#00ff88' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '4px',
                      color: pathname === '/park' ? '#00ff88' : 'rgba(255,255,255,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="sector-card-icon" style={{ width: '12px', height: '12px', display: 'inline-block', flexShrink: 0, color: pathname === '/park' ? '#00ff88' : 'rgba(255, 255, 255, 0.45)', transition: 'transform 0.2s ease, filter 0.2s ease' }}>
                        <NavIconSvg type="pin" />
                      </span>
                      Park Entrance Plaza
                    </span>
                    {pathname === '/park' && <span style={{ fontSize: '0.52rem' }}>[ ACTIVE ]</span>}
                  </div>

                  {/* Item 2: Collapsible Neurodiversity Lawn Collapsible Folder */}
                  <div
                    onClick={() => {
                      setIsDistrictExpanded(!isDistrictExpanded);
                    }}
                    className="touch-card-sublink"
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.65rem',
                      fontFamily: 'monospace',
                      background: pathname.startsWith('/neurodiversity') ? 'rgba(0, 255, 136, 0.08)' : 'rgba(0,0,0,0.3)',
                      border: `1px solid ${pathname.startsWith('/neurodiversity') ? '#00ff88' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '4px',
                      color: '#00ff88',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: 'bold'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{isDistrictExpanded ? '▼' : '▶'}</span>
                      <span className="sector-card-icon" style={{ width: '14px', height: '14px', display: 'inline-block', flexShrink: 0, color: '#00ff88', transition: 'transform 0.2s ease, filter 0.2s ease' }}>
                        <NavIconSvg type="infinity" />
                      </span>
                      Neurodiversity Lawn
                    </span>
                    <span style={{ fontSize: '0.52rem', color: 'rgba(0, 255, 136, 0.6)' }}>[ PRIDE HUB ]</span>
                  </div>

                  {/* Nested district subsectors */}
                  {isDistrictExpanded && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingLeft: '12px', borderLeft: '1px dashed rgba(0, 255, 136, 0.2)' }}>
                      {[
                        { label: 'District Welcome Hub', route: '/neurodiversity', icon: 'satellite' },
                        { label: 'Comms Grove & Bridges', route: '/neurodiversity/comms-grove', icon: 'dish' },
                        { label: 'Sensory Garden Biome', route: '/neurodiversity/sensory-garden', icon: 'leaf' },
                        { label: 'Synaptic Map Pavilion', route: '/neurodiversity/lexicon-pavilion', icon: 'galaxy' },
                        { label: 'Community Hearth Campfire', route: '/neurodiversity/meetup-campfire', icon: 'campfire' }
                      ].map((subSector) => {
                        const isSubActive = pathname === subSector.route;
                        return (
                          <div
                            key={subSector.route}
                            onClick={() => {
                              handleTeleport(subSector.route);
                            }}
                            className="touch-card-sublink"
                            style={{
                              padding: '4px 8px',
                              fontSize: '0.65rem',
                              fontFamily: 'monospace',
                              background: isSubActive ? 'rgba(0, 255, 136, 0.12)' : 'rgba(0,0,0,0.4)',
                              border: `1px solid ${isSubActive ? '#00ff88' : 'rgba(255,255,255,0.06)'}`,
                              borderRadius: '4px',
                              color: isSubActive ? '#00ff88' : 'rgba(255,255,255,0.7)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              transition: 'all 0.15s'
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span className="sector-card-icon" style={{ width: '12px', height: '12px', display: 'inline-block', flexShrink: 0, color: isSubActive ? '#00ff88' : 'rgba(255, 255, 255, 0.45)', transition: 'transform 0.2s ease, filter 0.2s ease' }}>
                                <NavIconSvg type={subSector.icon} />
                              </span>
                              {subSector.label}
                            </span>
                            {isSubActive && <span style={{ fontSize: '0.52rem' }}>[ ACTIVE ]</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tactical area sublist for Research Lab */}
              {sector.id === 'research' && (
                <div
                  style={{
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255, 179, 0, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                  onClick={(e) => {
                    // Prevent parent card-level click if clicking inside sublist
                    e.stopPropagation();
                  }}
                >
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255, 179, 0, 0.6)', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    [ LAB SECTORS ]
                  </span>

                  {/* Item 1: Lab Entrance */}
                  <div
                    onClick={() => {
                      handleTeleport('/research');
                    }}
                    className="touch-card-sublink"
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.65rem',
                      fontFamily: 'monospace',
                      background: pathname === '/research' ? 'rgba(255, 179, 0, 0.12)' : 'rgba(0,0,0,0.4)',
                      border: `1px solid ${pathname === '/research' ? '#ffb300' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '4px',
                      color: pathname === '/research' ? '#ffb300' : 'rgba(255,255,255,0.7)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      position: 'relative',
                      overflow: 'hidden',
                      minWidth: 0,
                      gap: '12px'
                    }}
                  >
                    {/* Teleport Charge Overlay */}
                    {chargingRoute === '/research' && (
                      <div
                        className="teleport-charge-overlay"
                        style={{
                          background: `rgba(${sector.rgb}, 0.25)`,
                          boxShadow: `inset 0 0 10px rgba(${sector.rgb}, 0.4)`
                        }}
                      />
                    )}
                    <span style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', minWidth: 0, flexShrink: 1, flex: 1 }}>
                      <span className="sector-card-icon" style={{ width: '12px', height: '12px', display: 'inline-block', flexShrink: 0, color: pathname === '/research' ? '#ffb300' : 'rgba(255, 255, 255, 0.45)', transition: 'transform 0.2s ease, filter 0.2s ease', marginTop: '2px' }}>
                        <NavIconSvg type="pin" />
                      </span>
                      <span style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
                        Lab Entrance{pathname === '/research/nanobot-pill' ? ` (🏃 ${formatDistance(WALK_DISTANCE)} walk, ${Math.round(WALK_DISTANCE / WALK_SPEED)}s)` : ''}
                      </span>
                    </span>
                    {pathname === '/research' ? (
                      <span style={{ fontSize: '0.52rem', flexShrink: 0, whiteSpace: 'nowrap', marginTop: '2px' }}>[ ACTIVE ]</span>
                    ) : (
                      <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.35)', flexShrink: 0, whiteSpace: 'nowrap', marginTop: '2px' }}>[ ➔ WALK ]</span>
                    )}
                  </div>

                  {/* Item 2: BCI Pill Bay */}
                  <div
                    onClick={() => {
                      handleTeleport('/research/nanobot-pill');
                    }}
                    className="touch-card-sublink"
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.65rem',
                      fontFamily: 'monospace',
                      background: pathname === '/research/nanobot-pill' ? 'rgba(255, 179, 0, 0.12)' : 'rgba(0,0,0,0.4)',
                      border: `1px solid ${pathname === '/research/nanobot-pill' ? '#ffb300' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '4px',
                      color: pathname === '/research/nanobot-pill' ? '#ffb300' : 'rgba(255,255,255,0.7)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      position: 'relative',
                      overflow: 'hidden',
                      minWidth: 0,
                      gap: '12px'
                    }}
                  >
                    {/* Teleport Charge Overlay */}
                    {chargingRoute === '/research/nanobot-pill' && (
                      <div
                        className="teleport-charge-overlay"
                        style={{
                          background: `rgba(${sector.rgb}, 0.25)`,
                          boxShadow: `inset 0 0 10px rgba(${sector.rgb}, 0.4)`
                        }}
                      />
                    )}
                    <span style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', minWidth: 0, flexShrink: 1, flex: 1 }}>
                      <span className="sector-card-icon" style={{ width: '12px', height: '12px', display: 'inline-block', flexShrink: 0, color: pathname === '/research/nanobot-pill' ? '#ffb300' : 'rgba(255, 255, 255, 0.45)', transition: 'transform 0.2s ease, filter 0.2s ease', marginTop: '2px' }}>
                        <NavIconSvg type="brain" />
                      </span>
                      <span style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
                        BCI Nanobot Pill Bay{pathname === '/research' ? ` (🏃 ${formatDistance(WALK_DISTANCE)} walk, ${Math.round(WALK_DISTANCE / WALK_SPEED)}s)` : ''}
                      </span>
                    </span>
                    {pathname === '/research/nanobot-pill' ? (
                      <span style={{ fontSize: '0.52rem', flexShrink: 0, whiteSpace: 'nowrap', marginTop: '2px' }}>[ ACTIVE ]</span>
                    ) : (
                      <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.35)', flexShrink: 0, whiteSpace: 'nowrap', marginTop: '2px' }}>[ ➔ WALK ]</span>
                    )}
                  </div>
                </div>
              )}

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
