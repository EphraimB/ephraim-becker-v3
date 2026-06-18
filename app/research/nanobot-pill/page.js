'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
  const [activeScenario, setActiveScenario] = useState('productivity');
  const [activeSuperhumanScenario, setActiveSuperhumanScenario] = useState('autoRaze');
  const [isPlayingMedia, setIsPlayingMedia] = useState(true);
  const [timeString, setTimeString] = useState('');
  const [telepathicMsgIndex, setTelepathicMsgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
      id: 'autoRaze',
      icon: '🪒',
      title: 'Auto-Raze Grooming',
      description: 'Automated follicle-level grooming. Suppresses facial hair growth and maintains a clean-shaven look entirely device-free.'
    },
    {
      id: 'antiAging',
      icon: '🧬',
      title: 'Telomere Anti-Aging',
      description: 'Real-time DNA telomere repair. Nanobots stabilize genetic replication bounds to arrest and reverse cellular aging.'
    },
    {
      id: 'pharmacy',
      icon: '💊',
      title: 'Shot-Free Pharmacy',
      description: 'Needle-free vaccine & medicine delivery. Direct molecular synthesis via wireless link to your authorized pharmacy.'
    }
  ];

  const scenarios = [
    {
      id: 'productivity',
      icon: '💼',
      title: 'Spatial Productivity',
      description: 'Snap functional widgets to physical walls. Keep a ticking clock on the wall and calendars floating above your desk.'
    },
    {
      id: 'entertainment',
      icon: '🍿',
      title: 'Infinite Entertainment',
      description: 'Project giant glassmorphic media screens in mid-air. Stream video layers and coordinate spatial audio waves.'
    },
    {
      id: 'traverse',
      icon: '🏃',
      title: 'Active Traverse',
      description: 'Navigate the Martian terrain. Project navigation guides on the floor and a biometric wristwatch onto your wrist.'
    },
    {
      id: 'telepathy',
      icon: '🧠',
      title: 'Telepathic Link',
      description: 'Establish direct neural communication with other citizens. Exchange thoughts and coordinate events seamlessly.'
    }
  ];

  const renderViewportContent = (tab) => {
    switch (tab) {
      case 'overview':
        return (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img 
              src="/assets/images/bci/bci_ingestion.png" 
              alt="BCI Ingestion Background" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
            />
            <img 
              src="/assets/svgs/bci_payload.svg" 
              alt="BCI Ingestion SVG Overlay" 
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', objectFit: 'contain', zIndex: 2 }}
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.55rem', color: 'var(--text-secondary)', zIndex: 3 }}>
              <span>SYSTEM CALIBRATION</span>
              <span style={{ color: '#00ff88' }}>INGESTION STAGE</span>
            </div>
          </div>
        );
      case 'payload':
        return (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img 
              src="/assets/images/bci/bci_uptake.png" 
              alt="BCI Uptake Background" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
            />
            <img 
              src="/assets/svgs/bci_overview.svg" 
              alt="BCI Uptake SVG Overlay" 
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', objectFit: 'contain', zIndex: 2 }}
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.55rem', color: 'var(--text-secondary)', zIndex: 3 }}>
              <span>SYSTEM CALIBRATION</span>
              <span style={{ color: '#ff4400' }}>BBB TRANSIT</span>
            </div>
          </div>
        );
      case 'adaptation':
        return (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img 
              src="/assets/images/bci/bci_adaptation.png" 
              alt="BCI Adaptation Background" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
            />
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}
            >
              <rect x="8" y="8" width="84" height="84" fill="none" stroke="var(--color-accent)" strokeWidth="0.4" strokeDasharray="1,2" opacity="0.6" />
              <line x1="8" y1="50" x2="92" y2="50" stroke="#ff4400" strokeWidth="0.5" strokeDasharray="1,1" opacity="0.8" />
              <path d="M 12 12 L 20 12 M 12 12 L 12 20" fill="none" stroke="#ffb300" strokeWidth="0.6"/>
              <path d="M 88 12 L 80 12 M 88 12 L 88 20" fill="none" stroke="#ffb300" strokeWidth="0.6"/>
              <path d="M 12 88 L 20 88 M 12 88 L 12 80" fill="none" stroke="#ffb300" strokeWidth="0.6"/>
              <path d="M 88 88 L 80 88 M 88 88 L 88 80" fill="none" stroke="#ffb300" strokeWidth="0.6"/>
              
              <text x="14" y="20" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● METABOLIC HEAT ACTIVE [-55C NOMINAL]</text>
              <text x="14" y="25" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● RADIATION DENSE DEFENSE: 99.4%</text>
              <text x="14" y="30" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● O2 RESPIRED SATURATION: 98.6%</text>
              <text x="14" y="35" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● MUSCLE-BONE GRAVITY GAIN: 0.38G</text>
            </svg>
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.55rem', color: 'var(--text-secondary)', zIndex: 3 }}>
              <span>SYSTEM CALIBRATION</span>
              <span style={{ color: '#00ff88' }}>ALIGNMENT SEQUENCE</span>
            </div>
          </div>
        );
      case 'assembly':
        return (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img 
              src="/assets/images/bci/bci_assembly.png" 
              alt="BCI Assembly Background" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
            />
            <img 
              src="/assets/svgs/bci_assembly.svg" 
              alt="BCI Assembly SVG Overlay" 
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', objectFit: 'contain', zIndex: 2 }}
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.55rem', color: 'var(--text-secondary)', zIndex: 3 }}>
              <span>SYSTEM CALIBRATION</span>
              <span style={{ color: '#ffb300' }}>ALIGNMENT SEQUENCE</span>
            </div>
          </div>
        );
      case 'eclipse':
        return (
          <div 
            style={{ 
              width: '100%', 
              height: '100%', 
              position: 'relative', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '12px'
            }}
          >
            <div 
              style={{ 
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                right: '-15px',
                bottom: '-15px',
                zIndex: 1,
                background: 'radial-gradient(circle at 50% 50%, rgba(4, 6, 12, 0.4) 0%, rgba(4, 6, 12, 1) 90%)',
                transform: `translate3d(${parallax.x * -0.5}px, ${parallax.y * -0.5}px, 0)`,
                transition: 'transform 0.1s ease-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
                    : '/assets/images/bci/bci_traverse.png'
                } 
                alt={`Martian BCI OS - ${activeScenario}`} 
                style={{ width: '110%', height: '110%', objectFit: 'cover', opacity: 0.85 }}
              />
            </div>

            {activeScenario === 'telepathy' && (
              <>
                <div 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(2, 6, 16, 0.6)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    zIndex: 5,
                    fontFamily: 'monospace, var(--font-tech)',
                    fontSize: '0.52rem',
                    color: '#00f0ff',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)'
                  }}
                >
                  <span className="active-pulse-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 6px #00f0ff' }}></span>
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
                        style={{ 
                          position: 'absolute',
                          top: isMobile ? (msg.hasCalendarCard ? '16%' : '35%') : msg.top,
                          ...(isSystem 
                            ? { left: '50%', transform: `translateX(-50%) ${scale}` } 
                            : (isSelf ? { right: msg.right, transform: scale } : { left: msg.left, transform: scale })
                          ),
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: isSystem ? 'center' : (isSelf ? 'flex-end' : 'flex-start'),
                          animation: isSystem 
                            ? 'system-snap-scale 0.25s ease-out forwards' 
                            : 'snap-scale 0.25s ease-out forwards',
                          opacity: opacity,
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                          zIndex: msg.isCurrent ? 12 : 10,
                          maxWidth: isSystem ? '80%' : '65%'
                        }}
                      >
                        <span 
                          style={{ 
                            fontSize: '0.45rem', 
                            color: isSystem ? '#00f0ff' : (isSelf ? 'var(--color-accent)' : '#00ff88'), 
                            fontFamily: 'monospace', 
                            marginBottom: '2px', 
                            textTransform: 'uppercase',
                            textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                          }}
                        >
                          {isSystem ? '[SYSTEM // RETINA OS]' : (isSelf ? '[MY_RETINA // SELF]' : `[PEER // ${msg.sender.toUpperCase()}]`)}
                        </span>
                        <div 
                          style={{
                            background: isSystem 
                              ? 'rgba(0, 240, 255, 0.14)' 
                              : (isSelf ? 'rgba(255, 87, 34, 0.24)' : 'rgba(0, 255, 136, 0.18)'),
                            border: `1px solid ${isSystem 
                              ? 'rgba(0, 240, 255, 0.45)' 
                              : (isSelf ? 'rgba(255, 87, 34, 0.45)' : 'rgba(0, 255, 136, 0.4)')}`,
                            borderRadius: '12px',
                            padding: '8px 12px',
                            fontSize: '0.62rem',
                            fontFamily: 'monospace',
                            color: '#ffffff',
                            lineHeight: '1.35',
                            textAlign: isSystem ? 'center' : 'left',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(6px)',
                            WebkitBackdropFilter: 'blur(6px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          <div>{msg.text}</div>

                          {msg.hasCalendarCard && msg.isCurrent && (
                            <div 
                              style={{
                                marginTop: '4px',
                                background: 'rgba(0, 0, 0, 0.4)',
                                border: '1px solid rgba(0, 240, 255, 0.25)',
                                borderRadius: '8px',
                                padding: '8px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                textAlign: 'left',
                                width: '100%',
                                boxSizing: 'border-box'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', borderBottom: '1px solid rgba(0, 240, 255, 0.15)', paddingBottom: '3px', marginBottom: '2px' }}>
                                <span style={{ fontSize: '0.65rem' }}>📅</span>
                                <span style={{ fontSize: '0.52rem', color: '#ffffff', fontWeight: 'bold' }}>EVENT: FLAG FOOTBALL PRACTICE</span>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.52rem', color: 'rgba(255,255,255,0.8)' }}>
                                <div>🕒 <span style={{ color: '#00f0ff' }}>TIME:</span> Saturday, 15:00 - 16:30</div>
                                <div>📍 <span style={{ color: '#00f0ff' }}>ZONE:</span> Ares Dome Lawn (Grid 4)</div>
                                <div>👥 <span style={{ color: '#00f0ff' }}>PEERS:</span> Ephraim Becker, Vance K.</div>
                              </div>
                              <div 
                                style={{ 
                                  marginTop: '4px', 
                                  background: 'rgba(0, 255, 136, 0.08)', 
                                  border: '1px solid rgba(0, 255, 136, 0.3)', 
                                  borderRadius: '3px', 
                                  padding: '2px 4px', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  gap: '4px' 
                                }}
                              >
                                <span className="active-pulse-dot" style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 4px #00ff88' }}></span>
                                <span style={{ fontSize: '0.45rem', color: '#00ff88', fontWeight: 'bold' }}>✓ EVENT SYNCHRONIZED</span>
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
          </div>
        );
      case 'superhuman':
        return (
          <div 
            style={{ 
              width: '100%', 
              height: '100%', 
              position: 'relative', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '12px'
            }}
          >
            <div 
              style={{ 
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                right: '-15px',
                bottom: '-15px',
                zIndex: 1,
                background: 'radial-gradient(circle at 50% 50%, rgba(4, 6, 12, 0.4) 0%, rgba(4, 6, 12, 1) 90%)',
                transform: `translate3d(${parallax.x * -0.5}px, ${parallax.y * -0.5}px, 0)`,
                transition: 'transform 0.1s ease-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img 
                src={
                  activeSuperhumanScenario === 'autoRaze' 
                    ? '/assets/images/bci/bci_autoraze.png' 
                    : activeSuperhumanScenario === 'antiAging' 
                    ? '/assets/images/bci/bci_antiaging.png' 
                    : '/assets/images/bci/bci_pharmacy.png'
                } 
                alt={`Martian BCI OS - ${activeSuperhumanScenario}`} 
                style={{ width: '110%', height: '110%', objectFit: 'cover', opacity: 0.85 }}
              />
            </div>

            {/* Tech-styled SVG Overlay Panel */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
              {activeSuperhumanScenario === 'autoRaze' && (
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {/* Scanning Grid / Face wireframe overlay lines */}
                  <path d="M 10 20 L 90 20 M 10 80 L 90 80" stroke="rgba(255, 179, 0, 0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
                  <path d="M 20 10 L 20 90 M 80 10 L 80 90" stroke="rgba(255, 179, 0, 0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
                  {/* Animated scanning bar */}
                  <line x1="5" y1="10" x2="95" y2="10" stroke="#ffb300" strokeWidth="0.8" opacity="0.8">
                    <animate attributeName="y1" values="15;85;15" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="15;85;15" dur="4s" repeatCount="indefinite" />
                  </line>
                  {/* Targeted follicles dots */}
                  <circle cx="35" cy="65" r="1.5" fill="#ffb300" opacity="0.8">
                    <animate attributeName="r" values="0.5;2;0.5" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="72" r="1.2" fill="#ffb300" opacity="0.8">
                    <animate attributeName="r" values="1.2;0.2;1.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="65" cy="65" r="1.5" fill="#ffb300" opacity="0.8">
                    <animate attributeName="r" values="0.5;2;0.5" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <text x="12" y="15" fill="#ffb300" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● FOLLICLE INHIBITION: ACTIVE [100% CLEAN]</text>
                  <text x="12" y="88" fill="rgba(255,179,0,0.8)" fontSize="2.2" fontFamily="monospace">SHAVE PROFILE: ULTRA-GLIDE SMOOTH</text>
                </svg>
              )}

              {activeSuperhumanScenario === 'antiAging' && (
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {/* Glowing repair nodes and indicators */}
                  <rect x="8" y="8" width="84" height="84" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.4" />
                  {/* DNA helix schematic representation */}
                  <path d="M 20 50 Q 35 25, 50 50 T 80 50" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="1,1" opacity="0.7">
                    <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 20 50 Q 35 75, 50 50 T 80 50" fill="none" stroke="rgba(0, 255, 136, 0.7)" strokeWidth="0.8" strokeDasharray="1,1" opacity="0.7">
                    <animate attributeName="stroke-dashoffset" values="20;0" dur="2s" repeatCount="indefinite" />
                  </path>
                  {/* Repair nodes */}
                  <circle cx="35" cy="37" r="1" fill="#ffffff">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="65" cy="63" r="1" fill="#ffffff">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <text x="12" y="16" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● TELOMERE INTEGRITY: 99.99% [LOCKED]</text>
                  <text x="12" y="22" fill="#00f0ff" fontSize="2.4" fontFamily="monospace">CELLULAR DECAY RATE: 0.0000% / YR</text>
                  <text x="12" y="88" fill="rgba(255,255,255,0.7)" fontSize="2.2" fontFamily="monospace">GENETIC REVERSAL SEQUENCE: COMPLETE</text>
                </svg>
              )}

              {activeSuperhumanScenario === 'pharmacy' && (
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {/* Bloodstream or grid flow with docking nodes */}
                  <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.5" strokeDasharray="1,3" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="0.5" strokeDasharray="2,4" />
                  {/* Docking animation elements */}
                  <g transform="translate(50, 50)">
                    <circle cx="0" cy="0" r="3" fill="#00ff88" opacity="0.9">
                      <animate attributeName="r" values="1;4;1" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    {/* Floating dose packets */}
                    <line x1="-35" y1="-35" x2="-5" y2="-5" stroke="#00ff88" strokeWidth="0.4" strokeDasharray="1,1" opacity="0.6" />
                    <circle cx="-35" cy="-35" r="1.5" fill="#00ff88">
                      <animate attributeName="transform" type="translate" values="0,0; 30,30" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="35" cy="35" r="1.5" fill="#00ff88">
                      <animate attributeName="transform" type="translate" values="0,0; -30,-30" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  <text x="12" y="16" fill="#00ff88" fontSize="2.8" fontFamily="monospace" fontWeight="bold">● PHARMACY LINK: SECURE [MARS_EAST_DOME]</text>
                  <text x="12" y="22" fill="#ffffff" fontSize="2.4" fontFamily="monospace">IMMUNIZATION RECEPTOR SYNC: 100%</text>
                  <text x="12" y="88" fill="#00ff88" fontSize="2.2" fontFamily="monospace">✓ NO-SHOT VAC-DOCK: ACTIVE [INFLUENZA-M56]</text>
                </svg>
              )}
            </div>

            <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.55rem', color: 'var(--text-secondary)', zIndex: 3 }}>
              <span>SYSTEM OS ADVANCED</span>
              <span style={{ color: '#00ff88' }}>SUPERHUMAN BIO-SYNTHESIS</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="citizen-card-shell nanobot-pill-shell">
      {/* Local keyframes and style overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline-sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes rotate-reticle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes alert-flash {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        @keyframes snap-scale {
          0% { transform: scale(0.7); opacity: 0; filter: blur(4px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes system-snap-scale {
          0% { transform: translateX(-50%) scale(0.7); opacity: 0; filter: blur(4px); }
          100% { transform: translateX(-50%) scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes wave-pulse {
          0%, 100% { height: 10px; }
          50% { height: 35px; }
        }
        .gaze-ring-overlay {
          pointer-events: none;
          position: absolute;
          border: 1.5px solid var(--color-accent);
          border-radius: 50%;
          animation: pulse-ring 1.8s infinite linear;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .apple-headline {
          font-family: var(--font-sans);
          font-weight: 700;
          letter-spacing: -0.8px;
          line-height: 1.15;
          background: linear-gradient(180deg, #ffffff 30%, #888888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .apple-sub {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-weight: 400;
        }
        @media (max-width: 900px) {
          html, body {
            overflow: auto !important;
            height: auto !important;
          }
          .nanobot-pill-content-container {
            padding-top: 10px !important;
            height: auto !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .research-grid-deck {
            display: flex !important;
            flex-direction: column !important;
            height: auto !important;
            overflow: visible !important;
            gap: 16px !important;
          }
          .research-grid-deck > div:nth-child(1) {
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            padding-bottom: 16px !important;
          }
          .desktop-visual-column {
            display: none !important;
          }
          .touch-slide-card::-webkit-scrollbar {
            display: none !important;
          }
          .touch-slide-card {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            width: 100% !important;
            gap: 0 !important;
            padding: 14px 0 !important;
            box-sizing: border-box !important;
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
          .card-text-slide {
            width: 85% !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
            padding-left: 26px !important;
            padding-right: 14px !important;
            box-sizing: border-box !important;
          }
          .card-visual-slide {
            width: 85% !important;
            flex-shrink: 0 !important;
            scroll-snap-align: end !important;
            padding-left: 14px !important;
            padding-right: 26px !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            align-self: center !important;
          }
          .viewport-mobile-frame {
            width: 100% !important;
            height: 260px !important;
            background: rgba(2, 3, 6, 0.98) !important;
            border: 1px solid rgba(0, 240, 255, 0.2) !important;
            border-radius: 12px !important;
            overflow: hidden !important;
            position: relative !important;
          }
          .stage5-card {
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            padding: 0 !important;
          }
          .stage5-slider {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            width: 100% !important;
            gap: 0 !important;
            padding: 14px 0 0 0 !important;
            box-sizing: border-box !important;
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
          .stage5-slider::-webkit-scrollbar {
            display: none !important;
          }
          .scenario-bottom-dock {
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 10px 26px 18px 26px !important;
          }
          .scenarios-grid-deck {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
            width: 100% !important;
            overflow-x: visible !important;
            padding-bottom: 0 !important;
          }
          .scenario-btn-card {
            flex: none !important;
            display: flex !important;
            flex-direction: row !important;
            gap: 8px !important;
            align-items: center !important;
            justify-content: flex-start !important;
            text-align: left !important;
            padding: 8px 12px !important;
            scroll-snap-align: none !important;
          }
          .scenario-icon {
            margin-bottom: 0 !important;
            font-size: 1.1rem !important;
          }
          .scenario-title {
            font-size: 0.65rem !important;
            margin: 0 !important;
          }
          .scenario-desc {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .card-visual-slide {
            display: none !important;
          }
          .stage5-slider {
            width: 100%;
          }
          .scenario-bottom-dock {
            width: 100%;
            margin-top: 15px;
          }
          .scenarios-grid-deck {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            width: 100% !important;
          }
          .scenario-btn-card {
            flex: none !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            text-align: left !important;
            scroll-snap-align: none !important;
          }
        }
      `}} />

      {/* Immersive Sweeper Overlay */}
      <div className="walking-motion-overlay nanobot-pill-walking-overlay"></div>

      <div 
        className={`walking-content-container ${transitState} nanobot-pill-content-container`} 
        style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '15px', maxWidth: '1080px', margin: '0 auto', minHeight: 0, height: '100%' }}
      >
        
        {/* Back navigation & Header Area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <Link 
            href="/research" 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.sessionStorage.setItem('walk-direction', 'left');
              }
            }}
            className="hud-btn" 
            style={{ width: 'fit-content' }}
          >
            [ ↩ BACK TO LAB DECK ]
          </Link>
          <span style={{ fontSize: '0.62rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 'bold', letterSpacing: '1px' }}>
            ARES LABS // RETINA BCI OS
          </span>
        </div>

        {/* Tab navigation - Quick Scroll Jumps */}
        <div className="bubbly-panel" style={{ padding: '8px 12px', background: 'rgba(6, 9, 20, 0.45)', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`hud-btn ${activeTab === tab.id ? 'active-tab-override' : ''}`}
                style={{
                  flex: 1,
                  fontSize: '0.68rem',
                  borderColor: activeTab === tab.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.08)',
                  background: activeTab === tab.id ? 'rgba(var(--color-accent-rgb), 0.1)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--text-secondary)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '20px', flex: 1, minHeight: 0, height: '100%' }} className="research-grid-deck">
          
          {/* LEFT: Scrollable story container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="custom-scroll"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px', 
              height: '100%', 
              overflowY: 'auto' 
            }}
          >
            {/* Story Card 1 */}
            <div id="overview" className="bubbly-panel touch-slide-card" style={{ minHeight: '330px', padding: '22px 26px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <div className="card-text-slide">
                <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px' }}>
                  STAGE 01 // SIMPLE INGESTION
                </span>
                <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                  Swallow. Sync. Enjoy.
                </h2>
                <p className="apple-sub" style={{ marginBottom: '15px' }}>
                  It starts with a simple vitamin-sized capsule. The BCI Pill replaces the weight of screens, keyboards, and battery packs with a direct connection inside your mind.
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Swallowed with a sip of water, the organic cellulose shell dissolves naturally in your stomach in under 4 minutes. As it dissolves, it releases 12.4 million microscopic helper nodes safely into your system, with zero side effects.
                </p>
                
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
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
            <div id="payload" className="bubbly-panel touch-slide-card" style={{ minHeight: '330px', padding: '22px 26px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <div className="card-text-slide">
                <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px' }}>
                  STAGE 02 // NATURAL TRAVEL
                </span>
                <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                  Safe Transit.
                </h2>
                <p className="apple-sub" style={{ marginBottom: '15px' }}>
                  Once swallowed, the nodes use your natural circulation to travel. They are chemically coded to find and pass through the brain's natural filters.
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Over a 20-minute journey, they glide smoothly into place inside your visual center. No surgeries, no wires, and no discomfort—just a natural pathway to a new way of seeing.
                </p>
                
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
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
            <div id="adaptation" className="bubbly-panel touch-slide-card" style={{ minHeight: '330px', padding: '22px 26px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <div className="card-text-slide">
                <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px' }}>
                  STAGE 03 // PHYSIOLOGICAL ADAPTATION
                </span>
                <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                  Mars. Just like Earth.
                </h2>
                <p className="apple-sub" style={{ marginBottom: '15px' }}>
                  Powered by a living Genetic AI compiled directly from your DNA, the pill silently adapts your biological markers so you can step onto the Martian surface suitless and helmetless.
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  - **Metabolic Warmth**: Automatically regulates core heat so freezing -55°C Martian winds feel like a mild summer breeze.
                  <br />- **DNA-Level Shielding**: Activates cellular melanin/protein coatings to deflect solar radiation.
                  <br />- **Respiration Tuning**: Optimizes hemoglobin oxygen binding, allowing comfortable respiration in the thin atmosphere.
                  <br />- **0.38g Gravity Sync**: Dynamically maintains muscle tone and bone density markers.
                </p>
                
                <div style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
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
            <div id="assembly" className="bubbly-panel touch-slide-card" style={{ minHeight: '330px', padding: '22px 26px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <div className="card-text-slide">
                <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px' }}>
                  STAGE 04 // CORTICAL MAPPING
                </span>
                <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                  Connecting to Your Thoughts.
                </h2>
                <p className="apple-sub" style={{ marginBottom: '15px' }}>
                  The nodes settle gently around your synapses, forming an interface that respects your neural privacy. It maps your intent without changing who you are.
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Powered entirely by body glucose, the Genetic AI integrates with your visual cortex in under 45 minutes, ready to translate subconscious intent into natural spatial anchors.
                </p>
                
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
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
            <div id="eclipse" className="bubbly-panel stage5-card" style={{ minHeight: '330px', padding: '20px 24px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <div className="stage5-slider">
                <div className="card-text-slide">
                  <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>
                    STAGE 05 // RETINA BCI OS
                  </span>
                  <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                    HUD-Free. Screen-Free.
                  </h2>
                  <p className="apple-sub" style={{ marginBottom: '16px', fontSize: '0.88rem' }}>
                    The visual field is completely clean. Virtual screens, clocks, maps, and guides anchor to the physical environment only when you need them. Select a scenario below to experience it.
                  </p>
                </div>

                <div className="card-visual-slide">
                  <div className="viewport-mobile-frame">
                    {renderViewportContent('eclipse')}
                  </div>
                </div>
              </div>

              {/* Bottom scenario dock bar */}
              <div className="scenario-bottom-dock">
                <div 
                  className="hide-scrollbar scenarios-grid-deck" 
                  style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    overflowX: 'auto', 
                    paddingBottom: '5px',
                    scrollSnapType: 'x mandatory',
                    width: '100%'
                  }}
                >
                  {scenarios.map(sc => (
                    <div 
                      key={sc.id} 
                      onClick={() => setActiveScenario(sc.id)}
                      className="scenario-btn-card"
                      style={{
                        flex: '0 0 190px',
                        scrollSnapAlign: 'start',
                        background: activeScenario === sc.id ? 'rgba(var(--color-accent-rgb), 0.12)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${activeScenario === sc.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)'}`,
                        borderRadius: '12px',
                        padding: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '6px' }} className="scenario-icon">{sc.icon}</span>
                      <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.72rem', color: '#ffffff', margin: '0 0 4px 0' }} className="scenario-title">{sc.title}</h4>
                      <p style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }} className="scenario-desc">{sc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Story Card 6 */}
            <div id="superhuman" className="bubbly-panel stage5-card" style={{ minHeight: '330px', padding: '20px 24px', justifyContent: 'flex-start', background: 'rgba(6,9,20,0.5)', flexShrink: 0 }}>
              <div className="stage5-slider">
                <div className="card-text-slide">
                  <span className="net-label" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>
                    STAGE 06 // SUPERHUMAN PHYSIOLOGY
                  </span>
                  <h2 className="apple-headline" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                    Superhuman Synthesis.
                  </h2>
                  <p className="apple-sub" style={{ marginBottom: '16px', fontSize: '0.88rem' }}>
                    Unlock complete biological automation. Maintain physical appearance, prevent aging, and synchronize with medical grids to install vaccines and doses needle-free.
                  </p>
                </div>

                <div className="card-visual-slide">
                  <div className="viewport-mobile-frame">
                    {renderViewportContent('superhuman')}
                  </div>
                </div>
              </div>

              {/* Bottom scenario dock bar */}
              <div className="scenario-bottom-dock">
                <div 
                  className="hide-scrollbar scenarios-grid-deck" 
                  style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    overflowX: 'auto', 
                    paddingBottom: '5px',
                    scrollSnapType: 'x mandatory',
                    width: '100%'
                  }}
                >
                  {superhumanScenarios.map(sc => (
                    <div 
                      key={sc.id} 
                      onClick={() => setActiveSuperhumanScenario(sc.id)}
                      className="scenario-btn-card"
                      style={{
                        flex: '0 0 190px',
                        scrollSnapAlign: 'start',
                        background: activeSuperhumanScenario === sc.id ? 'rgba(var(--color-accent-rgb), 0.12)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${activeSuperhumanScenario === sc.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)'}`,
                        borderRadius: '12px',
                        padding: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '6px' }} className="scenario-icon">{sc.icon}</span>
                      <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.72rem', color: '#ffffff', margin: '0 0 4px 0' }} className="scenario-title">{sc.title}</h4>
                      <p style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }} className="scenario-desc">{sc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Telemetry Dashboard & Layered Composites */}
          <div ref={visualContainerRef} className="desktop-visual-column" style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%', minHeight: 0 }}>
            
            {/* Viewport Box */}
            <div 
              className="bubbly-panel" 
              style={{ 
                flex: 1, 
                padding: '12px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                minHeight: '380px',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(6, 9, 20, 0.75)'
              }}
            >
              
              <span className="net-label" style={{ display: 'block', fontSize: '0.6rem', color: 'var(--color-accent)', marginBottom: '5px' }}>
                // LAYERED VISUAL COMPOSITE
              </span>

              {/* Viewport Frame */}
              <div 
                ref={viewportRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  flex: 1, 
                  background: 'rgba(2, 3, 6, 0.98)', 
                  border: '1px solid rgba(var(--color-accent-rgb), 0.2)', 
                  borderRadius: '12px', 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: 'default'
                }}
              >
                {renderViewportContent(activeTab)}
              </div>

              {/* Status Diagnostic biophysics specs */}
              <div className="biometrics-table-desktop" style={{ marginTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.6rem', fontFamily: 'monospace' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>GENETIC AI CORE STATE:</span>
                  <span style={{ color: activeTab === 'eclipse' || activeTab === 'superhuman' ? '#00ff88' : 'var(--color-accent)', fontWeight: 'bold' }}>
                    {activeTab === 'eclipse' || activeTab === 'superhuman' ? 'ACTIVE (100% DNA MATCH)' : stats.systemState}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>BIOLOGICAL SYNC INDEX:</span>
                  <span style={{ color: '#ffffff' }}>{activeTab === 'eclipse' || activeTab === 'superhuman' ? '99.8%' : stats.synapticMapping}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>METABOLIC HEAT OVERRIDE:</span>
                  <span style={{ color: '#ffffff' }}>{activeTab === 'overview' || activeTab === 'payload' ? 'PENDING' : '-55°C NOMINAL (18.5°C SKIN)'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>RADIATION PROTECTION:</span>
                  <span style={{ color: '#00ff88' }}>{stats.radiation}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>HEART RATE / BLOOD O₂ SAT:</span>
                  <span style={{ color: '#00ff88' }}>{activeTab === 'overview' ? '70 BPM / 99.1%' : activeTab === 'payload' ? '72 BPM / 99.0%' : `74 BPM / ${stats.oxygenSat}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>GRAVITY COMPENSATION:</span>
                  <span style={{ color: '#00ff88' }}>{activeTab === 'overview' || activeTab === 'payload' ? '1.00g (TERRESTRIAL)' : '0.38g (STABILIZED)'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>NEURAL SYSTEM LATENCY:</span>
                  <span style={{ color: '#00ff88' }}>{stats.latency}</span>
                </div>
              </div>

            </div>

            {/* Mobile Status Diagnostic summary bar */}
            <div className="biometrics-summary-mobile bubbly-panel">
              <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <span>🧬 SYNC: <span style={{ color: '#00ff88' }}>{activeTab === 'eclipse' || activeTab === 'superhuman' ? '99.8%' : stats.synapticMapping}</span></span>
                <span>🌡️ HEAT: <span style={{ color: '#ffffff' }}>{activeTab === 'overview' || activeTab === 'payload' ? 'PENDING' : '18.5°C'}</span></span>
                <span>🛰️ GRAV: <span style={{ color: '#00ff88' }}>{activeTab === 'overview' || activeTab === 'payload' ? '1.00g' : '0.38g'}</span></span>
                <span>📶 LAT: <span style={{ color: '#00ff88' }}>{stats.latency}</span></span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
