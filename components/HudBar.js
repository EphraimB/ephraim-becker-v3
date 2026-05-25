'use client';

import { usePathname } from 'next/navigation';
import SolClock from './SolClock';

export default function HudBar({ sectorName = 'Metropolis Core' }) {
  const pathname = usePathname();

  return (
    <header className="system-hud-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6, 8, 14, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '12px 28px', backdropFilter: 'blur(20px)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', marginBottom: '24px' }}>
      <div className="hud-citizen-info" style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.72rem', letterSpacing: '1.2px', color: 'rgba(255, 255, 255, 0.55)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
        Credentials: <span style={{ color: '#fff', fontWeight: 600 }}>Ephraim Becker (MY23)</span> <span style={{ opacity: 0.3 }}>//</span> <span style={{ color: 'var(--color-accent)', fontWeight: 600, textShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.2)' }}>Class-A Citizen</span>
      </div>

      <div className="hud-sector-indicator" style={{ fontSize: '0.72rem', letterSpacing: '1.5px', color: 'rgba(255, 255, 255, 0.55)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
        Active Sector: <span style={{ color: 'var(--color-accent)', fontWeight: 700, textShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.3)' }}>{sectorName}</span>
      </div>
      
      <div className="hud-clock-info" style={{ fontSize: '0.72rem', letterSpacing: '1px', color: 'rgba(255, 255, 255, 0.55)', fontFamily: 'var(--font-sans)' }}>
        <SolClock />
      </div>
    </header>
  );
}
