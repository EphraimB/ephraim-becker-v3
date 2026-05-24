'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CityGridMap from '../components/CityGridMap';

const DIALOG_NODES = {
  greeting: {
    title: "👋 1. GENERAL INTRODUCTION",
    text: "Welcome to my Citizen Suite! I'm Ephraim Becker. From my home in Cedarhurst on Earth, I'm linked as a Remote Cadet to Adelphi University, studying computer science and keeping my logic sharp with Calculus. What topic would you like to explore?",
    facts: [
      "👤 IDENTITY: Ephraim Becker",
      "🏫 EDUCATION: Computer Science Major (Adelphi University)",
      "🌍 LOCATION: Cedarhurst, Earth (linked as a Remote Cadet)",
      "🚴 HOBBIES: Biking, Sci-Fi, Music, and Flag Football"
    ],
    choices: [
      { text: "Go to Studies & Logic 🎓", next: "studies" },
      { text: "Explore Hobbies & Passions 🚴", next: "interests" }
    ],
    graphic: 'space'
  },
  studies: {
    title: "🎓 2. STUDIES & LOGIC",
    text: "Earthside, I study computer science, database structures, and discrete logic pathways. I also tackle Calculus to sync earthside engineering with Mars municipal grids. It keeps my logic sharp, even though my real passion remains building visual software and responsive interfaces.",
    facts: [
      "🎓 PROGRAM: Computer Science BS degree",
      "💾 FOCUS: Database indexing, algorithm structures",
      "📐 LOGIC SHARPENER: Calculus coordinate math",
      "🗺️ APPLICATIONS: Grid mapping & sector flows"
    ],
    choices: [
      { text: "◀ Back to Introduction", next: "greeting" },
      { text: "Explore Hobbies & Passions 🚴", next: "interests" },
      { text: "Go to Ares Warp Dock 🚀", next: "travel" }
    ],
    graphic: 'studies'
  },
  interests: {
    title: "🚴 3. HOBBIES & PASSIONS",
    text: "Select a hobby from the menu below to explore my personal interests, read factual details, and view interactive animations!",
    facts: [],
    choices: [],
    graphic: 'interests'
  },
  travel: {
    title: "🚀 4. ARES WARP DOCK",
    text: "Ready to depart the Citizen Suite? Select a dome coordinate below to trigger your hyperloop warp, or we can keep chatting!",
    facts: [
      "🛰️ COORD BASE: PENTHOUSE_A-02",
      "🚇 TRANSIT: Direct warp lines active",
      "🌐 NETWEIGHT: 2.0 (Suite Residence)",
      "🏙️ DESTINATIONS: Metropolis Hub, Portfolio, Biosphere, Quantum Net"
    ],
    choices: [
      { text: "◀ Back to Hobbies Hub", next: "interests" },
      { text: "🔄 Restart from Introduction", next: "greeting" }
    ],
    graphic: 'travel'
  }
};

const NODE_KEYS = ['greeting', 'studies', 'interests', 'travel'];

const HOBBIES_DATA = {
  tech: {
    title: "💻 HOBBY: TECH & CODING",
    text: "I got into technology because graphical user interfaces (GUIs) completely fascinated me! The idea of designing responsive, visual operating decks led me to coding. It's just so cool that I can build entirely new digital worlds from scratch. Now, I design interfaces for Ares City OS!",
    facts: [
      "🎨 PRIMARY PASSION: Graphical User Interfaces (GUIs)",
      "💡 INSPIRATION: Fascination with visual interactive decks",
      "⚙️ MOTIVATION: Sensation of creating functional software",
      "🌐 EXPERIENCE: HUD panels and Martian OS desktops"
    ],
    graphic: 'gui'
  },
  scifi: {
    title: "🎬 HOBBY: SCI-FI & FANTASY",
    text: "I am highly passionate about deep sci-fi and fantasy worldbuilding. I love watching futuristic cinematic universes, magical realms, and legendary space operas that spark my imagination.",
    facts: [
      "⚔️ STAR WARS: Appreciate space battles & lightsaber lore",
      "🪄 HARRY POTTER: Love magic systems & school worldbuilding",
      "💍 LORD OF THE RINGS: Deep respect for Tolkien's mythos",
      "⚡ BACK TO THE FUTURE: Fascinated by time-travel logic"
    ],
    graphic: 'scifi'
  },
  music: {
    steps: [
      {
        title: "🎹 MUSIC: CLASSICAL ORGAN (STEP 1/3)",
        text: "I am deeply passionate about music, spanning both classical compositions and modern pop. In the classical realm, the pipe organ is my absolute favorite instrument because of its grand mechanical power and architectural sound.",
        facts: [
          "🎵 MUSIC STYLE: Classical & Choral compositions",
          "🎹 FAV INSTRUMENT: The Pipe Organ (grand acoustics)",
          "🎼 MUSIC ROLE: Listening & structural arrangement",
          "🎤 ACTIVE WORK: Singing in a choir & karaoke fun"
        ],
        graphic: 'music_organ'
      },
      {
        title: "💿 MUSIC: POP ALBUMS (STEP 2/3)",
        text: "On the pop side of my collection, I love listening to complete pop albums. Artists like Taylor Swift and Noah Kahan are my top favorites—their lyrics and musical storytelling are incredibly engaging.",
        facts: [
          "💿 POP ALBUMS: Complete track listening sessions",
          "👸 TAYLOR SWIFT: Relatable narrative & lyricism",
          "🌲 NOAH KAHAN: Acoustic folk-pop arrangements",
          "🔊 PLAYBACK: Fully immersive album tracks"
        ],
        graphic: 'music_pop'
      },
      {
        title: "🎤 MUSIC: CHOIR & KARAOKE (STEP 3/3)",
        text: "Music isn't just a listening hobby for me—I also participate! I love singing in a choir, blending my voice in sync with others, and I always enjoy the fun and energy of performing karaoke.",
        facts: [
          "🗣️ CHORAL BLEND: Singing in harmony with groups",
          "🎤 KARAOKE DOCK: Solo vocal performance fun",
          "🥳 TEAMWORK: Feeling of singing together in sync",
          "🎶 RESONANCE: Grand classical and pop vocalization"
        ],
        graphic: 'music_choir'
      }
    ]
  },
  biking: {
    steps: [
      {
        title: "🚲 BIKING: FREEDOM & CYCLING (STEP 1/2)",
        text: "Biking is one of my favorite outdoor activities. What I love most is the sheer freedom it gives me—I don't have to rely on public transportation schedules. It's incredibly relaxing to cruise along dome pathways.",
        facts: [
          "🚲 CYCLE TYPE: Scenic road bike riding",
          "🔓 CORE VALUE: Not relying on public transportation",
          "🌿 RECREATION: Highly relaxing mental reset",
          "🚴 ROUTING: Active tracking of custom paths"
        ],
        graphic: 'biking_relax'
      },
      {
        title: "💨 BIKING: HEADWIND CHALLENGE (STEP 2/2)",
        text: "Biking is peaceful and relaxing—except when there is a strong headwind! Fighting against headwinds is a tough physical challenge that keeps my cardiovascular endurance sharp, even if it requires extra pedaling.",
        facts: [
          "💨 CHALLENGE: Headwind aerodynamic drag",
          "⚠️ WIND WARNING: Opposing wind vectors triggered",
          "🚴 EXERTION: Harder physical pedaling effort",
          "💪 CARDIO: Slogging through wind to stay fit"
        ],
        graphic: 'biking_wind'
      }
    ]
  },
  football: {
    title: "🏈 HOBBY: FLAG FOOTBALL",
    text: "I first saw how fun flag football was from watching cool games on YouTube! What hooked me was the team coordination—discussing strategic routes in huddles, moving in perfect sync as a team, and the absolute thrill of scoring a touchdown. Check out our 5v5 playbook huddle play below!",
    facts: [
      "🏈 SPORT STYLE: Co-ed 5v5 Flag Football",
      "🟢 GREEN TEAM: Offense (User's team, 3M / 2F)",
      "🔵 BLUE TEAM: Defense (Opponent team, 3M / 2F)",
      "🏃 STATIONS: WR1 target route running",
      "🧠 STRATEGY: Coordinated huddle planning"
    ],
    graphic: 'football'
  }
};

export default function CitizenSuite() {
  const router = useRouter();
  const [transitState, setTransitState] = useState('slide-active');
  const [currentNode, setCurrentNode] = useState('greeting');
  const [isWalking, setIsWalking] = useState(false);
  const [activeHobby, setActiveHobby] = useState('tech');
  const [hobbyStep, setHobbyStep] = useState(1);

  // Automatically reset step counter when transitioning nodes or sub-hobbies
  useEffect(() => {
    setHobbyStep(1);
  }, [currentNode, activeHobby]);

  // Synchronize entry transition classes
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

  // Keyboard navigation for dialogue nodes (Left/Right Arrows navigate chronologically)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      const currentIndex = NODE_KEYS.indexOf(currentNode);
      if (e.key === 'ArrowRight' && currentIndex < NODE_KEYS.length - 1) {
        setCurrentNode(NODE_KEYS[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentNode(NODE_KEYS[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentNode]);

  // Warp transitions for Travel Node sector COORDINATES links
  const handleWarpFromStep = (e, path, targetWeight) => {
    if (e) e.preventDefault();
    if (isWalking) return;
    setIsWalking(true);

    const workspace = document.querySelector('.os-workspace');
    const content = document.querySelector('.walking-content-container');

    if (workspace) workspace.classList.add('walking-transit-active');
    
    if (content) {
      const isHeadingLeft = targetWeight > 2; // Suite is weight 2
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('walk-direction', isHeadingLeft ? 'left' : 'right');
      }
      content.classList.add(isHeadingLeft ? 'slide-left' : 'slide-right');
      content.classList.remove('slide-active');
    }

    setTimeout(() => {
      router.push(path);
    }, 220);
  };

  const activeNode = DIALOG_NODES[currentNode] || DIALOG_NODES.greeting;

  // Resolve topic metrics dynamically (supporting consolidated nodes and interactive steps)
  const isHobbiesNode = currentNode === 'interests';
  let activeTitle = "";
  let activeText = "";
  let activeFacts = [];
  let activeGraphic = "";

  if (!isHobbiesNode) {
    activeTitle = activeNode.title;
    activeText = activeNode.text;
    activeFacts = activeNode.facts || [];
    activeGraphic = activeNode.graphic;
  } else {
    const hobby = HOBBIES_DATA[activeHobby] || HOBBIES_DATA.tech;
    if (hobby.steps) {
      const stepData = hobby.steps[hobbyStep - 1] || hobby.steps[0];
      activeTitle = stepData.title;
      activeText = stepData.text;
      activeFacts = stepData.facts || [];
      activeGraphic = stepData.graphic;
    } else {
      activeTitle = hobby.title;
      activeText = hobby.text;
      activeFacts = hobby.facts || [];
      activeGraphic = hobby.graphic;
    }
  }

  return (
    <div className="citizen-card-shell" style={{ flexDirection: 'column', overflow: 'visible' }}>
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Floating navigation map bubble (CityGridMap returns null globally per requirements) */}
      <div className="floating-nav-bubble">
        <CityGridMap />
      </div>

      {/* Spacious 2-Column Grid Centering Your Cutout & Speech Bubble */}
      <div 
        className={`walking-content-container homepage-grid ${transitState}`} 
        style={{ 
          overflow: 'visible',
          gridTemplateColumns: '210px min(580px, 62vw)', /* Shrunk spacer to bring bubble exactly next to mouth */
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        
        {/* Far-Left Column: Spatial gap overlaying the natural background cutout */}
        <div className="roomscale-profile-spacer" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}></div>

        {/* Right Column: Single High-Contrast Branching Stepper Speech Bubble */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 0, overflow: 'visible' }}>
          
          <div className="comic-speech-bubble" style={{ display: 'flex', flexDirection: 'column', minHeight: '305px', justifyContent: 'space-between' }}>
            
            {/* Stepper Header (Telemetry indicators) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.58rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.5px' }}>
                TRANSMITTING COORD: PENTHOUSE_A-02
              </span>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.55rem', color: 'rgba(0,0,0,0.4)' }}>
                TELEMETRY ACTIVE
              </span>
            </div>

            {/* Persistent Visual HUD Segmented Tab Bar */}
            <div style={{
              display: 'flex',
              background: 'rgba(0, 0, 0, 0.03)',
              borderRadius: '8px',
              padding: '2px',
              marginBottom: '14px',
              gap: '2px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              {NODE_KEYS.map((key) => {
                const isActive = key === currentNode;
                const labels = {
                  greeting: "👋 1. Intro",
                  studies: "🎓 2. Studies & Logic",
                  interests: "🚴 3. Hobbies Hub",
                  travel: "🚀 4. Ares Warp"
                };
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentNode(key)}
                    style={{
                      flex: 1,
                      minWidth: '76px',
                      padding: '6px 2px',
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-tech)',
                      fontWeight: 700,
                      textAlign: 'center',
                      border: 'none',
                      borderRadius: '6px',
                      background: isActive ? 'rgba(var(--color-accent-rgb), 0.1)' : 'transparent',
                      color: isActive ? 'var(--color-accent)' : 'rgba(0, 0, 0, 0.5)',
                      boxShadow: isActive ? 'inset 0 0 4px rgba(var(--color-accent-rgb), 0.15)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {labels[key]}
                  </button>
                );
              })}
            </div>

            {/* Stepper Body: Dynamic Branching Dialogue & Custom Vector Graphics */}
            <div 
              aria-live="polite" 
              style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}
            >
              
              {/* Biography Topic Title */}
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '8px', fontFamily: 'var(--font-tech)', letterSpacing: '0.5px' }}>
                {activeTitle}
              </h3>

              {/* Sub-selector row for Hobbies Node */}
              {isHobbiesNode && (
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  flexWrap: 'wrap',
                  marginBottom: '10px',
                  background: 'rgba(0, 0, 0, 0.02)',
                  padding: '4px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                  {[
                    { key: 'tech', label: "💻 Tech & GUIs" },
                    { key: 'scifi', label: "🚀 Sci-Fi" },
                    { key: 'music', label: "🎵 Music" },
                    { key: 'biking', label: "🚲 Biking" },
                    { key: 'football', label: "🏈 Football" }
                  ].map((hobby) => {
                    const isSelected = activeHobby === hobby.key;
                    return (
                      <button
                        key={hobby.key}
                        onClick={() => setActiveHobby(hobby.key)}
                        style={{
                          flex: '1 1 auto',
                          padding: '5px 8px',
                          fontSize: '0.62rem',
                          fontFamily: 'var(--font-tech)',
                          fontWeight: 700,
                          borderRadius: '6px',
                          border: 'none',
                          background: isSelected ? 'var(--color-accent)' : 'transparent',
                          color: isSelected ? '#fff' : 'rgba(0, 0, 0, 0.5)',
                          boxShadow: isSelected ? '0 0 6px rgba(var(--color-accent-rgb), 0.2)' : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {hobby.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Factual Narrative Paragraph */}
              <p style={{ fontSize: '0.82rem', lineHeight: '1.45', fontWeight: 500, color: 'rgba(0,0,0,0.78)', margin: '0 0 8px 0' }}>
                {activeText.split('Ephraim Becker').map((part, i, arr) => (
                  i === arr.length - 1 ? part : <span key={i}>{part}<strong>Ephraim Becker</strong></span>
                ))}
              </p>

              {/* Factual Bulleted Fact Board */}
              {activeFacts.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '5px',
                  marginTop: '4px',
                  marginBottom: '10px',
                  background: 'rgba(0, 0, 0, 0.02)',
                  borderLeft: '3.5px solid var(--color-accent)',
                  padding: '6px 12px',
                  borderRadius: '0 8px 8px 0'
                }}>
                  {activeFacts.map((fact, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        fontSize: '0.72rem', 
                        fontFamily: 'var(--font-tech)', 
                        color: 'rgba(0, 0, 0, 0.85)',
                        fontWeight: 700,
                        letterSpacing: '0.2px'
                      }}
                    >
                      {fact}
                    </div>
                  ))}
                </div>
              )}

              {/* DYNAMIC BESPOKE SVG GRAPHICS */}
              
              {/* Graphic 1: Space Telemetry & Planets (Intro) */}
              {activeGraphic === 'space' && (
                <svg viewBox="0 0 320 100" width="100%" height="95px" style={{ marginTop: '14px', background: 'radial-gradient(circle at center, #0a0d17 0%, #04060c 100%)', borderRadius: '10px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
                  <defs>
                    <linearGradient id="earthOcean" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1976d2" />
                      <stop offset="100%" stopColor="#0d47a1" />
                    </linearGradient>
                    <linearGradient id="marsDunes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d84315" />
                      <stop offset="100%" stopColor="#801313" />
                    </linearGradient>
                  </defs>

                  {/* Stars field */}
                  <circle cx="20" cy="20" r="0.6" fill="#fff" opacity="0.8" />
                  <circle cx="70" cy="15" r="0.8" fill="#fff" opacity="0.6" style={{ animation: 'blink-led 1.8s infinite' }} />
                  <circle cx="110" cy="30" r="0.5" fill="#fff" opacity="0.9" />
                  <circle cx="150" cy="15" r="0.8" fill="#ffb300" opacity="0.5" style={{ animation: 'blink-led 2s infinite' }} />
                  <circle cx="190" cy="25" r="0.6" fill="#fff" opacity="0.7" />
                  <circle cx="270" cy="20" r="0.8" fill="#fff" opacity="0.8" style={{ animation: 'blink-led 1.5s infinite' }} />
                  <circle cx="290" cy="35" r="0.5" fill="#fff" opacity="0.9" />
                  
                  <circle cx="40" cy="80" r="0.6" fill="#fff" opacity="0.9" />
                  <circle cx="85" cy="70" r="0.5" fill="#fff" opacity="0.6" />
                  <circle cx="130" cy="85" r="0.8" fill="#fff" opacity="0.8" style={{ animation: 'blink-led 2.2s infinite' }} />
                  <circle cx="210" cy="80" r="0.6" fill="#fff" opacity="0.8" />

                  {/* Nebulae */}
                  <ellipse cx="160" cy="50" rx="70" ry="25" fill="rgba(194, 89, 255, 0.04)" style={{ filter: 'blur(10px)' }} />
                  <ellipse cx="80" cy="40" rx="55" ry="20" fill="rgba(0, 240, 255, 0.03)" style={{ filter: 'blur(8px)' }} />

                  {/* Real Earth Globe */}
                  <g>
                    <circle cx="60" cy="50" r="23" fill="none" stroke="rgba(0, 240, 255, 0.22)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 3px rgba(0,240,255,0.4))' }} />
                    <circle cx="60" cy="50" r="21" fill="url(#earthOcean)" />
                    <path d="M 45,36 Q 52,38 54,42 Q 58,40 56,46 Q 52,48 55,54 Q 57,59 55,62 Q 52,65 48,68 Q 44,60 46,55 Q 49,50 45,45 Z" fill="#2e7d32" opacity="0.85" />
                    <path d="M 50,30 Q 56,29 55,33 Q 50,34 49,32 Z" fill="#e0f2f1" opacity="0.9" />
                    <path d="M 72,40 Q 75,44 78,43 L 80,48 Q 78,54 75,56 Q 73,50 71,46 Z" fill="#2e7d32" opacity="0.8" />
                    <path d="M 42,42 Q 52,35 68,44" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
                    <path d="M 46,56 Q 56,62 72,52" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
                    <path d="M 60,29 A 21 21 0 0 1 60,71 A 21 21 0 0 0 60,29 Z" fill="rgba(0,0,0,0.4)" />
                    <text x="60" y="53" fill="#ffffff" fontSize="6.5" fontFamily="var(--font-tech)" fontWeight={900} textAnchor="middle" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>EARTH</text>
                  </g>

                  {/* Real Mars Globe */}
                  <g>
                    <circle cx="260" cy="50" r="23" fill="none" stroke="rgba(255, 179, 0, 0.22)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 3px rgba(255,179,0,0.4))' }} />
                    <circle cx="260" cy="50" r="21" fill="url(#marsDunes)" />
                    <path d="M 250,42 Q 255,46 262,44 Q 268,48 266,54 Q 258,58 254,54 Q 248,50 248,46 Z" fill="#4e1d13" opacity="0.65" />
                    <path d="M 248,60 Q 258,62 266,59 Q 272,66 260,68 Z" fill="#4e1d13" opacity="0.55" />
                    <ellipse cx="260" cy="30" rx="7" ry="2.2" fill="#ffffff" opacity="0.95" style={{ filter: 'drop-shadow(0 0 1px #fff)' }} />
                    <ellipse cx="260" cy="70" rx="5" ry="1.5" fill="#ffffff" opacity="0.8" />
                    <path d="M 260,29 A 21 21 0 0 1 260,71 A 21 21 0 0 0 260,29 Z" fill="rgba(0,0,0,0.45)" />
                    <text x="260" y="53" fill="#ffffff" fontSize="6.5" fontFamily="var(--font-tech)" fontWeight={900} textAnchor="middle" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>MARS</text>
                  </g>

                  <line x1="84" y1="50" x2="236" y2="50" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="5 5" style={{ animation: 'signal-beam 2s linear infinite', filter: 'drop-shadow(0 0 2px #00f0ff)' }} />
                  <circle cx="160" cy="50" r="3.5" fill="#00ff88" style={{ animation: 'packet-glide 2s infinite linear', filter: 'drop-shadow(0 0 3px #00ff88)' }} />
                </svg>
              )}

              {/* Graphic 2: Custom glowing Martian OS GUI Mockup (tech sub-hobby) */}
              {activeGraphic === 'gui' && (
                <svg viewBox="0 0 320 95" width="100%" height="95px" style={{ marginTop: '14px', background: '#080b13', borderRadius: '10px', border: '1px solid rgba(0, 240, 255, 0.22)', boxShadow: 'inset 0 0 10px rgba(0,240,255,0.1)' }}>
                  <rect x="0" y="0" width="320" height="15" fill="#141a29" />
                  <circle cx="10" cy="7.5" r="3" fill="#ea4335" />
                  <circle cx="20" cy="7.5" r="3" fill="#ffb300" />
                  <circle cx="30" cy="7.5" r="3" fill="#00ff88" />
                  <text x="160" y="10.5" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="var(--font-tech)" textAnchor="middle">ARES_OS // DESKTOP_VIEWER</text>

                  {/* Left Desktop Folders */}
                  <g transform="translate(10, 24)">
                    <rect x="5" y="5" width="16" height="12" rx="2" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
                    <path d="M 5,5 L 11,5 L 13,8 L 21,8 L 21,17 L 5,17 Z" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
                    <text x="13" y="27" fill="rgba(255,255,255,0.6)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle">SYSTEMS</text>

                    <rect x="35" y="5" width="16" height="12" rx="2" fill="none" stroke="#2979ff" strokeWidth="1" />
                    <path d="M 35,5 L 41,5 L 43,8 L 51,8 L 51,17 L 35,17 Z" fill="none" stroke="#2979ff" strokeWidth="1" />
                    <text x="43" y="27" fill="rgba(255,255,255,0.6)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle">APPS</text>
                  </g>

                  {/* Right Telemetry Dial Graphs */}
                  <g transform="translate(110, 24)">
                    <circle cx="40" cy="25" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    <path d="M 40,9 A 16 16 0 0 1 56,25" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" />
                    <text x="40" y="28" fill="#fff" fontSize="5.5" fontFamily="var(--font-tech)" textAnchor="middle">85%</text>
                    <text x="40" y="49" fill="rgba(255,255,255,0.5)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle">GUI INTEREST</text>
                    
                    <circle cx="120" cy="25" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    <path d="M 120,9 A 16 16 0 1 1 104,25" fill="none" stroke="#00f0ff" strokeWidth="2.5" />
                    <text x="120" y="28" fill="#fff" fontSize="5.5" fontFamily="var(--font-tech)" textAnchor="middle">ONLINE</text>
                    <text x="120" y="49" fill="rgba(255,255,255,0.5)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle">WARP CORES</text>
                  </g>
                </svg>
              )}

              {/* Graphic 3: Calculus coordinate slopes grid (studies node) */}
              {activeGraphic === 'studies' && (
                <svg viewBox="0 0 300 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#0a0d17', borderRadius: '10px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194, 89, 255, 0.08)' }}>
                  <line x1="20" y1="38" x2="280" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                  <line x1="60" y1="10" x2="60" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                  
                  <path d="M 60,55 Q 120,-15 190,45 T 280,25" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" style={{ filter: 'drop-shadow(0 0 2px var(--color-accent))' }} />

                  <text x="70" y="22" fill="rgba(255,255,255,0.5)" fontSize="6.5" fontFamily="monospace">dy/dx = lim Δx-&gt;0 (Δy/Δx)</text>
                  <text x="180" y="60" fill="var(--color-accent)" fontSize="6.5" fontFamily="monospace">∫ f(x) dx</text>
                </svg>
              )}

              {/* Graphic 4: Sci-Fi & Fantasy holographic quadrant carousel */}
              {activeGraphic === 'scifi' && (
                <svg viewBox="0 0 320 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#0a0d17', borderRadius: '10px', border: '1px solid rgba(0, 240, 255, 0.15)', boxShadow: 'inset 0 0 8px rgba(0,240,255,0.06)' }}>
                  <line x1="80" y1="5" x2="80" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="160" y1="5" x2="160" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="240" y1="5" x2="240" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                  {/* Panel 1: STAR WARS */}
                  <g>
                    <line x1="30" y1="46" x2="36" y2="40" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="36" y1="40" x2="58" y2="18" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
                    <text x="40" y="64" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle" fontWeight={700}>STAR WARS</text>
                  </g>

                  {/* Panel 2: HARRY POTTER */}
                  <g>
                    <line x1="105" y1="46" x2="120" y2="31" stroke="#8d4a25" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M 120,31 L 123,21 L 120,31 L 130,31 L 120,31 L 117,41 L 120,31 L 110,31" fill="none" stroke="#ffe082" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 2px #ffe082)' }} />
                    <path d="M 125,23 L 132,16 L 128,16 L 135,9" fill="none" stroke="#ffe082" strokeWidth="1.2" />
                    <text x="120" y="64" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle" fontWeight={700}>H. POTTER</text>
                  </g>

                  {/* Panel 3: LORD OF THE RINGS */}
                  <g>
                    <ellipse cx="200" cy="28" rx="11" ry="7" fill="none" stroke="#ffb300" strokeWidth="1.8" style={{ filter: 'drop-shadow(0 0 3px #ffb300)' }} />
                    <ellipse cx="200" cy="28" rx="7" ry="4.5" fill="none" stroke="rgba(255,179,0,0.4)" strokeWidth="0.8" />
                    <text x="200" y="64" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle" fontWeight={700}>L.O.T.R.</text>
                  </g>

                  {/* Panel 4: BACK TO THE FUTURE */}
                  <g>
                    <rect x="252" y="14" width="36" height="24" rx="2" fill="#080b13" stroke="rgba(255,255,255,0.1)" />
                    <text x="270" y="25" fill="#ff5722" fontSize="9" fontFamily="monospace" fontWeight="900" textAnchor="middle" style={{ filter: 'drop-shadow(0 0 2px #ff5722)' }}>88</text>
                    <text x="270" y="35" fill="#ff5722" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle">MPH</text>
                    <text x="270" y="64" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle" fontWeight={700}>B.T.T.F.</text>
                  </g>
                </svg>
              )}

              {/* Graphic 5: Music - Classical Organ Pipes Acoustic Laser Beams */}
              {activeGraphic === 'music_organ' && (
                <svg viewBox="0 0 320 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#0a0d17', borderRadius: '10px', border: '1px solid rgba(194,89,255,0.2)', boxShadow: 'inset 0 0 8px rgba(194,89,255,0.06)' }}>
                  <g fill="none" stroke="#78909c" strokeWidth="4" strokeLinecap="round">
                    <line x1="80" y1="52" x2="80" y2="15" />
                    <line x1="100" y1="52" x2="100" y2="25" />
                    <line x1="120" y1="52" x2="120" y2="20" />
                    <line x1="140" y1="52" x2="140" y2="10" />
                    <line x1="160" y1="52" x2="160" y2="5" />
                    <line x1="180" y1="52" x2="180" y2="10" />
                    <line x1="200" y1="52" x2="200" y2="20" />
                    <line x1="220" y1="52" x2="220" y2="25" />
                    <line x1="240" y1="52" x2="240" y2="15" />
                  </g>
                  <g stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: 0.8 }}>
                    <line x1="80" y1="12" x2="80" y2="2" style={{ animation: 'blink-led 0.8s infinite alternate' }} />
                    <line x1="120" y1="17" x2="120" y2="5" style={{ animation: 'blink-led 1s infinite alternate' }} />
                    <line x1="160" y1="3" x2="160" y2="0" style={{ animation: 'blink-led 0.6s infinite alternate' }} />
                    <line x1="200" y1="17" x2="200" y2="5" style={{ animation: 'blink-led 1.1s infinite alternate' }} />
                    <line x1="240" y1="12" x2="240" y2="2" style={{ animation: 'blink-led 0.7s infinite alternate' }} />
                  </g>
                  <rect x="70" y="52" width="180" height="8" fill="#fff" rx="1" stroke="#ccc" strokeWidth="0.5" />
                  <g fill="#000">
                    <rect x="85" y="52" width="2" height="5" />
                    <rect x="95" y="52" width="2" height="5" />
                    <rect x="115" y="52" width="2" height="5" />
                    <rect x="125" y="52" width="2" height="5" />
                    <rect x="135" y="52" width="2" height="5" />
                    <rect x="155" y="52" width="2" height="5" />
                    <rect x="165" y="52" width="2" height="5" />
                    <rect x="185" y="52" width="2" height="5" />
                    <rect x="195" y="52" width="2" height="5" />
                    <rect x="205" y="52" width="2" height="5" />
                    <rect x="225" y="52" width="2" height="5" />
                    <rect x="235" y="52" width="2" height="5" />
                  </g>
                  <text x="160" y="69" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="var(--font-tech)" textAnchor="middle" fontWeight={700}>FAVORITE INSTRUMENT: THE PIPE ORGAN</text>
                </svg>
              )}

              {/* Graphic 6: Music - Pop Albums spinning neon Vinyl Turnable */}
              {activeGraphic === 'music_pop' && (
                <svg viewBox="0 0 320 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#0a0d17', borderRadius: '10px', border: '1px solid rgba(0,240,255,0.2)', boxShadow: 'inset 0 0 8px rgba(0,240,255,0.06)' }}>
                  <rect x="90" y="8" width="140" height="58" rx="6" fill="#141a29" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <g style={{ transformOrigin: '150px 37px', animation: 'spin-vinyl 3s linear infinite' }}>
                    <circle cx="150" cy="37" r="24" fill="#0c0d12" stroke="#222" strokeWidth="1" />
                    <circle cx="150" cy="37" r="20" fill="none" stroke="#242630" strokeWidth="0.8" />
                    <circle cx="150" cy="37" r="16" fill="none" stroke="#242630" strokeWidth="0.8" />
                    <circle cx="150" cy="37" r="12" fill="none" stroke="#242630" strokeWidth="0.8" />
                    <circle cx="150" cy="37" r="7.5" fill="var(--color-accent)" />
                    <circle cx="150" cy="37" r="1.5" fill="#000" />
                  </g>
                  <path d="M 215,20 L 195,20 L 170,32" fill="none" stroke="#cfd8dc" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="215" cy="20" r="4.5" fill="#455a64" />
                  <rect x="166" y="30" width="8" height="4" rx="1" fill="#ffb300" transform="rotate(25 170 32)" />

                  <g fill="var(--color-accent)" style={{ filter: 'drop-shadow(0 0 2px var(--color-accent))' }}>
                    <path d="M 60,30 L 60,20 L 70,18 L 70,25 M 60,30 A 2.5 2 0 1 1 55,30 A 2.5 2 0 1 1 60,30" style={{ animation: 'blink-led 1.5s infinite alternate' }} />
                    <path d="M 255,40 L 255,30 L 265,28 L 265,35 M 255,40 A 2.5 2 0 1 1 250,40 A 2.5 2 0 1 1 255,40" style={{ animation: 'blink-led 1.2s infinite alternate-reverse' }} />
                  </g>
                  <text x="160" y="70" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="var(--font-tech)" textAnchor="middle" fontWeight={700}>PLAYING: TAYLOR SWIFT // NOAH KAHAN</text>
                </svg>
              )}

              {/* Graphic 7: Music - Choir & Karaoke microphone frequency soundwaves */}
              {activeGraphic === 'music_choir' && (
                <svg viewBox="0 0 320 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#0a0d17', borderRadius: '10px', border: '1px solid rgba(0,255,136,0.18)', boxShadow: 'inset 0 0 8px rgba(0,255,136,0.06)' }}>
                  <g transform="translate(45, 10)">
                    <rect x="18" y="28" width="8" height="24" rx="2" fill="#78909c" />
                    <rect x="21" y="52" width="2" height="6" fill="#455a64" />
                    <circle cx="22" cy="18" r="11" fill="#b0bec5" stroke="#37474f" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 3px rgba(176,190,197,0.3))' }} />
                    <line x1="11" y1="18" x2="33" y2="18" stroke="#37474f" strokeWidth="0.8" />
                    <line x1="22" y1="7" x2="22" y2="29" stroke="#37474f" strokeWidth="0.8" />
                  </g>
                  <g style={{ transformOrigin: '180px 38px' }}>
                    <path d="M 90,38 Q 120,8 150,38 T 210,38 T 270,38" fill="none" stroke="#00ff88" strokeWidth="2.2" style={{ animation: 'wave-bounce-1 1.2s ease-in-out infinite alternate', filter: 'drop-shadow(0 0 3px #00ff88)' }} />
                    <path d="M 90,38 Q 120,68 150,38 T 210,38 T 270,38" fill="none" stroke="var(--color-accent)" strokeWidth="1.4" style={{ animation: 'wave-bounce-2 0.9s ease-in-out infinite alternate', filter: 'drop-shadow(0 0 2px var(--color-accent))', opacity: 0.6 }} strokeDasharray="3 3" />
                  </g>
                  <text x="180" y="19" fill="#00ff88" fontSize="6.5" fontWeight={800} fontFamily="var(--font-tech)">SINGING IN A CHOIR & KARAOKE</text>
                  <text x="180" y="29" fill="rgba(255,255,255,0.6)" fontSize="5" fontFamily="var(--font-tech)" fontWeight={700}>HARMONIZING IN PERFECT CHORAL SYNC</text>
                </svg>
              )}

              {/* Graphic 8: Biking - Smooth Sailing Relaxing path */}
              {activeGraphic === 'biking_relax' && (
                <svg viewBox="0 0 320 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#0a0d17', borderRadius: '10px', border: '1px solid rgba(0,255,136,0.15)', boxShadow: 'inset 0 0 8px rgba(0,255,136,0.06)' }}>
                  <path d="M 0,60 Q 160,20 320,60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
                  
                  <g fill="rgba(255,255,255,0.08)">
                    <ellipse cx="280" cy="20" rx="14" ry="4" style={{ animation: 'wind-vector 6s linear infinite' }} />
                    <ellipse cx="140" cy="15" rx="10" ry="3" style={{ animation: 'wind-vector 8s linear infinite' }} />
                  </g>

                  <g transform="translate(130, 16)">
                    <circle cx="10" cy="36" r="8" fill="none" stroke="#fff" strokeWidth="1.2" />
                    <circle cx="10" cy="36" r="6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeDasharray="2 2" style={{ animation: 'spin-vinyl 1.5s linear infinite' }} />
                    
                    <circle cx="34" cy="36" r="8" fill="none" stroke="#fff" strokeWidth="1.2" />
                    <circle cx="34" cy="36" r="6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeDasharray="2 2" style={{ animation: 'spin-vinyl 1.5s linear infinite' }} />

                    <path d="M 10,36 L 20,36 L 26,24 L 14,24 Z" fill="none" stroke="#00ff88" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="20" y1="36" x2="26" y2="24" stroke="#00ff88" strokeWidth="1.6" />
                    <line x1="34" y1="36" x2="30" y2="20" stroke="#00ff88" strokeWidth="1.6" />
                    <path d="M 30,20 L 26,18 L 32,18" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="13" y1="22" x2="17" y2="22" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />

                    <line x1="15" y1="21" x2="23" y2="12" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
                    <circle cx="25" cy="8" r="3.2" fill="#fff" />
                    <line x1="23" y1="12" x2="29" y2="19" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                    <g style={{ transformOrigin: '20px 36px', animation: 'pedal-legs 0.75s linear infinite' }}>
                      <line x1="16" y1="21" x2="20" y2="29" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="20" y1="29" x2="20" y2="36" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                  </g>
                  <text x="160" y="70" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="var(--font-tech)" textAnchor="middle" fontWeight={700}>BIKING COORD: BIKE_WAY-A5 (100% RELAXING & FREE)</text>
                </svg>
              )}

              {/* Graphic 9: Biking - The Headwind Challenge */}
              {activeGraphic === 'biking_wind' && (
                <svg viewBox="0 0 320 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#120b0b', borderRadius: '10px', border: '1px solid rgba(255,87,34,0.22)', boxShadow: 'inset 0 0 8px rgba(255,87,34,0.06)' }}>
                  <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />

                  <g stroke="rgba(255,87,34,0.3)" strokeWidth="1.2" strokeLinecap="round" fill="none">
                    <line x1="300" y1="15" x2="250" y2="15" strokeDasharray="10 5" style={{ animation: 'wind-vector 2s linear infinite' }} />
                    <line x1="240" y1="28" x2="180" y2="28" strokeDasharray="15 7" style={{ animation: 'wind-vector 1.5s linear infinite' }} />
                    <line x1="280" y1="42" x2="220" y2="42" strokeDasharray="8 4" style={{ animation: 'wind-vector 2.2s linear infinite' }} />
                    <line x1="160" y1="10" x2="110" y2="10" strokeDasharray="12 5" style={{ animation: 'wind-vector 1.8s linear infinite' }} />
                    <line x1="120" y1="48" x2="60" y2="48" strokeDasharray="15 6" style={{ animation: 'wind-vector 1.3s linear infinite' }} />
                  </g>

                  <rect x="85" y="8" width="150" height="11" rx="3" fill="rgba(255,87,34,0.08)" stroke="rgba(255,87,34,0.3)" strokeWidth="0.8" />
                  <text x="160" y="16" fill="#ff5722" fontSize="5" fontFamily="var(--font-tech)" fontWeight={700} textAnchor="middle" style={{ animation: 'blink-led 1s infinite' }}>⚠️ HEADWIND ACTIVE: -12KM/H WIND RESISTANCE</text>

                  <g transform="translate(130, 16)">
                    <circle cx="10" cy="36" r="8" fill="none" stroke="#fff" strokeWidth="1.2" />
                    <circle cx="10" cy="36" r="6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeDasharray="2 2" style={{ animation: 'spin-vinyl 4s linear infinite' }} />
                    
                    <circle cx="34" cy="36" r="8" fill="none" stroke="#fff" strokeWidth="1.2" />
                    <circle cx="34" cy="36" r="6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeDasharray="2 2" style={{ animation: 'spin-vinyl 4s linear infinite' }} />

                    <path d="M 10,36 L 20,36 L 26,24 L 14,24 Z" fill="none" stroke="#ff5722" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="20" y1="36" x2="26" y2="24" stroke="#ff5722" strokeWidth="1.6" />
                    <line x1="34" y1="36" x2="30" y2="20" stroke="#ff5722" strokeWidth="1.6" />
                    <path d="M 30,20 L 26,18 L 32,18" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="13" y1="22" x2="17" y2="22" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />

                    <line x1="13" y1="22" x2="24" y2="15" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
                    <circle cx="26" cy="11" r="3.2" fill="#fff" />
                    <line x1="24" y1="15" x2="29" y2="19" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                    <g style={{ transformOrigin: '20px 36px', animation: 'pedal-legs 2.5s linear infinite' }}>
                      <line x1="15" y1="22" x2="19" y2="29" stroke="#ff5722" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="19" y1="29" x2="19" y2="36" stroke="#ff5722" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                  </g>
                  <text x="160" y="70" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="var(--font-tech)" textAnchor="middle" fontWeight={700}>PEDALING AGAINST DRAG (CARDIO LEVEL ELEVATED)</text>
                </svg>
              )}

              {/* Graphic 10: Animated Flag Football Playbook play simulation */}
              {activeGraphic === 'football' && (
                <svg viewBox="0 0 320 100" width="100%" height="95px" style={{ marginTop: '14px', background: '#0e1710', borderRadius: '10px', border: '1.5px solid var(--neon-emerald)', boxShadow: 'inset 0 0 10px rgba(0,255,136,0.1)' }}>
                  <defs>
                    <linearGradient id="fieldGrass" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1b4d22" />
                      <stop offset="100%" stopColor="#0f3014" />
                    </linearGradient>
                  </defs>

                  {/* Field background */}
                  <rect x="0" y="0" width="320" height="100" fill="url(#fieldGrass)" />

                  {/* Yard grid lines */}
                  <line x1="40" y1="0" x2="40" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="80" y1="0" x2="80" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="120" y1="0" x2="120" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="160" y1="0" x2="160" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="240" y1="0" x2="240" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="280" y1="0" x2="280" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Endzone area */}
                  <rect x="280" y="0" width="40" height="100" fill="rgba(0, 255, 136, 0.08)" />
                  <text x="300" y="50" fill="rgba(255, 255, 255, 0.2)" fontSize="6.5" fontFamily="var(--font-tech)" textAnchor="middle" transform="rotate(-90 300 50)" letterSpacing="1px">ENDZONE</text>

                  {/* Huddle strategic routes planned (dashed static background) */}
                  <path d="M 70,25 L 140,25 Q 170,25 180,45 T 280,50" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="3 3" />
                  <path d="M 70,75 L 140,75 Q 180,75 190,40 T 275,30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Active receiver route run (neon glowing slant route for WR1) */}
                  <path d="M 70,25 L 140,25 Q 170,25 180,45 T 280,50" fill="none" stroke="#00ff88" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="6 4" style={{ animation: 'route-run 4s linear infinite' }} />
                  <text x="95" y="19" fill="var(--neon-emerald)" fontSize="5" fontFamily="var(--font-tech)" fontWeight={700}>CO-ED 5v5 SLANT PLAY</text>

                  {/* ================= OFFENSE (GREEN TEAM) ================= */}
                  {/* QB (Female ♀ - animated dropback) */}
                  <g style={{ animation: 'qb-drop 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="5.5" stroke="#00ff88" strokeWidth="1.2" fill="rgba(0,255,136,0.2)" />
                    {/* Female Avatar */}
                    <circle cx="0" cy="-1.5" r="1.5" fill="#ffffff" />
                    <path d="M 1.2,-1.8 C 2.2,-2.2 3,-1 2.8,0.5 C 2.5,1.8 1.8,2.2 1.5,2.5" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M -3,3 C -3,1.5 -1.5,1.2 0,1.2 C 1.5,1.2 3,1.5 3,3" fill="#ffffff" />
                    <text x="0" y="-7" fill="rgba(0,255,136,0.8)" fontSize="4.5" fontFamily="var(--font-tech)" textAnchor="middle" fontWeight={700}>QB ♀</text>
                  </g>

                  {/* Center (Male ♂ - animated block shift) */}
                  <g style={{ animation: 'center-block 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="5.5" stroke="#00ff88" strokeWidth="1.2" fill="rgba(0,255,136,0.2)" />
                    {/* Male Avatar */}
                    <circle cx="0" cy="-1.5" r="1.6" fill="#ffffff" />
                    <path d="M -3.5,3 C -3.5,1.2 -1.8,1 0,1 C 1.8,1 3.5,1.2 3.5,3" fill="#ffffff" />
                    <text x="0" y="-7" fill="rgba(255,255,255,0.6)" fontSize="4.5" textAnchor="middle">C ♂</text>
                  </g>

                  {/* Running Back (Male ♂ - animated flat route) */}
                  <g style={{ animation: 'rb-run 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="5.5" stroke="#00ff88" strokeWidth="1.2" fill="rgba(0,255,136,0.2)" />
                    {/* Male Avatar */}
                    <circle cx="0" cy="-1.5" r="1.6" fill="#ffffff" />
                    <path d="M -3.5,3 C -3.5,1.2 -1.8,1 0,1 C 1.8,1 3.5,1.2 3.5,3" fill="#ffffff" />
                    <text x="0" y="-7" fill="rgba(255,255,255,0.6)" fontSize="4.5" textAnchor="middle">RB ♂</text>
                  </g>

                  {/* WR2 (Male ♂ - animated deep post route) */}
                  <g style={{ animation: 'wr2-run 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="5.5" stroke="#00ff88" strokeWidth="1.2" fill="rgba(0,255,136,0.2)" />
                    {/* Male Avatar */}
                    <circle cx="0" cy="-1.5" r="1.6" fill="#ffffff" />
                    <path d="M -3.5,3 C -3.5,1.2 -1.8,1 0,1 C 1.8,1 3.5,1.2 3.5,3" fill="#ffffff" />
                    <text x="0" y="-7" fill="rgba(255,255,255,0.6)" fontSize="4.5" textAnchor="middle">WR2 ♂</text>
                  </g>

                  {/* WR1 (Female ♀ - Slant Catch Receiver & Flags) */}
                  <g style={{ animation: 'receiver-catch 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="6" stroke="#00ff88" strokeWidth="1.5" fill="rgba(0,255,136,0.2)" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
                    {/* Female Avatar */}
                    <circle cx="0" cy="-1.5" r="1.5" fill="#ffffff" />
                    <path d="M 1.2,-1.8 C 2.2,-2.2 3,-1 2.8,0.5 C 2.5,1.8 1.8,2.2 1.5,2.5" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M -3,3 C -3,1.5 -1.5,1.2 0,1.2 C 1.5,1.2 3,1.5 3,3" fill="#ffffff" />
                    {/* Glowing Flag Belts */}
                    <path d="M -3.5,2.5 L -7.5,6.5 M 3.5,2.5 L 7.5,6.5" stroke="#ffb300" strokeWidth="1.5" />
                    <text x="0" y="-8" fill="#fff" fontSize="5" fontWeight={700} fontFamily="var(--font-tech)" textAnchor="middle">WR1 ♀</text>
                  </g>


                  {/* ================= DEFENSE (BLUE TEAM) ================= */}
                  {/* Blitzer/Rusher (Male ♂ - rushes QB) */}
                  <g style={{ animation: 'rusher-rush 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="5.5" stroke="#00f0ff" strokeWidth="1.2" fill="rgba(0,240,255,0.2)" />
                    {/* Male Avatar */}
                    <circle cx="0" cy="-1.5" r="1.6" fill="#ffffff" />
                    <path d="M -3.5,3 C -3.5,1.2 -1.8,1 0,1 C 1.8,1 3.5,1.2 3.5,3" fill="#ffffff" />
                    <text x="0" y="-7" fill="rgba(0,240,255,0.8)" fontSize="4.5" textAnchor="middle">R ♂</text>
                  </g>

                  {/* Linebacker (Female ♀ - drops zone) */}
                  <g style={{ animation: 'lb-drop 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="5.5" stroke="#00f0ff" strokeWidth="1.2" fill="rgba(0,240,255,0.2)" />
                    {/* Female Avatar */}
                    <circle cx="0" cy="-1.5" r="1.5" fill="#ffffff" />
                    <path d="M 1.2,-1.8 C 2.2,-2.2 3,-1 2.8,0.5 C 2.5,1.8 1.8,2.2 1.5,2.5" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M -3,3 C -3,1.5 -1.5,1.2 0,1.2 C 1.5,1.2 3,1.5 3,3" fill="#ffffff" />
                    <text x="0" y="-7" fill="rgba(255,255,255,0.6)" fontSize="4.5" textAnchor="middle">LB ♀</text>
                  </g>

                  {/* CB1 (Female ♀ - covers WR1) */}
                  <g style={{ animation: 'cb1-chase 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="5.5" stroke="#00f0ff" strokeWidth="1.2" fill="rgba(0,240,255,0.2)" />
                    {/* Female Avatar */}
                    <circle cx="0" cy="-1.5" r="1.5" fill="#ffffff" />
                    <path d="M 1.2,-1.8 C 2.2,-2.2 3,-1 2.8,0.5 C 2.5,1.8 1.8,2.2 1.5,2.5" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M -3,3 C -3,1.5 -1.5,1.2 0,1.2 C 1.5,1.2 3,1.5 3,3" fill="#ffffff" />
                    <text x="0" y="-7" fill="rgba(255,255,255,0.6)" fontSize="4.5" textAnchor="middle">CB1 ♀</text>
                  </g>

                  {/* CB2 (Male ♂ - covers WR2) */}
                  <g style={{ animation: 'cb2-chase 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="5.5" stroke="#00f0ff" strokeWidth="1.2" fill="rgba(0,240,255,0.2)" />
                    {/* Male Avatar */}
                    <circle cx="0" cy="-1.5" r="1.6" fill="#ffffff" />
                    <path d="M -3.5,3 C -3.5,1.2 -1.8,1 0,1 C 1.8,1 3.5,1.2 3.5,3" fill="#ffffff" />
                    <text x="0" y="-7" fill="rgba(255,255,255,0.6)" fontSize="4.5" textAnchor="middle">CB2 ♂</text>
                  </g>

                  {/* Safety (Male ♂ - deep safety) */}
                  <g style={{ animation: 'safety-drop 4s linear infinite' }}>
                    <circle cx="0" cy="0" r="5.5" stroke="#00f0ff" strokeWidth="1.2" fill="rgba(0,240,255,0.2)" />
                    {/* Male Avatar */}
                    <circle cx="0" cy="-1.5" r="1.6" fill="#ffffff" />
                    <path d="M -3.5,3 C -3.5,1.2 -1.8,1 0,1 C 1.8,1 3.5,1.2 3.5,3" fill="#ffffff" />
                    <text x="0" y="-7" fill="rgba(255,255,255,0.6)" fontSize="4.5" textAnchor="middle">S ♂</text>
                  </g>


                  {/* ================= BALL & TEXT ================= */}
                  {/* Gliding football pass */}
                  <g style={{ animation: 'ball-pass 4s ease-in-out infinite' }}>
                    <ellipse cx="0" cy="0" rx="5.5" ry="3" fill="#8d4a25" stroke="#ffffff" strokeWidth="0.8" />
                    <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#ffffff" strokeWidth="0.8" />
                    <line x1="-1.5" y1="-1.5" x2="-1.5" y2="1.5" stroke="#ffffff" strokeWidth="0.6" />
                    <line x1="0" y1="-1.5" x2="0" y2="1.5" stroke="#ffffff" strokeWidth="0.6" />
                    <line x1="1.5" y1="-1.5" x2="1.5" y2="1.5" stroke="#ffffff" strokeWidth="0.6" />
                  </g>

                  {/* Touchdown Text celebration flashing */}
                  <text x="180" y="55" fill="var(--neon-emerald)" fontSize="11" fontFamily="var(--font-tech)" fontWeight="900" textAnchor="middle" style={{ animation: 'touchdown-text 4s infinite', filter: 'drop-shadow(0 0 4px var(--neon-emerald))' }}>TOUCHDOWN!</text>
                </svg>
              )}

              {/* Graphic 11: Dome Sector Navigation links (travel node) */}
              {activeGraphic === 'travel' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '10px' }}>
                  <a 
                    href="/metropolis-core" 
                    onClick={(e) => handleWarpFromStep(e, '/metropolis-core', 2)}
                    className="social-link-port" 
                    style={{ padding: '8px 10px', fontSize: '0.65rem', justifyContent: 'center', background: '#080b13', color: '#fff', border: '1.5px solid var(--neon-cyan)', boxShadow: '0 0 8px rgba(0,240,255,0.1)', fontWeight: 700 }}
                  >
                    ⚡ METROPOLIS HUB
                  </a>
                  <a 
                    href="/portfolio" 
                    onClick={(e) => handleWarpFromStep(e, '/portfolio', 3)}
                    className="social-link-port" 
                    style={{ padding: '8px 10px', fontSize: '0.65rem', justifyContent: 'center', background: '#080b13', color: '#fff', border: '1.5px solid #2979ff', boxShadow: '0 0 8px rgba(41,121,255,0.1)', fontWeight: 700 }}
                  >
                    📂 PORTFOLIO DOME
                  </a>
                  <a 
                    href="/atmosphere-dome" 
                    onClick={(e) => handleWarpFromStep(e, '/atmosphere-dome', 4)}
                    className="social-link-port" 
                    style={{ padding: '8px 10px', fontSize: '0.65rem', justifyContent: 'center', background: '#080b13', color: '#fff', border: '1.5px solid var(--neon-emerald)', boxShadow: '0 0 8px rgba(0,255,136,0.1)', fontWeight: 700 }}
                  >
                    🌿 BIOSPHERE PARK
                  </a>
                  <a 
                    href="/quantum-net" 
                    onClick={(e) => handleWarpFromStep(e, '/quantum-net', 5)}
                    className="social-link-port" 
                    style={{ padding: '8px 10px', fontSize: '0.65rem', justifyContent: 'center', background: '#080b13', color: '#fff', border: '1.5px solid var(--neon-amber)', boxShadow: '0 0 8px rgba(255,179,0,0.1)', fontWeight: 700 }}
                  >
                    🛰️ QUANTUM NET
                  </a>
                </div>
              )}

            </div>

            {/* Stepper Footer: Dynamic Conversational Response Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px', width: '100%' }}>
              
              {!isHobbiesNode ? (
                /* Standard dynamic choices for non-hobbies nodes */
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {activeNode.choices.map((choice, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentNode(choice.next)}
                      className="hud-btn animate-fade"
                      style={{
                        padding: '8px 18px',
                        fontSize: '0.72rem',
                        background: 'rgba(var(--color-accent-rgb), 0.12)',
                        borderColor: 'var(--color-accent)',
                        color: '#080b13',
                        fontWeight: 700,
                        borderRadius: '20px',
                        cursor: 'pointer'
                      }}
                    >
                      [ {choice.text} ]
                    </button>
                  ))}
                </div>
              ) : (
                /* Dynamic Step progression and exit controls for Hobbies Hub */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
                  {(() => {
                    const hobby = HOBBIES_DATA[activeHobby] || HOBBIES_DATA.tech;
                    if (hobby.steps) {
                      const totalSteps = hobby.steps.length;
                      return (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                          {hobbyStep > 1 && (
                            <button
                              onClick={() => setHobbyStep(hobbyStep - 1)}
                              className="hud-btn animate-fade"
                              style={{
                                padding: '8px 16px',
                                fontSize: '0.72rem',
                                background: 'rgba(0, 0, 0, 0.05)',
                                borderColor: 'rgba(0, 0, 0, 0.15)',
                                color: 'rgba(0,0,0,0.6)',
                                fontWeight: 700,
                                borderRadius: '20px',
                                cursor: 'pointer'
                              }}
                            >
                              ◀ Previous Step
                            </button>
                          )}
                          
                          <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.68rem', color: 'rgba(0, 0, 0, 0.5)', fontWeight: 700, margin: '0 8px' }}>
                            STEP {hobbyStep} OF {totalSteps}
                          </span>

                          {hobbyStep < totalSteps ? (
                            <button
                              onClick={() => setHobbyStep(hobbyStep + 1)}
                              className="hud-btn animate-fade"
                              style={{
                                padding: '8px 16px',
                                fontSize: '0.72rem',
                                background: 'var(--color-accent)',
                                borderColor: 'var(--color-accent)',
                                color: '#fff',
                                fontWeight: 700,
                                borderRadius: '20px',
                                cursor: 'pointer',
                                boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.3)'
                              }}
                            >
                              Next Step ➜
                            </button>
                          ) : (
                            <button
                              onClick={() => setCurrentNode('travel')}
                              className="hud-btn animate-fade"
                              style={{
                                padding: '8px 16px',
                                fontSize: '0.72rem',
                                background: 'var(--color-accent)',
                                borderColor: 'var(--color-accent)',
                                color: '#fff',
                                fontWeight: 700,
                                borderRadius: '20px',
                                cursor: 'pointer',
                                boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.3)'
                              }}
                            >
                              Complete Topic ➜
                            </button>
                          )}
                        </div>
                      );
                    } else {
                      /* Exit options for single-step hobbies */
                      return (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                          <button
                            onClick={() => setCurrentNode('studies')}
                            className="hud-btn animate-fade"
                            style={{
                              padding: '8px 16px',
                              fontSize: '0.72rem',
                              background: 'rgba(0, 0, 0, 0.05)',
                              borderColor: 'rgba(0, 0, 0, 0.15)',
                              color: 'rgba(0, 0, 0, 0.65)',
                              fontWeight: 700,
                              borderRadius: '20px',
                              cursor: 'pointer'
                            }}
                          >
                            ◀ Go to Studies & Logic
                          </button>
                          <button
                            onClick={() => setCurrentNode('travel')}
                            className="hud-btn animate-fade"
                            style={{
                              padding: '8px 16px',
                              fontSize: '0.72rem',
                              background: 'var(--color-accent)',
                              borderColor: 'var(--color-accent)',
                              color: '#fff',
                              fontWeight: 700,
                              borderRadius: '20px',
                              cursor: 'pointer',
                              boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.3)'
                            }}
                          >
                            Go to Ares Warp Dock 🚀
                          </button>
                        </div>
                      );
                    }
                  })()}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      <style jsx global>{`
        /* Stepper Animations */
        @keyframes step-fade-in {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes signal-beam {
          to { stroke-dashoffset: -20; }
        }

        @keyframes packet-glide {
          0% { cx: 84px; }
          100% { cx: 236px; }
        }

        .animate-fade {
          animation: step-fade-in 0.25s ease-out;
        }

        @keyframes blink-led {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* Flag Football SVG Playbook Animations */
        @keyframes route-run {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes qb-drop {
          0%, 30% { transform: translate(50px, 50px); }
          45%, 100% { transform: translate(45px, 52px); }
        }

        @keyframes center-block {
          0%, 30% { transform: translate(75px, 50px); }
          45%, 100% { transform: translate(80px, 50px); }
        }

        @keyframes rb-run {
          0%, 30% { transform: translate(45px, 60px); }
          50% { transform: translate(90px, 75px); }
          72%, 100% { transform: translate(140px, 75px); }
        }

        @keyframes wr2-run {
          0%, 30% { transform: translate(70px, 75px); }
          55% { transform: translate(160px, 75px); }
          72%, 100% { transform: translate(240px, 45px); }
        }

        @keyframes receiver-catch {
          0%, 30% { transform: translate(70px, 25px); }
          45% { transform: translate(140px, 25px); }
          60% { transform: translate(180px, 45px); }
          72%, 100% { transform: translate(280px, 50px); }
        }

        @keyframes rusher-rush {
          0%, 30% { transform: translate(90px, 42px); }
          50% { transform: translate(65px, 48px); }
          72%, 100% { transform: translate(48px, 52px); }
        }

        @keyframes lb-drop {
          0%, 30% { transform: translate(100px, 55px); }
          50% { transform: translate(125px, 58px); }
          72%, 100% { transform: translate(145px, 60px); }
        }

        @keyframes cb1-chase {
          0%, 30% { transform: translate(88px, 25px); }
          45% { transform: translate(145px, 28px); }
          60% { transform: translate(188px, 48px); }
          72%, 100% { transform: translate(288px, 52px); }
        }

        @keyframes cb2-chase {
          0%, 30% { transform: translate(88px, 75px); }
          55% { transform: translate(168px, 77px); }
          72%, 100% { transform: translate(246px, 48px); }
        }

        @keyframes safety-drop {
          0%, 30% { transform: translate(130px, 50px); }
          50% { transform: translate(165px, 35px); }
          72%, 100% { transform: translate(270px, 46px); }
        }

        @keyframes ball-pass {
          0%, 30% {
            transform: translate(50px, 50px) scale(0.6);
            opacity: 0;
          }
          32% {
            opacity: 1;
          }
          52% {
            transform: translate(165px, 25px) scale(1.1) rotate(45deg);
            opacity: 1;
          }
          72% {
            transform: translate(280px, 50px) scale(0.8) rotate(120deg);
            opacity: 1;
          }
          78%, 100% {
            transform: translate(280px, 50px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes touchdown-text {
          0%, 71% {
            opacity: 0;
            font-size: 0px;
          }
          72% {
            opacity: 1;
            font-size: 15px;
          }
          78%, 95% {
            opacity: 1;
            font-size: 11px;
          }
          100% {
            opacity: 0;
            font-size: 0px;
          }
        }

        @keyframes spin-vinyl {
          100% { transform: rotate(360deg); }
        }

        @keyframes wind-vector {
          0% { transform: translateX(100px); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { transform: translateX(-150px); opacity: 0; }
        }

        @keyframes wave-bounce-1 {
          0% { transform: scaleY(0.6) translateY(15px); }
          100% { transform: scaleY(1.3) translateY(-9px); }
        }

        @keyframes wave-bounce-2 {
          0% { transform: scaleY(1.3) translateY(-9px); }
          100% { transform: scaleY(0.6) translateY(15px); }
        }

        @keyframes pedal-legs {
          0% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(10deg) translateY(1.2px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
      `}</style>
    </div>
  );
}
