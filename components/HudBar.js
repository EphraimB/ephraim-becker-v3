'use client';

import SolClock from './SolClock';

export default function HudBar({ sectorName = 'METROPOLIS CORE' }) {
  return (
    <header className="system-hud-bar" style={{ justifyContent: 'center' }}>
      <div className="hud-clock-info">
        <SolClock />
      </div>
    </header>
  );
}

