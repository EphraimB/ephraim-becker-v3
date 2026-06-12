'use client';

import { useEffect, useState } from 'react';

export default function SolClock() {
  const [clockStr, setClockStr] = useState('ARES CITY TIME: 38 / ... / ...');

  useEffect(() => {
    function updateClocks() {
      const now = new Date();
      
      // Clancy Martian Year 38 Sol
      const my38StartUTC = Date.UTC(2024, 10, 12, 0, 0, 0); // Nov 12, 2024
      const timeDeltaMs = now.getTime() - my38StartUTC;
      
      const deltaEarthDays = timeDeltaMs / (1000 * 60 * 60 * 24);
      const totalSolsSinceMY38 = deltaEarthDays / 1.02749125;
      
      const solsElapsed = Math.max(0, totalSolsSinceMY38);
      const my = 38 + Math.floor(solsElapsed / 668.6);
      const currentSol = Math.floor(solsElapsed % 668.6);
      
      const solFraction = solsElapsed - Math.floor(solsElapsed);
      const decimalStr = String(Math.floor(solFraction * 10000)).padStart(4, '0');
      
      setClockStr(`ARES CITY TIME: ${my} / ${currentSol} / ${decimalStr}`);
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span style={{ color: 'var(--color-accent)', textShadow: '0 0 5px rgba(var(--color-accent-rgb), 0.3)' }}>{clockStr}</span>
    </div>
  );
}

