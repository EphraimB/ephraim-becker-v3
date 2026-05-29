'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import HudBar from './HudBar';
import CityGridMap from './CityGridMap';

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [mapDrawerOpen, setMapDrawerOpen] = useState(false);

  let bgImage = '/assets/images/backgrounds/citizen-suite.png';
  let currentTheme = 'suite';
  let hudSectorName = 'Citizen Suite';
  let currentLocationName = 'CITIZEN SUITE';

  if (pathname === '/portfolio') {
    bgImage = '/assets/images/backgrounds/metropolis-core.png';
    currentTheme = 'metropolis';
    hudSectorName = 'Portfolio Archives';
    currentLocationName = 'PORTFOLIO';
  } else if (pathname === '/park' || pathname === '/neurodiversity') {
    currentTheme = 'biosphere';
    if (pathname === '/neurodiversity') {
      bgImage = '/assets/images/backgrounds/neurodiversity-meetup.png';
      hudSectorName = 'Ares City Park - Neurodiversity Meetup & Advocacy';
      currentLocationName = 'ARES CITY PARK - NEURODIVERSITY MEETUP & ADVOCACY';
    } else {
      bgImage = '/assets/images/backgrounds/mars-dome-park.png';
      hudSectorName = 'Ares City Park';
      currentLocationName = 'ARES CITY PARK';
    }
  }


  // Close the drawer automatically when pathname changes (teleportation succeeds)
  useEffect(() => {
    setMapDrawerOpen(false);
  }, [pathname]);

  // Parse location name into primary and sub-location for stacked map styling
  let primaryLoc = currentLocationName;
  let subLoc = '';
  if (currentLocationName.includes(' - ')) {
    const parts = currentLocationName.split(' - ');
    primaryLoc = parts[0];
    subLoc = parts[1];
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
        className="mobile-locator-btn"
        style={{
          opacity: mapDrawerOpen ? 0 : 1,
          pointerEvents: mapDrawerOpen ? 'none' : 'auto'
        }}
      >
        <span className="locator-pulse-light"></span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1 }}>
          <span className="locator-location-name">📍 {primaryLoc}</span>
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
        
        {/* Drawer header close button */}
        <div className="global-map-drawer-close-bar">
          <button 
            onClick={() => setMapDrawerOpen(false)}
            className="hud-btn custom-close-btn"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '0.72rem',
              borderColor: 'rgba(0, 240, 255, 0.3)',
              background: 'rgba(0, 240, 255, 0.05)',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#00f0ff'
            }}
          >
            [ ✕ CLOSE TACTICAL MAP ]
          </button>
        </div>

        {/* Modular Map Canvas */}
        <CityGridMap isDrawer={true} />

      </div>

      {/* Global children render wrapper */}
      <div className="os-workspace" data-theme={currentTheme} data-page-home={pathname === '/' ? 'true' : 'false'}>
        <HudBar sectorName={hudSectorName} />
        
        <div className="workspace-deck">
          {/* Natural standing roomscale profile figure */}
          {pathname !== '/portfolio' && pathname !== '/' && pathname !== '/park' && pathname !== '/neurodiversity' && (
            <div className={`roomscale-natural-body page-${currentTheme}`}>
              <img src="/assets/images/profile.png" className="roomscale-natural-img" alt="Ephraim Becker" />
            </div>
          )}

          {children}
        </div>
      </div>
    </>
  );
}
