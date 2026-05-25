'use client';

import { useState, useEffect } from 'react';
import CityGridMap from '../../components/CityGridMap';
import TransmitterForm from '../../components/TransmitterForm';

export default function QuantumNet() {
  const [transitState, setTransitState] = useState('slide-active');
  const [logs, setLogs] = useState([
    {
      id: 1,
      sol: 542,
      time: '12:04',
      sender: 'Terra Fleet Command',
      recipient: 'Citizen Suite Penthouse',
      message: 'Subspace data matrix sync nominal. Credentials verified.'
    },
    {
      id: 2,
      sol: 541,
      time: '18:15',
      sender: 'Ares City Admin Core',
      recipient: 'Ephraim Becker Penthouse',
      message: 'Registry logs updated. Welcome back, University Student Becker.'
    }
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const walkDir = window.sessionStorage.getItem('walk-direction');
      if (walkDir === 'left') {
        setTransitState('slide-right');
      } else if (walkDir === 'right') {
        setTransitState('slide-left');
      }
      window.sessionStorage.removeItem('walk-direction');
      
      const timer = setTimeout(() => {
        setTransitState('slide-active');
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNewLog = (packet) => {
    const now = packet.timestamp || new Date();
    const my38StartUTC = Date.UTC(2024, 10, 12, 0, 0, 0);
    const timeDeltaMs = now.getTime() - my38StartUTC;
    const deltaEarthDays = timeDeltaMs / (1000 * 60 * 60 * 24);
    const totalSols = deltaEarthDays / 1.02749125;
    const currentSol = Math.floor(totalSols);
    const solFraction = totalSols - currentSol;
    const solSeconds = Math.floor(solFraction * 24 * 60 * 60);
    const solHour = Math.floor(solSeconds / 3600);
    const solMinute = Math.floor((solSeconds % 3600) / 60);
    const pad = (num) => String(num).padStart(2, '0');

    const newLog = {
      id: Date.now(),
      sol: currentSol,
      time: `${pad(solHour)}:${pad(solMinute)}`,
      sender: packet.sender,
      recipient: packet.recipient,
      message: packet.message
    };

    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="citizen-card-shell" style={{ flexDirection: 'column' }}>
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Floating navigation map bubble */}
      <div className="floating-nav-bubble">
        <CityGridMap />
      </div>

      {/* Bubbly floating content area */}
      <div className={`walking-content-container ${transitState}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        
        {/* Intro Bubbly Panel */}
        <div className="bubbly-panel" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
            Quantum Net Portal
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Establish a subspace uplink and send coordinate packets or message records directly to Ephraim Becker's study receiver:
          </p>
        </div>

        {/* Content columns split into bubbly panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', gap: '25px', flex: 1, minHeight: 0 }}>
          
          {/* Left Column Secure Transmitter Bubbly Panel */}
          <div className="bubbly-panel">
            <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.82rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Subspace Signal Transmitter
            </h3>
            
            {/* Secure Packet Transmitter Form */}
            <TransmitterForm onNewLog={handleNewLog} />
          </div>

          {/* Right Column: Visualizer & Logs Bubbly Panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', minHeight: 0 }}>
            
            {/* Wave visualizer bubbly panel */}
            <div className="bubbly-panel" style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 15px', position: 'relative', overflow: 'hidden', height: '95px', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.55rem', color: 'var(--color-accent)', zIndex: 2, position: 'absolute', top: '8px', left: '12px', letterSpacing: '0.5px' }}>
                entangled frequency sync
              </span>
              <svg width="100%" height="90px" viewBox="0 0 400 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 5, left: 0 }}>
                <path d="M 0 50 C 50 100, 100 0, 150 50 C 200 100, 250 0, 300 50 C 350 100, 400 0, 450 50" className="wave-line" style={{ animationDelay: '0s' }} />
                <path d="M 0 50 C 50 0, 100 100, 150 50 C 200 0, 250 100, 300 50 C 350 0, 400 100, 450 50" className="wave-line" style={{ animationDelay: '-4s', strokeOpacity: 0.5 }} />
              </svg>
            </div>

            {/* Subspace logs bubbly panel */}
            <div className="bubbly-panel" style={{ flex: 1, minHeight: 0 }}>
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.7rem', color: 'var(--text-primary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Subspace Message Logs
              </h4>
              <div className="custom-scroll" style={{ flex: 1 }}>
                {logs.map((log) => (
                  <div key={log.id} className="transmission-log-entry">
                    <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-tech)', fontSize: '0.62rem' }}>
                      [SOL {log.sol} - {log.time}] UPLINK RECORDED
                    </strong><br />
                    <span style={{ color: 'var(--color-accent)' }}>From {log.sender}:</span> &quot;{log.message}&quot;
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
