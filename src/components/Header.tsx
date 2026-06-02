import { useState } from 'react';
import { Page } from '../types';
import { Wind, Menu, X, Brain } from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: 'home' as Page },
    { label: 'Understanding Stress', value: 'understanding' as Page },
    { label: 'Breathing Techniques', value: 'breathing' as Page },
    { label: 'Coping Strategies', value: 'coping' as Page },
    { label: 'Stress Assessment', value: 'assessment' as Page },
    { label: 'Real-Life Applications', value: 'applications' as Page },
    { label: 'Wellness Hub', value: 'resources' as Page },
    { label: 'About Project', value: 'about' as Page },
  ];

  return (
    <header id="nav_header" className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div 
            id="brand_logo"
            className="flex cursor-pointer items-center space-x-3 text-slate-900 transition-opacity hover:opacity-90"
            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xl transition-transform hover:scale-105 shadow-sm">
              Ψ
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-sans text-sm font-bold leading-tight uppercase tracking-wider text-slate-800">Psychology of Mind & Behavior</span>
                <span className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-indigo-700 uppercase tracking-widest">PSY110</span>
              </div>
              <p className="font-sans text-xs text-slate-500 font-medium">Course: PSY110 | Spring 2026</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop_nav" className="hidden lg:flex lg:space-x-4 xl:space-x-5 items-center">
            {navItems.map((item) => {
              const isActive = currentPage === item.value;
              return (
                <button
                  key={item.value}
                  id={`nav_btn_${item.value}`}
                  onClick={() => {
                    setCurrentPage(item.value);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-sm font-semibold transition-all duration-200 py-1 cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                      : 'text-slate-650 hover:text-indigo-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="lg:hidden">
            <button
              id="mobile_menu_toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 float-right"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div id="mobile_nav_panel" className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.value;
              return (
                <button
                  key={item.value}
                  id={`mobile_nav_btn_${item.value}`}
                  onClick={() => {
                    setCurrentPage(item.value);
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
