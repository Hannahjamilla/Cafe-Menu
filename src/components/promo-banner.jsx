import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function PromoBanner() {
  const promos = [
    {
      idx: '01',
      tag: 'Student Access',
      title: 'Back to School Special',
      desc: 'Present your student ID for 15% off all espresso drinks and fresh meals. Plus get free WiFi upgrades in our study zones.',
      gradient: 'from-blue-500/10 to-purple-500/10',
      accent: 'text-blue-600'
    },
    {
      idx: '02',
      tag: 'Work Session',
      title: 'Bottomless Brew Deal',
      desc: 'Order our signature drip coffee and enjoy unlimited warm refills at no extra cost while you focus on your projects.',
      gradient: 'from-amber-500/10 to-orange-500/10',
      accent: 'text-amber-600'
    },
    {
      idx: '03',
      tag: 'Happy Hour',
      title: 'Pastry Power Hour',
      desc: 'Visit between 2-5 PM daily. Pair any artisan baked good with your choice of warm brew for an exclusive discount.',
      gradient: 'from-rose-500/10 to-pink-500/10',
      accent: 'text-rose-600'
    },
    {
      idx: '04',
      tag: 'Weekend Special',
      title: 'Workspace Package',
      desc: 'Book a private study room for 4+ hours on weekends and get complimentary specialty drinks and premium snacks.',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      accent: 'text-emerald-600'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [inTransition, setInTransition] = useState(false);

  // Auto-advance with smooth transition flag
  useEffect(() => {
    const timer = setInterval(() => {
      setInTransition(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
        setInTransition(false);
      }, 400); // Wait 400ms during fade out to swap
    }, 6000);
    return () => clearInterval(timer);
  }, [promos.length]);

  return (
    <div className={`w-full h-full min-h-[320px] flex flex-col justify-between p-8 rounded-[30px] border border-stone-200 bg-gradient-to-br ${promos[activeIndex].gradient} relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl hover:border-amber-200 transition-all duration-500`}>
      
      {/* ─── MASSIVE BACKGROUND TYPOGRAPHY (NO IMAGES) ─── */}
      <div 
        className={`absolute -right-2 -bottom-8 text-[160px] md:text-[200px] font-serif font-black text-stone-100/60 leading-none select-none pointer-events-none transition-opacity duration-500 ${inTransition ? 'opacity-0' : 'opacity-100'}`}
      >
        {promos[activeIndex].idx}
      </div>

      {/* ─── TOP EDITORIAL HEADER ─── */}
      <div className="flex items-center justify-between z-10 select-none mb-4">
        <div className="flex items-center gap-5">
          <div className="h-[1px] w-10 bg-stone-800" />
          <span className="text-[11px] tracking-[0.25em] font-bold uppercase text-stone-800">
            Bulletin
          </span>
        </div>
        
        {/* Sleek Pagination Dots */}
        <div className="flex gap-3">
          {promos.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-700 ease-out ${activeIndex === idx ? 'w-8 bg-stone-800' : 'w-2 bg-stone-200'}`}
            />
          ))}
        </div>
      </div>

      {/* ─── MAIN COPY AND DETAILS ─── */}
      <div className={`mt-auto z-10 transition-all duration-500 transform ${inTransition ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        
        <span className={`inline-block text-[10px] font-extrabold uppercase tracking-[0.15em] ${promos[activeIndex].accent} mb-2 border-b ${promos[activeIndex].accent.replace('text-', 'border-')} pb-1`}>
          {promos[activeIndex].tag}
        </span>
        
        <h3 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-stone-900 leading-none mb-4">
          {promos[activeIndex].title}
        </h3>
        
        <p className="text-sm font-medium leading-relaxed text-stone-500 max-w-[90%] sm:max-w-sm mb-6">
          {promos[activeIndex].desc}
        </p>

        {/* ─── ACTION FOOTER ─── */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100/80">
          <div className="flex items-center space-x-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
              Valid at counter
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className={`w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center ${promos[activeIndex].accent.replace('text-', 'group-hover:bg-')} group-hover:border-transparent group-hover:text-white text-stone-400 transition-all duration-300 shadow-sm`}>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

      </div>

    </div>
  );
}
