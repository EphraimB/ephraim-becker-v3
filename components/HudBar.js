'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SolClock from './SolClock';

export default function HudBar({ sectorName = 'METROPOLIS CORE' }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="system-hud-bar">
      <div className="hud-citizen-info">
        CREDENTIALS: <span className="hud-credential-name">EPHRAIM BECKER (MY23)</span> | <span className="hud-credential-class">CLASS-A CITIZEN</span>
      </div>

      <div className="hud-sector-indicator">
        ACTIVE SECTOR: <span className="hud-sector-name">{sectorName.toUpperCase()}</span>
      </div>
      
      <div className="hud-clock-info">
        <SolClock />
      </div>
    </header>
  );
}
