'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './page.css';

import INTERESTS from '../data/interests.json';
import PERSONAL from '../data/personal.json';
import InterestVisuals from '../components/InterestVisuals';
import InterestIconSvg from '../components/InterestIconSvg';
import SocialIconSvg from '../components/SocialIconSvg';

const getBrandColor = (name) => {
  switch (name.toLowerCase()) {
    case 'github': return '#22c55e';
    case 'linkedin': return '#00a2ff';
    case 'x': return '#f3f4f6';
    case 'youtube': return '#ef4444';
    case 'instagram': return '#ec4899';
    case 'facebook': return '#3b82f6';
    default: return '#00f0ff';
  }
};

const getBrandColorRgb = (name) => {
  switch (name.toLowerCase()) {
    case 'github': return '34, 197, 94';
    case 'linkedin': return '0, 162, 255';
    case 'x': return '243, 244, 246';
    case 'youtube': return '239, 68, 68';
    case 'instagram': return '236, 72, 153';
    case 'facebook': return '59, 130, 246';
    default: return '0, 240, 255';
  }
};

export default function AresDashboard() {
  const birthDate = new Date(PERSONAL.birthDate);
  
  const [marsAge, setMarsAge] = useState('15.800 MY');
  const [activeInterest, setActiveInterest] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [interestLightboxImg, setInterestLightboxImg] = useState(null);
  const activeTabRef = useRef(null);

  // Neuroadaptive container & element registration refs
  const containerRef = useRef(null);
  const elementsRef = useRef({});
  const interestsBlockRef = useRef(null);
  const socialsGridRef = useRef(null);

  const attentionStateRef = useRef({
    cursorX: -1000,
    cursorY: -1000,
    activeZoneId: null,
    dwellStartTime: 0,
    smoothedFocus: {},
    targetFocus: {},
    isReducedMotion: false,
    lastActiveTime: 0,
  });

  const [focusedZone, setFocusedZone] = useState(null);

  // Register DOM element for attention bounding box tracking
  const registerZone = useCallback((id, domNode, metadata = {}) => {
    if (!domNode) {
      delete elementsRef.current[id];
      delete attentionStateRef.current.smoothedFocus[id];
      delete attentionStateRef.current.targetFocus[id];
      return;
    }
    elementsRef.current[id] = {
      id,
      node: domNode,
      rect: domNode.getBoundingClientRect(),
      ...metadata,
    };
    if (attentionStateRef.current.smoothedFocus[id] === undefined) {
      attentionStateRef.current.smoothedFocus[id] = 0;
      attentionStateRef.current.targetFocus[id] = 0;
    }
  }, []);

  // Update bounding rects on resize/scroll
  useEffect(() => {
    const updateRects = () => {
      for (const id in elementsRef.current) {
        const item = elementsRef.current[id];
        if (item?.node) {
          item.rect = item.node.getBoundingClientRect();
        }
      }
    };

    window.addEventListener('resize', updateRects);
    window.addEventListener('scroll', updateRects, { passive: true });
    return () => {
      window.removeEventListener('resize', updateRects);
      window.removeEventListener('scroll', updateRects);
    };
  }, []);

  // Mouse tracking and attention inference engine (Desktop & Mobile)
  useEffect(() => {
    const state = attentionStateRef.current;

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.isReducedMotion = motionQuery.matches;
    const handleMotionChange = (e) => {
      state.isReducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Mouse movement listener (Natural cursor movement within region preserves dwell)
    const handleMouseMove = (e) => {
      state.cursorX = e.clientX;
      state.cursorY = e.clientY;
      state.lastActiveTime = performance.now();
    };

    const handleMouseLeave = () => {
      state.cursorX = -1000;
      state.cursorY = -1000;
      state.activeZoneId = null;
      state.dwellStartTime = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Core RAF Continuous Attention & Restrained Spatial Redistribution Loop
    let animId;
    let lastReactSync = 0;

    const runAttentionEngine = (now) => {
      const elements = elementsRef.current;
      const { cursorX, cursorY, smoothedFocus, targetFocus, isReducedMotion } = state;

      // 1. Identify Candidate Region (cursor within bounds or generous 24px proximity threshold)
      let candidateId = null;

      for (const id in elements) {
        const item = elements[id];
        if (!item?.rect) continue;
        const r = item.rect;

        const isInside =
          cursorX >= r.left - 24 &&
          cursorX <= r.right + 24 &&
          cursorY >= r.top - 24 &&
          cursorY <= r.bottom + 24;

        if (isInside) {
          candidateId = id;
          break;
        }
      }

      // 2. Accumulate Dwell (Natural movement within region preserves dwell)
      if (candidateId) {
        if (state.activeZoneId !== candidateId) {
          state.activeZoneId = candidateId;
          state.dwellStartTime = now;
        }

        const dwellDuration = now - state.dwellStartTime;

        // Progressive Focus curve (Neutral -> Noticing -> Attention -> Sustained -> Deep)
        // 0 to 350ms: Noticing (~0.30)
        // 350ms to 1500ms: Attention (~0.60)
        // 1500ms to 3500ms+: Deep Focus (0.85 -> 1.0)
        let computedFocus = 0.25;
        if (dwellDuration > 350 && dwellDuration <= 1500) {
          computedFocus = 0.30 + ((dwellDuration - 350) / 1150) * 0.35;
        } else if (dwellDuration > 1500) {
          computedFocus = 0.65 + Math.min((dwellDuration - 1500) / 2000, 1) * 0.35;
        }

        for (const id in targetFocus) {
          targetFocus[id] = id === candidateId ? computedFocus : 0;
        }
      } else {
        state.activeZoneId = null;
        state.dwellStartTime = 0;
        for (const id in targetFocus) {
          targetFocus[id] = 0;
        }
      }

      // 3. Asymmetric Smooth Interpolation (Onset: 0.085, Gentle Hysteresis Decay: 0.038)
      let maxFocus = 0;
      let dominantId = null;

      for (const id in smoothedFocus) {
        const target = targetFocus[id] || 0;
        const current = smoothedFocus[id] || 0;

        if (isReducedMotion) {
          smoothedFocus[id] = target;
        } else {
          const lerpRate = target > current ? 0.085 : 0.038;
          smoothedFocus[id] = current + (target - current) * lerpRate;
        }

        if (smoothedFocus[id] > maxFocus) {
          maxFocus = smoothedFocus[id];
          if (smoothedFocus[id] > 0.2) {
            dominantId = id;
          }
        }

        // Apply per-element focus variable directly to DOM
        if (elements[id]?.node) {
          elements[id].node.style.setProperty('--focus-val', smoothedFocus[id].toFixed(3));
        }
      }

      // 4. Restrained Spatial Parting Redistribution
      if (!isReducedMotion) {
        // --- A. Interest Grid Spatial Parting (Nearest available space first) ---
        let activeInterestId = null;
        let activeInterestFocus = 0;
        let activeRow = -1;
        let activeCol = -1;

        for (const id in elements) {
          if (id.startsWith('interest-') && smoothedFocus[id] > 0.05) {
            if (smoothedFocus[id] > activeInterestFocus) {
              activeInterestFocus = smoothedFocus[id];
              activeInterestId = id;
              activeRow = elements[id].row ?? -1;
              activeCol = elements[id].col ?? -1;
            }
          }
        }

        for (const id in elements) {
          if (!id.startsWith('interest-')) continue;
          const item = elements[id];
          if (!item.node) continue;

          if (activeInterestFocus > 0.05 && activeRow !== -1 && activeCol !== -1) {
            if (id === activeInterestId) {
              item.node.style.setProperty('--parting-x', '0px');
              item.node.style.setProperty('--parting-y', '0px');
            } else {
              const r = item.row ?? 0;
              const c = item.col ?? 0;
              const dRow = r - activeRow;
              const dCol = c - activeCol;

              // Nearest horizontal neighbor in same row shifts 2.5px to 4px
              let px = 0;
              let py = 0;

              if (dRow === 0 && dCol !== 0) {
                px = dCol * activeInterestFocus * 4; // max 4px
              } else if (Math.abs(dRow) === 1) {
                // Immediate row above/below shifts 2.5px to 3.5px
                py = Math.sign(dRow) * activeInterestFocus * 3.5;
                if (dCol !== 0) {
                  px = dCol * activeInterestFocus * 1.5;
                }
              } else if (Math.abs(dRow) > 1) {
                // Further rows shift gently 1.5px
                py = Math.sign(dRow) * activeInterestFocus * 2;
              }

              item.node.style.setProperty('--parting-x', `${px.toFixed(2)}px`);
              item.node.style.setProperty('--parting-y', `${py.toFixed(2)}px`);
            }
          } else {
            item.node.style.setProperty('--parting-x', '0px');
            item.node.style.setProperty('--parting-y', '0px');
          }
        }

        // --- B. Social Matrix Spatial Parting ---
        let activeSocialId = null;
        let activeSocialFocus = 0;
        let activeSocRow = -1;
        let activeSocCol = -1;

        for (const id in elements) {
          if (id.startsWith('social-') && smoothedFocus[id] > 0.05) {
            if (smoothedFocus[id] > activeSocialFocus) {
              activeSocialFocus = smoothedFocus[id];
              activeSocialId = id;
              activeSocRow = elements[id].row ?? -1;
              activeSocCol = elements[id].col ?? -1;
            }
          }
        }

        for (const id in elements) {
          if (!id.startsWith('social-')) continue;
          const item = elements[id];
          if (!item.node) continue;

          if (activeSocialFocus > 0.05 && activeSocRow !== -1 && activeSocCol !== -1) {
            if (id === activeSocialId) {
              item.node.style.setProperty('--parting-x', '0px');
              item.node.style.setProperty('--parting-y', '0px');
            } else {
              const r = item.row ?? 0;
              const c = item.col ?? 0;
              const dRow = r - activeSocRow;
              const dCol = c - activeSocCol;

              let px = 0;
              let py = 0;
              if (dRow === 0 && dCol !== 0) {
                px = dCol * activeSocialFocus * 3.5;
              } else if (Math.abs(dRow) >= 1) {
                py = Math.sign(dRow) * activeSocialFocus * 2.5;
              }

              item.node.style.setProperty('--parting-x', `${px.toFixed(2)}px`);
              item.node.style.setProperty('--parting-y', `${py.toFixed(2)}px`);
            }
          } else {
            item.node.style.setProperty('--parting-x', '0px');
            item.node.style.setProperty('--parting-y', '0px');
          }
        }

        // --- C. Biography -> Interest Registry Downward Yield (8px to 12px max) ---
        const bioFocus = smoothedFocus['bio-log'] || 0;
        if (interestsBlockRef.current) {
          const bioDisplacement = (bioFocus * 11).toFixed(2);
          interestsBlockRef.current.style.setProperty('--bio-displacement', `${bioDisplacement}px`);
        }

        // --- D. Avatar/Stats -> Social Matrix Downward Yield (6px to 8px max) ---
        const avatarFocus = smoothedFocus['avatar-stats'] || 0;
        if (socialsGridRef.current) {
          const avatarDisplacement = (avatarFocus * 7.5).toFixed(2);
          socialsGridRef.current.style.setProperty('--avatar-displacement', `${avatarDisplacement}px`);
        }
      }

      // Update container variables
      if (containerRef.current) {
        containerRef.current.style.setProperty('--global-focus', maxFocus.toFixed(3));
        const peripheralOpacity = (1 - maxFocus * 0.15).toFixed(3); // Strict floor ~0.85
        containerRef.current.style.setProperty('--peripheral-opacity', peripheralOpacity);
      }

      // Throttled React state sync
      if (now - lastReactSync > 80) {
        lastReactSync = now;
        setFocusedZone(dominantId);
      }

      animId = requestAnimationFrame(runAttentionEngine);
    };

    animId = requestAnimationFrame(runAttentionEngine);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

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
      const my = (diffDays / 686.98).toFixed(3);
      setMarsAge(`${my} MY`);
    };
    calculateAge();
    
    const interval = setInterval(calculateAge, 60000);
    return () => clearInterval(interval);
  }, [isMounted]);

  return (
    <div 
      ref={containerRef}
      className={`dashboard-main-container neuroadaptive-container ${focusedZone ? 'has-active-focus' : ''}`}
      data-focused-zone={focusedZone || 'none'}
    >

      {/* THE CENTRAL PROFILE TERMINAL CARD */}
      <div className="dashboard-left-col">
        {/* Terminal Scanline glow overlay */}
        <div className="dashboard-scanline-overlay"></div>

        {/* LEFT PANE: Avatar, Stats, and Social Matrix */}
        <div className="terminal-left-pane">
          
          {/* Profile Avatar & Stats Attention Zone */}
          <div 
            ref={(el) => registerZone('avatar-stats', el)}
            className="adaptive-zone avatar-stats-zone"
            tabIndex={0}
          >
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
              <div>MARS AGE: <span className="dashboard-stats-value">{isMounted ? marsAge : '15.800 MY'}</span></div>
            </div>
          </div>

          {/* Complete 6-Link Social Registry Matrix */}
          <div 
            ref={socialsGridRef}
            className="dashboard-socials-grid adaptive-socials-container"
          >
            {PERSONAL.socials.map((social, idx) => {
              const socialId = `social-${social.name.toLowerCase()}`;
              const row = Math.floor(idx / 2);
              const col = idx % 2;
              return (
                <a 
                  key={social.name}
                  ref={(el) => registerZone(socialId, el, { row, col })}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link-port dashboard-social-link adaptive-zone adaptive-social-link"
                  style={{
                    '--brand-color': getBrandColor(social.name),
                    '--brand-color-rgb': getBrandColorRgb(social.name)
                  }}
                >
                  <span className="social-icon-wrapper">
                    <SocialIconSvg brand={social.name.toLowerCase()} />
                  </span>
                  <span className="social-name-text">{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANE: Biography Log and Classified Interests */}
        <div className="terminal-right-pane">
          
          {/* Biography Block Attention Zone */}
          <div 
            ref={(el) => registerZone('bio-log', el)}
            className="dashboard-bio-block adaptive-zone adaptive-bio-block"
            tabIndex={0}
          >
            <span className="dashboard-section-label">// CITIZEN BIOGRAPHY LOG</span>
            <p className="dashboard-bio-text">
              {PERSONAL.bio}
            </p>
          </div>

          {/* Clickable Interests Mini-Tags (One-Scan Dashboard View) */}
          <div 
            ref={interestsBlockRef}
            className="dashboard-interests-block adaptive-interests-container"
          >
            <span className="dashboard-section-label">// CLASSIFIED INTEREST REGISTRY</span>
            
            <div className="dashboard-interests-list">
              {INTERESTS.map((interest, idx) => {
                const interestId = `interest-${interest.id}`;
                const row = Math.floor(idx / 2);
                const col = idx % 2;
                return (
                  <button
                    key={interest.id}
                    ref={(el) => registerZone(interestId, el, { row, col })}
                    onClick={() => setActiveInterest(interest)}
                    className="bento-interest-card adaptive-zone adaptive-interest-card"
                    style={{
                      '--interest-color': interest.themeColor || '#00f0ff',
                      '--interest-bg': interest.themeBg || 'rgba(0, 240, 255, 0.08)',
                    }}
                  >
                    {/* Tech corners */}
                    <span className="bento-corner bento-corner--tl"></span>
                    <span className="bento-corner bento-corner--tr"></span>
                    <span className="bento-corner bento-corner--bl"></span>
                    <span className="bento-corner bento-corner--br"></span>

                    {/* Clean inline SVG icon in the top-right */}
                    <div className="bento-card-icon-wrapper">
                      <InterestIconSvg type={interest.id} />
                    </div>
                    <span className="bento-interest-tag">{interest.tag}</span>
                    <span className="bento-chevron">➔</span>
                  </button>
                );
              })}
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

                {/* Photo Transmission Card */}
                {activeInterest.slides?.[activeSlide]?.image && (
                  <div 
                    className="interest-photo-card" 
                    style={{ 
                      borderColor: activeInterest.themeColor || 'rgba(0, 210, 255, 0.4)',
                      boxShadow: `0 0 15px ${activeInterest.themeColor ? activeInterest.themeColor + '22' : 'rgba(0, 210, 255, 0.12)'}`
                    }}
                  >
                    <span className="interest-photo-label" style={{ color: activeInterest.themeColor || '#00d2ff' }}>
                      {activeInterest.slides[activeSlide].imageLabel || '// PHOTO TRANSMISSION'}
                    </span>
                    <div 
                      className="interest-photo-frame"
                      onClick={() => setInterestLightboxImg({
                        src: activeInterest.slides[activeSlide].image,
                        caption: activeInterest.slides[activeSlide].imageCaption,
                        label: activeInterest.slides[activeSlide].imageLabel
                      })}
                    >
                      <img 
                        src={activeInterest.slides[activeSlide].image} 
                        alt={activeInterest.slides[activeSlide].imageCaption || 'Interest Photo'} 
                        className="interest-photo-img"
                      />
                      <div className="interest-photo-zoom-hint" style={{ borderColor: activeInterest.themeColor || '#00d2ff', color: activeInterest.themeColor || '#00d2ff' }}>
                        <span>🔍 CLICK TO EXPAND</span>
                      </div>
                    </div>
                    {activeInterest.slides[activeSlide].imageCaption && (
                      <div className="interest-photo-caption">
                        {activeInterest.slides[activeSlide].imageCaption}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Interest Photo Full-Res Lightbox */}
      {interestLightboxImg && (
        <div className="lightbox-overlay" onClick={() => setInterestLightboxImg(null)}>
          <div className="lightbox-hud">
            <div className="lightbox-label" style={{ color: activeInterest?.themeColor || '#00d2ff' }}>
              {interestLightboxImg.label || '// PHOTO TRANSMISSION // FULL_RES_VIEW'}
            </div>
            <button className="hud-btn lightbox-close-btn" onClick={() => setInterestLightboxImg(null)}>
              [ CLOSE ]
            </button>
          </div>
          <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-box" style={{ borderColor: activeInterest?.themeColor || '#00d2ff' }}>
              <img
                src={interestLightboxImg.src}
                alt={interestLightboxImg.caption || 'Interest Photo'}
                className="lightbox-image"
              />
            </div>
          </div>
          {interestLightboxImg.caption && (
            <div style={{ marginTop: '16px', fontFamily: 'var(--font-tech), monospace', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.5px', textAlign: 'center' }}>
              {interestLightboxImg.caption}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
