import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, RotateCcw, AlertCircle, Info, Volume2, VolumeX, Shield, Award, 
  Brain, Wind, Activity, Heart, Eye, Zap, Sparkles, BookOpen, AlertOctagon 
} from 'lucide-react';

interface BreathingPattern {
  name: string;
  description: string;
  mentalBenefits: string;
  physicalBenefits: string;
  science: string;
  bestSituation: string;
  steps: {
    type: 'inhale' | 'hold' | 'exhale' | 'holdEmpty';
    duration: number;
    text: string;
  }[];
}

const BREATHING_PATTERNS: Record<string, BreathingPattern> = {
  box: {
    name: 'Tactical Box Breathing (4-4-4-4)',
    description: 'A structural tactical breathing protocol utilized by elite responders to suppress extreme performance anxiety and regain clear focus.',
    mentalBenefits: 'Immediately silences intrusive warning thoughts, enhances decision-making latency, and clears severe cognitive panic.',
    physicalBenefits: 'Suppresses adrenaline spikes, slows rapid tachycardia (racing heart), and relaxes clenching shoulder belts.',
    science: 'Recruits prefrontal cortex attention grids to suppress active amygdala distress, shifting autonomic balance from fight-or-flight back to homeostasis.',
    bestSituation: 'Use immediately before high-stakes exams, oral presentations, or whenever you experience short-term acute panic.',
    steps: [
      { type: 'inhale', duration: 4, text: 'Breathe in slowly through your nose, expanding your ribs...' },
      { type: 'hold', duration: 4, text: 'Suspend your breath, keeping your throat relaxed and still...' },
      { type: 'exhale', duration: 4, text: 'Sigh out completely from your mouth, releasing muscle tension...' },
      { type: 'holdEmpty', duration: 4, text: 'Maintain empty lungs. Allow your heartbeat to settle...' }
    ]
  },
  relaxing: {
    name: '4-7-8 Deep Parasympathetic Pacer',
    description: 'Developed by Dr. Andrew Weil, this serves as a natural nervous system tranquilizer that rapidly overrides anxiety loops.',
    mentalBenefits: 'Discharges circular obsessive worry, induces tranquil mental grounding, and promotes somatic bedtime calmness.',
    physicalBenefits: 'Dramatically shifts energy to the vagus nerve trunk and clears residual carbon, preparing muscles for deep rest.',
    science: 'Prolonging the exhalation phase to 8 seconds recruits vagal stretch-baroreceptors which trigger deep systemic releases of acetylcholine.',
    bestSituation: 'Use during bedtime sleep difficulties, chronic late-night overthinking, or immediately following an interpersonal conflict.',
    steps: [
      { type: 'inhale', duration: 4, text: 'Inhale quietly and deeply through your nose...' },
      { type: 'hold', duration: 7, text: 'Hold your breath. Allow oxygen to fully oxygenate your blood cells...' },
      { type: 'exhale', duration: 8, text: 'Exhale fully with a soft, audible friction sound from your lips...' }
    ]
  },
  belly: {
    name: 'Diaphragmatic Abdominal Pacing',
    description: 'A core somatic technique focusing deep expansion down into the abdomen to optimize alveolar gas exchange volume.',
    mentalBenefits: 'Re-centers bodily awareness, eliminates abstract intellectual detachment, and restores emotional grounding.',
    physicalBenefits: 'Relieves chronic thoracic/rib strain, increases lower lung ventilation efficiency, and targets digestive muscles.',
    science: 'Forces thoracic expansion which activates the Hering-Breuer inhibitory reflex, directly checking excessive rapid breathing cycles.',
    bestSituation: 'Ideal after sitting at your study desk for hours, experiencing physical fatigue, or speaking at length during presentations.',
    steps: [
      { type: 'inhale', duration: 5, text: 'Breathe deeply into your stomach, pushing your hand outwards...' },
      { type: 'hold', duration: 2, text: 'Maintain a peaceful, still posture...' },
      { type: 'exhale', duration: 5, text: 'Contract your abdominals, drawing your navel back toward your spine...' }
    ]
  },
  mindful: {
    name: 'Coherent Mindful Harmony (4-4)',
    description: 'An elegant, symmetrical rhythm designed for beginners to align state resonance and balance physiological frequencies.',
    mentalBenefits: 'Cultivates a gentle, sustained focal awareness and stops recursive cognitive multitasking.',
    physicalBenefits: 'Smoothes cardiovascular oscillation curves and promotes balanced autonomic output.',
    science: 'Engaging a symmetrical 1:1 respiratory frequency entrains cardiovascular blood pressure waves with breathing cycles.',
    bestSituation: 'Highly effective during active study blocks, essay drafting, coding labs, or as a general morning baseline setup.',
    steps: [
      { type: 'inhale', duration: 4, text: 'Inhale slowly, observing the cool air path into your nostrils...' },
      { type: 'exhale', duration: 4, text: 'Exhale smoothly, releasing heavy shoulder weight into your chair...' }
    ]
  }
};

export default function BreathingTimer() {
  const [activePatternKey, setActivePatternKey] = useState<string>('box');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(BREATHING_PATTERNS.box.steps[0].duration);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  
  // Interactive diagram state
  const [diagramMode, setDiagramMode] = useState<'anatomy' | 'gas_exchange'>('anatomy');

  const pattern = BREATHING_PATTERNS[activePatternKey];
  const currentStep = pattern.steps[stepIndex];

  // Web Audio Context for ticks/chimes
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playChime = (frequency: number, type: 'sine' | 'triangle' = 'sine', duration = 0.15) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked in frame", e);
    }
  };

  // Reset timer on pattern change
  useEffect(() => {
    setIsActive(false);
    setStepIndex(0);
    setSecondsRemaining(pattern.steps[0].duration);
    setCompletedCycles(0);
  }, [activePatternKey]);

  // Main countdown loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            const nextIndex = (stepIndex + 1) % pattern.steps.length;
            setStepIndex(nextIndex);
            
            if (nextIndex === 0) {
              setCompletedCycles((c) => c + 1);
              playChime(523.25, 'triangle', 0.4); // C5 chime
            } else {
              playChime(392.00, 'sine', 0.2); // G4 chime
            }
            
            return pattern.steps[nextIndex].duration;
          } else {
            if (prev > 1) {
              playChime(261.63, 'sine', 0.04); // C4 short tick
            }
            return prev - 1;
          }
        });
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, stepIndex, activePatternKey, soundEnabled]);

  const toggleTimer = () => {
    if (soundEnabled && !audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn(e);
      }
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setStepIndex(0);
    setSecondsRemaining(pattern.steps[0].duration);
    setCompletedCycles(0);
  };

  // Helper values for dynamic motion state
  const getMotionProps = () => {
    if (!isActive) return { scale: 1.0, color: '#6366f1', glow: 'rgba(99, 102, 241, 0.1)', text: 'Ready' };
    
    switch (currentStep.type) {
      case 'inhale':
        return { 
          scale: 1.4, 
          color: '#4f46e5', // dark indigo
          glow: 'rgba(79, 70, 229, 0.45)', 
          text: 'Inhale • Expanding' 
        };
      case 'hold':
        return { 
          scale: 1.4, 
          color: '#f59e0b', // amber
          glow: 'rgba(245, 158, 11, 0.45)', 
          text: 'Hold • Suspension' 
        };
      case 'exhale':
        return { 
          scale: 0.85, 
          color: '#0ea5e9', // light sky blue
          glow: 'rgba(14, 165, 233, 0.35)', 
          text: 'Exhale • Releasing' 
        };
      case 'holdEmpty':
        return { 
          scale: 0.65, 
          color: '#64748b', // slate
          glow: 'rgba(100, 116, 139, 0.15)', 
          text: 'Pause • Still Empty' 
        };
      default:
        return { scale: 1.0, color: '#6366f1', glow: 'rgba(99, 102, 241, 0.1)', text: 'Ready' };
    }
  };

  const motionProps = getMotionProps();

  return (
    <div id="breathing_timer_section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 border border-indigo-100/40">
          <Wind className="h-3.5 w-3.5" />
          <span>Section 2 • Somatic Respiratory Laboratory</span>
        </span>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Visual Breathing Regulator
        </h1>
        <p className="font-sans text-base text-slate-500 leading-relaxed">
          Realign your neural pathways in real-time. Choose a science-backed pulmonary cadence to suppress adrenaline markers and immediately restore cognitive command.
        </p>
      </div>

      {/* Main Interactive Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left column: Patterns list & details */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 text-left">
          
          {/* List group */}
          <div className="rounded-3xl border border-slate-150/60 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-display text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              1. Choose Cardiovascular Cadence
            </h3>
            <div className="space-y-3">
              {Object.entries(BREATHING_PATTERNS).map(([key, item]) => {
                const isSelected = activePatternKey === key;
                return (
                  <button
                    key={key}
                    id={`pattern_btn_${key}`}
                    onClick={() => setActivePatternKey(key)}
                    className={`w-full rounded-2xl p-4 text-left border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/50 border-indigo-500 shadow-md shadow-slate-200/40 font-bold'
                        : 'border-slate-150 bg-white hover:border-slate-350 hover:bg-slate-50/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-sans text-xs font-bold text-slate-900">{item.name}</h4>
                      {isSelected && <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse shrink-0" />}
                    </div>
                    <p className="mt-1.5 font-sans text-[11px] text-slate-500 leading-normal">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Benefits Detail Card */}
          <div className="rounded-3xl bg-indigo-950 text-white p-6 shadow-lg space-y-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="rounded-full bg-indigo-900 px-2.5 py-0.5 font-mono text-[9px] font-bold text-indigo-300 uppercase border border-indigo-800/40">
                ACTIVE CLINICAL PROFILE
              </span>
              <h4 className="font-display text-base font-bold text-white">{pattern.name}</h4>
              
              <div className="space-y-3 text-xs leading-relaxed font-sans mt-2">
                <div className="flex items-start space-x-2.5">
                  <Brain className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-250 block text-slate-200 uppercase text-[10px] tracking-wider mb-0.5">Cognitive/Mental Benefits</strong>
                    <span className="text-slate-350 text-slate-300">{pattern.mentalBenefits}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 border-t border-white/5 pt-3">
                  <Activity className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-250 block text-slate-200 uppercase text-[10px] tracking-wider mb-0.5">Somatic/Physical Benefits</strong>
                    <span className="text-slate-350 text-slate-300">{pattern.physicalBenefits}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 border-t border-white/5 pt-3">
                  <Shield className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-250 block text-slate-200 uppercase text-[10px] tracking-wider mb-0.5">Best Application Window</strong>
                    <span className="text-emerald-350 text-emerald-400 font-medium">{pattern.bestSituation}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 text-[10px] text-slate-400 leading-normal">
              <strong>Neuro-biology:</strong> {pattern.science}
            </div>
          </div>

        </div>

        {/* Right column: Beautiful motion respiratory stage */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-150/60 bg-white p-6 md:p-8 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden">
          
          {/* Top Bar Status of active visualizer */}
          <div className="w-full flex justify-between items-center border-b border-slate-100 pb-4 mb-2">
            <div className="text-left">
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black">PACING RING</span>
              <h4 className="font-sans text-sm font-bold text-slate-800">{pattern.name}</h4>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-indigo-50/80 px-3 py-1.5 border border-indigo-100/30 flex items-center space-x-1">
                <Award className="h-4 w-4 text-indigo-600" />
                <span className="font-mono text-xs font-black text-indigo-950">CYCLES: {completedCycles}</span>
              </div>

              <button
                id="toggle_chimes_sound"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all cursor-pointer ${
                  soundEnabled
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                    : 'border-slate-200 text-slate-400 hover:text-slate-600'
                }`}
                title={soundEnabled ? 'Mute pacer' : 'Unmute pacer'}
              >
                {soundEnabled ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {/* Visual stage enclosing the organic motion.div sphere */}
          <div className="relative flex h-80 w-full items-center justify-center">
            {/* Background alignment reference circle */}
            <div className="absolute h-48 w-48 rounded-full border-2 border-slate-100/75 border-slate-100" />
            
            {/* Pulsing ambient rings */}
            <AnimatePresence>
              {isActive && currentStep.type === 'inhale' && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: currentStep.duration, ease: "easeOut", repeat: Infinity }}
                  className="absolute h-48 w-48 rounded-full bg-indigo-200/25 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* HIGH-FIDELITY FLUID RESPIRATORY CORE */}
            <motion.div
              id="breathing_visual_sphere"
              animate={{ 
                scale: motionProps.scale,
                backgroundColor: motionProps.color,
                boxShadow: `0 0 35px ${motionProps.glow}`,
                borderColor: motionProps.color
              }}
              transition={{ 
                duration: isActive ? currentStep.duration : 0.8, 
                ease: "easeInOut" 
              }}
              className="flex h-44 w-44 items-center justify-center rounded-full border-4 text-white text-center relative z-10"
            >
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-widest font-black text-white/70">
                  {secondsRemaining}s
                </span>
                <span className="block font-display text-4xl font-extrabold font-display leading-none">
                  {secondsRemaining}
                </span>
                <span className="block font-sans text-[9px] font-semibold text-white/80 uppercase">
                  Remaining
                </span>
              </div>
            </motion.div>
          </div>

          {/* Core instruction text prompt */}
          <div className="h-10 mt-1 mb-6 flex items-center justify-center max-w-sm">
            <p className="font-sans text-sm font-semibold text-slate-800 leading-normal">
              {isActive ? currentStep.text : 'Click "Start Pacing Lab" to begin the pulmonary synchronization.'}
            </p>
          </div>

          {/* Main action triggers */}
          <div className="flex items-center space-x-3.5 border-t border-slate-100 pt-5 w-full justify-center">
            <button
              id="breathing_play_pause_btn"
              onClick={toggleTimer}
              className={`flex items-center space-x-2 rounded-2xl px-8 py-3.5 text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/10'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/15'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="h-4.5 w-4.5 shrink-0 fill-white" />
                  <span>Pause Pacer</span>
                </>
              ) : (
                <>
                  <Play className="h-4.5 w-4.5 shrink-0 fill-white" />
                  <span>Start Pacing Lab</span>
                </>
              )}
            </button>

            <button
              id="breathing_reset_btn"
              onClick={resetTimer}
              className="flex items-center space-x-2 rounded-2xl border border-slate-205 border-slate-200 bg-white px-5 py-3.5 text-xs font-bold text-slate-655 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
            >
              <RotateCcw className="h-4.5 w-4.5 shrink-0" />
              <span>Reset</span>
            </button>
          </div>

          {/* Symmetrical step timeline cards */}
          <div className="mt-8 w-full">
            <span className="block font-mono text-[8px] tracking-widest uppercase font-black text-slate-400 mb-3 text-center">
              Pacing Sequence Timeline
            </span>
            <div className="grid grid-cols-4 gap-2 text-center bg-slate-50/15 p-1.5 rounded-2xl border border-slate-100">
              {pattern.steps.map((step, idx) => {
                const isCurrent = isActive && idx === stepIndex;
                return (
                  <div 
                    key={idx}
                    className={`rounded-xl p-3 border transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-white border-indigo-100 shadow-sm scale-102' 
                        : 'opacity-40 border-transparent bg-transparent'
                    }`}
                  >
                    <span className={`block font-mono text-[8px] font-black uppercase tracking-wider ${
                      isCurrent ? 'text-indigo-650 text-indigo-600' : 'text-slate-400'
                    }`}>
                      {step.type === 'holdEmpty' ? 'Hold Clear' : step.type}
                    </span>
                    <span className="block font-display text-base font-black text-slate-900 mt-1">
                      {step.duration}s
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* NEW: SCIENTIFIC DIAGRAMS & POSTURAL ALIGNMENT BLOCK */}
      <section className="rounded-3xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-8 shadow-sm">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-600" />
              <span>Instructional Anatomy & Physiological Diagrams</span>
            </h3>
            <p className="font-sans text-xs text-slate-505 text-slate-500 mt-0.5">Explore how skeletal musculatures and arterial pressure thresholds respond to paced entraining techniques.</p>
          </div>
          
          <div className="flex p-0.5 bg-slate-100 rounded-xl max-w-xs cursor-pointer">
            <button
              onClick={() => setDiagramMode('anatomy')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                diagramMode === 'anatomy' ? 'bg-white text-indigo-950 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Anatomy Baseline
            </button>
            <button
              onClick={() => setDiagramMode('gas_exchange')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                diagramMode === 'gas_exchange' ? 'bg-white text-indigo-950 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Gas Exchange Pathway
            </button>
          </div>
        </div>

        {/* Dynamic Diagram Visual Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Diagrams Left Column: Elegant SVG illustrations */}
          <div className="lg:col-span-6 flex justify-center bg-slate-50 border border-slate-100/70 rounded-2xl p-6 relative">
            
            {diagramMode === 'anatomy' ? (
              // SVG Abdominal expansion map
              <svg viewBox="0 0 400 300" className="w-full max-w-sm h-64">
                <defs>
                  <linearGradient id="lungGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Body skeleton lines */}
                <path d="M 120 280 L 120 180 C 120 120, 140 80, 200 80 C 260 80, 280 120, 280 180 L 280 280" fill="none" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
                <line x1="200" y1="40" x2="200" y2="120" stroke="#cbd5e1" strokeWidth="3" />
                
                {/* Lungs */}
                {/* Left lung */}
                <path d="M 190 120 Q 140 120, 140 180 Q 140 220, 190 200 Z" fill="url(#lungGrad)" className="animate-pulse" />
                {/* Right lung */}
                <path d="M 210 120 Q 260 120, 260 180 Q 260 220, 210 200 Z" fill="url(#lungGrad)" className="animate-pulse" />

                {/* Diaphragm dome */}
                <path d="M 130 230 Q 200 190, 270 230" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="3,3" />
                <path d="M 130 230 Q 200 240, 270 230" fill="none" stroke="#10b981" strokeWidth="4" />
                
                {/* Annotation Lines */}
                <line x1="200" y1="215" x2="310" y2="215" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="200" cy="215" r="3" fill="#94a3b8" />
                <text x="315" y="218" className="font-mono text-[9px] font-bold fill-slate-500">DIAPHRAGM DESCENDS</text>

                <line x1="220" y1="160" x2="310" y2="130" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="220" cy="160" r="3" fill="#4f46e5" />
                <text x="315" y="133" className="font-mono text-[9px] font-bold fill-slate-500">ALVEOLAR DILATION</text>
              </svg>
            ) : (
              // SVG Gas Exchange Pathway
              <svg viewBox="0 0 400 300" className="w-full max-w-sm h-64">
                <circle cx="200" cy="150" r="80" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                {/* Blood capillary */}
                <path d="M 80 200 Q 200 130, 320 200" fill="none" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
                
                {/* CO2 indicator dots passing */}
                <circle cx="120" cy="170" r="4.5" fill="#38bdf8" />
                <circle cx="150" cy="160" r="4.5" fill="#38bdf8" />
                <circle cx="180" cy="160" r="4.5" fill="#38bdf8" />
                <text x="130" y="222" className="font-mono text-[8px] font-black fill-cyan-600">CO2 DISCHARGE BALANCE</text>

                {/* O2 exchange visual flow */}
                <path d="M 210 110 L 250 160" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 250 160 L 240 155 M 250 160 L 248 148" fill="none" stroke="#10b981" strokeWidth="2" />
                <text x="220" y="98" className="font-mono text-[9px] font-bold fill-emerald-600">O2 ABSORB SYMMETRY</text>

                <circle cx="260" cy="180" r="4" fill="#ef4444" />
                <circle cx="280" cy="190" r="4" fill="#ef4444" />
                <circle cx="300" cy="195" r="4" fill="#ef4444" />
                <text x="215" y="255" className="font-mono text-[8px] font-bold fill-rose-500">HEMOGLOBIN DELIVERS OXYGEN</text>
              </svg>
            )}

          </div>

          {/* Diagrams Right Column: Structured Educational Copy (lg:col-span-6) */}
          <div className="lg:col-span-6 text-left space-y-5">
            {diagramMode === 'anatomy' ? (
              <div className="space-y-4 font-sans text-xs">
                <span className="rounded bg-orange-50 px-2 py-0.5 font-mono text-[9px] font-bold text-orange-700 uppercase">
                  Biomechanical Dynamics
                </span>
                <h4 className="font-display text-base font-bold text-slate-900 leading-snug">The Mechanics of Diaphragmatic Breath</h4>
                
                <p className="text-slate-600 leading-relaxed border-l-2 border-indigo-500 pl-3">
                  Under stress, skeletal shoulder girdles contract. Upper thorax breathing engages, which reduces functional oxygen volume and forces rapid respiration rates to meet physical perfusion targets.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4.5 space-y-1">
                    <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-slate-400">Lower thoracic volume</span>
                    <p className="text-slate-500 leading-normal">Full descended abdominal movement creates downward negative pressure, inflating lung lobes.</p>
                  </div>
                  
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4.5 space-y-1">
                    <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-slate-400">Postural Axis Setup</span>
                    <p className="text-slate-500 leading-normal">Aligning cervical curves opens wind airways, preventing compression of local sensory baroreceptors.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 font-sans text-xs">
                <span className="rounded bg-sky-50 px-2 py-0.5 font-mono text-[9px] font-bold text-sky-700 uppercase">
                  Pulmonary Gaseous Exchange
                </span>
                <h4 className="font-display text-base font-bold text-slate-900 leading-snug">The CO₂ / Oxygen Acidosis Feedback Loop</h4>
                
                <p className="text-slate-600 leading-relaxed border-l-2 border-indigo-500 pl-3">
                  Shallow panting hyper-oxygenates blood initially but depletes arterial carbon reserves. This shifts blood alkalinity, triggering cerebral vascular constriction and causing dizzying study burnout.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4.5 space-y-1">
                    <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-slate-400">Alveolar Capillary dilation</span>
                    <p className="text-slate-500 leading-normal">Slow pacing restores metabolic carbon tension, allowing proper tissue extraction.</p>
                  </div>
                  
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4.5 space-y-1">
                    <span className="font-mono font-bold uppercase tracking-wider text-[10px] text-slate-400">Cardiovascular Entrainment</span>
                    <p className="text-slate-500 leading-normal">Aligns respiratory oscillation curves with respiratory heart-pumping waves to maximize efficiency.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </section>

    </div>
  );
}
