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

  // Lock background body scrolling when modal is active
  useEffect(() => {
    if (activeInterest) {
      document.documentElement.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
    }
    return () => {
      document.documentElement.classList.remove('modal-open');
    };
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

      {/* THE CENTRAL PROFILE TERMINAL CARD */}
      <div className="dashboard-left-col">
        {/* Terminal Scanline glow overlay */}
        <div className="dashboard-scanline-overlay"></div>

        {/* LEFT PANE: Avatar, Stats, and Social Matrix */}
        <div className="terminal-left-pane" style={{ zIndex: 2 }}>
          {/* Profile Avatar Frame - holographic transparent layout */}
          <div className="profile-avatar-frame">
            <img 
              src={PERSONAL.avatar} 
              alt={`${PERSONAL.name} Profile`} 
              className="profile-avatar-img"
            />
            {/* Subtle Corner Telemetry Accents */}
            <div className="avatar-corner avatar-corner--tl"></div>
            <div className="avatar-corner avatar-corner--tr"></div>
            <div className="avatar-corner avatar-corner--bl"></div>
            <div className="avatar-corner avatar-corner--br"></div>
          </div>

          {/* Core Stats Readout - Dynamic Hydration Gated */}
          <div className="dashboard-stats-readout">
            <div>CITIZEN: <span className="dashboard-stats-value">{PERSONAL.name}</span></div>
            <div>MARS AGE: <span className="dashboard-stats-value">{isMounted ? marsAge : '15.8 Sols'}</span></div>
          </div>

          {/* Complete 6-Link Social Registry Matrix */}
          <div className="dashboard-socials-grid">
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
          <div className="dashboard-bio-block">
            <span className="dashboard-section-label">// CITIZEN BIOGRAPHY LOG</span>
            <p className="dashboard-bio-text">
              {PERSONAL.bio}
            </p>
          </div>

          {/* Clickable Interests Mini-Tags (One-Scan Dashboard View) */}
          <div className="dashboard-interests-block">
            <span className="dashboard-section-label">// CLASSIFIED INTEREST REGISTRY</span>
            
            <div className="left-card-column dashboard-interests-list">
              {INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => setActiveInterest(interest)}
                  className="hud-badge dashboard-left-col-badge-btn"
                >
                  <span>[{interest.tag}]</span>
                  <span className="interest-icon-span">{interest.icon}</span>
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
          className="interest-modal-overlay"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="interest-modal-content"
            style={{ '--dynamic-color': activeInterest.themeColor || '#ff5722' }}
          >
            {/* Modal Header */}
            <div className="interest-modal-header">
              <span className="interest-modal-title">
                // ACTIVE_SECTOR_SYNC: {activeInterest.tag}
              </span>
              <button 
                onClick={() => setActiveInterest(null)}
                className="hud-btn custom-close-btn interest-modal-close"
              >
                [ ✕ CLOSE DECK ]
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="custom-scroll interest-modal-scroll">
              <div className="interest-modal-body">
                
                {/* Description Narrative card */}
                <div className="interest-desc-card">
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
                              className={`hud-btn interest-tab-btn ${isActive ? 'interest-tab-btn--active' : ''}`}
                              style={isActive ? {
                                borderColor: activeInterest.themeColor,
                                background: activeInterest.themeBg,
                                color: activeInterest.themeColor,
                              } : {}}
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

                  <div className="interest-desc-text">
                     {activeInterest.slides && activeInterest.slides[activeSlide] ? (
                       <div>
                         <span className="interest-slide-content">
                           {activeInterest.slides[activeSlide].content}
                         </span>
                         
                         {/* Sub-slides back button */}
                         {activeSlide > 0 && (

                           <div className="interest-back-row">
                             <button
                               onClick={() => setActiveSlide(0)}
                               className="hud-btn interest-back-btn"
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
                  <span className="interest-visual-label">// VISUAL CORE GRAPHIC</span>
                  
                  <InterestVisuals svgType={activeInterest.slides?.[activeSlide]?.svgType} />

                </div>

                {/* Embedded YouTube Transmission Deck */}
                {activeInterest.slides?.[activeSlide]?.embed === 'youtube_playlist' && (
                  <div className="interest-youtube-card">
                    <span className="interest-youtube-label">// TRANSMISSION DECK // PLAYLIST EMBED</span>
                    <div 
                      className="interest-youtube-ratio"
                      style={{ border: `1.5px solid ${activeInterest.themeColor || 'rgba(255, 179, 0, 0.3)'}`, boxShadow: `0 0 15px ${activeInterest.themeColor ? activeInterest.themeColor + '33' : 'rgba(255, 179, 0, 0.12)'}` }}
                    >
                      <iframe
                        src={activeInterest.slides?.[activeSlide]?.embedUrl || "https://www.youtube.com/embed/videoseries?list=PL3IqUVH23uWxWTt4bWtFqcBu7BooiWXpf"}
                        title={`${activeInterest.title} Playlist`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="interest-youtube-frame"
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
