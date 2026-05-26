import React from 'react';

export default function InterestVisuals({ svgType }) {
  if (!svgType) return null;

  switch (svgType) {
    /* ----------------------------------------------------
       1. TECHNOLOGY & GUI
       ---------------------------------------------------- */
    case 'tech_overview':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#080b13', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#141a29" />
          <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
          <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
          <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // TECH_INTEGRATION_CORE</text>
          
          <g opacity="0.1">
            <line x1="0" y1="40" x2="320" y2="40" stroke="#00f0ff" strokeWidth="0.5" />
            <line x1="0" y1="70" x2="320" y2="70" stroke="#00f0ff" strokeWidth="0.5" />
            <line x1="160" y1="15" x2="160" y2="110" stroke="#00f0ff" strokeWidth="0.5" />
          </g>

          {/* Left Side: GUI Terminal Node */}
          <g transform="translate(15, 20)">
            <rect x="5" y="10" width="80" height="50" rx="3" fill="none" stroke="#00f0ff" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 2px rgba(0,240,255,0.3))' }} />
            <rect x="10" y="15" width="70" height="30" rx="1.5" fill="#060910" stroke="rgba(0,240,255,0.2)" strokeWidth="0.8" />
            <line x1="15" y1="20" x2="45" y2="20" stroke="#00f0ff" strokeWidth="1" />
            <line x1="15" y1="26" x2="35" y2="26" stroke="#00ff88" strokeWidth="0.8" />
            <line x1="15" y1="32" x2="55" y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
            <circle cx="65" cy="25" r="5" fill="none" stroke="#2979ff" strokeWidth="1" />
            <text x="45" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">GUI SYSTEMS</text>
          </g>

          {/* Center: SYNC LINK */}
          <g transform="translate(110, 55)">
            <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 2" />
            <path d="M 40,-8 L 50,0 L 40,8" fill="none" stroke="#00ff88" strokeWidth="1" />
            <path d="M 60,-8 L 50,0 L 60,8" fill="none" stroke="#00f0ff" strokeWidth="1" />
            <rect x="33" y="-6" width="34" height="12" rx="2" fill="#141a29" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <text x="50" y="2.5" fill="#00f0ff" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SYNAPSE</text>
          </g>

          {/* Right Side: Gadget Holographic Emitter Node */}
          <g transform="translate(225, 20)">
            <ellipse cx="40" cy="35" rx="25" ry="10" fill="none" stroke="#00ff88" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 2px rgba(0,255,136,0.3))' }} />
            <ellipse cx="40" cy="35" rx="10" ry="4" fill="none" stroke="#00f0ff" strokeWidth="1" />
            <path d="M 30,35 Q 40,10 50,35" fill="none" stroke="#c259ff" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="40" cy="15" r="3" fill="#fff" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
            <line x1="40" y1="35" x2="40" y2="15" stroke="rgba(0,255,136,0.4)" strokeWidth="0.8" />
            <text x="40" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">GADGET CORES</text>
          </g>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">HYBRID_PORT: interactive_deck_v3</text>
          <text x="310" y="102" fill="#00f0ff" fontSize="5.5" fontFamily="monospace" textAnchor="end">INTEGRATION: ACTIVE</text>
        </svg>
      );

    case 'tech_gui':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#080b13', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#141a29" />
          <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
          <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
          <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // DESKTOP_VIEWER</text>
          <g transform="translate(10, 24)">
            <rect x="5" y="5" width="16" height="12" rx="2" fill="none" stroke="#00f0ff" strokeWidth="1" />
            <path d="M 5,5 L 11,5 L 13,8 L 21,8 L 21,17 L 5,17 Z" fill="none" stroke="#00f0ff" strokeWidth="1" />
            <text x="13" y="27" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">SYSTEMS</text>
            <rect x="35" y="5" width="16" height="12" rx="2" fill="none" stroke="#2979ff" strokeWidth="1" />
            <path d="M 35,5 L 41,5 L 43,8 L 51,8 L 51,17 L 35,17 Z" fill="none" stroke="#2979ff" strokeWidth="1" />
            <text x="43" y="27" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">APPS</text>
          </g>
          <g transform="translate(110, 24)">
            <circle cx="40" cy="25" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            <path d="M 40,9 A 16 16 0 0 1 56,25" fill="none" stroke="#00f0ff" strokeWidth="2.5" />
            <text x="40" y="28" fill="#fff" fontSize="6.5" fontFamily="monospace" textAnchor="middle">85%</text>
            <text x="40" y="49" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">GUI INDEX</text>
            <circle cx="120" cy="25" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            <path d="M 120,9 A 16 16 0 1 1 104,25" fill="none" stroke="#00ff88" strokeWidth="2.5" />
            <text x="120" y="28" fill="#fff" fontSize="6.5" fontFamily="monospace" textAnchor="middle">ONLINE</text>
            <text x="120" y="49" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">CORES</text>
          </g>
        </svg>
      );

    case 'tech_gadgets':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#080b13', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#141a29" />
          <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
          <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
          <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // FUTURISTIC_GADGET_SCHEMATIC</text>
          <g opacity="0.15">
            <line x1="0" y1="40" x2="320" y2="40" stroke="#00f0ff" strokeWidth="0.5" />
            <line x1="0" y1="70" x2="320" y2="70" stroke="#00f0ff" strokeWidth="0.5" />
            <line x1="80" y1="15" x2="80" y2="110" stroke="#00f0ff" strokeWidth="0.5" />
            <line x1="240" y1="15" x2="240" y2="110" stroke="#00f0ff" strokeWidth="0.5" />
          </g>
          <g transform="translate(160, 60)" style={{ filter: 'drop-shadow(0 0 4px #00f0ff)' }}>
            <path d="M -50,15 L -20,5 Q 0,0 20,5 L 50,15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
            <path d="M -50,-15 L -20,-5 Q 0,0 20,-5 L 50,-15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="0" cy="0" rx="18" ry="6" fill="#141a29" stroke="#00f0ff" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="8" ry="3" fill="none" stroke="#00ff88" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="1.5" fill="#fff" />
            <path d="M -12,0 L -30,-35 L 30,-35 L 12,0 Z" fill="url(#gadgetHoloGlow)" opacity="0.25" />
            <g transform="translate(0, -32)" opacity="0.9">
              <circle cx="0" cy="0" r="12" fill="none" stroke="#00ff88" strokeWidth="1" strokeDasharray="3 1" />
              <text x="0" y="3" fill="#00ff88" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">MY38</text>
              <circle cx="-25" cy="-5" r="5" fill="none" stroke="#00f0ff" strokeWidth="0.8" />
              <path d="M -25,-8 L -25,-5 L -23,-5" fill="none" stroke="#00f0ff" strokeWidth="0.8" />
              <rect x="18" y="-10" width="10" height="8" rx="1.5" fill="none" stroke="#c259ff" strokeWidth="0.8" />
              <line x1="21" y1="-6" x2="25" y2="-6" stroke="#c259ff" strokeWidth="0.8" />
            </g>
          </g>
          <defs>
            <linearGradient id="gadgetHoloGlow" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">CORE: quantum_emitter_v4.2</text>
          <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">STATUS: LATEST // ACTIVE</text>
        </svg>
      );

    /* ----------------------------------------------------
       2. SCI-FI & FANTASY
       ---------------------------------------------------- */
    case 'scifi_overview':
      return (
        <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194,89,255,0.08)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#151324" />
          <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
          <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
          <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // CINEMATIC_INTEGRATION_CORE</text>

          <g opacity="0.1">
            <line x1="0" y1="40" x2="320" y2="40" stroke="#c259ff" strokeWidth="0.5" />
            <line x1="160" y1="15" x2="160" y2="90" stroke="#c259ff" strokeWidth="0.5" />
          </g>

          {/* Left side: Sci-Fi node */}
          <g transform="translate(15, 20)">
            <line x1="10" y1="40" x2="35" y2="20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px #00f0ff)' }} />
            <line x1="10" y1="40" x2="18" y2="34" stroke="#555" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="15" r="10" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 1" />
            <text x="35" y="52" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">SCI-FI TELEMETRY</text>
          </g>

          {/* Center Link */}
          <g transform="translate(110, 45)">
            <path d="M 10,0 Q 50,-10 90,0" fill="none" stroke="rgba(194, 89, 255, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="50" cy="-4" r="3.5" fill="#141a29" stroke="#ffe082" strokeWidth="1" />
            <text x="50" y="0.5" fill="#ffe082" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SYNAPSE</text>
          </g>

          {/* Right side: Fantasy node */}
          <g transform="translate(210, 20)">
            <line x1="75" y1="40" x2="50" y2="20" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 2px #ffe082)' }} />
            <path d="M 46,16 L 49,16 L 47,19 Z" fill="#ffe082" style={{ filter: 'drop-shadow(0 0 3px #ffe082)' }} />
            <circle cx="50" cy="20" r="1.5" fill="#fff" />
            <circle cx="42" cy="22" r="0.8" fill="#fff" />
            <circle cx="58" cy="16" r="0.8" fill="#fff" />
            <text x="45" y="52" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">FANTASY LORE</text>
          </g>

          <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: cinema_sync_v2.0</text>
          <text x="310" y="84" fill="#c259ff" fontSize="5.5" fontFamily="monospace" textAnchor="end">INTEGRATION: ACTIVE</text>
        </svg>
      );

    case 'scifi_detailed':
      return (
        <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194,89,255,0.08)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#151324" />
          <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
          <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
          <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // FUTURE_INTERFACE_GRID</text>
          
          <g opacity="0.1">
            <line x1="10" y1="20" x2="310" y2="20" stroke="#c259ff" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="310" y2="50" stroke="#c259ff" strokeWidth="0.5" />
            <line x1="10" y1="80" x2="310" y2="80" stroke="#c259ff" strokeWidth="0.5" />
            <line x1="50" y1="15" x2="50" y2="100" stroke="#c259ff" strokeWidth="0.5" />
            <line x1="110" y1="15" x2="110" y2="100" stroke="#c259ff" strokeWidth="0.5" />
            <line x1="170" y1="15" x2="170" y2="100" stroke="#c259ff" strokeWidth="0.5" />
            <line x1="230" y1="15" x2="230" y2="100" stroke="#c259ff" strokeWidth="0.5" />
          </g>

          {/* LCARS-style block elements on the left */}
          <g transform="translate(10, 20)">
            <path d="M 5,5 L 30,5 A 5 5 0 0 1 35,10 L 35,18 L 10,18 A 5 5 0 0 0 5,23 L 5,35" fill="none" stroke="#ffe082" strokeWidth="2.5" />
            <rect x="12" y="10" width="10" height="4" fill="#c259ff" />
            <rect x="24" y="10" width="8" height="4" fill="#00f0ff" />
            <text x="20" y="27" fill="rgba(255,255,255,0.5)" fontSize="5" fontFamily="monospace">LCARS v9</text>
          </g>

          {/* Iron Man circular HUD overlay in the center */}
          <g transform="translate(160, 50)" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}>
            <circle cx="0" cy="0" r="22" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="4 2" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="#ffe082" strokeWidth="1.2" />
            <path d="M -8,-8 L 8,8 M -8,8 L 8,-8" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="4" fill="#00ff88" />
            <text x="25" y="-12" fill="#ffe082" fontSize="5" fontFamily="monospace">JARVIS_ONLINE</text>
            <line x1="12" y1="-8" x2="22" y2="-12" stroke="#00f0ff" strokeWidth="0.6" />
          </g>

          {/* Star Wars holographic vector on the right */}
          <g transform="translate(245, 20)">
            <path d="M 10,40 Q 30,10 50,40 Z" fill="none" stroke="#00ff88" strokeWidth="1.2" opacity="0.8" />
            <line x1="30" y1="48" x2="30" y2="40" stroke="#00ff88" strokeWidth="1" />
            <ellipse cx="30" cy="48" rx="12" ry="4" fill="#080b13" stroke="#00f0ff" strokeWidth="1" />
            <path d="M 18,48 L 30,25 L 42,48" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.8" />
            <text x="30" y="58" fill="rgba(255,255,255,0.6)" fontSize="5" fontFamily="monospace" textAnchor="middle">HOLO_PROJECTOR</text>
          </g>
        </svg>
      );

    case 'fantasy_detailed':
      return (
        <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194,89,255,0.08)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#151324" />
          <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
          <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
          <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // FANTASY_LEGENDARY_DECK</text>

          {/* Harry Potter: Magic Wand and golden snitch on the left */}
          <g transform="translate(15, 20)">
            <line x1="10" y1="40" x2="45" y2="15" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px #ffe082)' }} />
            <circle cx="48" cy="13" r="2.5" fill="#fff" />
            {/* Golden Snitch */}
            <circle cx="20" cy="18" r="4.5" fill="#ffe082" style={{ filter: 'drop-shadow(0 0 2px #ffe082)' }} />
            <path d="M 20,13.5 C 10,10 5,16 15.5,18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            <path d="M 20,13.5 C 30,10 35,16 24.5,18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            <text x="30" y="52" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">MAGIC & WANDS</text>
          </g>

          {/* Lord of the Rings: One Ring in the center */}
          <g transform="translate(160, 42)">
            <circle cx="0" cy="0" r="13" fill="none" stroke="#ffb300" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 4px #ffb300)' }} />
            <circle cx="0" cy="0" r="10" fill="none" stroke="#ea4335" strokeWidth="0.8" opacity="0.6" />
            <text x="0" y="30" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">THE ONE RING</text>
          </g>

          {/* Back to the future: Delorean speed meter on the right */}
          <g transform="translate(255, 20)">
            <rect x="0" y="5" width="50" height="30" rx="3" fill="#080b13" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="25" y="18" fill="#ff5722" fontSize="11" fontFamily="monospace" fontWeight="900" textAnchor="middle" style={{ filter: 'drop-shadow(0 0 2px #ff5722)' }}>88</text>
            <text x="25" y="29" fill="#ff5722" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">MPH</text>
            <text x="25" y="52" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">TEMPORAL LOGIC</text>
          </g>
        </svg>
      );

    /* ----------------------------------------------------
       3. MUSIC & VOCALS
       ---------------------------------------------------- */
    case 'music_overview':
      return (
        <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 179, 0, 0.2)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#1b1508" />
          <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
          <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
          <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // ACOUSTIC_INTEGRATION_CORE</text>

          <g opacity="0.1">
            <line x1="0" y1="40" x2="320" y2="40" stroke="#ffb300" strokeWidth="0.5" />
            <line x1="160" y1="15" x2="160" y2="90" stroke="#ffb300" strokeWidth="0.5" />
          </g>

          {/* Left side: Organ Pipes */}
          <g transform="translate(15, 20)">
            <rect x="5" y="5" width="4" height="25" fill="#ffb300" opacity="0.8" />
            <rect x="11" y="0" width="4" height="30" fill="#ffe082" />
            <rect x="17" y="8" width="4" height="22" fill="#ffb300" opacity="0.8" />
            <rect x="23" y="3" width="4" height="27" fill="#ffe082" />
            <rect x="29" y="12" width="4" height="18" fill="#ffb300" opacity="0.8" />
            <text x="17" y="52" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">PIPE ORGAN CORES</text>
          </g>

          {/* Center Link */}
          <g transform="translate(110, 45)">
            <path d="M 10,0 Q 50,10 90,0" fill="none" stroke="rgba(255, 179, 0, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="50" y="4" fill="#00ff88" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SYNAPSE</text>
          </g>

          {/* Right side: Vocal Wave / Microphone */}
          <g transform="translate(225, 20)">
            <circle cx="20" cy="15" r="5" fill="none" stroke="#00ff88" strokeWidth="1.2" />
            <line x1="20" y1="20" x2="20" y2="30" stroke="#00ff88" strokeWidth="1.5" />
            <line x1="15" y1="30" x2="25" y2="30" stroke="#00ff88" strokeWidth="1.2" />
            <path d="M 5,20 Q 20,40 35,20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="20" y="52" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">VOCAL CHANNELS</text>
          </g>

          <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: acoustical_sync_v1.2</text>
          <text x="310" y="84" fill="#ffb300" fontSize="5.5" fontFamily="monospace" textAnchor="end">INTEGRATION: ACTIVE</text>
        </svg>
      );

    case 'music_artists':
      return (
        <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 179, 0, 0.2)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
          <rect x="90" y="10" width="140" height="70" rx="6" fill="#141a29" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <g style={{ animation: 'spin 10s linear infinite', transformOrigin: '150px 45px' }}>
            <circle cx="150" cy="45" r="28" fill="#0c0d12" stroke="#222" strokeWidth="1" />
            <circle cx="150" cy="45" r="24" fill="none" stroke="#242630" strokeWidth="0.8" />
            <circle cx="150" cy="45" r="18" fill="none" stroke="#242630" strokeWidth="0.8" />
            <circle cx="150" cy="45" r="8" fill="#ffb300" />
            <circle cx="150" cy="45" r="1.5" fill="#000" />
          </g>
          <path d="M 215,28 L 195,28 L 172,40" fill="none" stroke="#cfd8dc" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="215" cy="28" r="4.5" fill="#455a64" />
          <text x="160" y="85" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">FAVORITES: TAYLOR SWIFT // NOAH KAHAN // PIPE ORGAN</text>
        </svg>
      );

    case 'music_vocals':
      return (
        <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#081c13" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // VOCAL_SPECTRUM_HUD</text>

          {/* Waveform graphic */}
          <g transform="translate(10, 20)">
            <path d="M 10,25 Q 30,5 50,25 T 90,25 T 130,25 T 170,25 T 210,25 T 250,25 T 290,25" fill="none" stroke="#00ff88" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,136,0.6))' }} />
            <path d="M 10,25 Q 30,15 50,25 T 90,25 T 130,25 T 170,25 T 210,25 T 250,25 T 290,25" fill="none" stroke="#00f0ff" strokeWidth="0.8" opacity="0.6" />
            <line x1="10" y1="25" x2="290" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="3 3" />
          </g>

          <text x="160" y="80" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">VIBRATO DETECTOR // KARAOKE SCRIPT CORES: 44.1kHz</text>
        </svg>
      );

    /* ----------------------------------------------------
       4. CYCLING & FREEDOM
       ---------------------------------------------------- */
    case 'biking_overview':
      return (
        <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#081c13" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // MOBILITY_INTEGRATION_CORE</text>

          {/* Left side: Bicycle gear/wheel schematic */}
          <g transform="translate(45, 50)">
            <circle cx="0" cy="0" r="22" fill="none" stroke="#00ff88" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="8" fill="none" stroke="#00ff88" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2" fill="#fff" />
            <line x1="0" y1="-22" x2="0" y2="22" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" />
            <line x1="-22" y1="0" x2="22" y2="0" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" />
            <line x1="-15.5" y1="-15.5" x2="15.5" y2="15.5" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" />
            <line x1="-15.5" y1="15.5" x2="15.5" y2="-15.5" stroke="#00ff88" strokeWidth="0.8" opacity="0.6" />
            <text x="0" y="32" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">GEAR HUB SPECS</text>
          </g>

          {/* Center Link */}
          <g>
            <path d="M 67,50 C 120,30 190,70 243,50" fill="none" stroke="#00ff88" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="155" y="46" fill="#fff" fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity="0.7">TRANSIT DELTA LINK</text>
            <rect x="120" y="52" width="70" height="8" rx="2" fill="rgba(0, 255, 136, 0.08)" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.5" />
            <text x="155" y="58" fill="#00ff88" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">INDEPENDENCE: 100%</text>
          </g>

          {/* Right side: Transit map routing nodes */}
          <g>
            <path d="M 245,60 L 265,40 L 285,60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <circle cx="245" cy="60" r="3" fill="#00f0ff" />
            <circle cx="265" cy="40" r="3.5" fill="#00ff88" stroke="#fff" strokeWidth="0.5" />
            <circle cx="285" cy="60" r="3" fill="#00f0ff" />
            <text x="265" y="74" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">COMMUTE NODES</text>
          </g>

          <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: mobility_core_v1.0</text>
          <text x="310" y="84" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">INTEGRATION: ARMED</text>
        </svg>
      );

    case 'biking_routing':
      return (
        <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#081c13" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // ROUTING_EFFICIENCY_DECK</text>

          {/* Map grid background */}
          <g opacity="0.15">
            <line x1="10" y1="20" x2="310" y2="20" stroke="#00ff88" strokeWidth="0.5" />
            <line x1="10" y1="40" x2="310" y2="40" stroke="#00ff88" strokeWidth="0.5" />
            <line x1="10" y1="60" x2="310" y2="60" stroke="#00ff88" strokeWidth="0.5" />
            <line x1="50" y1="15" x2="50" y2="80" stroke="#00ff88" strokeWidth="0.5" />
            <line x1="110" y1="15" x2="110" y2="80" stroke="#00ff88" strokeWidth="0.5" />
            <line x1="170" y1="15" x2="170" y2="80" stroke="#00ff88" strokeWidth="0.5" />
            <line x1="230" y1="15" x2="230" y2="80" stroke="#00ff88" strokeWidth="0.5" />
            <line x1="290" y1="15" x2="290" y2="80" stroke="#00ff88" strokeWidth="0.5" />
          </g>

          {/* Transit winding slow route */}
          <path d="M 20,65 L 50,65 L 50,45 L 110,45 L 110,25 L 140,25" fill="none" stroke="rgba(255, 87, 34, 0.4)" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="60" y="38" fill="rgba(255, 87, 34, 0.8)" fontSize="5" fontFamily="monospace">TRANSIT: 75 MINS</text>

          {/* Biking route */}
          <path d="M 20,65 L 80,65 L 140,25" fill="none" stroke="#00ff88" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 3px rgba(0,255,136,0.6))' }} />
          
          {/* Start node */}
          <circle cx="20" cy="65" r="4" fill="#00ff88" stroke="#fff" strokeWidth="0.8" />
          <text x="20" y="58" fill="#fff" fontSize="4.5" fontFamily="monospace" fontWeight="bold">HOME</text>

          {/* End node */}
          <circle cx="140" cy="25" r="4" fill="#00f0ff" stroke="#fff" strokeWidth="0.8" />
          <text x="140" y="18" fill="#fff" fontSize="4.5" fontFamily="monospace" fontWeight="bold">ADELPHI</text>

          {/* Telemetry panel */}
          <g transform="translate(180, 22)">
            <rect x="0" y="0" width="130" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1" />
            <text x="10" y="12" fill="#00ff88" fontSize="7" fontFamily="monospace" fontWeight="bold">DELTA: -30 MINS</text>
            <text x="10" y="24" fill="#fff" fontSize="6.5" fontFamily="monospace">BIKE COMMUTE: 45m</text>
            <text x="10" y="34" fill="rgba(255,255,255,0.6)" fontSize="5" fontFamily="monospace">MAPS RATIO: 1.66x FASTER</text>
            <text x="10" y="44" fill="#00f0ff" fontSize="5.5" fontFamily="monospace" fontWeight="bold">TAILWIND SPEED BOOST</text>
          </g>

          <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SCHEDULING: INDEPENDENT</text>
          <text x="310" y="84" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">ROUTE A5: SAVINGS CORE</text>
        </svg>
      );

    case 'biking_endurance':
      return (
        <svg viewBox="0 0 320 90" width="100%" height="90px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#081c13" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // ENDURANCE_WEATHER_GRID</text>

          {/* Diagonal rain-drops */}
          <g stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.8" strokeLinecap="round">
            <line x1="20" y1="20" x2="10" y2="40" />
            <line x1="60" y1="20" x2="50" y2="40" />
            <line x1="100" y1="20" x2="90" y2="40" />
            <line x1="140" y1="20" x2="130" y2="40" />
            <line x1="180" y1="20" x2="170" y2="40" />
            <line x1="220" y1="20" x2="210" y2="40" />
            <line x1="260" y1="20" x2="250" y2="40" />
            <line x1="300" y1="20" x2="290" y2="40" />
            <line x1="40" y1="40" x2="30" y2="60" />
            <line x1="80" y1="40" x2="70" y2="60" />
            <line x1="120" y1="40" x2="110" y2="60" />
            <line x1="160" y1="40" x2="150" y2="60" />
            <line x1="200" y1="40" x2="190" y2="60" />
            <line x1="240" y1="40" x2="230" y2="60" />
            <line x1="280" y1="40" x2="270" y2="60" />
            <line x1="30" y1="60" x2="20" y2="80" />
            <line x1="70" y1="60" x2="60" y2="80" />
            <line x1="110" y1="60" x2="100" y2="80" />
            <line x1="150" y1="60" x2="140" y2="80" />
            <line x1="190" y1="60" x2="180" y2="80" />
            <line x1="230" y1="60" x2="220" y2="80" />
            <line x1="270" y1="60" x2="260" y2="80" />
          </g>

          {/* Headwind vectors */}
          <g stroke="#00ff88" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
            <path d="M 120,32 L 95,32 M 100,28 L 95,32 L 100,36" fill="none" />
            <path d="M 175,55 L 150,55 M 155,51 L 150,55 L 155,59" fill="none" />
            <text x="145" y="27" fill="#00ff88" fontSize="4.5" fontFamily="monospace">HEADWIND CURRENT</text>
          </g>

          {/* Left side circular gauge */}
          <g transform="translate(45, 50)">
            <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <circle cx="0" cy="0" r="18" fill="none" stroke="#00ff88" strokeWidth="3" strokeDasharray="80 30" strokeDashoffset="15" />
            <text x="0" y="2.5" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">92%</text>
            <text x="0" y="26" fill="rgba(255,255,255,0.6)" fontSize="5" fontFamily="monospace" textAnchor="middle">GRIT RATIO</text>
          </g>

          {/* Telemetry panel */}
          <g transform="translate(205, 22)">
            <rect x="0" y="0" width="105" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1" />
            <text x="8" y="12" fill="#00ff88" fontSize="6.5" fontFamily="monospace" fontWeight="bold">DAILY GOAL: ACTIVE</text>
            <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">ALL-WEATHER ENVIRO</text>
            <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">INSPIRING COMPANION</text>
            <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">LIMITS: EXPANDED</text>
          </g>

          <text x="10" y="84" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">ATMOSPHERE: PRECIPITATION_RAIN</text>
          <text x="310" y="84" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">ENDURANCE: MAX_LEVEL</text>
        </svg>
      );

    /* ----------------------------------------------------
       5. FLAG FOOTBALL
       ---------------------------------------------------- */
    case 'football_overview':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 87, 34, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#1b100a" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // PLAYBOOK_INCLUSION_CORE</text>

          {/* Left side: Playbook route chart */}
          <g transform="translate(15, 20)">
            <circle cx="20" cy="40" r="7" fill="none" stroke="#ff5722" strokeWidth="1" />
            <text x="20" y="43" fill="#ff5722" fontSize="8" fontFamily="monospace" textAnchor="middle">Q</text>
            <circle cx="45" cy="40" r="3" fill="#00f0ff" />
            <circle cx="70" cy="40" r="3" fill="#00f0ff" />
            <path d="M 45,40 Q 55,15 75,15" fill="none" stroke="#ff5722" strokeWidth="1.2" strokeDasharray="3 2" />
            <polygon points="75,12 72,17 78,17" fill="#ff5722" />
            <text x="45" y="58" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">TACTICAL MATRIX</text>
          </g>

          {/* Center Link */}
          <g>
            <path d="M 100,50 C 135,30 185,70 220,50" fill="none" stroke="#ff5722" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="160" y="46" fill="#fff" fontSize="5.5" fontFamily="monospace" textAnchor="middle" opacity="0.75">INCLUSION DELTA LINK</text>
            <rect x="125" y="52" width="70" height="8" rx="2" fill="rgba(255, 87, 34, 0.08)" stroke="rgba(255, 87, 34, 0.3)" strokeWidth="0.5" />
            <text x="160" y="58" fill="#ff5722" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ROLE VALUE: 100%</text>
          </g>

          {/* Right side: Inclusion network node */}
          <g transform="translate(210, 20)">
            <circle cx="50" cy="30" r="4.5" fill="#ff5722" stroke="#fff" strokeWidth="0.8" />
            <circle cx="30" cy="15" r="3" fill="#00f0ff" />
            <circle cx="70" cy="15" r="3" fill="#00f0ff" />
            <circle cx="30" cy="45" r="3" fill="#00f0ff" />
            <circle cx="70" cy="45" r="3" fill="#00f0ff" />
            <line x1="50" y1="30" x2="30" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <line x1="50" y1="30" x2="70" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <line x1="50" y1="30" x2="30" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <line x1="50" y1="30" x2="70" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <text x="50" y="60" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">TEAM DYNAMICS</text>
          </g>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: playbook_sync_v1.0</text>
          <text x="310" y="102" fill="#ff5722" fontSize="5.5" fontFamily="monospace" textAnchor="end">INCLUSION: MAXIMIZED</text>
        </svg>
      );

    case 'football_playmaker':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 87, 34, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#1b100a" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // PLAYMAKER_HIGHLIGHT_GRID</text>

          <g opacity="0.1">
            <line x1="10" y1="20" x2="310" y2="20" stroke="#ff5722" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="310" y2="50" stroke="#ff5722" strokeWidth="0.5" />
            <line x1="10" y1="80" x2="310" y2="80" stroke="#ff5722" strokeWidth="0.5" />
            <line x1="50" y1="15" x2="50" y2="100" stroke="#ff5722" strokeWidth="0.5" />
            <line x1="110" y1="15" x2="110" y2="100" stroke="#ff5722" strokeWidth="0.5" />
            <line x1="170" y1="15" x2="170" y2="100" stroke="#ff5722" strokeWidth="0.5" />
            <line x1="230" y1="15" x2="230" y2="100" stroke="#ff5722" strokeWidth="0.5" />
          </g>

          {/* Left side: Interception radar */}
          <g transform="translate(10, 20)">
            <circle cx="45" cy="30" r="18" fill="none" stroke="rgba(255, 87, 34, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="45" cy="30" r="10" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1" />
            <circle cx="45" cy="30" r="3" fill="#ff5722" />
            <path d="M 15,48 L 35,35 L 45,30" fill="none" stroke="#ff5722" strokeWidth="2.2" style={{ filter: 'drop-shadow(0 0 3px rgba(255,87,34,0.6))' }} />
            <text x="45" y="58" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">INTERCEPT RADAR</text>
          </g>

          {/* Telemetry panel */}
          <g transform="translate(180, 25)">
            <rect x="0" y="0" width="130" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(255, 87, 34, 0.2)" strokeWidth="1" />
            <text x="10" y="12" fill="#ff5722" fontSize="6.5" fontFamily="monospace" fontWeight="bold">HIGHLIGHT: PASS INT</text>
            <text x="10" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">TOUCHDOWN CAPTURE</text>
            <text x="10" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">TEAM EXCITEMENT: PEAK</text>
            <text x="10" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">SOCIAL SCRIPTS: SUCCESS</text>
          </g>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">PREDICTION: INTERCEPT_OK</text>
          <text x="310" y="102" fill="#ff5722" fontSize="5.5" fontFamily="monospace" textAnchor="end">THRILL_INDEX: 100%</text>
        </svg>
      );

    case 'football_huddles':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 87, 34, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#1b100a" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // STRATEGIC_PLAYBOOK_MATRIX</text>

          {/* Playbook route design */}
          <g transform="translate(10, 20)">
            <circle cx="80" cy="40" r="7" fill="none" stroke="#fff" strokeWidth="1" />
            <text x="80" y="43" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle">Q</text>
            <circle cx="40" cy="40" r="4" fill="none" stroke="#ff5722" strokeWidth="1.2" />
            <text x="40" y="43" fill="#ff5722" fontSize="6" fontFamily="monospace" textAnchor="middle">X</text>
            <circle cx="120" cy="40" r="4" fill="none" stroke="#ff5722" strokeWidth="1.2" />
            <text x="120" y="43" fill="#ff5722" fontSize="6" fontFamily="monospace" textAnchor="middle">Z</text>
            
            <path d="M 40,36 L 40,15 L 15,15" fill="none" stroke="#ff5722" strokeWidth="1.5" strokeDasharray="3 2" />
            <polygon points="15,12 8,15 15,18" fill="#ff5722" />
            <text x="28" y="10" fill="#ff5722" fontSize="5.5" fontFamily="monospace">OUT ROUTE</text>
            
            <path d="M 120,36 L 120,10" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="114" y1="10" x2="126" y2="10" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="123" y="19" fill="#00f0ff" fontSize="5.5" fontFamily="monospace">BLOCK LINE</text>
            <text x="80" y="58" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">HUDDLE STRATEGY</text>
          </g>

          {/* Telemetry panel */}
          <g transform="translate(195, 25)">
            <rect x="0" y="0" width="115" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(255, 87, 34, 0.2)" strokeWidth="1" />
            <text x="8" y="12" fill="#ff5722" fontSize="6.5" fontFamily="monospace" fontWeight="bold">PLAYBOOK: ACTIVE</text>
            <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">HUDDLE SYNC: OK</text>
            <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">STRUCTURED SOCIAL</text>
            <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">ROLE: BLOCKER</text>
          </g>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SCHEDULING: TACTICAL</text>
          <text x="310" y="102" fill="#ff5722" fontSize="5.5" fontFamily="monospace" textAnchor="end">TEAM UNITY: SECURED</text>
        </svg>
      );

    /* ----------------------------------------------------
       6. TRAVELING & EXPLORATION
       ---------------------------------------------------- */
    case 'traveling_overview':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 0, 127, 0.22)', boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.08)' }}>
          <circle cx="160" cy="180" r="140" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="160" cy="180" r="90" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" />
          <line x1="5" y1="55" x2="315" y2="55" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          <line x1="160" y1="5" x2="160" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

          {/* Flight Routes */}
          <path d="M 50,75 Q 100,20 150,55" fill="none" stroke="#ff007f" strokeWidth="1.5" strokeDasharray="3 3" style={{ filter: 'drop-shadow(0 0 2.5px #ff007f)' }} />
          <path d="M 150,55 Q 210,15 250,35" fill="none" stroke="#ff007f" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 2.5px #ff007f)' }} />
          <path d="M 250,35 Q 280,50 280,75" fill="none" stroke="#ffb300" strokeWidth="1" strokeDasharray="2 2" />

          <g>
            <circle cx="50" cy="75" r="3.5" fill="#00f0ff" />
            <circle cx="50" cy="75" r="7" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
            <text x="50" y="87" fill="rgba(255,255,255,0.6)" fontSize="5.2" fontFamily="monospace" textAnchor="middle">LAX</text>
            
            <circle cx="150" cy="55" r="3.5" fill="#ff007f" />
            <circle cx="150" cy="55" r="7" fill="none" stroke="#ff007f" strokeWidth="0.5" />
            <text x="150" y="67" fill="rgba(255,255,255,0.6)" fontSize="5.2" fontFamily="monospace" textAnchor="middle">NYC</text>

            <circle cx="250" cy="35" r="3.5" fill="#00ff88" />
            <circle cx="250" cy="35" r="7" fill="none" stroke="#00ff88" strokeWidth="0.5" />
            <text x="250" y="27" fill="rgba(255,255,255,0.6)" fontSize="5.2" fontFamily="monospace" textAnchor="middle">LHR (LONDON)</text>

            <circle cx="280" cy="75" r="3" fill="#ffb300" />
            <text x="280" y="87" fill="rgba(255,255,255,0.6)" fontSize="5.2" fontFamily="monospace" textAnchor="middle">NRT (TOKYO)</text>
          </g>

          <g transform="translate(90, 48) rotate(15)">
            <polygon points="0,0 8,-3 0,-6 -2,-3" fill="#ffffff" />
          </g>
          
          <text x="160" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ROUTE_MAP: US_EXPLORATION_AND_GLOBAL_TRANSIT</text>
        </svg>
      );

    case 'traveling_geography':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 0, 127, 0.22)', boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.08)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#1b000a" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // GEOGRAPHIC_SURVEY_DECK</text>

          <g opacity="0.05">
            <line x1="0" y1="35" x2="320" y2="35" stroke="#ff007f" strokeWidth="0.5" />
            <line x1="0" y1="65" x2="320" y2="65" stroke="#ff007f" strokeWidth="0.5" />
            <line x1="0" y1="95" x2="320" y2="95" stroke="#ff007f" strokeWidth="0.5" />
            <line x1="80" y1="15" x2="80" y2="110" stroke="#ff007f" strokeWidth="0.5" />
            <line x1="160" y1="15" x2="160" y2="110" stroke="#ff007f" strokeWidth="0.5" />
            <line x1="240" y1="15" x2="240" y2="110" stroke="#ff007f" strokeWidth="0.5" />
          </g>

          <g transform="translate(15, 20)">
            <path d="M 5,45 Q 25,20 45,35 T 85,25" fill="none" stroke="rgba(255, 0, 127, 0.2)" strokeWidth="1.2" />
            <path d="M 5,55 Q 30,30 50,45 T 85,35" fill="none" stroke="rgba(255, 0, 127, 0.3)" strokeWidth="1.2" />
            <path d="M 5,65 Q 35,40 55,55 T 85,45" fill="none" stroke="rgba(255, 0, 127, 0.15)" strokeWidth="1" />
            
            <circle cx="110" cy="35" r="14" fill="none" stroke="#ff007f" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="110" y1="17" x2="110" y2="53" stroke="#ff007f" strokeWidth="0.8" />
            <line x1="92" y1="35" x2="128" y2="35" stroke="#ff007f" strokeWidth="0.8" />
            <polygon points="110,25 113,35 107,35" fill="#ff007f" />
            <text x="110" y="16" fill="#ff007f" fontSize="5" fontFamily="monospace" textAnchor="middle">N</text>
            <text x="50" y="58" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">TOPOGRAPHIC SCANNER</text>
          </g>

          <g transform="translate(180, 25)">
            <rect x="0" y="0" width="130" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(255, 0, 127, 0.2)" strokeWidth="1" />
            <text x="10" y="12" fill="#ff007f" fontSize="6.5" fontFamily="monospace" fontWeight="bold">EXPLORATION: ACTIVE</text>
            <text x="10" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">GEOGRAPHY SCAN: ON</text>
            <text x="10" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">CULTURAL PROFILE: READY</text>
            <text x="10" y="42" fill="#00ff88" fontSize="5" fontFamily="monospace" fontWeight="bold">BUDGET RATIO: ASPIRATIONAL</text>
          </g>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SECTOR: BEYOND_NYC_METRO</text>
          <text x="310" y="102" fill="#ff007f" fontSize="5.5" fontFamily="monospace" textAnchor="end">TERRAIN_SURVEY: 100%</text>
        </svg>
      );

    case 'traveling_relocation':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(255, 0, 127, 0.22)', boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.08)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#1b000a" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // COLONY_RELOCATION_GRID</text>

          {/* Congested NYC Node vs Peaceful Outpost Node */}
          <g transform="translate(10, 20)">
            <circle cx="35" cy="35" r="16" fill="rgba(234, 67, 53, 0.08)" stroke="#ea4335" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="35" cy="35" r="5" fill="#ea4335" />
            <line x1="23" y1="35" x2="47" y2="35" stroke="#ea4335" strokeWidth="0.8" />
            <line x1="35" y1="23" x2="35" y2="47" stroke="#ea4335" strokeWidth="0.8" />
            <text x="35" y="58" fill="#ea4335" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NYC: CONGESTED</text>
            
            <path d="M 60,35 Q 95,15 130,35" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 3" style={{ filter: 'drop-shadow(0 0 2px #fff)' }} />
            <polygon points="130,35 122,31 125,37" fill="#ffffff" />
            <text x="95" y="22" fill="#fff" fontSize="5" fontFamily="monospace" textAnchor="middle" opacity="0.8">TRANSITION</text>

            <circle cx="155" cy="35" r="12" fill="none" stroke="#00ff88" strokeWidth="1.2" />
            <circle cx="155" cy="35" r="4.5" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
            <text x="155" y="58" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OUTPOST: PEACEFUL</text>
          </g>

          <g transform="translate(195, 25)">
            <rect x="0" y="0" width="115" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(255, 0, 127, 0.2)" strokeWidth="1" />
            <text x="8" y="12" fill="#ff007f" fontSize="6.5" fontFamily="monospace" fontWeight="bold">GOAL: RELOCATION</text>
            <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">POST-GRAD TARGET</text>
            <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">CONGESTION: MINIMAL</text>
            <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">JOBS LINK: ON GRAD</text>
          </g>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">TRAJECTORY: OUTWARD_BOUND</text>
          <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">DENSITY RATIO: LOW</text>
        </svg>
      );

    /* ----------------------------------------------------
       7. NEURODIVERSITY & SELF-DISCOVERY
       ---------------------------------------------------- */
    case 'neuro_overview':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#001a08" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // COGNITIVE_MAPPING_CORE</text>

          {/* Network paths */}
          <g opacity="0.3">
            <line x1="40" y1="40" x2="80" y2="25" stroke="#00ff88" strokeWidth="0.8" />
            <line x1="80" y1="25" x2="120" y2="55" stroke="#00f0ff" strokeWidth="0.8" />
            <line x1="120" y1="55" x2="160" y2="35" stroke="#00ff88" strokeWidth="0.8" />
            <line x1="160" y1="35" x2="200" y2="65" stroke="#00f0ff" strokeWidth="0.8" />
            <line x1="200" y1="65" x2="240" y2="45" stroke="#00ff88" strokeWidth="0.8" />
            <line x1="240" y1="45" x2="280" y2="75" stroke="#00f0ff" strokeWidth="0.8" />
          </g>

          {/* Glowing Synaptic Hubs */}
          <g>
            <circle cx="40" cy="40" r="3" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 2px #00ff88)' }} />
            <circle cx="80" cy="25" r="4.5" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }} />
            <circle cx="120" cy="55" r="3" fill="#00ff88" />
            <circle cx="160" cy="35" r="4" fill="#00f0ff" />
            <circle cx="200" cy="65" r="3" fill="#00ff88" />
            <circle cx="240" cy="45" r="4.5" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 2px #00f0ff)' }} />
            <circle cx="280" cy="75" r="3" fill="#00ff88" />
          </g>

          {/* Low opacity circular scan sweep */}
          <circle cx="160" cy="50" r="32" fill="none" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="160" cy="50" r="22" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
          
          <text x="160" y="54" fill="#fff" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold" opacity="0.9" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' }}>NEURAL NET: COHERENT</text>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">SYSTEM: synapse_mapping_v3.2</text>
          <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">UNDERSTANDING: INITIATED</text>
        </svg>
      );

    case 'neuro_friendship':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#001a08" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // SOCIAL_BATTERY_HUD</text>

          {/* Left: Social Battery Meter */}
          <g transform="translate(15, 25)">
            <text x="0" y="8" fill="rgba(255,255,255,0.7)" fontSize="5.5" fontFamily="monospace">SOCIAL_BATTERY</text>
            <rect x="0" y="14" width="50" height="22" rx="3" fill="none" stroke="#00ff88" strokeWidth="1.5" />
            <rect x="50" y="20" width="3" height="10" fill="#00ff88" rx="1" />
            
            <rect x="3" y="17" width="8" height="16" fill="#00ff88" />
            <rect x="13" y="17" width="8" height="16" fill="#00ff88" />
            <rect x="23" y="17" width="8" height="16" fill="#00ff88" opacity="0.3" />
            <rect x="33" y="17" width="8" height="16" fill="#00ff88" opacity="0.1" />
            <rect x="43" y="17" width="4" height="16" fill="#00ff88" opacity="0.1" />
            <text x="0" y="46" fill="#ff007f" fontSize="6" fontFamily="monospace" fontWeight="bold">STATUS: DRAINING</text>
          </g>

          {/* Center: Sensory Gauge */}
          <g transform="translate(95, 25)">
            <text x="35" y="8" fill="rgba(255,255,255,0.7)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">SENSORY_LOAD_FACTOR</text>
            
            <path d="M 10,40 A 25,25 0 0,1 60,40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 15,40 A 20,20 0 0,1 55,40" fill="none" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="15 5" />
            <path d="M 20,40 A 15,15 0 0,1 50,40" fill="none" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" />
            <path d="M 25,40 A 10,10 0 0,1 45,40" fill="none" stroke="#ff007f" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            
            <line x1="35" y1="40" x2="48" y2="22" stroke="#ff007f" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="35" cy="40" r="2" fill="#fff" />
            <text x="35" y="47" fill="#ff007f" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OVERLOAD ALERT</text>
          </g>

          {/* Right: Recovery panel */}
          <g transform="translate(195, 22)">
            <rect x="0" y="0" width="110" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1" />
            <text x="8" y="12" fill="#00ff88" fontSize="6" fontFamily="monospace" fontWeight="bold">INPUT RATE: HIGH</text>
            <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">BATTERY: 38% CAPACITY</text>
            <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">RECOVERY: 4.2h REST REQ</text>
            <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">SENSORY CHANNELS: MAX</text>
          </g>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">BATTERY: lithium_social_v4.5</text>
          <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">ALERT_LEVEL: MODERATE</text>
        </svg>
      );

    case 'neuro_empathy':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)' }}>
          <rect x="0" y="0" width="320" height="15" fill="#001a08" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // DOUBLE_EMPATHY_RESONANCE</text>

          {/* Autistic Social Resonance Wave */}
          <path d="M 20,40 Q 55,15 90,40 T 160,40 T 230,40 T 300,40" fill="none" stroke="#00ff88" strokeWidth="2.2" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
          <text x="30" y="32" fill="#00ff88" fontSize="5.5" fontFamily="monospace" fontWeight="bold">AUTISTIC RESONANCE</text>

          {/* Allistic Social Resonance Wave */}
          <path d="M 20,70 Q 55,95 90,70 T 160,70 T 230,70 T 300,70" fill="none" stroke="#ff007f" strokeWidth="2" strokeDasharray="3 2" style={{ filter: 'drop-shadow(0 0 2.5px #ff007f)' }} />
          <text x="30" y="80" fill="#ff007f" fontSize="5.5" fontFamily="monospace" fontWeight="bold">ALLISTIC RESONANCE</text>

          {/* Center Synapse Bridge */}
          <line x1="160" y1="40" x2="160" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="160" cy="55" r="4" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
          <text x="168" y="57" fill="#00f0ff" fontSize="5" fontFamily="monospace">SYNC: STABLE</text>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">MODEL: dual_empathy_resonance_v1.0</text>
          <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">SOCIAL SYNC: RESOLVED</text>
        </svg>
      );

    case 'neuro_burnout':
      return (
        <svg viewBox="0 0 320 110" width="100%" height="110px" style={{ background: '#0a0d17', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,255,255,0.1)' }}>
          <defs>
            <linearGradient id="neuroRainbowGradientFinal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="33%" stopColor="#00ff88" />
              <stop offset="66%" stopColor="#ffe082" />
              <stop offset="100%" stopColor="#00ff88" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="320" height="15" fill="#001a08" />
          <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">ARES_OS // NEUROTYPE_VARIATION_GRID</text>

          {/* Left: Glowing infinity loop */}
          <g transform="translate(5, 5)">
            <path 
              d="M 75,45 C 55,20 35,20 35,45 C 35,70 55,70 75,45 C 95,20 115,20 115,45 C 115,70 95,70 75,45 Z" 
              fill="none" 
              stroke="url(#neuroRainbowGradientFinal)" 
              strokeWidth="3" 
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 4px rgba(0, 255, 136, 0.5))' }} 
            />
            <circle cx="35" cy="45" r="2" fill="#00f0ff" />
            <circle cx="115" cy="45" r="2" fill="#00ff88" />
            <text x="75" y="80" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">INFINITY VECTOR</text>
          </g>

          {/* Center: segmented burnout recovery level bar chart */}
          <g transform="translate(135, 25)">
            <text x="0" y="10" fill="rgba(255,255,255,0.7)" fontSize="5.5" fontFamily="monospace">BURNOUT_RECOVERY</text>
            
            {/* Meter bar backgrounds */}
            <rect x="0" y="15" width="55" height="6" rx="1.5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            {/* Active green segments */}
            <rect x="1" y="16" width="10" height="4" fill="#00ff88" />
            <rect x="12" y="16" width="10" height="4" fill="#00ff88" />
            <rect x="23" y="16" width="10" height="4" fill="#00ff88" />
            <rect x="34" y="16" width="10" height="4" fill="#00ff88" opacity="0.4" />
            <rect x="45" y="16" width="8" height="4" fill="#00ff88" opacity="0.1" />
            
            <text x="0" y="32" fill="#00ff88" fontSize="5.5" fontFamily="monospace" fontWeight="bold">ENERGY STATUS: 78%</text>
          </g>

          {/* Right: Telemetry Panel */}
          <g transform="translate(205, 22)">
            <rect x="0" y="0" width="105" height="52" rx="4" fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="1" />
            <text x="8" y="12" fill="#00ff88" fontSize="6.5" fontFamily="monospace" fontWeight="bold">TYPE: AUTISTIC</text>
            <text x="8" y="22" fill="#fff" fontSize="5.5" fontFamily="monospace">COGNITIVE: OK</text>
            <text x="8" y="32" fill="rgba(255,255,255,0.7)" fontSize="5" fontFamily="monospace">DISABILITY: FALSE</text>
            <text x="8" y="42" fill="#00f0ff" fontSize="5" fontFamily="monospace" fontWeight="bold">ALLISTIC SYNC: OFF</text>
          </g>

          <text x="10" y="102" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="start">STATUS: INDEPENDENT_MIND</text>
          <text x="310" y="102" fill="#00ff88" fontSize="5.5" fontFamily="monospace" textAnchor="end">PATHOLOGY_RATING: 0%</text>
        </svg>
      );

    default:
      return null;
  }
}
