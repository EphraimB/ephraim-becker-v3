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


  // Close the drawer automatically when pathname changes (teleportation succeeds)
  useEffect(() => {
    setMapDrawerOpen(false);
  }, [pathname]);

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
        className="mobile-locator-btn"
        style={{
          opacity: mapDrawerOpen ? 0 : 1,
          pointerEvents: mapDrawerOpen ? 'none' : 'auto'
        }}
      >
        <span className="locator-pulse-light"></span>
        <div className="layout-name-stack">
          <span className="locator-location-name">📍 {primaryLoc}</span>
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
          <CityGridMap isDrawer={true} />
        </div>

      </div>

      {/* Global children render wrapper */}
      <div className="os-workspace" data-theme={currentTheme} data-page-home={pathname === '/' ? 'true' : 'false'}>
        <HudBar sectorName={hudSectorName} />
        
        <div className="workspace-deck">
          {/* Natural standing roomscale profile figure */}
          {pathname !== '/portfolio' && pathname !== '/' && pathname !== '/park' && pathname !== '/neurodiversity' && pathname !== '/research' && pathname !== '/research/nanobot-pill' && (
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
