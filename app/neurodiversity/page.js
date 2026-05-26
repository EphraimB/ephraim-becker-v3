'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NeurodiversityAdvocacy() {
  const [transitState, setTransitState] = useState('slide-active');
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("https://ephraim-becker.com/neurodiversity");
  const [shareText, setShareText] = useState("Explore the Neurodiversity Advocacy portal in Ares City. Let's move past old-school special needs pathology models and celebrate cognitive variation: ");
  const [currentConsoleSector, setCurrentConsoleSector] = useState('matrix'); // 'matrix', 'history', 'story', 'advocacy'
  const [activeChapter, setActiveChapter] = useState(0); // 0 to 4 for historical Chapters I-V
  const [glitchActive, setGlitchActive] = useState(false);
  
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

        .console-selector-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
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

        .timeline-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .timeline-box:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(0, 255, 136, 0.2);
          box-shadow: 0 6px 20px rgba(0, 255, 136, 0.06);
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

        @media (max-width: 900px) {
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
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
                    {[
                      { label: 'CHAP I', id: 0, name: 'Confinement' },
                      { label: 'CHAP II', id: 1, name: 'Mother Shame' },
                      { label: 'CHAP III', id: 2, name: 'Violent Mod' },
                      { label: 'CHAP IV', id: 3, name: 'Self-Advocacy' },
                      { label: 'CHAP V', id: 4, name: 'Double Empathy' }
                    ].map((tab) => {
                      const isActive = activeChapter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveChapter(tab.id)}
                          className="hud-btn"
                          style={{
                            padding: '8px 4px',
                            fontSize: '0.62rem',
                            fontFamily: 'monospace',
                            borderColor: isActive ? '#00ff88' : 'rgba(255,255,255,0.06)',
                            background: isActive ? 'rgba(0, 255, 136, 0.12)' : 'rgba(4, 6, 12, 0.4)',
                            color: isActive ? '#00ff88' : 'rgba(255,255,255,0.65)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'all 0.2s ease',
                            boxShadow: isActive ? '0 0 10px rgba(0, 255, 136, 0.2)' : 'none'
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Timeline Box detailing the selected historical chapter */}
                  <div className="timeline-box" style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1.5px solid rgba(255, 255, 255, 0.04)' }}>
                    
                    {activeChapter === 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: '20px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(234, 67, 53, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#ea4335', fontWeight: 'bold' }}>
                              CHAPTER I // 1930s - 1940s
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
                        {/* SVG 1: Confinement Prison Cage */}
                        <div style={{ background: '#070a12', border: '1.5px solid rgba(234, 67, 53, 0.25)', borderRadius: '8px', height: '185px', position: 'relative', overflow: 'hidden' }}>
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
                      </div>
                    )}

                    {activeChapter === 1 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: '20px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(0, 240, 255, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#00f0ff', fontWeight: 'bold' }}>
                              CHAPTER II // 1950s - 1960s
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
                        {/* SVG 2: Shivering isolated node */}
                        <div style={{ background: '#070a12', border: '1.5px solid rgba(0, 240, 255, 0.2)', borderRadius: '8px', height: '185px', position: 'relative', overflow: 'hidden' }}>
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
                      </div>
                    )}

                    {activeChapter === 2 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: '20px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(255, 117, 34, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#ff7522', fontWeight: 'bold' }}>
                              CHAPTER III // 1960s - 1970s
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
                        {/* SVG 3: Electrical discharge shock grid */}
                        <div style={{ background: '#070a12', border: '1.5px solid rgba(255, 117, 34, 0.25)', borderRadius: '8px', height: '185px', position: 'relative', overflow: 'hidden' }}>
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
                      </div>
                    )}

                    {activeChapter === 3 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: '20px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(0, 255, 136, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#00ff88', fontWeight: 'bold' }}>
                              CHAPTER IV // LATE 1980s - 1990s
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
                        {/* SVG 4: Glowing green expanding network */}
                        <div style={{ background: '#070a12', border: '1.5px solid rgba(0, 255, 136, 0.25)', borderRadius: '8px', height: '185px', position: 'relative', overflow: 'hidden' }}>
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
                      </div>
                    )}

                    {activeChapter === 4 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: '20px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(0, 255, 136, 0.15)', padding: '2px 6px', borderRadius: '3px', color: '#00ff88', fontWeight: 'bold' }}>
                              CHAPTER V // 2012 - PRESENT
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
                        {/* SVG 5: Dual synced waves */}
                        <div style={{ background: '#070a12', border: '1.5px solid rgba(0, 255, 136, 0.25)', borderRadius: '8px', height: '185px', position: 'relative', overflow: 'hidden' }}>
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
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* SECTION C: EPHRAIM'S PERSONAL STORY - THEMATIC UNDER CONSTRUCTION VIEW */}
              {currentConsoleSector === 'story' && (
                <div className="bubbly-panel" style={{ flexShrink: 0, padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  
                  {/* Glowing Hazard Warning SVG */}
                  <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                    <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ animation: 'pulse-amber-warn 2s infinite ease-in-out' }}>
                      <path 
                        d="M 50 12 L 88 78 L 12 78 Z" 
                        fill="rgba(255, 179, 0, 0.06)" 
                        stroke="#ffb300" 
                        strokeWidth="3.5" 
                        strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 179, 0, 0.45))' }}
                      />
                      <text 
                        x="50" 
                        y="66" 
                        fill="#ffb300" 
                        fontSize="32" 
                        fontFamily="var(--font-tech), monospace" 
                        fontWeight="900" 
                        textAnchor="middle"
                        style={{ textShadow: '0 0 5px rgba(255, 179, 0, 0.6)' }}
                      >
                        !
                      </text>
                    </svg>
                  </div>

                  {/* Under Construction Header */}
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-tech)', 
                      fontSize: '1.4rem', 
                      color: '#ffb300', 
                      textTransform: 'uppercase', 
                      letterSpacing: '2.5px', 
                      margin: 0, 
                      textAlign: 'center',
                      textShadow: '0 0 15px rgba(255, 179, 0, 0.5)' 
                    }}
                  >
                    UNDER CONSTRUCTION
                  </h3>

                  {/* High-Tech Transmission Pending Readout */}
                  <span 
                    style={{ 
                      fontSize: '0.68rem', 
                      fontFamily: 'monospace', 
                      color: 'rgba(255, 255, 255, 0.4)', 
                      letterSpacing: '1px',
                      textAlign: 'center'
                    }}
                  >
                    [ STATUS: TRANSMISSION PENDING // SYNAPSE UPLINK INCOMPLETE ]
                  </span>

                </div>
              )}

              {/* SECTION D: ADVOCACY & UPLINK PROTOCOLS VIEW */}
              {currentConsoleSector === 'advocacy' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  
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
                          href={`mailto:?subject=Neurodiversity%20Advocacy%20Portal&body=I%20just%20explored%20the%20Neurodiversity%20Advocacy%20portal%20in%20Ares%20City.%20Let's%20move%20past%20old-school%20special%20needs%20pathology%20models%20and%20celebrate%20cognitive%20variation%20as%20a%20natural%20biological%20reality.%20Read%20the%20history%20and%20spread%20the%20word:%20${encodeURIComponent(shareUrl)}`}
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
