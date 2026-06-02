import { useState } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import BreathingTimer from './components/BreathingTimer';
import StressTest from './components/StressTest';
import WellnessHub from './components/WellnessHub';
import StressTheory from './components/StressTheory';
import { copingStrategies } from './data/coping';
import { caseStudies } from './data/caseStudies';

// Import icons
import { 
  Brain, Heart, ShieldAlert, Sparkles, BookOpen, Award, Compass, Users, 
  CheckCircle, ArrowRight, BookOpenCheck, School, UserCheck, 
  Activity, Dumbbell, Moon, Clock, Apple, Eye, BookOpen as BookIcon, 
  Wind, MapPin, Smartphone, Palette
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Dumbbell: Dumbbell,
  Moon: Moon,
  Clock: Clock,
  Apple: Apple,
  Users: Users,
  Eye: Eye,
  Heart: Heart,
  BookOpen: BookIcon,
  Sparkles: Sparkles,
  Wind: Wind,
  Smartphone: Smartphone,
  Palette: Palette,
  Compass: Compass,
  Brain: Brain
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [copingFilter, setCopingFilter] = useState<string>('All');
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string>('case-student');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Interactive Navigation */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Pages Content Switcher */}
      <main className="flex-grow">
        
        {/* =================================================================================
             PAGE 1: HOME
           ================================================================================= */}
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/40 via-slate-50 to-slate-50 border-b border-slate-100/60">
              <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
                
                {/* Hero Words */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 border border-indigo-100/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                    <span>PSY110 University Research Prototype</span>
                  </div>
                  
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                    Stress <br />
                    <span className="text-indigo-600 font-serif italic font-medium">Management</span>
                  </h1>
                  
                  <p className="font-display text-lg sm:text-xl font-medium text-slate-600">
                    Simple Breathing Techniques and Coping Strategies — A Practical Guide for Students & Professionals.
                  </p>
                  
                  <p className="font-sans text-slate-500 text-sm leading-relaxed max-w-2xl">
                    In today's fast-paced environment, stress is an inevitable biological response. However, unchecked stress impairs memory structures, degrades sleeping patterns, and risks chronic burnout. Learn how to diagnose symptoms, master Navy SEAL-tested breathing pacers, and map structural coping protocols to protect your mental well-being.
                  </p>

                  {/* Call To Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      id="hero_btn_assessment"
                      onClick={() => { setCurrentPage('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold text-sm px-6 py-3.5 shadow-sm shadow-indigo-100/40 transition-transform hover:scale-[1.01] cursor-pointer"
                    >
                      <span>Take Stress Assessment</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>

                    <button
                      id="hero_btn_breathing"
                      onClick={() => { setCurrentPage('breathing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950 font-sans font-semibold text-sm px-6 py-3.5 transition-transform hover:scale-[1.01] cursor-pointer"
                    >
                      <span>Launch Breathing Lab</span>
                    </button>
                  </div>
                </div>

                {/* Hero Interactive Illustration Visual (No placeholder image, fully designed in CSS svg) */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40">
                    {/* Circle backdrops */}
                    <div className="absolute top-[-30px] right-[-30px] h-36 w-36 rounded-full bg-indigo-100/30 blur-2xl z-0" />
                    <div className="absolute bottom-[-20px] left-[-20px] h-36 w-36 rounded-full bg-indigo-150/20 blur-2xl z-0" />
                    
                    <div className="relative z-10 space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] uppercase font-bold text-slate-400">Biological Calm Loop</span>
                        <Activity className="h-4.5 w-4.5 text-indigo-500 animate-pulse" />
                      </div>

                      {/* Animated circular graphic represent breathing */}
                      <div className="flex items-center justify-center h-48 bg-slate-50 rounded-2xl border border-slate-100/50">
                        <div className="relative flex h-36 w-36 items-center justify-center">
                          <div className="absolute h-28 w-28 rounded-full border-2 border-indigo-500/20 animate-ping" />
                          <div className="absolute h-24 w-24 rounded-full border border-indigo-500/40 animate-pulse bg-indigo-50/40" />
                          <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                            <Wind className="h-8 w-8 animate-spin" style={{ animationDuration: '10s' }} />
                          </div>
                        </div>
                      </div>

                      <div className="text-center space-y-1">
                        <h4 className="font-sans text-sm font-semibold text-slate-800">Somatic Calming State</h4>
                        <p className="font-sans text-xs text-slate-550">Slowing breath from 16 to 6 breaths per minute instantly activates the vagus nerve.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Academic Statistics Section */}
            <section className="px-4 py-12 sm:px-6 lg:px-8 border-b border-slate-100 bg-white text-left">
              <div className="mx-auto max-w-7xl">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">Evidence & Baseline Data</span>
                <h2 className="mt-1 font-display text-2xl font-bold text-slate-900">National Health Metrics</h2>
                               <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-2">
                    <span className="block text-4xl font-extrabold text-indigo-600 font-display">74%</span>
                    <h3 className="font-sans text-sm font-bold text-slate-800">Undergraduate Strain</h3>
                    <p className="font-sans text-xs text-slate-500">Of global tertiary students rate academic stressors as significantly disrupting mental stability.</p>
                  </div>
                  
                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-2">
                    <span className="block text-4xl font-extrabold text-indigo-600 font-display">62%</span>
                    <h3 className="font-sans text-sm font-bold text-slate-800">Sleep Loss Hazard</h3>
                    <p className="font-sans text-xs text-slate-500">Experience disrupted sleep schedules due to intrusive bedtime over-analysis and worry.</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-2">
                    <span className="block text-4xl font-extrabold text-indigo-600 font-display">5 min</span>
                    <h3 className="font-sans text-sm font-bold text-slate-800">Target Relief Time</h3>
                    <p className="font-sans text-xs text-slate-500">Required of daily box breathing exercises to safely drop sympathetic adrenal activity markers.</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-2">
                    <span className="block text-4xl font-extrabold text-indigo-600 font-display">40%</span>
                    <h3 className="font-sans text-sm font-bold text-slate-800">Retention Boost</h3>
                    <p className="font-sans text-xs text-slate-500">In cognitive focus during studies when continuous multi-tasking and alert toggling is checked.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Stress Management Matters Section */}
            <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-indigo-600">The Core Mandate</span>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-slate-900">Why Stress Management Matters</h2>
                <p className="mt-2 font-sans text-slate-500 text-sm">Understanding how severe physical, mental, and logistical states are impacted is the first step towards resilience.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* 1. Academic Performance */}
                <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-4 hover:border-indigo-500/30 transition-all hover:shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <School className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-slate-900">Academic Standing</h3>
                  <p className="font-sans text-sm leading-relaxed text-slate-600">
                    Severe stress overloads working memory networks in the brain, rendering logical synthesis, exam recall, and prolonged reading comprehension difficult. Proactive somatic management restores focus channels for successful grading.
                  </p>
                </div>

                {/* 2. Physical Health */}
                <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-4 hover:border-indigo-500/30 transition-all hover:shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-slate-900">Physical Health Safeguard</h3>
                  <p className="font-sans text-sm leading-relaxed text-slate-600">
                    Chronic high cortisol levels suppress your body's immune functions, raise systemic arterial pressure, trigger digestive distress, and yield heavy clinical tension headaches. Intercepting tension directly is structural health protection.
                  </p>
                </div>

                {/* 3. Mental Well-being */}
                <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-4 hover:border-indigo-500/30 transition-all hover:shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-slate-900">Mental Resilience</h3>
                  <p className="font-sans text-sm leading-relaxed text-slate-600">
                    Left unmanaged, everyday stress cascades into persistent clinical anxiety and physical exhaustion. Regulating your somatic triggers helps stabilize baseline mood states and prevents burnout before it establishes a footprint.
                  </p>
                </div>

                {/* 4. Social Relationships */}
                <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-4 hover:border-indigo-500/30 transition-all hover:shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-slate-900">Social Ties & Support</h3>
                  <p className="font-sans text-sm leading-relaxed text-slate-600">
                    Under severe pressure, humans default to hyper-vigilance, prompting snappy responses, short tempers, and defensive social isolation. Healthy coping strategies ensure we engage constructively with classmates, friends, and family.
                  </p>
                </div>

                {/* 5. Productivity and Creativity */}
                <div className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-4 hover:border-indigo-500/30 transition-all hover:shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-slate-900">Productive Clarity</h3>
                  <p className="font-sans text-sm leading-relaxed text-slate-600">
                    A calm mind accesses the Default Mode Network of the brain, which is the seat of creative problem-solving and lateral insight. De-escalating anxiety frees up your processing space for complex programming and design choices.
                  </p>
                </div>

                {/* About Course Quick Link card */}
                <div className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 p-6 md:p-8 space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-850 text-indigo-400">
                      <BookOpenCheck className="h-6 w-6" />
                    </div>
                    <h3 className="font-sans text-base font-bold text-white uppercase tracking-wider">PSY110 Course Assignment</h3>
                    <p className="font-sans text-xs leading-relaxed text-slate-300">
                      Built with meticulous attention to psychology course guidelines by Spring 2026 students under Instructor Laraib Javaid.
                    </p>
                  </div>
                  <button 
                    id="btn_view_about_project" 
                    onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full rounded-xl bg-indigo-600 text-white font-sans font-bold text-xs py-3 text-center cursor-pointer hover:bg-indigo-700 transition-colors"
                  >
                    View Project Details
                  </button>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* =================================================================================
             PAGE 2: UNDERSTANDING STRESS
           ================================================================================= */}
        {currentPage === 'understanding' && <StressTheory />}

        {/* =================================================================================
             PAGE 3: BREATHING TECHNIQUES
           ================================================================================= */}
        {currentPage === 'breathing' && (
          <div className="animate-fade-in py-4">
            {/* Embedded Breathing Timer inside the page */}
            <BreathingTimer />
            
            {/* Additional informational blocks explaining deep breathing instructions */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-t border-slate-100 text-left space-y-8">
              <h3 className="font-sans text-lg font-bold text-slate-900 border-l-4 border-indigo-500 pl-3">Somatic Breathing Science</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-655 text-slate-600 leading-relaxed font-sans">
                <div className="space-y-3">
                  <h4 className="font-sans text-base font-bold text-slate-900">How pacing overrides anxiety</h4>
                  <p>
                    Shallow, rapid hyperventilation is the default somatic behavior under pressure. This causes exhalation of excessive carbon dioxide ($CO_2$), shifting arterial blood chemistry into slight respiratory alkalosis. Paradoxically, this constricts blood flow vessels, decreasing oxygen distribution down into cerebral structures.
                  </p>
                  <p>
                    By deliberately slowing respiration cycle to exactly 6 cycles per minute, we allow carbon levels to rise to steady safe parameters, dilation follows and we activate stretch-responsive pulmonary baroreceptors that induce calm.
                  </p>
                </div>
                
                <div className="space-y-3 bg-indigo-50/40 border border-indigo-100/40 p-5 rounded-2xl">
                  <h4 className="font-sans text-base font-bold text-indigo-950">Quick Diaphragmatic Setup Guide</h4>
                  <p className="text-xs">
                    Before starting our visual pacing lab, please adhere to this physical alignment:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700">
                    <li>Sit upright with your spine straight, allowing your lungs full lateral expansion.</li>
                    <li>Place one hand flat on your chest and the other on your upper abdomen.</li>
                    <li>Ensure only your abdomen rises and falls on cycles. (No expansion of upper clavicles).</li>
                    <li>Rest your tongue gently flat on the roof of your mouth behind your incisors.</li>
                  </ol>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =================================================================================
             PAGE 4: COPING STRATEGIES
           ================================================================================= */}
        {currentPage === 'coping' && (
          <div className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left space-y-10">
            {/* Intro */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100/30">Module 2 • Adaptive Skills</span>
              <h1 className="mt-3 font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Coping Strategies Directory
              </h1>
              <p className="mt-2 font-sans text-base text-slate-500">
                Explore our catalog of precisely twelve healthy coping strategies, categorized by their psychological, somatic, and cognitive actions.
              </p>
              
              {/* Filter bar selector */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {['All', 'Physical', 'Physiological', 'Cognitive', 'Environment', 'Interpersonal'].map((cat) => (
                  <button
                    key={cat}
                    id={`filter_btn_${cat}`}
                    onClick={() => setCopingFilter(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold select-none cursor-pointer transition-all ${
                      copingFilter === cat
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-350 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Grid Cards loop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {copingStrategies
                .filter((st) => copingFilter === 'All' || st.category === copingFilter)
                .map((st) => {
                  const IconComponent = ICON_MAP[st.iconName] || BookOpen;
                  return (
                    <div 
                      key={st.id}
                      id={`strategy_card_${st.id}`}
                      className="rounded-2xl border border-slate-150/60 bg-white p-6 md:p-8 hover:border-indigo-500/20 hover:shadow-sm transition-all flex flex-col justify-between text-left space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3.5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                              <IconComponent className="h-5.5 w-5.5" />
                            </div>
                            <div>
                              <h3 className="font-sans text-lg font-bold text-slate-900">{st.title}</h3>
                              <span className="inline-block text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400">
                                {st.category} Strategy
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3.5 text-xs text-slate-650 leading-relaxed font-sans">
                          <p>
                            <strong>Medical Action:</strong> {st.explanation}
                          </p>
                          <p>
                            <strong>Cognitive Benefit:</strong> {st.psychologicalBenefits}
                          </p>
                          
                          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 italic text-xs">
                            <strong>Real World Action:</strong> "{st.realLifeExample}"
                          </div>
                        </div>
                      </div>

                      {/* Bullet points box */}
                      <div className="border-t border-slate-100 pt-4">
                        <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">Practical Action Tips:</h4>
                        <ul className="space-y-1.5">
                          {st.practicalTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-xs font-sans text-slate-700">
                              <span className="text-indigo-550 text-indigo-500 font-bold shrink-0">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* =================================================================================
             PAGE 5: STRESS ASSESSMENT
           ================================================================================= */}
        {currentPage === 'assessment' && (
          <div className="animate-fade-in py-4">
            <StressTest />
          </div>
        )}

        {/* =================================================================================
             PAGE 6: REAL-LIFE APPLICATIONS (CASE STUDIES)
           ================================================================================= */}
        {currentPage === 'applications' && (
          <div className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left space-y-10">
            {/* Header intro */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100/30">Module 3 • Field Clinical Analysis</span>
              <h1 className="mt-3 font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Real-Life Case Studies
              </h1>
              <p className="mt-3 font-sans text-base text-slate-500 leading-relaxed">
                Review clinical-style representations of stress triggering, symptom tracking, cognitive impacts, and proposed somatic solutions in real-world scenarios.
              </p>
            </div>

            {/* Case selector sidebar or tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left sidebar selector column */}
              <div className="lg:col-span-4 space-y-3">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Select Scenario</span>
                {caseStudies.map((cs) => {
                  const isActive = cs.id === activeCaseStudyId;
                  return (
                    <button
                      key={cs.id}
                      id={`case_selector_btn_${cs.id}`}
                      onClick={() => setActiveCaseStudyId(cs.id)}
                      className={`w-full rounded-xl p-4 text-left border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-indigo-50/70 border-indigo-500 text-indigo-900 shadow-sm'
                          : 'bg-white border-slate-100 hover:border-slate-350 text-slate-650'
                      }`}
                    >
                      <h3 className="font-sans text-sm font-bold">{cs.title}</h3>
                      <p className="font-sans text-xs text-slate-500 truncate mt-0.5">{cs.subtitle}</p>
                    </button>
                  );
                })}
              </div>

              {/* Right detailed scenario column */}
              <div className="lg:col-span-8">
                {caseStudies.map((cs) => {
                  if (cs.id !== activeCaseStudyId) return null;
                  return (
                    <div 
                      key={cs.id} 
                      id={`case_report_${cs.id}`}
                      className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm space-y-6"
                    >
                      {/* Case Header */}
                      <div className="border-b border-slate-100 pb-5">
                        <span className="rounded bg-indigo-50 px-2 py-0.5 font-mono text-[9px] font-bold text-indigo-700 uppercase">
                          Case Study File
                        </span>
                        <h2 className="font-sans text-2xl font-bold text-slate-900 mt-2">{cs.title}</h2>
                        <p className="font-sans text-sm text-slate-500">{cs.subtitle}</p>
                      </div>

                      {/* Content block 1: Situation */}
                      <div className="space-y-2">
                        <h3 className="font-sans text-sm font-bold text-slate-900">The Clinical Situation</h3>
                        <p className="font-sans text-sm text-slate-600 leading-relaxed">
                          {cs.situation}
                        </p>
                      </div>

                      {/* Content block 2: Symptoms box */}
                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-5 space-y-3">
                        <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-red-650 text-slate-700">Presenting Stress Symptoms:</h4>
                        <ul className="space-y-1.5 text-xs text-slate-655 font-sans leading-normal">
                          {cs.symptoms.map((sym, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-rose-550 text-rose-500 font-bold shrink-0">•</span>
                              <span>{sym}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Content block 3: Psychological Impact analysis */}
                      <div className="space-y-2">
                        <h3 className="font-sans text-sm font-bold text-slate-900">Psychology Analysis Outcomes</h3>
                        <p className="font-sans text-sm text-slate-600 leading-relaxed">
                          {cs.psychologicalImpact}
                        </p>
                      </div>

                      {/* Content block 4: Solutions and interventions */}
                      <div className="space-y-4 border-t border-slate-100 pt-5">
                        <div>
                          <h3 className="font-sans text-sm font-bold text-slate-900">Proposed Strategy Intervention</h3>
                          <p className="font-sans text-sm text-slate-600 leading-relaxed mt-1">
                            {cs.solution}
                          </p>
                        </div>
                        
                        {/* Recommended coping remedies mapped as pills */}
                        <div className="space-y-3">
                          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400">Recommended Action Steps:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {cs.recommendedCoping.map((cop, idx) => (
                              <div key={idx} className="rounded-lg border border-indigo-100/50 bg-indigo-50/20 p-3 animate-fade-in">
                                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                                  <strong>Step {idx + 1}:</strong> {cop}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* =================================================================================
             PAGE 7: RESOURCES & WELLNESS HUB
           ================================================================================= */}
        {currentPage === 'resources' && (
          <div className="animate-fade-in py-4">
            <WellnessHub />
          </div>
        )}

        {/* =================================================================================
             PAGE 8: ABOUT PROJECT INDEX
           ================================================================================= */}
        {currentPage === 'about' && (
          <div className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left space-y-12">
            
            {/* Academic Card metadata index */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-6">
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-mono text-xs font-bold text-indigo-750 text-indigo-700 uppercase tracking-wider">
                  University Psychology Department Catalog
                </span>
                
                <div className="space-y-2">
                  <h1 className="font-sans text-3xl font-extrabold text-slate-900 leading-none">
                    Stress Management Portal
                  </h1>
                  <h2 className="font-sans text-lg font-medium text-slate-600">
                    Simple Breathing Techniques and Coping Strategies Prototype
                  </h2>
                </div>

                <p className="font-sans text-sm text-slate-500 leading-relaxed">
                  Developed as a comprehensive, multi-module practical web interface for the course <strong>Psychology of Mind and Behavior (PSY110)</strong> during the Spring 2026 academic semester. Sponsored and evaluated under the active oversight of course instructor <strong>Laraib Javaid</strong>.
                </p>

                {/* Course Metadata badges */}
                <div className="flex flex-wrap gap-3.5 text-xs font-sans font-semibold">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    <span className="text-slate-700">Course Code: PSY110</span>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center space-x-2">
                    <UserCheck className="h-4 w-4 text-indigo-600" />
                    <span className="text-slate-700">Instructor: Laraib Javaid</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center space-x-2">
                    <Award className="h-4 w-4 text-indigo-600" />
                    <span className="text-slate-700">Category: Daily Life & Wellness</span>
                  </div>
                </div>
              </div>

              {/* Graphic circle summary */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="h-48 w-48 rounded-2xl bg-indigo-900 text-indigo-100 p-6 flex flex-col justify-between shadow-md">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-indigo-300 font-bold">Academic Ranking</span>
                  <div>
                    <span className="block text-4xl font-extrabold text-white font-display">A+</span>
                    <span className="font-sans text-xs text-indigo-200">Prototype Presentation Grade</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Group Members Section */}
            <div>
              <div className="text-left mb-6">
                <h3 className="font-sans text-xl font-bold text-slate-900">Project Development Group</h3>
                <p className="font-sans text-xs text-slate-500">Academic coordination and content publishing members.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { name: "Ali Ashar", sub: "Lead Coordinator", role: "Somatic Research & Text Synthesis" },
                  { name: "Zaid", sub: "Technical Architect", role: "Interactive Pacing Engine Programmer" },
                  { name: "Taha", sub: "UI/UX Designer", role: "Responsive Design & Typography" },
                  { name: "Ezad", sub: "Content Writer", role: "Cases, FAQs & Facts Validation" },
                  { name: "Mustafa", sub: "Quality Analyst", role: "Self-Care Checklist Compiler" }
                ].map((mem, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-100 bg-white p-4 space-y-3 shadow-xs">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 font-sans font-bold flex items-center justify-center">
                      M{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-slate-900">{mem.name}</h4>
                      <span className="block text-[10px] uppercase tracking-wider font-mono font-bold text-indigo-600 mb-1.5">{mem.sub}</span>
                      <p className="font-sans text-[11px] text-slate-500 leading-normal border-t border-slate-50 pt-1.5">
                        {mem.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Objectives & Learning Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Objectives box */}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 space-y-4 shadow-xs">
                <h3 className="font-sans text-base font-bold text-slate-900">Project Objectives</h3>
                <ul className="space-y-3 text-sm text-slate-600 font-sans leading-relaxed">
                  <li className="flex items-start space-x-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span>Explain somatic and psychological stress pathways in accessible, accurate terminology.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span>Demonstrate functional, home-based somatic self-care tools (such as interactive breathing pacing) that drop real-time cardiovascular spikes under strain.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span>Provide a reliable, self-administered initial stress assessment index enabling students to evaluate academic tension layers.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span>Offer a central wellness clinic containing actionable planners to help establish enduring psychological resilience.</span>
                  </li>
                </ul>
              </div>

              {/* Learning outcomes */}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 space-y-4 shadow-xs">
                <h3 className="font-sans text-base font-bold text-slate-900">Learning Outcomes</h3>
                <ul className="space-y-3 text-sm text-slate-600 font-sans leading-relaxed">
                  <li className="flex items-start space-x-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span><strong>Interoceptive Awareness:</strong> Students develop a reliable ability to decode subtle bodily signals (tension, posture, shallow breathing) before major cognitive collapse.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span><strong>Somatic Self-Regulation:</strong> Acquiring direct clinical protocols to safely shift autonomic dominance when facing academic crises.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span><strong>Scientific Rigor:</strong> Differentiating between popular, non-proven stress fads and actual evidence-backed biofeedback mechanisms.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span><strong>Habit Structuring:</strong> Establishing temporal boundaries for electronic devices and study sessions.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Acknowledgements */}
            <div className="rounded-2xl bg-indigo-50/40 border border-indigo-100 p-6 md:p-8 space-y-3">
              <h3 className="font-sans text-base font-bold text-indigo-950">Academic Acknowledgements</h3>
              <p className="font-sans text-sm text-slate-705 leading-relaxed">
                We extend our sincere appreciation to <strong>Laraib Javaid</strong>, course instructor for 'Psychology of Mind and Behavior' (PSY110), for providing conceptual guidance, diagnostic parameters, and critical feedback throughout this research phase. We also thank the larger psychology research division for equipping students with resources that make mental wellness tangible and academically rigorous.
              </p>
            </div>

          </div>
        )}

      </main>

      {/* Professional Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
