'use client';

import { useState, useEffect, useRef } from 'react';

import INTERESTS from '../data/interests.json';
import PERSONAL from '../data/personal.json';
import InterestVisuals from '../components/InterestVisuals';


export default function AresDashboard() {
  const birthDate = new Date(PERSONAL.birthDate);
  
  const [marsAge, setMarsAge] = useState('15.8 Sols');
  const [activeInterest, setActiveInterest] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const activeTabRef = useRef(null);

  // Scroll active slide button into view smoothly
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeSlide]);

  // Set mounted state to prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset slide index when active interest changes
  useEffect(() => {
    setActiveSlide(0);
  }, [activeInterest]);

  // Dynamic Mars Age calculation based on current time - client side only
  useEffect(() => {
    if (!isMounted) return;

    const calculateAge = () => {
      const now = new Date();
      const diffTime = Math.abs(now - birthDate);
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      // Mars orbit is 686.98 Earth Days
      const my = (diffDays / 686.98).toFixed(1);
      setMarsAge(`${my} Sols`);
    };
    calculateAge();
    
    // Interval check every minute
    const interval = setInterval(calculateAge, 60000);
    return () => clearInterval(interval);
  }, [isMounted]);

  return (
    <div className="dashboard-main-container">
      
      {/* Pure CSS Layout Engine */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-turntable {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-custom {
          animation: spin-turntable 8s linear infinite;
        }
        .hud-badge {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hud-badge:active {
          background: rgba(0, 240, 255, 0.2) !important;
          border-color: rgba(0, 240, 255, 0.5) !important;
          transform: scale(0.96) !important;
        }
        .social-link-port {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-link-port:active {
          background: rgba(0, 240, 255, 0.25) !important;
          border-color: rgba(0, 240, 255, 0.6) !important;
          transform: scale(0.94) !important;
        }
        .custom-close-btn:active {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: scale(0.96) !important;
        }

        /* Desktop Dashboard Centered Grid System */
        .dashboard-main-container {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: row;
          justify-content: center; /* Widescreen centering */
          align-items: center;     /* Widescreen centering */
          gap: 24px;
          padding: 24px;
          box-sizing: border-box;
          overflow: hidden;
          height: 100%;
          width: 100%;
          min-height: 0;
        }

        .dashboard-left-col {
          width: 100%;
          max-width: 800px; /* Expanded desktop size */
          background: rgba(10, 6, 6, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row; /* Horizontal columns split on desktop */
          gap: 28px;
          z-index: 10;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.05);
          max-height: 90%;
        }

        .terminal-left-pane {
          width: 280px;
          min-width: 280px;
          display: flex;
          flex-direction: column;
        }

        .terminal-right-pane {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0; /* Prevents overflow */
        }

        .profile-avatar-frame {
          width: 100%;
          height: 170px;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: radial-gradient(circle at center, rgba(0, 240, 255, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.08);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 2;
          flex-shrink: 0;
          margin-bottom: 16px;
        }

        .dashboard-left-col-badge-btn {
          font-family: monospace, var(--font-tech);
          font-size: 0.68rem;
          padding: 10px 14px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          width: 100%;
          text-align: left;
          color: var(--text-primary);
        }

        .dashboard-social-link {
          padding: 8px 4px;
          font-size: 0.62rem;
          justify-content: center;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        @media (max-width: 900px) {
          .dashboard-main-container {
            position: relative !important;
            inset: auto !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: stretch !important;
            gap: 16px !important;
            padding: 16px !important;
            overflow: visible !important;
            height: auto !important;
            min-height: 100% !important;
          }

          .profile-avatar-frame {
            width: 100% !important;
            min-width: 0 !important;
            height: 160px !important;
            margin-bottom: 16px !important;
          }

          .dashboard-left-col {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            flex-direction: column !important;
            gap: 16px !important;
            padding: 16px !important;
            height: auto !important;
            max-height: none !important;
          }

          .terminal-left-pane {
            width: 100% !important;
            min-width: 0 !important;
          }

          .dashboard-left-col-badge-btn {
            padding: 12px 16px !important;
          }

          .dashboard-social-link {
            padding: 12px 4px !important;
            font-size: 0.72rem !important;
          }
        }

        /* Responsive Interest Modal Header & Tabs */
        .interest-header-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          gap: 12px;
          width: 100%;
        }

        .interest-log-label {
          font-family: monospace, var(--font-tech);
          font-size: 0.55rem;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 1px;
          white-space: nowrap;
        }

        .interest-tabs-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 2px 0;
        }

        .interest-tabs-container::-webkit-scrollbar {
          display: none;
        }

        /* Responsive CTA Grid and Tactile Buttons */
        .interest-cta-grid {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 10px;
          margin-top: 12px;
          width: 100%;
        }

        .interest-cta-btn {
          flex: 1;
          padding: 8px 12px;
          font-family: monospace, var(--font-tech);
          font-size: 0.68rem;
          text-align: center;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .interest-cta-btn:active {
          transform: scale(0.97);
        }

        @media (max-width: 768px) {
          .interest-header-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .interest-log-label {
            text-align: left;
            white-space: normal !important;
          }
          .interest-tabs-container {
            justify-content: flex-start !important;
            width: 100%;
          }
          .interest-cta-grid {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .interest-cta-btn {
            width: 100% !important;
            flex: none !important;
          }
        }
      `}} />

      {/* THE CENTRAL PROFILE TERMINAL CARD */}
      <div className="dashboard-left-col">
        {/* Terminal Scanline glow overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(255, 255, 255, 0.02) 50%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          zIndex: 1
        }}></div>

        {/* LEFT PANE: Avatar, Stats, and Social Matrix */}
        <div className="terminal-left-pane" style={{ zIndex: 2 }}>
          {/* Profile Avatar Frame - holographic transparent layout */}
          <div className="profile-avatar-frame">
            <img 
              src={PERSONAL.avatar} 
              alt={`${PERSONAL.name} Profile`} 
              style={{
                height: '95%',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 10px rgba(0, 240, 255, 0.25))'
              }}
            />
            {/* Subtle Corner Telemetry Accents */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '6px', height: '6px', borderTop: '2px solid rgba(0,240,255,0.4)', borderLeft: '2px solid rgba(0,240,255,0.4)' }}></div>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', borderTop: '2px solid rgba(0,240,255,0.4)', borderRight: '2px solid rgba(0,240,255,0.4)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '6px', height: '6px', borderBottom: '2px solid rgba(0,240,255,0.4)', borderLeft: '2px solid rgba(0,240,255,0.4)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '6px', height: '6px', borderBottom: '2px solid rgba(0,240,255,0.4)', borderRight: '2px solid rgba(0,240,255,0.4)' }}></div>
          </div>

          {/* Core Stats Readout - Dynamic Hydration Gated */}
          <div style={{
            fontFamily: 'monospace, var(--font-tech)',
            fontSize: '0.8rem',
            color: '#00f0ff',
            letterSpacing: '0.5px',
            lineHeight: '1.6',
            borderBottom: '1px dashed rgba(255, 255, 255, 0.1)',
            paddingBottom: '10px',
            marginBottom: '14px',
            textAlign: 'left',
            textShadow: '0 0 6px rgba(0, 240, 255, 0.3)',
            flexShrink: 0
          }}>
            <div>CITIZEN: <span style={{ color: '#fff', fontWeight: 'bold' }}>{PERSONAL.name}</span></div>
            <div>MARS AGE: <span style={{ color: '#fff', fontWeight: 'bold' }}>{isMounted ? marsAge : '15.8 Sols'}</span></div>
          </div>

          {/* Complete 6-Link Social Registry Matrix */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '6px',
            marginTop: 'auto',
            flexShrink: 0
          }}>
            {PERSONAL.socials.map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link-port dashboard-social-link"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT PANE: Biography Log and Classified Interests */}
        <div className="terminal-right-pane" style={{ zIndex: 2 }}>
          {/* Biography Block */}
          <div style={{
            textAlign: 'left',
            marginBottom: '16px',
            flexShrink: 0
          }}>
            <span style={{
              fontFamily: 'monospace, var(--font-tech)',
              fontSize: '0.62rem',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '4px'
            }}>// CITIZEN BIOGRAPHY LOG</span>
            <p style={{
              fontSize: '0.78rem',
              lineHeight: '1.5',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontWeight: 400
            }}>
              {PERSONAL.bio}
            </p>
          </div>

          {/* Clickable Interests Mini-Tags (One-Scan Dashboard View) */}
          <div style={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0
          }}>
            <span style={{
              fontFamily: 'monospace, var(--font-tech)',
              fontSize: '0.62rem',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '6px'
            }}>// CLASSIFIED INTEREST REGISTRY</span>
            
            <div className="left-card-column" style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
              {INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => setActiveInterest(interest)}
                  className="hud-badge dashboard-left-col-badge-btn"
                >
                  <span>[{interest.tag}]</span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>{interest.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FULL-SCREEN IMMERSIVE INTEREST DETAILS MODAL OVERLAY */}
      {activeInterest && (
        <div 
          onClick={() => setActiveInterest(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(4, 6, 12, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '720px',
              maxHeight: '92vh',
              background: 'rgba(10, 14, 30, 0.94)',
              border: '2px solid var(--color-accent)',
              borderColor: activeInterest.themeColor || '#ff5722',
              borderRadius: '16px',
              boxShadow: '0 0 35px rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxSizing: 'border-box',
              textAlign: 'left'
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              <span style={{
                fontFamily: 'monospace, var(--font-tech)',
                fontSize: '0.65rem',
                color: activeInterest.themeColor || '#ff5722',
                fontWeight: 'bold',
                letterSpacing: '1.5px'
              }}>
                // ACTIVE_SECTOR_SYNC: {activeInterest.tag}
              </span>
              <button 
                onClick={() => setActiveInterest(null)}
                className="hud-btn custom-close-btn"
                style={{
                  padding: '8px 18px',
                  fontSize: '0.72rem',
                  borderColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                [ ✕ CLOSE DECK ]
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="custom-scroll" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Description Narrative card */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '16px',
                  boxSizing: 'border-box'
                }}>
                  <div className="interest-header-row">
                    <span className="interest-log-label">
                      // DATA DESCRIPTIVE LOG {activeSlide === 0 ? `[ ${activeInterest.tag} OVERVIEW_DECK ]` : `[ DECK_SLIDE 0${activeSlide}/0${activeInterest.slides ? activeInterest.slides.length - 1 : 1} ]`}
                    </span>

                    {/* Dynamic Paging Indicators */}
                    {activeInterest.slides && (
                      <div className="interest-tabs-container">
                        {activeInterest.slides.map((slide, idx) => {
                          const isActive = idx === activeSlide;
                          return (
                            <button
                              key={idx}
                              ref={isActive ? activeTabRef : null}
                              onClick={() => setActiveSlide(idx)}
                              className="hud-btn"
                              style={{
                                padding: '2px 8px',
                                fontSize: '0.55rem',
                                borderColor: isActive ? activeInterest.themeColor : 'rgba(255,255,255,0.15)',
                                background: isActive ? activeInterest.themeBg : 'transparent',
                                color: isActive ? activeInterest.themeColor : 'rgba(255,255,255,0.6)',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                flexShrink: 0,
                                outline: 'none'
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                                  e.currentTarget.style.background = 'transparent';
                                }
                              }}
                            >
                              [ {slide.label} ]
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div style={{
                    fontSize: '0.82rem',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.9)',
                    margin: 0,
                    minHeight: '80px',
                    transition: 'all 0.25s ease'
                  }}>
                     {activeInterest.slides && activeInterest.slides[activeSlide] ? (
                       <div>
                         <span style={{ display: 'block', marginBottom: '8px' }}>
                           {activeInterest.slides[activeSlide].content}
                         </span>
                         
                         {/* Sub-slides back button */}
                         {activeSlide > 0 && (
                           <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                             <button
                               onClick={() => setActiveSlide(0)}
                               className="hud-btn"
                               style={{
                                 borderColor: 'rgba(255, 255, 255, 0.25)',
                                 color: 'rgba(255, 255, 255, 0.85)',
                                 background: 'rgba(255, 255, 255, 0.03)',
                                 borderRadius: '6px',
                                 cursor: 'pointer',
                                 fontSize: '0.62rem',
                                 padding: '6px 16px',
                                 transition: 'all 0.2s ease',
                                 outline: 'none'
                               }}
                               onMouseEnter={(e) => {
                                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                               }}
                               onMouseLeave={(e) => {
                                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                               }}
                             >
                               [ ↩ BACK TO OVERVIEW ]
                             </button>
                           </div>
                         )}
                       </div>
                     ) : (
                       <span>{activeInterest.desc}</span>
                     )}
                  </div>
                </div>

                  {/* Tactical SVG Graphic Canvas */}
                  <div>
                  <span style={{
                    display: 'block',
                    fontFamily: 'monospace, var(--font-tech)',
                    fontSize: '0.55rem',
                    color: 'rgba(255, 255, 255, 0.4)',
                    letterSpacing: '1px',
                    marginBottom: '8px'
                  }}>// VISUAL CORE GRAPHIC</span>
                  
                  <InterestVisuals svgType={activeInterest.slides?.[activeSlide]?.svgType} />

                </div>

                {/* Embedded YouTube Transmission Deck */}
                {activeInterest.slides?.[activeSlide]?.embed === 'youtube_playlist' && (
                  <div style={{
                    marginTop: '5px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    padding: '16px',
                    boxSizing: 'border-box'
                  }}>
                    <span style={{
                      display: 'block',
                      fontFamily: 'monospace, var(--font-tech)',
                      fontSize: '0.55rem',
                      color: 'rgba(255, 255, 255, 0.4)',
                      letterSpacing: '1px',
                      marginBottom: '8px'
                    }}>// TRANSMISSION DECK // PLAYLIST EMBED</span>
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      paddingBottom: '56.25%', /* 16:9 aspect ratio */
                      height: 0,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1.5px solid rgba(255, 179, 0, 0.3)',
                      boxShadow: '0 0 15px rgba(255, 179, 0, 0.12)'
                    }}>
                      <iframe
                        src="https://www.youtube.com/embed/videoseries?list=PL3IqUVH23uWxWTt4bWtFqcBu7BooiWXpf"
                        title="Karaoke Favorites Playlist"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 0
                        }}
                      ></iframe>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
