export type Page =
  | 'home'
  | 'understanding'
  | 'breathing'
  | 'coping'
  | 'assessment'
  | 'applications'
  | 'resources'
  | 'about';

export interface CopingStrategy {
  id: string;
  title: string;
  category: string;
  iconName: string;
  explanation: string;
  psychologicalBenefits: string;
  realLifeExample: string;
  practicalTips: string[];
}

export interface Question {
  id: number;
  text: string;
  category: 'emotional' | 'physical' | 'behavioral' | 'academic';
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  situation: string;
  symptoms: string[];
  psychologicalImpact: string;
  solution: string;
  recommendedCoping: string[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface Tip {
  id: number;
  category: string;
  text: string;
}

export interface Quote {
  id: number;
  author: string;
  text: string;
}

export interface Fact {
  id: number;
  topic: string;
  text: string;
}
