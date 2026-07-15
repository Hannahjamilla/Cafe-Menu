import React, { useState } from 'react';
import NavigationBar from './components/navigation-bar';
import HeroSection from './components/hero-section';
import MenuSection from './components/menu-section';
import ExperienceSection from './components/experience-section';
import FeaturesSection from './components/features-section';
import FloorPlanMap from './components/floor-plan-map';
import DeskJournal from './components/desk-journal';
import DetailModal from './components/detail-modal';
import PromoBanner from './components/promo-banner';
import { menuItems } from './data/menu-data';
import { BookOpen, Map, ArrowRight, ArrowUpRight, Wifi, Clock, Users, Coffee, MapPin, Zap } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('full');
  const [activeZone, setActiveZone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Interactive Coffee Card States
  const [latteArt, setLatteArt] = useState('heart');
  const [isBrewing, setIsBrewing] = useState(false);
  const [stirring, setStirring] = useState(false);
  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 });

  const triggerBrew = () => {
    if (isBrewing) return;
    setIsBrewing(true);
    setTimeout(() => {
      setIsBrewing(false);
    }, 2000);
  };

  const triggerStir = () => {
    if (stirring || isBrewing) return;
    setStirring(true);
    setTimeout(() => {
      setStirring(false);
    }, 1500);
  };

  const handleSelectZone = (zone) => {
    setActiveZone(zone.id);
    if (zone.linkTarget === 'coffee') setActiveTab('brews');
    else if (zone.linkTarget === 'pastries') setActiveTab('bakery');
    else if (['study-space', 'business-space', 'recreation-space'].includes(zone.linkTarget)) setActiveTab('zones');
    setView('menu');
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'brews' || tabId === 'teas') setActiveZone('brew-bar');
    else if (tabId === 'bakery' || tabId === 'kitchen') setActiveZone('bakery-station');
    else setActiveZone('');
  };

  const bestSellers = menuItems.filter(item => item.tags.includes('Best Seller')).slice(0, 3);

  return (
    <div className="app-bg min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div>
        <NavigationBar 
          currentView={view} 
          onViewChange={setView} 
          currentZone={activeZone} 
        />

        {/* ════════════════════════════════════════════════
            WELCOME / LANDING PAGE
            ════════════════════════════════════════════════ */}
        {view === 'landing' && (
          <div className="space-y-0">

              {/* Large floating blobs */}
              <div className="absolute top-[10%] left-[5%] w-32 h-32 shape-blob animate-float-gentle opacity-40" style={{ animationDelay: '0s' }} />
              <div className="absolute top-[20%] right-[8%] w-24 h-24 shape-blob-2 animate-drift-slow opacity-30" style={{ animationDelay: '2s' }} />
              <div className="absolute top-[60%] left-[3%] w-28 h-28 shape-blob animate-pulse-soft opacity-35" style={{ animationDelay: '4s' }} />
              <div className="absolute bottom-[15%] right-[12%] w-36 h-36 shape-blob-2 animate-float-gentle opacity-25" style={{ animationDelay: '1s' }} />
              <div className="absolute top-[45%] right-[25%] w-20 h-20 shape-blob animate-drift-slow opacity-40" style={{ animationDelay: '3s' }} />
              <div className="absolute bottom-[35%] left-[15%] w-26 h-26 shape-blob-2 animate-pulse-soft opacity-30" style={{ animationDelay: '5s' }} />
              
              {/* Medium floating elements */}
              <div className="absolute top-[30%] left-[20%] w-16 h-16 rounded-full bg-gradient-to-br from-amber-200/20 to-amber-300/10 animate-float-gentle" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-[70%] right-[30%] w-14 h-14 rounded-full bg-gradient-to-br from-stone-200/15 to-stone-300/8 animate-drift-slow" style={{ animationDelay: '2.5s' }} />
              <div className="absolute top-[15%] left-[45%] w-12 h-12 rounded-full bg-gradient-to-br from-amber-100/25 to-amber-200/12 animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-[50%] right-[5%] w-18 h-18 rounded-full bg-gradient-to-br from-stone-100/20 to-stone-200/10 animate-float-gentle" style={{ animationDelay: '3.5s' }} />
              
              {/* Small sparkle elements */}
              <div className="absolute top-[25%] left-[35%] w-3 h-3 bg-amber-300/40 rounded-full animate-sparkle" style={{ animationDelay: '0s' }} />
              <div className="absolute top-[55%] right-[45%] w-2 h-2 bg-stone-300/50 rounded-full animate-sparkle" style={{ animationDelay: '1s' }} />
              <div className="absolute top-[40%] left-[60%] w-2.5 h-2.5 bg-amber-200/45 rounded-full animate-sparkle" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-[60%] left-[25%] w-2 h-2 bg-stone-200/40 rounded-full animate-sparkle" style={{ animationDelay: '3s' }} />
              <div className="absolute top-[80%] right-[35%] w-3 h-3 bg-amber-300/35 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }} />
              <div className="absolute bottom-[20%] left-[55%] w-2.5 h-2.5 bg-stone-300/45 rounded-full animate-sparkle" style={{ animationDelay: '2.5s' }} />
              
              {/* Coffee bean scattered elements */}
              <div className="absolute top-[35%] right-[15%] w-4 h-6 bg-amber-800/20 rounded-full animate-float-gentle transform rotate-12" style={{ animationDelay: '4s' }} />
              <div className="absolute bottom-[40%] left-[35%] w-3 h-5 bg-amber-700/25 rounded-full animate-drift-slow transform -rotate-15" style={{ animationDelay: '1s' }} />
              <div className="absolute top-[65%] left-[50%] w-3.5 h-5.5 bg-amber-800/15 rounded-full animate-pulse-soft transform rotate-45" style={{ animationDelay: '3s' }} />
              
              {/* Texture overlay */}
              <div className="absolute inset-0 texture-overlay" />

            {/* ──────── SECTION 1: SPLIT HERO (STUDENT THEME) ──────── */}
            <section className="relative w-full border-b-2 border-stone-200/50 overflow-hidden bg-[#faf8f4]/95 backdrop-blur-md">
              
              {/* ─── ULTRA-MODERN STUDENT WORKSPACE BACKGROUND ─── */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#faf8f4]">
                
                {/* 1. Fluid Aurora / Mesh Gradients */}
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#e8dcb9]/40 to-amber-200/20 mix-blend-multiply blur-[120px] animate-pulse-soft" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tl from-stone-300/40 to-orange-100/30 mix-blend-multiply blur-[100px] animate-drift-slow" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-tr from-amber-50/50 to-transparent mix-blend-multiply blur-[90px] animate-float-gentle" style={{ animationDelay: '3s' }} />

                {/* 2. Modern Productivity Grid (Architectural / Glassy Notion style) */}
                <div 
                  className="absolute inset-x-0 inset-y-0 opacity-[0.5]" 
                  style={{ 
                    backgroundImage: `linear-gradient(rgba(162, 106, 66, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(162, 106, 66, 0.07) 1px, transparent 1px)`, 
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)'
                  }} 
                />

                {/* 3. Floating Geometric Glass Accents (Modern UI Trend to fill empty zones nicely) */}
                <div className="absolute top-[15%] right-[25%] w-24 h-24 sm:w-32 sm:h-32 rounded-3xl border border-white/60 bg-white/20 backdrop-blur-md transform rotate-12 animate-float-gentle shadow-[0_8px_32px_rgba(162,106,66,0.06)]" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-[20%] left-[2%] sm:left-[10%] w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-white/60 bg-white/20 backdrop-blur-md transform animate-drift-slow shadow-[0_8px_32px_rgba(162,106,66,0.06)]" style={{ animationDelay: '2s' }} />
                
                {/* 4. Abstract Structural Lines (Modernity) */}
                <div className="absolute top-[35%] right-0 w-[30%] h-px bg-gradient-to-l from-[#a26a42]/10 to-transparent transform -translate-y-1/2" />
                <div className="absolute bottom-[35%] left-0 w-[20%] h-px bg-gradient-to-r from-[#a26a42]/10 to-transparent transform translate-y-1/2" />
                <div className="absolute top-0 bottom-[20%] left-[30%] w-px bg-gradient-to-b from-[#a26a42]/10 to-transparent transform -translate-x-1/2" />
              </div>

              {/* Reduced max-width and tighter gap to eliminate wasted space */}
              <div className="max-w-[1450px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 relative z-10">
                
                {/* LEFT Side: Main content */}
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 lg:max-w-[650px]">
                  {/* Minimal pill tag */}
                  <div className="animate-fade-in-up inline-flex items-center gap-3 text-[9px] tracking-[0.25em] font-bold uppercase text-[#a26a42] bg-[#fbf5eb] border border-[#e8dcb9] px-5 py-2.5 rounded-full cursor-default select-none shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                    <span>Est. 2026 . Café & Workspace</span>
                  </div>
                  
                  {/* Dramatic headline */}
                  <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-[4.8rem] font-serif font-black text-stone-900 leading-[1.05] tracking-tight">
                    Study, sip <br className="hidden sm:block" /> 
                    <span className="text-stone-900">&</span>{' '}
                    <span className="italic text-amber-700/90 relative inline-block">
                      unwind.
                      {/* Scribbled underline on unwind */}
                      <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-500/60" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M0,10 Q25,20 50,10 T100,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </h1>

                  {/* Animated gold divider line */}
                  <div className="divider-animated w-24 lg:mx-0 mx-auto" />
                  
                  <p className="animate-fade-in-up delay-200 text-stone-600 text-sm sm:text-lg leading-relaxed font-medium lg:max-w-[550px]">
                    At Brows&amp;Beyond, we serve artisan espresso for brilliant brains. Pull up a comfy chair, grab some fresh ideas, and let's get focused.
                  </p>

                  {/* Hero CTA buttons */}
                  <div className="animate-fade-in-up delay-300 flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
                    <button 
                      onClick={() => setView('menu')}
                      className="bg-[#a26a42] hover:bg-[#8a532a] text-white text-[11px] font-black uppercase tracking-wider px-8 py-4.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      Check the Menu
                    </button>
                    <button 
                      onClick={() => setView('map')}
                      className="bg-white hover:bg-stone-50 text-stone-700 border-2 border-stone-200 text-[11px] font-black uppercase tracking-wider px-8 py-4.5 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      Explore Cozy Corners
                    </button>
                  </div>
                </div>

              {/* RIGHT Side: Cozy Animated Coffee Widget (Grand 3D Interactive) */}
              <div className="flex-1 flex flex-col items-center justify-center relative w-full lg:max-w-[550px] animate-fade-in-scale mt-6 lg:mt-0">
                {/* Ambient dynamic glow blob */}
                <div className="absolute w-[90vw] max-w-[320px] h-[90vw] max-h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-amber-100/50 filter blur-[80px] -z-10 animate-glow-burst" />
                
                {/* Orbiting Elements */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <div className="absolute w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] rounded-full border border-amber-200/20 animate-spin" style={{ animationDuration: '40s' }} />
                  <div className="absolute animate-orbit-1"><div className="w-4 h-4 bg-[#6c4831] rounded-full shadow-lg opacity-80" style={{ clipPath: 'ellipse(50% 30% at 50% 50%)', transform: 'rotate(45deg)' }} /></div>
                  <div className="absolute animate-orbit-2"><div className="w-5 h-5 bg-[#8a532a] rounded-full shadow-lg opacity-70" style={{ clipPath: 'ellipse(50% 30% at 50% 50%)', transform: 'rotate(-25deg)' }} /></div>
                  <div className="absolute animate-orbit-3 text-2xl drop-shadow-md">✨</div>
                  <div className="absolute animate-orbit-1" style={{ animationDelay: '-4s' }}><div className="text-xl drop-shadow-md opacity-60">☁️</div></div>
                </div>

                <div 
                  onMouseMove={(e) => {
                    const card = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - card.left) / card.width - 0.5;
                    const y = (e.clientY - card.top) / card.height - 0.5;
                    setCardRotate({ x: x * 20, y: -y * 20 });
                  }}
                  onMouseLeave={() => setCardRotate({ x: 0, y: 0 })}
                  style={{
                    transform: `perspective(1200px) rotateY(${cardRotate.x}deg) rotateX(${cardRotate.y}deg)`,
                    transition: 'transform 0.15s ease-out, box-shadow 0.4s ease',
                  }}
                  className="relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[480px] h-auto min-h-[380px] sm:min-h-[400px] flex flex-col items-center justify-between bg-white/40 backdrop-blur-xl rounded-[35px] sm:rounded-[45px] shadow-[0_25px_50px_rgba(162,106,66,0.15)] border-2 border-white/70 select-none p-5 sm:p-8 transform hover:shadow-[0_35px_70px_rgba(162,106,66,0.25)] transition-shadow duration-500 z-10"
                >
                  {/* Poured stream during brewing */}
                  {isBrewing && (
                    <div 
                      className="absolute bg-gradient-to-b from-amber-800 via-amber-600 to-[#543722] rounded-full animate-pulse" 
                      style={{ 
                        width: '5px', 
                        height: '140px', 
                        left: 'calc(50% - 2.5px)', 
                        top: '20px', 
                        zIndex: 30, 
                        opacity: 0.9,
                        boxShadow: '0 0 12px rgba(162, 106, 66, 0.7)' 
                      }} 
                    />
                  )}

                  {/* Rising Steam Lines */}
                  <div className={`absolute top-10 flex gap-6 justify-center w-full transition-all duration-500 ${isBrewing ? 'opacity-100 scale-125 translate-y-[-10px]' : 'opacity-80'}`}>
                    <svg className="w-24 h-32 sm:w-28 sm:h-36 text-[#a26a42]/30" viewBox="0 0 40 80">
                      <path d="M10,70 Q0,50 15,35 T5,10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="steam-1" />
                      <path d="M22,70 Q32,55 18,38 T28,12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="steam-2" />
                      <path d="M15,75 Q25,60 10,42 T20,15" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" className="steam-3" />
                    </svg>
                  </div>
                  
                  {/* Glassmorphic Coffee Cup Centerpiece */}
                  <div 
                    className={`mt-4 sm:mt-6 relative transition-all duration-700 ${stirring ? 'scale-90' : 'hover:scale-105'}`}
                  >
                    <svg viewBox="0 0 100 100" className="w-48 h-48 sm:w-60 sm:h-60 text-[#a26a42] animate-coffee-pulse drop-shadow-2xl" fill="currentColor">
                      {/* Saucer shadow */}
                      <ellipse cx="50" cy="85" rx="36" ry="6" fill="rgba(84,55,34,0.08)" />
                      {/* Saucer */}
                      <path d="M15,80 C15,86 85,86 85,80 C85,76 15,76 15,80 Z" fill="#eae0d2" stroke="#d5c8b5" strokeWidth="1" />
                      
                      {/* Cup handle */}
                      <path d="M72,40 C84,40 86,60 72,62" fill="none" stroke="#a26a42" strokeWidth="6.5" strokeLinecap="round" />
                      
                      {/* Cup Body */}
                      <path d="M22,35 L78,35 C78,35 74,72 50,72 C26,72 22,35 22,35 Z" fill="#a26a42" stroke="#8d5b37" strokeWidth="1.5" />
                      
                      {/* Depth Gradient Highlight for realistic 3D cup */}
                      <path d="M24,38 L38,38 C38,38 35,68 45,70 C30,70 24,38 24,38 Z" fill="url(#cup-glare)" opacity="0.15" />
                      <defs>
                        <linearGradient id="cup-glare" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>

                      {/* Outer rim highlighting */}
                      <ellipse cx="50" cy="35" rx="28" ry="7" fill="#8c5833" />
                      
                      {/* Liquid coffee filling (Rippling slosh waves) */}
                      <g className="animate-wave-slosh">
                        <ellipse cx="50" cy="35" rx="26" ry="5.5" fill={isBrewing ? '#8a532a' : '#543722'} className="transition-colors duration-1000" />
                        <ellipse cx="48" cy="36" rx="22" ry="4" fill={isBrewing ? '#a26a42' : '#3a2516'} className="transition-colors duration-1000" />
                      </g>
                      
                      {/* Latte art patterns with dynamic stirring rotation */}
                      <g 
                        style={{ 
                          opacity: isBrewing ? 0 : 1,
                          transform: stirring ? 'rotate(1080deg)' : 'rotate(0deg)',
                          transformOrigin: '50px 35px',
                          transition: 'opacity 0.6s ease, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)' 
                        }}
                      >
                        {latteArt === 'heart' && (
                          <path d="M50,39 C50,39 44,32 44,29.5 C44,26.5 47,24.5 50,27 C53,24.5 56,26.5 56,29.5 C56,32 50,39 50,39 Z" fill="#fdfaf5" opacity="0.9" />
                        )}
                        {latteArt === 'rosetta' && (
                          <g fill="none" stroke="#fdfaf5" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" className="translate-y-[2px]">
                            <path d="M50,38 L50,27" />
                            <path d="M50,34 Q45,32 42,34" />
                            <path d="M50,34 Q55,32 58,34" />
                            <path d="M50,31 Q46,29 43,31" />
                            <path d="M50,31 Q54,29 57,31" />
                            <path d="M50,28 Q48,27 46,28" />
                            <path d="M50,28 Q52,27 54,28" />
                          </g>
                        )}
                        {latteArt === 'star' && (
                          <path d="M50,26 Q50,35 41,35 Q50,35 50,44 Q50,35 59,35 Q50,35 50,26 Z" fill="#fdfaf5" opacity="0.9" />
                        )}
                        {latteArt === 'smile' && (
                          <g fill="none" stroke="#fdfaf5" strokeWidth="1.5" strokeLinecap="round" opacity="0.9">
                            <circle cx="44" cy="33" r="1.5" fill="#fdfaf5" />
                            <circle cx="56" cy="33" r="1.5" fill="#fdfaf5" />
                            <path d="M44,38 Q50,43 56,38" />
                          </g>
                        )}
                      </g>
                    </svg>
                  </div>

                  {/* Latte Art Customizer Controllers */}
                  <div className="w-full space-y-3 sm:space-y-4 z-20 mt-4">
                    {/* Select Art */}
                    <div className="flex justify-center gap-1.5 bg-[#eae0d2]/60 p-1.5 rounded-[20px] border border-stone-200/50 backdrop-blur-md shadow-inner">
                      {[
                        { id: 'heart', label: 'Heart' },
                        { id: 'rosetta', label: 'Rosetta' },
                        { id: 'star', label: 'Star' },
                        { id: 'smile', label: 'Smile' }
                      ].map((art) => (
                        <button
                          key={art.id}
                          onClick={() => {
                            if (isBrewing) return;
                            setLatteArt(art.id);
                          }}
                          disabled={isBrewing}
                          className={`flex-grow flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2.5 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                            latteArt === art.id
                              ? 'bg-white text-[#a26a42] shadow-md scale-[1.05]'
                              : 'text-stone-600 hover:text-[#a26a42] hover:bg-white/60'
                          } ${isBrewing ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          <span>{art.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Action Panel: Stir & Brew */}
                    <div className="flex gap-3 sm:gap-4">
                      <button
                        onClick={triggerBrew}
                        disabled={isBrewing || stirring}
                        className={`flex-1 bg-gradient-to-r from-[#a26a42] to-[#8a532a] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest py-3.5 sm:py-4 rounded-[18px] shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-[#8a532a] ${isBrewing || stirring ? 'opacity-60 cursor-not-allowed scale-95' : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/20'}`}
                      >
                        <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 animate-pulse" />
                        <span>{isBrewing ? 'Brewing...' : 'Brew Hot'}</span>
                      </button>
                      <button
                        onClick={triggerStir}
                        disabled={stirring || isBrewing}
                        className={`flex-1 bg-white hover:bg-stone-50 text-stone-700 border-2 border-stone-200 text-[10px] sm:text-xs font-black uppercase tracking-widest py-3.5 sm:py-4 rounded-[18px] shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${stirring || isBrewing ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-md'}`}
                      >
                        <Coffee className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${stirring ? 'animate-spin' : ''}`} style={{ animationDuration: '1s' }} />
                        <span>{stirring ? 'Stirring...' : 'Stir Foam'}</span>
                      </button>
                    </div>

                    {/* Realistic status reporting bar */}
                    <div className="flex gap-3 sm:gap-4 w-full">
                      <div className="bg-white/80 backdrop-blur-md px-2 py-3 sm:py-3.5 sm:px-3 rounded-[18px] border border-amber-100 shadow-sm flex items-center justify-center gap-1.5 flex-1">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-ping shrink-0" />
                        <span className="text-[8.5px] sm:text-[10px] uppercase tracking-widest text-[#8a532a] font-extrabold text-center leading-none whitespace-nowrap">
                          {isBrewing 
                            ? 'Dripping Roast...' 
                            : stirring 
                              ? 'Swirling Crema...' 
                              : 'Steaming & Ready'}
                        </span>
                      </div>
                      {!isBrewing && !stirring && (
                        <div className="bg-white/80 backdrop-blur-md p-3 sm:py-3.5 rounded-[18px] border border-amber-100 shadow-sm flex items-center justify-center px-4 sm:px-4">
                          <span className="text-[8.5px] sm:text-[10px] uppercase tracking-widest text-[#8a532a] font-extrabold text-center leading-none whitespace-nowrap">
                            Cozy Temp
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
              </div>
            </section>

            {/* ──────── SECTION 2: THREE-COLUMN COLLAGE ──────── */}
            <section className="max-w-[1400px] mx-auto w-full px-3 sm:px-4 lg:px-6 pb-16 relative">
              
              {/* Decorative elements around the collage */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 shape-blob animate-float-gentle opacity-20" />
                <div className="absolute bottom-10 right-10 w-24 h-24 shape-blob-2 animate-drift-slow opacity-25" />
                <div className="absolute top-1/2 left-0 w-16 h-16 rounded-full bg-gradient-to-r from-amber-200/15 to-transparent animate-pulse-soft" />
                <div className="absolute top-1/3 right-0 w-18 h-18 rounded-full bg-gradient-to-l from-stone-200/20 to-transparent animate-float-gentle" />
              </div>
              {/* Section Header */}
              <div className="flex flex-col items-center text-center mb-14 animate-fade-in-up delay-200">
                <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#a26a42] block mb-2">Quick Navigation</span>
                <h2 className="text-4xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">Discover the Space</h2>
                <div className="divider-animated w-16 mx-auto mt-5" />
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 w-full items-stretch">
                
                {/* LEFT: Arched Menu Portal */}
                <div 
                  role="button"
                  tabIndex={0}
                  onClick={() => setView('menu')}
                  onKeyDown={(e) => e.key === 'Enter' && setView('menu')}
                  className="animate-slide-in-left delay-300 w-full lg:flex-1 shrink-0 rounded-t-[100px] lg:rounded-t-[140px] rounded-b-[30px] lg:rounded-b-[40px] overflow-hidden relative group shadow-lg h-[340px] sm:h-[400px] lg:h-[520px] border-[6px] border-white hover-float cursor-pointer text-left block"
                >
                  <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" alt="Coffee and Pastries" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center sm:items-start text-center sm:text-left text-white pointer-events-none">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 shadow-inner group-hover:bg-[#a26a42] group-hover:text-white transition-all duration-300">
                      <BookOpen className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black mb-1.5 tracking-tight group-hover:-translate-y-1 transition-transform duration-300">Check the Menu</h3>
                    <p className="text-white/70 text-xs sm:text-sm font-medium mb-5 group-hover:-translate-y-1 transition-transform duration-300">
                      Fresh pastries, sweet lattes, and hearty warm meals.
                    </p>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-stone-900 px-5 py-2.5 rounded-full transition-transform shadow-lg group-hover:scale-105">
                      Explore Drinks <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* CENTER: Promo + Social */}
                <div className="animate-fade-in-up delay-400 w-full lg:flex-1 shrink-0 flex flex-col gap-6 lg:gap-8">
                  <div className="flex-grow min-h-[220px] sm:min-h-[260px]">
                    <PromoBanner />
                  </div>
                  <div className="bg-white rounded-[22px] p-3.5 flex items-center justify-between border border-stone-200/50 shadow-sm pr-6 hover:border-amber-200 transition-colors shrink-0">
                    <div className="flex -space-x-3">
                      <img className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Student" />
                      <img className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                      <img className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
                      <div className="w-10 h-10 rounded-full border-[3px] border-white bg-amber-50 flex items-center justify-center text-[10px] font-black text-[#a26a42] shadow-sm">+40</div>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-black text-stone-850 tracking-tight">100+ visitors</span>
                      <span className="block text-[9px] uppercase tracking-widest text-stone-400 font-bold mt-0.5">In the house today</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Inverted Arch Floor Plan Portal */}
                <div 
                  role="button"
                  tabIndex={0}
                  onClick={() => setView('map')}
                  onKeyDown={(e) => e.key === 'Enter' && setView('map')}
                  className="animate-slide-in-right delay-300 w-full lg:flex-1 shrink-0 rounded-t-[30px] lg:rounded-t-[40px] rounded-b-[100px] lg:rounded-b-[140px] overflow-hidden relative group shadow-lg h-[340px] sm:h-[400px] lg:h-[520px] border-[6px] border-white hover-float cursor-pointer text-left block"
                >
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Study Space" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center sm:items-start text-center sm:text-left text-white mb-6 pointer-events-none">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 shadow-inner group-hover:bg-[#a26a42] group-hover:text-white transition-all duration-300">
                      <Map className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black mb-1.5 tracking-tight group-hover:-translate-y-1 transition-transform duration-300">Find a Space</h3>
                    <p className="text-white/70 text-xs sm:text-sm font-medium mb-5 group-hover:-translate-y-1 transition-transform duration-300">
                      Quiet desks, meeting rooms, or just a chill lounge.
                    </p>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-stone-900 px-5 py-2.5 rounded-full transition-transform shadow-lg group-hover:scale-105">
                      View Layout <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ──────── SECTION 3: STATS (WHITE BG BAND) ──────── */}
            <section className="bg-white/60 backdrop-blur-sm border-y border-stone-200/50 py-12 lg:py-16 relative overflow-hidden">
              
              {/* Background decorations for stats section */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-32 h-32 shape-blob animate-pulse-soft opacity-10" />
                <div className="absolute bottom-0 right-1/3 w-28 h-28 shape-blob-2 animate-float-gentle opacity-15" />
                <div className="absolute top-1/2 left-0 w-40 h-20 bg-gradient-to-r from-amber-100/20 to-transparent" />
                <div className="absolute top-1/2 right-0 w-40 h-20 bg-gradient-to-l from-stone-100/25 to-transparent" />
              </div>
              
              <div className="max-w-[1400px] mx-auto w-full px-3 sm:px-4 lg:px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-12">
                  <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-stone-400 block mb-2">Why People Choose Us</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">More Than Just Coffee</h2>
                  <div className="divider-animated w-16 mx-auto mt-4" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { icon: Coffee, value: '24+', label: 'Handcrafted Drinks', accent: 'text-amber-700 bg-amber-50 border-amber-200/60' },
                    { icon: Wifi, value: 'Free', label: 'High-Speed Internet', accent: 'text-sky-700 bg-sky-50 border-sky-200/60' },
                    { icon: Clock, value: '6a\u201310p', label: 'Open Every Day', accent: 'text-emerald-700 bg-emerald-50 border-emerald-200/60' },
                    { icon: Users, value: '100+', label: 'Daily Regulars', accent: 'text-rose-700 bg-rose-50 border-rose-200/60' }
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="animate-fade-in-up bg-white rounded-[24px] p-6 border border-stone-100 hover:border-stone-200 transition-all duration-300 hover:-translate-y-1 cursor-default shadow-sm"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${stat.accent}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="block text-3xl font-serif font-black text-stone-900 tracking-tight">{stat.value}</span>
                      <span className="block mt-1 text-[11px] font-bold uppercase tracking-widest text-stone-400">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ──────── SECTION 4: SIGNATURE PICKS (WARM BG) ──────── */}
            <section className="bg-gradient-to-b from-[#f0e6d3]/50 to-transparent py-20 lg:py-24 relative overflow-hidden">
              
              {/* Enhanced background elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-1/4 w-36 h-36 shape-blob animate-drift-slow opacity-15" />
                <div className="absolute bottom-10 left-1/5 w-28 h-28 shape-blob-2 animate-float-gentle opacity-20" />
                <div className="absolute top-1/3 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-amber-200/25 to-amber-100/10 animate-pulse-soft" />
                <div className="absolute bottom-1/3 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-stone-200/20 to-stone-100/8 animate-float-gentle" style={{ animationDelay: '2s' }} />
                
                {/* Coffee steam wisps */}
                <div className="absolute top-0 left-1/2 w-2 h-20 bg-gradient-to-t from-amber-200/30 to-transparent animate-drift-slow opacity-40" style={{ animationDelay: '1s' }} />
                <div className="absolute top-0 left-1/3 w-1.5 h-16 bg-gradient-to-t from-stone-300/25 to-transparent animate-float-gentle opacity-35" style={{ animationDelay: '3s' }} />
                <div className="absolute top-0 right-1/3 w-2.5 h-24 bg-gradient-to-t from-amber-300/20 to-transparent animate-pulse-soft opacity-30" style={{ animationDelay: '0.5s' }} />
              </div>
              
              <div className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-stone-400 block mb-2">From the Counter</span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">Signature Picks</h2>
                  </div>
                  <button onClick={() => setView('menu')} className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-amber-700 transition-colors shrink-0">
                    Full Menu <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {bestSellers.map((item, idx) => (
                    <button 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className="animate-fade-in-up bg-white rounded-[24px] p-5 border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left flex gap-5 items-center group cursor-pointer"
                      style={{ animationDelay: `${idx * 120}ms` }}
                    >
                      <img src={item.image} alt={item.name} className="w-[88px] h-[88px] rounded-[18px] object-cover shrink-0 group-hover:shadow-md transition-shadow" />
                      <div className="flex-grow min-w-0">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400 block mb-1">Signature Pick</span>
                        <h4 className="font-serif font-black text-stone-900 text-[15px] leading-snug group-hover:text-amber-700 transition-colors truncate">{item.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-black text-amber-700 text-sm">₱{Number(item.price).toFixed(0)}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-amber-600 transition-colors" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ──────── SECTION 5: AMBIANCE GALLERY ──────── */}
            <section className="py-20 lg:py-24 relative overflow-hidden">
              
              {/* Rich background decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f8f3eb] via-[#f5ede0] to-[#f0e6d3] pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/6 w-40 h-40 shape-blob animate-float-gentle opacity-25" style={{ animationDelay: '0s' }} />
                <div className="absolute bottom-1/4 right-1/6 w-48 h-48 shape-blob-2 animate-drift-slow opacity-20" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/12 w-24 h-60 bg-gradient-to-b from-amber-200/15 to-transparent animate-pulse-soft" />
                <div className="absolute top-1/3 right-1/12 w-32 h-72 bg-gradient-to-b from-stone-200/12 to-transparent animate-float-gentle" style={{ animationDelay: '1s' }} />
                
                {/* Removed floating coffee elements per user request */}
              </div>
              
              <div className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                  <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-stone-400 block mb-2">The Atmosphere</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight mb-4">Designed for Focus</h2>
                  <div className="divider-animated w-16 mx-auto" />
                  <p className="text-stone-600 text-base max-w-2xl mt-6 leading-relaxed">
                    Every corner thoughtfully crafted to inspire productivity, creativity, and comfort. From study nooks to collaboration zones.
                  </p>
                </div>

                {/* Gallery grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                  {[
                    { src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=400&q=80", label: "Quiet Study Zone" },
                    { src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=400&q=80", label: "Meeting Rooms" },
                    { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80", label: "Cozy Lounge" },
                    { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=80", label: "Work Stations" }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="group relative rounded-[20px] overflow-hidden aspect-square hover-float"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <img 
                        src={item.src} 
                        alt={item.label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                        <span className="text-white text-xs font-bold uppercase tracking-wide">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features highlight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: <Zap className="w-8 h-8 mx-auto" />, title: 'Power Everywhere', desc: 'USB-C and standard outlets at every seat' },
                    { icon: <Users className="w-8 h-8 mx-auto" />, title: 'Noise Zones', desc: 'Quiet study areas and collaborative spaces' },
                    { icon: <Wifi className="w-8 h-8 mx-auto" />, title: 'Climate Control', desc: 'Perfect temperature and air quality 24/7' }
                  ].map((feature, idx) => (
                    <div 
                      key={idx}
                      className="bg-white/80 backdrop-blur-sm rounded-[20px] p-6 border border-stone-200/50 hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1"
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <div className="text-stone-700 mb-3">{feature.icon}</div>
                      <h4 className="font-serif font-bold text-stone-900 mb-2">{feature.title}</h4>
                      <p className="text-stone-600 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ──────── SECTION 6: PERKS MARQUEE BAR ──────── */}
            <section className="bg-stone-900 overflow-hidden py-8 select-none relative">
              
              {/* Animated background elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-stone-800/50 via-transparent to-stone-800/50" />
                <div className="absolute top-2 left-1/4 w-24 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent animate-pulse" />
                <div className="absolute bottom-2 right-1/3 w-32 h-1 bg-gradient-to-r from-transparent via-stone-400/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {[...Array(3)].map((_, repeat) => (
                  <div key={repeat} className="flex gap-16 items-center shrink-0">
                    {[
                      { icon: Wifi, text: 'Free Wi-Fi', accent: 'text-blue-400' },
                      { icon: Zap, text: 'Fast-Charge Outlets', accent: 'text-yellow-400' },
                      { icon: Coffee, text: 'Artisan Roast', accent: 'text-amber-400' },
                      { icon: MapPin, text: 'Private Study Pods', accent: 'text-green-400' },
                      { icon: Clock, text: 'Open 6 AM - 10 PM', accent: 'text-purple-400' },
                      { icon: Users, text: 'Community Events', accent: 'text-pink-400' },
                    ].map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-white/90 hover:text-white transition-colors">
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <perk.icon className={`w-4.5 h-4.5 ${perk.accent} shrink-0`} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest">{perk.text}</span>
                        <div className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* ──────── SECTION 7: COMMUNITY GALLERY ──────── */}
            <section className="py-20 lg:py-28 relative overflow-hidden">
              
              {/* Rich background with scattered decorations */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-32 h-32 shape-blob animate-float-gentle opacity-15" style={{ animationDelay: '0s' }} />
                <div className="absolute bottom-20 right-20 w-28 h-28 shape-blob-2 animate-drift-slow opacity-20" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-200/20 to-amber-100/10 animate-pulse-soft" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/3 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-stone-200/15 to-stone-100/8 animate-float-gentle" style={{ animationDelay: '3s' }} />
                
                {/* Additional floating elements */}
                <div className="absolute top-10 left-1/3 w-4 h-4 bg-amber-300/30 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-stone-300/35 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-2/3 left-1/2 w-5 h-5 bg-amber-200/25 rounded-full animate-sparkle" style={{ animationDelay: '2.5s' }} />
              </div>
              
              <div className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-12">
                  <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-stone-400 block mb-2">Inside the Space</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">The Brows&amp;Beyond Vibe</h2>
                  <div className="divider-animated w-16 mx-auto mt-4 mb-4" />
                  <p className="text-stone-500 font-medium text-sm max-w-sm leading-relaxed">Friendly tables, cozy lounges, and a warm community built around good coffee.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                  <div className="col-span-2 row-span-2 rounded-[28px] overflow-hidden relative group hover-float cursor-pointer min-h-[250px] md:min-h-[420px] border-4 border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&q=80&w=800" alt="Students studying" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-[1.03]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm font-bold tracking-wide">Shared Study Tables</span>
                    </div>
                  </div>
                  <div className="col-span-1 rounded-[28px] overflow-hidden relative group hover-float cursor-pointer min-h-[150px] md:min-h-[200px] border-4 border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400" alt="Barista pouring coffee" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-[1.03]" />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs font-bold tracking-wide">Our Baristas</span>
                    </div>
                  </div>
                  <div className="col-span-1 rounded-[28px] overflow-hidden relative group hover-float cursor-pointer min-h-[150px] md:min-h-[200px] border-4 border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=400" alt="Latte art" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-[1.03]" />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs font-bold tracking-wide">Latte Art</span>
                    </div>
                  </div>
                  <div className="col-span-2 rounded-[28px] overflow-hidden relative group hover-float cursor-pointer min-h-[150px] md:min-h-[200px] border-4 border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=800" alt="Cafe lounge area" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-[1.03]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm font-bold tracking-wide">Cozy Lounge Area</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ──────── FOOTER SECTION: CONTACT & INFO ──────── */}
            <footer className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 text-white py-16 lg:py-20 relative overflow-hidden">
              
              {/* Footer background decorations */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 shape-blob animate-float-gentle opacity-10" />
                <div className="absolute bottom-10 right-10 w-32 h-32 shape-blob-2 animate-drift-slow opacity-15" />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/10 to-amber-400/5 animate-pulse-soft" />
                <div className="absolute bottom-1/3 right-1/4 w-28 h-28 rounded-full bg-gradient-to-br from-stone-400/8 to-stone-300/4 animate-float-gentle" style={{ animationDelay: '2s' }} />
              </div>
              
              <div className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
                  
                  {/* Brand & Description */}
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-serif font-black mb-4 text-amber-400">Brows&amp;Beyond</h3>
                    <p className="text-stone-300 text-sm leading-relaxed mb-6 max-w-md">
                      Where artisan coffee meets ultimate focus. Join our community of creators, 
                      students, and professionals in the perfect blend of productivity and comfort.
                    </p>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors cursor-pointer">
                        <span className="text-[10px] font-bold">FB</span>
                      </div>
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors cursor-pointer">
                        <span className="text-[10px] font-bold">IG</span>
                      </div>
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500/20 transition-colors cursor-pointer">
                        <span className="text-[10px] font-bold">X</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hours */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4">Hours</h4>
                    <div className="space-y-2 text-stone-300 text-sm">
                      <div className="flex justify-between">
                        <span>Mon - Fri</span>
                        <span>6:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>7:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>8:00 AM - 9:00 PM</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4">Connect</h4>
                    <div className="space-y-2 text-stone-300 text-sm">
                      <p>Follow us on social media</p>
                      <p>Join our community</p>
                      <p>Share your workspace photos</p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-stone-400 text-xs">
                    © 2026 Brows&amp;Beyond Café &amp; Workspace. Crafted with care and passion
                  </p>
                  <div className="flex gap-6 text-stone-400 text-xs">
                    <span className="hover:text-amber-400 cursor-pointer transition-colors">Privacy</span>
                    <span className="hover:text-amber-400 cursor-pointer transition-colors">Terms</span>
                    <span className="hover:text-amber-400 cursor-pointer transition-colors">Accessibility</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )}

        {/* ─── MENU VIEW ─── */}
        {view === 'menu' && (
          <main className="flex-grow px-4 md:px-8 pb-10 pt-6 max-w-7xl mx-auto w-full animate-fade-in-up">
            <DeskJournal
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onItemClick={(item) => setSelectedItem(item)}
            />
          </main>
        )}

        {/* ─── MAP VIEW ─── */}
        {view === 'map' && (
          <main className="flex-grow px-4 md:px-8 pb-10 pt-6 max-w-5xl mx-auto w-full animate-fade-in-up">
            <FloorPlanMap
              activeZone={activeZone}
              onSelectZone={handleSelectZone}
            />
          </main>
        )}
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="text-center text-[10px] font-bold tracking-[0.15em] uppercase text-stone-400 py-10 border-t border-stone-200 px-4 shrink-0 bg-white/30 backdrop-blur-md select-none">
        © {new Date().getFullYear()} Brows&amp;Beyond · Coffee &amp; Community
      </footer>

      {/* ─── DETAIL MODAL ─── */}
      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
