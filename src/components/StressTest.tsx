import { useState } from 'react';
import { assessmentQuestions } from '../data/assessment';
import { motion } from 'motion/react';
import { 
  ShieldCheck, HelpCircle, ArrowRight, ArrowLeft, RefreshCw, 
  AlertTriangle, CheckCircle, Info, Brain, Clipboard, ChevronRight,
  Sparkles, Heart, Activity, Sliders, Award, FileText, Share2
} from 'lucide-react';

type AnswerValue = 1 | 2 | 3 | 4 | 5;

const OPTION_LABELS: Record<AnswerValue, string> = {
  1: 'Never (Not observed at all)',
  2: 'Rarely (Observed once or twice)',
  3: 'Sometimes (Observed occasionally)',
  4: 'Often (Observed with high frequency)',
  5: 'Always (Consistent, daily occurrence)'
};

export default function StressTest() {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'overview' | 'breakdown' | 'action'>('overview');

  const totalQuestions = assessmentQuestions.length;
  const currentQuestion = assessmentQuestions[currentIndex];
  const isQuestionAnswered = answers[currentQuestion.id] !== undefined;

  const handleSelectAnswer = (value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setActiveAnalysisTab('overview');
  };

  // Score Calculation
  const totalScore = (Object.values(answers) as number[]).reduce((sum, val) => sum + val, 0);
  
  // Normalize Stress Index to a percentage format (min possible is 20, max is 100)
  // Formula: ((Score - 20) / 80) * 100
  const stressIndexPercent = totalScore > 0 ? Math.round(((totalScore - 20) / 80) * 100) : 0;

  // Calculate category averages
  const getCategoryMetrics = () => {
    const categories = {
      emotional: { sum: 0, count: 0, maxPossible: 0 },
      physical: { sum: 0, count: 0, maxPossible: 0 },
      behavioral: { sum: 0, count: 0, maxPossible: 0 },
      academic: { sum: 0, count: 0, maxPossible: 0 }
    };

    assessmentQuestions.forEach((q) => {
      const score = answers[q.id] || 0;
      if (score > 0) {
        categories[q.category].sum += score;
        categories[q.category].count += 1;
        categories[q.category].maxPossible += 5;
      }
    });

    return Object.entries(categories).map(([key, data]) => {
      const ratio = data.count > 0 ? (data.sum / data.maxPossible) * 100 : 0;
      return {
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1) + ' Stressor',
        percentage: Math.round(ratio),
        sum: data.sum,
        count: data.count,
        maxPossible: data.maxPossible
      };
    });
  };

  const categoryMetrics = getCategoryMetrics();

  // Dominant stress category
  const getHighestStressor = () => {
    let maxPct = -1;
    let highest = 'academic';
    categoryMetrics.forEach((m) => {
      if (m.percentage > maxPct) {
        maxPct = m.percentage;
        highest = m.id;
      }
    });
    return highest;
  };

  const dominantStressor = getHighestStressor();

  // Clinical Interpretations out of 100% Stress Index
  const getInterpretation = (percent: number) => {
    if (percent <= 20) {
      return {
        level: 'Very Calm (Optimal Parasympathetic Balance)',
        colorText: 'text-emerald-700',
        bgColor: 'bg-emerald-50 border-emerald-100',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        ringColor: 'stroke-emerald-500',
        badgeText: 'Very Calm',
        levelCode: 'LEVEL_1_OPTIMAL',
        description: 'Your autonomic nervous system is demonstrating highly stable parameters. Cortisol thresholds are wellregulated, allowing your prefrontal cortex to operate with maximal energy efficiency, structural memory retrieval, and excellent sleep quality.',
        action: 'Maintain your current lifestyle homeostasis. Reinforce this active resilient shield by practicing daily grounding and occasional diaphragmatic chest alignment to preserve your physical and neural buffer.'
      };
    } else if (percent <= 45) {
      return {
        level: 'Mild Stress (Undergraduate Academic Strain)',
        colorText: 'text-sky-700',
        bgColor: 'bg-sky-50 border-sky-100',
        badgeColor: 'bg-sky-100 text-sky-800',
        ringColor: 'stroke-sky-500',
        badgeText: 'Mild',
        levelCode: 'LEVEL_2_MILD',
        description: 'Early physiological and academic triggers are starting to surface. While your coping mechanisms are currently preventing widespread exhaustion, slight somatic irritation, mild bedtime over-analysis, or executive procrastination are observable.',
        action: 'Be proactive in boundary containment. Allocate consistent study blocks using the Pomodoro technique, integrate 5-minute breathing cycles between heavy classes, and eliminate devices from the sleeping space by 9 PM.'
      };
    } else if (percent <= 70) {
      return {
        level: 'Moderate Corporate / Academic Overdrive',
        colorText: 'text-amber-700',
        bgColor: 'bg-amber-50 border-amber-100',
        badgeColor: 'bg-amber-100 text-amber-800',
        ringColor: 'stroke-amber-500',
        badgeText: 'Moderate',
        levelCode: 'LEVEL_3_MODERATE',
        description: 'Your sympathetic system is operating in persistent hyper-active overdrive. High cognitive workloads and constant deadlines are starting to overload working memory networks, resulting in clashing sleep structures and mental fatigue.',
        action: 'Active intervention is highly recommended. Set absolute thresholds on electronic devices, delegate non-essential administrative responsibilities, utilize somatic grounding rules, and share your emotional load with student peer support networks.'
      };
    } else if (percent <= 85) {
      return {
        level: 'High Stress Alert (Sympathetic Hyper-arousal)',
        colorText: 'text-orange-700',
        bgColor: 'bg-orange-50 border-orange-100',
        badgeColor: 'bg-orange-100 text-orange-850',
        ringColor: 'stroke-orange-500',
        badgeText: 'High Stress',
        levelCode: 'LEVEL_4_HIGH',
        description: 'Your nervous system is trapped in chronic hyper-arousal. Adrenal glands are releasing high amounts of adrenaline, manifesting in consistent muscle guarding (tight neck/jaw), recurrent tension headaches, and severe cognitive executive paralysis.',
        action: 'Initiate deliberate relaxation and somatic decompression protocols. Enforce rigid, non-negotiable breaks after lectures, strictly suspend caffeine ingestion after midday, implement Daily Progressive Muscle Relaxation, and consider scheduling a guidance check with a health professional.'
      };
    } else {
      return {
        level: 'Extreme Stress (Burnout Fatigue & Exhaustion)',
        colorText: 'text-rose-700',
        bgColor: 'bg-rose-50 border-rose-100',
        badgeColor: 'bg-rose-150 text-rose-900',
        ringColor: 'stroke-rose-600',
        badgeText: 'Extreme',
        levelCode: 'LEVEL_5_CRITICAL',
        description: 'You are showing classic biological symptoms of clinical academic burnout. Your biological reserves are depleted, yielding total cognitive cynicism, severe emotional flatness or volatility, memory gaps, and major immune suppression.',
        action: 'Acknowledge this state without self-judgment and prioritize clinical recovery as an emergency. Limit academic workloads where possible, establish rigid sleep sanitation protocols, and connect immediately with university counselors or mental health professionals to draft a structured, somatic recovery pathway.'
      };
    }
  };

  const interpretation = getInterpretation(stressIndexPercent);

  // Structural advice matching the dominant stressor zone
  const getStressorAdvice = (cat: string) => {
    switch (cat) {
      case 'academic':
        return {
          title: 'Optimize Cognitive Loading and Scheduling',
          mechanism: 'Deconstruct massive intellectual outputs into micro-milestones to bypass prefrontal overwhelm and executive paralysis.',
          tips: [
            { title: "Somatic Task Fractionation", text: "Do not gaze at the final exam or entire 30-page research project. Create micro-milestones (such as 'write exactly 150 words today' or 'review 3 terms'). This turns a vague threat into an actionable step." },
            { title: "The Pomodoro Neural Reset", text: "Incorporate strict 25-minute study intervals followed by a 5-minute physical reset. Walk outside your dorm, stretch your shoulders, or take deep gulps of water to clear cognitive waste." },
            { title: "Define the Endpoint Routine", text: "Create an active physical transition at the end of study sessions: pack away textbooks, close laptop screens, and step outdoors to signal a physiological transition to rest." }
          ]
        };
      case 'physical':
        return {
          title: 'Direct Somatic De-escalation & posturing',
          mechanism: 'Interrupt involuntary muscle guarding (unconscious physical tension) to signal safety to the brain via biofeedback.',
          tips: [
            { title: "Progressive Muscle Decompression", text: "Incorporate Progressive Muscle Relaxation (PMR) in bed. Deliberately tense muscle groups (calves, thighs, shoulders, jaw) for 7 seconds, then suddenly release to relieve involuntary shielding." },
            { title: "Midday Stimulant Elimination", text: "Set a rigid 1:00 PM cutoff for coffee and energy drinks. Caffeine blocks adenosine receptors, forcing continuous cortisol release and mimicking systemic physical worry cues." },
            { title: "Postural Re-alignment Checks", text: "Stress forces defensive physical posturing (hunched shoulders, shallow breathing). Set a silent hourly alarm to pull your shoulders down, align your neck, and take three deep diaphragmatic breaths." }
          ]
        };
      case 'emotional':
        return {
          title: 'Emotional Externalization & Grounding Loops',
          mechanism: 'Transition intense emotional processing from the reactive amygdala into the highly logical left hemisphere.',
          tips: [
            { title: "Expressive Express Writing", text: "Engage in honest, unedited 'brain dumps' in a notebook for 10 minutes. Putting nebulous anxiety into physical words diminishes the brain-fog effect and reduces mental load." },
            { title: "Apply Sensory Grounding", text: "Whenever a panic cycle is triggered, apply the 5-4-3-2-1 technique: identify 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste. This immediately quietens racing thoughts." },
            { title: "Affective Naming Protocol", text: "Label your emotional states objectively (e.g., say 'I am currently experiencing anticipatory academic worry' rather than 'I am failing'). Naming emotions reduces active amygdala reactivity." }
          ]
        };
      case 'behavioral':
        return {
          title: 'Habit Stabilization & Digital Boundary Systems',
          mechanism: 'Re-establish structural boundaries to prevent continuous stimulation and compulsive avoidance.',
          tips: [
            { title: "Digital Communication Containment", text: "Establish a strict 8:00 PM digital shutdown. Turn off push notifications and group chats to allow your brain's default mode network to enter a restorative state." },
            { title: "Avoid Comfort Escape Scrolling", text: "Proactively identify avoidance loops (e.g., opening video reels when you meant to study). Lock distracting apps using tools before starting lectures." },
            { title: "Structural Decision Delegation", text: "Avoid decision fatigue by planning simple daily choices (such as outfit selection, snack boxes, study spaces) the night before to save executive energy." }
          ]
        };
      default:
        return {
          title: 'General Autonomic Balance & Wellness',
          mechanism: 'Maintain somatic buffers to prevent unexpected environment strain from triggering overload.',
          tips: [
            { title: "Paced Diaphragmatic Breathing", text: "Integrate 5 minutes of paced diaphragmatic breathing twice daily to lower baseline sympathetic activation." },
            { title: "Sustained Hydration Protocols", text: "Mild physical dehydration mimics the symptoms of physiological panic. Ensure stable fluid intake throughout lectures." }
          ]
        };
    }
  };

  const stressorAdvice = getStressorAdvice(dominantStressor);
  const progressPercent = Math.round(((currentIndex + (answers[currentQuestion?.id] !== undefined ? 1 : 0)) / totalQuestions) * 100);

  // CSS variables for circular progress
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stressIndexPercent / 100) * circumference;

  return (
    <div id="stress_test_section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center space-x-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 border border-indigo-100/40">
          <Clipboard className="h-3.5 w-3.5" />
          <span>Validated Diagnostic Psychology Tool</span>
        </span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Academic Stress Diagnostic Index
        </h1>
        <p className="mt-3 font-sans text-base text-slate-500 leading-relaxed">
          Based on standard cognitive and somatic self-reporting scales. This 20-question psychometric tool evaluates stress loads across four critical categories: <strong>Emotional</strong>, <strong>Physical</strong>, <strong>Behavioral</strong>, and <strong>Academic</strong>, providing immediate research-backed recovery pathways.
        </p>
      </div>

      {!isSubmitted ? (
        /* Quiz interface */
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl rounded-2xl border border-slate-150/60 bg-white shadow-xl shadow-slate-100/50 overflow-hidden text-left"
        >
          {/* Progress Header */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4.5 flex justify-between items-center text-sm font-sans">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-800">PSY110 Standard Evaluation</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-slate-500 font-medium font-mono text-xs">q.{currentIndex + 1} / {totalQuestions}</span>
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-black text-indigo-700 border border-indigo-100/30">
              {progressPercent}% COMPLETE
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full bg-slate-100 h-2">
            <div 
              className="bg-indigo-600 h-2 transition-all duration-300 rounded-r-full" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Body */}
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-600">
                <Brain className="h-5 w-5 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest font-black leading-none">
                  {currentQuestion.category} domain
                </span>
              </div>
              
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentQuestion.text}
              </h2>
            </div>

            {/* Answer Options Grid */}
            <div className="space-y-3 pt-2">
              {([1, 2, 3, 4, 5] as AnswerValue[]).map((val) => {
                const isSelected = answers[currentQuestion.id] === val;
                return (
                  <button
                    key={val}
                    id={`option_btn_${val}`}
                    onClick={() => handleSelectAnswer(val)}
                    className={`w-full flex items-center justify-between rounded-xl px-5 py-4 text-left border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/60 border-indigo-500 text-indigo-950 font-bold shadow-sm shadow-indigo-100/10'
                        : 'border-slate-150 bg-white hover:border-slate-350 hover:bg-slate-50/40 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-all ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-600 text-white' 
                          : 'border-slate-300 text-slate-500'
                      }`}>
                        {val}
                      </div>
                      <span className="font-sans text-sm font-medium">{OPTION_LABELS[val]}</span>
                    </div>
                    
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Control Buttons */}
          <div className="border-t border-slate-100 px-6 py-5 bg-slate-50/50 flex justify-between items-center">
            <button
              id="btn_prev_question"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center space-x-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
                currentIndex === 0
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-transparent'
                  : 'border-slate-200 bg-white text-slate-650 hover:text-slate-950 hover:border-slate-350 cursor-pointer'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous Question</span>
            </button>

            <button
              id="btn_next_question"
              onClick={handleNext}
              disabled={!isQuestionAnswered}
              className={`flex items-center space-x-1.5 rounded-xl px-5 py-2.5 text-xs font-bold shadow-md transition-all ${
                isQuestionAnswered
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100/50 cursor-pointer hover:scale-[1.01]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>{currentIndex === totalQuestions - 1 ? 'Compute Diagnostic Report' : 'Next Question'}</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

        </motion.div>
      ) : (
        /* Results Report Display Dashboard */
        <div className="mx-auto max-w-4xl space-y-8 animate-fade-in text-left">
          
          <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 shadow-xl shadow-slate-100/40 space-y-8">
            
            {/* Main Score Header - Radial Gauge + Text */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-150/55 pb-8">
              
              {/* Circular Gauge */}
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
                <span className="font-mono text-xs uppercase tracking-widest font-black text-slate-400 mb-2">Overall Stress Index</span>
                <div className="relative h-40 w-40 flex items-center justify-center">
                  {/* Background Track Circle */}
                  <svg className="absolute transform -rotate-90 w-36 h-36">
                    <circle
                      cx="72"
                      cy="72"
                      r={radius}
                      className="stroke-slate-100"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    {/* Active Progress Circle */}
                    <circle
                      cx="72"
                      cy="72"
                      r={radius}
                      className={`transition-all duration-1000 ease-out ${interpretation.ringColor}`}
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Text labels inside ring */}
                  <div className="text-center z-10">
                    <span className="block text-4xl font-black text-slate-900 font-display">{stressIndexPercent}%</span>
                    <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest">STRESS LOAD</span>
                  </div>
                </div>
                
                <div className="font-sans text-xs text-slate-500 mt-3">
                  Absolute Score: <strong>{totalScore}</strong> / 100 max points
                </div>
                <div className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${interpretation.badgeColor}`}>
                  {interpretation.badgeText} Scale
                </div>
              </div>

              {/* Text diagnosis column */}
              <div className="md:col-span-8 space-y-4 text-left">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono tracking-widest font-black text-indigo-650 text-indigo-600">Clinical Diagnosis Level</span>
                  <h3 className={`font-display text-2xl font-black ${interpretation.colorText}`}>
                    {interpretation.level}
                  </h3>
                </div>
                
                <p className="font-sans text-sm text-slate-655 text-slate-600 leading-relaxed">
                  {interpretation.description}
                </p>
                
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/25 p-4 flex items-start space-x-3 shadow-xs">
                  <Info className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 animate-bounce" style={{ animationDuration: '3s' }} />
                  <div>
                    <h4 className="font-sans text-xs font-bold text-indigo-950 uppercase tracking-wider mb-1">Immediate Recovery Objective</h4>
                    <p className="font-sans text-xs text-slate-650 leading-relaxed">
                      {interpretation.action}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Segmented Controller for Results */}
            <div className="flex border-b border-slate-150 pb-px">
              {[
                { id: 'overview', label: 'Stressor Breakdown', icon: Sliders },
                { id: 'action', label: 'Prescribed Care Plan', icon: ShieldCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAnalysisTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-3 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                      activeAnalysisTab === tab.id
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-Tab Content 1: STRESSOR BREAKDOWN */}
            {activeAnalysisTab === 'overview' && (
              <div className="space-y-6 animate-fade-in pt-2">
                <div>
                  <h4 className="font-display text-lg font-bold text-slate-900">Functional Domain Comparison</h4>
                  <p className="font-sans text-xs text-slate-550">Examine how tensions map across the emotional, physical, behavioral, and academic spectrums.</p>
                </div>

                {/* SVG Bar Chart representing the 4 categories side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/70 border border-slate-100 rounded-2xl p-6">
                  
                  {/* Left Column: Visual Chart */}
                  <div className="md:col-span-7 space-y-5">
                    {categoryMetrics.map((met) => {
                      const isDominant = met.id === dominantStressor;
                      return (
                        <div key={met.id} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs font-sans">
                            <span className={`font-bold ${isDominant ? 'text-indigo-900 border-b-2 border-indigo-400' : 'text-slate-650'}`}>
                              {met.label} {isDominant && '• DOMINANT'}
                            </span>
                            <span className="font-mono font-black text-slate-900">{met.percentage}%</span>
                          </div>
                          
                          {/* Premium rounded track & bar */}
                          <div className="h-4 w-full bg-slate-200/60 rounded-full overflow-hidden shadow-inner flex">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${met.percentage}%` }}
                              transition={{ duration: 0.8 }}
                              className={`h-full rounded-full transition-all ${
                                isDominant 
                                  ? 'bg-gradient-to-r from-indigo-505 from-indigo-500 to-indigo-600 shadow-md shadow-indigo-200' 
                                  : met.percentage >= 60 
                                    ? 'bg-amber-500' 
                                    : 'bg-slate-450 bg-slate-400'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Comparative clinical text */}
                  <div className="md:col-span-5 space-y-4 font-sans text-xs leading-relaxed text-slate-650 border-t md:border-t-0 md:border-l border-slate-150 pt-5 md:pt-0 md:pl-6">
                    <span className="rounded bg-indigo-50 px-2.5 py-1 font-mono text-[9px] font-bold text-indigo-700 uppercase tracking-wider">
                      PSY110 Clinical Summary
                    </span>
                    <p>
                      Your primary psychological distress points are originating from the <strong className="text-slate-900 font-bold uppercase">{dominantStressor} domain</strong>, where your somatic and mental self-reporting scores register at continuous elevated levels.
                    </p>
                    <p>
                      In psychology, a clashing pattern (e.g., scoring high behaviorally but low physical) indicates cognitive avoidance states. Treating the primary somatic trigger first directly lowers autonomic tension in other zones.
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* Sub-Tab Content 2: PRESCRIBED ACTION PLAN */}
            {activeAnalysisTab === 'action' && (
              <div className="space-y-6 animate-fade-in pt-2">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-700 uppercase">
                    Prescribed Coping Schema
                  </span>
                  <h4 className="font-display text-xl font-bold text-slate-900 mt-2">
                    {stressorAdvice.title}
                  </h4>
                  <p className="font-sans text-sm text-slate-500 mt-1 leading-normal">
                    <strong>Therapeutic Action:</strong> {stressorAdvice.mechanism}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stressorAdvice.tips.map((tip, idx) => (
                    <div 
                      key={idx} 
                      className="rounded-xl border border-slate-100 bg-white p-5 space-y-3 shadow-xs hover:border-indigo-400/30 transition-all hover:scale-[1.01]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 font-mono text-xs font-black text-indigo-700 border border-indigo-100/20">
                        {idx + 1}
                      </div>
                      <h5 className="font-sans text-sm font-extrabold text-slate-900">{tip.title}</h5>
                      <p className="font-sans text-xs text-slate-550 leading-relaxed text-slate-500">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Academic Team Sign-off Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Scientific disclaimer box */}
            <div className="md:col-span-8 rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm text-left flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-2.5 text-slate-800">
                  <Award className="h-5.5 w-5.5 text-indigo-600 shrink-0" />
                  <h4 className="font-sans text-base font-bold text-slate-900">PSY110 University Submission Verification</h4>
                </div>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  This self-assessment dashboard acts as a research-level diagnostic model designed solely for educational display purposes under PSY110 supervision. This is not a substitute for clinical psychiatric care or medical advice. If you are experiencing persistent distress, please seek professional support channels.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  <span>Course: PSY110</span>
                  <span>•</span>
                  <span>Semester: Spring 2026</span>
                  <span>•</span>
                  <span>Instructor: Laraib Javaid</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <button
                  id="btn_mock_share"
                  onClick={() => alert("Diagnostic PDF download initiated! This simulates professional report printing.")}
                  className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download Clinical PDF</span>
                </button>
                <button
                  id="btn_mock_print"
                  onClick={() => alert("Copied research certificate link!")}
                  className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share Results</span>
                </button>
              </div>
            </div>

            {/* Restart Card Block */}
            <div className="md:col-span-4 rounded-2xl bg-slate-950 text-white p-6 md:p-8 flex flex-col justify-between text-left shadow-xl shadow-slate-250/20">
              <div className="space-y-3.5">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-indigo-400 leading-none">Diagnostic complete</span>
                <h4 className="font-display text-lg font-bold">Audit Your Status Regularly</h4>
                <p className="font-sans text-xs text-slate-350 leading-relaxed">
                  Re-evaluate your stress status every 14 days to audit whether physical adjustments, sleep routines, and breathing pacers are successfully lowering your systemic stress index.
                </p>
              </div>
              <button
                id="btn_restart_test"
                onClick={handleRestart}
                className="mt-6 w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-xs py-3.5 transition-colors cursor-pointer shadow-md shadow-indigo-650/30"
              >
                <RefreshCw className="h-4 w-4 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Restart Diagnostic</span>
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
