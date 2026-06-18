'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './styles.css';

const BciIcon = ({ name }) => (
  <svg 
    width={14} 
    height={14} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={2.5} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <use href={`/assets/svgs/bci_icon_${name}.svg#icon`} />
  </svg>
);


const TELEPATHIC_MESSAGES = [
  { sender: 'Ephraim', text: 'Hey Vance! Are you free for some flag football practice on the dome turf this weekend?', top: '15%', right: '8%' },
  { sender: 'Vance', text: 'Yeah! I\'d love to. How about Saturday afternoon? Say, around 15:00?', top: '27%', left: '8%' },
  { sender: 'Ephraim', text: 'Saturday at 15:00 works perfectly for me. Let\'s do it.', top: '39%', right: '8%' },
  { sender: 'RETINA_OS', text: 'Agreement detected. Syncing schedules and dome reservation logs...', top: '51%' },
  { sender: 'RETINA_OS', text: 'Calendar event created. Practice successfully scheduled in both timelines.', top: '63%', hasCalendarCard: true },
  { sender: 'Vance', text: 'Nice! Got the calendar block. See you on the turf Saturday!', top: '82%', left: '8%' }
];

export default function NanobotPillDetails() {
  const [transitState, setTransitState] = useState('slide-active');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Interactive HUD States
  const [hudFilterActive, setHudFilterActive] = useState(false);
  const [thoughtSyncActive, setThoughtSyncActive] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  
  // Active Scenario inside Phase 5
  const [activeScenario, setActiveScenario] = useState('overview');
  const [activeSuperhumanScenario, setActiveSuperhumanScenario] = useState('overview');
  const [isPlayingMedia, setIsPlayingMedia] = useState(true);
  const [timeString, setTimeString] = useState('');
  const [telepathicMsgIndex, setTelepathicMsgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [memoryViewMode, setMemoryViewMode] = useState('diary'); // 'diary' or 'summary'
  const [memoryShared, setMemoryShared] = useState(false);
  const [memoryPlaybackActive, setMemoryPlaybackActive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollRef = useRef(null);
  const viewportRef = useRef(null);
  const visualContainerRef = useRef(null);

  // Cycle telepathic messages when activeScenario is 'telepathy'
  useEffect(() => {
    if (activeScenario !== 'telepathy') {
      setTelepathicMsgIndex(0);
      return;
    }
    const timer = setInterval(() => {
      setTelepathicMsgIndex((prev) => (prev + 1) % TELEPATHIC_MESSAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeScenario]);

  // Live ticking clock for spatial anchors
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeString(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle slide entrance transition
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

  // Sync window scroll (mobile views) to activeTab
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleWindowScroll = () => {
      if (window.innerWidth > 900) return;

      const sections = ['overview', 'payload', 'adaptation', 'assembly', 'eclipse', 'superhuman'];
      let currentActive = 'overview';

      // Check if window is scrolled near the bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveTab('superhuman');
        return;
      }

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // The visual viewport is sticky at the top with a height of 250px.
          // Trigger when the element gets near the bottom half of the screen.
          if (rect.top <= window.innerHeight / 2 + 50) {
            currentActive = id;
          }
        }
      }
      setActiveTab(currentActive);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Sync scroll positioning to activeTab
  const handleScroll = (e) => {
    const container = e.currentTarget;
    
    // Check if scrolled to the bottom
    const isAtBottom = Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 15;
    if (isAtBottom) {
      setActiveTab('superhuman');
      return;
    }

    const sections = ['overview', 'payload', 'adaptation', 'assembly', 'eclipse', 'superhuman'];
    let currentActive = 'overview';

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        if (rect.top - containerRect.top <= containerRect.height / 2) {
          currentActive = id;
        }
      }
    }
    setActiveTab(currentActive);
  };

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setActiveTab(id);
    }
  };

  // Parallax Mouse Movement
  const handleMouseMove = (e) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    setParallax({
      x: x * 8, // Max offset 8px
      y: y * 8
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  // Sub-Vocal Typewriter Simulation Loop
  useEffect(() => {
    if (!thoughtSyncActive) {
      setTypedText('');
      return;
    }

    const phrases = [
      { text: '> [SYNAPSE LINK] USER INTENT: /query_colony_feed', delay: 1000 },
      { text: '> [BCI OS] CONNECTING TO MESON NET...', delay: 800 },
      { text: '> [DOWNLINK] QUANTUM RELAY SECTOR 02 SYNCED [0.4ms]', delay: 1200 },
      { text: '> [SYNAPSE LINK] USER INTENT: /spawn_wall_clock', delay: 1400 },
      { text: '> [BCI OS] SNAP LOG: Clock anchor locked on Living Room Wall', delay: 1000 },
      { text: '> [SYNAPSE LINK] USER INTENT: /project_wristwatch', delay: 1500 },
      { text: '> [BCI OS] HUD LOG: Arm wrist watch vector calibrated', delay: 1200 },
      { text: '> [BCI OS] COGNITIVE BATTERY POWER DRAW: 0.35mg/min', delay: 600 }
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isTyping = true;
    let textBuffer = [''];
    let timer;

    const runTypewriter = () => {
      if (!thoughtSyncActive) return;

      const currentPhrase = phrases[currentPhraseIndex];
      if (isTyping) {
        if (currentCharIndex <= currentPhrase.text.length) {
          setTypedText(() => {
            const lines = [...textBuffer];
            lines[lines.length - 1] = currentPhrase.text.slice(0, currentCharIndex);
            return lines.join('\n');
          });
          currentCharIndex++;
          timer = setTimeout(runTypewriter, 25);
        } else {
          isTyping = false;
          timer = setTimeout(runTypewriter, currentPhrase.delay);
        }
      } else {
        textBuffer.push(currentPhrase.text);
        if (textBuffer.length > 4) {
          textBuffer.shift();
        }
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        currentCharIndex = 0;
        isTyping = true;
        textBuffer.push('');
        timer = setTimeout(runTypewriter, 150);
      }
    };

    timer = setTimeout(runTypewriter, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [thoughtSyncActive]);

  // Telemetry details based on activeTab
  const getBiophysicalStats = () => {
    switch (activeTab) {
      case 'overview':
        return {
          phase: 'PHASE 01 // DISSOLUTION',
          status: 'SWALLOWED // SHELL DEGRADING',
          capsuleIntegrity: '78%',
          bbbCrossing: 'PENDING',
          synapticMapping: '0.0%',
          latency: '-- ms',
          glucose: '0.00 mg/min',
          temp: '37.0°C',
          skinTemp: '36.8°C [NOMINAL]',
          radiation: 'PENDING',
          oxygenSat: '99.1% [DOME_AIR]',
          gravity: '1.00g [TERRESTRIAL]',
          systemState: 'ESTABLISHING'
        };
      case 'payload':
        return {
          phase: 'PHASE 02 // UPTAKE',
          status: 'VESSEL TRANSPORT // CROSSING BBB',
          capsuleIntegrity: '0%',
          bbbCrossing: '89% ACTIVE',
          synapticMapping: '0.0%',
          latency: '98 ms',
          glucose: '0.12 mg/min',
          temp: '37.1°C',
          skinTemp: '36.5°C [STABLE]',
          radiation: 'CALIBRATING',
          oxygenSat: '99.0%',
          gravity: '1.00g',
          systemState: 'UPLINK_SYNCING'
        };
      case 'adaptation':
        return {
          phase: 'PHASE 03 // PHYSO_ADAPTATION',
          status: 'GENETIC INTEGRATION COMPLETED',
          capsuleIntegrity: '0%',
          bbbCrossing: '100% SUCCESS',
          synapticMapping: '0.0%',
          latency: '85 ms',
          glucose: '0.98 mg/min',
          temp: '37.0°C [STABLE]',
          skinTemp: '18.5°C [ADAPTED]',
          radiation: '99.4% REJECTED',
          oxygenSat: '98.6% [HYPOXIA_OK]',
          gravity: '0.38g [STABILIZED]',
          systemState: 'ADAPTED'
        };
      case 'assembly':
        return {
          phase: 'PHASE 04 // CORTICAL MAPPING',
          status: 'ANCHORING IN SYNAPTIC CLEFTS',
          capsuleIntegrity: '0%',
          bbbCrossing: '100% SUCCESS',
          synapticMapping: '64.5%',
          latency: '24 ms',
          glucose: '0.85 mg/min',
          temp: '37.3°C',
          skinTemp: '18.5°C',
          radiation: '99.4% REJECTED',
          oxygenSat: '98.6%',
          gravity: '0.38g',
          systemState: 'INTERFACING'
        };
      case 'eclipse':
        return {
          phase: 'PHASE 05 // RETINA BCI OS',
          status: 'SYSTEM ONLINE // HUD ACTIVE',
          capsuleIntegrity: '0%',
          bbbCrossing: '100% SUCCESS',
          synapticMapping: '100% SUCCESS',
          latency: '0.8 ms',
          glucose: '0.42 mg/min',
          temp: '37.0°C',
          skinTemp: '18.5°C',
          radiation: '99.4% REJECTED',
          oxygenSat: '98.6%',
          gravity: '0.38g',
          systemState: 'ACTIVE'
        };
      case 'superhuman':
        return {
          phase: 'PHASE 06 // SUPERHUMAN PHYSIOLOGY',
          status: 'AUTO-MAINTENANCE ACTIVE',
          capsuleIntegrity: '0%',
          bbbCrossing: '100% SUCCESS',
          synapticMapping: '100% SUCCESS',
          latency: '0.4 ms',
          glucose: '1.45 mg/min',
          temp: '37.0°C [STABLE]',
          skinTemp: '18.5°C [STABLE]',
          radiation: '100% BLOCKED',
          oxygenSat: '99.8% [OPTIMIZED]',
          gravity: '0.38g [STABILIZED]',
          systemState: 'SUPERHUMAN'
        };
      default:
        return {};
    }
  };

  const stats = getBiophysicalStats();

  const tabs = [
    { id: 'overview', label: '1. Ingestion' },
    { id: 'payload', label: '2. Uptake' },
    { id: 'adaptation', label: '3. Adaptation' },
    { id: 'assembly', label: '4. Assembly' },
    { id: 'eclipse', label: '5. Retina OS' },
    { id: 'superhuman', label: '6. Superhuman' }
  ];

  const superhumanScenarios = [
    {
      id: 'overview',
      icon: <BciIcon name="overview" />,
      title: 'Superhuman Synthesis.',
      description: 'Unlock complete biological automation. Maintain physical appearance, prevent aging, and synchronize with medical grids to install vaccines and doses needle-free. Select a scenario below to experience it.'
    },
    {
      id: 'autoRaze',
      icon: <BciIcon name="autoraze" />,
      title: 'Auto-Raze Grooming',
      description: 'Automated follicle-level grooming. Suppresses facial hair growth and maintains a clean-shaven look entirely device-free.'
    },
    {
      id: 'antiAging',
      icon: <BciIcon name="antiaging" />,
      title: 'Telomere Anti-Aging',
      description: 'Real-time DNA telomere repair. Nanobots stabilize genetic replication bounds to arrest and reverse cellular aging.'
    },
    {
      id: 'pharmacy',
      icon: <BciIcon name="pharmacy" />,
      title: 'Shot-Free Pharmacy',
      description: 'Needle-free vaccine & medicine delivery. Direct molecular synthesis via wireless link to your authorized pharmacy.'
    }
  ];

  const scenarios = [
    {
      id: 'overview',
      icon: <BciIcon name="overview" />,
      title: 'HUD-Free. Screen-Free.',
      description: 'The visual field is completely clean. Virtual screens, clocks, maps, and guides anchor to the physical environment only when you need them. Select a scenario below to experience it.'
    },
    {
      id: 'productivity',
      icon: <BciIcon name="productivity" />,
      title: 'Spatial Productivity',
      description: 'Snap functional widgets to physical walls. Keep a ticking clock on the wall and calendars floating above your desk.'
    },
    {
      id: 'entertainment',
      icon: <BciIcon name="entertainment" />,
      title: 'Infinite Entertainment',
      description: 'Project giant glassmorphic media screens in mid-air. Stream video layers and coordinate spatial audio waves.'
    },
    {
      id: 'traverse',
      icon: <BciIcon name="traverse" />,
      title: 'Active Traverse',
      description: 'Navigate the Martian terrain. Project navigation guides on the floor and a biometric wristwatch onto your wrist.'
    },
    {
      id: 'telepathy',
      icon: <BciIcon name="telepathy" />,
      title: 'Telepathic Link',
      description: 'Establish direct neural communication with other citizens. Exchange thoughts and coordinate events seamlessly.'
    },
    {
      id: 'memories',
      icon: <BciIcon name="memories" />,
      title: 'Continuous Memories',
      description: 'Always-on visual/auditory neural recording. Instantly replay memories, share clips with friends, view AI summaries, or auto-transcribe logs into a personal diary.'
    }
  ];

  const renderViewportContent = (tab) => {
    switch (tab) {
      case 'overview':
        return (
          <div className="viewport-relative-wrapper">
            <img 
              src="/assets/images/bci/bci_ingestion.png" 
              alt="BCI Ingestion Background" 
              className="viewport-overlay-bg viewport-bg-opacity-60"
            />
            <img 
              src="/assets/svgs/bci_payload.svg" 
              alt="BCI Ingestion SVG Overlay" 
              className="viewport-svg-overlay-centered"
            />
            <div className="viewport-calibration-footer">
              <span>SYSTEM CALIBRATION</span>
              <span className="text-accent-green">INGESTION STAGE</span>
            </div>
          </div>
        );
      case 'payload':
        return (
          <div className="viewport-relative-wrapper">
            <img 
              src="/assets/images/bci/bci_uptake.png" 
              alt="BCI Uptake Background" 
              className="viewport-overlay-bg viewport-bg-opacity-60"
            />
            <img 
              src="/assets/svgs/bci_overview.svg" 
              alt="BCI Uptake SVG Overlay" 
              className="viewport-svg-overlay-centered"
            />
            <div className="viewport-calibration-footer">
              <span>SYSTEM CALIBRATION</span>
              <span className="text-accent-red">BBB TRANSIT</span>
            </div>
          </div>
        );
      case 'adaptation':
        return (
          <div className="viewport-relative-wrapper">
            <img 
              src="/assets/images/bci/bci_adaptation.png" 
              alt="BCI Adaptation Background" 
              className="viewport-overlay-bg viewport-bg-opacity-55"
            />
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              className="viewport-svg-overlay-stretched"
            >
              <use href="/assets/svgs/bci_adaptation.svg#overlay" />
            </svg>
            <div className="viewport-calibration-footer">
              <span>SYSTEM CALIBRATION</span>
              <span className="text-accent-green">ALIGNMENT SEQUENCE</span>
            </div>
          </div>
        );
      case 'assembly':
        return (
          <div className="viewport-relative-wrapper">
            <img 
              src="/assets/images/bci/bci_assembly.png" 
              alt="BCI Assembly Background" 
              className="viewport-overlay-bg viewport-bg-opacity-60"
            />
            <img 
              src="/assets/svgs/bci_assembly.svg" 
              alt="BCI Assembly SVG Overlay" 
              className="viewport-svg-overlay-centered"
            />
            <div className="viewport-calibration-footer">
              <span>SYSTEM CALIBRATION</span>
              <span className="text-accent-amber">ALIGNMENT SEQUENCE</span>
            </div>
          </div>
        );
      case 'eclipse':
        return (
          <div className="viewport-interactive-container">
            <div 
              className="viewport-parallax-wrapper"
              style={{ 
                transform: `translate3d(${parallax.x * -0.5}px, ${parallax.y * -0.5}px, 0)`
              }}
            >
              <img 
                src={
                  activeScenario === 'productivity' 
                    ? '/assets/images/bci/bci_productivity.png' 
                    : activeScenario === 'entertainment' 
                    ? '/assets/images/bci/bci_entertainment.png' 
                    : activeScenario === 'telepathy'
                    ? '/assets/images/bci/bci_telepathy.png'
                    : activeScenario === 'memories'
                    ? '/assets/images/bci/bci_memories.png'
                    : '/assets/images/bci/bci_traverse.png'
                } 
                alt={`Martian BCI OS - ${activeScenario}`} 
                className="viewport-parallax-bg"
              />
            </div>

            {activeScenario === 'telepathy' && (
              <>
                <div className="telepathy-status-badge">
                  <span className="active-pulse-dot pulse-dot-cyan"></span>
                  <span>TELEPATHIC LINK SECURE // SYNC 99.8%</span>
                </div>

                {(() => {
                  const activeMsgs = [];
                  if (telepathicMsgIndex >= 0) {
                    activeMsgs.push({ ...TELEPATHIC_MESSAGES[telepathicMsgIndex], isCurrent: true, msgIndex: telepathicMsgIndex });
                  }
                  if (!isMobile && telepathicMsgIndex > 0) {
                    activeMsgs.push({ ...TELEPATHIC_MESSAGES[telepathicMsgIndex - 1], isCurrent: false, msgIndex: telepathicMsgIndex - 1 });
                  }

                  return activeMsgs.map((msg, idx) => {
                    const isSelf = msg.sender === 'Ephraim';
                    const isSystem = msg.sender === 'RETINA_OS';
                    const opacity = msg.isCurrent ? 1 : 0.45;
                    const scale = msg.isCurrent ? 'scale(1)' : 'scale(0.92)';
                    
                    return (
                      <div 
                        key={msg.msgIndex} 
                        className="telepathy-bubble-wrapper"
                        style={{ 
                          top: isMobile ? (msg.hasCalendarCard ? '16%' : '35%') : msg.top,
                          ...(isSystem 
                            ? { left: '50%', transform: `translateX(-50%) ${scale}` } 
                            : (isSelf ? { right: msg.right, transform: scale } : { left: msg.left, transform: scale })
                          ),
                          alignItems: isSystem ? 'center' : (isSelf ? 'flex-end' : 'flex-start'),
                          animation: isSystem 
                            ? 'system-snap-scale 0.25s ease-out forwards' 
                            : 'snap-scale 0.25s ease-out forwards',
                          opacity: opacity,
                          zIndex: msg.isCurrent ? 12 : 10,
                          maxWidth: isSystem ? '80%' : '65%'
                        }}
                      >
                        <span 
                          className="telepathy-bubble-sender"
                          style={{ 
                            color: isSystem ? '#00f0ff' : (isSelf ? 'var(--color-accent)' : '#00ff88')
                          }}
                        >
                          {isSystem ? '[SYSTEM // RETINA OS]' : (isSelf ? '[MY_RETINA // SELF]' : `[PEER // ${msg.sender.toUpperCase()}]`)}
                        </span>
                        <div 
                          className={`telepathy-bubble-content ${
                            isSystem 
                              ? 'telepathy-bubble-content--system' 
                              : (isSelf ? 'telepathy-bubble-content--self' : 'telepathy-bubble-content--peer')
                          }`}
                        >
                          <div>{msg.text}</div>

                          {msg.hasCalendarCard && msg.isCurrent && (
                            <div className="telepathy-calendar-card">
                              <div className="telepathy-calendar-card-header">
                                <span className="calendar-emoji">📅</span>
                                <span className="telepathy-calendar-card-title">EVENT: FLAG FOOTBALL PRACTICE</span>
                              </div>
                              <div className="telepathy-calendar-card-body">
                                <div>🕒 <span className="text-cyan">TIME:</span> Saturday, 15:00 - 16:30</div>
                                <div>📍 <span className="text-cyan">ZONE:</span> Ares Dome Lawn (Grid 4)</div>
                                <div>👥 <span className="text-cyan">PEERS:</span> Ephraim Becker, Vance K.</div>
                              </div>
                              <div className="telepathy-calendar-sync-status">
                                <span className="active-pulse-dot pulse-dot-green"></span>
                                <span className="telepathy-calendar-sync-text">✓ EVENT SYNCHRONIZED</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </>
            )}

            {activeScenario === 'memories' && (
              <>
                {/* Share Notification Alert */}
                {memoryShared && (
                  <div className="memories-share-alert">
                    <span className="memories-share-text">
                      ✓ CLIP COPIED & SHARED WITH VANCE K.
                    </span>
                  </div>
                )}

                {/* Bottom playback & sharing control bar */}
                <div className="memories-control-bar">
                  <div className="memories-btn-group">
                    <button 
                      onClick={() => {
                        setMemoryPlaybackActive(true);
                      }}
                      className="hud-btn memories-control-btn" 
                      title="Rewind 10 Seconds"
                    >
                      ⏮ REW
                    </button>
                    <button 
                      onClick={() => setMemoryPlaybackActive(!memoryPlaybackActive)}
                      className={`hud-btn memories-control-btn ${memoryPlaybackActive ? 'memories-control-btn--active' : ''}`}
                    >
                      {memoryPlaybackActive ? '⏸ PAUSE' : '▶ PLAY'}
                    </button>
                    <button 
                      onClick={() => {
                        setMemoryPlaybackActive(true);
                      }}
                      className="hud-btn memories-control-btn" 
                      title="Forward 10 Seconds"
                    >
                      ⏭ FWD
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      setMemoryShared(true);
                      setTimeout(() => setMemoryShared(false), 3500);
                    }}
                    className="hud-btn memories-share-btn" 
                  >
                    📤 SHARE CLIP
                  </button>
                </div>
              </>
            )}
          </div>
        );
      case 'superhuman':
        return (
          <div className="viewport-interactive-container">
            <div 
              className="viewport-parallax-wrapper"
              style={{ 
                transform: `translate3d(${parallax.x * -0.5}px, ${parallax.y * -0.5}px, 0)`
              }}
            >
              <img 
                src={
                  activeSuperhumanScenario === 'autoRaze' 
                    ? '/assets/images/bci/bci_autoraze.png' 
                    : activeSuperhumanScenario === 'antiAging' 
                    ? '/assets/images/bci/bci_antiaging.png' 
                    : activeSuperhumanScenario === 'pharmacy'
                    ? '/assets/images/bci/bci_pharmacy.png'
                    : '/assets/images/bci/bci_adaptation.png'
                } 
                alt={`Martian BCI OS - ${activeSuperhumanScenario}`} 
                className="viewport-parallax-bg"
              />
            </div>

            {/* Tech-styled SVG Overlay Panel */}
            <div className="viewport-svg-overlay-stretched">
              {activeSuperhumanScenario === 'autoRaze' && (
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="viewport-svg-overlay-stretched">
                  <use href="/assets/svgs/bci_superhuman_autoraze.svg#overlay" />
                </svg>
              )}

              {activeSuperhumanScenario === 'antiAging' && (
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="viewport-svg-overlay-stretched">
                  <use href="/assets/svgs/bci_superhuman_antiaging.svg#overlay" />
                </svg>
              )}

              {activeSuperhumanScenario === 'pharmacy' && (
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="viewport-svg-overlay-stretched">
                  <use href="/assets/svgs/bci_superhuman_pharmacy.svg#overlay" />
                </svg>
              )}
            </div>

            <div className="viewport-calibration-footer">
              <span>SYSTEM OS ADVANCED</span>
              <span className="text-accent-green">SUPERHUMAN BIO-SYNTHESIS</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="citizen-card-shell nanobot-pill-shell">


      {/* Immersive Sweeper Overlay */}
      <div className="walking-motion-overlay nanobot-pill-walking-overlay"></div>

      <div 
        className={`walking-content-container ${transitState} nanobot-pill-content-container pill-details-container`} 
      >
        
        {/* Back navigation & Header Area */}
        <div className="pill-details-header">
          <Link 
            href="/research" 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.sessionStorage.setItem('walk-direction', 'left');
              }
            }}
            className="hud-btn pill-details-back-btn" 
          >
            [ ↩ BACK TO LAB DECK ]
          </Link>
          <span className="pill-details-logo">
            ARES LABS // RETINA BCI OS
          </span>
        </div>

        {/* Tab navigation - Quick Scroll Jumps */}
        <div className="bubbly-panel pill-details-tabs-panel">
          <div className="pill-details-tabs-list">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`hud-btn pill-details-tab-btn ${activeTab === tab.id ? 'active-tab-override' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="research-grid-deck pill-details-grid">
          
          {/* LEFT: Scrollable story container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="custom-scroll pill-details-story-column"
          >
            {/* Story Card 1 */}
            <div id="overview" className="bubbly-panel touch-slide-card pill-details-story-card">
              <div className="card-text-slide">
                <span className="net-label pill-card-label">
                  STAGE 01 // SIMPLE INGESTION
                </span>
                <h2 className="apple-headline pill-card-title">
                  Swallow. Sync. Enjoy.
                </h2>
                <p className="apple-sub pill-card-sub">
                  It starts with a simple vitamin-sized capsule. The BCI Pill replaces the weight of screens, keyboards, and battery packs with a direct connection inside your mind.
                </p>
                <p className="pill-card-text">
                  Swallowed with a sip of water, the organic cellulose shell dissolves naturally in your stomach in under 4 minutes. As it dissolves, it releases 12.4 million microscopic helper nodes safely into your system, with zero side effects.
                </p>
                
                <div className="pill-card-metadata">
                  <div>⏱️ TIME: ~4 Min</div>
                  <div>🧪 SHELL: Plant Cellulose</div>
                  <div>🩹 ENTRY: 100% Non-Invasive</div>
                </div>
              </div>

              <div className="card-visual-slide">
                <div className="viewport-mobile-frame">
                  {renderViewportContent('overview')}
                </div>
              </div>
            </div>

            {/* Story Card 2 */}
            <div id="payload" className="bubbly-panel touch-slide-card pill-details-story-card">
              <div className="card-text-slide">
                <span className="net-label pill-card-label">
                  STAGE 02 // NATURAL TRAVEL
                </span>
                <h2 className="apple-headline pill-card-title">
                  Safe Transit.
                </h2>
                <p className="apple-sub pill-card-sub">
                  Once swallowed, the nodes use your natural circulation to travel. They are chemically coded to find and pass through the brain's natural filters.
                </p>
                <p className="pill-card-text">
                  Over a 20-minute journey, they glide smoothly into place inside your visual center. No surgeries, no wires, and no discomfort—just a natural pathway to a new way of seeing.
                </p>
                
                <div className="pill-card-metadata">
                  <div>⏱️ TRAVEL: ~20 Min</div>
                  <div>📍 TARGET: Visual Center</div>
                  <div>🛡️ SAFETY: Clinically Approved</div>
                </div>
              </div>

              <div className="card-visual-slide">
                <div className="viewport-mobile-frame">
                  {renderViewportContent('payload')}
                </div>
              </div>
            </div>

            {/* Story Card 3 */}
            <div id="adaptation" className="bubbly-panel touch-slide-card pill-details-story-card">
              <div className="card-text-slide">
                <span className="net-label pill-card-label">
                  STAGE 03 // PHYSIOLOGICAL ADAPTATION
                </span>
                <h2 className="apple-headline pill-card-title">
                  Mars. Just like Earth.
                </h2>
                <p className="apple-sub pill-card-sub">
                  Powered by a living Genetic AI compiled directly from your DNA, the pill silently adapts your biological markers so you can step onto the Martian surface suitless and helmetless.
                </p>
                <p className="pill-card-text">
                  - **Metabolic Warmth**: Automatically regulates core heat so freezing -55°C Martian winds feel like a mild summer breeze.
                  <br />- **DNA-Level Shielding**: Activates cellular melanin/protein coatings to deflect solar radiation.
                  <br />- **Respiration Tuning**: Optimizes hemoglobin oxygen binding, allowing comfortable respiration in the thin atmosphere.
                  <br />- **0.38g Gravity Sync**: Dynamically maintains muscle tone and bone density markers.
                </p>
                
                <div className="pill-card-metadata-wrap">
                  <div>🧬 GENETIC AI: ACTIVE</div>
                  <div>🌡️ SKIN TEMP: 18.5°C</div>
                  <div>🛡️ RAD REJECT: 99.4%</div>
                  <div>🫁 O2 SAT: 98.6%</div>
                </div>
              </div>

              <div className="card-visual-slide">
                <div className="viewport-mobile-frame">
                  {renderViewportContent('adaptation')}
                </div>
              </div>
            </div>

            {/* Story Card 4 */}
            <div id="assembly" className="bubbly-panel touch-slide-card pill-details-story-card">
              <div className="card-text-slide">
                <span className="net-label pill-card-label">
                  STAGE 04 // CORTICAL MAPPING
                </span>
                <h2 className="apple-headline pill-card-title">
                  Connecting to Your Thoughts.
                </h2>
                <p className="apple-sub pill-card-sub">
                  The nodes settle gently around your synapses, forming an interface that respects your neural privacy. It maps your intent without changing who you are.
                </p>
                <p className="pill-card-text">
                  Powered entirely by body glucose, the Genetic AI integrates with your visual cortex in under 45 minutes, ready to translate subconscious intent into natural spatial anchors.
                </p>
                
                <div className="pill-card-metadata">
                  <div>⏱️ SETUP: ~45 Min</div>
                  <div>🔋 FUEL: Glucose-Powered</div>
                  <div>🧠 SYNAPSE LINK: 64.5%</div>
                </div>
              </div>

              <div className="card-visual-slide">
                <div className="viewport-mobile-frame">
                  {renderViewportContent('assembly')}
                </div>
              </div>
            </div>

            {/* Story Card 5 */}
            <div id="eclipse" className="bubbly-panel stage5-card pill-details-story-card-compact">
              <div className="stage5-slider">
                <div className="card-text-slide">
                  <span className="net-label pill-card-label-block">
                    STAGE 05 // RETINA BCI OS
                  </span>
                  {(() => {
                    const currentScenario = scenarios.find(s => s.id === activeScenario) || scenarios[0];
                    return (
                      <>
                        <h2 className="apple-headline pill-card-title-fixed-height">
                          {currentScenario.title}
                        </h2>
                        <p className="apple-sub pill-card-sub-fixed-height">
                          {currentScenario.description}
                        </p>
                      </>
                    );
                  })()}
                </div>

                <div className="card-visual-slide">
                  <div className="viewport-mobile-frame">
                    {renderViewportContent('eclipse')}
                  </div>
                </div>
              </div>

              {/* Bottom scenario dock bar */}
              <div className="scenario-bottom-dock">
                <div className="hide-scrollbar scenarios-grid-deck">
                  {scenarios.map(sc => (
                    <button 
                      key={sc.id} 
                      onClick={() => setActiveScenario(sc.id)}
                      className={`scenario-pill-btn ${activeScenario === sc.id ? 'active-btn' : ''}`}
                    >
                      <span className="scenario-pill-icon-wrapper">{sc.icon}</span>
                      <span className="scenario-pill-title">{sc.id === 'overview' ? 'Overview' : sc.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Story Card 6 */}
            <div id="superhuman" className="bubbly-panel stage5-card pill-details-story-card-compact">
              <div className="stage5-slider">
                <div className="card-text-slide">
                  <span className="net-label pill-card-label-block">
                    STAGE 06 // SUPERHUMAN PHYSIOLOGY
                  </span>
                  {(() => {
                    const currentSuperhumanScenario = superhumanScenarios.find(s => s.id === activeSuperhumanScenario) || superhumanScenarios[0];
                    return (
                      <>
                        <h2 className="apple-headline pill-card-title-fixed-height">
                          {currentSuperhumanScenario.title}
                        </h2>
                        <p className="apple-sub pill-card-sub-fixed-height">
                          {currentSuperhumanScenario.description}
                        </p>
                      </>
                    );
                  })()}
                </div>

                <div className="card-visual-slide">
                  <div className="viewport-mobile-frame">
                    {renderViewportContent('superhuman')}
                  </div>
                </div>
              </div>

              {/* Bottom scenario dock bar */}
              <div className="scenario-bottom-dock">
                <div className="hide-scrollbar scenarios-grid-deck">
                  {superhumanScenarios.map(sc => (
                    <button 
                      key={sc.id} 
                      onClick={() => setActiveSuperhumanScenario(sc.id)}
                      className={`scenario-pill-btn ${activeSuperhumanScenario === sc.id ? 'active-btn' : ''}`}
                    >
                      <span className="scenario-pill-icon-wrapper">{sc.icon}</span>
                      <span className="scenario-pill-title">{sc.id === 'overview' ? 'Overview' : sc.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Telemetry Dashboard & Layered Composites */}
          <div ref={visualContainerRef} className="desktop-visual-column">
            
            {/* Viewport Box */}
            <div className="bubbly-panel viewport-outer-panel">
              
              <span className="net-label pill-card-label-block">
                // LAYERED VISUAL COMPOSITE
              </span>

              {/* Viewport Frame */}
              <div 
                ref={viewportRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="viewport-frame-box"
              >
                {renderViewportContent(activeTab)}
              </div>

              {/* Status Diagnostic biophysics specs */}
              <div className="biometrics-table-desktop viewport-diagnostics-table">
                <div className="viewport-diagnostics-row">
                  <span className="viewport-diagnostics-label">GENETIC AI CORE STATE:</span>
                  <span className={`font-bold ${activeTab === 'eclipse' || activeTab === 'superhuman' ? 'diagnostic-active-status' : 'diagnostic-inactive-status'}`}>
                    {activeTab === 'eclipse' || activeTab === 'superhuman' ? 'ACTIVE (100% DNA MATCH)' : stats.systemState}
                  </span>
                </div>
                <div className="viewport-diagnostics-row">
                  <span className="viewport-diagnostics-label">BIOLOGICAL SYNC INDEX:</span>
                  <span className="text-pure-white">{activeTab === 'eclipse' || activeTab === 'superhuman' ? '99.8%' : stats.synapticMapping}</span>
                </div>
                <div className="viewport-diagnostics-row">
                  <span className="viewport-diagnostics-label">METABOLIC HEAT OVERRIDE:</span>
                  <span className="text-pure-white">{activeTab === 'overview' || activeTab === 'payload' ? 'PENDING' : '-55°C NOMINAL (18.5°C SKIN)'}</span>
                </div>
                <div className="viewport-diagnostics-row">
                  <span className="viewport-diagnostics-label">RADIATION PROTECTION:</span>
                  <span className="text-accent-green">{stats.radiation}</span>
                </div>
                <div className="viewport-diagnostics-row">
                  <span className="viewport-diagnostics-label">HEART RATE / BLOOD O₂ SAT:</span>
                  <span className="text-accent-green">{activeTab === 'overview' ? '70 BPM / 99.1%' : activeTab === 'payload' ? '72 BPM / 99.0%' : `74 BPM / ${stats.oxygenSat}`}</span>
                </div>
                <div className="viewport-diagnostics-row">
                  <span className="viewport-diagnostics-label">GRAVITY COMPENSATION:</span>
                  <span className="text-accent-green">{activeTab === 'overview' || activeTab === 'payload' ? '1.00g (TERRESTRIAL)' : '0.38g (STABILIZED)'}</span>
                </div>
                <div className="viewport-diagnostics-row">
                  <span className="viewport-diagnostics-label">NEURAL SYSTEM LATENCY:</span>
                  <span className="text-accent-green">{stats.latency}</span>
                </div>
              </div>

            </div>

            {/* Mobile Status Diagnostic summary bar */}
            <div className="biometrics-summary-mobile bubbly-panel">
              <div className="biometrics-summary-row">
                <span>🧬 SYNC: <span className="text-accent-green">{activeTab === 'eclipse' || activeTab === 'superhuman' ? '99.8%' : stats.synapticMapping}</span></span>
                <span>🌡️ HEAT: <span className="text-pure-white">{activeTab === 'overview' || activeTab === 'payload' ? 'PENDING' : '18.5°C'}</span></span>
                <span>🛰️ GRAV: <span className="text-accent-green">{activeTab === 'overview' || activeTab === 'payload' ? '1.00g' : '0.38g'}</span></span>
                <span>📶 LAT: <span className="text-accent-green">{stats.latency}</span></span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
