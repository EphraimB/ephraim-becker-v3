'use client';

import { useState, useEffect, cloneElement } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Import our custom interactive Ares City simulation exhibits
import {
  MaskingDiagnostics,
  MonotropicSpotlight,
  DoubleEmpathySync,
  EnvironmentalTransition,
  BreathingRegulator,
  ExhibitPlaqueVisualization,
  ExhibitHistoryModel,
  ExhibitMatrixVisualization,
  ExhibitMartianBiosphere,
  ExhibitMemoirCrystalMap
} from './MuseumExhibits';

import exhibitData from '../data/neurodiversity-exhibit.json';

export default function NeurodiversityDistrict({ activeSector = 'plaza' }) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeExhibitIndex, setActiveExhibitIndex] = useState(0); // 0 to 6 for Trail Stations
  const [activeStoryPhase, setActiveStoryPhase] = useState(0); // 0 to 4 for Memoir Sols Sols 1-5
  const [activeMatrixTrait, setActiveMatrixTrait] = useState('stimming'); // 'stimming', 'hyperfocus', 'comms', 'autonomy'
  const [activeSimTab, setActiveSimTab] = useState('comms'); // 'comms', 'sensory', 'masking'
  const [analogyTheme, setAnalogyTheme] = useState('tech'); // 'tech', 'rpg', 'nature', 'sports'
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [passportId, setPassportId] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const [transitState, setTransitState] = useState('slide-active');
  const [activeStarNode, setActiveStarNode] = useState(null); // Selected Lexicon Term object

  // Completed Trail Mission Directives states
  const [completedTasks, setCompletedTasks] = useState({});

  // Passport Pledge States
  const [pledges, setPledges] = useState({
    destigmatize: false,
    accommodate: false,
    explicitComms: false
  });
  const [citizenName, setCitizenName] = useState('');
  const [passportGranted, setPassportGranted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Meetup Registration States
  const [meetupName, setMeetupName] = useState('');
  const [specialtyBadge, setSpecialtyBadge] = useState('architect');
  const [registeredCitizens, setRegisteredCitizens] = useState([
    { name: 'Ephraim Becker', badge: 'architect' },
    { name: 'Sarah K.', badge: 'guard' },
    { name: 'Marcus V.', badge: 'communicator' }
  ]);
  const [registrationMessage, setRegistrationMessage] = useState('');

  // Dialogue Perspective Switcher States (Communication Grove)
  const [commsFilter, setCommsFilter] = useState('nt'); // 'nt' (implicit) | 'nd' (direct)

  // Double Empathy Tuner States (Communication Grove)
  const [signalNT, setSignalNT] = useState(40);
  const [signalND, setSignalND] = useState(80);
  const [isSyncLocked, setIsSyncLocked] = useState(false);

  // Sensory Adaptation Sliders (Sensory Garden)
  const [lightingLvl, setLightingLvl] = useState(80); // 0% to 100%
  const [crowdLvl, setCrowdLvl] = useState(30); // 0 to 50
  const [soundLvl, setSoundLvl] = useState(60); // 0 to 100 dB
  const [notifLvl, setNotifLvl] = useState(10); // 0 to 20 per Sol
  const [speedLvl, setSpeedLvl] = useState(1.0); // 0.2s to 4.0s (CSS transition speed)

  const shareText = "Gather around the campfire circle at the Ares City Park - Neurodiversity District. Let's socialize, hang out, and adapt mutual neurotype communication bridges: ";

  useEffect(() => {
    setIsMounted(true);
    setPassportId(Math.round(Math.random() * 90000) + 10000);
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  // Soft transition handler utilizing Next.js paths
  const changeRoute = (route) => {
    if (pathname === route) return;
    setTransitState('slide-left');
    
    setTimeout(() => {
      router.push(route);
      setTransitState('slide-right');
      setTimeout(() => {
        setTransitState('slide-active');
      }, 50);
    }, 200);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const toggleTask = (exhibitId, taskIndex) => {
    const key = `${exhibitId}_${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePledge = (key) => {
    setPledges(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const allPledgesChecked = pledges.destigmatize && pledges.accommodate && pledges.explicitComms;

  const handleGeneratePassport = () => {
    if (!citizenName.trim() || !allPledgesChecked) return;
    setPassportGranted(true);
  };

  const handleRegisterMeetup = (e) => {
    e.preventDefault();
    if (!meetupName.trim()) return;
    
    setRegisteredCitizens(prev => [
      ...prev,
      { name: meetupName.trim(), badge: specialtyBadge }
    ]);
    
    const badgeLabel = 
      specialtyBadge === 'architect' ? 'Systems Architect' :
      specialtyBadge === 'guard' ? 'Sensory Guard' :
      specialtyBadge === 'communicator' ? 'Explicit Communicator' : 'Sports Organizer';

    setRegistrationMessage(`✅ Registered! Badge [${badgeLabel}] mapped to Citizen [${meetupName.trim()}].`);
    setMeetupName('');
    setTimeout(() => setRegistrationMessage(''), 5000);
  };

  const handleAutoSync = () => {
    setSignalNT(50);
    setSignalND(50);
    setIsSyncLocked(true);
  };

  useEffect(() => {
    const diff = Math.abs(signalNT - signalND);
    if (diff <= 2 && signalNT >= 45 && signalNT <= 55) {
      setIsSyncLocked(true);
    } else {
      setIsSyncLocked(false);
    }
  }, [signalNT, signalND]);

  // Set predefined sensory conform/deficit presets
  const applyDeficitPreset = () => {
    setLightingLvl(100);
    setCrowdLvl(50);
    setSoundLvl(85);
    setNotifLvl(20);
    setSpeedLvl(0.2);
  };

  const applyInclusivePreset = () => {
    setLightingLvl(30);
    setCrowdLvl(4);
    setSoundLvl(25);
    setNotifLvl(1);
    setSpeedLvl(2.5);
  };

  const getExhibitDesc = (id) => {
    const exh = exhibitData.exhibits[id];
    if (!exh) return '';
    if (exh.desc) return Array.isArray(exh.desc) ? exh.desc.join(' ') : exh.desc;
    if (exh.analogies && exh.analogies[analogyTheme]) {
      return Array.isArray(exh.analogies[analogyTheme]) ? exh.analogies[analogyTheme].join(' ') : exh.analogies[analogyTheme];
    }
    return '';
  };

  const exhibits = [
    {
      id: 'exhibit-what-is-nd',
      title: exhibitData.exhibits['exhibit-what-is-nd'].title,
      subtitle: exhibitData.exhibits['exhibit-what-is-nd'].subtitle,
      desc: getExhibitDesc('exhibit-what-is-nd'),
      missionTasks: exhibitData.exhibits['exhibit-what-is-nd'].missionTasks || [],
      component: <ExhibitPlaqueVisualization />
    },
    {
      id: 'exhibit-two-ways',
      title: exhibitData.exhibits['exhibit-two-ways'].title,
      subtitle: exhibitData.exhibits['exhibit-two-ways'].subtitle,
      desc: getExhibitDesc('exhibit-two-ways'),
      missionTasks: exhibitData.exhibits['exhibit-two-ways'].missionTasks || [],
      component: 'custom-matrix'
    },
    {
      id: 'exhibit-history',
      title: exhibitData.exhibits['exhibit-history'].title,
      subtitle: exhibitData.exhibits['exhibit-history'].subtitle,
      desc: getExhibitDesc('exhibit-history'),
      missionTasks: exhibitData.exhibits['exhibit-history'].missionTasks || [],
      component: <ExhibitHistoryModel />
    },
    {
      id: 'exhibit-real-life',
      title: exhibitData.exhibits['exhibit-real-life'].title,
      subtitle: exhibitData.exhibits['exhibit-real-life'].subtitle,
      desc: getExhibitDesc('exhibit-real-life'),
      missionTasks: exhibitData.exhibits['exhibit-real-life'].missionTasks || [],
      component: 'custom-real-life'
    },
    {
      id: 'exhibit-accommodation',
      title: exhibitData.exhibits['exhibit-accommodation'].title,
      subtitle: exhibitData.exhibits['exhibit-accommodation'].subtitle,
      desc: getExhibitDesc('exhibit-accommodation'),
      missionTasks: exhibitData.exhibits['exhibit-accommodation'].missionTasks || [],
      component: 'custom-accommodation'
    },
    {
      id: 'exhibit-future',
      title: exhibitData.exhibits['exhibit-future'].title,
      subtitle: exhibitData.exhibits['exhibit-future'].subtitle,
      desc: getExhibitDesc('exhibit-future'),
      missionTasks: exhibitData.exhibits['exhibit-future'].missionTasks || [],
      component: 'custom-future'
    },
    {
      id: 'exhibit-story',
      title: exhibitData.exhibits['exhibit-story'].title,
      subtitle: exhibitData.exhibits['exhibit-story'].subtitle,
      desc: getExhibitDesc('exhibit-story'),
      missionTasks: exhibitData.exhibits['exhibit-story'].missionTasks || [],
      component: 'custom-story'
    }
  ];

  const storyPhases = exhibitData.storyPhases;
  const matrixTraits = exhibitData.matrixTraits;

  // Render Sensory Garden Dynamic Visual Overlay styling
  const sensoryOverlayStyle = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 5,
    borderRadius: '16px',
    transition: `all ${speedLvl}s ease`,
    background: `rgba(10, 14, 30, ${crowdLvl * 0.01})`,
    filter: `brightness(${1.3 - lightingLvl * 0.008}) blur(${crowdLvl * 0.05}px) contrast(${1 + (soundLvl - 40) * 0.005})`,
    boxShadow: notifLvl > 12 ? 'inset 0 0 20px rgba(255, 87, 34, 0.2)' : 'none'
  };

  return (
    <div className="citizen-card-shell neuro-page-shell" style={{ flexDirection: 'column' }}>
      
      {/* Immersive Martian Biosphere Core CSS and Viewport Fixes */}
      <style dangerouslySetInnerHTML={{ __html: `
        .background-canvas {
          filter: brightness(0.62) contrast(1.02) !important;
        }
        .reduce-motion, .reduce-motion * {
          animation: none !important;
          transition: none !important;
        }
        .neuro-page-shell {
          height: calc(100vh - 140px);
          max-height: calc(100vh - 140px);
          min-height: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .museum-floor-nav-deck {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin-bottom: 14px;
          flex-shrink: 0;
          z-index: 10;
        }
        .museum-nav-btn {
          padding: 10px 4px;
          font-family: var(--font-tech);
          font-size: 0.65rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          background: rgba(6, 9, 20, 0.7);
          border-width: 1.5px;
          border-style: solid;
          borderColor: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          text-align: center;
          outline: none;
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.02);
        }
        .museum-nav-btn:hover {
          borderColor: rgba(0, 240, 255, 0.4);
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.04);
        }
        .museum-nav-btn.active {
          borderColor: #00f0ff;
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.12);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.2), inset 0 1px 3px rgba(0, 240, 255, 0.1);
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
        }
        .museum-view-corridor {
          flex: 1;
          display: flex;
          flex-direction: row;
          gap: 20px;
          min-height: 0;
          height: 100%;
          max-height: 100%;
        }
        .museum-left-feed {
          flex: 1.1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
          height: 100%;
        }
        .museum-right-diagnostics {
          flex: 1.9;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
          height: 100%;
        }

        .story-text-body {
          font-size: 0.82rem;
          color: #f2f6fc;
          line-height: 1.6;
          text-align: justify;
          margin: 0;
          font-weight: 300;
        }
        .gallery-nav-buttons-deck {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          background: rgba(6, 9, 20, 0.6);
          border-width: 1px;
          border-style: solid;
          borderColor: rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 8px 16px;
          margin-top: auto;
        }
        .gallery-arrow-btn {
          background: transparent;
          border: none;
          color: #00ff88;
          font-family: var(--font-tech);
          font-size: 0.7rem;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
          letter-spacing: 0.5px;
        }
        .gallery-arrow-btn:hover {
          text-shadow: 0 0 8px #00ff88;
          transform: scale(1.03);
        }
        .gallery-arrow-btn:disabled {
          color: rgba(255,255,255,0.25);
          cursor: not-allowed;
          text-shadow: none;
        }
        .starmap-canvas-box {
          background: #04060c;
          border-width: 1.5px;
          border-style: solid;
          borderColor: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 0 25px rgba(0,0,0,0.9);
          flex: 1;
          min-height: 250px;
        }
        .starmap-constellation-node {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .starmap-constellation-node:hover circle.glow-ring {
          stroke-width: 1.5px;
          opacity: 0.6;
          r: 9px;
        }
        .constellation-drawer-overlay {
          position: absolute;
          top: 0;
          right: 0;
          width: 320px;
          height: 100%;
          background: rgba(10, 14, 30, 0.96);
          border-left: 2px solid #00ff88;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.7);
          z-index: 50;
          display: flex;
          flex-direction: column;
          animation: slide-drawer 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        @keyframes slide-drawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .protocol-toggle-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border-width: 1px;
          border-style: dashed;
          borderColor: rgba(255,255,255,0.08);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .protocol-toggle-badge:hover {
          borderColor: rgba(0,255,136,0.3);
          background: rgba(255,255,255,0.03);
        }
        .protocol-toggle-badge.active {
          background: rgba(0, 255, 136, 0.06);
          border-width: 1.5px;
          border-style: solid;
          borderColor: #00ff88;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.1);
        }
        .colony-passport-print-card {
          background: linear-gradient(135deg, rgba(6, 9, 20, 0.94) 0%, rgba(10, 14, 30, 0.98) 100%);
          border-width: 2px;
          border-style: solid;
          borderColor: #00ff88;
          border-radius: 16px;
          padding: 20px;
          position: relative;
          box-shadow: 0 0 25px rgba(0, 255, 136, 0.15);
          overflow: hidden;
          width: 100%;
          max-width: 380px;
          margin: 10px auto 0 auto;
        }

        .trait-select-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }
        .trait-select-btn {
          padding: 8px 4px;
          font-family: var(--font-tech);
          font-size: 0.64rem;
          letter-spacing: 0.5px;
          background: rgba(4,6,12,0.6);
          border-width: 1px;
          border-style: solid;
          borderColor: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: center;
          outline: none;
        }
        .trait-select-btn:hover {
          borderColor: rgba(0, 255, 136, 0.4);
          color: #00ff88;
        }
        .trait-select-btn.active {
          borderColor: #00ff88;
          background: rgba(0, 255, 136, 0.08);
          color: #00ff88;
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.15);
          font-weight: bold;
        }
        
        .custom-scroll {
          overflow-y: auto;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.15);
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 240, 255, 0.4);
        }

        .signup-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          margin-bottom: 10px;
        }
        .badge-btn {
          padding: 8px 4px;
          font-family: monospace;
          font-size: 0.6rem;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          outline: none;
        }
        .badge-btn:hover {
          border-color: rgba(0, 240, 255, 0.4);
          color: #00f0ff;
        }
        .badge-btn.active {
          background: rgba(0, 240, 255, 0.08);
          border-color: #00f0ff;
          color: #00f0ff;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.15);
          font-weight: bold;
        }

        @media (max-width: 900px) {
          .neuro-page-shell {
            height: auto !important;
            max-height: none !important;
            min-height: auto !important;
          }
          .museum-floor-nav-deck {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .museum-view-corridor {
            flex-direction: column !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
          }
          .museum-left-feed, .museum-right-diagnostics {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            flex: none !important;
            width: 100% !important;
          }
          .trait-select-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}} />

      {/* Corridor sweep overlay */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Main OS content container */}
      <div className={`walking-content-container ${transitState} ${reduceMotion ? 'reduce-motion' : ''}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Navigation Console */}
        <div className="museum-floor-nav-deck">
          <button 
            onClick={() => changeRoute('/neurodiversity')} 
            className={`museum-nav-btn ${activeSector === 'plaza' ? 'active' : ''}`}
          >
            🛰️ District Plaza
          </button>
          <button 
            onClick={() => changeRoute('/neurodiversity/communication-grove')} 
            className={`museum-nav-btn ${activeSector === 'communication' ? 'active' : ''}`}
          >
            📡 Comms Grove
          </button>
          <button 
            onClick={() => changeRoute('/neurodiversity/sensory-garden')} 
            className={`museum-nav-btn ${activeSector === 'sensory' ? 'active' : ''}`}
          >
            🌿 Sensory Garden
          </button>
          <button 
            onClick={() => changeRoute('/neurodiversity/lexicon-pavilion')} 
            className={`museum-nav-btn ${activeSector === 'lexicon' ? 'active' : ''}`}
          >
            🌌 Lexicon Pavilion
          </button>
          <button 
            onClick={() => changeRoute('/neurodiversity/meetup')} 
            className={`museum-nav-btn ${activeSector === 'meetup' ? 'active' : ''}`}
          >
            👥 Meetup & Advocacy
          </button>
        </div>

        {/* Dynamic Sector Rendering */}
        <div className="museum-view-corridor">
          
          {/* ====================================
              1. DISTRICT ENTRANCE PLAZA SECTOR
              ==================================== */}
          {activeSector === 'plaza' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', margin: '0 auto', maxWidth: '800px', textAlign: 'center', justifyContent: 'center' }}>
              <div className="bubbly-panel" style={{ border: '1.5px solid rgba(0, 240, 255, 0.25)' }}>
                <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#00f0ff', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                  // ARES CITY PARK // NEURODIVERSITY DISTRICT HUB // INCLUSION NOMINAL
                </span>
                <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.5rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                  Neurodiversity District Entrance Hub
                </h1>
                <p style={{ fontSize: '0.86rem', color: '#8a9bb5', lineHeight: '1.7', margin: '0 0 20px 0', textAlign: 'justify' }}>
                  Welcome to the **Neurodiversity District**, a dedicated, fully functioning district nestled inside the biodome of Ares City Park. This area is designed as a living showcase of cognitive diversity, sensory flexibility, and mutual understanding. Rather than trying to conform divergent minds to clinical "deficit" templates, this district represents a futuristic social ecosystem where everyone's unique neurological software is fully integrated, accommodated, and celebrated.
                </p>
                <p style={{ fontSize: '0.86rem', color: '#8a9bb5', lineHeight: '1.7', margin: '0 0 24px 0', textAlign: 'justify' }}>
                  Explore our district destinations: customize sensory variables in the **Sensory Garden**, tune dialogue bridges in the **Communication Grove**, map interconnected cognitive relationships inside the **Lexicon Pavilion**, and hang out with citizen advocates at the cozy **Meetup & Advocacy campfire**.
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => changeRoute('/neurodiversity/sensory-garden')} 
                    className="hud-btn" 
                    style={{ borderColor: '#00f0ff', color: '#00f0ff', background: 'rgba(0, 240, 255, 0.08)' }}
                  >
                    [ 🌿 SENSORY GARDEN SIMULATOR ]
                  </button>
                  <button onClick={() => changeRoute('/neurodiversity/communication-grove')} className="hud-btn">
                    [ 📡 DIALOGUE TUNER GROVE ]
                  </button>
                  <button onClick={() => changeRoute('/neurodiversity/meetup')} className="hud-btn">
                    [ 👥 ADVOCACY CAMPFIRE ]
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ====================================
              2. COMMUNICATION GROVE SECTOR ( TUNE DOUBLE EMPATHY & DIALOGUE SWITCHER )
              ==================================== */}
          {activeSector === 'communication' && (
            <div className="museum-view-corridor" style={{ width: '100%', gap: '20px' }}>
              
              {/* Left Panel: Dialogue Perspective Switcher */}
              <div className="museum-left-feed" style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
                <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00f0ff', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    // COMMUNICATION GROVE // DIALOGUE SWITCHER TERMINAL
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Dialogue Perspective Switcher
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                    Divergent neurotypes process expectations differently. Switch below to see conversation subtexts under the **Implicit Pathology** model vs the **Explicit Synergy** model.
                  </p>

                  {/* Filter selector */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                    <button
                      onClick={() => setCommsFilter('nt')}
                      className={`badge-btn ${commsFilter === 'nt' ? 'active' : ''}`}
                      style={{ borderColor: commsFilter === 'nt' ? '#ff5722' : 'rgba(255,255,255,0.08)', color: commsFilter === 'nt' ? '#ff5722' : '#8a9bb5', background: commsFilter === 'nt' ? 'rgba(255,87,34,0.08)' : 'rgba(0,0,0,0.3)' }}
                    >
                      [ ❌ NT IMPLICIT FILTER ]
                    </button>
                    <button
                      onClick={() => setCommsFilter('nd')}
                      className={`badge-btn ${commsFilter === 'nd' ? 'active' : ''}`}
                      style={{ borderColor: commsFilter === 'nd' ? '#00ff88' : 'rgba(255,255,255,0.08)', color: commsFilter === 'nd' ? '#00ff88' : '#8a9bb5', background: commsFilter === 'nd' ? 'rgba(0,255,136,0.08)' : 'rgba(0,0,0,0.3)' }}
                    >
                      [ ✅ ND EXPLICIT FILTER ]
                    </button>
                  </div>
                </div>

                {/* Main conversation box */}
                <div className="bubbly-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'block' }}>
                    ACTIVE CHAT INHABITANT FEED:
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {commsFilter === 'nt' ? (
                      <>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #ff5722' }}>
                          <strong style={{ display: 'block', fontSize: '0.66rem', color: '#ff5722', fontFamily: 'monospace' }}>Inhabitant A (Subtextual Request):</strong>
                          <p style={{ fontSize: '0.74rem', color: '#fff', margin: '4px 0 0 0', fontStyle: 'italic' }}>
                            "Wow, the air filters in this segment are getting really loud today, don't you think?"
                          </p>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #8a9bb5' }}>
                          <strong style={{ display: 'block', fontSize: '0.66rem', color: '#8a9bb5', fontFamily: 'monospace' }}>Inhabitant B (Direct Interpretation):</strong>
                          <p style={{ fontSize: '0.74rem', color: '#fff', margin: '4px 0 0 0' }}>
                            "Yes, they are indeed. The decibel monitors show they are operating at 65 dB." *(B continues working, unaware A wanted them to turn down or adjust the dials)*
                          </p>
                        </div>

                        <div style={{ background: 'rgba(255, 87, 34, 0.05)', border: '1px solid rgba(255, 87, 34, 0.2)', padding: '10px', borderRadius: '8px', marginTop: '6px' }}>
                          <strong style={{ display: 'block', fontSize: '0.6rem', color: '#ff5722', fontFamily: 'monospace', marginBottom: '2px' }}>
                            📡 SYSTEM DIAGNOSTIC ANALYSIS:
                          </strong>
                          <p style={{ margin: 0, fontSize: '0.66rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.35 }}>
                            *❌ IMPLICIT PROTOCOL DESYNC. Inhabitant A expected A's comment to act as a direct request for adjustment. Inhabitant B processed only the literal data query. Core CPU overhead drained by 20% due to cognitive guessing overlays.*
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #00ff88' }}>
                          <strong style={{ display: 'block', fontSize: '0.66rem', color: '#00ff88', fontFamily: 'monospace' }}>Inhabitant A (Explicit Direct Request):</strong>
                          <p style={{ fontSize: '0.74rem', color: '#fff', margin: '4px 0 0 0' }}>
                            "I am experiencing sensory overstimulation from the air filter hum. Could you help me lower the speed toggle to 30% for the next hour?"
                          </p>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #00f0ff' }}>
                          <strong style={{ display: 'block', fontSize: '0.66rem', color: '#00f0ff', fontFamily: 'monospace' }}>Inhabitant B (Direct Execution):</strong>
                          <p style={{ fontSize: '0.74rem', color: '#fff', margin: '4px 0 0 0' }}>
                            "Understood. Lowering speed toggle to 30% now. Speed synchronized. Does this level feel comfortable for you?"
                          </p>
                        </div>

                        <div style={{ background: 'rgba(0, 255, 136, 0.05)', border: '1px solid rgba(0, 255, 136, 0.2)', padding: '10px', borderRadius: '8px', marginTop: '6px' }}>
                          <strong style={{ display: 'block', fontSize: '0.6rem', color: '#00ff88', fontFamily: 'monospace', marginBottom: '2px' }}>
                            📡 SYSTEM DIAGNOSTIC ANALYSIS:
                          </strong>
                          <p style={{ margin: 0, fontSize: '0.66rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.35 }}>
                            *✅ EXPLICIT ALIGNMENT SYNCHRONIZED. Complete protocol match. Guessing overlays bypassed entirely. Processor overhead at 0%, restoring nervous system battery levels to optimal nominal range.*
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Panel: Double Empathy Signal Sync Tuner */}
              <div className="museum-right-diagnostics custom-scroll" style={{ flex: 1.9, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="bubbly-panel" style={{ padding: '16px', border: '1.5px solid rgba(0, 240, 255, 0.25)', boxShadow: '0 0 20px rgba(0, 240, 255, 0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed rgba(0, 240, 255, 0.2)', paddingBottom: '6px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#00f0ff', fontWeight: 'bold', letterSpacing: '1px' }}>
                      📡 INTERACTIVE DOUBLE EMPATHY SIGNAL SYNCHRONIZER
                    </span>
                    <span style={{ 
                      fontSize: '0.54rem', 
                      fontFamily: 'monospace', 
                      color: isSyncLocked ? '#00ff88' : '#ffb300',
                      fontWeight: 'bold',
                      background: isSyncLocked ? 'rgba(0,255,136,0.06)' : 'rgba(255,179,0,0.06)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: `1px solid ${isSyncLocked ? '#00ff88' : '#ffb300'}`
                    }}>
                      {isSyncLocked ? '⚡ BRIDGE: LOCKED & SYNCED' : '⚠️ BRIDGE: OUT OF PHASE'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.68rem', color: '#8a9bb5', lineHeight: 1.4, margin: '0 0 12px 0', textAlign: 'justify' }}>
                    The **Double Empathy Mismatch** occurs when divergent neurotypes fail to align communication signals. By adjusting the sliders below to mutual expectations, you build a shared protocol. Achieve sync (both signals at **50%**) to lock the bridge, or click Auto-Sync.
                  </p>

                  {/* Signal Waves Graph Canvas */}
                  <div style={{ background: '#030509', border: '1.5px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px 14px', position: 'relative', overflow: 'hidden', height: '90px', boxSizing: 'border-box' }}>
                    <svg viewBox="0 0 240 70" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <line x1="5" y1="35" x2="235" y2="35" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      
                      {!isSyncLocked && (
                        <path 
                          d={`M 5,35 Q 30,${35 - (signalNT - 50) * 0.5} 60,35 T 120,35 T 180,35 T 235,35`} 
                          fill="none" 
                          stroke="#ff5722" 
                          strokeWidth="1.2" 
                          strokeDasharray={reduceMotion ? 'none' : '4 2'} 
                          style={{ animation: reduceMotion ? 'none' : 'dash 15s linear infinite' }}
                        />
                      )}

                      {!isSyncLocked && (
                        <path 
                          d={`M 5,35 Q 30,${35 + (signalND - 50) * 0.5} 60,35 T 120,35 T 180,35 T 235,35`} 
                          fill="none" 
                          stroke="#ffb300" 
                          strokeWidth="1.2" 
                          style={{ opacity: 0.85 }}
                        />
                      )}

                      {isSyncLocked && (
                        <path 
                          d="M 5,35 Q 30,35 60,35 T 120,35 T 180,35 T 235,35" 
                          fill="none" 
                          stroke="#00ff88" 
                          strokeWidth="2.5" 
                          style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }}
                        />
                      )}
                    </svg>
                  </div>

                  {/* Sliders Grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#ff5722', width: '90px', flexShrink: 0 }}>
                        NEUROTYPE A EXPECTATIONS:
                      </span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={signalNT}
                        onChange={(e) => setSignalNT(Number(e.target.value))}
                        disabled={isSyncLocked}
                        style={{ flex: 1, accentColor: '#ff5722', cursor: isSyncLocked ? 'not-allowed' : 'pointer' }}
                      />
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff', width: '30px', textAlign: 'right', flexShrink: 0 }}>
                        {signalNT}%
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#ffb300', width: '90px', flexShrink: 0 }}>
                        NEUROTYPE B EXPECTATIONS:
                      </span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={signalND}
                        onChange={(e) => setSignalND(Number(e.target.value))}
                        disabled={isSyncLocked}
                        style={{ flex: 1, accentColor: '#ffb300', cursor: isSyncLocked ? 'not-allowed' : 'pointer' }}
                      />
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff', width: '30px', textAlign: 'right', flexShrink: 0 }}>
                        {signalND}%
                      </span>
                    </div>
                  </div>

                  {/* Auto Sync action bar */}
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '14px', borderTop: '1px dashed rgba(0, 240, 255, 0.1)', paddingTop: '10px' }}>
                    {!isSyncLocked ? (
                      <button
                        onClick={handleAutoSync}
                        className="hud-btn"
                        style={{ borderColor: '#00f0ff', color: '#00f0ff', background: 'rgba(0, 240, 255, 0.06)', fontSize: '0.62rem', padding: '4px 12px' }}
                      >
                        [ 📡 FORCE AUTO-SYNC CHANNELS ]
                      </button>
                    ) : (
                      <button
                        onClick={() => { setSignalNT(40); setSignalND(80); setIsSyncLocked(false); }}
                        className="hud-btn"
                        style={{ borderColor: '#ff5722', color: '#ff5722', background: 'rgba(255, 87, 34, 0.05)', fontSize: '0.62rem', padding: '4px 12px' }}
                      >
                        [ ✕ BREAK SIGNAL SYNC ]
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================
              3. SENSORY GARDEN SECTOR ( INTERACTIVE SOOTHING ADJUSTMENT SLIDERS )
              ==================================== */}
          {activeSector === 'sensory' && (
            <div className="museum-view-corridor" style={{ width: '100%', gap: '20px', position: 'relative' }}>
              
              {/* Dynamic Glassmorphic filter overlay */}
              <div style={sensoryOverlayStyle}></div>

              {/* Left Column: Interactive Sensory Adjustment Panel */}
              <div className="museum-left-feed" style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 10 }}>
                <div className="bubbly-panel">
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00f0ff', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    // SENSORY GARDEN // BIOME ADAPTATION INTERACTIVE DIALS
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.92rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Sensory Adaptation Panel
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, margin: '0 0 12px 0' }}>
                    Divergent minds process sensory telemetry with different thresholds. Customize the botanical dome's variables below to experience how accommodations restore peace, or apply direct presets.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                    <button
                      onClick={applyDeficitPreset}
                      className="badge-btn"
                      style={{ borderColor: '#ff5722', color: '#ff5722', background: 'rgba(255,87,34,0.06)' }}
                    >
                      ⚠️ PATHOLOGY / GLARE PRESET
                    </button>
                    <button
                      onClick={applyInclusivePreset}
                      className="badge-btn"
                      style={{ borderColor: '#00ff88', color: '#00ff88', background: 'rgba(0,255,136,0.06)' }}
                    >
                      🌿 ADAPTIVE RESTORE PRESET
                    </button>
                  </div>

                  {/* Sliders Deck */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    {/* Lighting */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>💡 DOME LIGHTING LUMENS:</span>
                        <strong style={{ color: lightingLvl > 75 ? '#ff5722' : '#00ff88' }}>{lightingLvl}%</strong>
                      </div>
                      <input 
                        type="range" min="10" max="100" value={lightingLvl}
                        onChange={(e) => setLightingLvl(Number(e.target.value))}
                        style={{ accentColor: '#00f0ff' }}
                      />
                    </div>

                    {/* Crowd */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>👥 CITIZEN DENSITY (CROWD):</span>
                        <strong style={{ color: crowdLvl > 35 ? '#ff5722' : '#00ff88' }}>{crowdLvl} ACTIVE DONS</strong>
                      </div>
                      <input 
                        type="range" min="0" max="50" value={crowdLvl}
                        onChange={(e) => setCrowdLvl(Number(e.target.value))}
                        style={{ accentColor: '#00f0ff' }}
                      />
                    </div>

                    {/* Sound */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>🔊 DOME HUM DECIBELS (SOUND):</span>
                        <strong style={{ color: soundLvl > 70 ? '#ff5722' : '#00ff88' }}>{soundLvl} dB</strong>
                      </div>
                      <input 
                        type="range" min="10" max="100" value={soundLvl}
                        onChange={(e) => setSoundLvl(Number(e.target.value))}
                        style={{ accentColor: '#00f0ff' }}
                      />
                    </div>

                    {/* Notifications */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>🚨 OS NOTIFICATION TICK RATES:</span>
                        <strong style={{ color: notifLvl > 12 ? '#ff5722' : '#00ff88' }}>{notifLvl} ALERTS / SOL</strong>
                      </div>
                      <input 
                        type="range" min="0" max="20" value={notifLvl}
                        onChange={(e) => setNotifLvl(Number(e.target.value))}
                        style={{ accentColor: '#00f0ff' }}
                      />
                    </div>

                    {/* Animation speed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff' }}>
                        <span>🏃 ANIMATION TICK INTERVAL (MOTION):</span>
                        <strong style={{ color: speedLvl < 0.6 ? '#ff5722' : '#00ff88' }}>{speedLvl}s SWEEP</strong>
                      </div>
                      <input 
                        type="range" min="2" max="40" value={speedLvl * 10}
                        onChange={(e) => setSpeedLvl(Number(e.target.value) / 10)}
                        style={{ accentColor: '#00f0ff' }}
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column: Live Soothing Environment Telemetry Output */}
              <div className="museum-right-diagnostics custom-scroll" style={{ flex: 1.9, display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 10 }}>
                
                {/* Simulated telemetry HUD display */}
                <div className="bubbly-panel" style={{ border: '1.5px solid rgba(0, 240, 255, 0.2)', padding: '16px' }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#00f0ff', fontWeight: 'bold', display: 'block', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '8px' }}>
                    📡 REALTIME SENSORY BIOSPHERE TELEMETRY
                  </span>

                  {/* Metrics grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontFamily: 'monospace' }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>LUMINOSITY DRAIN</span>
                      <strong style={{ fontSize: '0.8rem', color: lightingLvl > 75 ? '#ff5722' : '#00ff88' }}>
                        {lightingLvl > 75 ? '⚠️ DRAIN DANGEROUS' : '✓ NOMINAL'}
                      </strong>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>CROWD LOAD OVERHEAD</span>
                      <strong style={{ fontSize: '0.8rem', color: crowdLvl > 35 ? '#ff5722' : '#00ff88' }}>
                        {crowdLvl > 35 ? '⚠️ UNMANAGEABLE' : '✓ ENERGETIC NOMINAL'}
                      </strong>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>DECIBEL OVERLOAD THRESHOLD</span>
                      <strong style={{ fontSize: '0.8rem', color: soundLvl > 70 ? '#ff5722' : '#00ff88' }}>
                        {soundLvl > 70 ? '⚠️ THREAT REGISTERED' : '✓ RECOVERY ACTIVE'}
                      </strong>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>NERVOUS SYSTEM REACTOR BATTERY</span>
                      <strong style={{ fontSize: '0.8rem', color: (lightingLvl > 75 || crowdLvl > 35 || soundLvl > 70 || notifLvl > 12) ? '#ff5722' : '#00ff88' }}>
                        {(lightingLvl > 75 || crowdLvl > 35 || soundLvl > 70 || notifLvl > 12) ? '🔋 DRAINING CRITICAL (3.2x)' : '🔋 CHARGING STABLE (+8.5)'}
                      </strong>
                    </div>
                  </div>

                  <p style={{ margin: '14px 0 0 0', fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, textAlign: 'justify' }}>
                    <strong>Experiential Summary:</strong> In a sensory-unaware society (Conformity Glare Preset), environments are locked to an average standard. This forces autistic individuals to continuously filter high sound, lighting glare, and alerts, running background processors that drain nervous system battery levels to zero. In an **inclusive society** (Soothing Adaptive Preset), spaces are customizable: dimming glare, organizing quiet zones, and slowing transition speeds immediately restores cognitive recovery buffers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ====================================
              4. LEXICON PAVILION SECTOR ( Connected relationship grid starmap )
              ==================================== */}
          {activeSector === 'lexicon' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', minHeight: 0, height: '100%', position: 'relative' }}>
              <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  🌌 Connected Lexicon Pavilion & Constellation Map
                </h3>
                <p style={{ fontSize: '0.74rem', color: '#8a9bb5', lineHeight: 1.5, margin: 0 }}>
                  Concepts in neurodiversity do not exist in isolation. Click on the glowing starmap constellation nodes to display definitions, or use the **Connected Spatial Relationship Grid** below to see how monotropic deep-focus, unmasking filters, adult burnout cycles, and query timeouts physically link together as a living knowledge system.
                </p>
              </div>

              {/* Connected Spatial Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', background: 'rgba(4,6,12,0.6)', border: '1.5px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px', boxSizing: 'border-box' }}>
                {[
                  { id: 'monotropism', title: 'I. Monotropism', link: 'leads to continuous stealth masking', desc: 'Single-channel CPU focus overclocking', color: '#ffb300' },
                  { id: 'masking', title: 'II. Masking', link: 'causes ongoing RAM battery drain', desc: 'Stealth compliance overhead overlays', color: '#00f0ff' },
                  { id: 'burnout', title: 'III. Burnout', link: 'triggers core query timeout loops', desc: 'System battery crash & exhaustion', color: '#ff5722' },
                  { id: 'executive', title: 'IV. PDA Profile', link: 'demands absolute citizen autonomy', desc: 'Core request query timeout locks', color: '#00ff88' }
                ].map((node, idx) => (
                  <div 
                    key={node.id}
                    onClick={() => {
                      const item = LEXICON_ITEMS.find(x => x.id === node.id || x.id.includes(node.id));
                      if (item) setActiveStarNode(item);
                    }}
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      border: `1.2px solid ${node.color}`,
                      borderRadius: '8px',
                      padding: '10px',
                      cursor: 'pointer',
                      boxShadow: `0 0 10px rgba(${node.color === '#00ff88' ? '0,255,136' : (node.color === '#ffb300' ? '255,179,0' : (node.color === '#ff5722' ? '255,87,34' : '0,240,255'))}, 0.1)`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <strong style={{ fontSize: '0.66rem', color: node.color, fontFamily: 'monospace' }}>{node.title.toUpperCase()}</strong>
                    <span style={{ fontSize: '0.58rem', color: '#fff', fontWeight: 'bold' }}>{node.desc}</span>
                    <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', marginTop: '2px', borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '4px' }}>
                      ↳ {node.link}
                    </span>
                  </div>
                ))}
              </div>

              {/* Starmap Interactive Canvas */}
              <div className="starmap-canvas-box">
                <svg viewBox="0 0 240 140" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="amberStarGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffb300" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="cyanStarGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.5">
                    <line x1="30" y1="35" x2="65" y2="25" />
                    <line x1="65" y1="25" x2="110" y2="40" />
                    <line x1="110" y1="40" x2="155" y2="30" />
                    <line x1="155" y1="30" x2="200" y2="45" />

                    <line x1="30" y1="35" x2="55" y2="75" />
                    <line x1="65" y1="25" x2="90" y2="85" />
                    <line x1="110" y1="40" x2="130" y2="90" />
                    <line x1="155" y1="30" x2="175" y2="80" />
                    
                    <line x1="55" y1="75" x2="90" y2="85" />
                    <line x1="90" y1="85" x2="130" y2="90" />
                    <line x1="130" y1="90" x2="175" y2="80" />
                    <line x1="175" y1="80" x2="210" y2="70" />
                  </g>

                  {LEXICON_ITEMS.map((item, idx) => {
                    const isSelected = activeStarNode?.id === item.id;
                    const glowColor = item.category === 'energy' ? 'url(#amberStarGlow)' : (item.category === 'cognitive' ? 'url(#cyanStarGlow)' : 'url(#starGlow)');
                    const strokeColor = item.category === 'energy' ? '#ffb300' : (item.category === 'cognitive' ? '#00f0ff' : '#00ff88');

                    return (
                      <g 
                        key={item.id} 
                        onClick={() => setActiveStarNode(item)}
                        className="starmap-constellation-node"
                      >
                        <circle cx={item.cx} cy={item.cy} r={isSelected ? '14' : '9'} fill={glowColor} className="glow-ring" />
                        <circle cx={item.cx} cy={item.cy} r="3" fill="#fff" />
                        <circle 
                          cx={item.cx} 
                          cy={item.cy} 
                          r={isSelected ? '6.5' : '4.5'} 
                          fill="none" 
                          stroke={strokeColor} 
                          strokeWidth={isSelected ? '1.5' : '0.8'} 
                        />
                        <text 
                          x={item.cx} 
                          y={item.cy + 10} 
                          fill={isSelected ? strokeColor : 'rgba(255,255,255,0.45)'} 
                          fontSize="3.8" 
                          fontFamily="monospace" 
                          textAnchor="middle"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {item.title.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Sliding Telemetry Drawer Overlay */}
                {activeStarNode && (
                  <div className="constellation-drawer-overlay" style={{ borderLeftColor: activeStarNode.category === 'energy' ? '#ffb300' : (activeStarNode.category === 'cognitive' ? '#00f0ff' : '#00ff88') }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#00f0ff', fontWeight: 'bold' }}>
                        // LEXICON LOG DATA DECK
                      </span>
                      <button 
                        onClick={() => setActiveStarNode(null)} 
                        style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="custom-scroll" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>
                          {activeStarNode.category.toUpperCase()} STATE
                        </span>
                        <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#fff', textTransform: 'uppercase', margin: '4px 0 2px 0' }}>
                          {activeStarNode.title}
                        </h4>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                          {activeStarNode.pronunciation}
                        </span>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.45, fontStyle: 'italic', borderLeft: `2.5px solid ${activeStarNode.category === 'energy' ? '#ffb300' : (activeStarNode.category === 'cognitive' ? '#00f0ff' : '#00ff88')}`, paddingLeft: '8px' }}>
                        {activeStarNode.shortDef}
                      </p>

                      <p style={{ margin: 0, fontSize: '0.74rem', color: '#fff', lineHeight: 1.5, textAlign: 'justify' }}>
                        <strong>Diagnostic analysis:</strong> {activeStarNode.longDef}
                      </p>

                      <div style={{ background: 'rgba(0,0,0,0.3)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px' }}>
                        <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'monospace', color: '#00f0ff', marginBottom: '2px' }}>
                          📡 BECKERMEMOIR_LOGENTRY.DAT:
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#8a9bb5', lineHeight: 1.4, textAlign: 'justify' }}>
                          {activeStarNode.storyReflection}
                        </p>
                      </div>

                      <div style={{ background: 'rgba(0, 255, 136, 0.02)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(0, 255, 136, 0.1)', borderRadius: '8px', padding: '10px' }}>
                        <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', marginBottom: '2px' }}>
                          💡 COLONY ACCOMMODATION RULE:
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#fff', lineHeight: 1.4 }}>
                          {activeStarNode.takeaway}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ====================================
              5. MEETUP & ADVOCACY CAMPFIRE SECTOR
              ==================================== */}
          {activeSector === 'meetup' && (
            <div className="museum-view-corridor" style={{ width: '100%', gap: '20px' }}>
              
              {/* Left Column: Campfire Schedule Bulletin */}
              <div className="museum-left-feed" style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="bubbly-panel" style={{ padding: '16px' }}>
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00f0ff', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    // NEURODIVERSITY MEETUP & ADVOCACY // ACTIVE CAMPFIRE GROVE
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.92rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    Meetup Grove & Campfire
                  </h3>
                  <p style={{ fontSize: '0.74rem', color: '#8a9bb5', lineHeight: 1.45, margin: 0, textAlign: 'justify' }}>
                    Welcome to the campfire circle at the Advocacy Meetup Grove! Colony citizens hang out here under the synthetic dome sky to socialize, play low-gravity dome-sports, share coffee, form mutual support groups, and establish explicit communication bridges.
                  </p>
                </div>

                {/* Bulletin Board */}
                <div className="bubbly-panel" style={{ padding: '14px', border: '1.5px solid rgba(0, 240, 255, 0.2)', background: 'rgba(6, 9, 20, 0.8)' }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#00f0ff', fontWeight: 'bold', display: 'block', borderBottom: '1px dashed rgba(0, 240, 255, 0.15)', paddingBottom: '6px', marginBottom: '8px' }}>
                    📅 ACTIVE MEETUP BULLETIN BOARD
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { time: 'Sol 14 18:00', title: '👥 Weekly Cooperative Synapse', desc: 'Hangout, casual networking, and campfire coffee chats.' },
                      { time: 'Sol 18 15:00', title: '🏃 Low-G Dome-Sports & Discus League', desc: 'Sensory-friendly, low-demand athletic matches on East Lawn.' },
                      { time: 'Sol 22 20:00', title: '📡 Explicit Comms & Self-Advocacy Workshop', desc: 'Practical rules, double-empathy debugging, and workspace design.' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '8px 10px' }}>
                        <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00f0ff', display: 'block' }}>{item.time}</span>
                        <strong style={{ fontSize: '0.68rem', color: '#fff', fontFamily: 'monospace', display: 'block', margin: '2px 0' }}>{item.title}</strong>
                        <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)', display: 'block', lineHeight: 1.2 }}>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Citizen check-in */}
                <div className="bubbly-panel" style={{ padding: '14px' }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#00f0ff', fontWeight: 'bold', display: 'block', borderBottom: '1px dashed rgba(255, 255, 255, 0.08)', paddingBottom: '6px', marginBottom: '8px' }}>
                    👥 REGISTER PRESENCE IN THE GROVE
                  </span>

                  <form onSubmit={handleRegisterMeetup} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input 
                      type="text"
                      placeholder="[ ENTER CITIZEN HANDLE... ]"
                      value={meetupName}
                      onChange={(e) => setMeetupName(e.target.value)}
                      style={{
                        padding: '8px 10px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '0.68rem',
                        fontFamily: 'monospace',
                        outline: 'none'
                      }}
                    />

                    <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'block' }}>
                      SELECT SPECIALTY PARK ROLE BADGE:
                    </span>

                    <div className="signup-grid">
                      {[
                        { id: 'architect', label: '🛠️ Systems Architect' },
                        { id: 'guard', label: '🌿 Sensory Guard' },
                        { id: 'communicator', label: '📡 Explicit Comms' },
                        { id: 'sports', label: '🏃 Sports Org' }
                      ].map(badge => (
                        <button
                          key={badge.id}
                          type="button"
                          onClick={() => setSpecialtyBadge(badge.id)}
                          className={`badge-btn ${specialtyBadge === badge.id ? 'active' : ''}`}
                        >
                          {badge.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={!meetupName.trim()}
                      className="hud-btn"
                      style={{
                        padding: '6px',
                        fontSize: '0.62rem',
                        borderColor: '#00f0ff',
                        color: '#00f0ff',
                        background: 'rgba(0, 240, 255, 0.05)',
                        opacity: meetupName.trim() ? 1 : 0.4,
                        cursor: meetupName.trim() ? 'pointer' : 'not-allowed'
                      }}
                    >
                      [ ➕ CHECK-IN TO CAMPFIRE ]
                    </button>
                  </form>

                  {registrationMessage && (
                    <div style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#00f0ff', textAlign: 'center', marginTop: '8px' }}>
                      {registrationMessage}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Dynamic Logbook Feed & Pledging */}
              <div className="museum-right-diagnostics custom-scroll" style={{ flex: 1.9, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="bubbly-panel" style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '200px' }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#00f0ff', fontWeight: 'bold', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                    📡 COMMUNITY LOGBOOK & CHAT TRANSCRIPT
                  </span>

                  <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                    {[
                      { name: 'Ephraim Becker', msg: 'Just adjusted the park spotlights near the reflection pond to a low-glare warm frequency. Monotropic focus layers feel nominal! 🦆', sol: 'Sol 08' },
                      { name: 'Sarah K.', msg: 'Organizing a low-gravity frisbee match on the East Lawn next Sol! Simple direct rules, zero pressure, sensory quiet. Who is in?', sol: 'Sol 11' },
                      { name: 'Marcus V.', msg: 'I really appreciate the explicit verbal check-in sheets we established for the engineering core. It cut double-empathy desync in half!', sol: 'Sol 13' },
                      ...registeredCitizens.slice(3).map(cit => {
                        const badgeLabel = 
                          cit.badge === 'architect' ? 'Systems Architect' :
                          cit.badge === 'guard' ? 'Sensory Guard' :
                          cit.badge === 'communicator' ? 'Explicit Communicator' : 'Sports Organizer';
                        return {
                          name: cit.name,
                          msg: `Just checked in as a ${badgeLabel}! Let's build explicit bridges! 👥`,
                          sol: 'Sol 14 (Just Now)'
                        };
                      })
                    ].map((chat, idx) => (
                      <div key={idx} style={{ fontSize: '0.68rem', borderBottom: '1px dashed rgba(255,255,255,0.03)', paddingBottom: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                          <strong style={{ color: '#00f0ff', fontFamily: 'monospace' }}>{chat.name}</strong>
                          <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)' }}>{chat.sol}</span>
                        </div>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.78)', lineHeight: 1.35 }}>{chat.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

const LEXICON_ITEMS = exhibitData.lexiconItems;
