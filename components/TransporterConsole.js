'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const SECTORS = [
  { id: 'metropolis', name: 'Metropolis Core', path: '/', icon: '⚡', coords: 'SEC-01' },
  { id: 'biosphere', name: 'Biosphere Dome', path: '/atmosphere-dome', icon: '🌿', coords: 'SEC-02' },
  { id: 'quantum', name: 'Quantum Net', path: '/quantum-net', icon: '🛰️', coords: 'SEC-03' },
  { id: 'suite', name: 'Citizen Suite', path: '/citizen-suite', icon: '🏠', coords: 'SEC-04' }
];

export default function TransporterConsole() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedSector, setSelectedSector] = useState(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationPercent, setCalibrationPercent] = useState(0);

  // Determine current sector from pathname
  useEffect(() => {
    const current = SECTORS.find(s => s.path === pathname) || SECTORS[0];
    setSelectedSector(current);
  }, [pathname]);

  const handleSelect = (sector) => {
    if (isCalibrating) return;
    setSelectedSector(sector);
  };

  const handleActivate = () => {
    if (!selectedSector || selectedSector.path === pathname || isCalibrating) return;
    
    setIsCalibrating(true);
    setCalibrationPercent(0);

    // 1. Simulate Calibration Progress Tick
    const interval = setInterval(() => {
      setCalibrationPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          triggerTransport();
          return 100;
        }
        return prev + 10;
      });
    }, 80);
  };

  const triggerTransport = () => {
    // 2. Access DOM to apply Transporter Beam sweeps
    const overlay = document.getElementById('global-transporter-overlay');
    const workspace = document.getElementById('global-workspace-shell');
    
    if (overlay) overlay.classList.add('active');
    if (workspace) workspace.classList.add('warp-beaming');

    // 3. Complete route redirect in middle of flash (600ms)
    setTimeout(() => {
      router.push(selectedSector.path);
      
      // 4. Remove active sweeps after loading next route
      setTimeout(() => {
        if (overlay) overlay.classList.remove('active');
        if (workspace) workspace.classList.remove('warp-beaming');
        setIsCalibrating(false);
        setCalibrationPercent(0);
      }, 700);
    }, 600);
  };

  const activeSector = SECTORS.find(s => s.path === pathname) || SECTORS[0];

  return (
    <section className="hud-panel" style={{ flex: 1 }}>
      <h2 class="hud-panel-title">QUANTUM TRANSPORTER <span>COM-NODE</span></h2>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '15px' }}>
        Select destination coordinates inside Ares City and activate the quantum teleportation channel:
      </p>

      {/* Grid of Sector Nodes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '15px' }}>
        {SECTORS.map((sector) => {
          const isCurrent = sector.path === pathname;
          const isTarget = selectedSector?.id === sector.id;
          
          let borderStyle = 'rgba(255,255,255,0.06)';
          let bgStyle = 'rgba(255,255,255,0.01)';
          
          if (isCurrent) {
            borderStyle = 'rgba(var(--color-accent-rgb), 0.4)';
            bgStyle = 'rgba(var(--color-accent-rgb), 0.08)';
          } else if (isTarget) {
            borderStyle = 'rgba(255,255,255,0.2)';
            bgStyle = 'rgba(255,255,255,0.04)';
          }

          return (
            <div
              key={sector.id}
              onClick={() => handleSelect(sector)}
              style={{
                border: `1px solid ${borderStyle}`,
                background: bgStyle,
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: isCalibrating ? 'default' : 'pointer',
                transition: 'all var(--transition-fast)',
                opacity: isCurrent ? 1 : 0.75,
                transform: isTarget && !isCurrent ? 'scale(1.03)' : 'scale(1)'
              }}
              className="transporter-sector-node"
            >
              <span style={{ fontSize: '1.4rem' }}>{sector.icon}</span>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: isCurrent ? 'var(--color-accent)' : 'var(--text-primary)' }}>
                  {sector.name}
                </div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)' }}>
                  {sector.coords} {isCurrent && '[ACTIVE]'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Holographic Radar & Button Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
        <div className="transporter-ring-graphic" style={{ flexShrink: 0 }}>
          <div className="transporter-ring-pulse"></div>
          <div className="transporter-ring-core"></div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {isCalibrating ? (
            <div style={{ fontFamily: 'var(--font-tech)', fontSize: '0.7rem' }}>
              <span style={{ color: 'var(--color-accent)' }}>CALIBRATING CORES... {calibrationPercent}%</span>
              <div className="hud-progress-container">
                <div className="hud-progress-fill" style={{ width: `${calibrationPercent}%` }}></div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-tech)' }}>
              DEST: <span style={{ color: 'var(--text-primary)' }}>{selectedSector?.name.toUpperCase() || 'NONE'}</span><br/>
              LOCK: <span style={{ color: selectedSector?.path === pathname ? 'var(--text-secondary)' : 'var(--neon-emerald)' }}>
                {selectedSector?.path === pathname ? 'SYSTEM LOCKED' : 'COORDINATES ACQUIRED'}
              </span>
            </div>
          )}

          <button
            className="hud-btn"
            disabled={!selectedSector || selectedSector.path === pathname || isCalibrating}
            onClick={handleActivate}
            style={{ width: '100%' }}
          >
            {isCalibrating ? 'TRANSMITTING...' : 'ACTIVATE TRANSPORTER'}
          </button>
        </div>
      </div>
    </section>
  );
}
