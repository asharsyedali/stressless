import { Page } from '../types';
import { Wind, Heart, Mail, ExternalLink, Calendar, BookOpen, User } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app_footer" className="bg-slate-900 text-slate-300">
      {/* Upper Footer section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: App Info / Project Summary */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xl shadow-sm">
                Ψ
              </div>
              <span className="font-sans text-sm font-bold uppercase tracking-wider text-white">Psychology of Mind & Behavior</span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-slate-400">
              An interactive academic prototype dedicated to promoting accessible breathing protocols and evidence-based cognitive strategies for stress management.
            </p>
            <div className="flex items-center space-x-2 rounded-lg bg-slate-800/60 p-3 border border-slate-800">
              <Heart className="h-4.5 w-4.5 text-rose-400 shrink-0" />
              <p className="font-sans text-xs text-slate-300 font-medium">
                Educating for physical and emotional alignment.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-slate-200">Quick Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNavClick('home')} 
                  className="font-sans text-slate-400 hover:text-white transition-colors duration-150"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('understanding')} 
                  className="font-sans text-slate-400 hover:text-white transition-colors duration-150"
                >
                  Understanding Stress
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('breathing')} 
                  className="font-sans text-slate-400 hover:text-white transition-colors duration-150"
                >
                  Breathing Techniques
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('coping')} 
                  className="font-sans text-slate-400 hover:text-white transition-colors duration-150"
                >
                  Coping Strategies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('assessment')} 
                  className="font-sans text-slate-400 hover:text-white transition-colors duration-150"
                >
                  Stress Self-Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Secondary Links */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-slate-200">Secondary Modules</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNavClick('applications')} 
                  className="font-sans text-slate-400 hover:text-white transition-colors duration-150"
                >
                  Real-Life Case Studies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('resources')} 
                  className="font-sans text-slate-400 hover:text-white transition-colors duration-150"
                >
                  Resources & Wellness Hub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')} 
                  className="font-sans text-slate-400 hover:text-white transition-colors duration-150"
                >
                  About Academic Project
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Project Meta / Course info */}
          <div className="space-y-3.5">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-slate-200">Course Information</h3>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                <span className="font-sans">Course: <strong className="text-slate-200">PSY110</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-indigo-400" />
                <span className="font-sans">Instructor: <strong className="text-slate-200 font-medium">Laraib Javaid</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-indigo-400" />
                <span className="font-sans">Semester: <strong className="text-slate-200 font-medium font-sans">Spring 2026</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer Box */}
        <div className="mt-12 rounded-xl bg-slate-800/55 p-4 border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans">
          <strong className="text-slate-200 uppercase font-bold tracking-wider mr-1.5 font-mono">Academic Disclaimer:</strong>
          This portal is built as an educational web application prototype for the course 'Psychology of Mind and Behavior' (PSY110). The materials, generators, self-assessment questionnaires, and information provided represent general educational perspectives on wellness, stress reduction, and healthy habits. They do not constitute formal medical diagnoses, clinical therapies, or professional psychological counsel. If you are experiencing acute emotional despair or physical crisis, please consult with a qualified physician or registered mental health specialist immediately.
        </div>

        {/* Lower thin footer with credits */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-slate-500">
            &copy; 2026 Stress Wellness Hub. Developed for PSY110 Academic Presentation.
          </p>
          <p className="mt-3 font-sans text-xs text-slate-500 sm:mt-0 flex items-center">
            <span>Designed with scientific rigor</span>
            <span className="mx-1.5">•</span>
            <span>University Psychology Department</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
