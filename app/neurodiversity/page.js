'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Import our custom interactive Ares City simulation exhibits
import {
  MaskingDiagnostics,
  MonotropicSpotlight,
  DoubleEmpathySync,
  EnvironmentalTransition,
  BreathingRegulator,
  ExhibitPlaqueVisualization,
  ExhibitHistoryModel,
  ExhibitMatrixVisualization,
  ExhibitMartianBiosphere,
  ExhibitMemoirCrystalMap
} from '../../components/MuseumExhibits';

export default function NeurodiversityTacticalMuseum() {
  const [activeSector, setActiveSector] = useState('foyer'); // 'foyer', 'corridor', 'constellation', 'sanctuary'
  const [activeExhibitIndex, setActiveExhibitIndex] = useState(0); // 0 to 6 for Exhibits 1-7
  const [activeStoryPhase, setActiveStoryPhase] = useState(0); // 0 to 4 for Memoir Phases 01-05
  const [activeMatrixTrait, setActiveMatrixTrait] = useState('stimming'); // 'stimming', 'hyperfocus', 'comms', 'autonomy' (Exhibit 2)
  const [activeSimTab, setActiveSimTab] = useState('comms'); // 'comms', 'sensory', 'masking' (Exhibit 4)
  const [analogyTheme, setAnalogyTheme] = useState('tech'); // 'tech', 'rpg', 'nature', 'sports' (Analogy Switcher)
  const [isMounted, setIsMounted] = useState(false);
  const [passportId, setPassportId] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const [transitState, setTransitState] = useState('slide-active');
  const [activeStarNode, setActiveStarNode] = useState(null); // Selected Lexicon Term object
  
  // Audio Narration states
  const [isNarrating, setIsNarrating] = useState(false);
  const [narrationProgress, setNarrationProgress] = useState(0);
  const [narrationSpeed, setNarrationSpeed] = useState(1);
  const speechUtteranceRef = useRef(null);

  // Passport Pledge States
  const [pledges, setPledges] = useState({
    destigmatize: false,
    accommodate: false,
    explicitComms: false
  });
  const [citizenName, setCitizenName] = useState('');
  const [passportGranted, setPassportGranted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Share details
  const shareText = "Explore the Refined Dome of the Cognitive Biosphere in Ares City. Let's move past pathological special-needs deficits and adapt mutual neurotype bridges: ";

  useEffect(() => {
    setIsMounted(true);
    setPassportId(Math.round(Math.random() * 90000) + 10000);
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const changeSector = (sector) => {
    if (activeSector === sector) return;
    setTransitState('slide-left');
    setTimeout(() => {
      setActiveSector(sector);
      setTransitState('slide-right');
      setTimeout(() => {
        setTransitState('slide-active');
      }, 50);
    }, 200);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Web Speech Synthesis Audio Narration Controls
  const toggleNarration = (textToSpeak) => {
    if (typeof window === 'undefined') return;

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }

    // Clean up HTML tags and get clean text
    const cleanText = textToSpeak.replace(/<[^>]*>/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = narrationSpeed;
    
    const voices = window.speechSynthesis.getVoices();
    const synthVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Natural') || v.lang.startsWith('en'));
    if (synthVoice) utterance.voice = synthVoice;

    utterance.onend = () => {
      setIsNarrating(false);
      setNarrationProgress(0);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const percent = Math.min(100, Math.round((charIndex / cleanText.length) * 100));
        setNarrationProgress(percent);
      }
    };

    speechUtteranceRef.current = utterance;
    setIsNarrating(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopNarration = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      setNarrationProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const togglePledge = (key) => {
    setPledges(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const allPledgesChecked = pledges.destigmatize && pledges.accommodate && pledges.explicitComms;

  const handleGeneratePassport = () => {
    if (!citizenName.trim() || !allPledgesChecked) return;
    setPassportGranted(true);
  };

  // Dynamic SVG Waveform graphic helper
  const renderWaveformSvg = () => {
    if (!isNarrating) {
      return (
        <svg viewBox="0 0 100 20" width="100%" height="20px" opacity="0.3">
          <line x1="5" y1="10" x2="95" y2="10" stroke="#00ff88" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 20" width="100%" height="20px">
        <path 
          d="M 5,10 Q 15,2 25,10 T 45,10 T 65,10 T 85,10 T 95,10" 
          fill="none" 
          stroke="#00ff88" 
          strokeWidth="1.2"
        >
          <animate attributeName="d" 
            values="M 5,10 Q 15,2 25,10 T 45,10 T 65,10 T 85,10 T 95,10;
                    M 5,10 Q 15,18 25,10 T 45,10 T 65,10 T 85,10 T 95,10;
                    M 5,10 Q 15,2 25,10 T 45,10 T 65,10 T 85,10 T 95,10" 
            dur="0.8s" 
            repeatCount="indefinite" 
          />
        </path>
      </svg>
    );
  };

  // 5 Refined Exhibits definitions
  const getExhibitDesc = (id) => {
    switch (id) {
      case 'exhibit-what-is-nd':
        if (analogyTheme === 'tech') {
          return 'Think of human brains like different smartphone operating systems. Having iOS and Android exist together isn\'t a defect—it\'s a choice of architectures. They compile code differently, but both run powerful devices. Diversity is a feature, not a bug. Neurodiversity is the biological reality that human operating systems naturally vary in their wiring, rather than classifying differences as clinical errors.';
        }
        if (analogyTheme === 'rpg') {
          return 'Think of human brains like game character classes. An RPG would be extremely boring if every player was a standard Warrior. Having Mages, Rogues, and Healers is what makes a balanced raid team. Each class has unique base stats and talent trees, not deficits. Neurodiversity is the biological reality of this character-class distribution, modeling variation as an asset that enriches collective adaptability.';
        }
        if (analogyTheme === 'nature') {
          return 'Think of human brains like plant species in an ecosystem. Cacti are built to store water in deserts, while ferns thrive in deep damp swamp shades. You wouldn\'t call a cactus "broken" because it rots in a swamp. Different plants need different soil wiring. Neurodiversity is the biological reality of our cognitive biosphere, celebrating variation as normal biodiversity.';
        }
        if (analogyTheme === 'sports') {
          return 'Think of human brains like athlete specializations. An Olympic sprinter has high-twitch muscle fibers for explosive speed, a powerlifter has dense fiber for lifting, and a marathon runner has massive cardiovascular endurance. You don\'t call a powerlifter "broken" because they can\'t run a 4-minute mile. Neurodiversity is the biological reality of these differing athletic profiles, which co-exist to support diverse roles.';
        }
        return '';

      case 'exhibit-two-ways':
        if (analogyTheme === 'tech') {
          return 'The Pathology lens views an Android trying to run iOS apps directly as "defective" because the compile fails. The Accommodation lens says: Android just runs a different kernel—it needs an Android-native compiler. It\'s a software mismatch, not a broken chip. Select traits below to compare the two models neutrally through this system lens.';
        }
        if (analogyTheme === 'rpg') {
          return 'The Pathology lens views a Mage trying to swing a giant steel claymore as "weak and defective." The Accommodation lens says: Mages are built to cast spells from a distance—give them a staff. It\'s a class mismatch, not a player failure. Select traits below to compare the two models neutrally through this character class lens.';
        }
        if (analogyTheme === 'nature') {
          return 'The Pathology lens views a desert cactus rotting in a wet marsh as having a "root deficit." The Affirming lens says: The cactus is designed to conserve water—replant it in dry sand. It\'s a soil mismatch, not a sick plant. Select traits below to compare the two models neutrally through this ecological lens.';
        }
        if (analogyTheme === 'sports') {
          return 'The Pathology lens views a heavy powerlifter failing to keep pace in a 100-meter sprint as having a "cardio failure." The Affirming lens says: Powerlifters are designed for explosive barbell lifts—give them heavy weights. It\'s a role mismatch, not an athletic failure. Select traits below to compare the two models neutrally through this athletic lens.';
        }
        return '';

      case 'exhibit-real-life':
        if (analogyTheme === 'tech') {
          return 'Explore interactive simulations of everyday operating dynamics. Experience how cross-play desync manifests as communication lag (Double Empathy), how single-task CPU overclocking creates focus spotlights (Monotropic attention), and how runaway background tasks drain the social battery core (Masking). Select a tab below to engage the interactive simulations.';
        }
        if (analogyTheme === 'rpg') {
          return 'Explore simulations of daily questing dynamics. Experience how different tick-rates create keyboard-vs-controller trading desync (Double Empathy), how channeling high-level spell casts locks attention (Monotropic focus), and how active stealth spells drain your mana bar to zero (Masking). Select a tab below to engage the interactive simulations.';
        }
        if (analogyTheme === 'nature') {
          return 'Explore simulations of natural processing dynamics. Experience how different species mismatches create communication desync (Double Empathy), how deep taproot designs draw water (Monotropic spotlight), and how extreme environmental camouflage mimicry drains organic energy (Masking). Select a tab below to engage the interactive simulations.';
        }
        if (analogyTheme === 'sports') {
          return 'Explore simulations of athletic processing dynamics. Experience how rule desyncs create soccer-vs-basketball playbook lag (Double Empathy), how being in-the-zone creates tunnel-vision focus (Monotropic spotlight), and how running a race in a 50lb weighted vest drains physical stamina (Masking). Select a tab below to engage the interactive simulations.';
        }
        return '';

      case 'exhibit-accommodation':
        if (analogyTheme === 'tech') {
          return 'The Social Model of Disability. Disability is created when software is locked to a single proprietary OS format. Drag the transition slide handle in the right-hand panel to install explicit translation drivers, converting a rigid deficit cell into a cross-play affirming bio-dome.';
        }
        if (analogyTheme === 'rpg') {
          return 'The Social Model of Disability. Disability is created when you demand Mages fight in close-quarters melee combat. Drag the slider to provide proper tank shield covers, shifting a high-risk deficit cage into an affirming, balanced guild biome.';
        }
        if (analogyTheme === 'nature') {
          return 'The Social Model of Disability. Disability is created when you try to grow cacti in swamps or ferns in sand. Drag the slider to adjust soil moisture and shading coordinates, transforming a hostile pathology cell into a thriving biological terrarium.';
        }
        if (analogyTheme === 'sports') {
          return 'The Social Model of Disability. Disability is created when you force sprinters, powerlifters, and high jumpers to compete solely on a swimming track. Drag the slider to build custom sports coordinates, shifting a hostile cell into an affirming athletic biome.';
        }
        return '';

      case 'exhibit-future':
        if (analogyTheme === 'tech') {
          return 'Designing future operating systems designed from the ground up to support native multi-compilation cross-play APIs. Use the dials in the Martian Biosphere SVG stabilizer in the right-hand panel to balance sensory glare shields, direct instructions, and task control variables.';
        }
        if (analogyTheme === 'rpg') {
          return 'Designing future game dungeons that require a diverse guild of Mages, Rogues, and Warriors working in lockstep, rather than a single uniform class. Adjust the canopy stabilizer dials in the right-hand panel to balance guild parameters.';
        }
        if (analogyTheme === 'nature') {
          return 'Planting a diverse permaculture garden where multiple species share soil minerals, enriching the entire soil biome. Use the canopy stabilizer dials in the right-hand panel to balance moisture, direct light, and root autonomy variables.';
        }
        if (analogyTheme === 'sports') {
          return 'Building a decathlon team that scores high by combining world-class specialists in every track and field discipline. Tune the canopy stabilizer dials in the right-hand panel to balance training parameters.';
        }
        return '';

      case 'exhibit-history':
        return 'History of behavior control and classification. Trace how society developed the pathology deficit model over time—from factory-school behavior standardization in the 1800s, psychiatric asylum lockups in the 1960s, special education tracking rooms in the 1980s, to self-advocacy and dome designs today. Click the pipeline nodes in the SVG above to load database history logs.';

      case 'exhibit-story':
      default:
        return 'Ground the conceptual operating frameworks in a single lived human experience. Select Sol crystals in the interactive neural Constellation map to trace Ephraim\'s story across five checkpoints—from childhood Yeshiva compliance and para-exclusion to adult burnout and unmasked synaptic pride.';
    }
  };

  const exhibits = [
    {
      id: 'exhibit-what-is-nd',
      title: 'Exhibit 1: What is Neurodiversity?',
      subtitle: '🌿 PLURAL COGNITIVISM & HUMAN VARIATION',
      desc: getExhibitDesc('exhibit-what-is-nd'),
      component: <ExhibitPlaqueVisualization />
    },
    {
      id: 'exhibit-two-ways',
      title: 'Exhibit 2: Two Ways of Seeing the Same Person',
      subtitle: '📊 INTERACTIVE MODEL COMPARATIVE MATRIX',
      desc: getExhibitDesc('exhibit-two-ways'),
      component: 'custom-matrix'
    },
    {
      id: 'exhibit-history',
      title: 'Exhibit 3: How the Old Model Developed',
      subtitle: '📜 HISTORICAL ROOT GEOGRAPHY & COGNITIVE STRUCTURES',
      desc: getExhibitDesc('exhibit-history'),
      component: <ExhibitHistoryModel />
    },
    {
      id: 'exhibit-real-life',
      title: 'Exhibit 4: What it looks like in real life',
      subtitle: '⚙️ CHANNELS OF INTERACTIVE LIFE EXPERIENCES',
      desc: getExhibitDesc('exhibit-real-life'),
      component: 'custom-real-life'
    },
    {
      id: 'exhibit-accommodation',
      title: 'Exhibit 5: The Power of Accommodation',
      subtitle: '🌿 SOCIAL MODEL OF DISABILITY SHUTTLE',
      desc: getExhibitDesc('exhibit-accommodation'),
      component: 'custom-accommodation'
    },
    {
      id: 'exhibit-future',
      title: 'Exhibit 6: Neurodiversity in the Future',
      subtitle: '🛰️ FUTURE MARTIAN CANOPY STABILIZER',
      desc: getExhibitDesc('exhibit-future'),
      component: 'custom-future'
    },
    {
      id: 'exhibit-story',
      title: 'Exhibit 7: Lived experience (your story)',
      subtitle: '📖 EPHRAIM\'S SOL CHRONOLOGICAL TIMELINE MEMOIR',
      desc: getExhibitDesc('exhibit-story'),
      component: 'custom-story'
    }
  ];

  // Memoir chronological phases (Exhibit 5)
  const storyPhases = [
    {
      id: 0,
      tabTitle: 'ABA Session',
      phaseName: 'PHASE 01 // AGE 3.5 // COMPLIANCE INTERVENTION',
      storyText: 'My story started out with Applied Behavior Analysis (ABA) Sunday training sessions when I was three and a half years old. This was back when old-school compliance models of special needs dominated practices, manually training autistic kids to suppress self-regulation behaviors to fit standard behaviors.',
      abaLink: true
    },
    {
      id: 1,
      tabTitle: 'Yeshiva School',
      phaseName: 'PHASE 02 // GRADE SCHOOL // THE NORMALCY FACADE',
      storyText: 'My parents tried placing me in a mainstream Orthodox Yeshiva. I quickly felt a deep mismatch, wondering why I needed special support when everyone pretended everything was normal—they were just faking it because neurodiversity was unknown. Lacking the vocabulary to advocate, I called out in class, acted out, and was eventually assigned a paraprofessional (para), still never knowing I was autistic.',
      abaLink: false
    },
    {
      id: 2,
      tabTitle: 'Special Ed Transfer',
      phaseName: 'PHASE 03 // HIGH SCHOOL // EXCLUSION & BULK CELLS',
      storyText: 'Mainstream yeshiva failed, so I went to two special needs schools. In the first, another kid pointed out my autism in a teasing, mocking way that framed it as a broken medical deficit, which terrified me. In the second, a tough peer leader turned the school against me, causing immense fear in my daily coordinates.',
      abaLink: false
    },
    {
      id: 3,
      tabTitle: 'Autistic Burnout',
      phaseName: 'PHASE 04 // EARLY 20s // METABOLIC BURN & CLASHES',
      storyText: 'In my early 20s, the high school trauma culminated in severe autistic burnout. I hit a physiological crash, struggling with the thought that I would never make friends. Socializing was further complicated because I misread other autistic peers\' silent battery drainage as personal rejection. Lacking explicit verbal coordinates, I unknowingly invaded their boundaries because neither of us communicated explicitly.',
      abaLink: false
    },
    {
      id: 4,
      tabTitle: 'Self-Acceptance',
      phaseName: 'PHASE 05 // PRESENT // NOMINAL SYNAPTIC UPLINK',
      storyText: 'Today, I am slowly learning more about myself every Sol. Armed with respect for social batteries and an understanding of attention inertia, I am unlearning pathology deficit labels. I accept my specialized monotropic attention flow tunnels and practice unmasking. Rather than forcing compliance, I am finding healthy, explicit ways to connect with others on my own terms.',
      abaLink: false
    }
  ];

  // Interactive Comparative Matrix definitions (Exhibit 2)
  const matrixTraits = {
    stimming: {
      title: 'Stimming / Self-Regulation',
      pathologyTitle: '📊 Deficit / Special Needs Lens',
      pathologyText: 'Interpreted as purposeless, repetitive, or non-functional behaviors. Interventions typically focus on suppressing these behaviors to help the individual blend in socially and appear indistinguishable from peers.',
      affirmingTitle: '🌿 Neurodiversity / Accommodation Lens',
      affirmingText: 'Interpreted as a natural biological tool to regulate an overstimulated nervous system, release excess motor energy, and manage focus. Accommodated by providing safe spaces to move and accepting standard self-regulation.',
      colonyRule: 'Never demand still hands or rigid postures; self-regulation is a healthy processing buffer.'
    },
    hyperfocus: {
      title: 'Hyperfocus / Special Interests',
      pathologyTitle: '📊 Deficit / Special Needs Lens',
      pathologyText: 'Interpreted as an abnormal intensity of interest, or highly restricted repetitive behaviors. Interventions typically aim to redirect the individual toward broader topics or ration access to interests.',
      affirmingTitle: '🌿 Neurodiversity / Accommodation Lens',
      affirmingText: 'Interpreted as a monotropic attention flow state that fosters deep, meticulous expertise and creative focus. Accommodated by creating strengths-based pathways and respecting deep focus states.',
      colonyRule: 'Provide uninterrupted focus buffers. Hyperfocus flow is a valuable creative resource.'
    },
    comms: {
      title: 'Social Communication style',
      pathologyTitle: '📊 Deficit / Special Needs Lens',
      pathologyText: 'Interpreted as a communication deficit marked by failure to follow standard eye contact, facial expressions, and unstated social rules. Blamed entirely on the individual\'s social hardware.',
      affirmingTitle: '🌿 Neurodiversity / Accommodation Lens',
      affirmingText: 'Interpreted as a direct, literal communication style. Recognizes the Double Empathy Problem: breakdowns are mutual mismatches across differing neurotype hardware, not one-sided deficits.',
      colonyRule: 'Bridges are built through mutual, explicit verbal communication—avoid unstated social guessing.'
    },
    autonomy: {
      title: 'Autonomy / PDA Profile',
      pathologyTitle: '📊 Deficit / Special Needs Lens',
      pathologyText: 'Interpreted as Pathological Demand Avoidance, characterized by irrational avoidance of everyday demands and oppositional non-compliance. Managed through reward/punishment compliance programs.',
      affirmingTitle: '🌿 Neurodiversity / Accommodation Lens',
      affirmingText: 'Interpreted as a Pervasive Drive for Autonomy, where standard daily demands trigger an involuntary threat response in the autonomic nervous system. Managed through collaborative, non-coercive partnerships.',
      colonyRule: 'Coordinate using egalitarian, non-coercive partnerships to support the drive for autonomy.'
    },
    sensory: {
      title: 'Sensory Processing',
      pathologyTitle: '📊 Deficit / Special Needs Lens',
      pathologyText: 'Interpreted as sensory processing dysfunction or abnormal reactivity (hypo- or hyper-sensitivity) to ambient stimuli. Managed by forcing standard tolerance or systematic desensitization.',
      affirmingTitle: '🌿 Neurodiversity / Accommodation Lens',
      affirmingText: 'Interpreted as a high-definition sensory processing system that gathers detailed ambient data without automatic filters. Accommodated by providing environmental control options like dimmable lighting and noise-reducing gear.',
      colonyRule: 'Respect sensory boundaries; provide dimmable spaces and quiet zones to preserve battery.'
    },
    attention: {
      title: 'Attention / Focus profile',
      pathologyTitle: '📊 Deficit / Special Needs Lens',
      pathologyText: 'Interpreted as attention deficit hyperactivity disorder (ADHD), characterized by chronic distractibility, lack of discipline, or executive dysfunction. Managed through stimulant regulation and compliance routines.',
      affirmingTitle: '🌿 Neurodiversity / Accommodation Lens',
      affirmingText: 'Interpreted as a dynamic, interest-based nervous system that excels in novel, urgent, or highly engaging contexts. Accommodated by structuring flexible, self-directed timelines and goal-aligned collaboration.',
      colonyRule: 'Structure collaboration around self-directed projects that leverage natural interest-based focus.'
    }
  };

  return (
    <div className="citizen-card-shell neuro-page-shell" style={{ flexDirection: 'column' }}>
      
      {/* Immersive Martian Biosphere Core CSS and Viewport Fixes */}
      <style dangerouslySetInnerHTML={{ __html: `
        .neuro-page-shell {
          height: calc(100vh - 140px);
          max-height: calc(100vh - 140px);
          min-height: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .museum-floor-nav-deck {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 14px;
          flex-shrink: 0;
          z-index: 10;
        }
        .museum-nav-btn {
          padding: 10px 4px;
          font-family: var(--font-tech);
          font-size: 0.72rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          background: rgba(6, 9, 20, 0.7);
          border-width: 1.5px;
          border-style: solid;
          borderColor: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          text-align: center;
          outline: none;
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.02);
        }
        .museum-nav-btn:hover {
          borderColor: rgba(0, 255, 136, 0.4);
          color: #00ff88;
          background: rgba(0, 255, 136, 0.04);
        }
        .museum-nav-btn.active {
          borderColor: #00ff88;
          color: #00ff88;
          background: rgba(0, 255, 136, 0.12);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.2), inset 0 1px 3px rgba(0, 255, 136, 0.1);
          text-shadow: 0 0 6px rgba(0, 255, 136, 0.5);
        }
        .museum-view-corridor {
          flex: 1;
          display: flex;
          flex-direction: row;
          gap: 20px;
          min-height: 0;
          height: 100%;
          max-height: 100%;
        }
        .museum-left-feed {
          flex: 1.1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
          height: 100%;
        }
        .museum-right-diagnostics {
          flex: 1.9;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
          height: 100%;
        }
        .narration-control-panel {
          background: rgba(4, 6, 12, 0.7);
          border-width: 1.5px;
          border-style: solid;
          borderColor: rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .audio-wave-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.4);
          border-width: 1px;
          border-style: solid;
          borderColor: rgba(255,255,255,0.04);
          border-radius: 6px;
          padding: 6px 12px;
        }
        .audio-wave-label {
          font-family: monospace;
          fontSize: 0.58rem;
          color: rgba(255,255,255,0.45);
          letter-spacing: 1px;
        }
        .narration-action-row {
          display: flex;
          gap: 8px;
        }
        .audio-deck-btn {
          flex: 1;
          padding: 6px 10px;
          font-family: monospace;
          font-size: 0.65rem;
          background: rgba(255,255,255,0.03);
          border-width: 1px;
          border-style: solid;
          borderColor: rgba(255,255,255,0.1);
          color: #fff;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          outline: none;
        }
        .audio-deck-btn:hover {
          background: rgba(0, 255, 136, 0.08);
          borderColor: #00ff88;
          color: #00ff88;
        }
        .audio-deck-btn.active {
          background: rgba(0, 255, 136, 0.15);
          borderColor: #00ff88;
          color: #00ff88;
          font-weight: bold;
        }
        .speed-slider-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: monospace;
          font-size: 0.58rem;
          color: rgba(255,255,255,0.5);
        }
        .audio-speed-slider {
          flex: 1;
          max-width: 100px;
          outline: none;
          height: 3px;
          cursor: pointer;
          accent-color: #00ff88;
        }
        .story-text-body {
          font-size: 0.82rem;
          color: #f2f6fc;
          line-height: 1.6;
          text-align: justify;
          margin: 0;
          font-weight: 300;
        }
        .gallery-nav-buttons-deck {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          background: rgba(6, 9, 20, 0.6);
          border-width: 1px;
          border-style: solid;
          borderColor: rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 8px 16px;
          margin-top: auto;
        }
        .gallery-arrow-btn {
          background: transparent;
          border: none;
          color: #00ff88;
          font-family: var(--font-tech);
          font-size: 0.7rem;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
          letter-spacing: 0.5px;
        }
        .gallery-arrow-btn:hover {
          text-shadow: 0 0 8px #00ff88;
          transform: scale(1.03);
        }
        .gallery-arrow-btn:disabled {
          color: rgba(255,255,255,0.25);
          cursor: not-allowed;
          text-shadow: none;
        }
        .starmap-canvas-box {
          background: #04060c;
          border-width: 1.5px;
          border-style: solid;
          borderColor: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 0 25px rgba(0,0,0,0.9);
          flex: 1;
          min-height: 250px;
        }
        .starmap-constellation-node {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .starmap-constellation-node:hover circle.glow-ring {
          stroke-width: 1.5px;
          opacity: 0.6;
          r: 9px;
        }
        .constellation-drawer-overlay {
          position: absolute;
          top: 0;
          right: 0;
          width: 320px;
          height: 100%;
          background: rgba(10, 14, 30, 0.96);
          border-left: 2px solid #00ff88;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.7);
          z-index: 50;
          display: flex;
          flex-direction: column;
          animation: slide-drawer 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        @keyframes slide-drawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .protocol-toggle-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border-width: 1px;
          border-style: dashed;
          borderColor: rgba(255,255,255,0.08);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .protocol-toggle-badge:hover {
          borderColor: rgba(0,255,136,0.3);
          background: rgba(255,255,255,0.03);
        }
        .protocol-toggle-badge.active {
          background: rgba(0, 255, 136, 0.06);
          border-width: 1.5px;
          border-style: solid;
          borderColor: #00ff88;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.1);
        }
        .colony-passport-print-card {
          background: linear-gradient(135deg, rgba(6, 9, 20, 0.94) 0%, rgba(10, 14, 30, 0.98) 100%);
          border-width: 2px;
          border-style: solid;
          borderColor: #00ff88;
          border-radius: 16px;
          padding: 20px;
          position: relative;
          box-shadow: 0 0 25px rgba(0, 255, 136, 0.15);
          overflow: hidden;
          width: 100%;
          max-width: 380px;
          margin: 10px auto 0 auto;
        }

        /* Exhibit 4 Matrix specific */
        .trait-select-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }
        .trait-select-btn {
          padding: 8px 4px;
          font-family: var(--font-tech);
          font-size: 0.64rem;
          letter-spacing: 0.5px;
          background: rgba(4,6,12,0.6);
          border-width: 1px;
          border-style: solid;
          borderColor: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: center;
          outline: none;
        }
        .trait-select-btn:hover {
          borderColor: rgba(0, 255, 136, 0.4);
          color: #00ff88;
        }
        .trait-select-btn.active {
          borderColor: #00ff88;
          background: rgba(0, 255, 136, 0.08);
          color: #00ff88;
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.15);
          font-weight: bold;
        }
        
        .custom-scroll {
          overflow-y: auto;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 136, 0.15);
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 136, 0.4);
        }

        @media (max-width: 900px) {
          .neuro-page-shell {
            height: auto !important;
            max-height: none !important;
            min-height: auto !important;
          }
          .museum-floor-nav-deck {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .museum-view-corridor {
            flex-direction: column !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
          }
          .museum-left-feed, .museum-right-diagnostics {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            flex: none !important;
            width: 100% !important;
          }
          .trait-select-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}} />

      {/* Corridor sweep overlay */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Main OS content container */}
      <div className={`walking-content-container ${transitState}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Navigation Console */}
        <div className="museum-floor-nav-deck">
          <button 
            onClick={() => changeSector('foyer')} 
            className={`museum-nav-btn ${activeSector === 'foyer' ? 'active' : ''}`}
          >
            🛰️ Teleport Lobby
          </button>
          <button 
            onClick={() => changeSector('corridor')} 
            className={`museum-nav-btn ${activeSector === 'corridor' ? 'active' : ''}`}
          >
            🖼️ Exhibit Corridor
          </button>
          <button 
            onClick={() => changeSector('constellation')} 
            className={`museum-nav-btn ${activeSector === 'constellation' ? 'active' : ''}`}
          >
            🌌 Neural Constellation
          </button>
          <button 
            onClick={() => changeSector('sanctuary')} 
            className={`museum-nav-btn ${activeSector === 'sanctuary' ? 'active' : ''}`}
          >
            🌿 Sanctuary rest
          </button>
        </div>

        {/* Dynamic Sector Rendering */}
        <div className="museum-view-corridor">
          
          {/* ====================================
              LOBBY / FOYER SECTOR
              ==================================== */}
          {activeSector === 'foyer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', margin: '0 auto', maxWidth: '800px', textAlign: 'center', justifyContent: 'center' }}>
              <div className="bubbly-panel">
                <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                  // CORRIDOR COORDINATE: ATH-DOME-9 // TEMP NOMINAL // MARS SOL CLOCK STAMP
                </span>
                <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.6rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                  Dome of the Cognitive Biosphere
                </h1>
                <h3 style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#00ff88', fontWeight: 500, letterSpacing: '1px', marginBottom: '16px' }}>
                  ARES CITY DIGITAL MUSEUM OF THE MIND
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#8a9bb5', lineHeight: '1.7', margin: '0 0 20px 0', textAlign: 'justify' }}>
                  Welcome, Citizen. This atmospheric dome houses a cybernetic, reflective exploration of the human cognitive landscape. Rather than analyzing minds through clinical pathology metrics, this museum reframes differences as natural biological variations. 
                </p>
                <p style={{ fontSize: '0.86rem', color: '#8a9bb5', lineHeight: '1.7', margin: '0 0 24px 0', textAlign: 'justify' }}>
                  Explore the structured **Exhibit Corridor** tracing universal questions about what neurodiversity means, two ways of seeing the same person, how the medical pathology model developed historically, what wiring dynamics look like in real life through simulations, and Ephraim's chronological Sol memoir.
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => changeSector('corridor')} 
                    className="hud-btn" 
                    style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#00ff88', color: '#00ff88', background: 'rgba(0, 255, 136, 0.08)' }}
                  >
                    [ 🖼️ ENTER THE EXHIBIT CORRIDOR ]
                  </button>
                  <button onClick={() => changeSector('constellation')} className="hud-btn">
                    [ 🌌 OPEN NEURAL CONSTELLATION MAP ]
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ====================================
              THE EXHIBIT CORRIDOR SECTOR
              ==================================== */}
          {/* ====================================
              THE 5-EXHIBIT CORRIDOR SECTOR
              ==================================== */}
          {activeSector === 'corridor' && (() => {
            const currentExhibit = exhibits[activeExhibitIndex];
            const isCustomMatrix = currentExhibit.component === 'custom-matrix';
            const isCustomRealLife = currentExhibit.component === 'custom-real-life';
            const isCustomAccommodation = currentExhibit.component === 'custom-accommodation';
            const isCustomFuture = currentExhibit.component === 'custom-future';
            const isCustomStory = currentExhibit.component === 'custom-story';

            return (
              <>
                {/* LEFT PANE: Exhibit Core Information & Details */}
                <div className="museum-left-feed custom-scroll">
                  
                  {/* ANALOGY THEME SELECTOR CONSOLE */}
                  <div className="bubbly-panel" style={{ flexShrink: 0, padding: '10px 14px', border: '1.5px solid rgba(0, 240, 255, 0.15)', background: 'rgba(0, 240, 255, 0.02)' }}>
                    <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00f0ff', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                      ⚙️ CHOOSE EXPLANATION LENS (ANALOGY SWITCHER)
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                      {[
                        { id: 'tech', label: '⚙️ Tech', title: 'Smartphone OS, CPU, RAM and network cross-play' },
                        { id: 'rpg', label: '🎮 RPG', title: 'Character classes, talent trees, spell channels and lag desync' },
                        { id: 'nature', label: '🌿 Nature', title: 'Plant adaptations, moisture settings, biomes and permacultures' },
                        { id: 'sports', label: '🏆 Sports', title: 'Athlete body specializations, in-the-zone sprint channels and weighted vests' }
                      ].map(theme => (
                        <button
                          key={theme.id}
                          onClick={() => setAnalogyTheme(theme.id)}
                          title={theme.title}
                          style={{
                            padding: '4px 2px',
                            fontSize: '0.58rem',
                            fontFamily: 'monospace',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: analogyTheme === theme.id ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0,0,0,0.3)',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: analogyTheme === theme.id ? '#00f0ff' : 'rgba(255,255,255,0.08)',
                            color: analogyTheme === theme.id ? '#00f0ff' : 'rgba(255,255,255,0.6)',
                            outline: 'none'
                          }}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                    <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>
                      // EXHIBITION DATA NODESEC // EX-{activeExhibitIndex + 1}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                      {currentExhibit.title}
                    </h3>
                    <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', display: 'block', marginBottom: '14px' }}>
                      {currentExhibit.subtitle}
                    </span>
                    
                    <p style={{ fontSize: '0.78rem', color: '#8a9bb5', lineHeight: 1.45, margin: 0, textAlign: 'justify' }}>
                      {currentExhibit.desc}
                    </p>
                  </div>

                  {/* Standard exhibit text body block (adapted to selected lens) */}
                  {!isCustomStory && !isCustomRealLife && !isCustomMatrix && !isCustomAccommodation && !isCustomFuture && (
                    <div className="bubbly-panel">
                      <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>
                        // CHOSEN LENS TELEMETRY SUMMARY
                      </span>
                      <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.45, margin: 0, textAlign: 'justify' }}>
                        {activeExhibitIndex === 0 && (
                          analogyTheme === 'tech' ? "System architecture reframed. Diversity is modeled as a functional feature of plural processors coexisting on the same server network." :
                          analogyTheme === 'rpg' ? "Guild classes unlocked. Success is modeled as a balanced cooperative raid party utilizing diverse specialized classes." :
                          analogyTheme === 'nature' ? "Ecosystem fitness secured. Vitality is modeled as biodiverse species adapting to custom soil micro-climates." :
                          "Team roster optimized. Victory is modeled as sprinters, powerlifters, and marathoners training in their native domains."
                        )}
                        {activeExhibitIndex === 2 && "The pathology model was not created in a vacuum. It was historically shaped to enforce uniformity during the industrial revolution, segregating differences into psychiatric lockups, special education systems, and compliance checklists. Click the pipeline nodes to traverse eras."}
                      </p>
                    </div>
                  )}

                  {/* Exhibit 4 (Real Life Simulations) Interactive Select Tab Block */}
                  {isCustomRealLife && (
                    <div className="bubbly-panel" style={{ flexShrink: 0, gap: '10px' }}>
                      <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1px', display: 'block' }}>
                        // SELECT REAL-LIFE TELEMETRY SIMULATOR
                      </span>
                      <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, margin: '0 0 8px 0' }}>
                        Neurodivergent wiring manifests in specific processing dynamics. Select a simulator module below to engage the interactive coordinates in the right-hand console:
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button 
                          onClick={() => setActiveSimTab('comms')} 
                          className={`protocol-toggle-badge ${activeSimTab === 'comms' ? 'active' : ''}`}
                          style={{ padding: '8px 12px' }}
                        >
                          <span style={{ fontSize: '0.85rem' }}>📡</span>
                          <div style={{ textAlign: 'left' }}>
                            <strong style={{ fontSize: '0.68rem', color: activeSimTab === 'comms' ? '#00ff88' : '#fff' }}>I. Communication Mismatch</strong>
                            <span style={{ display: 'block', fontSize: '0.58rem', color: 'rgba(255,255,255,0.45)' }}>Double Empathy & Signal Phase Mismatches</span>
                          </div>
                        </button>

                        <button 
                          onClick={() => setActiveSimTab('sensory')} 
                          className={`protocol-toggle-badge ${activeSimTab === 'sensory' ? 'active' : ''}`}
                          style={{ padding: '8px 12px' }}
                        >
                          <span style={{ fontSize: '0.85rem' }}>🚨</span>
                          <div style={{ textAlign: 'left' }}>
                            <strong style={{ fontSize: '0.68rem', color: activeSimTab === 'sensory' ? '#00ff88' : '#fff' }}>II. Sensory Spotlight</strong>
                            <span style={{ display: 'block', fontSize: '0.58rem', color: 'rgba(255,255,255,0.45)' }}>Monotropic Flow Channels & Overstimulation</span>
                          </div>
                        </button>

                        <button 
                          onClick={() => setActiveSimTab('masking')} 
                          className={`protocol-toggle-badge ${activeSimTab === 'masking' ? 'active' : ''}`}
                          style={{ padding: '8px 12px' }}
                        >
                          <span style={{ fontSize: '0.85rem' }}>🔋</span>
                          <div style={{ textAlign: 'left' }}>
                            <strong style={{ fontSize: '0.68rem', color: activeSimTab === 'masking' ? '#00ff88' : '#fff' }}>III. Masking & Burnout</strong>
                            <span style={{ display: 'block', fontSize: '0.58rem', color: 'rgba(255,255,255,0.45)' }}>Nervous System Reactor Battery & Stresses</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Exhibit 7 dedicated Narration Control panel */}
                  {isCustomStory && (
                    <div className="bubbly-panel">
                      <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>
                        // SUBSPACE TRANSMISSION FEED AUDIO CONTROLLER
                      </span>
                      <div className="narration-control-panel">
                        <div className="audio-wave-box">
                          <span className="audio-wave-label">TRANSMISSION FREQUENCY STATUS</span>
                          {renderWaveformSvg()}
                        </div>
                        
                        <div className="narration-action-row">
                          <button 
                            onClick={() => toggleNarration(storyPhases[activeStoryPhase].storyText)} 
                            className={`audio-deck-btn ${isNarrating ? 'active' : ''}`}
                          >
                            {isNarrating ? '⏸ PAUSE FREQ' : '▶ TRANSMIT NARRATION'}
                          </button>
                          <button onClick={stopNarration} className="audio-deck-btn">
                            ⏹ CUT OFF
                          </button>
                        </div>

                        <div className="speed-slider-row">
                          <span>TRANSMISSION SPEED: {narrationSpeed}x</span>
                          <input 
                            type="range" 
                            min="0.5" 
                            max="2" 
                            step="0.1" 
                            value={narrationSpeed} 
                            onChange={(e) => setNarrationSpeed(Number(e.target.value))} 
                            className="audio-speed-slider"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Floor Map exhibits switcher */}
                  <div className="gallery-nav-buttons-deck">
                    <button 
                      onClick={() => { stopUtterance(); setActiveExhibitIndex(prev => Math.max(0, prev - 1)); }}
                      disabled={activeExhibitIndex === 0}
                      className="gallery-arrow-btn"
                    >
                      ◀ PREV HALL
                    </button>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.45)' }}>
                      [ HALL 0{activeExhibitIndex + 1} / 0{exhibits.length} ]
                    </span>
                    <button 
                      onClick={() => { stopUtterance(); setActiveExhibitIndex(prev => Math.min(exhibits.length - 1, prev + 1)); }}
                      disabled={activeExhibitIndex === exhibits.length - 1}
                      className="gallery-arrow-btn"
                    >
                      NEXT HALL ▶
                    </button>
                  </div>
                </div>

                {/* RIGHT PANE: Interactive Simulation Panel */}
                <div className="museum-right-diagnostics custom-scroll">
                  
                  {/* Render standard visual components */}
                  {!isCustomMatrix && !isCustomRealLife && !isCustomAccommodation && !isCustomFuture && !isCustomStory && currentExhibit.component}

                  {/* ===================================================
                      EXHIBIT 2: Two Ways of Seeing the Same Person (Comparative Paradigm Matrix)
                      =================================================== */}
                  {isCustomMatrix && (() => {
                    const trait = matrixTraits[activeMatrixTrait];
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Interactive Trait-responsive SVG visualizer */}
                        <ExhibitMatrixVisualization activeTrait={activeMatrixTrait} />

                        <div className="bubbly-panel" style={{ gap: '14px' }}>
                          <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '1px' }}>
                            // INTERACTIVE MATRIX TERMINAL: SELECT TRAIT PARAMETER
                          </span>
                          
                          {/* Selector Tabs */}
                          <div className="trait-select-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                            {Object.keys(matrixTraits).map(key => (
                              <button
                                key={key}
                                onClick={() => setActiveMatrixTrait(key)}
                                className={`trait-select-btn ${activeMatrixTrait === key ? 'active' : ''}`}
                              >
                                {matrixTraits[key].title}
                              </button>
                            ))}
                          </div>

                          {/* Trait display details */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            
                            {/* pathology card */}
                            <div style={{ background: 'rgba(234, 67, 53, 0.02)', borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(234, 67, 53, 0.18)', borderRadius: '8px', padding: '14px' }}>
                              <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.72rem', color: '#ea4335', marginBottom: '6px' }}>
                                {trait.pathologyTitle}
                              </strong>
                              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5, textAlign: 'justify' }}>
                                {trait.pathologyText}
                              </p>
                            </div>

                            {/* affirming card */}
                            <div style={{ background: 'rgba(0, 255, 136, 0.02)', borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(0, 255, 136, 0.22)', borderRadius: '8px', padding: '14px' }}>
                              <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.72rem', color: '#00ff88', marginBottom: '6px' }}>
                                {trait.affirmingTitle}
                              </strong>
                              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5, textAlign: 'justify' }}>
                                {trait.affirmingText}
                              </p>
                            </div>

                            {/* highlight rule */}
                            <div style={{ background: 'rgba(0, 240, 255, 0.04)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(0, 240, 255, 0.15)', borderRadius: '8px', padding: '10px 14px' }}>
                              <strong style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.62rem', color: '#00f0ff', marginBottom: '2px', letterSpacing: '0.5px' }}>
                                💡 DOME SYSTEM RULE FOR EXPLICIT ACCOMMODATION
                              </strong>
                              <span style={{ fontSize: '0.7rem', color: '#fff', lineHeight: 1.4, display: 'block' }}>
                                {trait.colonyRule}
                              </span>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* ===================================================
                      EXHIBIT 4: What it looks like in real life (Simulation suite dashboard)
                      =================================================== */}
                  {isCustomRealLife && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {activeSimTab === 'comms' && <DoubleEmpathySync />}
                      {activeSimTab === 'sensory' && <MonotropicSpotlight />}
                      {activeSimTab === 'masking' && <MaskingDiagnostics />}
                    </div>
                  )}

                  {/* ===================================================
                      EXHIBIT 5: The Power of Accommodation (Environmental Transition Slide)
                      =================================================== */}
                  {isCustomAccommodation && <EnvironmentalTransition />}

                  {/* ===================================================
                      EXHIBIT 6: Neurodiversity in the Future (Martian Canopy Stabilizer)
                      =================================================== */}
                  {isCustomFuture && <ExhibitMartianBiosphere />}

                  {/* ===================================================
                      EXHIBIT 7: Lived experience (Ephraim's Chronological Narrative walk)
                      =================================================== */}
                  {isCustomStory && (() => {
                    const phase = storyPhases[activeStoryPhase];
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        
                        {/* Neural memoir constellation map crystal selector */}
                        <ExhibitMemoirCrystalMap activePhase={activeStoryPhase} setActivePhase={setActiveStoryPhase} />

                        {/* Story phase text display */}
                        <div className="bubbly-panel" style={{ gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                            <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#00ff88', fontWeight: 'bold' }}>
                              {phase.phaseName}
                            </span>
                            <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>
                              NARRATOR FEED LOCATED
                            </span>
                          </div>

                          <p className="story-text-body" style={{
                            transition: 'color 0.4s ease',
                            textShadow: isNarrating ? '0 0 3px rgba(0,255,136,0.15)' : 'none',
                            fontSize: '0.76rem',
                            lineHeight: '1.45',
                            margin: 0
                          }}>
                            {phase.storyText}
                          </p>

                          {phase.abaLink && (
                            <a 
                              href="https://youtu.be/gB_RJ0lRQ-E?si=MzVT-AhfMmZWU98K" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="social-link-port"
                              style={{
                                marginTop: '10px',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: '#ffb300',
                                color: '#ffb300',
                                background: 'rgba(255, 179, 0, 0.04)',
                                width: 'fit-content'
                              }}
                            >
                              📺 View Historical ABA Video ➔
                            </a>
                          )}
                        </div>

                        {/* Narrative timeline navigation */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <button
                            onClick={() => { stopUtterance(); setActiveStoryPhase(prev => Math.max(0, prev - 1)); }}
                            disabled={activeStoryPhase === 0}
                            className="hud-btn"
                            style={{ padding: '6px 12px', fontSize: '0.62rem', opacity: activeStoryPhase === 0 ? 0.3 : 1 }}
                          >
                            [ ↩ PREVIOUS SOL ]
                          </button>
                          <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>
                            MEMOIR SEGMENT 0{activeStoryPhase + 1} / 05
                          </span>
                          <button
                            onClick={() => { stopUtterance(); setActiveStoryPhase(prev => Math.min(storyPhases.length - 1, prev + 1)); }}
                            disabled={activeStoryPhase === storyPhases.length - 1}
                            className="hud-btn"
                            style={{ padding: '6px 12px', fontSize: '0.62rem', opacity: activeStoryPhase === storyPhases.length - 1 ? 0.3 : 1 }}
                          >
                            [ FORWARD SOL ➔ ]
                          </button>
                        </div>

                      </div>
                    );
                  })()}

                </div>
              </>
            );
          })()}

          {/* ====================================
              THE SYNAPTIC CONSTELLATION MAP
              ==================================== */}
          {activeSector === 'constellation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', minHeight: 0, height: '100%', position: 'relative' }}>
              <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  🌌 The Synaptic Constellation Map
                </h3>
                <p style={{ fontSize: '0.74rem', color: '#8a9bb5', lineHeight: 1.5, margin: 0 }}>
                  Click on the glowing stars within the neural coordinate starmap to unlock the classified lexical telemetry drawers. Review terms like unmasking, monotropism, and PDA to comprehend the autistic experiential software.
                </p>
              </div>

              {/* Starmap Interactive Canvas */}
              <div className="starmap-canvas-box">
                <svg viewBox="0 0 240 140" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="amberStarGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffb300" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="cyanStarGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Constellation line connectors */}
                  <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.5">
                    <line x1="30" y1="35" x2="65" y2="25" />
                    <line x1="65" y1="25" x2="110" y2="40" />
                    <line x1="110" y1="40" x2="155" y2="30" />
                    <line x1="155" y1="30" x2="200" y2="45" />

                    <line x1="30" y1="35" x2="55" y2="75" />
                    <line x1="65" y1="25" x2="90" y2="85" />
                    <line x1="110" y1="40" x2="130" y2="90" />
                    <line x1="155" y1="30" x2="175" y2="80" />
                    
                    <line x1="55" y1="75" x2="90" y2="85" />
                    <line x1="90" y1="85" x2="130" y2="90" />
                    <line x1="130" y1="90" x2="175" y2="80" />
                    <line x1="175" y1="80" x2="210" y2="70" />
                  </g>

                  {/* Nodes list */}
                  {LEXICON_ITEMS.map((item, idx) => {
                    const isSelected = activeStarNode?.id === item.id;
                    const glowColor = item.category === 'energy' ? 'url(#amberStarGlow)' : (item.category === 'cognitive' ? 'url(#cyanStarGlow)' : 'url(#starGlow)');
                    const strokeColor = item.category === 'energy' ? '#ffb300' : (item.category === 'cognitive' ? '#00f0ff' : '#00ff88');

                    return (
                      <g 
                        key={item.id} 
                        onClick={() => setActiveStarNode(item)}
                        className="starmap-constellation-node"
                      >
                        {/* Glow halo */}
                        <circle cx={item.cx} cy={item.cy} r={isSelected ? '14' : '9'} fill={glowColor} className="glow-ring" />
                        {/* Core star */}
                        <circle cx={item.cx} cy={item.cy} r="3" fill="#fff" />
                        {/* Outer accent circle */}
                        <circle 
                          cx={item.cx} 
                          cy={item.cy} 
                          r={isSelected ? '6.5' : '4.5'} 
                          fill="none" 
                          stroke={strokeColor} 
                          strokeWidth={isSelected ? '1.5' : '0.8'} 
                        />
                        {/* Title text label */}
                        <text 
                          x={item.cx} 
                          y={item.cy + 10} 
                          fill={isSelected ? strokeColor : 'rgba(255,255,255,0.45)'} 
                          fontSize="3.8" 
                          fontFamily="monospace" 
                          textAnchor="middle"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {item.title.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Sliding Telemetry Drawer Overlay (Progressive Disclosure) */}
                {activeStarNode && (
                  <div className="constellation-drawer-overlay" style={{ borderLeftColor: activeStarNode.category === 'energy' ? '#ffb300' : (activeStarNode.category === 'cognitive' ? '#00f0ff' : '#00ff88') }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#00ff88', fontWeight: 'bold' }}>
                        // LEXICON LOG DATA DECK
                      </span>
                      <button 
                        onClick={() => setActiveStarNode(null)} 
                        style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="custom-scroll" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>
                          {activeStarNode.category.toUpperCase()} STATE
                        </span>
                        <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#fff', textTransform: 'uppercase', margin: '4px 0 2px 0' }}>
                          {activeStarNode.title}
                        </h4>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                          {activeStarNode.pronunciation}
                        </span>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.45, fontStyle: 'italic', borderLeft: `2.5px solid ${activeStarNode.category === 'energy' ? '#ffb300' : (activeStarNode.category === 'cognitive' ? '#00f0ff' : '#00ff88')}`, paddingLeft: '8px' }}>
                        {activeStarNode.shortDef}
                      </p>

                      <p style={{ margin: 0, fontSize: '0.74rem', color: '#fff', lineHeight: 1.5, textAlign: 'justify' }}>
                        <strong>Diagnostic analysis:</strong> {activeStarNode.longDef}
                      </p>

                      <div style={{ background: 'rgba(0,0,0,0.3)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px' }}>
                        <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'monospace', color: '#00f0ff', marginBottom: '2px' }}>
                          📡 BECKERMEMOIR_LOGENTRY.DAT:
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#8a9bb5', lineHeight: 1.4, textAlign: 'justify' }}>
                          {activeStarNode.storyReflection}
                        </p>
                      </div>

                      <div style={{ background: 'rgba(0, 255, 136, 0.02)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(0, 255, 136, 0.1)', borderRadius: '8px', padding: '10px' }}>
                        <strong style={{ display: 'block', fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', marginBottom: '2px' }}>
                          💡 COLONY ACCOMMODATION RULE:
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#fff', lineHeight: 1.4 }}>
                          {activeStarNode.takeaway}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ====================================
              SANCTUARY & PLEDGE SECTOR
              ==================================== */}
          {activeSector === 'sanctuary' && (
            <div className="custom-scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', margin: '0 auto', maxWidth: '800px', height: '100%', padding: '10px 8px 40px 8px' }}>
              
              {/* Box Breathing Regulator Component */}
              <div style={{ flexShrink: 0 }}>
                <BreathingRegulator />
              </div>

              {/* Colony Pledging Terminal */}
              <div className="bubbly-panel" style={{ flexShrink: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: '#00ff88', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  🛠️ Ares Colony Cognitive Citizen Pledge
                </h3>
                <p style={{ fontSize: '0.74rem', color: '#8a9bb5', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  Commit to de-pathologizing differences and building structural accommodations. Toggle the 3 colony protocols to print your verified security credentials:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  
                  {/* Protocol 1 */}
                  <div 
                    onClick={() => togglePledge('destigmatize')} 
                    className={`protocol-toggle-badge ${pledges.destigmatize ? 'active' : ''}`}
                  >
                    <span style={{ fontSize: '1rem', color: '#00ff88' }}>{pledges.destigmatize ? '☑' : '☐'}</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.72rem', color: pledges.destigmatize ? '#00ff88' : '#fff' }}>
                        I. DE-STIGMATIZE CLINICAL TERMINOLOGY
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.64rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                        Commit to speaking of biological variations rather than clinical diseases, brokenness, or medical deficits.
                      </span>
                    </div>
                  </div>

                  {/* Protocol 2 */}
                  <div 
                    onClick={() => togglePledge('accommodate')} 
                    className={`protocol-toggle-badge ${pledges.accommodate ? 'active' : ''}`}
                  >
                    <span style={{ fontSize: '1rem', color: '#00ff88' }}>{pledges.accommodate ? '☑' : '☐'}</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.72rem', color: pledges.accommodate ? '#00ff88' : '#fff' }}>
                        II. RESPECT REACTOR METRICS & SENSORY BATTERIES
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.64rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                        Adjust sensory triggers (sounds, flashes, compliance demands) and respect isolation recharging cycles without guilt.
                      </span>
                    </div>
                  </div>

                  {/* Protocol 3 */}
                  <div 
                    onClick={() => togglePledge('explicitComms')} 
                    className={`protocol-toggle-badge ${pledges.explicitComms ? 'active' : ''}`}
                  >
                    <span style={{ fontSize: '1rem', color: '#00ff88' }}>{pledges.explicitComms ? '☑' : '☐'}</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.72rem', color: pledges.explicitComms ? '#00ff88' : '#fff' }}>
                        III. BRIDGES OF EXPLICIT COMMUNICATION
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.64rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                        Reject double-empathy guessing. Formulate direct, clear verbal expectations of boundaries, tasks, and energy.
                      </span>
                    </div>
                  </div>

                </div>

                {/* Print terminal name entry */}
                {!passportGranted ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        placeholder="[ ENTER CITIZEN NAME... ]"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          background: 'rgba(4, 6, 12, 0.8)',
                          borderWidth: '1.5px',
                          borderStyle: 'solid',
                          borderColor: 'rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontFamily: 'monospace',
                          fontSize: '0.74rem',
                          outline: 'none'
                        }}
                      />
                      <button 
                        onClick={handleGeneratePassport} 
                        disabled={!citizenName.trim() || !allPledgesChecked}
                        className="hud-btn"
                        style={{
                          opacity: (citizenName.trim() && allPledgesChecked) ? 1 : 0.4,
                          cursor: (citizenName.trim() && allPledgesChecked) ? 'pointer' : 'not-allowed'
                        }}
                      >
                        [ ⚡ PRINT PASSPORT ]
                      </button>
                    </div>
                    {!allPledgesChecked && (
                      <span style={{ fontSize: '0.58rem', fontFamily: 'monospace', color: '#ffb300', textAlign: 'center' }}>
                        *ACTIVATE ALL 3 COLONY PROTOCOLS TO INITIALIZE PASSPORT GENERATOR
                      </span>
                    )}
                  </div>
                ) : (
                  /* Gorgeous Generated Security Passport Card Graphic */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
                    
                    <div className="colony-passport-print-card">
                      {/* Telemetry framing anchors */}
                      <div style={{ position: 'absolute', top: '8px', left: '8px', width: '6px', height: '6px', borderTop: '2px solid #00ff88', borderLeft: '2px solid #00ff88' }}></div>
                      <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', borderTop: '2px solid #00ff88', borderRight: '2px solid #00ff88' }}></div>
                      <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '6px', height: '6px', borderBottom: '2px solid #00ff88', borderLeft: '2px solid #00ff88' }}></div>
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '6px', height: '6px', borderBottom: '2px solid #00ff88', borderRight: '2px solid #00ff88' }}></div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0, 255, 136, 0.3)', paddingBottom: '6px', marginBottom: '10px' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: '#00ff88', fontWeight: 'bold' }}>ARES COLONY INTEGRITY SECURITY</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: '#00ff88' }}>ID: {passportId || '-----'}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        {/* Futuristic Barcode SVG */}
                        <svg viewBox="0 0 40 40" style={{ width: '45px', height: '45px', background: '#04060c', padding: '3px', borderRadius: '4px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#00ff88' }}>
                          <line x1="4" y1="5" x2="4" y2="35" stroke="#00ff88" strokeWidth="1.5" />
                          <line x1="8" y1="5" x2="8" y2="35" stroke="#00ff88" strokeWidth="0.8" />
                          <line x1="12" y1="5" x2="12" y2="35" stroke="#00ff88" strokeWidth="2.5" />
                          <line x1="18" y1="5" x2="18" y2="35" stroke="#00ff88" strokeWidth="0.5" />
                          <line x1="22" y1="5" x2="22" y2="35" stroke="#00ff88" strokeWidth="1.5" />
                          <line x1="28" y1="5" x2="28" y2="35" stroke="#00ff88" strokeWidth="3" />
                          <line x1="34" y1="5" x2="34" y2="35" stroke="#00ff88" strokeWidth="1" />
                        </svg>
                        
                        <div style={{ textAlign: 'left', fontFamily: 'monospace', fontSize: '0.62rem', color: '#fff', lineHeight: 1.5 }}>
                          <div>CITIZEN: <strong style={{ color: '#00ff88', textTransform: 'uppercase' }}>{citizenName}</strong></div>
                          <div>CLEARANCE: <span style={{ color: '#00ff88', fontWeight: 'bold' }}>CLASS-A ADVOCATOR</span></div>
                          <div>SECTOR DECK: <span style={{ color: '#00ff88' }}>COGNITIVE BIOSPHERE</span></div>
                          <div>STATUS: <strong style={{ color: '#00ff88', textShadow: '0 0 4px rgba(0,255,136,0.3)' }}>NOMINAL BRIDGE LOCKED</strong></div>
                        </div>
                      </div>

                      <div style={{ marginTop: '10px', paddingTop: '6px', borderTop: '1px dashed rgba(0, 255, 136, 0.3)', textAlign: 'center', fontSize: '0.48rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                        *COMMITTED TO DE-STIGMATIZING, ACCOMMODATING, & MUTUAL SYNC
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '6px' }}>
                      <button 
                        onClick={handleCopyLink} 
                        className="hud-btn" 
                        style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#00ff88', color: '#00ff88', fontSize: '0.65rem', background: copied ? 'rgba(0, 255, 136, 0.15)' : 'rgba(0, 255, 136, 0.04)' }}
                      >
                        {copied ? '[ ✓ PASSPORT SECURED ]' : '[ 📋 COPY CITIZEN TRANSMISSION LINK ]'}
                      </button>
                      <button onClick={() => { setPassportGranted(false); setCitizenName(''); }} className="hud-btn" style={{ fontSize: '0.65rem' }}>
                        [ ✕ RE-KEY CITIZEN ENTRY ]
                      </button>
                    </div>

                    {/* Social share anchors */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', width: '100%', maxWidth: '380px' }}>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="audio-deck-btn" style={{ textDecoration: 'none' }}>🔗 LinkedIn</a>
                      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="audio-deck-btn" style={{ textDecoration: 'none' }}>🐦 Twitter / X</a>
                    </div>

                  </div>
                )}

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

// Cancel speech helper on page index shift
function stopUtterance() {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.cancel();
  }
}

// Dynamic styles variables specifically for Exhibit 5 story tabs
const styles = {
  storyTabBtn: {
    padding: '8px 4px',
    background: 'rgba(6,9,20,0.65)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.6)',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  storyTabBtnActive: {
    background: 'rgba(0, 255, 136, 0.08)',
    borderColor: '#00ff88',
    color: '#00ff88',
    boxShadow: '0 0 8px rgba(0, 255, 136, 0.15)'
  }
};

// Static Lexicon items definitions (Coordinate star nodes)
const LEXICON_ITEMS = [
  {
    id: 'autistic-burnout',
    title: 'Burnout',
    pronunciation: '/ɔːˈtɪs.tɪk ˈbɜːn.aʊt/',
    category: 'energy',
    cx: 30, cy: 35,
    shortDef: 'Mental, emotional, and physical reactor core system collapse.',
    longDef: 'Autistic burnout is a deep physiological and executive functioning crash caused by the chronic trauma of forcing compliance, masking behaviors, and surviving toxic sensory or social environments. Recovery is not solved by working harder, but through long-term sensory rest and radical unmasking.',
    storyReflection: 'In my early 20s, I hit severe burnout driven by bullying and harassment in the second special needs school. Executive failure made me believe I would never make friends.',
    takeaway: 'Provide absolute sensory downtime. Cut off demands, drop compliance expectations, and prioritize self-care and radical unmasking.'
  },
  {
    id: 'social-battery',
    title: 'Reactor Battery',
    pronunciation: '/ðə ˈsoʊ.ʃəl ˈbæt.ər.i/',
    category: 'energy',
    cx: 55, cy: 75,
    shortDef: 'The finite daily energy budget allotted for parsing social telemetry.',
    longDef: 'An autistic mind processes social signals manually with high CPU overclock cost, rather than filtering them out automatically. When the reactor battery is depleted, the nervous system initiates emergency fuel conservation, triggering silence or withdrawal.',
    storyReflection: 'During grade school and Yeshiva, I struggled to understand why socializing was so exhausting, manually scripting normal reactions until my battery bottomed out.',
    takeaway: 'Quiet rest or isolating to recharge is a vital biological necessity, not anti-social behavior or rejection.'
  },
  {
    id: 'masking',
    title: 'Masking',
    pronunciation: '/ˈmæsk.ɪŋ/',
    category: 'social',
    cx: 65, cy: 25,
    shortDef: 'Exhausting performance of mimicking normal behaviors to avoid exclusion.',
    longDef: 'Masking is a trauma-driven coping response where the individual choreographs eye contact, suppresses stims, and scripts conversations. While it shields from immediate harassment, it extracts a massive metabolic tax, causing depression and self-alienation.',
    storyReflection: 'My grade school yeshiva years were a constant performance of normalcy. Lacking understanding, I faked the facade until I acted out in classrooms.',
    takeaway: 'Challenge compliance expectations. Drop demands for normal eye contact or still postures in class or meetings.'
  },
  {
    id: 'unmasking',
    title: 'Unmasking',
    pronunciation: '/ʌnˈmæsk.ɪŋ/',
    category: 'social',
    cx: 90, cy: 85,
    shortDef: 'The radical healing journey of shedding cognitive camouflage.',
    longDef: 'Unmasking is the deep process of unlearning neuronormative programming. It involves reclaiming your sensory limits, allowing natural body stims, and honoring neurological boundaries without self-blame.',
    storyReflection: 'Discovering the neurodiversity paradigm was my portal to unmasking. I stopped pathologizing my boundaries and began accepting my natural wiring.',
    takeaway: 'Celebrate differences. Create safe biospheres where neurodivergent individuals can express themselves authentically.'
  },
  {
    id: 'double-empathy',
    title: 'Double Empathy',
    pronunciation: '/ˈdʌb.əl ˈem.pə.θi/',
    category: 'social',
    cx: 110, cy: 40,
    shortDef: 'Bidirectional mismatches in empathy across diverging neurotypes.',
    longDef: 'Formulated by Dr. Damian Milton, it debunks the myth that autistic people lack empathy. Breakdowns are two-way, resulting from diverging software and communication wires, not a clinical deficit in the autistic mind.',
    storyReflection: 'In my early 20s, I misread silent disengagement as rejection. I didn\'t understand their battery was simply dead, leading to accidental boundary overruns.',
    takeaway: 'Encourage explicit verbal communication. Never assume NT styles are correct; validate both styles as equal.'
  },
  {
    id: 'rsd',
    title: 'RSD',
    pronunciation: '/rɪˈdʒek.ʃən ˈsen.sɪ.tɪv dɪsˈfɔːr.i.ə/',
    category: 'social',
    cx: 130, cy: 90,
    shortDef: 'Extreme emotional pain response triggered by perceived rejection.',
    longDef: 'Rejection Sensitive Dysphoria is an involuntary neurological reflex where perceived criticism or social exclusion is experienced as physical pain, caused by a nervous system primed by thousands of developmental correction logs.',
    storyReflection: 'When peers went silent, my RSD triggered immense panic, leading me to rush comms and accidentally overrun boundaries in an attempt to secure reassurance.',
    takeaway: 'Communicate boundaries clearly and explicitly. Reassure the individual that quietude is energy-based, not rejection.'
  },
  {
    id: 'pda',
    title: 'PDA Profile',
    pronunciation: '/pərˈveɪ.sɪv draɪv fɔːr ɔːˈtɒn.ə.mi/',
    category: 'cognitive',
    cx: 155, cy: 30,
    shortDef: 'A Pervasive Drive for Autonomy; demands trigger threat alarms.',
    longDef: 'Historically pathologized as "Demand Avoidance," neurodivergent advocates reframe it as a Pervasive Drive for Autonomy. Ordinary, externalized expectations are perceived by the nervous system as direct threats, triggering fight/flight locks.',
    storyReflection: 'Being forced into locked schedules or rigid behavioral protocols triggered my anxiety alarms, causing me to call out and resist yeshiva demands.',
    takeaway: 'Employ egalitarian, collaborative relationships. Offer choice-based environments and utilize non-directive language.'
  },
  {
    id: 'inertia',
    title: 'Inertia',
    pronunciation: '/ɔːˈtɪs.tɪk ɪˈnɜː.ʃə/',
    category: 'cognitive',
    cx: 175, cy: 80,
    shortDef: 'Physiological resistance to starting or transitioning tasks.',
    longDef: 'Autistic inertia represents the physical momentum of deep attention focus. Starting a new task, stopping an ongoing focus channel, or redirecting energy requires massive executive metabolic expenditure.',
    storyReflection: 'Shifting classes in Yeshiva or halting hyperfocus zones was highly taxing. Abrupt classroom transitions felt like intense structural friction.',
    takeaway: 'Plan buffer transitions. Provide advance visual or verbal countdown alerts, and respect active deep flow states.'
  },
  {
    id: 'meltdowns',
    title: 'Meltdowns',
    pronunciation: '/ˈmelt.daʊnz/',
    category: 'energy',
    cx: 200, cy: 45,
    shortDef: 'Involuntary survival crashes of an overloaded nervous system.',
    longDef: 'When sensory and cognitive inputs trip the system breaker, the brain initiates a survival lock (fight/flight meltdowns, or freeze/dissociate shutdowns). These are biological reflexes, never tantrums or behavioral choices.',
    storyReflection: 'In Yeshiva, when sensory levels maxed out, I acted out in classrooms—it was an involuntary safety breaker trip, but staff treated it as bad behavior.',
    takeaway: 'Provide absolute safety. Dim lights, eliminate auditory inputs, remain patient, and never demand rational dialogue.'
  },
  {
    id: 'monotropism',
    title: 'Monotropism',
    pronunciation: '/ˌmɒn.əˈtrɒp.ɪk ˈfoʊ.kəs/',
    category: 'cognitive',
    cx: 210, cy: 70,
    shortDef: 'A specialist focus style allocating attention to concentrated channels.',
    longDef: 'Unlike polytropic minds that distribute attention across shallow waves, monotropic minds funnel resources into a single focus tunnel. This enables incredible hyperfocus and meticulous pattern parsing, but makes transitions highly friction-prone.',
    storyReflection: 'My specialized hyperfocus channels allowed me to master intricate data logs (like yeshiva texts or mapping), but sudden interruptions caused deep distress.',
    takeaway: 'Respect flow tracks. Let individuals finish their attention loops, and avoid sudden sensory intrusions.'
  }
];
