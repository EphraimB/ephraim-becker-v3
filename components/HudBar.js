'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SolClock from './SolClock';

export default function HudBar({ sectorName = 'METROPOLIS CORE' }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="system-hud-bar">
      <div className="hud-citizen-info" style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        CREDENTIALS: <span style={{ fontWeight: 500 }}>EPHRAIM BECKER (MY23)</span> | <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>CLASS-A CITIZEN</span>
      </div>

      {/* Sleek, Non-Blocking Global Escape Link back to Penthouse Residence Chat */}
      {!isHome && (
        <Link href="/" passHref legacyBehavior>
          <a 
            className="hud-btn" 
            style={{ 
              padding: '4px 12px', 
              fontSize: '0.62rem', 
              border: '1.5px solid var(--color-accent)', 
              borderRadius: '12px', 
              background: 'rgba(var(--color-accent-rgb), 0.1)', 
              color: 'var(--text-primary)', 
              textDecoration: 'none', 
              fontFamily: 'var(--font-tech)', 
              letterSpacing: '0.5px',
              boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.15)'
            }}
          >
            [ 🏨 RETURN TO RESIDENCE ]
          </a>
        </Link>
      )}

      <div className="hud-sector-indicator">
        ACTIVE SECTOR: <span style={{ color: 'var(--color-accent)', fontWeight: 700, textShadow: '0 0 5px rgba(var(--color-accent-rgb), 0.3)' }}>{sectorName.toUpperCase()}</span>
      </div>
      
      <div className="hud-clock-info">
        <SolClock />
      </div>
    </header>
  );
}
