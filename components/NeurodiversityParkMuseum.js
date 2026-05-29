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

export default function NeurodiversityParkMuseum({ defaultSector = 'foyer' }) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeSector, setActiveSector] = useState(defaultSector);
  const [activeExhibitIndex, setActiveExhibitIndex] = useState(0); // 0 to 6 for Exhibits 1-7
  const [activeStoryPhase, setActiveStoryPhase] = useState(0); // 0 to 4 for Memoir Phases 01-05
  const [activeMatrixTrait, setActiveMatrixTrait] = useState('stimming'); // 'stimming', 'hyperfocus', 'comms', 'autonomy'
  const [activeSimTab, setActiveSimTab] = useState('comms'); // 'comms', 'sensory', 'masking'
  const [analogyTheme, setAnalogyTheme] = useState('tech'); // 'tech', 'rpg', 'nature', 'sports'
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [passportId, setPassportId] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const [transitState, setTransitState] = useState('slide-active');
  const [activeStarNode, setActiveStarNode] = useState(null); // Selected Lexicon Term object
  
  // Completed Mission Tasks states
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
  const [specialtyBadge, setSpecialtyBadge] = useState('architect'); // 'architect', 'guard', 'communicator', 'sports'
  const [registeredCitizens, setRegisteredCitizens] = useState([
    { name: 'Ephraim Becker', badge: 'architect' },
    { name: 'Sarah K.', badge: 'guard' },
    { name: 'Marcus V.', badge: 'communicator' }
  ]);
  const [registrationMessage, setRegistrationMessage] = useState('');

  // Double Empathy Tuner States
  const [signalNT, setSignalNT] = useState(40);
  const [signalND, setSignalND] = useState(80);
  const [isSyncLocked, setIsSyncLocked] = useState(false);

  // Share details
  const shareText = "Gather around the campfire circle at the Ares City Park. Let's socialize, hang out, and adapt mutual neurotype communication bridges: ";

  useEffect(() => {
    setIsMounted(true);
    setPassportId(Math.round(Math.random() * 90000) + 10000);
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  // Update activeSector when prop changes (for direct sublist teleporting)
  useEffect(() => {
    if (defaultSector && defaultSector !== activeSector) {
      setActiveSector(defaultSector);
    }
  }, [defaultSector]);

  // Synchronize router paths natively on activeSector changes
  const changeSector = (sector) => {
    if (activeSector === sector) return;
    setTransitState('slide-left');
    
    // Perform soft router URL change
    if (sector === 'meetup') {
      router.push('/neurodiversity');
    } else {
      router.push('/park');
    }

    setTimeout(() => {
      setActiveSector(sector);
      setTransitState('slide-right');
      setTimeout(() => {
        setTransitState('slide-active');
      }, 50);
    }, 200);
  };

  // Register changesector listener from map drawer
  useEffect(() => {
    const handleSectorChangeRequest = (e) => {
      if (e.detail) {
        changeSector(e.detail);
      }
    };
    window.addEventListener('changesector', handleSectorChangeRequest);
    return () => {
      window.removeEventListener('changesector', handleSectorChangeRequest);
    };
  }, [activeSector]);

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

  // Check if NT and ND signals are aligned
  useEffect(() => {
    const diff = Math.abs(signalNT - signalND);
    if (diff <= 2 && signalNT >= 45 && signalNT <= 55) {
      setIsSyncLocked(true);
    } else {
      setIsSyncLocked(false);
    }
  }, [signalNT, signalND]);

  // 5 Refined Exhibits definitions
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
          font-size: 0.68rem;
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
          borderColor: rgba(0, 255, 136, 0.4);
          color: #00ff88;
          background: rgba(0, 255, 136, 0.04);
        }
        .museum-nav-btn.active {
          borderColor: #00ff88;
          color: #00ff88;
          background: rgba(0, 255, 136, 0.12);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.2), inset 0 1px 3px rgba(0, 255, 136, 0.1);
          text-shadow: 0 0 6px rgba(0, 255, 136, 0.5);
        }
        .museum-nav-btn.active-blue {
          borderColor: #00f0ff !important;
          color: #00f0ff !important;
          background: rgba(0, 240, 255, 0.12) !important;
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.2), inset 0 1px 3px rgba(0, 240, 255, 0.1) !important;
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.5) !important;
        }
        .museum-nav-btn.active-blue:hover {
          borderColor: rgba(0, 240, 255, 0.4) !important;
          color: #00f0ff !important;
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
          background: rgba(0, 255, 136, 0.15);
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 136, 0.4);
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
            onClick={() => changeSector('foyer')} 
            className={`museum-nav-btn ${activeSector === 'foyer' ? 'active' : ''}`}
          >
            🛰️ Entrance Plaza
          </button>
          <button 
            onClick={() => changeSector('corridor')} 
            className={`museum-nav-btn ${activeSector === 'corridor' ? 'active' : ''}`}
          >
            🖼️ Synergy Boardwalk
          </button>
          <button 
            onClick={() => changeSector('constellation')} 
            className={`museum-nav-btn ${activeSector === 'constellation' ? 'active' : ''}`}
          >
            🌌 Lexicon Pavilion
          </button>
          <button 
            onClick={() => changeSector('sanctuary')} 
            className={`museum-nav-btn ${activeSector === 'sanctuary' ? 'active' : ''}`}
          >
            🌿 Sanctuary Gardens
          </button>
          <button 
            onClick={() => changeSector('meetup')} 
            className={`museum-nav-btn ${activeSector === 'meetup' ? 'active-blue' : ''}`}
          >
            👥 Meetup & Advocacy
          </button>
        </div>

        {/* Dynamic Sector Rendering */}
        <div className="museum-view-corridor">
          
          {/* ====================================
              LOBBY / FOYER SECTOR (Park Entrance Plaza)
              ==================================== */}
          {activeSector === 'foyer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', margin: '0 auto', maxWidth: '800px', textAlign: 'center', justifyContent: 'center' }}>
              <div className="bubbly-panel">
                <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                  // ARES CITY PARK // SOCIAL PLAZA SEC-9 // CITIZEN CONNECTIONS NOMINAL
                </span>
                <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.6rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                  Ares City Park Entrance Plaza
                </h1>
                <h3 style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#00ff88', fontWeight: 500, letterSpacing: '1px', marginBottom: '16px' }}>
                  OUTDOOR MARTIAN REFUGE, SOCIAL AXIS, & LAWNS
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#8a9bb5', lineHeight: '1.7', margin: '0 0 20px 0', textAlign: 'justify' }}>
                  Welcome, Citizen. Ares City Park is our premier outdoor biodome sanctuary. Under this soaring synthetic sky-canopy, colony inhabitants hang out, relax on grass lawns, play low-gravity dome-sports, and build deep social bonds. Rather than medicalizing differences, this park celebrates diverse cognitive wiring as natural, vital variations that strengthen our collective colony's survival and happiness.
                </p>
                <p style={{ fontSize: '0.86rem', color: '#8a9bb5', lineHeight: '1.7', margin: '0 0 24px 0', textAlign: 'justify' }}>
                  Stroll the **Community Synergy Boardwalk** to explore plural minds, or head directly to the **Neurodiversity Meetup & Advocacy Spot** to hang out with fellow advocates, play outdoor sports, and sync mutual communication bridges!
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => changeSector('meetup')} 
                    className="hud-btn" 
                    style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#00f0ff', color: '#00f0ff', background: 'rgba(0, 240, 255, 0.08)' }}
                  >
                    [ 👥 JOIN THE NEURODIVERSITY MEETUP & ADVOCACY ]
                  </button>
                  <button 
                    onClick={() => changeSector('corridor')} 
                    className="hud-btn"
                  >
                    [ 🖼️ STROLL THE SYNERGY BOARDWALK ]
                  </button>
                  <button onClick={() => changeSector('constellation')} className="hud-btn">
                    [ 🌌 VISIT THE LEXICON PAVILION ]
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ====================================
              THE SYNERGY BOARDWALK SECTOR
              ==================================== */}
          {activeSector === 'corridor' && (() => {
            const currentExhibit = exhibits[activeExhibitIndex];
            const isCustomMatrix = currentExhibit.component === 'custom-matrix';
            const isCustomRealLife = currentExhibit.component === 'custom-real-life';
            const isCustomAccommodation = currentExhibit.component === 'custom-accommodation';
            const isCustomFuture = currentExhibit.component === 'custom-future';
            const isCustomStory = currentExhibit.component === 'custom-story';

            const allTasksCompleted = !currentExhibit.missionTasks || currentExhibit.missionTasks.every((_, idx) => completedTasks[`${currentExhibit.id}_${idx}`]);
            const nextDisabled = activeExhibitIndex === exhibits.length - 1 || !allTasksCompleted;

            return (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', minHeight: 0, height: '100%', width: '100%' }}>
                
                {/* 📡 COMMUNICATION & COLLABORATION MODE SELECTOR BAR */}
                <div className="bubbly-panel mode-selector-panel" style={{ flexShrink: 0, padding: '12px 18px', border: '1.5px solid rgba(0, 255, 136, 0.2)', background: 'rgba(6, 9, 20, 0.72)', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        📡 CHOOSE ORIENTATION COLLABORATION LENS (COGNITIVE MODEL DECK)
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => setReduceMotion(!reduceMotion)}
                          style={{
                            padding: '2px 8px',
                            fontSize: '0.54rem',
                            fontFamily: 'monospace',
                            borderColor: reduceMotion ? '#00f0ff' : 'rgba(255, 255, 255, 0.12)',
                            background: reduceMotion ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0,0,0,0.3)',
                            color: reduceMotion ? '#00f0ff' : 'rgba(255,255,255,0.6)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            outline: 'none'
                          }}
                        >
                          {reduceMotion ? '⚡ MOTION: REDUCED' : '🏃 MOTION: FLUID'}
                        </button>
                        <span style={{ fontSize: '0.54rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.45)' }}>
                          ACTIVE UPLINK: {analogyTheme.toUpperCase()} MODE
                        </span>
                      </div>
                    </div>
                    
                    <div className="mode-btn-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {[
                        { id: 'tech', label: '⚙️ Technical Kernel', desc: 'Processes as OS kernels, CPU allocation, & cross-play APIs' },
                        { id: 'rpg', label: '🎮 Narrative RPG Spec', desc: 'Processes as character classes, talent trees, & party synergy' },
                        { id: 'nature', label: '🌿 Spatial Ecosystem', desc: 'Processes as plant adaptations, biomes, & permacultures' },
                        { id: 'sports', label: '🏆 Tactical Athletic', desc: 'Processes as athletic profiles, specialist roles, & field setups' }
                      ].map(theme => (
                        <button
                          key={theme.id}
                          onClick={() => setAnalogyTheme(theme.id)}
                          title={theme.desc}
                          style={{
                            padding: '6px 4px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            background: analogyTheme === theme.id ? 'rgba(0, 255, 136, 0.12)' : 'rgba(0,0,0,0.4)',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: analogyTheme === theme.id ? '#00ff88' : 'rgba(255,255,255,0.06)',
                            color: analogyTheme === theme.id ? '#00ff88' : 'rgba(255,255,255,0.6)',
                            outline: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2px'
                          }}
                        >
                          <strong style={{ fontSize: '0.62rem', fontFamily: 'var(--font-tech)' }}>{theme.label}</strong>
                          <span style={{ fontSize: '0.48rem', fontFamily: 'monospace', opacity: 0.7, textAlign: 'center', display: 'block', lineHeight: '1.2' }}>{theme.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Left and Right Panes Row */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: '20px', minHeight: 0, height: '100%', width: '100%' }}>

                  {/* LEFT PANEL CARD */}
                  <div className="bubbly-panel museum-left-feed" style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '12px', minHeight: 0, padding: '16px' }}>
                    
                    {/* Status Header Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed rgba(255, 255, 255, 0.08)', paddingBottom: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1px' }}>
                        // SYNERGY BOARDWALK TRAIL // STATION-0{activeExhibitIndex + 1}
                      </span>
                      <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.45)' }}>
                        STATUS: ACTIVE_NOMINAL
                      </span>
                    </div>

                    {/* Scrollable Middle Frame */}
                    <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
                      <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px', marginTop: '4px' }}>
                        {currentExhibit.title}
                      </h3>
                      <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', display: 'block', marginBottom: '8px' }}>
                        {currentExhibit.subtitle}
                      </span>
                      
                      <p style={{ fontSize: '0.78rem', color: '#8a9bb5', lineHeight: 1.45, margin: 0, textAlign: 'justify' }}>
                        {currentExhibit.desc}
                      </p>

                      {/* Colony Orientation Mission Tasks Checklist */}
                      {currentExhibit.missionTasks && currentExhibit.missionTasks.length > 0 && (
                        <div style={{ 
                           marginTop: '12px', 
                           background: 'rgba(0, 255, 136, 0.02)', 
                           border: '1.5px dashed rgba(0, 255, 136, 0.25)', 
                           borderRadius: '8px', 
                           padding: '12px',
                           display: 'flex',
                           flexDirection: 'column',
                           gap: '8px',
                           boxSizing: 'border-box'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed rgba(0, 255, 136, 0.15)', paddingBottom: '6px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: '#00ff88', fontWeight: 'bold', letterSpacing: '1px' }}>
                              🛰️ COOPERATIVE DOME MISSION DIRECTIVES
                            </span>
                            <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.5)' }}>
                              PROGRESS: {
                                currentExhibit.missionTasks.filter((_, idx) => completedTasks[`${currentExhibit.id}_${idx}`]).length
                              } / {currentExhibit.missionTasks.length} SECURED
                            </span>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {currentExhibit.missionTasks.map((task, idx) => {
                              const isChecked = !!completedTasks[`${currentExhibit.id}_${idx}`];
                              return (
                                <div 
                                  key={idx}
                                  onClick={() => toggleTask(currentExhibit.id, idx)}
                                  className={`protocol-toggle-badge ${isChecked ? 'active' : ''}`}
                                  style={{ 
                                    padding: '8px 10px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '10px', 
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    border: isChecked ? '1.5px solid #00ff88' : '1px solid rgba(255,255,255,0.06)',
                                    background: isChecked ? 'rgba(0, 255, 136, 0.06)' : 'rgba(0,0,0,0.2)',
                                    borderRadius: '6px'
                                  }}
                                >
                                  <span style={{ 
                                    fontSize: '0.72rem',
                                    fontFamily: 'monospace',
                                    color: isChecked ? '#00ff88' : 'rgba(255,255,255,0.3)',
                                    fontWeight: 'bold'
                                  }}>
                                    {isChecked ? '[ ☑ ]' : '[ ☐ ]'}
                                  </span>
                                  <span style={{ 
                                    fontSize: '0.68rem', 
                                    fontFamily: 'monospace',
                                    color: isChecked ? '#fff' : 'rgba(255,255,255,0.7)',
                                    textDecoration: isChecked ? 'line-through' : 'none',
                                    opacity: isChecked ? 0.75 : 1,
                                    lineHeight: 1.3
                                  }}>
                                    {task}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {!isCustomStory && !isCustomRealLife && !isCustomMatrix && !isCustomAccommodation && !isCustomFuture && (
                        <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px', marginTop: '6px' }}>
                          <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '4px' }}>
                            // CHOSEN LENS COOPERATION FEED
                          </span>
                          <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.45, margin: 0, textAlign: 'justify' }}>
                            {activeExhibitIndex === 0 && (
                              analogyTheme === 'tech' ? "System architecture reframed. Diversity is modeled as a functional feature of plural processors coexisting on the same server network." :
                              analogyTheme === 'rpg' ? "Guild classes unlocked. Success is modeled as a balanced cooperative raid party utilizing diverse specialized classes." :
                              analogyTheme === 'nature' ? "Ecosystem fitness secured. Vitality is modeled as biodiverse species adapting to custom soil micro-climates." :
                              "Team roster optimized. Victory is modeled as sprinters, powerlifters, and marathoners training in their native domains."
                            )}
                            {activeExhibitIndex === 2 && "The legacy pathology model did not develop in a vacuum. It was historically shaped to enforce uniformity during the industrial revolution, segregating differences into psychiatry locking boxes, tracked rooms, and behavior modifiers."}
                          </p>
                        </div>
                      )}

                      {isCustomRealLife && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(0, 255, 136, 0.02)', border: '1px solid rgba(0, 255, 136, 0.08)', borderRadius: '8px', padding: '10px', marginTop: '6px' }}>
                          <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1px', display: 'block' }}>
                            // SELECT REAL-LIFE TELEMETRY SIMULATOR
                          </span>
                          <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, margin: '0 0 6px 0' }}>
                            Neurodivergent wiring manifests in specific processing dynamics. Select a simulator module below to engage the interactive coordinates in the right-hand console:
                          </p>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <button 
                              onClick={() => setActiveSimTab('comms')} 
                              className={`protocol-toggle-badge ${activeSimTab === 'comms' ? 'active' : ''}`}
                              style={{ padding: '6px 10px' }}
                            >
                              <span style={{ fontSize: '0.75rem' }}>📡</span>
                              <div style={{ textAlign: 'left' }}>
                                <strong style={{ fontSize: '0.64rem', color: activeSimTab === 'comms' ? '#00ff88' : '#fff' }}>I. Communication Mismatch</strong>
                                <span style={{ display: 'block', fontSize: '0.54rem', color: 'rgba(255,255,255,0.45)' }}>Double Empathy & Signal Phase Mismatches</span>
                              </div>
                            </button>

                            <button 
                              onClick={() => setActiveSimTab('sensory')} 
                              className={`protocol-toggle-badge ${activeSimTab === 'sensory' ? 'active' : ''}`}
                              style={{ padding: '6px 10px' }}
                            >
                              <span style={{ fontSize: '0.75rem' }}>🚨</span>
                              <div style={{ textAlign: 'left' }}>
                                <strong style={{ fontSize: '0.64rem', color: activeSimTab === 'sensory' ? '#00ff88' : '#fff' }}>II. Sensory Spotlight</strong>
                                <span style={{ display: 'block', fontSize: '0.54rem', color: 'rgba(255,255,255,0.45)' }}>Monotropic Flow Channels & Overstimulation</span>
                              </div>
                            </button>

                            <button 
                              onClick={() => setActiveSimTab('masking')} 
                              className={`protocol-toggle-badge ${activeSimTab === 'masking' ? 'active' : ''}`}
                              style={{ padding: '6px 10px' }}
                            >
                              <span style={{ fontSize: '0.75rem' }}>🔋</span>
                              <div style={{ textAlign: 'left' }}>
                                <strong style={{ fontSize: '0.64rem', color: activeSimTab === 'masking' ? '#00ff88' : '#fff' }}>III. Masking & Burnout</strong>
                                <span style={{ display: 'block', fontSize: '0.54rem', color: 'rgba(255,255,255,0.45)' }}>Nervous System Reactor Battery & Stresses</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Bottom Nav Bar inside left feed */}
                    <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.08)', paddingTop: '10px', flexShrink: 0 }}>
                      <div className="gallery-nav-buttons-deck" style={{ margin: 0, background: 'transparent', border: 'none', padding: 0 }}>
                        <button 
                          onClick={() => { setActiveExhibitIndex(prev => Math.max(0, prev - 1)); }}
                          disabled={activeExhibitIndex === 0}
                          className="gallery-arrow-btn"
                          style={{ padding: '4px 10px', fontSize: '0.64rem' }}
                        >
                          ◀ PREV STATION
                        </button>
                        <span style={{ fontSize: '0.64rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.45)', fontWeight: 'bold' }}>
                          [ STATION 0{activeExhibitIndex + 1} / 0{exhibits.length} ]
                        </span>
                        <button 
                          onClick={() => { setActiveExhibitIndex(prev => Math.min(exhibits.length - 1, prev + 1)); }}
                          disabled={nextDisabled}
                          className="gallery-arrow-btn"
                          style={{ 
                            padding: '4px 10px', 
                            fontSize: '0.64rem',
                            opacity: nextDisabled ? 0.35 : 1,
                            textShadow: nextDisabled ? 'none' : '0 0 8px #00ff88'
                          }}
                        >
                          NEXT STATION ▶
                        </button>
                      </div>
                      
                      {!allTasksCompleted && (
                        <div style={{ 
                          fontSize: '0.54rem', 
                          fontFamily: 'monospace', 
                          color: '#ffb300', 
                          textAlign: 'center', 
                          marginTop: '8px', 
                          letterSpacing: '0.5px', 
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}>
                          <span>⚠️ COMPLETE STATION MISSION TASKS TO UNLOCK TELEMETRY PROGRESSION</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* RIGHT PANE: Interactive Simulation Panel */}
                  <div className="museum-right-diagnostics custom-scroll">
                    
                    {!isCustomMatrix && !isCustomRealLife && !isCustomAccommodation && !isCustomFuture && !isCustomStory && (
                      typeof currentExhibit.component === 'object' 
                        ? cloneElement(currentExhibit.component, { reduceMotion }) 
                        : currentExhibit.component
                    )}

                    {isCustomMatrix && (() => {
                      const trait = matrixTraits[activeMatrixTrait];
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <ExhibitMatrixVisualization activeTrait={activeMatrixTrait} reduceMotion={reduceMotion} />

                          <div className="bubbly-panel" style={{ gap: '14px' }}>
                            <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1px' }}>
                              // INTERACTIVE MATRIX TERMINAL: SELECT TRAIT PARAMETER
                            </span>
                            
                            <div className="trait-select-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                              {Object.keys(matrixTraits).map(key => (
                                <button
                                  key={key}
                                  onClick={() => setActiveMatrixTrait(key)}
                                  className={`trait-select-btn ${activeMatrixTrait === key ? 'active' : ''}`}
                                >
                                  {matrixTraits[key].title}
                                </button>
                              ))}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ background: 'rgba(234, 67, 53, 0.02)', borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(234, 67, 53, 0.18)', borderRadius: '8px', padding: '14px' }}>
                                <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.72rem', color: '#ea4335', marginBottom: '6px' }}>
                                  {trait.pathologyTitle}
                                </strong>
                                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5, textAlign: 'justify' }}>
                                  {trait.pathologyText}
                                </p>
                              </div>

                              <div style={{ background: 'rgba(0, 255, 136, 0.02)', borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(0, 255, 136, 0.22)', borderRadius: '8px', padding: '14px' }}>
                                <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.72rem', color: '#00ff88', marginBottom: '6px' }}>
                                  {trait.affirmingTitle}
                                </strong>
                                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5, textAlign: 'justify' }}>
                                  {trait.affirmingText}
                                </p>
                              </div>

                              <div style={{ background: 'rgba(0, 240, 255, 0.04)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(0, 240, 255, 0.15)', borderRadius: '8px', padding: '10px 14px' }}>
                                <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.62rem', color: '#00f0ff', marginBottom: '2px', letterSpacing: '0.5px' }}>
                                  💡 DOME SYSTEM RULE FOR EXPLICIT ACCOMMODATION
                                </strong>
                                <span style={{ fontSize: '0.7rem', color: '#fff', lineHeight: 1.4, display: 'block' }}>
                                  {trait.colonyRule}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {isCustomRealLife && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {activeSimTab === 'comms' && <DoubleEmpathySync reduceMotion={reduceMotion} />}
                        {activeSimTab === 'sensory' && <MonotropicSpotlight reduceMotion={reduceMotion} />}
                        {activeSimTab === 'masking' && <MaskingDiagnostics reduceMotion={reduceMotion} />}
                      </div>
                    )}

                    {isCustomAccommodation && <EnvironmentalTransition reduceMotion={reduceMotion} />}
                    {isCustomFuture && <ExhibitMartianBiosphere reduceMotion={reduceMotion} />}

                    {isCustomStory && (() => {
                      const phase = storyPhases[activeStoryPhase];
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <ExhibitMemoirCrystalMap activePhase={activeStoryPhase} setActivePhase={setActiveStoryPhase} reduceMotion={reduceMotion} />

                          <div className="bubbly-panel" style={{ gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                              <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#00ff88', fontWeight: 'bold' }}>
                                {phase.phaseName}
                              </span>
                              <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>
                                NARRATOR FEED LOCATED
                              </span>
                            </div>

                            <p className="story-text-body" style={{ fontSize: '0.76rem', lineHeight: '1.45', margin: 0 }}>
                              {phase.storyText}
                            </p>

                            {phase.abaLink && (
                              <a 
                                href="https://youtu.be/gB_RJ0lRQ-E?si=MzVT-AhfMmZWU98K" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="social-link-port"
                                style={{
                                  marginTop: '10px',
                                  borderWidth: '1px',
                                  borderStyle: 'solid',
                                  borderColor: '#ffb300',
                                  color: '#ffb300',
                                  background: 'rgba(255, 179, 0, 0.04)',
                                  width: 'fit-content'
                                }}
                              >
                                📺 View Historical ABA Video ➔
                              </a>
                            )}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                              onClick={() => { setActiveStoryPhase(prev => Math.max(0, prev - 1)); }}
                              disabled={activeStoryPhase === 0}
                              className="hud-btn"
                              style={{ padding: '6px 12px', fontSize: '0.62rem', opacity: activeStoryPhase === 0 ? 0.3 : 1 }}
                            >
                              [ ↩ PREVIOUS CHAPTER ]
                            </button>
                            <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>
                              CHAPTER Segment 0{activeStoryPhase + 1} / 05
                            </span>
                            <button
                              onClick={() => { setActiveStoryPhase(prev => Math.min(storyPhases.length - 1, prev + 1)); }}
                              disabled={activeStoryPhase === storyPhases.length - 1}
                              className="hud-btn"
                              style={{ padding: '6px 12px', fontSize: '0.62rem', opacity: activeStoryPhase === storyPhases.length - 1 ? 0.3 : 1 }}
                            >
                              [ FORWARD CHAPTER ➔ ]
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ====================================
              LEXICON PAVILION SECTOR (Open-Air Pavilion)
              ==================================== */}
          {activeSector === 'constellation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', minHeight: 0, height: '100%', position: 'relative' }}>
              <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  🌌 Lexicon Pavilion & Outdoor Amphitheater
                </h3>
                <p style={{ fontSize: '0.74rem', color: '#8a9bb5', lineHeight: 1.5, margin: 0 }}>
                  Under the artificial Martian redwoods, click on the glowing stars in this open-air holographic pavilion to unlock classified lexical telemetry. Review terms like unmasking, monotropism, and PDA to comprehend the autistic experiential software.
                </p>
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

                  {/* Nodes list */}
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
                      <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#00ff88', fontWeight: 'bold' }}>
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
              SANCTUARY & PLEDGE SECTOR (Sanctuary Gardens & Reflection Pond)
              ==================================== */}
          {activeSector === 'sanctuary' && (
            <div className="custom-scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', margin: '0 auto', maxWidth: '800px', height: '100%', padding: '10px 8px 40px 8px' }}>
              
              <div style={{ flexShrink: 0 }}>
                <BreathingRegulator />
              </div>

              {/* Colony Pledging Terminal */}
              <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  🛠️ Ares Colony Cognitive Citizen Pledge
                </h3>
                <p style={{ fontSize: '0.74rem', color: '#8a9bb5', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  Commit to de-pathologizing differences and building structural accommodations. Toggle the 3 colony protocols to print your verified security credentials:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  
                  <div 
                    onClick={() => togglePledge('destigmatize')} 
                    className={`protocol-toggle-badge ${pledges.destigmatize ? 'active' : ''}`}
                  >
                    <span style={{ fontSize: '1rem', color: '#00ff88' }}>{pledges.destigmatize ? '☑' : '☐'}</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.72rem', color: pledges.destigmatize ? '#00ff88' : '#fff' }}>
                        I. DE-STIGMATIZE CLINICAL TERMINOLOGY
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.64rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                        Commit to speaking of biological variations rather than clinical diseases, brokenness, or medical deficits.
                      </span>
                    </div>
                  </div>

                  <div 
                    onClick={() => togglePledge('accommodate')} 
                    className={`protocol-toggle-badge ${pledges.accommodate ? 'active' : ''}`}
                  >
                    <span style={{ fontSize: '1rem', color: '#00ff88' }}>{pledges.accommodate ? '☑' : '☐'}</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.72rem', color: pledges.accommodate ? '#00ff88' : '#fff' }}>
                        II. RESPECT REACTOR METRICS & SENSORY BATTERIES
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.64rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                        Adjust sensory triggers (sounds, flashes, compliance demands) and respect isolation recharging cycles without guilt.
                      </span>
                    </div>
                  </div>

                  <div 
                    onClick={() => togglePledge('explicitComms')} 
                    className={`protocol-toggle-badge ${pledges.explicitComms ? 'active' : ''}`}
                  >
                    <span style={{ fontSize: '1rem', color: '#00ff88' }}>{pledges.explicitComms ? '☑' : '☐'}</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.72rem', color: pledges.explicitComms ? '#00ff88' : '#fff' }}>
                        III. BRIDGES OF EXPLICIT COMMUNICATION
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.64rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                        Reject double-empathy guessing. Formulate direct, clear verbal expectations of boundaries, tasks, and energy.
                      </span>
                    </div>
                  </div>

                </div>

                {!passportGranted ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        placeholder="[ ENTER CITIZEN NAME... ]"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          background: 'rgba(4, 6, 12, 0.8)',
                          borderWidth: '1.5px',
                          borderStyle: 'solid',
                          borderColor: 'rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontFamily: 'monospace',
                          fontSize: '0.74rem',
                          outline: 'none'
                        }}
                      />
                      <button 
                        onClick={handleGeneratePassport} 
                        disabled={!citizenName.trim() || !allPledgesChecked}
                        className="hud-btn"
                        style={{
                          opacity: (citizenName.trim() && allPledgesChecked) ? 1 : 0.4,
                          cursor: (citizenName.trim() && allPledgesChecked) ? 'pointer' : 'not-allowed'
                        }}
                      >
                        [ ⚡ PRINT PASSPORT ]
                      </button>
                    </div>
                    {!allPledgesChecked && (
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#ffb300', textAlign: 'center' }}>
                        *ACTIVATE ALL 3 COLONY PROTOCOLS TO INITIALIZE PASSPORT GENERATOR
                      </span>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
                    
                    <div className="colony-passport-print-card">
                      <div style={{ position: 'absolute', top: '8px', left: '8px', width: '6px', height: '6px', borderTop: '2px solid #00ff88', borderLeft: '2px solid #00ff88' }}></div>
                      <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', borderTop: '2px solid #00ff88', borderRight: '2px solid #00ff88' }}></div>
                      <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '6px', height: '6px', borderBottom: '2px solid #00ff88', borderLeft: '2px solid #00ff88' }}></div>
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '6px', height: '6px', borderBottom: '2px solid #00ff88', borderRight: '2px solid #00ff88' }}></div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0, 255, 136, 0.3)', paddingBottom: '6px', marginBottom: '10px' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.5.rem', color: '#00ff88', fontWeight: 'bold' }}>ARES COLONY INTEGRITY SECURITY</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.5.rem', color: '#00ff88' }}>ID: {passportId || '-----'}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <svg viewBox="0 0 40 40" style={{ width: '45px', height: '45px', background: '#04060c', padding: '3px', borderRadius: '4px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#00ff88' }}>
                          <line x1="4" y1="5" x2="4" y2="35" stroke="#00ff88" strokeWidth="1.5" />
                          <line x1="8" y1="5" x2="8" y2="35" stroke="#00ff88" strokeWidth="0.8" />
                          <line x1="12" y1="5" x2="12" y2="35" stroke="#00ff88" strokeWidth="2.5" />
                          <line x1="18" y1="5" x2="18" y2="35" stroke="#00ff88" strokeWidth="0.5" />
                          <line x1="22" y1="5" x2="22" y2="35" stroke="#00ff88" strokeWidth="1.5" />
                          <line x1="28" y1="5" x2="28" y2="35" stroke="#00ff88" strokeWidth="3" />
                          <line x1="34" y1="5" x2="34" y2="35" stroke="#00ff88" strokeWidth="1" />
                        </svg>
                        
                        <div style={{ textAlign: 'left', fontFamily: 'monospace', fontSize: '0.62rem', color: '#fff', lineHeight: 1.5 }}>
                          <div>CITIZEN: <strong style={{ color: '#00ff88', textTransform: 'uppercase' }}>{citizenName}</strong></div>
                          <div>CLEARANCE: <span style={{ color: '#00ff88', fontWeight: 'bold' }}>CLASS-A ADVOCATOR</span></div>
                          <div>SECTOR DECK: <span style={{ color: '#00ff88' }}>ARES CITY PARK</span></div>
                          <div>STATUS: <strong style={{ color: '#00ff88', textShadow: '0 0 4px rgba(0,255,136,0.3)' }}>NOMINAL BRIDGE LOCKED</strong></div>
                        </div>
                      </div>

                      <div style={{ marginTop: '10px', paddingTop: '6px', borderTop: '1px dashed rgba(0, 255, 136, 0.3)', textAlign: 'center', fontSize: '0.48rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                        *COMMITTED TO DE-STIGMATIZING, ACCOMMODATING, & MUTUAL SYNC
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '6px' }}>
                      <button 
                        onClick={handleCopyLink} 
                        className="hud-btn" 
                        style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#00ff88', color: '#00ff88', fontSize: '0.65rem', background: copied ? 'rgba(0, 255, 136, 0.15)' : 'rgba(0, 255, 136, 0.04)' }}
                      >
                        {copied ? '[ ✓ PASSPORT SECURED ]' : '[ 📋 COPY CITIZEN TRANSMISSION LINK ]'}
                      </button>
                      <button onClick={() => { setPassportGranted(false); setCitizenName(''); }} className="hud-btn" style={{ fontSize: '0.65rem' }}>
                        [ ✕ RE-KEY CITIZEN ENTRY ]
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', width: '100%', maxWidth: '380px' }}>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="audio-deck-btn" style={{ textDecoration: 'none' }}>🔗 LinkedIn</a>
                      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="audio-deck-btn" style={{ textDecoration: 'none' }}>🐦 Twitter / X</a>
                    </div>

                  </div>
                )}

              </div>

            </div>
          )}

          {/* ====================================
              NEURODIVERSITY MEETUP & ADVOCACY SECTOR
              ==================================== */}
          {activeSector === 'meetup' && (
            <div className="museum-view-corridor" style={{ width: '100%', gap: '20px' }}>
              
              {/* Left Column: Meetup Scheduling Bulletin & Signup */}
              <div className="museum-left-feed" style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Grove Info */}
                <div className="bubbly-panel" style={{ padding: '16px' }}>
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00f0ff', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    // NEURODIVERSITY MEETUP & ADVOCACY // ACTIVE OUTDOOR HUB
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.92rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    Neurodiversity Meetup & Advocacy
                  </h3>
                  <p style={{ fontSize: '0.74rem', color: '#8a9bb5', lineHeight: 1.45, margin: 0, textAlign: 'justify' }}>
                    Welcome to the Neurodiversity Meetup & Advocacy Spot! Colony citizens hang out here to socialize, play low-gravity sports, share coffee, form mutual support groups, and establish explicit communication channels under the synthetic dome sky.
                  </p>
                </div>

                {/* Scheduling Board */}
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

                {/* Citizen Registration Widget */}
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

              {/* Right Column: Double Empathy Signal Sync Tuner & Chat Feed */}
              <div className="museum-right-diagnostics custom-scroll" style={{ flex: 1.9, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Double Empathy Tuner Component */}
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
                      {/* Midline crosshair */}
                      <line x1="5" y1="35" x2="235" y2="35" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      
                      {/* Wave 1: Neurotypical signal (Magenta/Pinkish) */}
                      {!isSyncLocked && (
                        <path 
                          d={`M 5,35 
                             Q 30,${35 - (signalNT - 50) * 0.5} 60,35 
                             T 120,35 
                             T 180,35 
                             T 235,35`} 
                          fill="none" 
                          stroke="#ff5722" 
                          strokeWidth="1.2" 
                          strokeDasharray={reduceMotion ? 'none' : '4 2'} 
                          style={{
                            animation: reduceMotion ? 'none' : 'dash 15s linear infinite'
                          }}
                        />
                      )}

                      {/* Wave 2: Neurodivergent signal (Amber) */}
                      {!isSyncLocked && (
                        <path 
                          d={`M 5,35 
                             Q 30,${35 + (signalND - 50) * 0.5} 60,35 
                             T 120,35 
                             T 180,35 
                             T 235,35`} 
                          fill="none" 
                          stroke="#ffb300" 
                          strokeWidth="1.2" 
                          style={{
                            opacity: 0.85
                          }}
                        />
                      )}

                      {/* Unified Synchronized Bridge locked wave (glowing cyan-green) */}
                      {isSyncLocked && (
                        <path 
                          d="M 5,35 Q 30,35 60,35 T 120,35 T 180,35 T 235,35" 
                          fill="none" 
                          stroke="#00ff88" 
                          strokeWidth="2.5" 
                          style={{
                            filter: 'drop-shadow(0 0 3px #00ff88)',
                            animation: reduceMotion ? 'none' : 'pulse-dot 1s infinite alternate'
                          }}
                        />
                      )}
                    </svg>
                  </div>

                  {/* Sliders Grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                    {/* Slider NT */}
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
                        style={{
                          flex: 1,
                          accentColor: '#ff5722',
                          cursor: isSyncLocked ? 'not-allowed' : 'pointer'
                        }}
                      />
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#fff', width: '30px', textAlign: 'right', flexShrink: 0 }}>
                        {signalNT}%
                      </span>
                    </div>

                    {/* Slider ND */}
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
                        style={{
                          flex: 1,
                          accentColor: '#ffb300',
                          cursor: isSyncLocked ? 'not-allowed' : 'pointer'
                        }}
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
                        style={{
                          borderColor: '#00f0ff',
                          color: '#00f0ff',
                          background: 'rgba(0, 240, 255, 0.06)',
                          fontSize: '0.62rem',
                          padding: '4px 12px'
                        }}
                      >
                        [ 📡 FORCE AUTO-SYNC CHANNELS ]
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSignalNT(40);
                          setSignalND(80);
                          setIsSyncLocked(false);
                        }}
                        className="hud-btn"
                        style={{
                          borderColor: '#ff5722',
                          color: '#ff5722',
                          background: 'rgba(255, 87, 34, 0.05)',
                          fontSize: '0.62rem',
                          padding: '4px 12px'
                        }}
                      >
                        [ ✕ BREAK SIGNAL SYNC ]
                      </button>
                    )}
                  </div>

                </div>

                {/* Live Colony Advocate Logs */}
                <div className="bubbly-panel" style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '160px' }}>
                  <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#00f0ff', fontWeight: 'bold', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                    📡 COMMUNITY LOGBOOK & CHAT TRANSCRIPT
                  </span>

                  <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                    {[
                      { name: 'Ephraim Becker', msg: 'Just adjusted the park spotlights near the duck pond to a low-glare warm HSL frequency. Monotropic focus layers feel nominal! 🦆', sol: 'Sol 08' },
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
