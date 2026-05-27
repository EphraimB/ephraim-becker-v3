'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NeurodiversityAdvocacy() {
  const [transitState, setTransitState] = useState('slide-active');
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("https://ephraim-becker.com/neurodiversity");
  const [shareText, setShareText] = useState("Explore the Neurodiversity Advocacy portal in Ephraim Becker's Ares City. Let's move past old-school special needs pathology models and celebrate cognitive variation: ");
  const [currentConsoleSector, setCurrentConsoleSector] = useState('matrix'); // 'matrix', 'lexicon', 'history', 'story', 'advocacy'
  const [activeChapter, setActiveChapter] = useState(0); // 0 to 4 for historical Chapters 01-05
  const [activeStoryPhase, setActiveStoryPhase] = useState(0); // 0 to 4 for story Phases 01-05
  const [glitchActive, setGlitchActive] = useState(false);
  const [lexiconSearch, setLexiconSearch] = useState('');
  const [lexiconCategory, setLexiconCategory] = useState('all'); // 'all', 'energy', 'social', 'cognitive'
  
  // Local checklist states for Advocacy Protocols
  const [protocols, setProtocols] = useState({
    destigmatize: false,
    accommodate: false,
    speakup: false
  });

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
      
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

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const toggleProtocol = (key) => {
    setProtocols(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const changeSector = (sector) => {
    if (currentConsoleSector === sector) return;
    setGlitchActive(true);
    setCurrentConsoleSector(sector);
    setTimeout(() => setGlitchActive(false), 220);
  };

  const allProtocolsChecked = protocols.destigmatize && protocols.accommodate && protocols.speakup;

  return (
    <div className="citizen-card-shell neuro-page-shell" style={{ flexDirection: 'column' }}>
      
      {/* Dynamic Keyframes and Animations Block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-red-alert {
          0% { opacity: 0.15; fill: rgba(234, 67, 53, 0.05); stroke: rgba(234, 67, 53, 0.2); }
          50% { opacity: 0.6; fill: rgba(234, 67, 53, 0.15); stroke: rgba(234, 67, 53, 0.5); }
          100% { opacity: 0.15; fill: rgba(234, 67, 53, 0.05); stroke: rgba(234, 67, 53, 0.2); }
        }
        @keyframes sweep-spotlight {
          0% { transform: rotate(-25deg); opacity: 0.2; }
          50% { transform: rotate(25deg); opacity: 0.5; }
          100% { transform: rotate(-25deg); opacity: 0.2; }
        }
        @keyframes shiver-node {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-1px, 1px); }
          50% { transform: translate(0, -1px); }
          75% { transform: translate(1px, 0); }
          100% { transform: translate(0, 0); }
        }
        @keyframes electrical-discharge {
          0% { opacity: 0.1; stroke-dashoffset: 0; }
          20% { opacity: 1; stroke-dashoffset: 5; }
          40% { opacity: 0.2; stroke-dashoffset: 15; }
          60% { opacity: 0.8; stroke-dashoffset: 8; }
          80% { opacity: 0.1; stroke-dashoffset: 20; }
          100% { opacity: 0.1; stroke-dashoffset: 0; }
        }
        @keyframes pulse-signal-ring {
          0% { r: 5px; opacity: 1; stroke: #00ff88; }
          100% { r: 35px; opacity: 0; stroke: #00f0ff; }
        }
        @keyframes phase-wave-emerald {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }
        @keyframes synaptic-pulse {
          0% { r: 5px; opacity: 0.8; filter: drop-shadow(0 0 2px #00ff88); }
          50% { r: 7.5px; opacity: 1; filter: drop-shadow(0 0 8px #00ff88); }
          100% { r: 5px; opacity: 0.8; filter: drop-shadow(0 0 2px #00ff88); }
        }
        @keyframes drift-and-gravitate-1 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(4px, -6px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift-and-gravitate-2 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-5px, 4px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift-and-gravitate-3 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(6px, 5px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift-and-gravitate-4 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-3px, -5px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes pulse-amber-warn {
          0% { opacity: 0.3; }
          50% { opacity: 0.95; }
          100% { opacity: 0.3; }
        }

        @keyframes discharge-burnout {
          0% { stroke: #00ff88; fill: rgba(0, 255, 136, 0.15); }
          25% { stroke: #ffb300; fill: rgba(255, 179, 0, 0.1); }
          50% { stroke: #ea4335; fill: rgba(234, 67, 53, 0.04); }
          75% { stroke: #666; fill: rgba(100, 100, 100, 0.01); opacity: 0.2; }
          100% { stroke: #00ff88; fill: rgba(0, 255, 136, 0.15); }
        }
        @keyframes battery-drain {
          0% { width: 30px; fill: #00ff88; }
          40% { width: 30px; fill: #00ff88; }
          75% { width: 8px; fill: #ea4335; }
          90% { width: 2px; fill: #ea4335; opacity: 0.3; }
          100% { width: 30px; fill: #00ff88; }
        }
        @keyframes true-self-shake {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(0.92) translate(-1px, 1px); opacity: 0.4; }
        }
        @keyframes laser-sweep {
          0%, 100% { stroke-dashoffset: 0; opacity: 0.8; }
          50% { stroke-dashoffset: -30; opacity: 1; filter: drop-shadow(0 0 4px #00ff88); }
        }
        @keyframes momentum-slide {
          0% { cx: 20; }
          30% { cx: 20; }
          70% { cx: 80; }
          100% { cx: 80; }
        }
        @keyframes overload-crash {
          0% { fill: rgba(0, 255, 136, 0.1); stroke: #00ff88; }
          40% { fill: rgba(255, 179, 0, 0.2); stroke: #ffb300; }
          48% { fill: rgba(234, 67, 53, 0.4); stroke: #ea4335; }
          52% { fill: rgba(0, 0, 0, 0.9); stroke: rgba(255, 255, 255, 0.05); }
          65% { fill: rgba(0, 240, 255, 0.02); stroke: rgba(0, 240, 255, 0.3); stroke-dasharray: 2 2; }
          100% { fill: rgba(0, 240, 255, 0.08); stroke: #00f0ff; }
        }

        .lexicon-search-input:focus {
          border-color: #00ff88 !important;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.15), inset 0 1px 3px rgba(0, 255, 136, 0.05) !important;
        }

        .console-selector-bar {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 20px;
          flex-shrink: 0;
        }
        .console-selector-btn {
          padding: 12px 6px;
          font-family: var(--font-tech);
          font-size: 0.72rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          background: rgba(6, 9, 20, 0.6);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          text-align: center;
          outline: none;
          box-shadow: inset 0 1px 3px rgba(255,255,255,0.02);
        }
        .console-selector-btn:hover {
          border-color: rgba(0, 255, 136, 0.4);
          color: #00ff88;
          background: rgba(0, 255, 136, 0.04);
        }
        .console-selector-btn.active {
          border-color: #00ff88;
          color: #00ff88;
          background: rgba(0, 255, 136, 0.12);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.2), inset 0 1px 4px rgba(0, 255, 136, 0.1);
          text-shadow: 0 0 6px rgba(0, 255, 136, 0.5);
        }
        .console-selector-btn.active.amber-pulse {
          border-color: #ffb300;
          color: #ffb300;
          background: rgba(255, 179, 0, 0.12);
          box-shadow: 0 0 15px rgba(255, 179, 0, 0.2), inset 0 1px 4px rgba(255, 179, 0, 0.1);
          text-shadow: 0 0 6px rgba(255, 179, 0, 0.5);
        }
        .console-selector-btn:hover.amber-pulse {
          border-color: rgba(255, 179, 0, 0.4);
          color: #ffb300;
          background: rgba(255, 179, 0, 0.04);
        }

        .deck-tab-bar {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin-bottom: 20px;
        }
        .deck-tab-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 10px 4px;
          font-family: monospace, var(--font-tech);
          background: rgba(6, 9, 20, 0.65);
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.85);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          min-height: 54px;
          box-shadow: inset 0 1px 3px rgba(255,255,255,0.02);
        }
        .deck-tab-btn:hover {
          background: rgba(0, 255, 136, 0.05);
          border-color: rgba(0, 255, 136, 0.5);
          color: #00ff88;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.15);
        }
        .deck-tab-btn.active {
          background: rgba(0, 255, 136, 0.15);
          border-color: #00ff88;
          color: #00ff88;
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.35);
          font-weight: bold;
          text-shadow: 0 0 6px rgba(0, 255, 136, 0.5);
        }
        .deck-tab-btn .tab-num {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .deck-tab-btn .tab-sub {
          font-size: 0.55rem;
          opacity: 0.7;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-top: 2px;
          font-weight: normal;
        }
        .deck-tab-btn.active .tab-sub {
          opacity: 0.95;
        }

        .timeline-box {
          background: rgba(6, 9, 20, 0.85);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }
        .timeline-box:hover {
          background: rgba(6, 9, 20, 0.92);
          border-color: rgba(0, 255, 136, 0.25);
          box-shadow: 0 6px 20px rgba(0, 255, 136, 0.08);
        }

        .share-pill-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          font-family: monospace, var(--font-tech);
          font-size: 0.68rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          outline: none;
        }
        .share-pill-btn:hover {
          background: rgba(0, 255, 136, 0.08);
          border-color: #00ff88;
          color: #00ff88;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.15);
        }
        .share-pill-btn:active {
          transform: scale(0.96);
        }
        
        .protocol-checkbox {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: monospace;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.7);
        }
        .protocol-checkbox.active {
          background: rgba(0, 255, 136, 0.05);
          border: 1.5px solid #00ff88;
          color: #ffffff;
        }
        .protocol-checkbox:hover {
          border-color: rgba(0, 255, 136, 0.4);
        }
        
        .neuro-page-shell {
          height: calc(100vh - 160px);
          max-height: calc(100vh - 160px);
          min-height: 0;
        }
        .neuro-content-container {
          height: 100%;
          max-height: 100%;
          min-height: 0;
        }
        .neuro-deck-layout {
          display: flex;
          flex-direction: row;
          gap: 20px;
          flex: 1;
          min-height: 0;
        }
        .neuro-left-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
          height: 100%;
          max-height: 100%;
        }
        .neuro-right-col {
          width: 320px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
          height: 100%;
          max-height: 100%;
        }
        
        .matrix-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
        }
        .matrix-row-title {
          font-family: var(--font-tech);
          font-size: 0.65rem;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          padding: 4px 0;
          text-align: left;
        }

        /* History layout float-wrapping styles */
        .history-text {
          position: relative;
          padding-right: 280px;
          min-height: 185px;
          display: block;
        }
        .history-text p, .history-text h4 {
          max-width: 680px;
        }
        .history-svg-box {
          position: absolute;
          right: 0;
          top: 0;
          width: 260px;
          height: 185px;
          background: #070a12;
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          overflow: hidden;
        }

        /* Advocacy grid */
        .advocacy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* Story grid */
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .story-card-wide {
          grid-column: span 2;
        }

        @media (max-width: 900px) {
          .story-card-wide {
            grid-column: span 1 !important;
          }
          .neuro-page-shell {
            height: auto !important;
            max-height: none !important;
          }
          .neuro-content-container {
            height: auto !important;
            max-height: none !important;
          }
          .console-selector-bar {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .neuro-deck-layout {
            flex-direction: column !important;
            height: auto !important;
            flex: none !important;
          }
          .neuro-left-col, .neuro-right-col {
            width: 100% !important;
            height: auto !important;
            flex: none !important;
            overflow-y: visible !important;
            min-height: auto !important;
          }
          .advocacy-grid {
            grid-template-columns: 1fr !important;
          }
          .story-grid {
            grid-template-columns: 1fr !important;
          }
          .history-text {
            position: static !important;
            padding-right: 0 !important;
            min-height: 0 !important;
            display: block !important;
          }
          .history-svg-box {
            position: static !important;
            float: right !important;
            margin-left: 12px !important;
            margin-bottom: 8px !important;
            width: 140px !important;
            height: 110px !important;
          }
          .deck-tab-bar {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 4px !important;
            margin-bottom: 12px !important;
          }
          .deck-tab-btn {
            padding: 6px 2px !important;
            min-height: 44px !important;
          }
          .deck-tab-btn .tab-num {
            font-size: 0.68rem !important;
          }
          .deck-tab-btn .tab-sub {
            font-size: 0.46rem !important;
            letter-spacing: 0px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            width: 100% !important;
          }
        }

        @media (max-width: 540px) {
          .deck-tab-btn .tab-sub {
            display: none !important;
          }
          .deck-tab-btn {
            min-height: 36px !important;
            padding: 8px 4px !important;
          }
          .deck-tab-btn .tab-num {
            font-size: 0.72rem !important;
          }
        }
      `}} />

      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Bubbly floating content area */}
      <div className={`walking-content-container neuro-content-container ${transitState}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Holographic Console Selector Bar */}
        <div className="console-selector-bar">
          <button 
            onClick={() => changeSector('matrix')}
            className={`console-selector-btn ${currentConsoleSector === 'matrix' ? 'active' : ''}`}
          >
            📊 Paradigm Matrix
          </button>
          <button 
            onClick={() => changeSector('lexicon')}
            className={`console-selector-btn ${currentConsoleSector === 'lexicon' ? 'active' : ''}`}
          >
            📑 Synaptic Lexicon
          </button>
          <button 
            onClick={() => changeSector('history')}
            className={`console-selector-btn ${currentConsoleSector === 'history' ? 'active' : ''}`}
          >
            ⏳ History Timeline
          </button>
          <button 
            onClick={() => changeSector('story')}
            className={`console-selector-btn amber-pulse ${currentConsoleSector === 'story' ? 'active' : ''}`}
          >
            📖 My Story ⚠️
          </button>
          <button 
            onClick={() => changeSector('advocacy')}
            className={`console-selector-btn ${currentConsoleSector === 'advocacy' ? 'active' : ''}`}
          >
            🛠️ Advocacy Center
          </button>
        </div>

        {/* Dynamic Two-Column Layout */}
        <div className="neuro-deck-layout">
          
          {/* LEFT COLUMN: Main Selected Console View */}
          <div className="neuro-left-col custom-scroll">
            
            <div 
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                opacity: glitchActive ? 0.35 : 1,
                filter: glitchActive ? 'skewX(2.2deg) blur(0.5px) contrast(1.5)' : 'none',
                transition: 'opacity 0.15s ease, filter 0.15s ease'
              }}
            >
              
              {/* SECTION A: THE PARADIGM MATRIX VIEW */}
              {currentConsoleSector === 'matrix' && (
                <>
                  {/* Summary / Introduction block */}
                  <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.9rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🧠 The Neurodiversity Paradigm
                      </h3>
                      <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: 'rgba(0, 255, 136, 0.5)', letterSpacing: '1px' }}>
                        // THEORETICAL FRAMEWORK
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      The neurodiversity paradigm reframes biological variation as a valuable, natural aspect of human diversity—akin to biodiversity in ecological domes. It is a civil rights blueprint that moves away from pathologizing individual brains, advocating instead for removing environmental barriers and fostering authentic social acceptance.
                    </p>
                  </div>

                  {/* Expanded comparative matrix */}
                  <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                    <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.8rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
                      // SYSTEM PROTOCOLS // CORE COMPREHENSIVE MATRIX
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      
                      {/* Matrix Row 1: Philosophy */}
                      <div>
                        <div className="matrix-row-title">I. Core Philosophy & Premise</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div style={{ background: 'rgba(234, 67, 53, 0.02)', border: '1.5px solid rgba(234, 67, 53, 0.18)', borderRadius: '8px', padding: '14px' }}>
                            <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.7rem', color: '#ea4335', marginBottom: '6px' }}>❌ DEFICIT / PATHOLOGY MODEL</strong>
                            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.5 }}>
                              Views differences (Autism, ADHD, Dyslexia) as biological anomalies, genetic errors, or clinical diseases inside the individual that must be corrected, prevented, or seeking medical &quot;cures&quot; to restore normal functioning.
                            </p>
                          </div>
                          <div style={{ background: 'rgba(0, 255, 136, 0.02)', border: '1.5px solid rgba(0, 255, 136, 0.22)', borderRadius: '8px', padding: '14px' }}>
                            <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.7rem', color: '#00ff88', marginBottom: '6px' }}>✨ NEURODIVERSITY PARADIGM</strong>
                            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.5 }}>
                              Reframes neurological variations as biological realities—natural and valuable variations of the human genome. Celebrates neurodiversity as a vital asset to human evolution, analogous to biodiversity in a biosphere.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Matrix Row 2: Disability */}
                      <div>
                        <div className="matrix-row-title">II. Concept of Disability & Barriers</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div style={{ background: 'rgba(234, 67, 53, 0.02)', border: '1.5px solid rgba(234, 67, 53, 0.18)', borderRadius: '8px', padding: '14px' }}>
                            <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.7rem', color: '#ea4335', marginBottom: '6px' }}>❌ DEFICIT / PATHOLOGY MODEL</strong>
                            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.5 }}>
                              Equates cognitive difference directly with intrinsic medical impairment. Social friction or difficulties are blamed entirely on the individual's &quot;deficits,&quot; social dysfunction, or cognitive limits.
                            </p>
                          </div>
                          <div style={{ background: 'rgba(0, 255, 136, 0.02)', border: '1.5px solid rgba(0, 255, 136, 0.22)', borderRadius: '8px', padding: '14px' }}>
                            <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.7rem', color: '#00ff88', marginBottom: '6px' }}>✨ NEURODIVERSITY PARADIGM</strong>
                            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.5 }}>
                              Applies the **Social Model of Disability**. Biological differences are distinct from disability; disability is created when the environment, structures, and systems are exclusively built for one neurotype, creating a hostile mismatch.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Matrix Row 3: Support Goals */}
                      <div>
                        <div className="matrix-row-title">III. Support & Treatment Goals</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div style={{ background: 'rgba(234, 67, 53, 0.02)', border: '1.5px solid rgba(234, 67, 53, 0.18)', borderRadius: '8px', padding: '14px' }}>
                            <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.7rem', color: '#ea4335', marginBottom: '6px' }}>❌ DEFICIT / PATHOLOGY MODEL</strong>
                            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.5 }}>
                              Focuses on **normalization** and behavioral compliance. Employs intensive, pathologizing clinical interventions designed to suppress natural wiring (like stimming or avoiding eye contact) to force individuals to mask.
                            </p>
                          </div>
                          <div style={{ background: 'rgba(0, 255, 136, 0.02)', border: '1.5px solid rgba(0, 255, 136, 0.22)', borderRadius: '8px', padding: '14px' }}>
                            <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.7rem', color: '#00ff88', marginBottom: '6px' }}>✨ NEURODIVERSITY PARADIGM</strong>
                            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.5 }}>
                              Focuses on **sensory accommodation**, communication tools, and fostering self-determination. Acknowledges communication styles as mutual (Double Empathy) and prioritizes well-being, accommodation, and strength-based development.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </>
              )}

              {/* SECTION LEXICON: COGNITIVE LEXICON & SYSTEM TERMINOLOGY */}
              {currentConsoleSector === 'lexicon' && (() => {
                const filteredTerms = LEXICON_TERMS.filter(term => {
                  const query = lexiconSearch.toLowerCase().trim();
                  const matchesSearch = !query || 
                                       term.title.toLowerCase().includes(query) ||
                                       term.shortDef.toLowerCase().includes(query) ||
                                       term.longDef.toLowerCase().includes(query) ||
                                       term.takeaway.toLowerCase().includes(query);
                  const matchesCategory = lexiconCategory === 'all' || term.category === lexiconCategory;
                  return matchesSearch && matchesCategory;
                });

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* The Unique Mind Constellation Banner */}
                    <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                        <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.9rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          🌌 The Autistic Constellation
                        </h3>
                        <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: 'rgba(0, 255, 136, 0.5)', letterSpacing: '1px' }}>
                          // THE SPECTRUM REFRAMED
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 'bold', lineHeight: 1.6, margin: '6px 0 8px 0' }}>
                        Every Autistic Person is Different — Just Like Neurotypicals.
                      </p>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>
                        To look at autism as a single linear spectrum stretching from &quot;mild&quot; to &quot;severe&quot; is an obsolete medical relic. In reality, autism is a diverse, non-linear constellation of developmental, sensory, communication, and cognitive traits. No two autistic individuals have the same strengths, challenges, or experiential profiles—just as no two neurotypical individuals share the same mind. We are as wonderfully diverse as any other section of humanity.
                      </p>
                    </div>

                    {/* Futuristic Search & Filter Unit */}
                    <div className="bubbly-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                          <input 
                            type="text" 
                            value={lexiconSearch} 
                            onChange={(e) => setLexiconSearch(e.target.value)} 
                            placeholder="[ 🔍 SEARCH SYNAPTIC TERMS... ]" 
                            style={{
                              width: '100%',
                              padding: '10px 14px 10px 36px',
                              background: 'rgba(4, 6, 12, 0.75)',
                              border: '1.5px solid rgba(255,255,255,0.08)',
                              borderRadius: '8px',
                              color: '#ffffff',
                              fontFamily: 'monospace',
                              fontSize: '0.74rem',
                              outline: 'none',
                              transition: 'all 0.25s ease'
                            }}
                            className="lexicon-search-input"
                          />
                          <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '0.75rem', opacity: 0.5 }}>🔍</span>
                        </div>
                        
                        {lexiconSearch && (
                          <button 
                            onClick={() => setLexiconSearch('')}
                            className="hud-btn"
                            style={{ 
                              padding: '8px 12px', 
                              fontSize: '0.65rem', 
                              fontFamily: 'monospace', 
                              color: '#ffb300', 
                              borderColor: 'rgba(255,179,0,0.3)', 
                              background: 'rgba(255,179,0,0.05)', 
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            [ CLEAR ]
                          </button>
                        )}
                      </div>
                      
                      {/* Category filter tabs */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                          { id: 'all', label: 'ALL TERMS' },
                          { id: 'energy', label: '⚡ ENERGY & BURNOUT' },
                          { id: 'social', label: '🤝 SOCIAL & STYLE' },
                          { id: 'cognitive', label: '🧠 COGNITIVE STYLES' }
                        ].map((cat) => {
                          const isActive = lexiconCategory === cat.id;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => setLexiconCategory(cat.id)}
                              className="hud-btn"
                              style={{
                                padding: '6px 12px',
                                fontSize: '0.62rem',
                                fontFamily: 'monospace',
                                borderColor: isActive ? '#00ff88' : 'rgba(255,255,255,0.06)',
                                background: isActive ? 'rgba(0, 255, 136, 0.12)' : 'rgba(4, 6, 12, 0.4)',
                                color: isActive ? '#00ff88' : 'rgba(255,255,255,0.65)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: 'all 0.2s ease',
                                boxShadow: isActive ? '0 0 8px rgba(0, 255, 136, 0.15)' : 'none'
                              }}
                            >
                              {cat.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Filtered Term Cards Grid */}
                    {filteredTerms.length > 0 ? (
                      <div className="story-grid">
                        {filteredTerms.map((term) => (
                          <div 
                            key={term.id} 
                            className={term.isWide ? 'story-card-wide' : ''}
                            style={{ 
                              background: 'rgba(6, 9, 20, 0.85)', 
                              backdropFilter: 'blur(16px)', 
                              border: `1.5px solid rgba(255, 255, 255, 0.08)`, 
                              borderRadius: '10px', 
                              padding: '18px', 
                              display: 'flex', 
                              flexDirection: 'column', 
                              gap: '12px',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            {/* Animated SVG Visualizer Box */}
                            <div style={{ height: '70px', background: '#070a12', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2px' }}>
                              {renderLexiconSvg(term.id)}
                            </div>

                            {/* Header details */}
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px', marginBottom: '2px' }}>
                                <h4 style={{ margin: 0, fontSize: '0.82rem', fontFamily: 'var(--font-tech)', color: term.accentColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  {term.title}
                                </h4>
                                <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>
                                  {term.category.toUpperCase()}
                                </span>
                              </div>
                              <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.45)' }}>
                                {term.pronunciation}
                              </span>
                            </div>

                            {/* Short definition block */}
                            <p style={{ margin: 0, fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)', fontStyle: 'italic', borderLeft: `2.5px solid ${term.accentColor}`, paddingLeft: '8px' }}>
                              {term.shortDef}
                            </p>

                            {/* Detailed explanation (Why we are like that) */}
                            <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6', textAlign: 'justify' }}>
                              <strong>Why we process like this:</strong> {term.longDef}
                            </p>

                            {/* Key Takeaway Highlight block */}
                            <div style={{ 
                              background: 'rgba(255, 255, 255, 0.01)', 
                              border: `1px solid rgba(255, 255, 255, 0.06)`,
                              borderLeft: `3px solid ${term.accentColor}`, 
                              borderRadius: '6px', 
                              padding: '10px 12px',
                              boxShadow: `0 0 10px rgba(0,0,0,0.15)`
                            }}>
                              <span style={{ display: 'block', fontSize: '0.65rem', fontFamily: 'var(--font-tech)', color: term.accentColor, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                                💡 Key Synaptic Takeaway
                              </span>
                              <span style={{ fontSize: '0.7rem', color: '#ffffff', lineHeight: '1.5', display: 'block' }}>
                                {term.takeaway}
                              </span>
                            </div>

                            {/* Bottom System protocol readout */}
                            <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: term.accentColor, marginTop: 'auto', display: 'block' }}>
                              {term.recovery}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Empty State */
                      <div style={{ 
                        background: 'rgba(6, 9, 20, 0.85)', 
                        backdropFilter: 'blur(16px)', 
                        border: '1.5px dashed rgba(234, 67, 53, 0.3)', 
                        borderRadius: '10px', 
                        padding: '40px 20px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: '12px',
                        textAlign: 'center'
                      }}>
                        <span style={{ fontSize: '2rem', animation: 'pulse-amber-warn 2.5s infinite ease-in-out' }}>⚠️</span>
                        <strong style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#ea4335', letterSpacing: '0.5px' }}>
                          [ NO COGNITIVE MATCHES FOUND ]
                        </strong>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', maxWidth: '400px', lineHeight: '1.5' }}>
                          The search term &quot;{lexiconSearch}&quot; did not match any active cognitive lexicon parameters in the selected category. Try searching for other terms like unmasking, battery, burnout, monotropism, or PDA.
                        </span>
                        <button 
                          onClick={() => { setLexiconSearch(''); setLexiconCategory('all'); }}
                          className="hud-btn"
                          style={{ marginTop: '8px', padding: '8px 14px', fontSize: '0.68rem', fontFamily: 'monospace', color: '#00ff88', borderColor: '#00ff88', background: 'rgba(0, 255, 136, 0.04)' }}
                        >
                          [ RESET ALL DICTIONARY FILTERS ]
                        </button>
                      </div>
                    )}

                  </div>
                );
              })()}

              {/* SECTION B: CHRONOLOGICAL HISTORY ARCHIVE VIEW */}
              {currentConsoleSector === 'history' && (
                <div className="bubbly-panel" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.82rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                      // CHRONOLOGICAL ARCHIVE // PATH TO SELF-DETERMINATION
                    </h3>
                    <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(0, 255, 136, 0.4)', letterSpacing: '1px' }}>
                      ACTIVE DECK: [ CHAPTER_0{activeChapter + 1} ]
                    </span>
                  </div>
                  <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', marginBottom: '16px', margin: '0 0 16px 0' }}>
                    Select a chapter to explore the history of autistic struggles and shifts, backed by authentic records and custom console visualizers:
                  </p>

                  {/* Cybernetic Tabbed Grid Selection */}
                  <div className="deck-tab-bar">
                    {[
                      { num: '01', id: 0, title: 'Confinement' },
                      { num: '02', id: 1, title: 'Mother Shame' },
                      { num: '03', id: 2, title: 'Violent Mod' },
                      { num: '04', id: 3, title: 'Self-Advocacy' },
                      { num: '05', id: 4, title: 'Double Empathy' }
                    ].map((tab) => {
                      const isActive = activeChapter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveChapter(tab.id)}
                          className={`deck-tab-btn ${isActive ? 'active' : ''}`}
                        >
                          <span className="tab-num">CHAP {tab.num}</span>
                          <span className="tab-sub">{tab.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Timeline Box detailing the selected historical chapter */}
                  <div className="timeline-box">
                    
                    {activeChapter === 0 && (
                      <div className="history-text">
                        {/* SVG 1: Confinement Prison Cage */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(234, 67, 53, 0.25)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            {/* Red pulsing warning box */}
                            <rect x="0" y="0" width="100" height="80" style={{ animation: 'pulse-red-alert 3s infinite' }} />
                            {/* Prison bars */}
                            <line x1="20" y1="5" x2="20" y2="75" stroke="#333" strokeWidth="1.5" />
                            <line x1="35" y1="5" x2="35" y2="75" stroke="#333" strokeWidth="1.5" />
                            <line x1="50" y1="5" x2="50" y2="75" stroke="#333" strokeWidth="1.5" />
                            <line x1="65" y1="5" x2="65" y2="75" stroke="#333" strokeWidth="1.5" />
                            <line x1="80" y1="5" x2="80" y2="75" stroke="#333" strokeWidth="1.5" />
                            <line x1="5" y1="25" x2="95" y2="25" stroke="#222" strokeWidth="2.5" />
                            <line x1="5" y1="55" x2="95" y2="55" stroke="#222" strokeWidth="2.5" />
                            {/* Flashing scanline */}
                            <g style={{ animation: 'sweep-spotlight 4s infinite ease-in-out', transformOrigin: '50px 0px' }}>
                              <polygon points="50,0 20,80 80,80" fill="rgba(234,67,53,0.18)" stroke="rgba(234,67,53,0.08)" strokeWidth="0.5" />
                            </g>
                            <text x="50" y="73" fill="#ea4335" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CONFINED</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(234, 67, 53, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#ea4335', fontWeight: 'bold' }}>
                            CHAPTER 01 // 1930s - 1940s
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          The Dark Wards of Confinement & Action T4 Eugenics
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          During the initial decades of autism history, autistic children are strictly locked away in bleak state asylum wards, written off by child psychiatry as genetically broken, &quot;unreachable,&quot; or schizophrenic.
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          In the absolute darkest corridor of this era, the Nazi regime’s **Action T4** eugenic program systematically targets disabled, mentally ill, and neurodivergent children for sterilization and involuntary euthanasia. In psychiatric clinics like Spiegelgrund in Vienna, child diagnostics are weaponized as death sentences, classifying autistic lives as &quot;unworthy of life&quot; and subjecting children to terminal medical abuse.
                        </p>
                      </div>
                    )}

                    {activeChapter === 1 && (
                      <div className="history-text">
                        {/* SVG 2: Shivering isolated node */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(0, 240, 255, 0.2)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            {/* Targeting ring */}
                            <circle cx="50" cy="35" r="16" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
                            <circle cx="50" cy="35" r="12" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.5" />
                            {/* Shivering child node */}
                            <circle cx="50" cy="35" r="4.5" fill="#00f0ff" style={{ animation: 'shiver-node 0.18s infinite linear', filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
                            {/* Remote maternal node outside */}
                            <circle cx="15" cy="65" r="3" fill="rgba(255,255,255,0.25)" />
                            <line x1="50" y1="35" x2="15" y2="65" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="2 2" />
                            <text x="50" y="70" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">ISOLATION</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(0, 240, 255, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#00f0ff', fontWeight: 'bold' }}>
                            CHAPTER 02 // 1950s - 1960s
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          The Refrigerator Mother Shame & Institutional Separation
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          In the mid-20th century, psychoanalytic dogmas dominate autism discourse. Child psychologist Bruno Bettelheim popularizes the discredited **&quot;refrigerator mother&quot; theory**, blaming autism entirely on emotionally cold, intellectual mothers.
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          Bettelheim explicitly compares loving mothers to Nazi concentration camp guards, asserting that children withdrew into autistic states to escape maternal hostility. Clinicians urge parents to submit to crushing shame, and children are separated from their parents (&quot;parentectomies&quot;) to be isolated in stark institutional wards to be cured through intensive psychoanalysis, causing immense trauma.
                        </p>
                      </div>
                    )}

                    {activeChapter === 2 && (
                      <div className="history-text">
                        {/* SVG 3: Electrical discharge shock grid */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(255, 117, 34, 0.25)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            {/* Grid matrix */}
                            <g opacity="0.1" stroke="#ff5722" strokeWidth="0.5">
                              <line x1="0" y1="20" x2="100" y2="20" />
                              <line x1="0" y1="40" x2="100" y2="40" />
                              <line x1="0" y1="60" x2="100" y2="60" />
                              <line x1="25" y1="0" x2="25" y2="80" />
                              <line x1="50" y1="0" x2="50" y2="80" />
                              <line x1="75" y1="0" x2="75" y2="80" />
                            </g>
                            {/* Lightning sparks */}
                            <path d="M 50,5 L 45,30 L 60,35 L 50,70" fill="none" stroke="#ff7522" strokeWidth="1.8" strokeDasharray="30" strokeDashoffset="0" style={{ animation: 'electrical-discharge 0.6s infinite steps(4)', filter: 'drop-shadow(0 0 3px #ff7522)' }} />
                            <circle cx="50" cy="70" r="3" fill="#ffb300" style={{ animation: 'shiver-node 0.1s infinite' }} />
                            <text x="50" y="74" fill="#ff7522" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AVERSIVE_DISCHARGE</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(255, 117, 34, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#ff7522', fontWeight: 'bold' }}>
                            CHAPTER 03 // 1960s - 1970s
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          The Era of Violent Behavioral Correction & Electric Shocks
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          In an effort to keep children out of lifelong institutions, Ole Lovaas at UCLA applies behaviorism to autism, initiating behavior modification programs. The core goal is to force autistic children to appear &quot;indistinguishable from their peers.&quot;
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          To suppress natural stimming and force compliance, therapists utilize physical slaps, yelling, withholding food, and **painful electric shocks** as behaviorist &quot;aversives.&quot; Lovaas explicitly states that autistic children are not fully human, asserting behaviorists must build a person where none exists. This creates a legacy of deep trauma and forced masking.
                        </p>
                      </div>
                    )}

                    {activeChapter === 3 && (
                      <div className="history-text">
                        {/* SVG 4: Glowing green expanding network */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(0, 255, 136, 0.25)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            <circle cx="50" cy="40" r="3.5" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
                            <circle cx="20" cy="20" r="2.5" fill="#00f0ff" />
                            <circle cx="80" cy="20" r="2.5" fill="#00f0ff" />
                            <circle cx="30" cy="60" r="2.5" fill="#00f0ff" />
                            <circle cx="70" cy="60" r="2.5" fill="#00f0ff" />
                            {/* Connecting paths */}
                            <line x1="50" y1="40" x2="20" y2="20" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" />
                            <line x1="50" y1="40" x2="80" y2="20" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" />
                            <line x1="50" y1="40" x2="30" y2="60" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" />
                            <line x1="50" y1="40" x2="70" y2="60" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" />
                            {/* Expanding radar wave */}
                            <circle cx="50" cy="40" r="10" fill="none" stroke="#00ff88" strokeWidth="0.8" style={{ animation: 'pulse-signal-ring 1.8s infinite' }} />
                            <circle cx="50" cy="40" r="20" fill="none" stroke="#00f0ff" strokeWidth="0.8" style={{ animation: 'pulse-signal-ring 1.8s infinite 0.9s' }} />
                            <text x="50" y="73" fill="#00ff88" fontSize="4.5" fontFamily="monospace" textAnchor="middle">ADVOCACY_NET</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(0, 255, 136, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#00ff88', fontWeight: 'bold' }}>
                            CHAPTER 04 // LATE 1980s - 1990s
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          The Dawn of Autistic Self-Advocacy & The Social Model
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          The emergence of early internet message boards provides a historical channel for autistic individuals to connect globally without medical gatekeeping. Organizing self-advocacy groups like ANI, they assert that they do not need to be &quot;cured.&quot;
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          Australian sociologist **Judy Singer** coins the term **&quot;Neurodiversity&quot;** in her 1998 thesis, reframing neurological differences as a natural biological reality. The social model of disability rises, showing that disability is caused by a restrictive, unaccommodating society rather than an intrinsic personal defect.
                        </p>
                      </div>
                    )}

                    {activeChapter === 4 && (
                      <div className="history-text">
                        {/* SVG 5: Dual synced waves */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(0, 255, 136, 0.25)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            {/* Wave 1 Autistic (Green) */}
                            <path d="M 0,30 Q 15,10 30,30 T 60,30 T 90,30" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="40" strokeDashoffset="0" style={{ animation: 'phase-wave-emerald 1.5s infinite linear' }} />
                            {/* Wave 2 Allistic (Pink) */}
                            <path d="M 0,50 Q 15,70 30,50 T 60,50 T 90,50" fill="none" stroke="#ff007f" strokeWidth="1.5" strokeDasharray="40" strokeDashoffset="0" style={{ animation: 'phase-wave-emerald 1.5s infinite linear reverse' }} />
                            {/* Connecting sync locks */}
                            <line x1="30" y1="30" x2="30" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="2 2" />
                            <line x1="60" y1="30" x2="60" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="2 2" />
                            <circle cx="30" cy="40" r="1.5" fill="#fff" />
                            <circle cx="60" cy="40" r="1.5" fill="#fff" />
                            <text x="50" y="73" fill="#00ff88" fontSize="4.5" fontFamily="monospace" textAnchor="middle">MUTUAL_SYNC</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(0, 255, 136, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#00ff88', fontWeight: 'bold' }}>
                            CHAPTER 05 // 2012 - PRESENT
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          The Double Empathy Shift & Mutual Understanding
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          Autistic researcher **Dr. Damian Milton** formulates the **Double Empathy Problem** (2012), completely dismantling classic deficit-based pathological diagnostic theories about autistic social deficits.
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          The theory scientifically proves that communication breakdowns between autistic and allistic (non-autistic) individuals are bidirectional and mutual. Breakdowns stem from a mismatch in experiential background, cognitive wiring, and communication styles, rather than an autistic &quot;social deficit&quot; residing inside the autistic brain.
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* SECTION C: EPHRAIM'S PERSONAL STORY - CHRONOLOGICAL TIMELINE CHRONICLE */}
              {currentConsoleSector === 'story' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Glowing Hazard Active Uplink Banner */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(6, 9, 20, 0.85)', backdropFilter: 'blur(16px)', border: '1.5px solid rgba(255, 179, 0, 0.35)', borderRadius: '8px', padding: '16px 20px', boxShadow: '0 4px 15px rgba(255, 179, 0, 0.05)' }}>
                    <span style={{ fontSize: '1.4rem', animation: 'pulse-amber-warn 2s infinite ease-in-out', filter: 'drop-shadow(0 0 6px rgba(255, 179, 0, 0.4))' }}>⚠️</span>
                    <div>
                      <strong style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '0.8rem', color: '#ffb300', letterSpacing: '0.5px', textShadow: '0 0 6px rgba(255, 179, 0, 0.2)' }}>
                        DECK STATUS: ACTIVE EXPLORATION // MEMOIR TIMELINE ACTIVE
                      </strong>
                      <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.4', display: 'block', marginTop: '2px' }}>
                        Understanding one's own neurotype is a lifelong journey. Select a phase below to explore my lived experiences through interactive console visualizers:
                      </span>
                    </div>
                  </div>

                  {/* Cybernetic Tabbed Memoir Slide Selector */}
                  <div className="deck-tab-bar">
                    {[
                      { num: '01', id: 0, title: 'ABA Sessions' },
                      { num: '02', id: 1, title: 'Orthodox Yeshiva' },
                      { num: '03', id: 2, title: 'Special Needs' },
                      { num: '04', id: 3, title: 'Autistic Burnout' },
                      { num: '05', id: 4, title: 'Self-Acceptance' }
                    ].map((phase) => {
                      const isActive = activeStoryPhase === phase.id;
                      return (
                        <button
                          key={phase.id}
                          onClick={() => setActiveStoryPhase(phase.id)}
                          className={`deck-tab-btn ${isActive ? 'active' : ''}`}
                        >
                          <span className="tab-num">PHASE {phase.num}</span>
                          <span className="tab-sub">{phase.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Spacious Timeline Card displaying active Memoir Phase */}
                  <div className="timeline-box">

                    {activeStoryPhase === 0 && (
                      <div className="history-text">
                        {/* Animated SVG Phase 1 */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(255, 179, 0, 0.25)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            <rect x="18" y="15" width="18" height="18" rx="2" fill="none" stroke="#ffb300" strokeWidth="1.5">
                              <animate attributeName="stroke" values="#ffb300;#00ff88;#ffb300" dur="2.5s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
                            </rect>
                            <rect x="41" y="15" width="18" height="18" rx="2" fill="none" stroke="#ffb300" strokeWidth="1.5">
                              <animate attributeName="stroke" values="#ffb300;#00ff88;#ffb300" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                            </rect>
                            <rect x="64" y="15" width="18" height="18" rx="2" fill="none" stroke="#ffb300" strokeWidth="1.5">
                              <animate attributeName="stroke" values="#ffb300;#00ff88;#ffb300" dur="2.5s" begin="1.6s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" begin="1.6s" repeatCount="indefinite" />
                            </rect>
                            <line x1="20" y1="46" x2="80" y2="46" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
                            <line x1="20" y1="46" x2="50" y2="46" stroke="#ffb300" strokeWidth="2.5" strokeLinecap="round">
                              <animate attributeName="x2" values="20;80;20" dur="4s" repeatCount="indefinite" />
                            </line>
                            <circle cx="50" cy="46" r="3" fill="#ffb300" style={{ filter: 'drop-shadow(0 0 2px #ffb300)' }}>
                              <animate attributeName="cx" values="20;80;20" dur="4s" repeatCount="indefinite" />
                            </circle>
                            <text x="50" y="70" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ ABA TRIAL METRIC ]</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(255, 179, 0, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#ffb300', fontWeight: 'bold' }}>
                            PHASE 01 // AGE 3.5 // BEHAVIORAL INTERVENTION
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          Applied Behavior Analysis (ABA) Early Training
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          My story started out with Applied Behavior Analysis (ABA) when I was 3 and a half years old. I had intensive ABA sessions similar to historical behaviorist training videos every Sunday for some time, back when the old-school compliance model of special needs was the dominant practice.
                        </p>

                        <a 
                          href="https://youtu.be/gB_RJ0lRQ-E?si=MzVT-AhfMmZWU98K" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="share-pill-btn"
                          style={{
                            marginTop: '14px',
                            borderColor: '#ffb300',
                            color: '#ffb300',
                            background: 'rgba(255, 179, 0, 0.04)',
                            padding: '6px 12px',
                            fontSize: '0.65rem',
                            fontWeight: 'bold',
                            width: 'fit-content',
                            display: 'flex'
                          }}
                        >
                          📺 View Historical ABA Video ➔
                        </a>
                      </div>
                    )}

                    {activeStoryPhase === 1 && (
                      <div className="history-text">
                        {/* Animated SVG Phase 2 */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(0, 240, 255, 0.2)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            <circle cx="20" cy="20" r="3" fill="rgba(255,255,255,0.15)" />
                            <circle cx="50" cy="15" r="3" fill="rgba(255,255,255,0.15)" />
                            <circle cx="80" cy="20" r="3" fill="rgba(255,255,255,0.15)" />
                            <circle cx="25" cy="45" r="3" fill="rgba(255,255,255,0.15)" />
                            <circle cx="75" cy="45" r="3" fill="rgba(255,255,255,0.15)" />
                            <circle cx="50" cy="42" r="5.5" fill="#00f0ff" style={{ animation: 'shiver-node 0.4s infinite', filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
                            <path d="M 38,32 A 13,13 0 0,1 62,32" fill="none" stroke="#ffb300" strokeWidth="1.5" strokeDasharray="3 1.5">
                              <animateTransform attributeName="transform" type="rotate" from="0 50 42" to="360 50 42" dur="10s" repeatCount="indefinite" />
                            </path>
                            <text x="50" y="70" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ FACADE CIRCLE // PARA SHIELD ]</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(0, 240, 255, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#00f0ff', fontWeight: 'bold' }}>
                            PHASE 02 // GRADE SCHOOL // THE COMMUNICATION GAP
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          Mainstream Orthodox Yeshiva & The normalcy Facade
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          My parents wanted me to try a mainstream orthodox yeshiva. In grade school, it was obvious to me that I was different from my peers. I was constantly wondering why I was getting special support when everybody in my environment made it look like I was normal—but they were just faking it because neurodiversity was not well known at the time. Lacking the vocabulary to advocate for myself, I acted out and called out in class, eventually getting a paraprofessional (para), still never knowing I was autistic.
                        </p>
                      </div>
                    )}

                    {activeStoryPhase === 2 && (
                      <div className="history-text">
                        {/* Animated SVG Phase 3 */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(234, 67, 53, 0.25)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            <rect x="0" y="0" width="100" height="80" style={{ animation: 'pulse-red-alert 3s infinite' }} />
                            <circle cx="25" cy="25" r="8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                            <circle cx="25" cy="25" r="2.5" fill="#ffb300" />
                            <line x1="25" y1="25" x2="48" y2="44" stroke="#ffb300" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
                            <circle cx="75" cy="25" r="8" fill="none" stroke="rgba(234, 67, 53, 0.15)" strokeWidth="0.8" />
                            <circle cx="75" cy="25" r="3.5" fill="#ea4335" style={{ filter: 'drop-shadow(0 0 3px #ea4335)' }} />
                            <path d="M 70,29 Q 60,40 52,43" fill="none" stroke="#ea4335" strokeWidth="1" strokeDasharray="2 2">
                              <animate attributeName="stroke-dashoffset" values="0;5" dur="1s" repeatCount="indefinite" />
                            </path>
                            <circle cx="50" cy="46" r="4.5" fill="#00f0ff" style={{ animation: 'shiver-node 0.12s infinite', filter: 'drop-shadow(0 0 2.5px #00f0ff)' }} />
                            <text x="50" y="70" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ HARASSMENT VECTOR COLLISION ]</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(234, 67, 53, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#ea4335', fontWeight: 'bold' }}>
                            PHASE 03 // HIGH SCHOOL // TRANSITION & HARASSMENT
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          Special Education Transfer & Bullying Dynamics
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          After 2 years of High School, it was clear that the mainstream yeshiva wasn't working out. I was taken out of the mainstream yeshiva because my parents thought that a special needs school would be better for me and heard very good things about the program, and they didn't send me back because it would be hard to re-enter again.
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          I ended up going to two special needs schools. In the first special needs school, another kid pointed out to me that I was autistic. He didn't do it to be nice—he did it in a teasing, mocking way that framed autism strictly as a broken disability, scaring me deeply at first until I eventually discovered the neurodiversity paradigm and began reclaiming my identity. In the second special needs school, there was a tough leader there who turned the whole school against me, causing a lot of fear in my life.
                        </p>
                      </div>
                    )}

                    {activeStoryPhase === 3 && (
                      <div className="history-text">
                        {/* Animated SVG Phase 4 */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(255, 179, 0, 0.25)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            <rect x="30" y="16" width="40" height="12" rx="2" fill="none" stroke="#ea4335" strokeWidth="1.5" />
                            <rect x="70" y="20" width="2" height="4" rx="0.5" fill="#ea4335" />
                            <rect x="33" y="19" width="6" height="6" rx="0.5" fill="#ea4335" style={{ animation: 'pulse-amber-warn 1.5s infinite' }} />
                            <circle cx="30" cy="48" r="8" fill="none" stroke="#ea4335" strokeWidth="0.8" strokeDasharray="2 2" />
                            <circle cx="70" cy="48" r="8" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="2 2" />
                            <path d="M 38,48 Q 50,38 62,48" fill="none" stroke="#ea4335" strokeWidth="1" strokeDasharray="2 1">
                              <animate attributeName="stroke-dashoffset" values="0;6" dur="1.2s" repeatCount="indefinite" />
                            </path>
                            <line x1="30" y1="48" x2="70" y2="48" stroke="#ea4335" strokeWidth="1" strokeDasharray="3 3" />
                            <text x="50" y="70" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ BURNOUT CRASH // MISMATCH ]</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(255, 179, 0, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#ffb300', fontWeight: 'bold' }}>
                            PHASE 04 // EARLY 20s // AUTISTIC BURNOUT
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          Autistic Burnout & Boundary Overruns
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          In my early 20s, I hit severe autistic burnout, which was mostly driven by the trauma and harassment from that unsafe environment in the second special needs school. I struggled with the painful thought that I would never make any friends.
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          Socializing was further complicated because I often misread other autistic individuals' silent disengagement as a sign that I had done something wrong. In reality, their social batteries were simply drained—but because there was no active communication from them, I kept unknowingly invading their boundaries due to no communication from the other person.
                        </p>
                      </div>
                    )}

                    {activeStoryPhase === 5 || activeStoryPhase === 4 && (
                      <div className="history-text">
                        {/* Animated SVG Phase 5 */}
                        <div className="history-svg-box" style={{ borderColor: 'rgba(0, 255, 136, 0.25)' }}>
                          <svg viewBox="0 0 100 80" width="100%" height="100%">
                            <circle cx="50" cy="35" r="5" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 5px #00ff88)' }} />
                            <circle cx="20" cy="20" r="3" fill="#00f0ff" />
                            <circle cx="80" cy="20" r="3" fill="#00f0ff" />
                            <circle cx="25" cy="50" r="3" fill="#00f0ff" />
                            <circle cx="75" cy="50" r="3" fill="#00f0ff" />
                            <line x1="50" y1="35" x2="20" y2="20" stroke="#00ff88" strokeWidth="1" strokeDasharray="2 2">
                              <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
                            </line>
                            <line x1="50" y1="35" x2="80" y2="20" stroke="#00ff88" strokeWidth="1" strokeDasharray="2 2">
                              <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
                            </line>
                            <line x1="50" y1="35" x2="25" y2="50" stroke="#00ff88" strokeWidth="1" strokeDasharray="2 2">
                              <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
                            </line>
                            <line x1="50" y1="35" x2="75" y2="50" stroke="#00ff88" strokeWidth="1" strokeDasharray="2 2">
                              <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
                            </line>
                            <circle cx="50" cy="35" r="14" fill="none" stroke="#00ff88" strokeWidth="0.8" style={{ animation: 'pulse-signal-ring 2s infinite' }} />
                            <text x="50" y="70" fill="#00ff88" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ SYNAPSE SYNC NOMINAL ]</text>
                          </svg>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(0, 255, 136, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#00ff88', fontWeight: 'bold' }}>
                            PHASE 05 // PRESENT // SELF-ACCEPTANCE
                          </span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                          Active Synaptic Synthesis & The Future Journey
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          I am slowly learning more about myself and autism every single day. Armed with a deeper understanding of these communication mismatches and respect for social batteries, I am unlearning pathologizing deficit labels and fully accepting my unique cognitive wiring.
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', textAlign: 'justify' }}>
                          I am actively finding new, authentic, and healthy ways to socialize and connect with other people on my own terms.
                        </p>
                        <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#00ff88', fontWeight: 'bold', marginTop: '12px', display: 'block', textShadow: '0 0 5px rgba(0,255,136,0.3)' }}>
                          [ UPLINK SYNC: NOMINAL // MORE SYNAPSES PENDING ]
                        </span>
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* SECTION D: ADVOCACY & UPLINK PROTOCOLS VIEW */}
              {currentConsoleSector === 'advocacy' && (
                <div className="advocacy-grid">
                  
                  {/* Complete Sharing Call to Action */}
                  <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                    <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.82rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      📢 Pass The Message Along
                    </h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                      True advocacy requires communication and spreading the word. Move others past dehumanizing pathology models by sharing the Neurodiversity Portal with friends, colleagues, or educators:
                    </p>

                    {/* Direct share deck */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      
                      {/* 1. Copy Link button with active label switching */}
                      <button 
                        onClick={handleCopyLink}
                        className="hud-btn"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          fontSize: '0.7rem',
                          fontFamily: 'monospace, var(--font-tech)',
                          borderColor: '#00ff88',
                          background: copied ? 'rgba(0, 255, 136, 0.15)' : 'rgba(0, 255, 136, 0.04)',
                          color: '#00ff88',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          boxShadow: copied ? '0 0 12px rgba(0, 255, 136, 0.25)' : 'none'
                        }}
                      >
                        {copied ? '[ ✓ LINK COPIED // UPLINK NOMINAL ]' : '[ 📋 COPY UPLINK LINK ]'}
                      </button>

                      {/* Subspace social share pill grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '4px' }}>
                        
                        {/* LinkedIn Share */}
                        <a 
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="share-pill-btn"
                        >
                          🔗 LinkedIn
                        </a>

                        {/* X / Twitter Share */}
                        <a 
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="share-pill-btn"
                        >
                          🐦 Twitter / X
                        </a>

                        {/* WhatsApp Share */}
                        <a 
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="share-pill-btn"
                        >
                          💬 WhatsApp
                        </a>

                        {/* Email Share */}
                        <a 
                          href={`mailto:?subject=Ephraim%20Becker's%20Ares%20City%20-%20Neurodiversity%20Advocacy%20Portal&body=I%20just%20explored%20the%20Neurodiversity%20Advocacy%20portal%20in%20Ephraim%20Becker's%20Ares%20City.%20Let's%20move%20past%20old-school%20special%20needs%20pathology%20models%20and%20celebrate%20cognitive%20variation%20as%20a%20natural%20biological%20reality.%20Read%20the%20history%20and%20spread%20the%20word:%20${encodeURIComponent(shareUrl)}`}
                          className="share-pill-btn"
                        >
                          ✉️ Email
                        </a>

                      </div>

                    </div>
                  </div>

                  {/* Actionable Colony Protocols Checklist */}
                  <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                    <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.82rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      🛠️ Colony Advocacy Protocols
                    </h4>
                    <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', margin: '0 0 12px 0' }}>
                      Activate these three daily protocols to commit to strength-based acceptance:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      
                      {/* 1. De-stigmatize */}
                      <div 
                        onClick={() => toggleProtocol('destigmatize')}
                        className={`protocol-checkbox ${protocols.destigmatize ? 'active' : ''}`}
                      >
                        <span style={{ fontSize: '0.85rem' }}>{protocols.destigmatize ? '☑' : '☐'}</span>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.68rem', color: protocols.destigmatize ? '#00ff88' : '#fff' }}>
                            I. DE-STIGMATIZE DIALOGUE
                          </strong>
                          <span style={{ fontSize: '0.58rem', opacity: 0.8, display: 'block', marginTop: '2px' }}>
                            Refuse to describe differences as deficits, brokenness, or tragedies. Speak of variations, not diseases.
                          </span>
                        </div>
                      </div>

                      {/* 2. Accommodate */}
                      <div 
                        onClick={() => toggleProtocol('accommodate')}
                        className={`protocol-checkbox ${protocols.accommodate ? 'active' : ''}`}
                      >
                        <span style={{ fontSize: '0.85rem' }}>{protocols.accommodate ? '☑' : '☐'}</span>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.68rem', color: protocols.accommodate ? '#00ff88' : '#fff' }}>
                            II. ACCOMMODATE SENSORY SYSTEMS
                          </strong>
                          <span style={{ fontSize: '0.58rem', opacity: 0.8, display: 'block', marginTop: '2px' }}>
                            Adjust environment triggers (loud noise, flashing lights) rather than forcing painful masking or compliance.
                          </span>
                        </div>
                      </div>

                      {/* 3. Speak Up */}
                      <div 
                        onClick={() => toggleProtocol('speakup')}
                        className={`protocol-checkbox ${protocols.speakup ? 'active' : ''}`}
                      >
                        <span style={{ fontSize: '0.85rem' }}>{protocols.speakup ? '☑' : '☐'}</span>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.68rem', color: protocols.speakup ? '#00ff88' : '#fff' }}>
                            III. CONVINCE & EDUCATE OTHERS
                          </strong>
                          <span style={{ fontSize: '0.58rem', opacity: 0.8, display: 'block', marginTop: '2px' }}>
                            Challenge deficit-only pathology models in schools, workplaces, and families, educating them on neurodiversity.
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Status synchronization message */}
                    <div style={{
                      marginTop: '14px',
                      borderTop: '1px dashed rgba(255,255,255,0.06)',
                      paddingTop: '8px',
                      textAlign: 'center',
                      fontFamily: 'monospace',
                      fontSize: '0.58rem',
                      color: allProtocolsChecked ? '#00ff88' : 'rgba(255,255,255,0.3)',
                      transition: 'all 0.3s ease'
                    }}>
                      {allProtocolsChecked ? (
                        <span style={{ fontWeight: 'bold', textShadow: '0 0 6px rgba(0, 255, 136, 0.3)' }}>
                          [ SYNAPSE SYNC NOMINAL // ALL PROTOCOLS DEPLOYED ]
                        </span>
                      ) : (
                        <span>[ PROTOCOLS PENDING SYSTEM EXECUTION ]</span>
                      )}
                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Custom animated SVG visualizer helper for the Synaptic Dictionary
function renderLexiconSvg(id) {
  switch (id) {
    case 'autistic-burnout':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <rect x="25" y="6" width="46" height="14" rx="2" fill="none" stroke="#ffb300" strokeWidth="1.5" style={{ animation: 'discharge-burnout 4s infinite ease-in-out' }} />
          <rect x="71" y="9" width="3" height="8" rx="1" fill="#ffb300" style={{ animation: 'discharge-burnout 4s infinite ease-in-out' }} />
          <rect x="29" y="9" width="38" height="8" rx="1" style={{ animation: 'battery-drain 4s infinite ease-in-out' }} />
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ BURNOUT LEVEL // MONITOR ]</text>
        </svg>
      );
    case 'social-battery':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <rect x="25" y="6" width="46" height="14" rx="2" fill="none" stroke="#00ff88" strokeWidth="1.5" />
          <rect x="71" y="9" width="3" height="8" rx="1" fill="#00ff88" />
          <rect x="29" y="9" width="38" height="8" rx="1" style={{ animation: 'battery-drain 5s infinite ease-in-out' }} />
          <circle cx="85" cy="13" r="1.5" fill="#00f0ff">
            <animate attributeName="cx" values="85;25" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="8" r="1" fill="#ff5722">
            <animate attributeName="cx" values="80;30" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ REAL-TIME METRIC ANALYSIS ]</text>
        </svg>
      );
    case 'double-empathy':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <circle cx="20" cy="12" r="3" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 2px #00ff88)' }} />
          <circle cx="80" cy="12" r="3" fill="#ff007f" style={{ filter: 'drop-shadow(0 0 2px #ff007f)' }} />
          <path d="M 20,12 Q 50,2 80,12" fill="none" stroke="#00ff88" strokeWidth="0.8" strokeDasharray="15" strokeDashoffset="0" style={{ animation: 'laser-sweep 2.5s infinite linear' }} />
          <path d="M 80,12 Q 50,22 20,12" fill="none" stroke="#ff007f" strokeWidth="0.8" strokeDasharray="15" strokeDashoffset="0" style={{ animation: 'laser-sweep 2.5s infinite linear reverse' }} />
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ DOUBLE EMPATHY SYNC ]</text>
        </svg>
      );
    case 'masking':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <circle cx="50" cy="12" r="3.5" fill="#00ff88" style={{ animation: 'true-self-shake 2s infinite ease-in-out', filter: 'drop-shadow(0 0 2px #00ff88)' }} />
          <circle cx="50" cy="12" r="7" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 1.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 12" to="360 50 12" dur="6s" repeatCount="indefinite" />
          </circle>
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ CAMOUFLAGE SHIELD ]</text>
        </svg>
      );
    case 'unmasking':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <circle cx="50" cy="12" r="8" fill="none" stroke="#ffb300" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" style={{ animation: 'true-self-shake 3s infinite ease-in-out' }}>
            <animate attributeName="r" values="8;11" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="12" r="4" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 4px #00ff88)' }}>
            <animate attributeName="r" values="3.5;5;3.5" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ SHEDDING SHIELDS // AUTHENTIC ]</text>
        </svg>
      );
    case 'rsd':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <path d="M 50,15 L 47,12 Q 44,9 47,6 Q 50,6 50,9 Q 50,6 53,6 Q 56,9 53,12 Z" fill="#ff007f" opacity="0.8" style={{ transformOrigin: '50px 10px', animation: 'shiver-node 0.2s infinite' }}>
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
          </path>
          <circle cx="50" cy="10" r="14" fill="none" stroke="#ff007f" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3">
            <animate attributeName="r" values="14;8;2" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.6;0.1" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ STRESS SIGNAL RIPPLES ]</text>
        </svg>
      );
    case 'pda':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <circle cx="50" cy="12" r="4.5" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
          <line x1="15" y1="12" x2="35" y2="12" stroke="#ea4335" strokeWidth="1" strokeDasharray="3 2">
            <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="85" y1="12" x2="65" y2="12" stroke="#ea4335" strokeWidth="1" strokeDasharray="3 2">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite" />
          </line>
          <circle cx="50" cy="12" r="9" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.6" style={{ animation: 'shiver-node 0.4s infinite' }} />
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ AUTONOMY THREAT RESPONSE ]</text>
        </svg>
      );
    case 'autistic-inertia':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <line x1="15" y1="13" x2="85" y2="13" stroke="rgba(255,255,255,0.06)" strokeWidth="4" strokeLinecap="round" />
          <line x1="15" y1="13" x2="85" y2="13" stroke="rgba(255, 179, 0, 0.15)" strokeWidth="1" strokeLinecap="round" />
          <circle cx="20" cy="13" r="4" fill="#ffb300" style={{ animation: 'momentum-slide 3.5s infinite ease-in-out', filter: 'drop-shadow(0 0 3px #ffb300)' }} />
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ COGNITIVE MOMENTUM ]</text>
        </svg>
      );
    case 'meltdowns':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <circle cx="50" cy="12" r="5" style={{ animation: 'overload-crash 5s infinite ease-in-out' }} />
          <circle cx="50" cy="12" r="14" fill="none" stroke="#ea4335" strokeWidth="0.8" opacity="0">
            <animate attributeName="r" values="5;20" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ OVERLOAD PROTECTOR CRASH ]</text>
        </svg>
      );
    case 'monotropism':
      return (
        <svg viewBox="0 0 100 30" width="100%" height="100%">
          <polygon points="50,0 44,12 56,12" fill="rgba(0,255,136,0.06)" />
          <circle cx="50" cy="12" r="3.5" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
          <circle cx="20" cy="12" r="1.5" fill="rgba(255,255,255,0.08)" />
          <circle cx="80" cy="12" r="1.5" fill="rgba(255,255,255,0.08)" />
          <line x1="50" y1="0" x2="50" y2="12" stroke="#00ff88" strokeWidth="1" strokeDasharray="20" strokeDashoffset="0" style={{ animation: 'laser-sweep 2s infinite linear' }} />
          <text x="50" y="27" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">[ MONOTROPIC TUNNEL FOCUS ]</text>
        </svg>
      );
    default:
      return null;
  }
}

// High-Fidelity static lexicon terms for the Synaptic Dictionary
const LEXICON_TERMS = [
  {
    id: 'autistic-burnout',
    title: 'Autistic Burnout',
    pronunciation: '/ɔːˈtɪs.tɪk ˈbɜːn.aʊt/',
    category: 'energy',
    shortDef: 'A profound state of mental, emotional, and physical system collapse.',
    longDef: 'Autistic burnout is a physiological and neurological crash caused by the cumulative, chronic trauma of constantly masking (suppressing autistic traits to pass as neurotypical), surviving overstimulating sensory environments, and enduring unsafe social spaces. During burnout, executive functions fail, sensory tolerances plunge, and previously mastered tasks or communication skills can temporarily or permanently disintegrate.',
    takeaway: 'Autistic burnout is not ordinary exhaustion or a behavioral choice—it is a neurological defense shutdown. Recovery is not solved by working harder, but through long-term sensory rest and radical self-acceptance.',
    recovery: '[ SYSTEM STATUS: INTEGRITY LOW // REQUIRES RADICAL SENSORY DOWN-REGULATION ]',
    accentColor: '#ffb300',
    isWide: false
  },
  {
    id: 'social-battery',
    title: 'The Social Battery',
    pronunciation: '/ðə ˈsoʊ.ʃəl ˈbæt.ər.i/',
    category: 'energy',
    shortDef: 'The finite daily energy budget allotted for processing social interactions.',
    longDef: 'Unlike neurotypical brains which automatically filter out background social signals, an autistic brain processes all incoming social stimuli—micro-expressions, vocal inflections, unspoken rules, and sensory background noise—in high-definition with active, manual CPU effort. This comes at a staggering cognitive metabolic cost. Once this battery depletes, the nervous system enters an emergency fuel-conservation mode.',
    takeaway: 'Seeking isolation or going silent is a healthy, biological recharging mechanism—not antisocial behavior, rudeness, or personal rejection.',
    recovery: '[ POWER LEVEL: CRITICAL // POWER CONSERVATION DECK ACTIVE ]',
    accentColor: '#ffb300',
    isWide: false
  },
  {
    id: 'double-empathy',
    title: 'Double Empathy & Boundary Mismatch',
    pronunciation: '/ˈdʌb.əl ˈem.pə.θi & ˈbaʊn.də.ri ˈmɪs.mætʃ/',
    category: 'social',
    shortDef: 'Bidirectional breakdowns in understanding between diverging neurotypes.',
    longDef: 'First formulated by Dr. Damian Milton, the Double Empathy Problem states that communication breakdowns are a mutual, two-way mismatch in experiential background and communication styles, rather than a clinical deficit inside the autistic brain. When an autistic person\'s battery is empty and they withdraw without explicit warnings, peers may misread this as hostility. Lacking clear signals, boundaries are easily overrun.',
    takeaway: 'Autistic and non-autistic people possess different "communication software." Bridges are built through mutual, explicit verbal communication of boundaries, rather than expecting either side to read minds.',
    recovery: '[ BRIDGE ALIGNMENT: REQUIRES MUTUAL EXPLICITNESS // DEFICIT MODEL DEBUNKED ]',
    accentColor: '#00ff88',
    isWide: true
  },
  {
    id: 'masking',
    title: 'Masking & Camouflaging',
    pronunciation: '/ˈmæsk.ɪŋ & ˈkæm.ə.flɑːʒ.ɪŋ/',
    category: 'social',
    shortDef: 'The exhausting, artificial performance of neurotypical behavior to survive.',
    longDef: 'Masking is a trauma-driven coping strategy where an autistic individual manually choreographs eye contact, suppresses stims (natural repetitive movements that regulate their sensory systems), mimics gestures, and scripts conversations. It is built to avoid harassment, exclusion, and institutional trauma. While it offers a temporary shield of compliance, it drains massive mental energy.',
    takeaway: 'Masking acts as a cognitive tax that leads directly to self-alienation, clinical depression, and suicidal ideation. De-pathologizing differences is the only way to make environments safe enough to drop the mask.',
    recovery: '[ CAMOUFLAGE OVERLOAD: METABOLIC COST CRITICAL // SHIELD DEPLETION IN PROGRESS ]',
    accentColor: '#00ff88',
    isWide: true
  },
  {
    id: 'unmasking',
    title: 'Unmasking',
    pronunciation: '/ʌnˈmæsk.ɪŋ/',
    category: 'social',
    shortDef: 'The radical, liberating process of shedding cognitive camouflage.',
    longDef: 'Based on the philosophy of The Autistic Coach, unmasking is not a behavioral switch or simple "uninhibited behavior." It is a deep, sustainable, and often frightening recovery journey of shedding compliance-based programming. It involves reclaiming your natural sensory boundaries, allowing your body to stim, advocating for your specific comfort, and learning to honor your neurological limits without guilt.',
    takeaway: 'Unmasking is a vital, self-preservative act of survival and healing. It is the active, beautiful process of unlearning neuronormative standards to reclaim your authentic self.',
    recovery: '[ PROTOCOL ACTIVE: SHEDDING COGNITIVE SHIELDS // TRUE AUTONOMY RECONSTRUCTED ]',
    accentColor: '#00ff88',
    isWide: true
  },
  {
    id: 'rsd',
    title: 'Rejection Sensitive Dysphoria (RSD)',
    pronunciation: '/rɪˈdʒek.ʃən ˈsen.sɪ.tɪv dɪsˈfɔːr.i.ə/',
    category: 'social',
    shortDef: 'An intense, involuntary emotional pain triggered by perceived rejection.',
    longDef: 'Growing up in a world built for another neurotype means autistic individuals receive thousands of corrective, critical, or rejecting messages by the time they reach adulthood. This systemic exclusion primes the nervous system for extreme vulnerability. Under RSD, a perceived criticism or minor disengagement triggers a sudden, high-intensity neurological pain response indistinguishable from physical injury.',
    takeaway: 'RSD is an involuntary neurological reflex, not emotional fragility. Recognizing it as a physical stress ripple allows us to step back, soothe our nervous systems, and verify reality before reacting.',
    recovery: '[ SENSORY ALARM: EMOTIONAL RIPPLE SCAN ACTIVE // REQUIRE NERVOUS REGULATION ]',
    accentColor: '#00ff88',
    isWide: false
  },
  {
    id: 'pda',
    title: 'Pervasive Drive for Autonomy (PDA)',
    pronunciation: '/pərˈveɪ.sɪv draɪv fɔːr ɔːˈtɒn.ə.mi/',
    category: 'cognitive',
    shortDef: 'A neurological profile where daily demands trigger a threat response.',
    longDef: 'Historically termed "Pathological Demand Avoidance," PDA is reframed by neurodivergent advocates as a Pervasive Drive for Autonomy. Daily demands—even simple ones like eating, dressing, or expected social conventions—are perceived by the autistic nervous system as a direct threat to personal autonomy. This automatically activates a fight/flight/freeze defense response, bypassing logical reasoning entirely.',
    takeaway: 'PDA is not refusal, stubbornness, or laziness—it is a neuro-biological anxiety lock. PDA individuals thrive through collaborative, egalitarian relationships, choice-based environments, and non-directive language.',
    recovery: '[ THREAT ALARM ACTIVE: DEMAND ENCOUNTERED // SHIELDING AUTONOMY NODE ]',
    accentColor: '#00f0ff',
    isWide: false
  },
  {
    id: 'autistic-inertia',
    title: 'Autistic Inertia',
    pronunciation: '/ɔːˈtɪs.tɪk ɪˈnɜː.ʃə/',
    category: 'cognitive',
    shortDef: 'The physiological resistance to initiating or transitioning between states.',
    longDef: 'Autistic inertia represents the physical momentum of cognitive processing. Because of executive functioning and neurological differences, starting a new task, halting a current hyper-focused activity, or shifting attention requires significant metabolic energy. It is not a lack of willpower; it is a mechanical property of the autistic mind which, once set in motion, can maintain intense velocity but struggles to brake or steer.',
    takeaway: 'Shifting states causes intense neurological friction. Support yourself and others by planning transitional buffers, utilizing gentle visual countdowns, and honoring flow states rather than demanding abrupt halts.',
    recovery: '[ MOMENTUM COEFFICIENT: HIGH // BUFFER STATIONS MANDATORY ]',
    accentColor: '#00f0ff',
    isWide: false
  },
  {
    id: 'meltdowns',
    title: 'Meltdowns & Shutdowns',
    pronunciation: '/ˈmelt.daʊnz & ˈʃʌt.daʊnz/',
    category: 'energy',
    shortDef: 'Extreme, involuntary survival crashes of the nervous system.',
    longDef: 'When sensory input, emotional stress, and cognitive load exceed what the brain\'s processing channels can handle, the nervous system deploys an emergency circuit breaker. A meltdown is an externalized survival reaction (fight/flight), while a shutdown is an internalized survival response (freeze/dissociate). During these states, the prefrontal cortex goes offline, rendering rational communication impossible.',
    takeaway: 'These are involuntary neurological events—never tantrums, choices, or manipulation. The only supportive responses are low sensory stimulation, absolute physical safety, and quiet patience.',
    recovery: '[ CRITICAL ERROR: OVERLOAD CIRCUIT TRIPPED // SAFE RESTORE MANDATORY ]',
    accentColor: '#ffb300',
    isWide: false
  },
  {
    id: 'monotropism',
    title: 'Monotropic Focus Tunnels',
    pronunciation: '/ˌmɒn.əˈtrɒp.ɪk ˈfoʊ.kəs ˈtʌn.əlz/',
    category: 'cognitive',
    shortDef: 'A specialist attention style focusing intensely on a single channel.',
    longDef: 'Monotropism is the theory that autistic minds allocate attention to a few highly concentrated channels (monotropic), whereas allistic minds distribute attention across many shallow channels (polytropism). This deep-focus allocation allows for extreme immersion, meticulous pattern recognition, and elite flow states. However, it means any abrupt disruption causes intense sensory friction, as if being torn out of a high-speed vehicle.',
    takeaway: 'Monotropic flow is a powerful, creative asset that generates deep expertise. Respect it by letting autistic people finish their focus tracks and avoiding sudden, high-sensory interruptions.',
    recovery: '[ DEPTH METRIC: MAX // FOCUS TUNNEL SECURED // PROCEED WITH AUTONOMOUS VELOCITY ]',
    accentColor: '#00f0ff',
    isWide: true
  }
];

