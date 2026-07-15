import React, { useState, useEffect } from 'react';
import { Coffee, GraduationCap, Map, BookOpen } from 'lucide-react';

export default function NavigationBar({ currentView, onViewChange, currentZone }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'landing', label: 'Hello & Welcome', icon: Coffee },
    { id: 'menu', label: 'Sip & Eat', icon: BookOpen },
    { id: 'map', label: 'Cozy Corners', icon: Map },
  ];

  return (
    <header 
      className={`w-full px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-[#fdfaf5]/95 backdrop-blur-xl shadow-md border-b border-[#eaddca]/40' 
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      
      {/* ─── LOGO / BRAND ─── */}
      <button 
        onClick={() => onViewChange('landing')} 
        className="flex items-center gap-3.5 group text-left shrink-0 cursor-pointer focus:outline-none"
      >
        {/* Warm clay/hazelnut rounded monogram badge */}
        <div className={`flex items-center justify-center rounded-2xl transition-all duration-500 shadow-sm ${
          scrolled ? 'w-10 h-10 bg-[#a26a42]' : 'w-12 h-12 bg-[#8a532a]'
        } text-white group-hover:scale-105 group-hover:bg-[#a26a42]`}>
          <Coffee className="w-5.5 h-5.5 animate-pulse" style={{ animationDuration: '3s' }} />
        </div>
        <div className="hidden md:block">
          <span className={`font-serif font-black text-stone-900 leading-none block tracking-tight transition-all duration-300 ${
            scrolled ? 'text-lg' : 'text-xl'
          }`}>Julius Caf&eacute;</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#a26a42] font-black block mt-1 animate-pulse">Your Neighborhood Space</span>
        </div>
      </button>

      {/* ─── CENTRED FRIENDLY NAVIGATION PILL ─── */}
      <nav className="flex items-center gap-1 bg-[#eae0d2]/60 backdrop-blur-sm p-1.5 rounded-full border border-[#d8c3a5]/30">
        {navLinks.map((link) => {
          const isActive = currentView === link.id;
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => onViewChange(link.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer focus:outline-none ${
                isActive
                  ? 'bg-white text-[#8a532a] shadow-sm scale-[1.03]'
                  : 'text-[#8c7462] hover:text-[#8a532a] hover:bg-white/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-[#a26a42]' : 'opacity-70'}`} />
              <span className="hidden sm:inline font-bold">{link.label}</span>
              <span className="inline sm:hidden">{link.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* ─── RIGHT: VISITOR & STUDENT BADGES ─── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Soft custom zone locator badge */}
        {currentZone && currentView === 'menu' && (
          <div className="hidden lg:flex items-center gap-1.5 bg-[#fbf5eb] border border-[#e8dcb9] px-3.5 py-2 rounded-full text-[10px] text-[#8a532a] font-extrabold tracking-wider">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            <span className="uppercase">{currentZone.replace(/-/g, ' ')}</span>
          </div>
        )}

        {/* Student tag with friendly word & inviting light green palette */}
        <div className="flex items-center gap-2 bg-[#f0f9f3] border border-[#cbe8d2] px-3 sm:px-4 py-2.5 rounded-full text-[10px] text-[#2d6a4f] font-black uppercase tracking-wider select-none hover:bg-[#e4f5ea] transition-all cursor-help" title="Student Discount Activated">
          <GraduationCap className="w-4 h-4 text-[#2d6a4f] shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">Classmates Perks Active</span>
        </div>
      </div>

    </header>
  );
}
