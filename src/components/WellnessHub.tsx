import React, { useState } from 'react';
import { wellnessTips } from '../data/tips';
import { quotes } from '../data/quotes';
import { facts } from '../data/facts';
import { faqs } from '../data/faqs';
import { motion } from 'motion/react';
import { 
  Sparkles, CheckSquare, Calendar, HelpCircle, 
  Search, BookOpen, RefreshCw, Plus, Trash2, CheckCircle2, 
  Smile, Moon, Shield, Footprints, Flame, Quote, ChevronDown, ChevronUp,
  Award, Clock, Check, Key, Clipboard, Heart, AlertCircle, Compass, ShieldCheck,
  Brain
} from 'lucide-react';

interface SelfCareItem {
  id: string;
  activity: string;
  category: 'Physical' | 'Mental' | 'Relationship';
  completed: boolean;
}

const INITIAL_CHECKLIST = [
  { id: '1', text: 'Engaged in a 5-minute deep breathing ritual on rising.', completed: false },
  { id: '2', text: 'Stretched shoulder and neck muscles for 2 minutes at your desk.', completed: false },
  { id: '3', text: 'Swapped one afternoon coffee/energy drink for high-mineral water.', completed: false },
  { id: '4', text: 'Step away from screens completely during lunch and chew mindfully.', completed: false },
  { id: '5', text: 'Unplugged work email/school notifications by 7:00 PM.', completed: false },
  { id: '6', text: 'Expressed gratitude to a friend, parent, or colleague in writing.', completed: false },
  { id: '7', text: 'Maintained a clean, optimized study/sleep area free of clutter.', completed: false },
];

const SEVEN_DAY_PLAN = [
  {
    day: 1,
    title: "Somatic Respiratory Reset",
    challenge: "Complete three full cycles of Box Breathing or 4-7-8 Breathing (exactly 4 minutes each) during class transition intervals.",
    academicMechanism: "Directly stimulates the vagal trunk, activating instant acetylcholine discharge. This brakes tachycardia (rapid heart rate), lowers systemic arterial pressure, and halts episodic exam jitters.",
    somaticTask: "Find a quiet lecture bench or a library study corner. Sit upright, align your chin, let your shoulders drop, and complete 4 continuous minutes of slow, diaphragmatic pacing.",
    category: "Breathing",
    bgGradient: "from-emerald-500 to-teal-500",
    illustrationEmoji: "🌬️"
  },
  {
    day: 2,
    title: "Circadian Hygiene Reset",
    challenge: "Power down all smartphone and laptop screens at least 60 minutes before bed. Store your phone in a desk drawer entirely away from your mattress.",
    academicMechanism: "Bypasses high-frequency blue frequency glare. Blue wavelengths stimulate the suprachiasmatic nucleus, causing cortisol spikes and blocking melatonin synthesis.",
    somaticTask: "Initiate digital blackout by 10:00 PM. Read a physical textbook or journal using soft, low-intensity warm light to allow circadian induction to lock in.",
    category: "Sleep",
    bgGradient: "from-indigo-500 to-sky-500",
    illustrationEmoji: "🌙"
  },
  {
    day: 3,
    title: "Metabolic stress Flush",
    challenge: "Engage in exactly 25 minutes of brisk outdoor walking or jogging around a local green university park or track.",
    academicMechanism: "Rhythmic voluntary muscle activation burns through high residual concentrations of circulating adrenaline and salivary cortisol that reinforce muscle guarding.",
    somaticTask: "Lace up your sneakers, step outside, leave headphones behind, and jog/briskly walk for 25 minutes. Notice the tactile sensation of your feet hitting the turf.",
    category: "Exercise",
    bgGradient: "from-rose-500 to-orange-500",
    illustrationEmoji: "🏃"
  },
  {
    day: 4,
    title: "Cognitive Default-Mode Pause",
    challenge: "Execute the 5-4-3-2-1 sensory grounding sequence right before commencing a study revision block.",
    academicMechanism: "Redirects recursive, catastrophic internal dialogues by prioritizing immediate peripheral sensory checks, suppressing overactivity in the default-mode network.",
    somaticTask: "Pause at your desk for 3 minutes. Mentally name: 5 items you see, 4 textures you feel, 3 distinct sounds, 2 scents, and 1 taste.",
    category: "Mindfulness",
    bgGradient: "from-teal-500 to-cyan-500",
    illustrationEmoji: "🧘"
  },
  {
    day: 5,
    title: "Expressive Catharsis Writing",
    challenge: "Conduct a 10-minute continuous, unedited 'brain-dump' in a physical notebook, capturing all current academic deadlines and personal fears.",
    academicMechanism: "Organizes heavy, formless amygdala dread into structured syntax, shifting activity to the analytical left frontal cortex which lowers anxiety parameters.",
    somaticTask: "Grab pen and paper. Write honestly for ten continuous minutes without censoring topic, neatness, grammar, or pacing. Tear and discard if desired.",
    category: "Journaling",
    bgGradient: "from-purple-500 to-pink-500",
    illustrationEmoji: "✍️"
  },
  {
    day: 6,
    title: "Endocrine Bonding Induction",
    challenge: "Coordinate a 15-minute screen-free coffee catch-up or phone call with a trusted peer student or family mentor.",
    academicMechanism: "Triggers active releases of oxytocin, a neural hormone that dilates blood vessels, reduces sympathetic stress, and lowers isolation alarms.",
    somaticTask: "Make a connection. Share project concerns honestly and check on their well-being, actively practicing validation.",
    category: "Social Support",
    bgGradient: "from-amber-500 to-orange-500",
    illustrationEmoji: "👥"
  },
  {
    day: 7,
    title: "Holistic Integration Audit",
    challenge: "Conduct a 10-minute quiet somatic audit of your body’s posture adjustments and take the 20-Question Diagnostic Index to review progress.",
    academicMechanism: "Active self-reflection consolidates behavioral change, reinforces student self-efficacy, and locks in healthy boundaries to prevent burnout.",
    somaticTask: "Sit in a comfortable spot. Notice changes in your baseline breathing and muscle tightness. Write your concrete lifestyle targets for next term.",
    category: "Reflection",
    bgGradient: "from-cyan-500 to-emerald-500",
    illustrationEmoji: "❇️"
  }
];

export default function WellnessHub() {
  const [activeTab, setActiveTab] = useState<'generators' | 'trackers' | 'faqs' | 'plan'>('generators');

  // Care Plan States
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedPlanDay, setSelectedPlanDay] = useState<number>(1);

  // Generator States
  const [currentTip, setCurrentTip] = useState(wellnessTips[0]);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [currentFact, setCurrentFact] = useState(facts[0]);

  // Search State for Facts Directory
  const [factSearch, setFactSearch] = useState('');
  const [factCategoryFilter, setFactCategoryFilter] = useState('All');

  // Checklist States
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  // Self-Care Planner States
  const [selfCareList, setSelfCareList] = useState<SelfCareItem[]>([
    { id: 'sc-1', activity: 'Drink chamomile tea before bedtime.', category: 'Physical', completed: false },
    { id: 'sc-2', activity: 'Journal three academic anxieties in a notebook.', category: 'Mental', completed: true },
    { id: 'sc-3', activity: 'Call family or peer student during long breaks.', category: 'Relationship', completed: false }
  ]);
  const [newActivity, setNewActivity] = useState('');
  const [newCategory, setNewCategory] = useState<'Physical' | 'Mental' | 'Relationship'>('Physical');

  // Weekly Habit Tracker States
  const [habits, setHabits] = useState<Record<string, { sleep: boolean; breathing: boolean; detox: boolean }>>({
    Mon: { sleep: true, breathing: true, detox: false },
    Tue: { sleep: true, breathing: false, detox: false },
    Wed: { sleep: false, breathing: true, detox: true },
    Thu: { sleep: false, breathing: false, detox: false },
    Fri: { sleep: false, breathing: false, detox: false },
    Sat: { sleep: false, breathing: false, detox: false },
    Sun: { sleep: false, breathing: false, detox: false }
  });

  // FAQs Accordion states
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);

  // Randomize generators
  const rollTip = () => {
    const nextIdx = Math.floor(Math.random() * wellnessTips.length);
    setCurrentTip(wellnessTips[nextIdx]);
  };

  const rollQuote = () => {
    const nextIdx = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[nextIdx]);
  };

  const rollFact = () => {
    const nextIdx = Math.floor(Math.random() * facts.length);
    setCurrentFact(facts[nextIdx]);
  };

  // Toggle checklist
  const toggleChecklistItem = (id: string) => {
    setChecklist(
      checklist.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  // self care additions
  const addSelfCareActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;
    const newItem: SelfCareItem = {
      id: `sc-${Date.now()}`,
      activity: newActivity.trim(),
      category: newCategory,
      completed: false
    };
    setSelfCareList([...selfCareList, newItem]);
    setNewActivity('');
  };

  const toggleSelfCareItem = (id: string) => {
    setSelfCareList(
      selfCareList.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  const deleteSelfCareItem = (id: string) => {
    setSelfCareList(selfCareList.filter((item) => item.id !== id));
  };

  // Habits trigger
  const toggleHabit = (day: string, habitKey: 'sleep' | 'breathing' | 'detox') => {
    setHabits({
      ...habits,
      [day]: {
        ...habits[day],
        [habitKey]: !habits[day][habitKey]
      }
    });
  };

  // Count total completed habits for percentage
  const getHabitPercentage = () => {
    const days = Object.keys(habits);
    let totalScore = 0;
    days.forEach((day) => {
      if (habits[day].sleep) totalScore++;
      if (habits[day].breathing) totalScore++;
      if (habits[day].detox) totalScore++;
    });
    const maxScore = days.length * 3; // 21 items max
    return Math.round((totalScore / maxScore) * 100);
  };

  const habitCompletionRate = getHabitPercentage();

  // Filtered facts directory
  const factCategories = ['All', 'Neuroscience', 'Hormones', 'Somatic Psychology', 'Sleep Biology', 'Microbiome', 'Cognitive', 'Social Psychology', 'Gratitude Biology', 'Habit Loops'];
  const filteredFactsList = facts.filter((f) => {
    const matchesSearch = f.text.toLowerCase().includes(factSearch.toLowerCase()) || 
                          f.topic.toLowerCase().includes(factSearch.toLowerCase());
    const matchesCategory = factCategoryFilter === 'All' || f.topic.toLowerCase() === factCategoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Toggle 7-Day Care Plan Item
  const togglePlanDay = (day: number) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter(d => d !== day));
    } else {
      setCompletedDays([...completedDays, day]);
    }
  };

  const selectedDayData = SEVEN_DAY_PLAN.find(d => d.day === selectedPlanDay)!;
  const isSelectedDayCompleted = completedDays.includes(selectedPlanDay);
  const planProgressPercent = Math.round((completedDays.length / 7) * 100);

  return (
    <div id="wellness_hub_section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 border border-indigo-100/40">
          <Calendar className="h-3.5 w-3.5" />
          <span>Section 3 • Interactive Lab Work</span>
        </span>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Resources & Wellness Hub
        </h1>
        <p className="font-sans text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
          An interactive laboratory of somatic stress management tools. Log habits, customize diagnostic self-care boards, study neuropsycholo-gical facts, and tackle our 7-day care pacer.
        </p>
      </div>

      {/* Segmented Control / Tab Navigation */}
      <div className="flex justify-center mb-10 border-b border-slate-150">
        <div className="flex flex-wrap items-center justify-center p-1 bg-slate-100/80 rounded-2xl gap-1">
          <button
            id="tab_generators"
            onClick={() => setActiveTab('generators')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'generators'
                ? 'bg-white text-indigo-900 shadow-md shadow-slate-200/50'
                : 'text-slate-650 hover:text-slate-950'
            }`}
          >
            <Sparkles className="h-4 w-4 text-indigo-500" />
            <span>Science Facts & Generators</span>
          </button>
          
          <button
            id="tab_trackers"
            onClick={() => setActiveTab('trackers')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'trackers'
                ? 'bg-white text-indigo-900 shadow-md shadow-slate-200/50'
                : 'text-slate-650 hover:text-slate-950'
            }`}
          >
            <Calendar className="h-4 w-4 text-indigo-500" />
            <span>Trackers & Live Planners</span>
          </button>

          <button
            id="tab_7day_plan"
            onClick={() => setActiveTab('plan')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'plan'
                ? 'bg-white text-indigo-900 shadow-md shadow-slate-200/50'
                : 'text-slate-650 hover:text-slate-950'
            }`}
          >
            <Award className="h-4 w-4 text-indigo-500" />
            <span className="flex items-center space-x-1">
              <span>7-Day Care Plan</span>
              {completedDays.length > 0 && (
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-600 font-mono text-[9px] font-black text-white">
                  {completedDays.length}
                </span>
              )}
            </span>
          </button>

          <button
            id="tab_faqs"
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'faqs'
                ? 'bg-white text-indigo-900 shadow-md shadow-slate-200/50'
                : 'text-slate-650 hover:text-slate-950'
            }`}
          >
            <HelpCircle className="h-4 w-4 text-indigo-500" />
            <span>FAQs Accordion</span>
          </button>
        </div>
      </div>

      {/* ----------------- TAB 1: DAILY GENERATORS & SCIENCE FACTS ----------------- */}
      {activeTab === 'generators' && (
        <div className="space-y-10 animate-fade-in text-left">
          {/* Daily micro generators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Wellness Tip Generator Card */}
            <div className="rounded-2xl border border-slate-150/60 bg-white p-6 shadow-sm hover:border-indigo-400/20 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700 border border-indigo-100/30 uppercase tracking-widest">
                    Tip #{currentTip.id} • {currentTip.category}
                  </span>
                  <Smile className="h-4.5 w-4.5 text-indigo-500 animate-pulse" />
                </div>
                <p className="font-sans text-sm font-semibold text-slate-850 leading-relaxed min-h-[96px]">
                  "{currentTip.text}"
                </p>
              </div>
              <button
                id="btn_roll_tip"
                onClick={rollTip}
                className="mt-6 w-full flex items-center justify-center space-x-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-650 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Next Wellness Tip</span>
              </button>
            </div>

            {/* Quotes Generator Card */}
            <div className="rounded-2xl border border-slate-150/60 bg-white p-6 shadow-sm hover:border-indigo-400/20 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700 border border-indigo-100/30 uppercase tracking-widest">
                    Quote #{currentQuote.id}
                  </span>
                  <Quote className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="min-h-[96px] space-y-2 flex flex-col justify-between">
                  <p className="font-sans text-xs italic text-slate-650 leading-relaxed">
                    "{currentQuote.text}"
                  </p>
                  <p className="font-sans text-xs font-black text-slate-900 text-right">
                    — {currentQuote.author}
                  </p>
                </div>
              </div>
              <button
                id="btn_roll_quote"
                onClick={rollQuote}
                className="mt-6 w-full flex items-center justify-center space-x-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-650 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Next Mindful Quote</span>
              </button>
            </div>

            {/* Quick Science Fact Card */}
            <div className="rounded-2xl border border-slate-150/60 bg-white p-6 shadow-sm hover:border-indigo-400/20 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700 border border-indigo-100/30 uppercase tracking-widest">
                    Science Fact #{currentFact.id}
                  </span>
                  <Award className="h-4.5 w-4.5 text-indigo-500" />
                </div>
                <div className="space-y-1 min-h-[96px]">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">{currentFact.topic} Mechanism</span>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed">
                    {currentFact.text}
                  </p>
                </div>
              </div>
              <button
                id="btn_roll_fact"
                onClick={rollFact}
                className="mt-6 w-full flex items-center justify-center space-x-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-650 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Roll Another Fact</span>
              </button>
            </div>

          </div>

          {/* Large Searchable Science Directory */}
          <div className="rounded-3xl border border-slate-150/60 bg-white p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="text-left">
                <h3 className="font-display text-lg font-bold text-slate-900">Academic Neuropsychology Directory</h3>
                <p className="font-sans text-xs text-slate-500 leading-normal">Interactive glossary detailing hormone cascades, neural pathways, and physiological biological studies.</p>
              </div>

              {/* Filtering input group */}
              <div className="flex flex-col sm:flex-row gap-2.5 max-w-md w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
                  <input
                    id="science_search"
                    type="text"
                    placeholder="Search topics or terms..."
                    value={factSearch}
                    onChange={(e) => setFactSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-250 bg-slate-50/50 focus:border-indigo-550 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-305 focus:border-indigo-550"
                  />
                </div>
                
                <select
                  id="science_category"
                  value={factCategoryFilter}
                  onChange={(e) => setFactCategoryFilter(e.target.value)}
                  className="rounded-xl border border-slate-250 text-xs px-3.5 py-2 bg-slate-50/50 hover:bg-white text-slate-700 focus:outline-none"
                >
                  {factCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtered Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFactsList.length > 0 ? (
                filteredFactsList.map((f) => (
                  <div key={f.id} className="p-4 rounded-xl border border-slate-100/80 bg-slate-50/30 flex items-start space-x-3 text-left">
                    <div className="h-7 w-7 rounded-lg bg-indigo-50 border border-indigo-100/30 flex items-center justify-center font-mono text-xs font-bold text-indigo-700 shrink-0">
                      {f.id}
                    </div>
                    <div className="space-y-1.5 font-sans">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-mono leading-none font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          {f.topic}
                        </span>
                      </div>
                      <p className="text-xs text-slate-650 leading-relaxed">
                        {f.text}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 py-10 text-center space-y-2">
                  <AlertCircle className="h-8 w-8 text-slate-350 mx-auto" />
                  <p className="font-sans text-xs text-slate-500 font-bold">No biological profiles matched your specific inquiry.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB 2: TRACKERS & LIVE PLANNERS ----------------- */}
      {activeTab === 'trackers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in text-left">
          
          {/* Column A: Checklist & Planner (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Somatic Checklist Box */}
            <div className="rounded-3xl border border-slate-150/60 bg-white p-6 md:p-8 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-display text-lg font-bold text-slate-900">Somatic Care Daily Checklist</h3>
                <p className="font-sans text-xs text-slate-500 mt-1">Check off essential physical routines to signal safety to your pituitary structures.</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    id={`check_item_${item.id}`}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`flex items-center space-x-3.5 py-4.5 px-5 rounded-2xl text-left border cursor-pointer transition-all ${
                      item.completed 
                        ? 'bg-emerald-50/35 border-emerald-300 text-slate-500 line-through' 
                        : 'border-slate-150 bg-white hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                      item.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                    }`}>
                      {item.completed && <Check className="h-3 w-3" />}
                    </div>
                    <span className="font-sans text-xs font-semibold leading-relaxed">{item.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Self-Care Planner Tool */}
            <div className="rounded-3xl border border-slate-150/60 bg-white p-6 md:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-display text-lg font-bold text-slate-900">Diagnostic Self-Care Planner</h3>
                <p className="font-sans text-xs text-slate-500 mt-1">Architect and schedule localized coping buffers matching your specific stress profiles.</p>
              </div>

              {/* Addition Form */}
              <form onSubmit={addSelfCareActivity} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-stretch">
                <div className="sm:col-span-7">
                  <input
                    id="new_activity_input"
                    type="text"
                    required
                    placeholder="E.g., Practice 4-7-8 deep breathing during lunch gap"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-205 border-slate-200 bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-305"
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <select
                    id="new_category_select"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 text-xs px-3.5 py-2.5 bg-slate-50/35 hover:bg-white text-slate-700 focus:outline-none"
                  >
                    <option value="Physical">⚙️ Physical</option>
                    <option value="Mental">🧠 Mental</option>
                    <option value="Relationship">👥 Interpersonal</option>
                  </select>
                </div>

                <button
                  id="btn_add_selfcare"
                  type="submit"
                  className="sm:col-span-2 rounded-xl bg-slate-950 text-white flex items-center justify-center py-2.5 text-xs font-bold transition-all hover:bg-slate-800 cursor-pointer shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-0.5" />
                  <span>Build</span>
                </button>
              </form>

              {/* Interactive Lists */}
              <div className="space-y-3 pt-2">
                {selfCareList.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center rounded-xl border border-slate-100 bg-slate-50/30 p-3.5 transition-all shadow-xs"
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <button
                        id={`selfcare_check_${item.id}`}
                        onClick={() => toggleSelfCareItem(item.id)}
                        className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 cursor-pointer ${
                          item.completed ? 'bg-indigo-650 border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {item.completed && <Check className="h-3 w-3" />}
                      </button>
                      <div className="font-sans text-xs font-medium">
                        <span className={item.completed ? 'line-through text-slate-400' : 'text-slate-800'}>
                          {item.activity}
                        </span>
                        <span className={`ml-2 inline-block rounded font-mono text-[9px] font-bold uppercase tracking-wider px-1.5 ${
                          item.category === 'Mental' 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : item.category === 'Relationship' 
                              ? 'bg-amber-50 text-amber-700' 
                              : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`selfcare_delete_${item.id}`}
                      onClick={() => deleteSelfCareItem(item.id)}
                      className="text-slate-350 hover:text-rose-600 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Column B: Habits Tracker (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="rounded-3xl bg-slate-950 text-white p-6 md:p-8 shadow-xl shadow-slate-200/5 space-y-6">
              <div className="border-b border-white/5 pb-4 text-left">
                <span className="font-mono text-[9px] text-indigo-400 uppercase tracking-widest font-black leading-none">Biometric tracking</span>
                <h3 className="font-display text-lg font-bold text-white mt-1">Weekly Habits Grid</h3>
                <p className="font-sans text-xs text-slate-400 mt-1 leading-normal">
                  Log key somatic checkpoints daily. Audit weekly habits to maintain target autonomic baselines.
                </p>
              </div>

              {/* Gauge ring details */}
              <div className="flex items-center space-x-4 border-b border-white/5 pb-6">
                <div className="text-left flex-1">
                  <span className="block font-mono text-[9px] text-slate-500 uppercase font-extrabold">Weekly compliance</span>
                  <span className="font-display text-2xl font-black">{habitCompletionRate}% Complete</span>
                  <span className="block text-[10px] text-slate-400 font-sans leading-tight mt-0.5">Maintain &gt;75% to preserve immune boundaries.</span>
                </div>
                
                {/* Visual indicator lines */}
                <div className="h-3 w-28 bg-white/10 rounded-full overflow-hidden shrink-0 flex">
                  <div 
                    className="bg-indigo-650 bg-indigo-500 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${habitCompletionRate}%` }}
                  />
                </div>
              </div>

              {/* Day-by-day table */}
              <div className="space-y-3 pt-2 text-left">
                {(Object.entries(habits) as [string, { sleep: boolean; breathing: boolean; detox: boolean }][]).map(([day, values]) => (
                  <div key={day} className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="font-mono text-xs font-bold text-slate-300 w-10 text-left">{day}</span>
                    
                    <div className="flex space-x-2.5">
                      {/* Sleep habit button */}
                      <button
                        id={`habit_sleep_${day}`}
                        onClick={() => toggleHabit(day, 'sleep')}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
                          values.sleep 
                            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-400/20' 
                            : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-white'
                        }`}
                        title="Sleep Hygiene adheres"
                      >
                        <Moon className="h-4 w-4" />
                      </button>

                      {/* Breathing habit button */}
                      <button
                        id={`habit_breath_${day}`}
                        onClick={() => toggleHabit(day, 'breathing')}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
                          values.breathing 
                            ? 'bg-sky-600 text-white shadow-sm shadow-sky-450/20' 
                            : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-sky-400'
                        }`}
                        title="5-minute Breathing"
                      >
                        <Shield className="h-4  w-4" />
                      </button>

                      {/* Detox habit button */}
                      <button
                        id={`habit_detox_${day}`}
                        onClick={() => toggleHabit(day, 'detox')}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer ${
                          values.detox 
                            ? 'bg-amber-500 text-white shadow-sm shadow-amber-450/20' 
                            : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-amber-400'
                        }`}
                        title="Evening Digital Detox"
                      >
                        <Footprints className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend grid */}
              <div className="border-t border-white/5 pt-4 space-y-2 text-left">
                <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Legend keys</span>
                <div className="flex items-center space-x-2 text-[11px] text-slate-350 font-sans">
                  <div className="h-4.5 w-4.5 bg-indigo-600 rounded items-center justify-center flex text-white shadow-sm"><Moon className="h-3 w-3" /></div>
                  <span>Sleep schedule compliance (8h / screen-free bedroom)</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-355 font-sans">
                  <div className="h-4.5 w-4.5 bg-sky-600 rounded items-center justify-center flex text-white shadow-sm"><Shield className="h-3 w-3" /></div>
                  <span>Breathwork compliance (5 mins of Somatic work)</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-355 font-sans">
                  <div className="h-4.5 w-4.5 bg-amber-500 rounded items-center justify-center flex text-white shadow-sm"><Footprints className="h-3 w-3" /></div>
                  <span>Digital shutdown compliance (DND after 7 PM)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ----------------- *NEW* TAB 3: 7-DAY STRESS MANAGEMENT PLAN ----------------- */}
      {activeTab === 'plan' && (
        <div className="space-y-8 animate-fade-in text-left">
          
          {/* Top visual metrics banner */}
          <div className="rounded-3xl border border-slate-150/65 bg-white p-6 md:p-8 shadow-xl shadow-slate-100/30 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <span className="inline-flex items-center space-x-1 rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-700 uppercase">
                Structured Care Track
              </span>
              <h3 className="font-display text-2xl font-black text-slate-900">
                Laraib Javaid’s 7-Day Care Alignment
              </h3>
              <p className="font-sans text-sm text-slate-550 text-slate-500 leading-relaxed">
                A research-directed, step-by-step cognitive and somatic stabilization program. Check off accomplishments daily to complete the cycle and rebuild cerebral storage.
              </p>
            </div>

            {/* Circular progress gauge */}
            <div className="md:col-span-4 flex items-center justify-center bg-slate-50 border border-slate-100/70 p-5 rounded-2xl md:ml-4">
              <div className="text-left flex-1 space-y-0.5">
                <span className="block font-mono text-[8px] uppercase font-black tracking-widest text-slate-400">Pacer Progress</span>
                <span className="block font-display text-2xl font-black text-indigo-950 font-display">{planProgressPercent}%</span>
                <span className="block font-sans text-[10px] font-bold text-slate-500 uppercase">{completedDays.length} / 7 DAYS COMPLETED</span>
              </div>
              <div className="relative h-16 w-16 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm shrink-0">
                <svg className="absolute transform -rotate-90 w-14 h-14">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    className="stroke-slate-100"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    className="stroke-indigo-600 transition-all duration-500"
                    strokeWidth="3.5"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 - (planProgressPercent / 100) * 2 * Math.PI * 24}
                    strokeLinecap="round"
                  />
                </svg>
                <Award className="h-5.5 w-5.5 text-indigo-600 shrink-0" />
              </div>
            </div>

          </div>

          {/* Interactive grid with 7 visual success cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 pt-2">
            {SEVEN_DAY_PLAN.map((item) => {
              const isCompleted = completedDays.includes(item.day);
              const isSelected = selectedPlanDay === item.day;
              return (
                <button
                  key={item.day}
                  id={`plan_day_card_${item.day}`}
                  onClick={() => setSelectedPlanDay(item.day)}
                  className={`relative p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between items-center space-y-3 shadow-xs hover:shadow-${isSelected ? 'lg' : 'sm'} hover:scale-[1.02] ${
                    isSelected 
                      ? 'border-indigo-650 ring-2 ring-indigo-500/10 bg-white font-bold' 
                      : isCompleted
                        ? 'bg-indigo-50/15 border-indigo-200 hover:bg-white'
                        : 'border-slate-150 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="block font-mono text-[9px] font-black uppercase tracking-wider text-slate-400">Day 0{item.day}</span>
                    <div className="text-2xl pt-1 select-none leading-none">{item.illustrationEmoji}</div>
                  </div>
                  
                  <span className="block font-sans text-[10px] sm:text-xs font-semibold tracking-tight text-slate-800 line-clamp-1 w-full leading-none">
                    {item.category}
                  </span>

                  {/* Complete status pill */}
                  <div className={`flex h-4 w-4 items-center justify-center rounded-full border text-[8px] font-bold ${
                    isCompleted 
                      ? 'bg-indigo-650 border-indigo-600 bg-indigo-600 text-white' 
                      : 'border-slate-300'
                  }`}>
                    {isCompleted && <Check className="h-2.5 w-2.5" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Large dynamic detailed challenge panel */}
          <div className="rounded-3xl border border-slate-155 border-slate-200 bg-white p-6 md:p-8 shadow-xl shadow-slate-100/20 grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative overflow-hidden">
            {/* Background design accents */}
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${selectedDayData.bgGradient}`} />

            {/* Left detailed diagnostic columns */}
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="inline-block rounded bg-indigo-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700 uppercase">
                  ACTIVE CHALLENGE PROFILE • DAY {selectedDayData.day}
                </span>
                <h4 className="font-display text-2xl font-black text-slate-900 leading-snug">
                  {selectedDayData.title}
                </h4>
              </div>

              {/* Challenge summary box */}
              <div className="bg-slate-50 border border-slate-100/60 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-slate-800 font-bold">
                  <Clock className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
                  <span className="font-sans text-xs uppercase tracking-wider">The Daily Task Protocol</span>
                </div>
                <p className="font-sans text-xs text-slate-700 leading-relaxed font-semibold">
                  {selectedPlanDay === 7 ? selectedDayData.challenge : `Your challenge today: ${selectedDayData.challenge}`}
                </p>
              </div>

              {/* Mechanism breakdown */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <Brain className="h-4.5 w-4.5 text-indigo-600" />
                  </div>
                  <div className="font-sans text-xs">
                    <h5 className="font-extrabold text-slate-900 uppercase tracking-wider mb-1">Biological Neuro-Pathway Mechanism</h5>
                    <p className="text-slate-500 leading-relaxed">{selectedDayData.academicMechanism}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                  </div>
                  <div className="font-sans text-xs">
                    <h5 className="font-extrabold text-slate-900 uppercase tracking-wider mb-1">Somatic Implementation Assignment</h5>
                    <p className="text-slate-500 leading-relaxed">{selectedDayData.somaticTask}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right action controls card */}
            <div className="md:col-span-4 rounded-2xl bg-slate-950 text-white p-6 space-y-5 flex flex-col justify-between shadow-lg text-left self-stretch">
              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[8px] font-black uppercase text-indigo-400">STATE CONTROL</span>
                  <div className={`h-2 w-2 rounded-full ${isSelectedDayCompleted ? 'bg-indigo-550 bg-indigo-500' : 'bg-rose-500 animate-pulse'}`} />
                </div>
                <h5 className="font-display text-base font-bold">Status: {isSelectedDayCompleted ? 'Completed Successfully' : 'Active / Pending'}</h5>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  Perform the somatic task described on the left. Once completed, toggle this switch to catalog your diagnostic baseline progress.
                </p>
              </div>

              <div className="pt-2">
                <button
                  id="btn_toggle_day"
                  onClick={() => togglePlanDay(selectedPlanDay)}
                  className={`w-full flex items-center justify-center space-x-2 rounded-xl py-3.5 text-xs font-bold transition-all cursor-pointer ${
                    isSelectedDayCompleted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-705 shadow-emerald-700/25'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-650/30'
                  }`}
                >
                  <CheckSquare className="h-4 w-4 shrink-0" />
                  <span>{isSelectedDayCompleted ? 'Reset Day Settings' : 'Mark Day as Completed'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ----------------- TAB 4: FREQUENTLY ASKED QUESTIONS ----------------- */}
      {activeTab === 'faqs' && (
        <div className="mx-auto max-w-3xl space-y-4 animate-fade-in text-left">
          <div className="mb-6">
            <h3 className="font-display text-lg font-bold text-slate-900">Psychology & Stress FAQ Database</h3>
            <p className="font-sans text-xs text-slate-500 mt-1">Explore exactly 20 research-level questions and answers regarding nervous systems, hormones, and somatic adjustments.</p>
          </div>
          
          <div className="space-y-3.5">
            {faqs.map((item) => {
              const isExpanded = expandedFaqId === item.id;
              return (
                <div 
                  key={item.id}
                  className="rounded-xl border border-slate-150/65 bg-white shadow-sm overflow-hidden hover:border-indigo-400/25 transition-all"
                >
                  <button
                    id={`faq_toggle_${item.id}`}
                    onClick={() => setExpandedFaqId(isExpanded ? null : item.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-sans font-extrabold text-sm text-slate-850 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <span>{item.id}. {item.question}</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-indigo-600 shrink-0 ml-2" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-2" />}
                  </button>

                  {isExpanded && (
                    <div 
                      id={`faq_answer_${item.id}`}
                      className="px-5 pb-5 pt-1 text-xs text-slate-650 leading-relaxed font-sans border-t border-slate-50 bg-slate-50/15"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
