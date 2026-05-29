'use client';

import { useState, useEffect, useRef } from 'react';
import exhibitData from '../data/neurodiversity-exhibit.json';

// ==========================================
// 🛠️ EXHIBIT 1: MASKING CPU & BATTERY DIAGNOSTICS
// ==========================================
export function MaskingDiagnostics({ reduceMotion }) {
  const [activeToggles, setActiveToggles] = useState({
    eyeContact: false,
    suppressStims: false,
    scripting: false,
    noiseFilter: false,
  });
  
  const [battery, setBattery] = useState(100);
  const [cpu, setCpu] = useState(10);
  const [isOverloaded, setIsOverloaded] = useState(false);
  const [warningFlash, setWarningFlash] = useState(false);
  const timerRef = useRef(null);

  // Recalculate CPU targets based on active masking processes
  const calculateCpuTarget = () => {
    let baseCpu = 10;
    if (activeToggles.eyeContact) baseCpu += 25;
    if (activeToggles.suppressStims) baseCpu += 20;
    if (activeToggles.scripting) baseCpu += 30;
    if (activeToggles.noiseFilter) baseCpu += 20;
    return baseCpu;
  };

  // Handle CPU needle lag smoothing
  useEffect(() => {
    const target = calculateCpuTarget();
    const interval = setInterval(() => {
      setCpu(prev => {
        const diff = target - prev;
        if (Math.abs(diff) < 1) return target;
        return prev + diff * 0.2; // Smooth interpolate
      });
    }, 30);
    return () => clearInterval(interval);
  }, [activeToggles]);

  // Handle battery drain based on CPU and toggles
  useEffect(() => {
    if (isOverloaded) return;
    
    // Drain speed scales exponentially with CPU load
    const activeCount = Object.values(activeToggles).filter(Boolean).length;
    if (activeCount === 0) {
      // Recharging slowly when zero masking load
      if (battery < 100) {
        timerRef.current = setInterval(() => {
          setBattery(prev => Math.min(prev + 0.5, 100));
        }, 150);
      }
      return () => clearInterval(timerRef.current);
    }

    const drainSpeed = Math.max(1, (cpu / 15) ** 1.5);
    timerRef.current = setInterval(() => {
      setBattery(prev => {
        const nextVal = prev - drainSpeed * 0.15;
        if (nextVal <= 0) {
          setIsOverloaded(true);
          return 0;
        }
        return nextVal;
      });
    }, 150);

    return () => clearInterval(timerRef.current);
  }, [cpu, activeToggles, isOverloaded, battery]);

  // Flash warnings at low battery levels
  useEffect(() => {
    if (battery < 30 && battery > 0 && !isOverloaded) {
      const flash = setInterval(() => {
        setWarningFlash(prev => !prev);
      }, 500);
      return () => clearInterval(flash);
    } else {
      setWarningFlash(false);
    }
  }, [battery, isOverloaded]);

  const toggleSwitch = (key) => {
    if (isOverloaded) return;
    setActiveToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleReset = () => {
    setActiveToggles({
      eyeContact: false,
      suppressStims: false,
      scripting: false,
      noiseFilter: false,
    });
    setBattery(100);
    setCpu(10);
    setIsOverloaded(false);
  };

  return (
    <div style={styles.consoleContainer}>
      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>🔋 REACTOR CORE: MASKING & COGNITIVE CPU DIAGNOSTICS</span>
        <span style={styles.telemetryTag}>SYS.SEC // MASK-01</span>
      </div>

      <div style={styles.splitLayout}>
        {/* Left Side: Diagnostics and SVG visualizers */}
        <div style={styles.visualColumn}>
          <div style={styles.svgTelemetryBox}>
            <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00ff88" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="overloadGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ea4335" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ea4335" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background scan lines */}
              <g opacity="0.1" stroke="#00ff88" strokeWidth="0.5">
                <line x1="10" y1="20" x2="190" y2="20" />
                <line x1="10" y1="40" x2="190" y2="40" />
                <line x1="10" y1="60" x2="190" y2="60" />
                <line x1="10" y1="80" x2="190" y2="80" />
                <line x1="10" y1="100" x2="190" y2="100" />
              </g>

              {/* Overload Alert overlay */}
              {isOverloaded && (
                <rect x="0" y="0" width="200" height="120" fill="url(#overloadGlow)" />
              )}

              {/* Dial 1: Social Battery Core (Left) */}
              <circle cx="60" cy="55" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <path 
                d={`M 60,27 A 28 28 0 ${battery > 50 ? 1 : 0} 1 ${60 + 28 * Math.sin((2 * Math.PI * battery) / 100)},${55 - 28 * Math.cos((2 * Math.PI * battery) / 100)}`} 
                fill="none" 
                stroke={isOverloaded ? '#ea4335' : (warningFlash ? '#ffb300' : '#00ff88')} 
                strokeWidth="4.5"
                strokeLinecap="round"
                opacity={battery > 0 ? 1 : 0.1}
                style={{ transition: 'stroke 0.3s ease' }}
              />
              <text x="60" y="52" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {isOverloaded ? 'CRASH' : `${Math.round(battery)}%`}
              </text>
              <text x="60" y="64" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">
                ENERGY CORE
              </text>

              {/* Dial 2: Manual CPU Overclock (Right) */}
              <path d="M 115,75 A 28 28 0 0 1 165,75" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
              {/* CPU Needle indicator */}
              <line 
                x1="140" 
                y1="75" 
                x2={140 - 26 * Math.cos((Math.PI * cpu) / 100)} 
                y2={75 - 26 * Math.sin((Math.PI * cpu) / 100)} 
                stroke={cpu > 70 ? '#ea4335' : (cpu > 40 ? '#ffb300' : '#00f0ff')} 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              <circle cx="140" cy="75" r="3" fill="#fff" />
              <text x="140" y="44" fill="#fff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {Math.round(cpu)}%
              </text>
              <text x="140" y="54" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">
                CPU OVERCLOCK
              </text>

              {/* Spark animations for high CPU */}
              {!isOverloaded && cpu > 40 && (
                <path 
                  d="M 130,30 L 140,15 L 145,28 L 155,10" 
                  fill="none" 
                  stroke="#ffb300" 
                  strokeWidth="1"
                  opacity={0.8}
                  style={{ animation: reduceMotion ? 'none' : 'shiver-node 0.15s infinite' }}
                />
              )}

              {/* Alert Status readout */}
              {isOverloaded ? (
                <g>
                  <rect x="35" y="94" width="130" height="15" rx="3" fill="rgba(234, 67, 53, 0.15)" stroke="#ea4335" strokeWidth="1" />
                  <text x="100" y="104" fill="#ea4335" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    ⚠️ REACTOR BURNOUT // AUTISTIC BURNOUT SHUTDOWN ⚠️
                  </text>
                </g>
              ) : warningFlash ? (
                <g>
                  <rect x="45" y="94" width="110" height="15" rx="3" fill="rgba(255, 179, 0, 0.1)" stroke="#ffb300" strokeWidth="1" />
                  <text x="100" y="104" fill="#ffb300" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    🚨 WARNING: COGNITIVE SYSTEM DEPLETING 🚨
                  </text>
                </g>
              ) : (
                <text x="100" y="104" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">
                  REACTOR OUTPUT STATUS: NOMINAL
                </text>
              )}
            </svg>
          </div>
        </div>

        {/* Right Side: Interactive Controls */}
        <div style={styles.controlColumn}>
          <p style={styles.exhibitDesc}>
            <strong>Universal Experience:</strong> Masking is the manual, conscious performance of mimicking normalcy to avoid exclusion. It acts as an elite tax on cognitive processors, draining your reactor core.
          </p>

          <span style={styles.consoleSectionLabel}>[ COMPLIANCE REGULATION PROTOCOLS ]</span>

          <div style={styles.gridToggles}>
            {exhibitData.maskingToggles.map(toggle => (
              <button
                key={toggle.key}
                onClick={() => toggleSwitch(toggle.key)}
                style={{
                  ...styles.toggleBtn,
                  ...(activeToggles[toggle.key] ? styles.toggleBtnActive : {}),
                  ...(isOverloaded ? styles.toggleBtnDisabled : {})
                }}
                disabled={isOverloaded}
              >
                <div style={styles.toggleBtnHeader}>
                  <strong style={styles.toggleBtnLabel}>{toggle.label}</strong>
                  <span style={styles.toggleBtnCost}>{toggle.cost}</span>
                </div>
                <span style={styles.toggleBtnDesc}>{toggle.desc}</span>
              </button>
            ))}
          </div>

          <div style={styles.btnRow}>
            {isOverloaded ? (
              <button onClick={handleReset} style={styles.dangerResetBtn}>
                ⚡ REBOOT CORRIDORS & INITIALIZE RADICAL REST ⚡
              </button>
            ) : (
              <button onClick={handleReset} style={styles.resetBtn}>
                [ RESET DIAGNOSTICS / DROP THE MASK ]
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 🎯 EXHIBIT 2: MONOTROPIC ATTENTION SPOTLIGHT & TRANSITION SHOCKWAVE
// ==========================================
export function MonotropicSpotlight({ reduceMotion }) {
  const [isMonotropic, setIsMonotropic] = useState(true);
  const [highlightedNode, setHighlightedNode] = useState('hyperfocus');
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const [shakeActive, setShakeActive] = useState(false);

  const nodes = exhibitData.monotropicNodes;

  const handleTriggerInterrupt = () => {
    if (reduceMotion) return; // Do not trigger shakes/shockwaves
    setShockwaveActive(true);
    if (isMonotropic) {
      setShakeActive(true);
      setTimeout(() => setShakeActive(false), 500);
    }
    setTimeout(() => setShockwaveActive(false), 1200);
  };

  return (
    <div style={{
      ...styles.consoleContainer,
      ...(shakeActive && !reduceMotion ? styles.shakeAnimation : {})
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shockwave-pulse {
          0% { r: 5px; opacity: 1; stroke-width: 4px; }
          100% { r: 90px; opacity: 0; stroke-width: 0.5px; }
        }
        @keyframes shake-frame {
          0%, 100% { transform: translate(0, 0); }
          10%, 90% { transform: translate(-3px, 2px); }
          30%, 70% { transform: translate(3px, -2px); }
          50% { transform: translate(-2px, -3px); }
        }
        .shockwave-effect {
          animation: shockwave-pulse 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
        .shake-active-frame {
          animation: shake-frame 0.5s ease-in-out;
        }
      `}} />

      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>🎯 RADAR DISPATCH: MONOTROPIC ATTENTION TUNNEL</span>
        <span style={styles.telemetryTag}>SYS.SEC // SHIFT-02</span>
      </div>

      <div style={styles.splitLayout}>
        {/* Visual Radar Column */}
        <div style={styles.visualColumn}>
          <div style={styles.svgTelemetryBox}>
            <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
              <defs>
                {/* Spotlight gradient masking */}
                <mask id="monotropicMask">
                  <rect x="0" y="0" width="200" height="120" fill="rgba(255, 255, 255, 0.06)" />
                  {isMonotropic ? (
                    /* Monotropic focus: tight, intense spotlight centered on active node */
                    <circle 
                      cx={nodes[highlightedNode].x} 
                      cy={nodes[highlightedNode].y} 
                      r="35" 
                      fill="url(#spotlightGlow)" 
                    />
                  ) : (
                    /* Polytropic focus: wide, evenly dispersed attention cover */
                    <rect x="0" y="0" width="200" height="120" fill="rgba(255, 255, 255, 0.45)" />
                  )}
                </mask>
                
                <radialGradient id="spotlightGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="60%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Coordinates Radar lines */}
              <circle cx="100" cy="60" r="50" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.8" strokeDasharray="3 3" />
              <circle cx="100" cy="60" r="30" fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.8" />
              <line x1="100" y1="5" x2="100" y2="115" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.8" />
              <line x1="10" y1="60" x2="190" y2="60" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.8" />

              {/* The underlying raw input nodes (All available inputs) */}
              {Object.keys(nodes).map(key => {
                const node = nodes[key];
                const isFocused = highlightedNode === key;
                
                return (
                  <g key={key} style={{ cursor: 'pointer' }} onClick={() => setHighlightedNode(key)}>
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r="4" 
                      fill={isFocused ? '#00f0ff' : 'rgba(255,255,255,0.2)'} 
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r="8" 
                      fill="none" 
                      stroke={isFocused ? '#00f0ff' : 'transparent'} 
                      strokeWidth="0.8"
                      strokeDasharray="2 1"
                    />
                  </g>
                );
              })}

              {/* The dynamic mask that blocks or opens ambient inputs */}
              <rect x="0" y="0" width="200" height="120" fill="#04060c" opacity="0.88" mask="url(#monotropicMask)" style={{ transition: 'mask 0.3s ease' }} />

              {/* Highlight Overlay: labels printed on top of focus spotlights */}
              {Object.keys(nodes).map(key => {
                const node = nodes[key];
                const isFocused = highlightedNode === key;
                const visible = !isMonotropic || isFocused;
                
                return (
                  <g key={`label-${key}`} opacity={visible ? 1 : 0.1} style={{ transition: 'opacity 0.3s ease' }}>
                    <text 
                      x={node.x} 
                      y={node.y - 8} 
                      fill={isFocused ? '#00f0ff' : 'rgba(255,255,255,0.7)'} 
                      fontSize="4.5" 
                      fontFamily="monospace" 
                      textAnchor="middle" 
                      fontWeight={isFocused ? 'bold' : 'normal'}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}

              {/* Interruption Shockwave Animation */}
              {shockwaveActive && (
                <circle 
                  cx={nodes[highlightedNode].x} 
                  cy={nodes[highlightedNode].y} 
                  r="5" 
                  fill="none" 
                  stroke={isMonotropic ? '#ea4335' : '#00f0ff'} 
                  className="shockwave-effect"
                />
              )}
            </svg>
          </div>

          <div style={styles.telemetryReadoutBox}>
            <span style={styles.telemetryTag}>[ COGNITIVE FOCUS TELEMETRY ]</span>
            <div style={styles.telemetryItem}>
              <strong>ACTIVE INPUT STATE:</strong> 
              <span style={{ color: '#00f0ff' }}> {nodes[highlightedNode].label}</span>
            </div>
            <div style={styles.telemetryItem}>
              <strong>SIGNAL ACCESSIBILITY:</strong> 
              <span> {nodes[highlightedNode].desc}</span>
            </div>
            <div style={styles.telemetryItem}>
              <strong>ATTENTIONAL FRICTION INDEX:</strong> 
              <span style={{ color: isMonotropic ? '#ffb300' : '#00ff88' }}>
                {isMonotropic ? 'HIGH (TRANSITION BUFFERS MANDATORY)' : 'NOMINAL (DECENTRALIZED MULTI-CHANNEL)'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Controls Column */}
        <div style={styles.controlColumn}>
          <p style={styles.exhibitDesc}>
            <strong>Different Ways of Thinking:</strong> Autistic focus is monotropic—allocating attention intensely to a single spotlight channel. Halting or shifting hyperfocus causes extreme cognitive friction, similar to being torn out of a high-speed vehicle.
          </p>

          <span style={styles.consoleSectionLabel}>[ CHOOSE RADAR OPERATIONAL PROFILE ]</span>

          <div style={styles.btnSelectorGroup}>
            <button
              onClick={() => setIsMonotropic(true)}
              style={{
                ...styles.selectorBtn,
                ...(isMonotropic ? styles.selectorBtnActiveCyan : {})
              }}
            >
              🧠 MONOTROPIC PROFILE (TUNNEL FOCUS)
            </button>
            <button
              onClick={() => setIsMonotropic(false)}
              style={{
                ...styles.selectorBtn,
                ...(!isMonotropic ? styles.selectorBtnActiveCyan : {})
              }}
            >
              🌐 POLYTROPIC PROFILE (MULTI-CHANNEL)
            </button>
          </div>

          <p style={{ ...styles.exhibitDesc, fontStyle: 'italic', marginTop: '8px' }}>
            {isMonotropic 
              ? "⚡ Status: Monotropic mode secured. The brain processes one channel in maximum high definition. Noise is muted, focus is absolute." 
              : "🌐 Status: Polytropic mode active. Distributed processing. Multiple shallow channels scanned simultaneously."
            }
          </p>

          <span style={styles.consoleSectionLabel}>[ SYSTEM STRESS PENETRATION TEST ]</span>
          
          <button 
            onClick={handleTriggerInterrupt} 
            style={{
              ...styles.radarPulseBtn,
              ...(isMonotropic ? styles.dangerPulseBtn : styles.infoPulseBtn)
            }}
          >
            {isMonotropic ? '🚨 FORCE ABRUPT ATTENTION SHIFT (SIMULATE INTERRUPT)' : '⚡ INITIATE ROUTINE CHANNEL CYCLE'}
          </button>

          {shockwaveActive && isMonotropic && (
            <div style={styles.hazardAlertPanel}>
              <strong>⚠️ ATTENTIONAL INERTIA SHEAR DETECTED // TRANSITION FRICTION OVERLIMIT ⚠️</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.62rem' }}>
                Abruptly dragging the mind out of its special interest track triggers sensory shockwaves and emotional irritation. Accommodate by providing transitional count-down alerts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 🤝 EXHIBIT 3: DOUBLE EMPATHY SYNC & WAVE ALIGNMENT
// ==========================================
export function DoubleEmpathySync({ reduceMotion }) {
  const [dialoguePath, setDialoguePath] = useState(null); // 'deficit' or 'affirming'
  const [dialogueStep, setDialogueStep] = useState(0);
  const [explicitness, setExplicitness] = useState(2);
  const [waveOffset, setWaveOffset] = useState(0);

  // Animate the wave moving
  useEffect(() => {
    if (reduceMotion) return; // Halt JS wave animation
    const handle = requestAnimationFrame(function animate() {
      setWaveOffset(prev => (prev + 1.2) % 360);
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(handle);
  }, [reduceMotion]);

  // Determine wave synchronization alignment percentage
  const getSyncPercent = () => {
    // Explicit communication bridges the neurotype wave gap
    return Math.min(100, Math.round(explicitness * 10));
  };

  const syncPercent = getSyncPercent();
  const isSynced = syncPercent >= 80;

  const resetDialogue = () => {
    setDialoguePath(null);
    setDialogueStep(0);
  };

  // Pre-calculated wave trajectories
  const generateSineWavePath = (frequency, phaseShift, isAligned) => {
    let points = [];
    const amplitude = isAligned ? 20 : 15;
    const baseFreq = frequency * 0.08;
    for (let x = 10; x <= 190; x++) {
      const radians = (x + waveOffset + phaseShift) * baseFreq;
      const y = 60 + amplitude * Math.sin(radians);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  const renderDialogue = () => {
    if (dialoguePath === null) {
      return (
        <div style={styles.dialogueBox}>
          <div style={styles.commTranscriptLabel}>[ MISSION UPLINK: COMMUNICATION FAULT CONTEXT ]</div>
          <p style={styles.dialogueTeaser}>
            <strong>Context:</strong> {exhibitData.doubleEmpathyDialogue.teaser}
          </p>
          <div style={styles.choiceBtnStack}>
            <button onClick={() => { setDialoguePath('deficit'); setDialogueStep(1); }} style={styles.deficitChoiceBtn}>
              {exhibitData.doubleEmpathyDialogue.deficit.label}
            </button>
            <button onClick={() => { setDialoguePath('affirming'); setDialogueStep(1); }} style={styles.affirmingChoiceBtn}>
              {exhibitData.doubleEmpathyDialogue.affirming.label}
            </button>
          </div>
        </div>
      );
    }

    if (dialoguePath === 'deficit') {
      const data = exhibitData.doubleEmpathyDialogue.deficit;
      return (
        <div style={styles.dialogueBox}>
          <div style={styles.commTranscriptLabel}>[ UPLINK TRANSCRIPT // DEFICIT CLINICAL LOG ]</div>
          
          {dialogueStep === 1 && (
            <>
              <div style={styles.chatBubbleNt}>
                <strong>PEER_ALLISTIC:</strong> &quot;{data.step1Nt}&quot;
              </div>
              <div style={styles.chatBubbleNd}>
                <strong>CITIZEN_BECKER (Quiet, Stressed):</strong> {data.step1Nd}
              </div>
              <button onClick={() => setDialogueStep(2)} style={styles.consoleBtnNext}>[ EXAMINE DIAGNOSTIC OUTCOME ➔ ]</button>
            </>
          )}

          {dialogueStep === 2 && (
            <>
              <div style={styles.hazardAlertPanel}>
                <strong>{data.failureTitle}</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.68rem' }}>
                  {data.failureDesc}
                </p>
              </div>
              <button onClick={resetDialogue} style={styles.dialogueResetBtn}>[ REBOOT COMMS LOG ]</button>
            </>
          )}
        </div>
      );
    }

    if (dialoguePath === 'affirming') {
      const data = exhibitData.doubleEmpathyDialogue.affirming;
      return (
        <div style={styles.dialogueBox}>
          <div style={styles.commTranscriptLabel}>[ UPLINK TRANSCRIPT // DOUBLE EMPATHY BRIDGE ]</div>
          
          {dialogueStep === 1 && (
            <>
              <div style={styles.chatBubbleNd}>
                <strong>CITIZEN_BECKER (Explicit Communication):</strong> &quot;{data.step1Nd}&quot;
              </div>
              <div style={styles.chatBubbleNt}>
                <strong>PEER_ALLISTIC (Accommodating):</strong> &quot;{data.step1Nt}&quot;
              </div>
              <button onClick={() => setDialogueStep(2)} style={styles.consoleBtnNext}>[ EXAMINE DIAGNOSTIC OUTCOME ➔ ]</button>
            </>
          )}

          {dialogueStep === 2 && (
            <>
              <div style={styles.successAlertPanel}>
                <strong>{data.successTitle}</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.68rem' }}>
                  {data.successDesc}
                </p>
              </div>
              <button onClick={resetDialogue} style={styles.dialogueResetBtn}>[ REBOOT COMMS LOG ]</button>
            </>
          )}
        </div>
      );
    }
  };

  return (
    <div style={styles.consoleContainer}>
      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>🤝 WAVE SYNCHRONIZER: DOUBLE EMPATHY & BRIDGE MISMATCH</span>
        <span style={styles.telemetryTag}>SYS.SEC // WAVE-03</span>
      </div>

      <div style={styles.splitLayout}>
        {/* Wave visualizer SVG side */}
        <div style={styles.visualColumn}>
          <div style={styles.svgTelemetryBox}>
            <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', background: '#04060c' }}>
              {/* Grid scanning pattern */}
              <g opacity="0.05" stroke="#00ff88" strokeWidth="0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="120" />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} />
                ))}
              </g>

              {/* Sine Wave 1: Autistic Communication (Emerald) */}
              <path 
                d={generateSineWavePath(1.5, 0, isSynced)} 
                fill="none" 
                stroke="#00ff88" 
                strokeWidth={isSynced ? '2.5' : '1.5'} 
                opacity={isSynced ? '0.9' : '0.6'}
                style={{ transition: 'stroke-width 0.4s ease, opacity 0.4s ease' }}
              />

              {/* Sine Wave 2: Allistic Communication (Pink) */}
              <path 
                d={generateSineWavePath(1.5, isSynced ? 0 : 180, isSynced)} 
                fill="none" 
                stroke="#ff007f" 
                strokeWidth={isSynced ? '2.5' : '1.5'} 
                opacity={isSynced ? '0.9' : '0.6'}
                style={{ transition: 'stroke-width 0.4s ease, opacity 0.4s ease' }}
              />

              {/* Sync Locking Ring Accents */}
              {isSynced ? (
                <g>
                  <circle cx="100" cy="60" r="25" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.8" />
                  <circle cx="100" cy="60" r="10" fill="none" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="3 1.5">
                    <animateTransform attributeName="transform" type="rotate" from="0 100 60" to="360 100 60" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <line x1="100" y1="30" x2="100" y2="90" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="70" y1="60" x2="130" y2="60" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="2 2" />
                </g>
              ) : (
                <g opacity="0.3">
                  <line x1="80" y1="30" x2="80" y2="90" stroke="#ff007f" strokeWidth="0.5" strokeDasharray="1 1" />
                  <line x1="120" y1="30" x2="120" y2="90" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="1 1" />
                </g>
              )}

              {/* Signal Sync Text indicator */}
              <text x="100" y="20" fill={isSynced ? '#00f0ff' : 'rgba(255,255,255,0.4)'} fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {isSynced ? '⚡ TELEMETRY SYNC LOCK: NOMINAL ⚡' : '⚠️ SIGNALS DE-SYNCHRONIZED // PHASE MISMATCH ⚠️'}
              </text>
            </svg>
          </div>

          <div style={styles.sliderDashboardPanel}>
            <div style={styles.sliderTelemetryHeader}>
              <span style={styles.sliderLabel}>EXPLICITNESS INDEX DIAL (COMMUNICATION OVERRIDE)</span>
              <span style={styles.sliderValReadout}>{syncPercent}% SYNC</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="1"
              value={explicitness} 
              onChange={(e) => setExplicitness(Number(e.target.value))} 
              style={styles.explicitnessRangeSlider}
            />
            <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', margin: '4px 0 0 0', fontFamily: 'monospace' }}>
              *Adjusting this overrides unstated social guesses and replaces them with explicit, collaborative verbal boundaries. High values lock wave phases in sync.
            </p>
          </div>
        </div>

        {/* dialogue transcript side */}
        <div style={styles.controlColumn}>
          <p style={styles.exhibitDesc}>
            <strong>Universal Experience:</strong> Communication breakdowns between diverging neurotypes are two-way, mutual mismatches in wiring (Damian Milton\'s Double Empathy). ND and NT individuals run different communication software; bridges are built through explicit, direct verbal expectations.
          </p>

          {renderDialogue()}
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 🌿 EXHIBIT 4: ENVIRONMENTAL TRANSITION SLIDER
// ==========================================
export function EnvironmentalTransition({ reduceMotion }) {
  const [sliderVal, setSliderVal] = useState(50);
  const containerRef = useRef(null);

  const leftWeight = 100 - sliderVal;
  const rightWeight = sliderVal;

  return (
    <div style={styles.consoleContainer}>
      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>🌿 BIOSPHERE SHUTTLE: PATHOLOGY MATRIX VS. AFFIRMING HORIZON</span>
        <span style={styles.telemetryTag}>SYS.SEC // DOME-04</span>
      </div>

      <p style={{ ...styles.exhibitDesc, marginBottom: '14px' }}>
        <strong>The Social Model of Disability:</strong> Biological cognitive differences are distinct from disability. Disability is created when an environment is built exclusively for one neurotype, creating a hostile friction mismatch. Drag the slider to transform the environment from a pathology cage to an accommodating biosphere.
      </p>

      {/* Split screen display grid */}
      <div ref={containerRef} style={styles.sliderSplitWrapper}>
        
        {/* Left Side: Deficit pathology model */}
        <div style={{
          ...styles.splitSectionPane,
          ...styles.splitSectionPaneLeft,
          width: `${leftWeight}%`,
          opacity: leftWeight > 10 ? 1 : 0.05
        }}>
          {/* SVG 1: Locked pathology cage */}
          <div style={styles.splitEnvironmentSvg}>
            <svg viewBox="0 0 100 80" width="100%" height="100%">
              <rect x="0" y="0" width="100" height="80" fill="rgba(234, 67, 53, 0.02)" />
              <line x1="20" y1="5" x2="20" y2="75" stroke="rgba(234,67,53,0.3)" strokeWidth="1" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="rgba(234,67,53,0.3)" strokeWidth="1" />
              <line x1="60" y1="5" x2="60" y2="75" stroke="rgba(234,67,53,0.3)" strokeWidth="1" />
              <line x1="80" y1="5" x2="80" y2="75" stroke="rgba(234,67,53,0.3)" strokeWidth="1" />
              <line x1="5" y1="20" x2="95" y2="20" stroke="rgba(234,67,53,0.2)" strokeWidth="1.5" />
              <line x1="5" y1="55" x2="95" y2="55" stroke="rgba(234,67,53,0.2)" strokeWidth="1.5" />
              {/* padlock */}
              <rect x="44" y="32" width="12" height="10" rx="1.5" fill="none" stroke="#ea4335" strokeWidth="1.5" />
              <path d="M 46,32 A 4 4 0 0 1 54,32" fill="none" stroke="#ea4335" strokeWidth="1" />
              <circle cx="50" cy="37" r="1.5" fill="#ea4335" />
            </svg>
          </div>

          <div style={styles.environDescriptionBox}>
            <span style={styles.deficitSectionHeader}>{exhibitData.environmentalTransition.deficit.header}</span>
            <ul style={styles.environListUl}>
              {exhibitData.environmentalTransition.deficit.items.map((item, idx) => (
                <li key={idx}><strong>{item.label}:</strong> {item.text}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Affirming biosphere model */}
        <div style={{
          ...styles.splitSectionPane,
          ...styles.splitSectionPaneRight,
          width: `${rightWeight}%`,
          opacity: rightWeight > 10 ? 1 : 0.05
        }}>
          {/* SVG 2: Pulsing emerald biosphere */}
          <div style={styles.splitEnvironmentSvg}>
            <svg viewBox="0 0 100 80" width="100%" height="100%">
              <rect x="0" y="0" width="100" height="80" fill="rgba(0, 255, 136, 0.02)" />
              <circle cx="50" cy="40" r="18" fill="none" stroke="#00ff88" strokeWidth="0.8" strokeDasharray="3 3" />
              <circle cx="50" cy="40" r="12" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.5" />
              {/* Core organic node */}
              <circle cx="50" cy="40" r="5" fill="#00ff88">
                <animate attributeName="r" values="4.5;5.5;4.5" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Radiating adaptation waves */}
              <circle cx="50" cy="40" r="10" fill="none" stroke="#00ff88" strokeWidth="0.5" opacity="0.3">
                <animate attributeName="r" values="5;28" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div style={styles.environDescriptionBox}>
            <span style={styles.affirmingSectionHeader}>{exhibitData.environmentalTransition.affirming.header}</span>
            <ul style={styles.environListUl}>
              {exhibitData.environmentalTransition.affirming.items.map((item, idx) => (
                <li key={idx}><strong>{item.label}:</strong> {item.text}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Central environmental controller slider bar */}
      <div style={styles.centralSliderControllerPanel}>
        <div style={styles.sliderReadoutRow}>
          <span style={{ color: '#ea4335', fontWeight: 'bold' }}>❌ PATHOLOGY MODEL ({Math.round(leftWeight)}%)</span>
          <span style={{ color: '#00ff88', fontWeight: 'bold' }}>✨ AFFIRMING PARADIGM ({Math.round(rightWeight)}%)</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100"
          value={sliderVal} 
          onChange={(e) => setSliderVal(Number(e.target.value))} 
          style={styles.environmentalRangeSlider}
        />
      </div>

    </div>
  );
}


// ==========================================
// 🧘 EXHIBIT 5: BREATHING REGULATOR (SENSORY DOWN-REGULATION)
// ==========================================
export function BreathingRegulator() {
  const [phase, setPhase] = useState(exhibitData.breathingRegulator.phases.inhale); // Inhale (4s), Hold (4s), Exhale (4s), Hold (4s)
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTicks(prev => {
        const nextTick = (prev + 1) % 16;
        if (nextTick === 0) setPhase(exhibitData.breathingRegulator.phases.inhale);
        else if (nextTick === 4) setPhase(exhibitData.breathingRegulator.phases.holdRetain);
        else if (nextTick === 8) setPhase(exhibitData.breathingRegulator.phases.exhale);
        else if (nextTick === 12) setPhase(exhibitData.breathingRegulator.phases.holdEmpty);
        return nextTick;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCircleScale = () => {
    if (ticks < 4) {
      // Inhaling: scale expands from 1 to 1.8
      return 1 + (ticks / 4) * 0.8;
    }
    if (ticks >= 4 && ticks < 8) {
      // Holding full: maintains 1.8
      return 1.8;
    }
    if (ticks >= 8 && ticks < 12) {
      // Exhaling: scale contracts from 1.8 to 1
      return 1.8 - ((ticks - 8) / 4) * 0.8;
    }
    // Holding empty: maintains 1
    return 1;
  };

  const scale = getCircleScale();

  return (
    <div style={{ ...styles.consoleContainer, maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>🧘 NEURAL BUFFER: SENSORY DOWN-REGULATION</span>
      </div>
      
      <p style={{ ...styles.exhibitDesc, marginBottom: '20px' }}>
        {exhibitData.breathingRegulator.desc}
      </p>

      <div style={styles.breathingCanvasBox}>
        <svg viewBox="0 0 100 100" style={{ width: '150px', height: '150px' }}>
          <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(0, 255, 136, 0.05)" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(0, 255, 136, 0.1)" strokeWidth="0.8" strokeDasharray="2 2" />
          
          {/* Pulsing breathing ring */}
          <circle 
            cx="50" 
            cy="50" 
            r={16 * scale} 
            fill="rgba(0, 255, 136, 0.05)" 
            stroke="#00ff88" 
            strokeWidth="2.5" 
            style={{ 
              transition: 'r 1s linear, stroke-width 0.3s ease',
              filter: 'drop-shadow(0 0 4px #00ff88)'
            }} 
          />
        </svg>

        <div style={styles.breathReadoutPanel}>
          <span style={styles.breathPhaseName}>{phase.toUpperCase()}</span>
          <span style={styles.breathTimerSec}>{4 - (ticks % 4)} SOLS</span>
        </div>
      </div>

      <div style={styles.breathingInstructionsRow}>
        {exhibitData.breathingRegulator.steps.map((step, idx) => (
          <div key={idx} style={{ 
            ...styles.breathStepChip, 
            ...((idx === 0 && ticks < 4) || (idx === 1 && ticks >= 4 && ticks < 8) || (idx === 2 && ticks >= 8 && ticks < 12) || (idx === 3 && ticks >= 12) ? styles.breathStepActive : {}) 
          }}>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 🌿 EXHIBIT 1: WHAT IS NEURODIVERSITY CLICKABLE COGNITIVE ORBITALS
// ==========================================
export function ExhibitPlaqueVisualization({ reduceMotion }) {
  const [selectedNode, setSelectedNode] = useState('none');

  const nodeDetails = exhibitData.exhibit1Orbitals;

  const details = nodeDetails[selectedNode];

  return (
    <div style={{ ...styles.consoleContainer, maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>🛰️ COGNITIVE ECOSYSTEM MATRIX</span>
        <span style={styles.telemetryTag}>SYS_NOMINAL</span>
      </div>
      
      <p style={{ ...styles.exhibitDesc, marginBottom: '14px', textAlign: 'center' }}>
        Interactive Pluralism Plaque. Click different glowing orbital pipelines to isolate specific cognitive processing profiles:
      </p>

      <div style={{ background: '#04060c', borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)', minHeight: '190px', position: 'relative' }}>
        <svg viewBox="0 0 100 100" style={{ width: '165px', height: '165px' }}>
          {/* Background grid lines */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />

          {/* Central sun (Ecosystem core) */}
          <circle cx="50" cy="50" r="3.5" fill="#fff" opacity="0.3" />

          {/* Clickable Orbit 1: Monotropic (Outer) */}
          {/* Underneath transparent stroke orbit to expand clickable zone */}
          <circle 
            cx="50" cy="50" r="42" 
            fill="none" 
            stroke="transparent" 
            strokeWidth="10" 
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedNode('monotropic')}
          />
          <circle 
            cx="50" cy="50" r="42" 
            fill="none" 
            stroke={selectedNode === 'monotropic' ? '#00ff88' : 'rgba(0, 255, 136, 0.15)'} 
            strokeWidth={selectedNode === 'monotropic' ? '2.5' : '1'} 
            strokeDasharray="4 2"
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            onClick={() => setSelectedNode('monotropic')}
          />
          <g>
            {!reduceMotion && <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="9s" repeatCount="indefinite" />}
            {/* Expanded Hitbox */}
            <circle cx="50" cy="8" r="10" fill="transparent" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setSelectedNode('monotropic'); }} />
            {/* Visual Node */}
            <circle cx="50" cy="8" r="3.5" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 4px #00ff88)', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setSelectedNode('monotropic'); }} />
          </g>

          {/* Clickable Orbit 2: Polytropic (Middle) */}
          {/* Underneath transparent stroke orbit to expand clickable zone */}
          <circle 
            cx="50" cy="50" r="30" 
            fill="none" 
            stroke="transparent" 
            strokeWidth="10" 
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedNode('polytropic')}
          />
          <circle 
            cx="50" cy="50" r="30" 
            fill="none" 
            stroke={selectedNode === 'polytropic' ? '#00f0ff' : 'rgba(0, 240, 255, 0.15)'} 
            strokeWidth={selectedNode === 'polytropic' ? '2.5' : '1'} 
            strokeDasharray="1 3"
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            onClick={() => setSelectedNode('polytropic')}
          />
          <g>
            {!reduceMotion && <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="14s" repeatCount="indefinite" />}
            {/* Expanded Hitbox */}
            <circle cx="50" cy="20" r="10" fill="transparent" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setSelectedNode('polytropic'); }} />
            {/* Visual Node */}
            <circle cx="50" cy="20" r="3" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 4px #00f0ff)', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setSelectedNode('polytropic'); }} />
          </g>

          {/* Clickable Orbit 3: ADHD / Interest (Inner) */}
          {/* Underneath transparent stroke orbit to expand clickable zone */}
          <circle 
            cx="50" cy="50" r="18" 
            fill="none" 
            stroke="transparent" 
            strokeWidth="8" 
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedNode('adhd')}
          />
          <circle 
            cx="50" cy="50" r="18" 
            fill="none" 
            stroke={selectedNode === 'adhd' ? '#ffb300' : 'rgba(255, 179, 0, 0.15)'} 
            strokeWidth={selectedNode === 'adhd' ? '2.5' : '1'} 
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            onClick={() => setSelectedNode('adhd')}
          />
          <g>
            {!reduceMotion && <animateTransform attributeName="transform" type="rotate" from="180 50 50" to="540 50 50" dur="7s" repeatCount="indefinite" />}
            {/* Expanded Hitbox */}
            <circle cx="50" cy="32" r="10" fill="transparent" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setSelectedNode('adhd'); }} />
            {/* Visual Node */}
            <circle cx="50" cy="32" r="2.5" fill="#ffb300" style={{ filter: 'drop-shadow(0 0 4px #ffb300)', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setSelectedNode('adhd'); }} />
          </g>
        </svg>
      </div>

      {/* Selected details readout console */}
      <div style={{ background: '#04060c', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px 14px', marginTop: '12px', minHeight: '80px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <strong style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: details.color, letterSpacing: '0.5px', display: 'block', marginBottom: '3px' }}>
          {details.title}
        </strong>
        <p style={{ margin: 0, fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4, fontFamily: 'monospace' }}>
          {details.desc}
        </p>
      </div>
    </div>
  );
}


// ==========================================
// 📊 EXHIBIT 2: TRAIT-RESPONSIVE RADAR MATRIX
// ==========================================
export function ExhibitMatrixVisualization({ activeTrait, reduceMotion }) {
  const [lens, setLens] = useState('affirming'); // 'pathology' or 'affirming'

  // Render responsive graphic patterns representing each trait + selected lens
  const renderVisualElements = () => {
    const isAffirm = lens === 'affirming';
    const mainColor = isAffirm ? '#00ff88' : '#ea4335';
    
    switch (activeTrait) {
      case 'stimming':
        // Rhythmic self-regulation ripples
        return (
          <g>
            <circle cx="100" cy="60" r="10" fill="none" stroke={mainColor} strokeWidth="1" opacity="0.3">
              {!reduceMotion && <animate attributeName="r" values={isAffirm ? "5;45" : "5;12"} dur={isAffirm ? "3s" : "0.8s"} repeatCount="indefinite" />}
              {!reduceMotion && <animate attributeName="opacity" values="0.8;0" dur={isAffirm ? "3s" : "0.8s"} repeatCount="indefinite" />}
            </circle>
            <circle cx="100" cy="60" r="10" fill="none" stroke={mainColor} strokeWidth="1.5" opacity="0.2">
              {!reduceMotion && <animate attributeName="r" values={isAffirm ? "15;55" : "10;15"} dur={isAffirm ? "3s" : "0.8s"} repeatCount="indefinite" begin="1s" />}
              {!reduceMotion && <animate attributeName="opacity" values="0.6;0" dur={isAffirm ? "3s" : "0.8s"} repeatCount="indefinite" begin="1s" />}
            </circle>
            <circle cx="100" cy="60" r="4" fill={mainColor} style={{ filter: `drop-shadow(0 0 5px ${mainColor})` }} />
            {/* Pathology locks or Affirming rings */}
            {!isAffirm && (
              <g stroke="#ea4335" strokeWidth="0.8" fill="none">
                <line x1="90" y1="50" x2="110" y2="70" />
                <line x1="110" y1="50" x2="90" y2="70" />
              </g>
            )}
          </g>
        );

      case 'hyperfocus':
        // Intense spotlight tunnel focus
        return (
          <g>
            <defs>
              <radialGradient id="matrixSpot" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={mainColor} stopOpacity={isAffirm ? "0.45" : "0.08"} />
                <stop offset="100%" stopColor={mainColor} stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="35" r={isAffirm ? "30" : "10"} fill="url(#matrixSpot)" style={{ transition: 'all 0.3s' }} />
            <circle cx="100" cy="35" r="3" fill={mainColor} />
            {isAffirm ? (
              // Affirming: laser pathway targeting deep core
              <line x1="100" y1="35" x2="100" y2="100" stroke="#00ff88" strokeWidth="1.2" strokeDasharray="3 2">
                <animate attributeName="stroke-dashoffset" values="20;0" dur="1.5s" repeatCount="indefinite" />
              </line>
            ) : (
              // Pathology: broken dotted red lines
              <g stroke="#ea4335" strokeWidth="0.5" opacity="0.4" strokeDasharray="1 4">
                <circle cx="100" cy="35" r="20" fill="none" />
                <circle cx="100" cy="35" r="40" fill="none" />
              </g>
            )}
          </g>
        );

      case 'comms':
        // Wave synchronization or phase mismatch
        return (
          <g strokeWidth="1.5" fill="none">
            {/* ND Wave */}
            <path 
              d={`M 15,60 Q 40,${isAffirm ? 40 : 20} 65,60 T 115,60 T 165,60 T 185,60`} 
              stroke={mainColor}
            >
              <animate attributeName="d" 
                values={`M 15,60 Q 40,${isAffirm ? 40 : 20} 65,60 T 115,60 T 165,60 T 185,60;
                        M 15,60 Q 40,${isAffirm ? 80 : 100} 65,60 T 115,60 T 165,60 T 185,60;
                        M 15,60 Q 40,${isAffirm ? 40 : 20} 65,60 T 115,60 T 165,60 T 185,60`} 
                dur="1.8s" 
                repeatCount="indefinite" 
              />
            </path>
            {/* NT Wave (offset or locked in sync) */}
            <path 
              d={`M 15,60 Q 40,${isAffirm ? 40 : 100} 65,60 T 115,60 T 165,60 T 185,60`} 
              stroke={isAffirm ? '#00f0ff' : '#ff007f'} 
              opacity="0.75"
            >
              <animate attributeName="d" 
                values={`M 15,60 Q 40,${isAffirm ? 40 : 100} 65,60 T 115,60 T 165,60 T 185,60;
                        M 15,60 Q 40,${isAffirm ? 80 : 20} 65,60 T 115,60 T 165,60 T 185,60;
                        M 15,60 Q 40,${isAffirm ? 40 : 100} 65,60 T 115,60 T 165,60 T 185,60`} 
                dur="1.8s" 
                repeatCount="indefinite" 
              />
            </path>
          </g>
        );

      case 'autonomy':
        // Autonomy shield dome
        return (
          <g>
            {isAffirm ? (
              // Affirming glowing shield
              <g>
                <path d="M 50,95 A 50 50 0 0 1 150,95" fill="rgba(0, 255, 136, 0.05)" stroke="#00ff88" strokeWidth="2.2" />
                <circle cx="100" cy="95" r="4" fill="#00ff88" />
                <path d="M 50,95 A 50 50 0 0 1 150,95" fill="none" stroke="#00ff88" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
                  <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
                </path>
              </g>
            ) : (
              // Pathology block squeeze
              <g stroke="#ea4335" strokeWidth="1">
                <rect x="50" y="85" width="100" height="12" fill="none" strokeDasharray="2 2" />
                <path d="M 100,50 L 100,82" strokeWidth="1.5" strokeDasharray="3 1" />
                <polygon points="100,84 96,78 104,78" fill="#ea4335" />
                <text x="100" y="42" fill="#ea4335" fontSize="6" fontFamily="monospace" textAnchor="middle">DEMAND PRESSURE</text>
              </g>
            )}
          </g>
        );

      case 'sensory':
        // Prism dispersion or high density particles
        return (
          <g>
            {/* Input beam */}
            <line x1="20" y1="60" x2="80" y2="60" stroke="#fff" strokeWidth="1.2" />
            <polygon points="80,52 95,60 80,68" fill="rgba(255,255,255,0.08)" stroke="#fff" strokeWidth="0.8" />
            {isAffirm ? (
              // Dispersion into gorgeous spectrum
              <g strokeWidth="1.5">
                <line x1="90" y1="60" x2="160" y2="25" stroke="#00ff88" />
                <line x1="90" y1="60" x2="175" y2="42" stroke="#00f0ff" />
                <line x1="90" y1="60" x2="175" y2="78" stroke="#ffb300" />
                <line x1="90" y1="60" x2="160" y2="95" stroke="#ff007f" />
                <text x="130" y="18" fill="#00ff88" fontSize="4.5" fontFamily="monospace">HIGH FIDELITY RAW SPECTRA</text>
              </g>
            ) : (
              // Squeezed block filter (pathology cage)
              <g stroke="#ea4335">
                <line x1="95" y1="60" x2="165" y2="60" strokeWidth="2.5" />
                <line x1="125" y1="40" x2="125" y2="80" strokeWidth="1.5" />
                <text x="135" y="32" fill="#ea4335" fontSize="4.5" fontFamily="monospace">FORCED FILTER GAP</text>
              </g>
            )}
          </g>
        );

      case 'attention':
      default:
        // lightning interest vectors or static box
        return (
          <g>
            {isAffirm ? (
              // Dynamic organic interest sparks
              <g stroke="#00ff88" strokeWidth="1" fill="none">
                <path d="M 100,60 L 70,30 L 50,45" />
                <path d="M 100,60 L 130,30 L 150,40" />
                <path d="M 100,60 L 110,95" />
                <circle cx="50" cy="45" r="4.5" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 4px #00ff88)' }} />
                <circle cx="150" cy="40" r="4.5" fill="#00f0ff" style={{ filter: 'drop-shadow(0 0 4px #00f0ff)' }} />
                <circle cx="110" cy="95" r="4.5" fill="#ffb300" style={{ filter: 'drop-shadow(0 0 4px #ffb300)' }} />
              </g>
            ) : (
              // Pathology uniform matrix boxes
              <g stroke="#ea4335" strokeWidth="0.8" fill="none" opacity="0.6">
                <rect x="35" y="35" width="20" height="20" />
                <rect x="90" y="35" width="20" height="20" />
                <rect x="145" y="35" width="20" height="20" />
                <rect x="35" y="70" width="20" height="20" fill="rgba(234, 67, 53, 0.05)" />
                <rect x="90" y="70" width="20" height="20" />
                <rect x="145" y="70" width="20" height="20" />
                <text x="100" y="24" fill="#ea4335" fontSize="4.5" fontFamily="monospace" textAnchor="middle">UNIFORM TASK ROOMS</text>
              </g>
            )}
          </g>
        );
    }
  };

  return (
    <div style={styles.consoleContainer}>
      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>🧠 COGNITIVE MATRIX WAVEFORM</span>
        <span style={styles.telemetryTag}>MATRIX_SIGNAL_ACTIVE</span>
      </div>

      <div style={styles.svgTelemetryBox}>
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', background: '#04060c' }}>
          {/* Grid background lines */}
          <g opacity="0.05" stroke="#00ff88" strokeWidth="0.3">
            <line x1="20" y1="0" x2="20" y2="120" />
            <line x1="40" y1="0" x2="40" y2="120" />
            <line x1="60" y1="0" x2="60" y2="120" />
            <line x1="80" y1="0" x2="80" y2="120" />
            <line x1="100" y1="0" x2="100" y2="120" />
            <line x1="120" y1="0" x2="120" y2="120" />
            <line x1="140" y1="0" x2="140" y2="120" />
            <line x1="160" y1="0" x2="160" y2="120" />
            <line x1="180" y1="0" x2="180" y2="120" />
          </g>

          {/* Render active vector graphic */}
          {renderVisualElements()}

          {/* Alert readout inside SVG */}
          <text x="10" y="112" fill={lens === 'affirming' ? '#00ff88' : '#ea4335'} fontSize="5" fontFamily="monospace">
            {`PROTOCOL: [${activeTrait.toUpperCase()}] // LENS: [${lens.toUpperCase()}]`}
          </text>
        </svg>
      </div>

      {/* Interactive Lens Switcher Button panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
        <button
          onClick={() => setLens('pathology')}
          style={{
            ...styles.selectorBtn,
            ...(lens === 'pathology' ? { borderColor: '#ea4335', color: '#ea4335', background: 'rgba(234, 67, 53, 0.08)', boxShadow: '0 0 8px rgba(234, 67, 53, 0.15)' } : {})
          }}
        >
          📊 Pathology Deficit Lens
        </button>
        <button
          onClick={() => setLens('affirming')}
          style={{
            ...styles.selectorBtn,
            ...(lens === 'affirming' ? styles.selectorBtnActiveCyan : { borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' })
          }}
        >
          🌿 Affirming Paradigm Lens
        </button>
      </div>
    </div>
  );
}


// ==========================================
// 📜 EXHIBIT 3: 7-NODE GLOWING DECADAL TIMELINE CONSOLE
// ==========================================
export function ExhibitHistoryModel({ reduceMotion }) {
  const [activeEra, setActiveEra] = useState('era-1800s');

  const eras = exhibitData.historyEras;
  const era = eras[activeEra];

  const renderEraSvg = () => {
    switch (activeEra) {
      case 'era-1800s':
        return (
          <g>
            {/* Rotating Cog 1 */}
            <g style={{ transformOrigin: '30px 40px', animation: reduceMotion ? 'none' : 'spin-turntable 8s infinite linear' }}>
              <circle cx="30" cy="40" r="10" fill="none" stroke="#ffb300" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="30" cy="40" r="14" fill="none" stroke="#ffb300" strokeWidth="1.2" />
              <path d="M 30,22 L 30,26 M 30,54 L 30,58 M 12,40 L 16,40 M 44,40 L 48,40 M 17,27 L 21,31 M 39,49 L 43,53 M 17,53 L 21,49 M 39,27 L 43,31" stroke="#ffb300" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Rotating Cog 2 (Interlocking and reversed) */}
            <g style={{ transformOrigin: '55px 30px', animation: reduceMotion ? 'none' : 'spin-turntable-reverse 6s infinite linear' }}>
              <circle cx="55" cy="30" r="7" fill="none" stroke="#ffb300" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
              <circle cx="55" cy="30" r="10" fill="none" stroke="#ffb300" strokeWidth="1.2" />
              <path d="M 55,17 L 55,20 M 55,40 L 55,43 M 42,30 L 45,30 M 65,30 L 68,30 M 46,21 L 48,24 M 62,36 L 64,39 M 46,39 L 48,36 M 62,21 L 64,24" stroke="#ffb300" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Standardization Behavior bars */}
            <g opacity="0.75" stroke="#ffb300" strokeWidth="0.8" fill="none">
              <rect x="75" y="15" width="6" height="50" rx="1" />
              <rect x="85" y="15" width="6" height="50" rx="1" />
              
              <rect x="76" y="25" width="4" height="39" fill="#ffb300" opacity="0.6">
                {!reduceMotion && <animate attributeName="height" values="0;39;0" dur="4s" repeatCount="indefinite" />}
                {!reduceMotion && <animate attributeName="y" values="64;25;64" dur="4s" repeatCount="indefinite" />}
              </rect>
              <rect x="86" y="25" width="4" height="39" fill="#ffb300" opacity="0.8">
                {!reduceMotion && <animate attributeName="height" values="0;39;0" dur="3s" repeatCount="indefinite" />}
                {!reduceMotion && <animate attributeName="y" values="64;25;64" dur="3s" repeatCount="indefinite" />}
              </rect>

              <line x1="30" y1="40" x2="55" y2="30" stroke="rgba(255, 179, 0, 0.25)" strokeWidth="0.8" strokeDasharray="2 2" />
            </g>

            <text x="50" y="73" fill="#ffb300" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">STANDARDIZE</text>
          </g>
        );

      case 'era-1910s':
        return (
          <g>
            <circle cx="50" cy="35" r="16" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="50" cy="35" r="12" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.5" />
            <circle cx="50" cy="35" r="4.5" fill="#00f0ff" style={{ animation: reduceMotion ? 'none' : 'shiver-node 0.18s infinite linear', filter: 'drop-shadow(0 0 3px #00f0ff)' }} />
            <circle cx="15" cy="65" r="3" fill="rgba(255,255,255,0.25)" />
            <line x1="50" y1="35" x2="15" y2="65" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="50" y="70" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">ISOLATION</text>
          </g>
        );

      case 'era-1940s':
        return (
          <g>
            <rect x="0" y="0" width="100" height="80" rx="4" style={{ animation: reduceMotion ? 'none' : 'pulse-red-alert 3s infinite' }} />
            <line x1="20" y1="5" x2="20" y2="75" stroke="#333" strokeWidth="1.5" />
            <line x1="35" y1="5" x2="35" y2="75" stroke="#333" strokeWidth="1.5" />
            <line x1="50" y1="5" x2="50" y2="75" stroke="#333" strokeWidth="1.5" />
            <line x1="65" y1="5" x2="65" y2="75" stroke="#333" strokeWidth="1.5" />
            <line x1="80" y1="5" x2="80" y2="75" stroke="#333" strokeWidth="1.5" />
            <line x1="5" y1="25" x2="95" y2="25" stroke="#222" strokeWidth="2.5" />
            <line x1="5" y1="55" x2="95" y2="55" stroke="#222" strokeWidth="2.5" />
            <g style={{ animation: reduceMotion ? 'none' : 'sweep-spotlight 4s infinite ease-in-out', transformOrigin: '50px 0px' }}>
              <polygon points="50,0 20,80 80,80" fill="rgba(234,67,53,0.18)" stroke="rgba(234,67,53,0.08)" strokeWidth="0.5" />
            </g>
            <text x="50" y="73" fill="#ea4335" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CONFINED</text>
          </g>
        );

      case 'era-1960s':
        return (
          <g>
            <g opacity="0.1" stroke="#ff5722" strokeWidth="0.5">
              <line x1="0" y1="20" x2="100" y2="20" />
              <line x1="0" y1="40" x2="100" y2="40" />
              <line x1="0" y1="60" x2="100" y2="60" />
              <line x1="25" y1="0" x2="25" y2="80" />
              <line x1="50" y1="0" x2="50" y2="80" />
              <line x1="75" y1="0" x2="75" y2="80" />
            </g>
            <path d="M 50,5 L 45,30 L 60,35 L 50,70" fill="none" stroke="#ff7522" strokeWidth="1.8" strokeDasharray="30" strokeDashoffset="0" style={{ animation: reduceMotion ? 'none' : 'electrical-discharge 0.6s infinite steps(4)', filter: 'drop-shadow(0 0 3px #ff7522)' }} />
            <circle cx="50" cy="70" r="3" fill="#ffb300" style={{ animation: reduceMotion ? 'none' : 'shiver-node 0.1s infinite' }} />
            <text x="50" y="74" fill="#ff7522" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AVERSIVE_DISCHARGE</text>
          </g>
        );

      case 'era-1980s':
        return (
          <g>
            <g opacity="0.3" stroke="#ffb300" strokeWidth="0.6" strokeDasharray="2 2" fill="none">
              <line x1="15" y1="20" x2="85" y2="20" />
              <line x1="15" y1="35" x2="85" y2="35" />
              <line x1="15" y1="50" x2="85" y2="50" />
            </g>
            
            <g fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5">
              <circle cx="25" cy="20" r="2.5" />
              <circle cx="50" cy="20" r="2.5" />
              <circle cx="75" cy="20" r="2.5" />
              <circle cx="25" cy="35" r="2.5" />
              <circle cx="75" cy="35" r="2.5" />
              <circle cx="25" cy="50" r="2.5" />
              <circle cx="50" cy="50" r="2.5" />
              <circle cx="75" cy="50" r="2.5" />
            </g>

            <rect x="40" y="30" width="20" height="15" rx="2" fill="rgba(255, 179, 0, 0.04)" stroke="#ffb300" strokeWidth="1" strokeDasharray="1.5 1.5" />
            
            <g>
              <circle cx="50" cy="37.5" r="3" fill="#ffb300" style={{ filter: 'drop-shadow(0 0 3px #ffb300)' }} />
              <path d="M 47.5,37.5 L 52.5,37.5 M 50,35 L 50,40" stroke="#04060c" strokeWidth="0.8" />
            </g>

            <text x="50" y="68" fill="#ffb300" fontSize="4.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SEGREGATED_TRACKS</text>
          </g>
        );

      case 'era-2000s':
        return (
          <g>
            <circle cx="50" cy="40" r="3.5" fill="#00ff88" style={{ filter: 'drop-shadow(0 0 3px #00ff88)' }} />
            <circle cx="20" cy="20" r="2.5" fill="#00f0ff" />
            <circle cx="80" cy="20" r="2.5" fill="#00f0ff" />
            <circle cx="30" cy="60" r="2.5" fill="#00f0ff" />
            <circle cx="70" cy="60" r="2.5" fill="#00f0ff" />
            <line x1="50" y1="40" x2="20" y2="20" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" />
            <line x1="50" y1="40" x2="80" y2="20" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" />
            <line x1="50" y1="40" x2="30" y2="60" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" />
            <line x1="50" y1="40" x2="70" y2="60" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.8" />
            <circle cx="50" cy="40" r="10" fill="none" stroke="#00ff88" strokeWidth="0.8" style={{ animation: reduceMotion ? 'none' : 'pulse-signal-ring 1.8s infinite' }} />
            <circle cx="50" cy="40" r="20" fill="none" stroke="#00f0ff" strokeWidth="0.8" style={{ animation: reduceMotion ? 'none' : 'pulse-signal-ring 1.8s infinite 0.9s' }} />
            <text x="50" y="73" fill="#00ff88" fontSize="4.5" fontFamily="monospace" textAnchor="middle">ADVOCACY_NET</text>
          </g>
        );

      case 'era-present':
      default:
        return (
          <g>
            <path d="M 5,30 Q 20,10 35,30 T 65,30 T 95,30" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="40" strokeDashoffset="0" style={{ animation: reduceMotion ? 'none' : 'phase-wave-emerald 1.5s infinite linear' }} />
            <path d="M 5,50 Q 20,70 35,50 T 65,50 T 95,50" fill="none" stroke="#ff007f" strokeWidth="1.5" strokeDasharray="40" strokeDashoffset="0" style={{ animation: reduceMotion ? 'none' : 'phase-wave-emerald 1.5s infinite linear reverse' }} />
            <line x1="35" y1="30" x2="35" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="65" y1="30" x2="65" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="35" cy="40" r="1.5" fill="#fff" />
            <circle cx="65" cy="40" r="1.5" fill="#fff" />
            <text x="50" y="73" fill="#00ff88" fontSize="4.5" fontFamily="monospace" textAnchor="middle">MUTUAL_SYNC</text>
          </g>
        );
    }
  };

  return (
    <div style={styles.consoleContainer}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-turntable {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-turntable-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes shiver-node {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-1px, 1px); }
          50% { transform: translate(0, -1px); }
          75% { transform: translate(1px, 0); }
          100% { transform: translate(0, 0); }
        }
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
      `}} />

      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>📜 HISTORICAL TELEMETRY MATRIX</span>
        <span style={styles.telemetryTag}>HIST_DATABASE_UPLINK</span>
      </div>

      <p style={{ ...styles.exhibitDesc, marginBottom: '16px' }}>
        Interactive Timeline Rail. Click the timeline nodes in the glowing SVG pipeline below to analyze the historic roots of the pathology deficit model:
      </p>

      <div style={styles.historySplitLayout}>
        {/* Left Control Column: Timeline & Descriptive Plaque */}
        <div style={styles.historyControlColumn}>
          {/* Horizontal glowing SVG timeline railway */}
          <div style={{ background: '#04060c', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px 4px', marginBottom: '14px', position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 200 35" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Main pipeline rail */}
              <line x1="10" y1="18" x2="190" y2="18" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <line x1="10" y1="18" x2={era.x} y2="18" stroke="#ffb300" strokeWidth="2" style={{ transition: 'x2 0.3s ease' }} />

              {/* Interactive Era Nodes */}
              {Object.keys(eras).map(key => {
                const node = eras[key];
                const isActive = activeEra === key;
                return (
                  <g key={key} style={{ cursor: 'pointer' }} onClick={() => setActiveEra(key)}>
                    <circle 
                      cx={node.x} 
                      cy="18" 
                      r={isActive ? "5.5" : "3.5"} 
                      fill={isActive ? '#ffb300' : 'rgba(255,255,255,0.2)'} 
                      stroke={isActive ? '#04060c' : 'rgba(255,255,255,0.05)'} 
                      strokeWidth="1.5"
                      style={{ transition: 'all 0.25s ease' }}
                    />
                    <circle 
                      cx={node.x} 
                      cy="18" 
                      r="8" 
                      fill="none" 
                      stroke={isActive ? '#ffb300' : 'transparent'} 
                      strokeWidth="0.5" 
                      strokeDasharray="2 1"
                    />
                    <text 
                      x={node.x} 
                      y="9" 
                      fill={isActive ? '#ffb300' : 'rgba(255,255,255,0.35)'} 
                      fontSize="4.2" 
                      fontFamily="monospace" 
                      textAnchor="middle" 
                      fontWeight={isActive ? 'bold' : 'normal'}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Readout console screen */}
          <div style={{ background: '#04060c', borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px', minHeight: '150px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
            <div style={{ borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
              <span style={{ fontSize: '0.5rem', fontFamily: 'monospace', color: '#ffb300', fontWeight: 'bold' }}>📡 {era.meta}</span>
              <h4 style={{ margin: '2px 0 0 0', fontSize: '0.74rem', color: '#fff', fontFamily: 'var(--font-tech)' }}>{era.title}</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.68rem', color: '#8a9bb5', lineHeight: 1.4, textAlign: 'justify', fontFamily: 'monospace' }}>
              {era.desc}
            </p>
            <div style={{ background: 'rgba(255,179,0,0.02)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,179,0,0.12)', borderRadius: '6px', padding: '8px', marginTop: '4px' }}>
              <strong style={{ fontSize: '0.6rem', color: '#ffb300', display: 'block', marginBottom: '2px', fontFamily: 'monospace' }}>💡 SYSTEMIC HISTORIC OUTCOME:</strong>
              <p style={{ margin: 0, fontSize: '0.66rem', color: '#fff', lineHeight: 1.35, fontFamily: 'monospace' }}>
                {era.takeaway}
              </p>
            </div>
          </div>
        </div>

        {/* Right Visual Column: Dynamic Animated SVG Vector Plaque */}
        <div style={styles.historyVisualColumn}>
          <div style={{ ...styles.svgTelemetryBox, height: '240px' }}>
            <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%', background: '#04060c' }}>
              {/* Background technical scanning grids */}
              <g opacity="0.04" stroke="#ffb300" strokeWidth="0.3">
                <line x1="10" y1="0" x2="10" y2="80" />
                <line x1="20" y1="0" x2="20" y2="80" />
                <line x1="30" y1="0" x2="30" y2="80" />
                <line x1="40" y1="0" x2="40" y2="80" />
                <line x1="50" y1="0" x2="50" y2="80" />
                <line x1="60" y1="0" x2="60" y2="80" />
                <line x1="70" y1="0" x2="70" y2="80" />
                <line x1="80" y1="0" x2="80" y2="80" />
                <line x1="90" y1="0" x2="90" y2="80" />
              </g>

              {/* Dynamic era-specific vector */}
              {renderEraSvg()}

              {/* Inscribed Era tag inside visual frame */}
              <text x="5" y="75" fill="rgba(255, 179, 0, 0.35)" fontSize="3.8" fontFamily="monospace">
                {`TELEMETRY: [${activeEra.toUpperCase()}] // NOMINAL`}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 🚀 EXHIBIT 6: FUTURE MARTIAN BIOSPHERE CANOPY STABILIZER
// ==========================================
export function ExhibitMartianBiosphere({ reduceMotion }) {
  const [sensoryDamping, setSensoryDamping] = useState(50);
  const [taskAutonomy, setTaskAutonomy] = useState(50);
  const [directComms, setDirectComms] = useState(50);

  // Compute overall stabilizer index (average of three dials)
  const stabilizerIndex = Math.round((sensoryDamping + taskAutonomy + directComms) / 3);
  const isStable = stabilizerIndex >= 70;
  const isDanger = stabilizerIndex < 40;

  const getSystemStatus = () => {
    if (isStable) return { label: 'EMERALD BIOSPHERE SECURE', color: '#00ff88' };
    if (isDanger) return { label: 'SENSORY HAZARD // CRITICAL CRASH', color: '#ea4335' };
    return { label: 'TUNING STABILITY INDEX PROTOCOL', color: '#ffb300' };
  };

  const status = getSystemStatus();

  return (
    <div style={styles.consoleContainer}>
      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>🛰️ CANOPY CONTROLLER: FUTURISTIC BIOSPHERE</span>
        <span style={styles.telemetryTag}>ARES_STABILIZER_V9</span>
      </div>

      <p style={{ ...styles.exhibitDesc, marginBottom: '10px' }}>
        {exhibitData.martianBiosphere.desc}
      </p>

      {/* Stable canopy biome SVG */}
      <div style={styles.svgTelemetryBox}>
        <svg viewBox="0 0 200 110" style={{ width: '100%', height: '100%', background: '#04060c' }}>
          <defs>
            <radialGradient id="biodomeGlow" cx="50%" cy="100%" r="90%">
              <stop offset="0%" stopColor={status.color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={status.color} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dome Biome Fill */}
          <path d="M 15,100 A 85 85 0 0 1 185,100 Z" fill="url(#biodomeGlow)" />

          {/* Cybernetic dome canopy grid */}
          <path 
            d="M 15,100 A 85 85 0 0 1 185,100" 
            fill="none" 
            stroke={status.color} 
            strokeWidth={isStable ? '2' : (isDanger ? '0.8' : '1.2')} 
            style={{ transition: 'all 0.3s ease' }}
          />

          {/* Hexagonal canopy grid details */}
          <path 
            d="M 40,65 Q 100,20 160,65 M 65,40 Q 100,5 135,40 M 15,100 L 65,40 M 185,100 L 135,40 M 100,100 L 100,10" 
            fill="none" 
            stroke={status.color} 
            strokeWidth="0.5" 
            opacity={isStable ? '0.6' : '0.2'} 
            style={{ transition: 'all 0.3s ease' }}
          />

          {/* Central organic tree / neural network nodes */}
          <circle cx="100" cy="100" r="3" fill="#fff" />
          <path d="M 100,100 L 100,70 L 75,55 L 60,60 M 100,80 L 125,60 L 140,55" fill="none" stroke={status.color} strokeWidth="1.2" />
          <circle cx="60" cy="60" r={taskAutonomy / 15} fill="#00ff88" opacity="0.8" />
          <circle cx="140" cy="55" r={directComms / 15} fill="#00f0ff" opacity="0.8" />
          <circle cx="100" cy="50" r={sensoryDamping / 15} fill="#ffb300" opacity="0.8" />

          {/* Laser connection lines */}
          {directComms > 40 && (
            <line x1="60" y1="60" x2="140" y2="55" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
          )}

          {/* Glare protective layer */}
          <rect x="0" y="0" width="200" height="110" fill="none" stroke="#fff" strokeWidth="1.5" opacity={sensoryDamping / 300} style={{ pointerEvents: 'none' }} />

          {/* System stabilization readout */}
          <text x="100" y="25" fill="#fff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            {`STABILITY COEFFICIENT: ${stabilizerIndex}%`}
          </text>
          <text x="100" y="34" fill={status.color} fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            {status.label}
          </text>
        </svg>
      </div>

      {/* Control terminals dashboard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
        
        {/* Sensory control */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '6px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: '#ffb300', fontFamily: 'monospace' }}>{exhibitData.martianBiosphere.parameters.sensory.title}</span>
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>{exhibitData.martianBiosphere.parameters.sensory.desc}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setSensoryDamping(p => Math.max(10, p - 10))} style={styles.selectorBtn}>[ - ]</button>
            <span style={{ fontSize: '0.64rem', color: '#fff', width: '25px', textAlign: 'center', fontFamily: 'monospace' }}>{sensoryDamping}%</span>
            <button onClick={() => setSensoryDamping(p => Math.min(100, p + 10))} style={styles.selectorBtn}>[ + ]</button>
          </div>
        </div>

        {/* Task Autonomy control */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '6px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: '#00ff88', fontFamily: 'monospace' }}>{exhibitData.martianBiosphere.parameters.autonomy.title}</span>
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>{exhibitData.martianBiosphere.parameters.autonomy.desc}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setTaskAutonomy(p => Math.max(10, p - 10))} style={styles.selectorBtn}>[ - ]</button>
            <span style={{ fontSize: '0.64rem', color: '#fff', width: '25px', textAlign: 'center', fontFamily: 'monospace' }}>{taskAutonomy}%</span>
            <button onClick={() => setTaskAutonomy(p => Math.min(100, p + 10))} style={styles.selectorBtn}>[ + ]</button>
          </div>
        </div>

        {/* Direct Comms control */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '6px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: '#00f0ff', fontFamily: 'monospace' }}>{exhibitData.martianBiosphere.parameters.comms.title}</span>
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>{exhibitData.martianBiosphere.parameters.comms.desc}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setDirectComms(p => Math.max(10, p - 10))} style={styles.selectorBtn}>[ - ]</button>
            <span style={{ fontSize: '0.64rem', color: '#fff', width: '25px', textAlign: 'center', fontFamily: 'monospace' }}>{directComms}%</span>
            <button onClick={() => setDirectComms(p => Math.min(100, p + 10))} style={styles.selectorBtn}>[ + ]</button>
          </div>
        </div>

      </div>
    </div>
  );
}


// ==========================================
// 📖 EXHIBIT 7: BECKER NARRATIVE MEMOIR CONSTELLATION MAP
// ==========================================
export function ExhibitMemoirCrystalMap({ activePhase, setActivePhase, reduceMotion }) {
  const crystalCoordinates = exhibitData.memoirCrystalMap.coordinates;

  return (
    <div style={styles.consoleContainer}>
      <div style={styles.consoleHeader}>
        <span style={styles.consoleTitle}>🌌 MEMOIR DOME CONSTELLATION</span>
        <span style={styles.telemetryTag}>CHRONO_MAP_NOMINAL</span>
      </div>

      <p style={{ ...styles.exhibitDesc, marginBottom: '10px' }}>
        {exhibitData.memoirCrystalMap.desc}
      </p>

      <div style={styles.svgTelemetryBox}>
        <svg viewBox="0 0 200 110" style={{ width: '100%', height: '100%', background: '#04060c', overflow: 'visible' }}>
          {/* Constellation link wires */}
          {crystalCoordinates.slice(0, -1).map((crystal, idx) => {
            const nextCrystal = crystalCoordinates[idx + 1];
            return (
              <line
                key={idx}
                x1={crystal.x}
                y1={crystal.y}
                x2={nextCrystal.x}
                y2={nextCrystal.y}
                stroke={activePhase >= idx + 1 ? '#00ff88' : 'rgba(255,255,255,0.05)'}
                strokeWidth={activePhase >= idx + 1 ? '1.5' : '0.5'}
                style={{ transition: 'all 0.3s' }}
              />
            );
          })}

          {/* Interactive Memory Crystals */}
          {crystalCoordinates.map(crystal => {
            const isActive = activePhase === crystal.id;
            const isVisited = activePhase >= crystal.id;
            return (
              <g key={crystal.id} style={{ cursor: 'pointer' }} onClick={() => setActivePhase(crystal.id)}>
                {/* Glowing ring */}
                <circle 
                  cx={crystal.x} 
                  cy={crystal.y} 
                  r={isActive ? "10" : "6"} 
                  fill="none" 
                  stroke={isActive ? '#00ff88' : 'transparent'} 
                  strokeWidth="0.8" 
                  strokeDasharray="2 1"
                />
                
                {/* Core diamond shape */}
                <polygon 
                  points={`${crystal.x},${crystal.y - (isActive ? 5.5 : 4)} ${crystal.x + (isActive ? 5.5 : 4)},${crystal.y} ${crystal.x},${crystal.y + (isActive ? 5.5 : 4)} ${crystal.x - (isActive ? 5.5 : 4)},${crystal.y}`}
                  fill={isActive ? '#00ff88' : (isVisited ? '#00f0ff' : 'rgba(255,255,255,0.12)')} 
                  style={{ transition: 'all 0.25s' }}
                />

                <text 
                  x={crystal.x} 
                  y={crystal.y - 12} 
                  fill={isActive ? '#00ff88' : 'rgba(255,255,255,0.4)'} 
                  fontSize="4.5" 
                  fontFamily="monospace" 
                  textAnchor="middle" 
                  fontWeight={isActive ? 'bold' : 'normal'}
                >
                  {crystal.label}
                </text>
              </g>
            );
          })}

          {/* Readout label inside starmap */}
          <rect x="35" y="93" width="130" height="12" rx="3" fill="rgba(0, 240, 255, 0.03)" stroke="rgba(0,240,255,0.12)" strokeWidth="0.5" />
          <text x="100" y="101" fill="#00f0ff" fontSize="4.5" fontFamily="monospace" textAnchor="middle">
            {`COORDS ACTIVE: [${crystalCoordinates[activePhase].short.toUpperCase()}]`}
          </text>
        </svg>
      </div>
    </div>
  );
}


// ==========================================
// 🎨 REUSABLE TACTICAL CSS CONSOLE STYLES
// ==========================================
const styles = {
  consoleContainer: {
    background: 'rgba(6, 9, 20, 0.85)',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 10px 35px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.05)',
    fontFamily: 'var(--font-sans)',
    boxSizing: 'border-box',
    width: '100%',
    transition: 'all 0.3s ease',
    textAlign: 'left'
  },
  consoleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1.5px dashed rgba(255, 255, 255, 0.1)',
    paddingBottom: '10px',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '6px'
  },
  consoleTitle: {
    fontFamily: 'var(--font-tech)',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#00ff88',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  telemetryTag: {
    fontFamily: 'monospace',
    fontSize: '0.62rem',
    color: 'rgba(0, 255, 136, 0.5)',
    letterSpacing: '1.5px'
  },
  splitLayout: {
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
    flexWrap: 'wrap'
  },
  historySplitLayout: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    flexWrap: 'nowrap',
    width: '100%'
  },
  historyControlColumn: {
    flex: '1.2',
    minWidth: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  historyVisualColumn: {
    flex: '1',
    minWidth: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  visualColumn: {
    flex: '1.1',
    minWidth: '240px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  svgTelemetryBox: {
    background: '#04060c',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)'
  },
  telemetryReadoutBox: {
    background: 'rgba(255, 255, 255, 0.02)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '8px',
    padding: '10px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  telemetryTagLine: {
    fontFamily: 'monospace',
    fontSize: '0.52rem',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: '1px'
  },
  telemetryItem: {
    fontSize: '0.68rem',
    fontFamily: 'monospace',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 1.4
  },
  controlColumn: {
    flex: '1.3',
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  exhibitDesc: {
    fontSize: '0.76rem',
    color: '#8a9bb5',
    lineHeight: 1.5,
    margin: 0
  },
  consoleSectionLabel: {
    fontFamily: 'var(--font-tech)',
    fontSize: '0.62rem',
    color: '#00ff88',
    letterSpacing: '1.5px',
    marginTop: '6px',
    display: 'block'
  },
  gridToggles: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  toggleBtn: {
    background: 'rgba(255, 255, 255, 0.02)',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  toggleBtnActive: {
    background: 'rgba(0, 255, 136, 0.08)',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: '#00ff88',
    boxShadow: '0 0 10px rgba(0, 255, 136, 0.15)'
  },
  toggleBtnDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
    background: 'rgba(0,0,0,0.4)',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.03)'
  },
  toggleBtnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  toggleBtnLabel: {
    fontSize: '0.72rem',
    color: '#fff',
    fontWeight: 'bold'
  },
  toggleBtnCost: {
    fontSize: '0.58rem',
    fontFamily: 'monospace',
    color: '#ffb300'
  },
  toggleBtnDesc: {
    fontSize: '0.64rem',
    color: 'rgba(255,255,255,0.5)'
  },
  btnRow: {
    marginTop: '8px'
  },
  resetBtn: {
    background: 'rgba(255,255,255,0.03)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    letterSpacing: '1px',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  dangerResetBtn: {
    background: 'rgba(234, 67, 53, 0.15)',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: '#ea4335',
    color: '#ea4335',
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxShadow: '0 0 15px rgba(234,67,53,0.3)'
  },

  // Exhibit 2 specific styles
  btnSelectorGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px'
  },
  selectorBtn: {
    background: 'rgba(4, 6, 12, 0.5)',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.6)',
    padding: '8px 4px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '0.62rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  selectorBtnActiveCyan: {
    background: 'rgba(0, 240, 255, 0.12)',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: '#00f0ff',
    boxShadow: '0 0 10px rgba(0, 240, 255, 0.15)',
    textShadow: '0 0 5px rgba(0,240,255,0.4)'
  },
  radarPulseBtn: {
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    padding: '10px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  dangerPulseBtn: {
    background: 'rgba(234, 67, 53, 0.12)',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: '#ea4335',
    color: '#ea4335',
    boxShadow: '0 0 12px rgba(234,67,53,0.2)'
  },
  infoPulseBtn: {
    background: 'rgba(0, 240, 255, 0.08)',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: '#00f0ff',
    color: '#00f0ff'
  },
  hazardAlertPanel: {
    background: 'rgba(234, 67, 53, 0.08)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ea4335',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#ea4335',
    fontSize: '0.68rem',
    lineHeight: 1.4
  },
  shakeAnimation: {
    animation: 'shake-frame 0.5s ease-in-out'
  },

  // Exhibit 3 specific styles
  dialogueBox: {
    background: 'rgba(4, 6, 12, 0.75)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '10px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  commTranscriptLabel: {
    fontFamily: 'monospace',
    fontSize: '0.55rem',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '1px'
  },
  dialogueTeaser: {
    fontSize: '0.7rem',
    color: '#8a9bb5',
    lineHeight: 1.45,
    margin: 0
  },
  choiceBtnStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '4px'
  },
  deficitChoiceBtn: {
    background: 'rgba(234, 67, 53, 0.03)',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'rgba(234, 67, 53, 0.3)',
    color: '#ea4335',
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '0.65rem',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  affirmingChoiceBtn: {
    background: 'rgba(0, 255, 136, 0.03)',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 255, 136, 0.3)',
    color: '#00ff88',
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '0.65rem',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  chatBubbleNt: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderLeft: '3px solid #ff007f',
    padding: '8px 10px',
    borderRadius: '0 8px 8px 0',
    fontSize: '0.68rem',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.4
  },
  chatBubbleNd: {
    background: 'rgba(0, 255, 136, 0.03)',
    borderLeft: '3px solid #00ff88',
    padding: '8px 10px',
    borderRadius: '0 8px 8px 0',
    fontSize: '0.68rem',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.4
  },
  consoleBtnNext: {
    background: 'rgba(255,255,255,0.04)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: '0.62rem',
    padding: '6px 12px',
    borderRadius: '4px',
    alignSelf: 'flex-end',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  successAlertPanel: {
    background: 'rgba(0, 255, 136, 0.08)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#00ff88',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#00ff88',
    fontSize: '0.68rem',
    lineHeight: 1.4
  },
  dialogueResetBtn: {
    background: 'transparent',
    borderWidth: '0px',
    borderStyle: 'none',
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'monospace',
    fontSize: '0.6rem',
    cursor: 'pointer',
    alignSelf: 'center',
    outline: 'none'
  },
  sliderDashboardPanel: {
    background: 'rgba(4, 6, 12, 0.65)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '8px',
    padding: '10px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  sliderTelemetryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.6rem',
    fontFamily: 'monospace',
    color: 'rgba(255,255,255,0.6)'
  },
  sliderLabel: {
    fontWeight: 'bold'
  },
  sliderValReadout: {
    color: '#00f0ff',
    fontWeight: 'bold'
  },
  explicitnessRangeSlider: {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    outline: 'none',
    height: '4px',
    borderRadius: '2px',
    cursor: 'pointer',
    accentColor: '#00f0ff'
  },

  // Exhibit 4 specific styles
  sliderSplitWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '240px',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
    background: '#04060c'
  },
  splitSectionPane: {
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    transition: 'width 0.2s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.2s ease',
    padding: '14px'
  },
  splitSectionPaneLeft: {
    borderRight: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(135deg, rgba(234, 67, 53, 0.02) 0%, transparent 100%)'
  },
  splitSectionPaneRight: {
    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.02) 0%, transparent 100%)'
  },
  splitEnvironmentSvg: {
    height: '60px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  environDescriptionBox: {
    marginTop: '6px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  deficitSectionHeader: {
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    fontWeight: 'bold',
    color: '#ea4335',
    display: 'block'
  },
  affirmingSectionHeader: {
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    fontWeight: 'bold',
    color: '#00ff88',
    display: 'block'
  },
  environListUl: {
    paddingLeft: '14px',
    fontSize: '0.64rem',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.4,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  centralSliderControllerPanel: {
    marginTop: '12px',
    background: 'rgba(6, 9, 20, 0.5)',
    borderRadius: '8px',
    padding: '10px 14px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.05)'
  },
  sliderReadoutRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'monospace',
    fontSize: '0.68rem',
    marginBottom: '6px'
  },
  environmentalRangeSlider: {
    width: '100%',
    outline: 'none',
    height: '6px',
    borderRadius: '3px',
    cursor: 'pointer',
    accentColor: '#00ff88'
  },

  // Breathing box styles
  breathingCanvasBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '160px',
    width: '100%'
  },
  breathReadoutPanel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  breathPhaseName: {
    fontFamily: 'var(--font-tech)',
    fontSize: '0.72rem',
    color: '#00ff88',
    letterSpacing: '1px',
    fontWeight: 'bold'
  },
  breathTimerSec: {
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    color: 'rgba(255,255,255,0.5)',
    marginTop: '2px'
  },
  breathingInstructionsRow: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'center',
    marginTop: '10px'
  },
  breathStepChip: {
    fontSize: '0.58rem',
    fontFamily: 'monospace',
    background: 'rgba(255,255,255,0.03)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.06)',
    padding: '4px 6px',
    borderRadius: '4px',
    color: 'rgba(255,255,255,0.45)',
    transition: 'all 0.3s ease'
  },
  breathStepActive: {
    background: 'rgba(0, 255, 136, 0.12)',
    borderColor: '#00ff88',
    color: '#00ff88',
    fontWeight: 'bold',
    boxShadow: '0 0 8px rgba(0, 255, 136, 0.15)'
  },
  historyEraBtn: {
    padding: '8px 4px',
    fontFamily: 'monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.5px',
    background: 'rgba(4,6,12,0.6)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.6)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    textAlign: 'center',
    outline: 'none'
  },
  historyEraBtnActive: {
    borderColor: '#ffb300',
    background: 'rgba(255, 179, 0, 0.08)',
    color: '#ffb300',
    boxShadow: '0 0 8px rgba(255, 179, 0, 0.15)',
    fontWeight: 'bold'
  }
};
