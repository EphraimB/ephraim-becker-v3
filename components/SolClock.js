'use client';

import { useEffect, useState } from 'react';

export default function SolClock() {
  const [clockStr, setClockStr] = useState('MY38 | SOL ... | ...');
  const [earthStr, setEarthStr] = useState('TERRA: ...');
  const [latencyStr, setLatencyStr] = useState('UPLINK LAG: 14m 22.41s');

  useEffect(() => {
    function updateClocks() {
      const now = new Date();
      
      // 1. Earth Time
      const earthTimeStr = now.toLocaleTimeString('en-US', { hour12: false });
      setEarthStr(`Terra: ${earthTimeStr}`);

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
      
      setClockStr(`Sol ${currentSol} // ${solTimeStr}`);

      // 3. Earth-Mars Subspace Communication Latency simulation (fluctuates dynamically)
      const baseSec = 862.34;
      const flux = Math.sin(now.getTime() / 6000) * 0.28 + (Math.random() * 0.04);
      const totalSec = baseSec + flux;
      const mins = Math.floor(totalSec / 60);
      const secs = (totalSec % 60).toFixed(2);
      setLatencyStr(`Uplink Lag: ${mins}m ${secs}s`);
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-tech)', fontSize: '0.68rem', textTransform: 'uppercase' }}>
      <span style={{ opacity: 0.6 }}>{earthStr}</span>
      <span style={{ opacity: 0.25 }}>//</span>
      <span style={{ color: 'var(--color-accent)', fontWeight: 600, textShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.25)' }}>{clockStr}</span>
      <span style={{ opacity: 0.25 }}>//</span>
      <span style={{ color: 'var(--neon-amber)', opacity: 0.8, fontWeight: 500, textShadow: '0 0 8px rgba(255, 179, 0, 0.15)' }}>{latencyStr}</span>
    </div>
  );
}
