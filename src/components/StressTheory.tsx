import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Brain, ShieldAlert, School, Heart, Users, Sparkles, BookOpen, Clock, 
  FileText, AlertTriangle, Presentation, DollarSign, Briefcase, Activity, 
  Flame, Shield, Compass, UserCheck, Eye, Wind, Smile, HelpCircle, Dumbbell
} from 'lucide-react';

export default function StressTheory() {
  const [thermometerLevel, setThermometerLevel] = useState<number>(5);

  // Recommendations for each level of the Thermometer
  const getThermometerAdvice = (level: number) => {
    if (level <= 2) {
      return {
        levelName: 'Very Calm (Level 1-2)',
        colorText: 'text-emerald-600',
        bgColor: 'bg-emerald-50/50 border-emerald-100',
        barColor: 'bg-emerald-500',
        description: 'You are currently experiencing optimal physiological equilibrium. Heart rate variability is at healthy baseline parameters, your breathing cycle is slow and natural, and your prefrontal cortex has full access to executive processing. In this state, long-term memory consolidation and conceptual synthesis are at their absolute peak.',
        quote: "Homeostasis is the state of steady internal, physical, and chemical conditions maintained by living systems.",
        tips: [
          'Maintain your baseline sleep alignment: aim for identical sleeping hours even on study weekends.',
          'Practice brief diaphragmatic breathing routines daily to continue building your stress-resilient shield.',
          'Utilize this calm state to synthesize complex concepts and execute heavy cognitive assignments easily.'
        ]
      };
    } else if (level <= 4) {
      return {
        levelName: 'Mild Stress (Level 3-4)',
        colorText: 'text-sky-600',
        bgColor: 'bg-sky-50/50 border-sky-100',
        barColor: 'bg-sky-550 bg-sky-500',
        description: 'You are navigating standard academic or lifestyle loads, but mild indicators of sympathetic activation are creeping in. Subtle muscle stiffness around your chest or neck, mild bedtime over-analysis, and temporary executive procrastination are observable. Your biological buffer is absorbing the strain, but early management keeps the buffer clean.',
        quote: "Mild stress can act as a catalytic eustress, provided we implement regular rest boundaries to allow neural recovery.",
        tips: [
          'Practice Box Breathing (4s inhale, 4s hold, 4s exhale, 4s hold) for exactly three cycles during class transitions.',
          'Define the study endpoint: close all textbooks and silence notifications after 8:00 PM.',
          'Substitute afternoon caffeine or sweetened snacks with high-mineral hydration and walking breaks.'
        ]
      };
    } else if (level <= 6) {
      return {
        levelName: 'Moderate Stress (Level 5-6)',
        colorText: 'text-amber-600',
        bgColor: 'bg-amber-50/50 border-amber-100',
        barColor: 'bg-amber-500',
        description: 'Your autonomic nervous system is operating in persistent hyper-active overdrive. Cortisol levels are continuously elevated, causing your heart-rate baseline to rise. Memory recall and extended logical synthesis are starting to feel heavily fragmented, and the urge to engage in comfort avoidance habits (like endless checking or social media scrolling) has significantly increased.',
        quote: "Prolonged moderate stress results in working memory exhaustion and begins to degrade immune parameters.",
        tips: [
          'Enforce strict time barriers utilizing the Pomodoro Technique (25 minutes deep focus, 5 minutes physical rest).',
          'Conduct Progressive Muscle Relaxation (PMR) in bed to discharge involuntary somatic guarding (jaw/shoulder clenching).',
          'Write down a daily three-item priority matrix. Banish all secondary non-essential tasks from your current immediate window.'
        ]
      };
    } else if (level <= 8) {
      return {
        levelName: 'High Stress Alert (Level 7-8)',
        colorText: 'text-orange-600',
        bgColor: 'bg-orange-50/50 border-orange-100',
        barColor: 'bg-orange-500',
        description: 'You are entering sympathetic hyper-arousal. Adrenal glands are releasing high amounts of adrenaline, forcing rapid thoracic chest breathing, tight localized neck stiffness, and severe cognitive executive paralysis. Academic frustration is high, decision-making feels overwhelming, and you may experience episodic tension headaches or chronic sleep disruption.',
        quote: "High sympathetic load disables default-mode networks, preventing creative problem-solving and causing circular anxiety.",
        tips: [
          'Practice immediate somatic decompression: step completely away from study screens and walk outdoors in a green space for 20 minutes.',
          'Perform a 10-minute expressive journals brain-dump to get chaotic intrusive thoughts structured on external paper.',
          'Actively delegate peer project tasks where possible, and speak to classmates or family to coordinate workload support.'
        ]
      };
    } else {
      return {
        levelName: 'Extreme Stress / Burnout Danger (Level 9-10)',
        colorText: 'text-rose-600',
        bgColor: 'bg-rose-50/70 border-rose-150',
        barColor: 'bg-rose-600 animate-pulse',
        description: 'Your body is showing clear biological symptoms of severe academic or personal burnout. Your physical and metabolic reserves are depleted, resulting in cynical emotional detachment, flat mood states, complete sleep disintegration, muscle aches, and significant immune suppression. You are operating on emergency reserves, and continued overdrive risks absolute exhaustion.',
        quote: "When reserves are depleted, further effort without recovery results in physiological shutdown. Prioritizing rest is no longer optional.",
        tips: [
          'Seek direct clinical guidance: connect immediately with university mental health counselors, advisors, or health professionals.',
          'Implement a complete immediate evening digital and academic detox, suspending all non-essential reviews or homework.',
          'Focus purely on basic somatic hygiene: regular hot baths, chamomile tea, restorative sleep, and total physical rest.'
        ]
      };
    }
  };

  const adviceObj = getThermometerAdvice(thermometerLevel);

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left space-y-16">
      
      {/* ----------------- SECTION 1: HEADER & INTRO ----------------- */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 border border-indigo-100/45">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Module 1 • Psycho-Education & Neurobiology</span>
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
          Understanding Stress & Distress
        </h1>
        <p className="font-sans text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Before we can successfully regulate stress, we must understand the precise underlying neurological and evolutionary pathways that govern human body responses. Explore how everyday academic demands translate into somatic alerts.
        </p>
      </div>

      {/* ----------------- SECTION 2: BIOLOGICAL DEFINITIONS ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Definition Card */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-indigo-600">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Brain className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 leading-none">What is Stress?</h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">PSYCHOLOGICAL CONSTRUCT</span>
              </div>
            </div>
            
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              In modern psychology, <strong>stress</strong> is defined as our physiological and cognitive response when perceived environmental demands exceed our adjustive cognitive, emotional, and energetic resources. Rather than being an accidental emotional weakness, stress is a highly evolved, biological state of physical readiness designed to mobilize human action.
            </p>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              Our ancient ancestors faced brief, acute physical dangers (like predatory animals). Our endocrine systems adapted to provide immediate, high-volume adrenaline rushes to maximize muscle speed and cardiovascular throughput, which would subside completely once the threat was neutralized. However, modern students encounter continuous, abstract threats (midterms, career stress, finances) that never genuinely shut off, leading to harmful chronic tension states.
            </p>
          </div>
          <div className="border-t border-slate-100 pt-4 flex items-center space-x-2 text-xs font-medium text-slate-500 font-mono">
            <UserCheck className="h-4 w-4 text-indigo-500" />
            <span>Validated by PSY110 Academic Guidelines</span>
          </div>
        </div>

        {/* Path Flowchart Card */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900 text-slate-200 p-6 md:p-8 space-y-6 shadow-xl shadow-slate-900/10 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] text-indigo-400 uppercase tracking-widest font-black">AUTONOMIC AMYGDALA PIPELINE</span>
              <Activity className="h-4 w-4 text-rose-500 animate-pulse" />
            </div>
            <h3 className="font-display text-base font-bold text-white">The Fight-or-Flight Cascade</h3>
            
            {/* Visual Process Blocks */}
            <div className="space-y-3 text-xs font-sans">
              <div className="rounded-xl bg-slate-800 p-3.5 flex justify-between items-center border border-slate-700/60 hover:bg-slate-800/80 transition-colors">
                <div>
                  <span className="block font-bold text-[9px] uppercase text-indigo-300">STAGE 1: Perception</span>
                  <span className="text-slate-200">Sensory organs register a complex alert (e.g., Clashing Term Deadlines)</span>
                </div>
                <ShieldAlert className="h-4.5 w-4.5 text-rose-400 shrink-0 ml-3" />
              </div>
              
              <div className="text-center text-slate-600 text-sm font-bold leading-none select-none">↓</div>
              
              <div className="rounded-xl bg-slate-800 p-3.5 flex justify-between items-center border border-slate-700/60 hover:bg-slate-800/80 transition-colors">
                <div>
                  <span className="block font-bold text-[9px] uppercase text-indigo-300">STAGE 2: Alarm Pathway</span>
                  <span className="text-slate-200">The Amygdala bypasses conscious review, immediately alerting the Hypothalamus</span>
                </div>
                <Brain className="h-4.5 w-4.5 text-indigo-400 shrink-0 ml-3" />
              </div>

              <div className="text-center text-slate-600 text-sm font-bold leading-none select-none">↓</div>

              <div className="rounded-xl bg-slate-850 p-4 border border-indigo-500/20 leading-relaxed text-slate-300 space-y-1.5">
                <span className="block font-bold text-[9px] uppercase text-emerald-400">STAGE 3: Somatic Response</span>
                <p className="text-[11px]">
                  <strong>Sympathetic Overdrive:</strong> Adrenal glands flood the blood with adrenaline and cortisol. Involuntary bronchios dilate, heart rate spikes, blood pressure surges, and digestive blood flow constricts to power motor muscles.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ----------------- SECTION 3: THE FOUR CLASSIFICATIONS ----------------- */}
      <div className="space-y-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-slate-900">Four Scientific Classifications of Stress</h3>
          <p className="font-sans text-xs text-slate-500 mt-1">Stress is not a singular monolithic experience; it expresses itself in four distinct physiological forms.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tag: "Acute Stress", title: "Short-Term Spikes", color: "bg-indigo-50 text-indigo-700", desc: "Rapid sympathetic spikes triggered by immediate, transient pressures (e.g., nearly missing a lecture bus or delivering a sudden speech). It subsides quickly once the environmental issue terminates." },
            { tag: "Episodic Acute", title: "Repetitive Overload", color: "bg-orange-50 text-orange-700", desc: "Common in individuals who live in a state of chaotic, self-imposed complexity. Taking on excessive units or volunteer duties, they rush continuously, are chronically late, and live in constant friction." },
            { tag: "Chronic Stress", title: "Persistent Decay", color: "bg-rose-50 text-rose-700", desc: "Ongoing, grinding attrition that feels inescapable (e.g., severe tuition debt, intense toxic family pressure, or systemic academic stagnation). It keeps the nervous system permanently elevated, eroding mental stamina." },
            { tag: "Eustress", title: "Beneficial Catalyst", color: "bg-emerald-50 text-emerald-700", desc: "The highly positive, mobilizing form of stress linked with focus, excitement, and energy. It triggers growth, builds adaptive buffers, and appears when working on a project or hobby you love." }
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl border border-slate-150/60 bg-white p-5 space-y-3.5 hover:border-indigo-400/20 transition-all hover:shadow-xs">
              <span className={`inline-block rounded px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${item.color}`}>
                {item.tag}
              </span>
              <h4 className="font-display text-sm font-extrabold text-slate-900">{item.title}</h4>
              <p className="font-sans text-xs text-slate-550 leading-relaxed text-slate-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- *NEW* SECTION 4: WHY STUDENTS EXPERIENCE STRESS ----------------- */}
      <div className="space-y-6 border-t border-slate-150 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block rounded bg-indigo-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700 uppercase">Interactive Academic Audit</span>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900">Why Students Experience Stress</h3>
          <p className="font-sans text-sm text-slate-500 leading-relaxed">
            University life introduces a unique, heavy matrix of clashing logistical, cognitive, and social demands. Learn the psychology of why these triggers are experienced so intensely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          
          {/* 1. Exams */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-5 md:p-6 space-y-4 hover:border-indigo-500/35 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
              <School className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-display text-sm font-extrabold text-slate-900 uppercase tracking-widest">Midterm & Final Exams</h4>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Exams represent high-stakes, time-limited performance bounds. The brain interprets a singular exam day as a direct survive-or-fail scenario, triggering acute somatic panic, memory blockades (blocking synaptic retrieval paths), and massive bedtime worrying loops.
            </p>
          </div>

          {/* 2. Assignments */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-5 md:p-6 space-y-4 hover:border-indigo-500/35 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 shrink-0">
              <FileText className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-display text-sm font-extrabold text-slate-900 uppercase tracking-widest">Complex Assignments</h4>
            <p className="font-sans text-xs text-slate-550 leading-relaxed text-slate-500">
              Heavy, multi-stage projects require sustained executive functioning of the prefrontal cortex. When instructions are ambiguous or complex, students experience acute cognitive dread, resulting in executive avoidance and exhausting cram cycles.
            </p>
          </div>

          {/* 3. Deadlines */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-5 md:p-6 space-y-4 hover:border-indigo-500/35 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0">
              <Clock className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-display text-sm font-extrabold text-slate-900 uppercase tracking-widest">Clashing Deadlines</h4>
            <p className="font-sans text-xs text-slate-550 leading-relaxed text-slate-500">
              Having multiple major project deadlines fall within the same 48-hour window causes severe structural multitasking and rapid attention-switching. This depletes cerebral glucose reserves, leaving students in a state of deep cognitive fatigue.
            </p>
          </div>

          {/* 4. Presentations */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-5 md:p-6 space-y-4 hover:border-indigo-500/35 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0">
              <Presentation className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-display text-sm font-extrabold text-slate-900 uppercase tracking-widest">Oral Presentations</h4>
            <p className="font-sans text-xs text-slate-550 leading-relaxed text-slate-500">
              Speaking in front of classmate major audiences triggers primitive fear channels related to negative social judgment or peer exclusion. Auditory tremors, cotton-mouth, sweating, and rapid breathing are somatic preparations for public evaluation.
            </p>
          </div>

          {/* 5. Social Pressure */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-5 md:p-6 space-y-4 hover:border-indigo-500/35 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 shrink-0">
              <Users className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-display text-sm font-extrabold text-slate-900 uppercase tracking-widest">Social Pressure & Media</h4>
            <p className="font-sans text-xs text-slate-550 leading-relaxed text-slate-500">
              Keeping up with peers, managing complex flatmate relationships, and suffering from continuous blue-screen social feed comparison activates the lateral prefrontal cortex's sensitivity, causing intense cognitive load and lowering baseline resilience.
            </p>
          </div>

          {/* 6. Career Concerns */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-5 md:p-6 space-y-4 hover:border-indigo-500/35 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shrink-0">
              <Briefcase className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-display text-sm font-extrabold text-slate-900 uppercase tracking-widest">Future Career Security</h4>
            <p className="font-sans text-xs text-slate-550 leading-relaxed text-slate-500">
              Uncertainty regarding job placements, internships, and portfolio approvals causes chronic anticipatory anxiety. The brain naturally attempts to pre-solve distant problems, which manifests as bedtime worry and chronic mental fatigue today.
            </p>
          </div>

          {/* 7. Financial Concerns */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-5 md:p-6 space-y-4 hover:border-indigo-500/35 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <DollarSign className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-display text-sm font-extrabold text-slate-900 uppercase tracking-widest">Financial & Tuition</h4>
            <p className="font-sans text-xs text-slate-550 leading-relaxed text-slate-500">
              Tuition payments, textbook costs, and working part-time hours to cover basic grocery budgets represents ongoing environmental stress. It narrows a student's cognitive focus, making dedicated scholarly study far more challenging.
            </p>
          </div>

          {/* Course card placeholder */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-900 to-indigo-950 p-5 md:p-6 text-white space-y-3.5 flex flex-col justify-between shadow-lg shadow-indigo-900/10">
            <div className="space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-850 text-indigo-300 font-mono text-sm font-black">
                Ψ
              </div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-indigo-200">PSY110 Academic Core</h4>
              <p className="font-sans text-xs text-indigo-150 leading-normal">
                Academic loads are manageable once the somatic triggers are identified and mapped. Dive into the effects below to audit your symptoms.
              </p>
            </div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-indigo-350 font-bold border-t border-indigo-800/65 pt-2">
              Spring Semester 2026
            </div>
          </div>

        </div>
      </div>

      {/* ----------------- *NEW* SECTION 5: EFFECTS OF STRESS ----------------- */}
      <div className="space-y-6 border-t border-slate-150 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block rounded bg-indigo-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700 uppercase">Biological Mapping</span>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900">Somatic & Cognitive Effects of Stress</h3>
          <p className="font-sans text-sm text-slate-500">Cortisol saturation expresses itself as distinct physical, emotional, behavioral, and academic symptoms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
          {/* A. Physical Effects */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-5 hover:border-rose-400/30 transition-all">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="h-10 w-10 rounded-lg bg-rose-50 flex items-center justify-center">
                <Shield className="h-5.5 w-5.5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Physical Somatic Effects</h4>
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Endocrine Activation</span>
              </div>
            </div>
            <p className="font-sans text-xs text-slate-650 leading-relaxed">
              When cortisol levels remain elevated, your sympathetic nerve endings stay locked, forcing continuous physical strain on key organs.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-700 border-t border-slate-100 pt-4">
              <li className="flex items-start">
                <span className="text-rose-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Persistent Tension Headaches</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Caused by unconscious, constant clenching of neck and mandibular jaw muscles.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Chronic Adrenal Fatigue</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Persistent listlessness occurring when glycogen storage is completely depleted.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Sleep Structure Disrepair</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Cortisol blocks melatonin synthesis, causing severe night-awake latency.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Accelerated Heart Rate</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Persistent arterial constriction and tachycardia, wasting metabolic reserves.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* B. Emotional Effects */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-5 hover:border-indigo-400/30 transition-all">
            <div className="flex items-center space-x-3 text-indigo-650 text-indigo-650">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Heart className="h-5.5 w-5.5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Emotional Affective Effects</h4>
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Limbic Dysregulation</span>
              </div>
            </div>
            <p className="font-sans text-xs text-slate-650 leading-relaxed">
              Stress reduces cellular connectivity within the prefrontal pathways, making it highly difficult to self-regulate emotional swings.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-700 border-t border-slate-100 pt-4">
              <li className="flex items-start">
                <span className="text-indigo-550 text-indigo-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Persistent General Anxiety</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Active worries and intrusive catastrophizing become the default mind state.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-550 text-indigo-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Abrupt Affective Mood Swings</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Unstable irritability and defensive reactions triggered by tiny pressures.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-550 text-indigo-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Acute Frustration Latency</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Your general emotional threshold shrinks, magnifying tiny daily obstacles.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-550 text-indigo-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Flatness & Exhaustion</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">A complete depletion of joy, leading to detachment from peer interactions.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* C. Behavioral Effects */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-5 hover:border-orange-400/30 transition-all">
            <div className="flex items-center space-x-3 text-orange-600">
              <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <Users className="h-5.5 w-5.5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Behavioral Habit Actions</h4>
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Compulsive Adaptation</span>
              </div>
            </div>
            <p className="font-sans text-xs text-slate-650 leading-relaxed">
              To escape unpleasant internal somatic signals, the brain drafts quick comfort mechanisms and avoids long-term goals.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-700 border-t border-slate-100 pt-4">
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Procrastination Cycles</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Prolonged avoidance of important academic assignments due to fear of failure.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Defensive Social Isolation</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Avoiding direct peer study circles and locking oneself inside dorm rooms.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Poor Task Concentration</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Continuous attention hopping, keeping you from sustaining focus on standard books.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Escape Compensations</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Binge-scrolling, stress snacking, or substance use as temporary worry blocks.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* D. Academic Effects */}
          <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-5 hover:border-emerald-400/30 transition-all">
            <div className="flex items-center space-x-3 text-emerald-600">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <School className="h-5.5 w-5.5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Academic Outcomes</h4>
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Cognitive Performance Decline</span>
              </div>
            </div>
            <p className="font-sans text-xs text-slate-650 leading-relaxed">
              When stressors overload intellectual processing capacity, educational stability and grades are directly affected.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-700 border-t border-slate-100 pt-4">
              <li className="flex items-start">
                <span className="text-emerald-505 text-emerald-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Under-performing Grades</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">High exam anxiety limits your working memory capacity, impacting grades.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-505 text-emerald-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Loss of Intellectual Focus</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Experiencing severe mental fatigue that limits complex problem-solving.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-505 text-emerald-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Syndromic Academic Burnout</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Complete psychological detachment and cynicism toward your course studies.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-505 text-emerald-500 font-bold mr-2 shrink-0">•</span>
                <div>
                  <strong className="text-slate-900">Information Synthesis Blunts</strong>
                  <span className="block text-slate-500 text-[10px] leading-relaxed mt-0.5">Struggling to logically synthesize multi-stage models or complex essays.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ----------------- *NEW* SECTION 6: STRESS THERMOMETER ----------------- */}
      <div className="space-y-6 border-t border-slate-150 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block rounded bg-indigo-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700 uppercase">Interactive Somatic Pacer</span>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900">Interactive Stress Thermometer</h3>
          <p className="font-sans text-sm text-slate-500">
            Slide the controller from level 1 to 10 to calibrate your current mental status and see real-time, psychology-backed adaptive advice.
          </p>
        </div>

        {/* Thermometer Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-150/60 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/30">
          
          {/* Vertical/Horizontal Visual Slate (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400">Biological Heat Meter</span>
            
            {/* Thermometer scale */}
            <div className="relative bg-slate-50 border border-slate-100/80 rounded-2xl p-6 flex flex-col items-center justify-center">
              {/* Actual colored channel */}
              <div className="relative w-8 h-64 bg-slate-200 rounded-full shadow-inner overflow-hidden flex flex-col justify-end">
                {/* Visual temperature fill with animation */}
                <div 
                  className={`w-full rounded-full transition-all duration-300 ${adviceObj.barColor}`} 
                  style={{ height: `${thermometerLevel * 10}%` }}
                />
              </div>

              {/* Slider Input overlay */}
              <div className="w-full mt-6 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500">
                  <span>LEVEL 1 (CALM)</span>
                  <span className={`${adviceObj.colorText} font-black`}>LEVEL {thermometerLevel}</span>
                  <span>LEVEL 10 (CRITICAL)</span>
                </div>
                
                <input
                  id="thermometer_scale_slider"
                  type="range"
                  min="1"
                  max="10"
                  value={thermometerLevel}
                  onChange={(e) => setThermometerLevel(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              {/* Helper tags */}
              <div className="flex gap-1.5 mt-4 text-[9px] font-mono uppercase font-black tracking-wider justify-center">
                {['Calm', 'Mild', 'Mod', 'High', 'Ext'].map((nm, id) => {
                  const isActive = (id + 1) === Math.ceil(thermometerLevel / 2);
                  return (
                    <span 
                      key={id} 
                      className={`px-2 py-0.5 rounded transition-all ${
                        isActive 
                          ? 'bg-slate-900 text-white font-extrabold shadow-sm' 
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {nm}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Diagnosis & Recommendations Panel (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className={`inline-block rounded px-2.5 py-0.5 font-mono text-xs font-black uppercase tracking-wider ${adviceObj.bgColor} ${adviceObj.colorText}`}>
                {adviceObj.levelName}
              </span>
              <h4 className="font-display text-2xl font-black text-slate-900">
                Somatic State Analysis
              </h4>
            </div>

            <p className="font-sans text-sm text-slate-655 text-slate-650 leading-relaxed min-h-[96px]">
              {adviceObj.description}
            </p>

            {/* Quote block */}
            <div className={`p-4 rounded-xl border-l-4 border-slate-900 bg-slate-50 text-xs italic text-slate-600 font-sans`}>
              "{adviceObj.quote}"
            </div>

            {/* Prescribed Tips */}
            <div className="space-y-3 border-t border-slate-100 pt-5">
              <h5 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400">Prescribed Somatic Interventions:</h5>
              <div className="space-y-2.5">
                {adviceObj.tips.map((tipString, index) => (
                  <div key={index} className="flex items-start space-x-2.5 font-sans text-xs text-slate-700">
                    <span className="flex h-5 w-5 rounded-full bg-slate-100 font-bold shrink-0 items-center justify-center text-slate-800 font-mono">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{tipString}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
