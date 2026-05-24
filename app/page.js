'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CityGridMap from '../components/CityGridMap';

export default function CitizenSuite() {
  const router = useRouter();
  const [transitState, setTransitState] = useState('slide-active');
  const [currentStep, setCurrentStep] = useState(1);
  const [isWalking, setIsWalking] = useState(false);

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

  // Keyboard navigation listener (Left/Right Arrows safely cycle steps)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        setCurrentStep(prev => Math.min(prev + 1, 5));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStep(prev => Math.max(prev - 1, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleResetChat = () => {
    setCurrentStep(1);
  };

  // Programmatic warp transitions for Step 5 sector coordinates links
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

  return (
    <div className="citizen-card-shell" style={{ flexDirection: 'column', overflow: 'visible' }}>
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Sleek, Non-Blocking Navigation Dock pill */}
      <div className="floating-nav-bubble">
        <CityGridMap />
      </div>

      {/* Spacious 2-Column Grid Centering Your Cutout & Speech Bubble */}
      <div 
        className={`walking-content-container homepage-grid ${transitState}`} 
        style={{ 
          overflow: 'visible',
          gridTemplateColumns: '340px min(580px, 62vw)',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        
        {/* Far-Left Column: Spatial gap overlaying the natural background cutout */}
        <div className="roomscale-profile-spacer" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}></div>

        {/* Right Column: Single High-Contrast Conversational Stepper Speech Bubble */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 0, overflow: 'visible' }}>
          
          <div className="comic-speech-bubble" style={{ display: 'flex', flexDirection: 'column', minHeight: '300px', justifyContent: 'space-between' }}>
            
            {/* Stepper Header (Progress Bar Indicators) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.5px' }}>
                TRANSMITTING COORD: PENTHOUSE_A-02
              </span>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.58rem', color: 'rgba(0,0,0,0.4)', marginRight: '4px' }}>STEP {currentStep} OF 5</span>
                {[1, 2, 3, 4, 5].map((s) => (
                  <div 
                    key={s} 
                    onClick={() => setCurrentStep(s)}
                    style={{
                      width: '18px',
                      height: '6px',
                      borderRadius: '3px',
                      background: s === currentStep ? 'var(--color-accent)' : 'rgba(0, 0, 0, 0.1)',
                      boxShadow: s === currentStep ? '0 0 5px var(--color-accent)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Stepper Body: Conversational Dialogues & Bespoke Graphics */}
            <div 
              aria-live="polite" 
              style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}
            >
              
              {/* STEP 1: The Remote Subspace Link with high-fidelity space planetary background */}
              {currentStep === 1 && (
                <div style={{ animation: 'step-fade-in 0.3s ease' }}>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.55', fontWeight: 500 }}>
                    Hi! I&apos;m <strong>Ephraim Becker</strong>. I&apos;m an undergraduate student at <strong>Adelphi University</strong> on Earth, linked remotely to my Citizen Suite in Ares City on Mars.
                  </p>
                  
                  {/* High-Fidelity SVG Space Background Earth & Mars Globes */}
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

                    {/* Starry space field with blinking background stars */}
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
                    <circle cx="260" cy="75" r="0.8" fill="#ffb300" opacity="0.6" style={{ animation: 'blink-led 1.7s infinite' }} />

                    {/* Nebula glows */}
                    <ellipse cx="160" cy="50" rx="70" ry="25" fill="rgba(194, 89, 255, 0.04)" style={{ filter: 'blur(10px)' }} />
                    <ellipse cx="80" cy="40" rx="55" ry="20" fill="rgba(0, 240, 255, 0.03)" style={{ filter: 'blur(8px)' }} />

                    {/* ================= REAL EARTH GLOBE ================= */}
                    <g>
                      <circle cx="60" cy="50" r="23" fill="none" stroke="rgba(0, 240, 255, 0.22)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 3px rgba(0,240,255,0.4))' }} />
                      <circle cx="60" cy="50" r="21" fill="url(#earthOcean)" />
                      {/* Realistic Green Continent vectors */}
                      <path d="M 45,36 Q 52,38 54,42 Q 58,40 56,46 Q 52,48 55,54 Q 57,59 55,62 Q 52,65 48,68 Q 44,60 46,55 Q 49,50 45,45 Z" fill="#2e7d32" opacity="0.85" />
                      <path d="M 50,30 Q 56,29 55,33 Q 50,34 49,32 Z" fill="#e0f2f1" opacity="0.9" />
                      <path d="M 72,40 Q 75,44 78,43 L 80,48 Q 78,54 75,56 Q 73,50 71,46 Z" fill="#2e7d32" opacity="0.8" />
                      {/* Swirling weather clouds */}
                      <path d="M 42,42 Q 52,35 68,44" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
                      <path d="M 46,56 Q 56,62 72,52" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
                      {/* Terminator shadow */}
                      <path d="M 60,29 A 21 21 0 0 1 60,71 A 21 21 0 0 0 60,29 Z" fill="rgba(0,0,0,0.4)" />
                      <text x="60" y="53" fill="#ffffff" fontSize="6.5" fontFamily="var(--font-tech)" fontWeight={900} textAnchor="middle" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>EARTH</text>
                    </g>

                    {/* ================= REAL MARS GLOBE ================= */}
                    <g>
                      <circle cx="260" cy="50" r="23" fill="none" stroke="rgba(255, 179, 0, 0.22)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 3px rgba(255,179,0,0.4))' }} />
                      <circle cx="260" cy="50" r="21" fill="url(#marsDunes)" />
                      {/* Realistic Mars dark formations (Syrtis Major) */}
                      <path d="M 250,42 Q 255,46 262,44 Q 268,48 266,54 Q 258,58 254,54 Q 248,50 248,46 Z" fill="#4e1d13" opacity="0.65" />
                      <path d="M 248,60 Q 258,62 266,59 Q 272,66 260,68 Z" fill="#4e1d13" opacity="0.55" />
                      {/* Polar white ice caps */}
                      <ellipse cx="260" cy="30" rx="7" ry="2.2" fill="#ffffff" opacity="0.95" style={{ filter: 'drop-shadow(0 0 1px #fff)' }} />
                      <ellipse cx="260" cy="70" rx="5" ry="1.5" fill="#ffffff" opacity="0.8" />
                      {/* Terminator shadow */}
                      <path d="M 260,29 A 21 21 0 0 1 260,71 A 21 21 0 0 0 260,29 Z" fill="rgba(0,0,0,0.45)" />
                      <text x="260" y="53" fill="#ffffff" fontSize="6.5" fontFamily="var(--font-tech)" fontWeight={900} textAnchor="middle" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>MARS</text>
                    </g>

                    {/* Connecting Subspace laser transmission beam */}
                    <line x1="84" y1="50" x2="236" y2="50" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="5 5" style={{ animation: 'signal-beam 2s linear infinite', filter: 'drop-shadow(0 0 2px #00f0ff)' }} />
                    <circle cx="160" cy="50" r="3.5" fill="#00ff88" style={{ animation: 'packet-glide 2s infinite linear', filter: 'drop-shadow(0 0 3px #00ff88)' }} />
                  </svg>
                </div>
              )}

              {/* STEP 2: The CS Cadet */}
              {currentStep === 2 && (
                <div style={{ animation: 'step-fade-in 0.3s ease' }}>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.55', fontWeight: 500 }}>
                    As a Remote Cadet in the Martian academic cohort, I study computer science, databases, and advanced systems architecture.
                  </p>
                  
                  {/* Step 2 Graphic: Compiling Terminal */}
                  <div style={{ marginTop: '14px', background: '#080b13', border: '1px solid rgba(194, 89, 255, 0.22)', borderRadius: '10px', padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.72rem', color: '#00ff88', textAlign: 'left', boxShadow: 'inset 0 0 8px rgba(0,255,136,0.08)' }}>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.55rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '6px' }}>SYSTEM TERMINAL // CS_CADET_EMB</div>
                    <div>emb@adelphi:~$ <span style={{ color: '#fff' }}>npm run study</span></div>
                    <div style={{ color: '#ffb300', marginTop: '2px' }}>&gt; syncing cs_cohort_database...</div>
                    <div style={{ color: '#00f0ff' }}>&gt; link status: NOMINAL (ARES_SUITE_PORT)</div>
                    <div style={{ opacity: 0.5 }}>&gt; package study logs updated successfully.</div>
                  </div>
                </div>
              )}

              {/* STEP 3: Calculus & Gen Ed */}
              {currentStep === 3 && (
                <div style={{ animation: 'step-fade-in 0.3s ease' }}>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.55', fontWeight: 500 }}>
                    I also tackle Calculus and general education pathways to sync earthside engineering with Mars municipal grids.
                  </p>
                  
                  {/* Step 3 Graphic: Calculus slope grid */}
                  <svg viewBox="0 0 300 75" width="100%" height="75px" style={{ marginTop: '14px', background: '#0a0d17', borderRadius: '10px', border: '1px solid rgba(194, 89, 255, 0.18)', boxShadow: 'inset 0 0 8px rgba(194, 89, 255, 0.08)' }}>
                    <line x1="20" y1="38" x2="280" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                    <line x1="60" y1="10" x2="60" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                    
                    <path d="M 60,55 Q 120,-15 190,45 T 280,25" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" style={{ filter: 'drop-shadow(0 0 2px var(--color-accent))' }} />

                    <text x="70" y="22" fill="rgba(255,255,255,0.5)" fontSize="6.5" fontFamily="monospace">dy/dx = lim Δx-&gt;0 (Δy/Δx)</text>
                    <text x="180" y="60" fill="var(--color-accent)" fontSize="6.5" fontFamily="monospace">∫ f(x) dx</text>
                  </svg>
                </div>
              )}

              {/* STEP 4: Interests & Port Links with Light Accents backgrounds for 100% legibility */}
              {currentStep === 4 && (
                <div style={{ animation: 'step-fade-in 0.3s ease' }}>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.55', fontWeight: 500 }}>
                    Here are my core interests and subspace channels. Go ahead and explore my space!
                  </p>
                  
                  {/* High contrast, light accented interests badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px', justifyContent: 'center' }}>
                    <span className="hud-badge" style={{ fontSize: '0.74rem', padding: '5px 12px', background: 'rgba(var(--color-accent-rgb), 0.08)', color: '#080b13', border: '1.5px solid rgba(var(--color-accent-rgb), 0.35)', fontWeight: 700 }}>💻 Technology & Coding</span>
                    <span className="hud-badge" style={{ fontSize: '0.74rem', padding: '5px 12px', background: 'rgba(var(--color-accent-rgb), 0.08)', color: '#080b13', border: '1.5px solid rgba(var(--color-accent-rgb), 0.35)', fontWeight: 700 }}>🎬 Sci-Fi / Fantasy</span>
                    <span className="hud-badge" style={{ fontSize: '0.74rem', padding: '5px 12px', background: 'rgba(var(--color-accent-rgb), 0.08)', color: '#080b13', border: '1.5px solid rgba(var(--color-accent-rgb), 0.35)', fontWeight: 700 }}>🎵 Music</span>
                    <span className="hud-badge" style={{ fontSize: '0.74rem', padding: '5px 12px', background: 'rgba(var(--color-accent-rgb), 0.08)', color: '#080b13', border: '1.5px solid rgba(var(--color-accent-rgb), 0.35)', fontWeight: 700 }}>🚴 Biking</span>
                  </div>
                </div>
              )}

              {/* STEP 5: Dome Hyperloop Transit (Integrated Sector Navigation) */}
              {currentStep === 5 && (
                <div style={{ animation: 'step-fade-in 0.3s ease' }}>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.55', fontWeight: 500, marginBottom: '12px' }}>
                    Where would you like to travel next in Ares City? Select a dome coordinate below to trigger your hyperloop warp:
                  </p>
                  
                  {/* Step 5 Graphic/Transit Deck: Symmetrical sector warp buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '6px' }}>
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
                </div>
              )}

            </div>

            {/* Stepper Footer: Conversational Dialogue Reply Reactions */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px' }}>
              
              {/* Organic conversational reply options */}
              {currentStep === 1 && (
                <button 
                  onClick={handleNextStep}
                  className="hud-btn animate-fade"
                  style={{
                    padding: '8px 20px',
                    fontSize: '0.74rem',
                    background: 'rgba(var(--color-accent-rgb), 0.12)',
                    borderColor: 'var(--color-accent)',
                    color: '#080b13',
                    fontWeight: 700,
                    borderRadius: '20px'
                  }}
                >
                  [ Nice! Tell me more! ]
                </button>
              )}

              {currentStep === 2 && (
                <button 
                  onClick={handleNextStep}
                  className="hud-btn animate-fade"
                  style={{
                    padding: '8px 20px',
                    fontSize: '0.74rem',
                    background: 'rgba(var(--color-accent-rgb), 0.12)',
                    borderColor: 'var(--color-accent)',
                    color: '#080b13',
                    fontWeight: 700,
                    borderRadius: '20px'
                  }}
                >
                  [ Cool! What else? ]
                </button>
              )}

              {currentStep === 3 && (
                <button 
                  onClick={handleNextStep}
                  className="hud-btn animate-fade"
                  style={{
                    padding: '8px 20px',
                    fontSize: '0.74rem',
                    background: 'rgba(var(--color-accent-rgb), 0.12)',
                    borderColor: 'var(--color-accent)',
                    color: '#080b13',
                    fontWeight: 700,
                    borderRadius: '20px'
                  }}
                >
                  [ Calculus? What are your interests? ]
                </button>
              )}

              {currentStep === 4 && (
                <button 
                  onClick={handleNextStep}
                  className="hud-btn animate-fade"
                  style={{
                    padding: '8px 20px',
                    fontSize: '0.74rem',
                    background: 'rgba(var(--color-accent-rgb), 0.12)',
                    borderColor: 'var(--color-accent)',
                    color: '#080b13',
                    fontWeight: 700,
                    borderRadius: '20px'
                  }}
                >
                  [ Great! Let&apos;s explore Ares City! ]
                </button>
              )}

              {currentStep === 5 && (
                <button 
                  onClick={handleResetChat}
                  className="hud-btn animate-fade"
                  style={{
                    padding: '6px 16px',
                    fontSize: '0.65rem',
                    background: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                    color: '#080b13',
                    borderRadius: '16px',
                    fontWeight: 700
                  }}
                >
                  [ 🔄 Start Conversation Over ]
                </button>
              )}

              {/* Monospace quick hint */}
              <span style={{ fontSize: '0.45rem', color: 'rgba(0,0,0,0.35)', fontFamily: 'var(--font-tech)', fontWeight: 700, marginTop: '8px', letterSpacing: '0.2px' }}>
                HINT: KEYBOARD LEFT / RIGHT ARROW KEYS WORK TOO
              </span>

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
      `}</style>
    </div>
  );
}
