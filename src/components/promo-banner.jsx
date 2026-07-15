import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function PromoBanner() {
  const promos = [
    {
      idx: '01',
      tag: 'Student Access',
      title: 'Back to School',
      desc: 'Present a valid student ID to our barista for 15% off espresso drinks and fresh meals on campus.'
    },
    {
      idx: '02',
      tag: 'Work Session',
      title: 'Bottomless Brew',
      desc: 'Order our hot drip coffee, get unlimited warm cup refills at no extra cost while you focus.'
    },
    {
      idx: '03',
      tag: 'Daily Ritual',
      title: 'Pastry Hour',
      desc: 'Pop in between 2 PM and 5 PM. Pair any artisan baked good with a warm brew for a discount.'
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
    <div className="w-full h-full min-h-[260px] flex flex-col justify-between p-7 rounded-[30px] border border-stone-200 bg-white relative overflow-hidden group cursor-pointer shadow-sm hover:border-amber-200 transition-colors duration-500">
      
      {/* ─── MASSIVE BACKGROUND TYPOGRAPHY (NO IMAGES) ─── */}
      <div 
        className={`absolute -right-2 -bottom-6 text-[140px] md:text-[180px] font-serif font-black text-stone-100/60 leading-none select-none pointer-events-none transition-opacity duration-500 ${inTransition ? 'opacity-0' : 'opacity-100'}`}
      >
        {promos[activeIndex].idx}
      </div>

      {/* ─── TOP EDITORIAL HEADER ─── */}
      <div className="flex items-center justify-between z-10 select-none">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-8 bg-stone-800" />
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-stone-800">
            Bulletin
          </span>
        </div>
        
        {/* Sleek Pagination Dots */}
        <div className="flex gap-2">
          {promos.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-700 ease-out ${activeIndex === idx ? 'w-6 bg-stone-800' : 'w-1.5 bg-stone-200'}`}
            />
          ))}
        </div>
      </div>

      {/* ─── MAIN COPY AND DETAILS ─── */}
      <div className={`mt-auto z-10 transition-all duration-500 transform ${inTransition ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        
        <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.15em] text-amber-700 mb-2 border-b border-amber-200 pb-1">
          {promos[activeIndex].tag}
        </span>
        
        <h3 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-900 leading-none mb-3">
          {promos[activeIndex].title}
        </h3>
        
        <p className="text-xs font-medium leading-relaxed text-stone-500 max-w-[85%] sm:max-w-xs">
          {promos[activeIndex].desc}
        </p>

        {/* ─── ACTION FOOTER ─── */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-stone-100/80">
          <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
            Valid at counter
          </span>
          <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-amber-600 group-hover:border-amber-600 group-hover:text-white text-stone-400 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

      </div>

    </div>
  );
}
