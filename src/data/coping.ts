import { CopingStrategy } from '../types';

export const copingStrategies: CopingStrategy[] = [
  {
    id: "exercise",
    title: "Somatic Aerobic Exercise",
    category: "Physical",
    iconName: "Dumbbell",
    explanation: "Engaging in moderate-to-vigorous rhythmic muscle activation metabolizes high concentrations of circulating stress hormones (adrenaline and cortisol) that would otherwise fuel chronic hyper-arousal. This process also significantly improves skeletal oxygenation and releases metabolic tension stored in large muscle blocks.",
    psychologicalBenefits: "Directly triggers the secretion of beta-endorphins—the body's endogenous emotional regulators—and raises concentrations of Brain-Derived Neurotrophic Factor (BDNF) which preserves prefrontal synaptic plasticity, combats brain fog, improves structural working memory, and restores sleep efficiency.",
    realLifeExample: "Nadia, an executive sophomore facing four clashing midterms, notes her hands trembling and her vision blurring after three hours of static reading. She walks outside for a fast 25-minute jogging workout. Upon her return, her respiratory cycle has calmed to normal and her verbal retention is restored.",
    practicalTips: [
      "Aim for at least 150 minutes of moderate aerobic activity weekly or 20 minutes daily.",
      "Incorporate brisk stair-climbing or bodyweight squats during study breaks to reset somatic load.",
      "Select physical activities that you genuinely enjoy (e.g., swimming, cycling, dancing) to improve compliance."
    ]
  },
  {
    id: "sleep-hygiene",
    title: "Sleep Hygiene Optimization",
    category: "Physiological",
    iconName: "Moon",
    explanation: "Restoring natural circadian alignment through structural behavioral parameters before sleeping. Deep slow-wave sleep engages the brain's unique glymphatic drainage pathways, effectively scrubbing toxic metabolic debris accumulated during high-density intellectual exertion, while consolidating long-term cognitive files.",
    psychologicalBenefits: "Preserves critical prefrontal cortex executive functioning. This prevents emotional volatility, keeps academic irritation in check, repairs frustration thresholds, and allows the amygdala to recalibrate its threat-detection baselines during healthy Rapid Eye Movement (REM) cycles.",
    realLifeExample: "Arthur suffers from late-night heart racing and sleep-onset insomnia. He sets a strict phone alarm at 10 PM, placing his device in a drawer, and engages in light fiction reading in dim lighting. Within ten days, his latency to fall asleep drops from 90 minutes to under 15 minutes.",
    practicalTips: [
      "Maintain a rigid sleep-wake schedule, keeping sleep boundaries identical even on weekends.",
      "Turn off all blue-light-emitting electronic screens at least 60 minutes before your scheduled bedtime.",
      "Establish an eye-safe environment by keeping your bedroom temperature cold, dark, and entirely silent."
    ]
  },
  {
    id: "time-management",
    title: "Cognitive Time Management",
    category: "Cognitive",
    iconName: "Clock",
    explanation: "Applying systematic organizational matrices to break complex, high-stakes workloads into discrete temporal blocks. This breaks down abstract objectives (which the brain interprets as singular, overwhelming, uncontrollable threats) into immediate, action-oriented, predictable milestones.",
    psychologicalBenefits: "Bypasses executive dysfunction and procrastination loops caused by fear of failure. It cultivates a robust Sense of Agency, boosts self-efficacy, preserves cognitive load capacity, and reduces the anticipatory anxiety associated with severe project timelines.",
    realLifeExample: "Chloe faces a 20-page final psychology review that has caused her to procrastinate for two weeks. She stops looking at the total page count and commits to writing exactly two paragraphs every morning at her quiet desk. This bite-sized approach allows her to complete the draft without a panic-fueled all-nighter.",
    practicalTips: [
      "Deconstruct abstract goals into discrete action points utilizing the urgent-vs-important Eisenhower Matrix.",
      "Implement Pomodoro cycles: 25 minutes of singular focused study, followed by a mandatory 5-minute somatic rest.",
      "Commit to listing no more than three core, non-negotiable achievements for any single day."
    ]
  },
  {
    id: "healthy-eating",
    title: "Nutritional Psychiatry Alignment",
    category: "Physiological",
    iconName: "Apple",
    explanation: "Consuming a dense, low-glycemic, anti-inflammatory whole-foods profile that establishes stable biochemical levels and supports the enteric nervous system. The gut microbiome synthesis serves as the production site for over 90% of your body's serotonin, relying on dietary amino acids and trace nutrients.",
    psychologicalBenefits: "Eliminates blood-sugar volatility. Spikes in refined sugar spark sharp insulin drops, which trigger secondary epinephrine (adrenaline) releases, inducing physical sensations (such as heart palpitations, sweating, and tremors) that provoke panic.",
    realLifeExample: "Brenda switches from triple-espresso coffees and sugary donuts during lectures to whole-wheat avocado toast, walnuts, and green tea. She notes an absolute cessation of her typical 3:00 PM mood crashes and brain fog.",
    practicalTips: [
      "Incorporate leafy greens, raw nuts, complex carbohydrates, and high-mineral proteins into every major meal.",
      "Keep raw unsweetened snacks like almonds or blueberries within your primary study space.",
      "Swap high-caffeine and high-sugar energy drinks for pure water or non-caffeinated herbal teas."
    ]
  },
  {
    id: "social-support",
    title: "Active Social Cohesion",
    category: "Interpersonal",
    iconName: "Users",
    explanation: "Engaging in genuine interpersonal vulnerability and community support dialogues, which safely down-regulates the mammalian isolation alarm. Healthy bonding overrides the threat-response system by establishing external cues of safety and cooperative security.",
    psychologicalBenefits: "Triggers immediate endocrine releases of oxytocin, which directly counteracts cortisol's vasopressive action and lowers systemic blood tension. It also provides validation, reduces the shame associated with struggling, and allows for objective cognitive reframing.",
    realLifeExample: "Devon feels intensely isolated and incompetent during his programming semester, convinced everyone else is mastering the course easily. He joins a group study circle. After discussing their shared struggles over tea, his academic anxiety drops.",
    practicalTips: [
      "Schedule small, regular, recurring catch-ups with friends or family where academics is not the main topic.",
      "Share your emotional difficulties honestly with people you trust, allowing them to support you.",
      "Actively engage in student associations, interest clubs, or community volunteer groups."
    ]
  },
  {
    id: "mindfulness",
    title: "Somatic Mindfulness Grounding",
    category: "Cognitive",
    iconName: "Eye",
    explanation: "Cultivating sustained, non-reactive, moment-by-moment sensory awareness of immediate environment cues and internal sensations, breaking the recursive loops of future-oriented worry and past-oriented regret.",
    psychologicalBenefits: "Suppresses over-activation of the brain's default mode network (DMN), which is the neural center for self-referential rumination, worry, and sadness. It strengthens the communication pathways between the prefrontal cortex and the amygdala, encouraging rapid emotional de-escalation.",
    realLifeExample: "Fatima experiences a major panic spiral in the university library. She sits down, closes her eyes, and uses the 5-4-3-2-1 sensory grounding rule to identify concrete shapes, sounds, and textures. Her breathing rate stabilizes quickly.",
    practicalTips: [
      "Utilize sensory grounding checklists to pull yourself out of high-velocity recursive stress loops.",
      "Bring slow, complete, mindful awareness to routine physical tasks like drinking water or walking.",
      "Notice intrusive thoughts without judging or suppressing them; let them float away like leaves on a stream."
    ]
  },
  {
    id: "meditation",
    title: "Focused Attention Meditation",
    category: "Cognitive",
    iconName: "Heart",
    explanation: "Sustaining a dedicated mental discipline that uses a selected focal point (such as physical breathing sensation or auditory mantra) as an anchor. When your attention drifts, you gently guide it back to that anchor.",
    psychologicalBenefits: "Clinically demonstrated to increase gray-matter density in the hippocampus (memory and spatial learning) and decrease cellular volume in the amygdala (fear and distress response). This lowers baseline anxiety, improves cognitive flexibility, and supports calm focus during stressful tasks.",
    realLifeExample: "Marcus practices silent focused breathing for ten minutes in the morning. He notices that when he faces difficult programming errors, his immediate frustration is muted, and he explores technical solutions with a clear head.",
    practicalTips: [
      "Begin with short, approachable sessions of 3-5 minutes and extend them gradually over many weeks.",
      "Use high-quality guided audios to help center your attention if self-guided silence feels initially overwhelming.",
      "Do not criticize yourself when your mind wanders; returning to the focus is the core bicep-curl of meditation."
    ]
  },
  {
    id: "journaling",
    title: "Expressive Cognitive Journaling",
    category: "Cognitive",
    iconName: "BookOpen",
    explanation: "Translating formless, chaotic, high-stress emotional experiences into precise physical language. This practice transfers heavy emotional burdens from the reactive amygdala into the analytical left hemisphere of the brain, creating psychological distance.",
    psychologicalBenefits: "Organizes emotional processing, fosters self-reflection, and reduces working memory overload. Clinically, expressive writing has been shown to boost systemic immune functions and reduce the physical symptoms of chronic stress.",
    realLifeExample: "Sam feels a heavy, non-specific dread before sleeping. He opens a notebook and writes with absolute honesty about his worst academic fears. Seeing his anxieties on paper helps him recognize that his fears are manageable, allowing him to sleep peacefully.",
    practicalTips: [
      "Use the 'brain dump' approach: write continuously for 10 minutes without worrying about grammar, spelling, or structure.",
      "Incorporate a daily gratitude log: write down three highly specific, positive moments from your day.",
      "Use physical pen and paper to create a tactical, screen-free routine before sleeping."
    ]
  },
  {
    id: "positive-self-talk",
    title: "Constructive Self-Talk & Reframing",
    category: "Cognitive",
    iconName: "Sparkles",
    explanation: "Identifying automatic, highly punishing negative cognitive distortions (such as catastrophizing, mind-reading, or all-or-nothing thinking) and actively reframing them with balanced, evidence-based, supportive internal dialogues.",
    psychologicalBenefits: "Fosters self-compassion, breaks negative self-fulfilling prophecy loops, and builds cognitive resilience. It strengthens emotional control by ensuring your internal narrative relies on actual facts rather than irrational panic.",
    realLifeExample: "Liam catches his inner critic saying, 'You failed this mock code, you're going to fail the course and your life is ruined.' He pauses and reframes it: 'This mock code was tough, but it's a diagnostic tool. I see my weak points and have two weeks to study and pass.'",
    practicalTips: [
      "Interrogate absolute statements (e.g., 'I always mess up' or 'I will never understand this') with direct, factual evidence.",
      "Speak to yourself using the same supportive language you would use with a close, respected friend.",
      "Reframe personal difficulties as specific lessons and opportunities to build strength."
    ]
  },
  {
    id: "relaxation-techniques",
    title: "Progressive Somatic Relaxation",
    category: "Physiological",
    iconName: "Wind",
    explanation: "Employing physical protocols like Progressive Muscle Relaxation (PMR), deep-tissue warmth therapy, or somatic stretches to systematically release stored muscle tension and normalize biochemical parameters.",
    psychologicalBenefits: "Provides direct feedback of physical safety to the central nervous system, bypassing mental worries. It systematically neutralizes involuntary muscle guarding, balances systemic physical fatigue, and induces deep calm.",
    realLifeExample: "Julia experiences severe neck and shoulder pain when writing essays. She performs a 10-minute Progressive Muscle Relaxation sequence, systematically tensing and releasing her muscle groups. Her physical tension dissolves, and she returns to her work with a relaxed body.",
    practicalTips: [
      "Systematically tense specific muscle groups for 7 seconds, then fully release and feel the contrast for 15 seconds.",
      "Incorporate warm epsom salt baths or heating wraps to soothe chronic physical fatigue.",
      "Practice simple restorative yoga postures (such as Child's Pose) for 5-10 minutes during study breaks."
    ]
  },
  {
    id: "digital-detox",
    title: "Digital Boundary Containment",
    category: "Environment",
    iconName: "Smartphone",
    explanation: "Deliberately limiting your exposure to high-frequency digital triggers, endless social feeds, and clashing push notifications. This reduces the continuous flood of artificial attention-grabbing stimuli that keep the brain's dopamine pathways constantly over-stimulated.",
    psychologicalBenefits: "Limits constant, anxiety-inducing peer comparisons, and reduces social media-induced cortisol spikes. It restores your natural attention span, reduces restless mental chatter, and promotes deep recovery.",
    realLifeExample: "Zoe notices she feels a knot of dread in her stomach every time she hears a mobile notification. She silences all non-essential apps and sets a strict rule to lock her devices by 7:30 PM, noting an immediate rise in evening calm.",
    practicalTips: [
      "Enforce tech-free zones in your home, especially at the dining table and in your bedroom.",
      "Configure your phone's 'Do Not Disturb' or 'Sleep Mode' to automatically activate at a set hour every evening.",
      "Schedule a monthly full-day digital detox to reconnect with offline hobbies and nature."
    ]
  },
  {
    id: "hobbies-recreation",
    title: "Low-Stakes Creative Recreation",
    category: "Interpersonal",
    iconName: "Palette",
    explanation: "Shedding performance anxiety by engaging in creative, non-academic play and hobbies where there is absolutely no pressure to deliver, compete, or achieve peer approval.",
    psychologicalBenefits: "Provides a healthy distraction that stops rumination. It stimulates secondary dopamine reward channels, promotes confidence, and reinforces your self-worth outside of grades, work accomplishments, or professional standing.",
    realLifeExample: "Ethan, an analytical computer science student, begins painting watercolors once a week. Because he is focused entirely on color blends rather than matching a grade standard, his mind enters a deeply calm state.",
    practicalTips: [
      "Set aside a sacred block of weekly time dedicated entirely to non-professional, low-stakes hobbies.",
      "Focus your energy purely on the fun of the creative process rather than judging the final product.",
      "Engage in hands-on, tactile activities (such as sketching, baking, clay modeling, or gardening)."
    ]
  },
  {
    id: "nature-walks",
    title: "Nature Walks & Ecotherapy",
    category: "Environment",
    iconName: "Compass",
    explanation: "Immersing yourself in green, natural settings and quiet outdoor spaces. Exposure to natural landscapes has been shown to reduce blood pressure, slow heart rates, and lower concentrations of circulating salivary cortisol.",
    psychologicalBenefits: "Restores cognitive concentration by engaging 'soft fascination' channels (where attention is held effortlessly by pleasant natural stimuli like leaves or water). This relieves intense brain fatigue, lifts depressed moods, and quietens active amygdala worries.",
    realLifeExample: "Ezad feels completely burnt out and unable to focus after working on an essay for hours. Instead of scrolling on his phone, he spends 20 minutes walking in a nearby green park. Inspecting the green pathways clears his mind and restores his energy.",
    practicalTips: [
      "Spend at least 20 minutes daily walking in a local park, nature trail, or quiet lakeside path.",
      "Put away your phone during your walks; instead, focus entirely on the physical colors, smells, and natural sounds.",
      "Keep indoor house plants in your primary study or work spaces to promote daily environmental calm."
    ]
  },
  {
    id: "gratitude-practice",
    title: "Sustained Gratitude Journaling",
    category: "Cognitive",
    iconName: "Heart",
    explanation: "Actively training your brain to scan, identify, and document concrete positive elements and moments in your daily life. This systematically shifts your attention away from threats, disappointments, or worries.",
    psychologicalBenefits: "Clinically shown to stimulate active neural releases of dopamine and serotonin, which lift moods internally. It weakens the brain's default negativity bias, improves resilience when facing setbacks, and supports restorative sleep.",
    realLifeExample: "Taha feels highly discouraged and pessimistic after a tough lecture. Before bed, he writes down three very specific positive things: a great cup of tea, a funny joke from a friend, and a comfortable warm room. This shifts his perspective, allowing him to sleep peacefully.",
    practicalTips: [
      "Write down three highly specific things you are grateful for every single evening in a dedicated journal.",
      "Focus on small, sensory details (like the warmth of a morning coffee or a kind smile) rather than grand achievements.",
      "Take time once a week to write a short, honest thank-you message or card to someone who supported you."
    ]
  }
];
