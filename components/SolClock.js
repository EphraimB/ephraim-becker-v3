'use client';

import { useEffect, useState } from 'react';

export default function SolClock() {
  const [clockStr, setClockStr] = useState('MY38 | SOL ... | ...');
  const [earthStr, setEarthStr] = useState('TERRA: ...');

  useEffect(() => {
    function updateClocks() {
      const now = new Date();
      
      // 1. Earth Time
      const earthTimeStr = now.toLocaleTimeString('en-US', { hour12: false });
      setEarthStr(`TERRA: ${earthTimeStr}`);

      // 2. Clancy Martian Year 38 Sol
      const my38StartUTC = Date.UTC(2024, 10, 12, 0, 0, 0); // Nov 12, 2024
      const timeDeltaMs = now.getTime() - my38StartUTC;
      
      const deltaEarthDays = timeDeltaMs / (1000 * 60 * 60 * 24);
      const totalSolsSinceMY38 = deltaEarthDays / 1.02749125;
      
      const currentSol = Math.floor(totalSolsSinceMY38);
      const solFraction = totalSolsSinceMY38 - currentSol;
      const solSecondsTotal = Math.floor(solFraction * 24 * 60 * 60);
      
      const solHour = Math.floor(solSecondsTotal / 3600);
      const solMinute = Math.floor((solSecondsTotal % 3600) / 60);
      const solSecond = solSecondsTotal % 60;
      
      const pad = (num) => String(num).padStart(2, '0');
      const solTimeStr = `${pad(solHour)}:${pad(solMinute)}:${pad(solSecond)}`;
      
      setClockStr(`MY38 | SOL ${currentSol} | ${solTimeStr}`);
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span style={{ opacity: 0.8 }}>{earthStr}</span>
      <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span>
      <span style={{ color: 'var(--color-accent)', textShadow: '0 0 5px rgba(var(--color-accent-rgb), 0.3)' }}>{clockStr}</span>
    </div>
  );
}
