'use client';

import { useState, useEffect } from 'react';


export default function NeurodiversityAdvocacy() {
  const [transitState, setTransitState] = useState('slide-active');
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("https://ephraim-becker.com/neurodiversity");
  const [shareText, setShareText] = useState("Explore the Neurodiversity Advocacy portal in Ares City. Let's move past old-school special needs pathology models and celebrate cognitive variation: ");
  
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
        
        .timeline-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .timeline-box:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(0, 255, 136, 0.2);
          box-shadow: 0 6px 20px rgba(0, 255, 136, 0.06);
          transform: translateY(-2px);
        }
        .share-pill-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          font-family: monospace, var(--font-tech);
          font-size: 0.65rem;
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
          gap: 10px;
          padding: 8px 12px;
          border-radius: 6px;
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: monospace;
          font-size: 0.68rem;
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
          gap: 20px;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
          height: 100%;
          max-height: 100%;
        }
        .neuro-right-col {
          width: 340px;
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
        
        @media (max-width: 900px) {
          .neuro-page-shell {
            height: auto !important;
            max-height: none !important;
          }
          .neuro-content-container {
            height: auto !important;
            max-height: none !important;
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
        
        {/* Intro Bubbly Panel */}
        <div className="bubbly-panel" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🧠 Neurodiversity Advocacy Portal
            </h3>
            <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: 'rgba(0, 255, 136, 0.5)', letterSpacing: '1px' }}>
              // REGISTRY INDEX: SECURE_NOMINAL
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Welcome to the Advocacy Hub. The neurodiversity paradigm reframes biological variation as a valuable, natural aspect of human diversity—akin to biodiversity in ecological domes. It is a civil rights blueprint that moves away from correcting individual brains, advocating instead for removing environmental barriers and fostering authentic social acceptance.
          </p>
        </div>

        {/* Dynamic Two-Column Layout */}
        <div className="neuro-deck-layout">
          
          {/* LEFT COLUMN: Comparison Matrix & Historical Narrative */}
          <div className="neuro-left-col custom-scroll">
            
            {/* Glanceable Paradigm Comparison Matrix */}
            <div className="bubbly-panel" style={{ flexShrink: 0 }}>
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.8rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
                // PARADIGM SHIFT // GLANCEABLE MATRIX
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                
                {/* Deficit / Pathology Model Block */}
                <div style={{
                  background: 'rgba(234, 67, 53, 0.02)',
                  border: '1.5px solid rgba(234, 67, 53, 0.18)',
                  borderRadius: '8px',
                  padding: '14px',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.85rem' }}>❌</span>
                    <strong style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#ea4335', letterSpacing: '0.5px' }}>
                      OLD SCHOOL PATHOLOGY
                    </strong>
                  </div>
                  <ul style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)', margin: 0, paddingLeft: '16px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>
                      <strong style={{ color: '#ea4335' }}>The Deficit Lens:</strong> Views neurodivergence (Autism, ADHD, Dyslexia) as biological errors or diseases inside the individual.
                    </li>
                    <li>
                      <strong style={{ color: '#ea4335' }}>Goal of Normalization:</strong> Aims to suppress divergent behaviors to force children to appear &quot;normal&quot; or neurotypical.
                    </li>
                    <li>
                      <strong style={{ color: '#ea4335' }}>Correction / Cures:</strong> Relies on pathologizing, clinical interventions designed to suppress stimming, mask traits, or seek cure models.
                    </li>
                  </ul>
                </div>

                {/* Neurodiversity Paradigm Block */}
                <div style={{
                  background: 'rgba(0, 255, 136, 0.02)',
                  border: '1.5px solid rgba(0, 255, 136, 0.22)',
                  borderRadius: '8px',
                  padding: '14px',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.85rem' }}>✨</span>
                    <strong style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#00ff88', letterSpacing: '0.5px' }}>
                      NEURODIVERSITY PARADIGM
                    </strong>
                  </div>
                  <ul style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)', margin: 0, paddingLeft: '16px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>
                      <strong style={{ color: '#00ff88' }}>Natural Variation:</strong> Reframes neurological differences as biological realities—natural and valuable variations of the human genome.
                    </li>
                    <li>
                      <strong style={{ color: '#00ff88' }}>Social Model Focus:</strong> Distinguishes biological differences from disabilities, placing the cause of disability on a mismatch with hostile environments.
                    </li>
                    <li>
                      <strong style={{ color: '#00ff88' }}>Acceptance & Support:</strong> Advocates for sensory accommodations, clear communication channels, and respecting self-determination.
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Story-Driven Historical Archive */}
            <div className="bubbly-panel" style={{ flexShrink: 0 }}>
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.8rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                // CHRONOLOGICAL ARCHIVE // STORY OF LIBERATION
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', marginBottom: '20px' }}>
                Registry traces showing the evolution of autistic people from severe psychiatric cages to scientific self-advocacy:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* 1. Asylum Wards (1930s-1940s) */}
                <div className="timeline-box">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '3px', color: 'rgba(255,255,255,0.6)' }}>
                          CHAPTER I // 1930s - 1940s
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                        The Dark Wards of Confinement
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', lineHeight: '1.5' }}>
                        Autistic individuals are hidden in state asylum wards, written off as &quot;unreachable&quot; or medically broken. In the darkest corridors of this era, the Nazi regime’s **Action T4** eugenic program systematically targets disabled and neurodivergent children for sterilization and involuntary euthanasia, classifying them as &quot;unworthy of life.&quot; Medical diagnosis is literally wielded as a death sentence.
                      </p>
                    </div>
                    {/* SVG 1: Confinement Prison Cage */}
                    <div style={{ background: '#070a12', border: '1.5px solid rgba(234, 67, 53, 0.25)', borderRadius: '8px', height: '115px', position: 'relative', overflow: 'hidden' }}>
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
                </div>

                {/* 2. Refrigerator Mothers (1950s-1960s) */}
                <div className="timeline-box">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '3px', color: 'rgba(255,255,255,0.6)' }}>
                          CHAPTER II // 1950s - 1960s
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                        The Refrigerator Mother Shame
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', lineHeight: '1.5' }}>
                        Psychoanalytic dogmas dominate, and child psychologist Bruno Bettelheim popularizes the cruel **&quot;refrigerator mother&quot; theory** in *The Empty Fortress* (1967). Clinicians claim that autism is caused by emotionally cold, distant mothers, comparing them to concentration camp guards. Parents are crushed with shame, and children are separated from their families (&quot;parentectomies&quot;) to be isolated in stark clinical institutions to be cured.
                      </p>
                    </div>
                    {/* SVG 2: Shivering isolated node */}
                    <div style={{ background: '#070a12', border: '1.5px solid rgba(0, 240, 255, 0.2)', borderRadius: '8px', height: '115px', position: 'relative', overflow: 'hidden' }}>
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
                </div>

                {/* 3. Violent Behavioral Correction (1960s-1970s) */}
                <div className="timeline-box">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '3px', color: 'rgba(255,255,255,0.6)' }}>
                          CHAPTER III // 1960s - 1970s
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                        The Era of Violent behavioral Correction
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', lineHeight: '1.5' }}>
                        In an effort to keep children out of institutions, Ole Ivar Lovaas at UCLA applies behaviorism to autism, initiating behavior modification programs. The goal is to force autistic children to appear &quot;indistinguishable from their peers.&quot; To eliminate stimming and suppress natural cognitive traits, therapists utilize harsh physical slaps, yelling, withholding food or affection, and **severe electric shocks** as aversives. Behavioral correction is forced upon children at a high emotional cost.
                      </p>
                    </div>
                    {/* SVG 3: Electrical discharge shock grid */}
                    <div style={{ background: '#070a12', border: '1.5px solid rgba(255, 117, 34, 0.25)', borderRadius: '8px', height: '115px', position: 'relative', overflow: 'hidden' }}>
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
                </div>

                {/* 4. Self-Advocacy & Judy Singer (Late 1980s-1990s) */}
                <div className="timeline-box">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '3px', color: 'rgba(255,255,255,0.6)' }}>
                          CHAPTER IV // LATE 1980s - 1990s
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                        The Dawn of Autistic Self-Advocacy
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', lineHeight: '1.5' }}>
                        The emergence of early internet message boards provides a historical channel for autistic individuals to connect globally. Organizing self-advocacy groups, they assert they do not need to be &quot;fixed&quot; or &quot;cured.&quot; Australian sociologist **Judy Singer** coins the term **&quot;Neurodiversity&quot;** in her 1998 thesis, reframing neurological differences as a natural, biological reality akin to biodiversity. The social model of disability rises, showing that disability is caused by a restrictive, unaccommodating society, not a broken brain.
                      </p>
                    </div>
                    {/* SVG 4: Glowing green expanding network */}
                    <div style={{ background: '#070a12', border: '1.5px solid rgba(0, 255, 136, 0.25)', borderRadius: '8px', height: '115px', position: 'relative', overflow: 'hidden' }}>
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
                </div>

                {/* 5. Double Empathy (2012-Present) */}
                <div className="timeline-box">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '3px', color: 'rgba(255,255,255,0.6)' }}>
                          CHAPTER V // 2012 - PRESENT
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>
                        The Double Empathy Shift
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', lineHeight: '1.5' }}>
                        Autistic researcher **Dr. Damian Milton** formulates the **Double Empathy Problem** (2012), completely dismantling Kanner&#39;s classic &quot;deficit in empathy&quot; pathology. The theory scientifically proves that communication breakdowns between autistic and allistic (non-autistic) individuals are bidirectional and mutual—stemming from a mismatch in communication styles, cognitive wiring, and worldly experience, rather than a unilateral, autistic social defect.
                      </p>
                    </div>
                    {/* SVG 5: Dual synced waves */}
                    <div style={{ background: '#070a12', border: '1.5px solid rgba(0, 255, 136, 0.25)', borderRadius: '8px', height: '115px', position: 'relative', overflow: 'hidden' }}>
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
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sharing Call to Action & Real-World Guidelines */}
          <div className="neuro-right-col custom-scroll">
            
            {/* Immersive SVG Header Spectrum */}
            <div className="bubbly-panel" style={{ padding: '12px 14px', background: 'rgba(0,0,0,0.3)', height: '95px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
              <span style={{ fontFamily: 'monospace, var(--font-tech)', fontSize: '0.52rem', color: '#00ff88', position: 'absolute', top: '8px', left: '12px', letterSpacing: '0.5px' }}>
                // COGNITIVE_RESONANCE_SCAN
              </span>
              <svg width="100%" height="90px" viewBox="0 0 300 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 10, left: 0 }}>
                {/* Spectral waves */}
                <path d="M 0 50 C 40 100, 80 0, 120 50 C 160 100, 200 0, 240 50 C 280 100, 320 0, 360 50" fill="none" stroke="#00ff88" strokeWidth="1.2" opacity="0.8" />
                <path d="M 0 50 C 40 0, 80 100, 120 50 C 160 0, 200 100, 240 50 C 280 0, 320 100, 360 50" fill="none" stroke="#00f0ff" strokeWidth="0.8" opacity="0.5" />
                <circle cx="150" cy="50" r="30" fill="none" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="0.8" strokeDasharray="3 3" />
                <circle cx="150" cy="50" r="10" fill="none" stroke="#00ff88" strokeWidth="1" />
              </svg>
            </div>

            {/* Complete Sharing Call to Action */}
            <div className="bubbly-panel" style={{ flexShrink: 0 }}>
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.78rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                📢 Pass The Message Along
              </h4>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                True advocacy requires communication and spreading the word. Move others past dehumanizing pathology models by sharing the Neurodiversity Portal with friends, colleagues, or educators:
              </p>

              {/* Direct share deck */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                
                {/* 1. Copy Link button with active label switching */}
                <button 
                  onClick={handleCopyLink}
                  className="hud-btn"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
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
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.76rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                🛠️ Colony Advocacy Protocols
              </h4>
              <p style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', margin: '0 0 12px 0' }}>
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
                      Refuse to describe cognitive differences as deficits, brokenness, or tragedies. Speak of variations, not diseases.
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
                      Adjust environment triggers (loud noise, flashing lights) rather than forcing painful masking or behavioral compliance.
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
                marginTop: '16px',
                borderTop: '1px dashed rgba(255,255,255,0.06)',
                paddingTop: '10px',
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

        </div>

      </div>
    </div>
  );
}
