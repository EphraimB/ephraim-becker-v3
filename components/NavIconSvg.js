import React from 'react';

export default function NavIconSvg({ type, activeColor = 'currentColor' }) {
  const strokeWidth = 1.3;

  switch (type) {
    case 'suite': // Dome penthouse with pulsing beacon
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes beaconPulse {
              0%, 100% { r: 1.5; opacity: 0.4; fill: currentColor; }
              50% { r: 2.8; opacity: 1; fill: #fff; filter: drop-shadow(0 0 3px currentColor); }
            }
          `}</style>
          {/* Dome shape */}
          <path d="M3 20h18" />
          <path d="M5 20v-4a7 7 0 0 1 14 0v4" />
          <path d="M9 20v-4h6v4" />
          {/* Antenna / Beacon */}
          <line x1="12" y1="9" x2="12" y2="4" />
          <circle cx="12" cy="3" r="1.5" style={{ animation: 'beaconPulse 1.5s infinite ease-in-out' }} />
        </svg>
      );

    case 'portfolio': // Data folder with vertical scanning line
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes folderScan {
              0%, 100% { transform: translateY(0); opacity: 0.2; }
              50% { transform: translateY(6px); opacity: 0.8; stroke: #fff; }
            }
          `}</style>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          {/* Scanning light inside folder */}
          <line x1="6" y1="10" x2="18" y2="10" style={{ animation: 'folderScan 2s infinite ease-in-out', transformOrigin: 'center' }} />
          <line x1="8" y1="14" x2="16" y2="14" opacity="0.3" />
        </svg>
      );

    case 'research': // Microscope/Laser emitter with pulsing scanning beam
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes laserBeam {
              0%, 100% { stroke-width: 1; opacity: 0.2; }
              50% { stroke-width: 2.2; opacity: 1; stroke: #fff; filter: drop-shadow(0 0 2px currentColor); }
            }
          `}</style>
          {/* Microscope structure */}
          <path d="M6 18h8" />
          <path d="M10 18v-3" />
          <path d="M14 15a4 4 0 0 0-4-4h-2" />
          <path d="M8 7h4v4H8z" transform="rotate(-30 10 9)" />
          {/* Base platform */}
          <rect x="4" y="18" width="16" height="2" rx="0.5" fill="currentColor" fillOpacity="0.2" />
          {/* Laser beam */}
          <line x1="11.5" y1="11" x2="14.5" y2="16" style={{ animation: 'laserBeam 1s infinite alternate ease-in-out' }} />
        </svg>
      );

    case 'museum': // Dome museum with expanding sonar rings
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes museumSonar {
              0% { r: 1; opacity: 0.8; }
              100% { r: 10; opacity: 0; }
            }
          `}</style>
          {/* Sonar rings */}
          <circle cx="12" cy="7" r="5" strokeDasharray="2 1" style={{ animation: 'museumSonar 2.5s infinite linear', transformOrigin: '12px 7px' }} />
          {/* Classical architecture columns and roof */}
          <path d="M3 21h18" />
          <path d="M3 18h18" />
          <path d="M5 18v-8h2v8M11 18v-8h2v8M17 18v-8h2v8" />
          <path d="M2 10l10-6 10 6" />
        </svg>
      );

    case 'pin': // Locator pin with expanding rings
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes pinSonar {
              0% { transform: scale(0.6); opacity: 0.9; }
              100% { transform: scale(1.6); opacity: 0; }
            }
          `}</style>
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="3" fill="currentColor" />
          {/* Expanding rings at base */}
          <circle cx="12" cy="19" r="3" strokeDasharray="2 1" style={{ animation: 'pinSonar 2s infinite linear', transformOrigin: '12px 19px' }} />
        </svg>
      );

    case 'infinity': // Infinity loop flow
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes loopFlow {
              from { stroke-dashoffset: 24; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
          <path d="M12 12c-2.9-4-6.9-4-8.9-2a4.5 4.5 0 0 0 0 6.3c2 2 6 2 8.9-2.3 2.9 4 6.9 4 8.9 2.3a4.5 4.5 0 0 0 0-6.3c-2-2-6-2-8.9 2z" strokeDasharray="6 3" style={{ animation: 'loopFlow 2s linear infinite' }} />
        </svg>
      );

    case 'satellite': // Satellite beacon
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes satWave {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 1; stroke: #fff; }
            }
          `}</style>
          <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M12 2v4M12 10v4M5 8h14" />
          {/* Panels */}
          <rect x="2" y="6" width="3" height="4" rx="0.5" />
          <rect x="19" y="6" width="3" height="4" rx="0.5" />
          {/* Signal waves */}
          <path d="M8 15a6 6 0 0 0 8 0" style={{ animation: 'satWave 1.2s infinite alternate ease-in-out' }} />
          <path d="M6 18a9 9 0 0 0 12 0" style={{ animation: 'satWave 1.2s infinite alternate ease-in-out 0.3s' }} />
        </svg>
      );

    case 'dish': // Telemetry dish with signal beam
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes dishBeam {
              0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.3; }
              50% { transform: translateY(-3px) scaleX(1.3); opacity: 0.9; stroke: #fff; }
            }
          `}</style>
          <path d="M4 10a8 8 0 0 0 16 0H4z" transform="rotate(-30 12 12)" />
          <path d="M12 14v5M9 20h6" />
          {/* Receiver feed */}
          <line x1="12" y1="10" x2="12" y2="4" transform="rotate(-30 12 12)" />
          {/* Beaming signal */}
          <path d="M7 3q5-3 10 0" strokeDasharray="2 1" style={{ animation: 'dishBeam 1.5s infinite ease-in-out', transformOrigin: '12px 3px' }} />
        </svg>
      );

    case 'leaf': // Sensory Garden Biome leaf breathing
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes leafBreathe {
              0%, 100% { transform: scale(0.95) rotate(0deg); opacity: 0.8; }
              50% { transform: scale(1.05) rotate(5deg); opacity: 1; }
            }
          `}</style>
          <g style={{ animation: 'leafBreathe 3s infinite ease-in-out', transformOrigin: '12px 16px' }}>
            <path d="M2 22c0-5.5 4.5-10 10-10H22C22 17.5 17.5 22 12 22H2z" />
            <path d="M12 22V12" strokeWidth="1" />
            <path d="M12 17l4-2M12 19l6-2M7 17l5-2" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'galaxy': // Synaptic Map Pavilion rotating
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes galaxySpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          <g style={{ animation: 'galaxySpin 12s linear infinite', transformOrigin: '12px 12px' }}>
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M12 3a9 9 0 0 1 9 9" strokeDasharray="3 1" />
            <path d="M12 21a9 9 0 0 1-9-9" strokeDasharray="3 1" />
            <circle cx="21" cy="12" r="1.5" fill="currentColor" />
            <circle cx="3" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="3" r="1" fill="#fff" />
            <circle cx="12" cy="21" r="1" fill="#fff" />
          </g>
        </svg>
      );

    case 'campfire': // Campfire pulsing
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes firePulse {
              0%, 100% { transform: scale(0.96); opacity: 0.8; }
              50% { transform: scale(1.06); opacity: 1; stroke: #fff; filter: drop-shadow(0 0 2px currentColor); }
            }
          `}</style>
          {/* Logs */}
          <line x1="5" y1="19" x2="19" y2="19" strokeWidth="2" />
          <line x1="7" y1="21" x2="17" y2="17" />
          <line x1="17" y1="21" x2="7" y2="17" />
          {/* Flames */}
          <path d="M12 3C12 3 8 7 8 11a4 4 0 0 0 8 0c0-4-4-8-4-8z" style={{ animation: 'firePulse 1.5s infinite ease-in-out', transformOrigin: '12px 15px' }} />
        </svg>
      );

    case 'brain': // BCI Nanobot Pill Bay brain pulsing
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes brainBreathe {
              0%, 100% { transform: scale(0.97); opacity: 0.8; }
              50% { transform: scale(1.03); opacity: 1; filter: drop-shadow(0 0 2.5px currentColor); }
            }
          `}</style>
          <g style={{ animation: 'brainBreathe 2.5s infinite ease-in-out', transformOrigin: '12px 12px' }}>
            <path d="M9.5 2A4.5 4.5 0 0 0 5 6.5C5 8.1 5.9 9.5 7 10.2a4.9 4.9 0 0 0-1 3.3c0 2.2 1.3 4.1 3 4.8-.3.7-.5 1.5-.5 2.2a2.5 2.5 0 0 0 5 0c0-.7-.2-1.5-.5-2.2 1.7-.7 3-2.6 3-4.8a4.9 4.9 0 0 0-1-3.3c1.1-.7 2-2.1 2-3.7A4.5 4.5 0 0 0 14.5 2h-5z" />
            <path d="M12 2v17" strokeWidth="0.8" strokeDasharray="1 1" />
          </g>
        </svg>
      );

    case 'bike': // Pressurized bike link moving wheels
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes wheelSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          {/* Frame structure */}
          <path d="M5.5 17.5L12 11.5L18.5 17.5" />
          <path d="M12 11.5L16 6.5H20" />
          <path d="M12 11.5H7.5L5.5 17.5" />
          {/* Rotating Wheels */}
          <circle cx="5.5" cy="17.5" r="3.5" strokeDasharray="3 1.5" style={{ animation: 'wheelSpin 2s linear infinite', transformOrigin: '5.5px 17.5px' }} />
          <circle cx="18.5" cy="17.5" r="3.5" strokeDasharray="3 1.5" style={{ animation: 'wheelSpin 2s linear infinite', transformOrigin: '18.5px 17.5px' }} />
        </svg>
      );

    case 'walk': // Footprints/walking radar pulses
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <style>{`
            @keyframes walkPulse {
              0%, 100% { opacity: 0.3; transform: scale(0.9); }
              50% { opacity: 1; transform: scale(1.1); stroke: #fff; }
            }
          `}</style>
          <g style={{ animation: 'walkPulse 1.4s infinite ease-in-out', transformOrigin: '12px 12px' }}>
            <path d="M17 10c.7-1.3 1-3 .5-4.5s-2-2.5-3.5-3-.5 1-1.2 1.8A5.5 5.5 0 0 1 11 6" />
            <path d="M7 14c-.7 1.3-1 3-.5 4.5s2 2.5 3.5 3 .5-1 1.2-1.8a5.5 5.5 0 0 1 1.8-1.7" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
