'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import HudBar from './HudBar';
import CityGridMap from './CityGridMap';
import NavIconSvg from './NavIconSvg';

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mapDrawerOpen, setMapDrawerOpen] = useState(false);

  // Transit state variables
  const [isTransiting, setIsTransiting] = useState(false);
  const [transitDetails, setTransitDetails] = useState({
    route: '',
    fromName: '',
    toName: '',
    mode: 'cycle',
    distance: 0,
    speed: 5.0,
    duration: 0
  });
  const [transitProgress, setTransitProgress] = useState(0);
  const [transitStatusText, setTransitStatusText] = useState('');
  const [transitFadeOut, setTransitFadeOut] = useState(false);

  // Formats meters into kilometers with decimal precision when it reaches or exceeds 1km (1000m)
  const formatDistance = (meters) => {
    if (meters >= 1000) {
      const km = meters / 1000;
      return `${parseFloat(km.toFixed(1))}km`;
    }
    return `${meters}m`;
  };

  const triggerTransit = (details) => {
    if (isTransiting) return;
    
    // Auto-close the map drawer first
    setMapDrawerOpen(false);
    
    // Set transit details and start the sequence
    setTransitDetails(details);
    setTransitProgress(0);
    setTransitStatusText('CALIBRATING DOME ROUTE PATHWAYS...');
    setIsTransiting(true);
  };

  // Dynamic travel animation progress hook using requestAnimationFrame
  useEffect(() => {
    if (!isTransiting) return;

    let start = null;
    const duration = 1200; // 1.2 seconds travel animation
    let animationFrameId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min((elapsed / duration) * 100, 100);

      setTransitProgress(progress);

      // Update status text based on progress
      if (progress < 25) {
        setTransitStatusText('CALIBRATING ROUTE PATHWAYS...');
      } else if (progress < 60) {
        setTransitStatusText(
          transitDetails.mode === 'cycle'
            ? 'COMMUTING VIA PRESSURIZED BIKE LANE...'
            : 'WALKING CONNECTING HALLWAYS...'
        );
      } else if (progress < 90) {
        setTransitStatusText('APPROACHING SECTOR AIRLOCK...');
      } else {
        setTransitStatusText('AIRLOCK EQUALIZED. ACCESS GRANTED.');
      }

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Navigate at 100%
        router.push(transitDetails.route);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isTransiting, transitDetails, router]);

  let bgImage = '/assets/images/backgrounds/citizen-suite.png';
  let currentTheme = 'suite';
  let hudSectorName = 'Citizen Suite';
  let currentLocationName = 'CITIZEN SUITE';

  if (pathname === '/portfolio') {
    bgImage = '/assets/images/backgrounds/metropolis-core.png';
    currentTheme = 'metropolis';
    hudSectorName = 'Portfolio Archives';
    currentLocationName = 'PORTFOLIO';
  } else if (pathname === '/research' || pathname === '/research/nanobot-pill') {
    bgImage = '/assets/images/backgrounds/research-lab.png';
    currentTheme = 'quantum';
    if (pathname === '/research/nanobot-pill') {
      hudSectorName = 'Research Lab - BCI Pill';
      currentLocationName = 'RESEARCH LAB - BCI PILL';
    } else {
      hudSectorName = 'Research Lab';
      currentLocationName = 'RESEARCH LAB';
    }
  } else if (pathname === '/museum') {
    bgImage = '/assets/images/backgrounds/ares-city-museum.png';
    currentTheme = 'quantum';
    hudSectorName = 'Ares City Museum';
    currentLocationName = 'ARES CITY MUSEUM';
  } else if (pathname === '/park' || pathname.startsWith('/neurodiversity')) {
    currentTheme = 'biosphere';
    if (pathname === '/park') {
      bgImage = '/assets/images/backgrounds/mars-dome-park.png';
      hudSectorName = 'Ares City Park - Entrance';
      currentLocationName = 'ARES CITY PARK - CENTRAL ENTRANCE';
    } else {
      if (pathname === '/neurodiversity/sensory-garden') {
        bgImage = '/assets/images/backgrounds/sensory-garden.png';
        hudSectorName = 'Ares City Park - Neurodiversity Lawn - Sensory Garden';
        currentLocationName = 'ARES CITY PARK - NEURODIVERSITY LAWN - SENSORY GARDEN';
      } else if (pathname === '/neurodiversity/comms-grove') {
        bgImage = '/assets/images/backgrounds/communication-grove.png';
        hudSectorName = 'Ares City Park - Neurodiversity Lawn - Dialogue Bridges';
        currentLocationName = 'ARES CITY PARK - NEURODIVERSITY LAWN - DIALOGUE BRIDGES';
      } else if (pathname === '/neurodiversity/lexicon-pavilion') {
        bgImage = '/assets/images/backgrounds/mars-dome-park.png';
        hudSectorName = 'Ares City Park - Neurodiversity Lawn - Lexicon Pavilion';
        currentLocationName = 'ARES CITY PARK - NEURODIVERSITY LAWN - LEXICON PAVILION';
      } else if (pathname === '/neurodiversity/meetup-campfire') {
        bgImage = '/assets/images/backgrounds/neurodiversity-meetup.png';
        hudSectorName = 'Ares City Park - Neurodiversity Lawn - Community Hearth';
        currentLocationName = 'ARES CITY PARK - NEURODIVERSITY LAWN - COMMUNITY HEARTH';
      } else {
        bgImage = '/assets/images/backgrounds/neurodiversity-meetup.png';
        hudSectorName = 'Ares City Park - Neurodiversity Lawn - Welcome Plaza';
        currentLocationName = 'ARES CITY PARK - NEURODIVERSITY LAWN - WELCOME PLAZA';
      }
    }
  }


  // Close the drawer automatically when pathname changes (transit succeeds)
  useEffect(() => {
    setMapDrawerOpen(false);
    
    if (isTransiting) {
      // Smoothly fade out the transit screen since destination is reached
      setTransitFadeOut(true);
      const timer = setTimeout(() => {
        setIsTransiting(false);
        setTransitFadeOut(false);
        setTransitProgress(0);
      }, 400); // matches the 0.4s css transition for fade-out
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Lock body scroll when drawer is open or during transit
  useEffect(() => {
    if (mapDrawerOpen || isTransiting) {
      document.documentElement.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
    }
    return () => {
      document.documentElement.classList.remove('modal-open');
    };
  }, [mapDrawerOpen, isTransiting]);

  // Parse location name into primary, middle, and sub-location for stacked map styling
  let primaryLoc = currentLocationName;
  let middleLoc = '';
  let subLoc = '';
  if (currentLocationName.includes(' - ')) {
    const parts = currentLocationName.split(' - ');
    if (parts.length === 3) {
      primaryLoc = parts[0];
      middleLoc = parts[1];
      subLoc = parts[2];
    } else {
      primaryLoc = parts[0];
      subLoc = parts[1];
    }
  }

  return (
    <>
      {/* Full-Screen Immersive Penthouse Background */}
      <div 
        className="background-canvas" 
        key={bgImage}
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>
      
      {/* Underlays */}
      <div className="city-matrix-underlay" key={`underlay-${currentTheme}`}></div>
      <div className="hud-scanline"></div>

      {/* Global Drawer Backdrop Overlay */}
      <div 
        className={`drawer-backdrop ${mapDrawerOpen ? 'active' : ''}`}
        onClick={() => setMapDrawerOpen(false)}
      ></div>

      {/* Floating Left Peeking Locator Tab (Universal across all pages, desktop & mobile) */}
      <button 
        onClick={() => setMapDrawerOpen(true)}
        className={`mobile-locator-btn ${mapDrawerOpen ? 'mobile-locator-btn--open' : ''}`}
      >
        <span className="locator-pulse-light"></span>
        <div className="layout-name-stack">
          <span className="locator-location-name locator-location-name--flex">
            <span className="svg-icon-wrapper--locator">
              <NavIconSvg type="pin" />
            </span>
            {primaryLoc}
          </span>
          {middleLoc && (
            <span className="locator-middle-name locator-middle-name--override">
              ↳ {middleLoc}
            </span>
          )}
          {subLoc && (
            <span className="locator-sub-name">
              [ {subLoc} ]
            </span>
          )}
        </div>
        <span className="locator-hint-arrow">➔</span>
      </button>

      {/* Slide-out Tactical Map Drawer overlay (Universal across all pages, desktop & mobile) */}
      <div className={`global-map-drawer ${mapDrawerOpen ? 'drawer-active' : ''}`}>
        <div className="global-map-drawer-seal" />
        
        {/* Drawer header close button */}
        <div className="global-map-drawer-close-bar">
          <button 
            onClick={() => setMapDrawerOpen(false)}
            className="hud-btn custom-close-btn drawer-close-btn"
          >
            [ ✕ CLOSE TACTICAL MAP ]
          </button>
        </div>

        {/* Modular Map Canvas */}
        <div className="layout-map-canvas">
          <CityGridMap isDrawer={true} onTransitStart={triggerTransit} />
        </div>

      </div>

      {/* Global children render wrapper */}
      <div className="os-workspace" data-theme={currentTheme} data-page-home={pathname === '/' ? 'true' : 'false'}>
        <HudBar sectorName={hudSectorName} />
        
        <div className="workspace-deck">
          {/* Natural standing roomscale profile figure */}
          {pathname !== '/portfolio' && pathname !== '/' && pathname !== '/park' && pathname !== '/neurodiversity' && pathname !== '/research' && pathname !== '/research/nanobot-pill' && pathname !== '/museum' && (
            <div className={`roomscale-natural-body page-${currentTheme}`}>
              <img src="/assets/images/profile.png" className="roomscale-natural-img" alt="Ephraim Becker" />
            </div>
          )}

          {children}
        </div>
      </div>

      {/* Global Holographic Transit Overlay */}
      {isTransiting && (
        <div 
          className={`global-transit-overlay ${transitFadeOut ? 'fade-out' : ''}`}
        >
          {/* Grid scanning background effect */}
          <div className="transit-grid-effect" />
          
          <div style={{
            maxWidth: '460px',
            width: '100%',
            background: 'rgba(4, 8, 16, 0.94)',
            border: `2px solid ${transitDetails.mode === 'cycle' ? '#00f0ff' : '#ffb300'}`,
            boxShadow: `0 0 30px rgba(${transitDetails.mode === 'cycle' ? '0, 240, 255' : '255, 179, 0'}, 0.25)`,
            borderRadius: '12px',
            padding: '24px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            {/* HUD Scanner Scanline */}
            <div 
              className="transit-scanline" 
              style={{ 
                background: `linear-gradient(to bottom, rgba(${transitDetails.mode === 'cycle' ? '0, 240, 255' : '255, 179, 0'}, 0) 0%, rgba(${transitDetails.mode === 'cycle' ? '0, 240, 255' : '255, 179, 0'}, 0.3) 50%, rgba(${transitDetails.mode === 'cycle' ? '0, 240, 255' : '255, 179, 0'}, 0) 100%)`,
                height: '120px'
              }} 
            />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: transitDetails.mode === 'cycle' ? '#00f0ff' : '#ffb300', letterSpacing: '1.5px' }}>
                {transitDetails.mode === 'cycle' ? '🚲 ARES_OS // CYCLE_ROUTE_ACTIVE' : '🚶 ARES_OS // PEDESTRIAN_WALK_ACTIVE'}
              </span>
              <span className="transit-spinner" style={{ color: transitDetails.mode === 'cycle' ? '#00f0ff' : '#ffb300' }} />
            </div>

            {/* Mode icon & details */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', margin: '4px 0' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '8px', 
                background: 'rgba(0, 0, 0, 0.4)', 
                border: `1px dashed rgba(${transitDetails.mode === 'cycle' ? '0, 240, 255' : '255, 179, 0'}, 0.35)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
                color: transitDetails.mode === 'cycle' ? '#00f0ff' : '#ffb300'
              }}>
                {transitDetails.mode === 'cycle' ? '🚲' : '🚶'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TRANSIT CONSOLE DIRECTIVE</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {transitDetails.mode === 'cycle' ? 'Cycling to Destination Dome' : 'Walking to Lab Sub-Sector'}
                </div>
              </div>
            </div>

            {/* Telemetry info block */}
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '6px',
              padding: '12px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px 14px',
              fontSize: '0.68rem',
              border: '1px solid rgba(255,255,255,0.04)'
            }}>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.45)', display: 'block', fontSize: '0.55rem', marginBottom: '2px', textTransform: 'uppercase' }}>DEPARTURE</span>
                <span style={{ fontWeight: 'bold', color: '#ffffff', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{transitDetails.fromName}</span>
              </div>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.45)', display: 'block', fontSize: '0.55rem', marginBottom: '2px', textTransform: 'uppercase' }}>ARRIVAL</span>
                <span style={{ fontWeight: 'bold', color: '#ffffff', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{transitDetails.toName}</span>
              </div>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.45)', display: 'block', fontSize: '0.55rem', marginBottom: '2px', textTransform: 'uppercase' }}>DISTANCE</span>
                <span style={{ fontWeight: 'bold', color: transitDetails.mode === 'cycle' ? '#00f0ff' : '#ffb300' }}>
                  {formatDistance(transitDetails.distance)}
                </span>
              </div>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.45)', display: 'block', fontSize: '0.55rem', marginBottom: '2px', textTransform: 'uppercase' }}>SPEED / EST. TIME</span>
                <span style={{ fontWeight: 'bold', color: '#ffffff' }}>
                  {transitDetails.speed} m/s ({Math.floor(transitDetails.duration / 60)}m {transitDetails.duration % 60}s)
                </span>
              </div>
            </div>

            {/* Progress section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px' }}>{transitStatusText}</span>
                <span style={{ fontWeight: 'bold', color: transitDetails.mode === 'cycle' ? '#00f0ff' : '#ffb300' }}>{Math.round(transitProgress)}%</span>
              </div>
              
              {/* Progress Bar Container */}
              <div style={{
                height: '8px',
                background: 'rgba(0,0,0,0.6)',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div 
                  style={{
                    width: `${transitProgress}%`,
                    height: '100%',
                    background: transitDetails.mode === 'cycle' ? 'linear-gradient(90deg, #005f73 0%, #00f0ff 100%)' : 'linear-gradient(90deg, #ca8a04 0%, #ffb300 100%)',
                    boxShadow: `0 0 10px ${transitDetails.mode === 'cycle' ? '#00f0ff' : '#ffb300'}`,
                    transition: 'width 80ms linear'
                  }}
                />
              </div>
            </div>

            {/* Bottom disclaimer */}
            <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
              Ares City Transit Safety Protocols Active // Maintain pressurization lock
            </div>
          </div>
        </div>
      )}
    </>
  );
}
