'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import HudBar from './HudBar';

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

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

      {/* Global children render wrapper */}
      <div className="os-workspace" data-theme={currentTheme}>
        <HudBar sectorName={hudSectorName} />
        
        <div className="workspace-deck">
          {/* Natural standing roomscale profile figure */}
          {pathname !== '/portfolio' && pathname !== '/' && (
            <div className={`roomscale-natural-body page-${currentTheme}`}>
              <img src="/assets/images/profile.png" className="roomscale-natural-img" alt="Ephraim Becker" />
            </div>
          )}

          {/* Decoupled Floating Return Button */}
          {pathname !== '/' && (
            <Link href="/" className="floating-residence-return">
              [ 🏨 RETURN TO RESIDENCE ]
            </Link>
          )}

          {children}
        </div>
      </div>
    </>
  );
}
