'use client';

import { useState, useEffect, useRef } from 'react';

// ==========================================
// 🛠️ EXHIBIT 1: MASKING CPU & BATTERY DIAGNOSTICS
// ==========================================
export function MaskingDiagnostics() {
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
                  opacity={Math.random() > 0.4 ? 0.9 : 0.2}
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
            {[
              { key: 'eyeContact', label: '👁️ Manual Eye Contact', cost: '+25% CPU // 2.0x Drain', desc: 'Choreograph eye gaze patterns manually' },
              { key: 'suppressStims', label: '🤚 Suppress Natural Stims', cost: '+20% CPU // 1.5x Drain', desc: 'Squeeze hands, lock muscles to look still' },
              { key: 'scripting', label: '💬 Script Conversation', cost: '+30% CPU // 2.5x Drain', desc: 'Pre-calculate sentences, verify jokes' },
              { key: 'noiseFilter', label: '🎧 Manual Audio Filter', cost: '+20% CPU // 1.5x Drain', desc: 'Manually parse vocals from server buzz' }
            ].map(toggle => (
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
export function MonotropicSpotlight() {
  const [isMonotropic, setIsMonotropic] = useState(true);
  const [highlightedNode, setHighlightedNode] = useState('hyperfocus');
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const [shakeActive, setShakeActive] = useState(false);

  const nodes = {
    hyperfocus: { x: 100, y: 35, label: '🎯 HYPERFOCUS FLIGHT TRACT', desc: 'Elite flow state, deep analysis' },
    clock: { x: 35, y: 70, label: '⏰ TICKING WALL CHRONOMETER', desc: 'Loud repetitive ticking, ambient clock' },
    fluorescent: { x: 65, y: 90, label: '💡 FLUORESCENT LIGHT HUM', desc: 'High frequency background electronic buzz' },
    socialChatter: { x: 135, y: 90, label: '💬 BACKGROUND CONVERSATIONS', desc: 'Ambient corridor murmurs, micro-signals' },
    teacherVo: { x: 165, y: 70, label: '📢 CRITICAL VERBAL DIRECTION', desc: 'Incoming educator instruction signal' },
  };

  const handleTriggerInterrupt = () => {
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
      ...(shakeActive ? styles.shakeAnimation : {})
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
export function DoubleEmpathySync() {
  const [dialoguePath, setDialoguePath] = useState(null); // 'deficit' or 'affirming'
  const [dialogueStep, setDialogueStep] = useState(0);
  const [explicitness, setExplicitness] = useState(2);
  const [waveOffset, setWaveOffset] = useState(0);

  // Animate the wave moving
  useEffect(() => {
    const handle = requestAnimationFrame(function animate() {
      setWaveOffset(prev => (prev + 1.2) % 360);
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

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
            <strong>Context:</strong> Becker\'s daily social battery core has depleted to 5% after hours of collaborative mapping. Becker retreats to a recharge corridor without warning. How does the station staff respond?
          </p>
          <div style={styles.choiceBtnStack}>
            <button onClick={() => { setDialoguePath('deficit'); setDialogueStep(1); }} style={styles.deficitChoiceBtn}>
              ❌ SECTOR RESPONSE A: Pathologize & Demean (Deficit Model)
            </button>
            <button onClick={() => { setDialoguePath('affirming'); setDialogueStep(1); }} style={styles.affirmingChoiceBtn}>
              ✨ SECTOR RESPONSE B: Mutual Adaptation (Double Empathy Model)
            </button>
          </div>
        </div>
      );
    }

    if (dialoguePath === 'deficit') {
      return (
        <div style={styles.dialogueBox}>
          <div style={styles.commTranscriptLabel}>[ UPLINK TRANSCRIPT // DEFICIT CLINICAL LOG ]</div>
          
          {dialogueStep === 1 && (
            <>
              <div style={styles.chatBubbleNt}>
                <strong>PEER_ALLISTIC:</strong> &quot;Becker is displaying social communication deficits. He is ignoring my task coordination and retreating. This antisocial behavior is unacceptable.&quot;
              </div>
              <div style={styles.chatBubbleNd}>
                <strong>CITIZEN_BECKER (Quiet, Stressed):</strong> *Forces himself to re-enter, masking pain, stuttering scripts* &quot;O-okay, I will sit here...&quot; (Battery drains to 0%, enters burnout).
              </div>
              <button onClick={() => setDialogueStep(2)} style={styles.consoleBtnNext}>[ EXAMINE DIAGNOSTIC OUTCOME ➔ ]</button>
            </>
          )}

          {dialogueStep === 2 && (
            <>
              <div style={styles.hazardAlertPanel}>
                <strong>🚨 CRITICAL FAILURE: DOUBLE-BLIND EMPATHY COLLAPSE 🚨</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.68rem' }}>
                  By assuming the breakdown was a personal &quot;autistic social deficit&quot; rather than a mutual wiring gap, the peer overran Becker\'s boundaries, causing severe system overload and complete communication burnout.
                </p>
              </div>
              <button onClick={resetDialogue} style={styles.dialogueResetBtn}>[ REBOOT COMMS LOG ]</button>
            </>
          )}
        </div>
      );
    }

    if (dialoguePath === 'affirming') {
      return (
        <div style={styles.dialogueBox}>
          <div style={styles.commTranscriptLabel}>[ UPLINK TRANSCRIPT // DOUBLE EMPATHY BRIDGE ]</div>
          
          {dialogueStep === 1 && (
            <>
              <div style={styles.chatBubbleNd}>
                <strong>CITIZEN_BECKER (Explicit Communication):</strong> &quot;Uplink staff, my social reactor core is at 5%. I cannot process conversations further. Entering charging cycle for 2 Sol cycles. I value our task.&quot;
              </div>
              <div style={styles.chatBubbleNt}>
                <strong>PEER_ALLISTIC (Accommodating):</strong> &quot;Transmission received, Becker. Copy that. Rest your reactor, I will lock in the coordinates and we will sync up tomorrow.&quot;
              </div>
              <button onClick={() => setDialogueStep(2)} style={styles.consoleBtnNext}>[ EXAMINE DIAGNOSTIC OUTCOME ➔ ]</button>
            </>
          )}

          {dialogueStep === 2 && (
            <>
              <div style={styles.successAlertPanel}>
                <strong>✨ SUCCESSFUL NOMINAL SYNC: EXPLICIT UPLINK SECURED ✨</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.68rem' }}>
                  Mutual empathy achieved. Becker verbalized boundaries explicitly, and the peer adjusted environmental expectations. No masking was forced, protecting the reactor and securing task success.
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
export function EnvironmentalTransition() {
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
            <span style={styles.deficitSectionHeader}>❌ DEFICIT / CLINICAL PATHOLOGY CAGE</span>
            <ul style={styles.environListUl}>
              <li><strong>Philosophy:</strong> Neuro-variations are biological errors that must be fixed or &quot;cured.&quot;</li>
              <li><strong>Barriers:</strong> Intrinsic deficit in the individual; social difficulties blamed on autism.</li>
              <li><strong>Goals:</strong> Normalization compliance; suppression of stims/avoiding eye contact; forced masking.</li>
              <li><strong>Ephraim\'s Thread:</strong> Compliance training (ABA), Yeshiva exclusion, and isolating special needs models.</li>
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
            <span style={styles.affirmingSectionHeader}>✨ NEURODIVERSITY AFFIRMING DOME</span>
            <ul style={styles.environListUl}>
              <li><strong>Philosophy:</strong> Neurological differences are natural assets, analogous to biodiversity.</li>
              <li><strong>Barriers:</strong> Created by rigid environments built exclusively for one neurotype style.</li>
              <li><strong>Goals:</strong> Sensory accommodations, self-determination, explicit comm bridges.</li>
              <li><strong>Ephraim\'s Thread:</strong> Deep unmasking, structural rest, self-acceptance, and mutual adaptations.</li>
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
  const [phase, setPhase] = useState('Inhale'); // Inhale (4s), Hold (4s), Exhale (4s), Hold (4s)
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTicks(prev => {
        const nextTick = (prev + 1) % 16;
        if (nextTick === 0) setPhase('Inhale');
        else if (nextTick === 4) setPhase('Hold (Retain)');
        else if (nextTick === 8) setPhase('Exhale');
        else if (nextTick === 12) setPhase('Hold (Empty)');
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
        Practice box breathing to calm sensory overstimulation and reset your metabolic energy battery. Follow the glowing emerald telemetry node below:
      </p>

      <div style={styles.breathingCanvasBox}>
        <svg viewBox="0 0 100 100" style={{ width: '150px', height: '150px' }}>
          <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(0, 255, 136, 0.05)" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(0, 255, 136, 0.1)" strokeWidth="0.8" strokeDasharray="2 2" />
          
          {/* Pulsing breathing ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="16" 
            fill="rgba(0, 255, 136, 0.05)" 
            stroke="#00ff88" 
            strokeWidth="2.5" 
            style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: '50px 50px', 
              transition: 'transform 1s linear, stroke-width 0.3s ease',
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
        <div style={{ ...styles.breathStepChip, ...(ticks < 4 ? styles.breathStepActive : {}) }}>1. INHALE</div>
        <div style={{ ...styles.breathStepChip, ...(ticks >= 4 && ticks < 8 ? styles.breathStepActive : {}) }}>2. HOLD</div>
        <div style={{ ...styles.breathStepChip, ...(ticks >= 8 && ticks < 12 ? styles.breathStepActive : {}) }}>3. EXHALE</div>
        <div style={{ ...styles.breathStepChip, ...(ticks >= 12 ? styles.breathStepActive : {}) }}>4. HOLD</div>
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
    border: '1.5px solid rgba(255, 255, 255, 0.08)',
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
  visualColumn: {
    flex: '1.1',
    minWidth: '240px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  svgTelemetryBox: {
    background: '#04060c',
    border: '1.5px solid rgba(255, 255, 255, 0.05)',
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
    border: '1px solid rgba(255, 255, 255, 0.06)',
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
    border: '1px dashed rgba(255, 255, 255, 0.1)',
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
    border: '1.5px solid #00ff88',
    boxShadow: '0 0 10px rgba(0, 255, 136, 0.15)'
  },
  toggleBtnDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
    background: 'rgba(0,0,0,0.4)',
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
    border: '1px solid rgba(255,255,255,0.12)',
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
    border: '1.5px solid #ea4335',
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
    border: '1.5px solid rgba(255,255,255,0.08)',
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
    border: '1.5px solid #00f0ff',
    color: '#00f0ff',
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
    border: '1.5px solid #ea4335',
    color: '#ea4335',
    boxShadow: '0 0 12px rgba(234,67,53,0.2)'
  },
  infoPulseBtn: {
    background: 'rgba(0, 240, 255, 0.08)',
    border: '1.5px solid #00f0ff',
    color: '#00f0ff'
  },
  hazardAlertPanel: {
    background: 'rgba(234, 67, 53, 0.08)',
    border: '1px solid #ea4335',
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
    border: '1px solid rgba(255, 255, 255, 0.06)',
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
    border: '1px dashed rgba(234, 67, 53, 0.3)',
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
    border: '1px dashed rgba(0, 255, 136, 0.3)',
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
    border: '1px solid rgba(255,255,255,0.15)',
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
    border: '1px solid #00ff88',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#00ff88',
    fontSize: '0.68rem',
    lineHeight: 1.4
  },
  dialogueResetBtn: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'monospace',
    fontSize: '0.6rem',
    cursor: 'pointer',
    alignSelf: 'center',
    outline: 'none'
  },
  sliderDashboardPanel: {
    background: 'rgba(4, 6, 12, 0.65)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
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
    border: '1.5px solid rgba(255,255,255,0.06)',
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
    border: '1px solid rgba(255,255,255,0.05)'
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
    border: '1px solid rgba(255,255,255,0.06)',
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
  }
};
