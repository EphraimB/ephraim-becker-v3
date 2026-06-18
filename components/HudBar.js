'use client';

import SolClock from './SolClock';

export default function HudBar({ sectorName = 'METROPOLIS CORE' }) {
  return (
    <header className="system-hud-bar system-hud-bar--centered">
      <div className="hud-clock-info">
        <SolClock />
      </div>
    </header>
  );
}

