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
import TrayDrawer from './components/tray-drawer';
import OrderCardModal from './components/order-card-modal';
import ThankYouModal from './components/thank-you-modal';
import { menuItems } from './data/menu-data';
import { BookOpen, Map, ArrowRight, ArrowUpRight, Wifi, Clock, Users, Coffee, MapPin, Zap, Leaf, Sprout, TreePine, Recycle, Heart, Droplets } from 'lucide-react';

export default function App() {
  const [view, setView] = useState(() => {
    try { return localStorage.getItem('view') || 'landing'; }
    catch { return 'landing'; }
  });
  const [activeTab, setActiveTab] = useState(() => {
    try { return localStorage.getItem('activeTab') || 'full'; }
    catch { return 'full'; }
  });
  const [activeZone, setActiveZone] = useState(() => {
    try { return localStorage.getItem('activeZone') || ''; }
    catch { return ''; }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Customer Order tray state — persists across refresh via localStorage
  const [trayItems, setTrayItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('trayItems') || '[]'); }
    catch { return []; }
  });
  const [trayOpen, setTrayOpen] = useState(() => {
    try { return localStorage.getItem('trayOpen') === 'true'; }
    catch { return false; }
  });
  const [customerName, setCustomerName] = useState(() =>
    localStorage.getItem('customerName') || ''
  );
  // Toast & bounce states for add-to-tray animation
  const [trayToast, setTrayToast] = useState(null); // { name, image }
  const [trayBouncing, setTrayBouncing] = useState(false);

  // Sync tray / view states to localStorage whenever changes happen
  React.useEffect(() => {
    localStorage.setItem('trayItems', JSON.stringify(trayItems));
  }, [trayItems]);
  React.useEffect(() => {
    localStorage.setItem('customerName', customerName);
  }, [customerName]);
  React.useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);
  React.useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);
  React.useEffect(() => {
    localStorage.setItem('activeZone', activeZone);
  }, [activeZone]);
  React.useEffect(() => {
    localStorage.setItem('trayOpen', trayOpen ? 'true' : 'false');
  }, [trayOpen]);

  // Present-order modal — shows the full-screen card the customer shows at the counter
  const [presentModeOpen, setPresentModeOpen] = useState(() => {
    try { return localStorage.getItem('presentModeOpen') === 'true'; }
    catch { return false; }
  });
  React.useEffect(() => {
    localStorage.setItem('presentModeOpen', presentModeOpen ? 'true' : 'false');
  }, [presentModeOpen]);

  // Thank options modal popup
  const [showThankYouPopup, setShowThankYouPopup] = useState(() => {
    try { return localStorage.getItem('showThankYouPopup') === 'true'; }
    catch { return false; }
  });
  React.useEffect(() => {
    localStorage.setItem('showThankYouPopup', showThankYouPopup ? 'true' : 'false');
  }, [showThankYouPopup]);

  const handleAddToTray = (customizations, price) => {
    const newItem = {
      id: 'tray-item-' + Date.now() + Math.random().toString(36).substring(5),
      menuId: selectedItem.id,
      name: selectedItem.name,
      image: selectedItem.image,
      price: price,
      quantity: 1,
      customizations: customizations
    };
    setTrayItems(prev => [...prev, newItem]);
    setSelectedItem(null);
    // Toast notification
    setTrayToast({ name: newItem.name, image: newItem.image });
    setTimeout(() => setTrayToast(null), 2800);
    // Bounce the tray nav button
    setTrayBouncing(true);
    setTimeout(() => setTrayBouncing(false), 700);
  };

  const handleUpdateQty = (itemId, newQty) => {
    if (newQty <= 0) { setTrayItems(prev => prev.filter(i => i.id !== itemId)); return; }
    setTrayItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (itemId) => {
    setTrayItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearTray = () => { setTrayItems([]); };

  const handlePresentOrder = () => {
    setTrayOpen(false);
    setPresentModeOpen(true);
  };
  
  
  // Eco pledge interactive states
  const [ecoDrinks, setEcoDrinks] = useState(32);
  const [treesPlanted, setTreesPlanted] = useState(247);
  const [justPlanted, setJustPlanted] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const addVirtualDrink = () => {
    setEcoDrinks(prev => {
      const nextDrinks = prev + 1;
      if (nextDrinks >= 50) {
        setTreesPlanted(t => t + 1);
        setJustPlanted(true);
        
        // Spawn 15 floating particles
        const newParticles = Array.from({ length: 15 }).map((_, i) => ({
          id: Date.now() + i + Math.random(),
          x: Math.random() * 80 + 10,  // distributed across x-axis
          y: Math.random() * 20 + 60,  // start near the button/badge
          delay: Math.random() * 0.5,
          scale: Math.random() * 0.4 + 0.8,
          emoji: ['🍃', '🌿', '🌱', '✨', '🌸'][Math.floor(Math.random() * 5)]
        }));
        
        setParticles(newParticles);
        setTimeout(() => {
          setJustPlanted(false);
          setParticles([]);
        }, 3000);
        
        return 0;
      }
      return nextDrinks;
    });
  };
  
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
    <div className="app-bg min-h-screen flex flex-col justify-between overflow-x-clip">
      <div>
        <NavigationBar 
          currentView={view} 
          onViewChange={setView} 
          currentZone={activeZone} 
          onTrayOpenClick={() => setTrayOpen(true)}
          trayCount={trayItems.length}
          trayBouncing={trayBouncing}
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
                    <span>Est. 2026 . Sustainable Café & Workspace</span>
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
                    At Brows&amp;Beyond, we deliver fair-trade, organic espresso for brilliant brains. Pull up a reclaimed-wood chair, grab some fresh ideas, and let's get focused.
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
              <div className="flex-1 flex flex-col items-center justify-center relative w-full lg:max-w-[550px] animate-fade-in-scale mt-6 lg:mt-0 z-20">
                
                {/* ── ECO BADGES (Design visual add-ons for sustainability) ── */}
                <div className="absolute -top-4 sm:top-4 right-0 sm:-right-4 bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-[0_15px_35px_rgba(16,185,129,0.15)] border border-emerald-100 flex items-center gap-3 transform rotate-3 animate-float-gentle z-40 hover:scale-105 transition-transform cursor-default">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-50 to-[#e4f5ea] rounded-xl flex items-center justify-center border border-emerald-100/50">
                    <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <div className="pr-2">
                    <span className="block text-[8px] sm:text-[9.5px] font-black uppercase tracking-widest text-[#a26a42]">Local Farms</span>
                    <span className="block text-[11px] sm:text-[13px] font-bold text-emerald-800 leading-tight">100% Organic</span>
                  </div>
                </div>

                <div className="absolute bottom-10 -left-2 sm:-left-8 bg-white/95 backdrop-blur-xl p-3 sm:p-3.5 rounded-2xl shadow-[0_15px_35px_rgba(162,106,66,0.1)] border border-[#e8dcb9] flex items-center gap-3 transform -rotate-6 animate-drift-slow z-40 hover:scale-105 transition-transform cursor-default" style={{ animationDelay: '2s' }}>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#fbf5eb] rounded-full flex items-center justify-center">
                    <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                  </div>
                  <div className="pr-1">
                    <span className="block text-[10px] sm:text-[11px] font-black text-stone-700">Zero-Waste</span>
                    <span className="block text-[8px] font-bold uppercase tracking-widest text-stone-400 leading-tight">Compostable</span>
                  </div>
                </div>
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

          {/* ──────── ECO PLEDGE SECTION ──────── */}
          <section className="relative py-8 lg:py-12 bg-gradient-to-b from-[#f3f5f0] via-[#eef2e8] to-[#f3f5f0] border-y border-[#dde3d5] overflow-hidden">

            {/* Section-level ambient blobs */}
            <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-emerald-200/10 filter blur-[120px] pointer-events-none animate-pulse-soft" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-amber-100/10 filter blur-[100px] pointer-events-none animate-drift-slow" />

            {/* Main card container */}
            <div className="max-w-[1340px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">

              {/* Section pre-heading (Reduced margins and sizes) */}
              <div className="flex flex-col items-center text-center mb-6 lg:mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-[8.5px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-2.5 shadow-sm">
                  <Leaf className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
                  Sustainability Pledge
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight leading-none">
                  Brewing a <span className="italic text-emerald-700">Greener</span> Future
                </h2>
              </div>

              {/* Dark feature card (Reduced padding and inner gaps) */}
              <div className="relative bg-gradient-to-br from-[#0f1f12] via-[#162a19] to-[#0d1c10] rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-10 border border-emerald-900/30 shadow-[0_20px_50px_rgba(10,25,12,0.4)] overflow-hidden">

                {/* Grid background */}
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:28px_28px]" />

                {/* Premium corner ornaments */}
                <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-emerald-500/15 rounded-tl-sm" />
                <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-emerald-500/15 rounded-tr-sm" />
                <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-emerald-500/15 rounded-bl-sm" />
                <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-emerald-500/15 rounded-br-sm" />

                {/* Floating Leaf Particles */}
                {particles.map(p => (
                  <span
                    key={p.id}
                    className="absolute pointer-events-none text-xl animate-float-particle z-50"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      animationDelay: `${p.delay}s`,
                      transform: `scale(${p.scale})`,
                    }}
                  >
                    {p.emoji}
                  </span>
                ))}

                {/* Ambient glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/10 filter blur-[130px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-amber-500/5 filter blur-[100px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-emerald-400/5 filter blur-[80px] pointer-events-none animate-pulse-soft" />

                {/* Botanical Tree SVG silhouette */}
                <svg className="absolute right-4 lg:right-10 bottom-4 lg:bottom-6 w-32 h-40 sm:w-44 sm:h-56 text-emerald-500/[0.04] pointer-events-none" viewBox="0 0 100 130" fill="currentColor">
                  <ellipse cx="50" cy="35" rx="38" ry="32" />
                  <ellipse cx="35" cy="50" rx="22" ry="18" />
                  <ellipse cx="65" cy="50" rx="22" ry="18" />
                  <ellipse cx="50" cy="22" rx="26" ry="20" />
                  <rect x="46" y="65" width="8" height="55" rx="4" />
                  <ellipse cx="38" cy="120" rx="20" ry="4" opacity="0.3" />
                  <ellipse cx="62" cy="120" rx="20" ry="4" opacity="0.3" />
                </svg>

                {/* ─── Content Grid ─── */}
                <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                  {/* Column 1: Headline + CTA */}
                  <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left lg:max-w-[420px]">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950/70 border border-emerald-700/30 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-[0.25em] mb-6">
                      <TreePine className="w-3 h-3 text-emerald-400" />
                      Our Green Commitment
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-serif font-black text-white leading-[1.08] tracking-tight">
                      Every Sip <br className="hidden sm:block" />
                      <span className="italic text-emerald-400 relative inline-block">
                        Plants a Tree.
                        <svg className="absolute w-full h-2.5 -bottom-1.5 left-0 text-emerald-500/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                          <path d="M0,10 Q25,20 50,10 T100,15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </h3>

                    <p className="mt-6 text-stone-300/80 text-sm sm:text-[15px] leading-relaxed max-w-md font-medium">
                      Help us reforest the Cordillera mountains! For every <span className="text-emerald-400 font-bold">50 drinks</span> purchased, we plant a native tree. Watch your impact grow in real time.
                    </p>

                    {/* Stat Capsules */}
                    <div className="flex flex-wrap gap-3 mt-7 justify-center lg:justify-start">
                      {[
                        { value: '12.4 tons', label: 'CO₂ Offset', icon: '🌿' },
                        { value: '98%', label: 'Waste Diverted', icon: '♻️' },
                      ].map((stat) => (
                        <div key={stat.label} className="flex items-center gap-2.5 bg-white/[0.04] border border-emerald-800/25 px-4 py-2.5 rounded-2xl hover:bg-white/[0.07] hover:border-emerald-700/35 transition-all duration-300 cursor-default">
                          <span className="text-base">{stat.icon}</span>
                          <div>
                            <span className="block text-sm font-black text-white leading-none">{stat.value}</span>
                            <span className="block text-[8.5px] font-bold text-stone-400/80 uppercase tracking-widest">{stat.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Column 2: Interactive Counter Card (Wider & Bigger) */}
                  <div className="w-full lg:w-auto shrink-0 flex justify-center">
                    <div className="relative bg-gradient-to-b from-stone-900/60 to-stone-950/70 backdrop-blur-xl border border-emerald-700/30 rounded-[36px] p-10 sm:p-12 flex flex-col items-center gap-6 group shadow-[0_25px_70px_rgba(0,0,0,0.5)] w-full max-w-[390px] sm:w-[380px]">

                      {/* Hover glow ring */}
                      <div className="absolute -inset-[2px] bg-gradient-to-b from-emerald-400/25 via-emerald-500/10 to-transparent rounded-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Decorative ring behind the counter */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-emerald-500/10 pointer-events-none animate-pulse-soft" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-emerald-500/[0.04] pointer-events-none" />

                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400/90 relative z-10">Trees Planted</span>

                      <div className="flex items-end gap-3.5 my-1 relative z-10">
                        <span className={`text-7xl sm:text-8xl font-serif font-black text-white/95 leading-none tracking-tight transition-all duration-500 ${justPlanted ? 'scale-110 text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]' : ''}`}>
                          {treesPlanted}
                        </span>
                        <span className={`text-4xl pb-3 transition-all duration-500 ${justPlanted ? 'rotate-12 scale-125' : ''}`}>
                          🌳
                        </span>
                      </div>

                      {/* Planted flash */}
                      {justPlanted && (
                        <div className="absolute top-7 bg-emerald-400 text-stone-950 font-black text-[10px] tracking-widest uppercase px-5 py-2 rounded-full animate-bounce shadow-lg shadow-emerald-500/30 z-20">
                          🎉 NEW TREE PLANTED!
                        </div>
                      )}

                      {/* Progress bar */}
                      <div className="w-full mt-2 relative z-10">
                        <div className="flex justify-between text-[11px] font-bold text-stone-300 mb-2 uppercase tracking-wider">
                          <span>Next Tree</span>
                          <span className="text-emerald-400 font-extrabold text-xs">{ecoDrinks} / 50</span>
                        </div>
                        <div className="h-3 bg-stone-900/95 border border-stone-800/40 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-full relative overflow-hidden transition-all duration-500 ease-out"
                            style={{ width: `${(ecoDrinks / 50) * 100}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
                          </div>
                        </div>
                        <p className="text-[11px] text-stone-400/90 mt-3 font-semibold text-center">
                          {50 - ecoDrinks} sips until tree #{treesPlanted + 1} 🌱
                        </p>
                      </div>

                      {/* Friendly CTA to Menu */}
                      <button
                        onClick={() => setView('menu')}
                        className="w-full mt-2 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-black text-[11px] tracking-widest uppercase py-4 px-6 rounded-2xl shadow-xl shadow-emerald-900/35 active:scale-95 hover:shadow-emerald-500/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative z-10"
                      >
                        <Coffee className="w-4 h-4 fill-current" />
                        Grab a Drink 🍃
                      </button>
                      <p className="text-[11px] text-stone-400/80 mt-2 text-center font-medium relative z-10 leading-normal">
                        Every cup counts — let's grow together!
                      </p>
                    </div>
                  </div>

                  {/* Column 3: Initiative Cards (Made Smaller and Compact) */}
                  <div className="flex-1 flex flex-col gap-2.5 w-full lg:max-w-[340px]">
                    {[
                      {
                        icon: Leaf,
                        title: '100% Certified Organic',
                        desc: 'Fair-trade beans sourced from trusted family farms in the Philippines.',
                        accent: 'text-emerald-400 bg-emerald-950/60 border-emerald-755/30',
                        glow: 'group-hover:shadow-emerald-500/5'
                      },
                      {
                        icon: Recycle,
                        title: 'From Cup to Soil',
                        desc: 'Coffee grounds & fruit leftovers become rich compost fertilizer.',
                        accent: 'text-amber-400 bg-amber-950/40 border-amber-700/25',
                        glow: 'group-hover:shadow-amber-500/5'
                      },
                      {
                        icon: Droplets,
                        title: 'Zero Single-Use Plastic',
                        desc: 'Cups, lids & straws are all plant-based compostable materials.',
                        accent: 'text-sky-400 bg-sky-950/40 border-sky-700/25',
                        glow: 'group-hover:shadow-sky-500/5'
                      },
                      {
                        icon: Heart,
                        title: 'BYO Cup = 10% Off',
                        desc: 'Bring your reusable mug and save on every single order.',
                        accent: 'text-rose-400 bg-rose-950/30 border-rose-700/20',
                        glow: 'group-hover:shadow-rose-500/5'
                      },
                    ].map((item, idx) => (
                      <div key={idx} className={`group flex items-start gap-3 bg-white/[0.02] border border-emerald-800/10 rounded-xl p-3 hover:bg-white/[0.05] hover:border-emerald-700/20 transition-all duration-300 cursor-default shadow-sm ${item.glow} hover:shadow-md`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${item.accent} group-hover:scale-105 transition-transform duration-300`}>
                          <item.icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-200 text-xs leading-snug group-hover:text-emerald-300 transition-colors">{item.title}</h4>
                          <p className="text-[10.5px] text-stone-400/75 leading-relaxed mt-0.5 font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom marquee strip */}
                <div className="mt-10 lg:mt-12 pt-8 border-t border-emerald-900/20 relative z-10">
                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                    {[
                      { icon: '☕', label: 'Fair-Trade Certified' },
                      { icon: '♻️', label: 'BYO Cup Discount' },
                      { icon: '🌍', label: 'Climate Verified' },
                      { icon: '📲', label: 'Zero Paper Receipts' },
                      { icon: '🌱', label: 'Organic Composting' },
                      { icon: '💧', label: 'Water Conservation' },
                    ].map((tag) => (
                      <div key={tag.label} className="flex items-center gap-2 text-stone-400/70 hover:text-emerald-400 transition-colors duration-300 cursor-default group/tag">
                        <span className="text-sm group-hover/tag:scale-110 transition-transform">{tag.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{tag.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Subtle editorial horizontal divider between Eco Commitment and Space Navigation */}
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-20 flex items-center justify-center gap-6">
            <div className="h-px bg-stone-200/90 flex-1" />
            <div className="flex items-center gap-2.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-700/60" />
              <span className="text-[9px] font-sans font-black uppercase tracking-[0.25em] text-[#a26a42]">Community &amp; Soil</span>
            </div>
            <div className="h-px bg-stone-200/90 flex-1" />
          </div>

          {/* ──────── SECTION 2: THREE-COLUMN COLLAGE ──────── */}
          <section className="max-w-[1400px] mx-auto w-full px-3 sm:px-4 lg:px-6 pt-16 lg:pt-20 pb-16 relative">
              
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

            {/* ──────── SECTION 3: PREMIUM STATS ──────── */}
            <section className="bg-gradient-to-b from-stone-50 to-[#fdfaf5] border-y border-stone-200/50 py-20 lg:py-24 relative overflow-x-hidden">
              
              {/* Complex fluid abstract background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                 <div className="w-[120vw] h-[120vw] lg:w-[60vw] lg:h-[60vw] rounded-full bg-gradient-to-tr from-amber-100/20 to-orange-50/20 blur-[100px] absolute -top-[10%] -left-[10%] animate-pulse-soft" />
                 <div className="w-[100vw] h-[100vw] lg:w-[50vw] lg:h-[50vw] rounded-full bg-gradient-to-bl from-stone-200/30 to-amber-50/10 blur-[120px] absolute bottom-[0%] right-[0%] animate-drift-slow" />
              </div>
              
              <div className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                
                {/* Left Side: Storytelling */}
                <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start relative">
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-100/40 rounded-full filter blur-2xl -z-10" />
                  
                  <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-bold uppercase text-[#a26a42] bg-white/70 backdrop-blur-md border border-stone-200/60 px-5 py-2.5 rounded-full mb-5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                    Why People Choose Us
                  </span>
                  
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-stone-900 tracking-tight leading-[1.05]">
                    More Than <br className="hidden lg:block"/> Just Coffee
                  </h2>
                  
                  <p className="mt-5 text-stone-500 font-medium text-sm sm:text-base leading-relaxed max-w-lg lg:max-w-md">
                    Our spaces are designed to encourage focus and connection. We've thoughtfully curated every detail—from the high-speed internet to our hand-picked beans.
                  </p>
                  
                  <div className="divider-animated w-16 mx-auto lg:mx-0 mt-8" />
                </div>

                {/* Right Side: Bento Grid Stats */}
                <div className="flex-1 w-full relative">
                  {/* Grid layout - Bento style */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 relative">
                    {/* Decorative element centered in grid on desktop */}
                    <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-[0_0_40px_rgba(162,106,66,0.12)] z-20 items-center justify-center border-4 border-[#faf8f4]">
                      <Coffee className="w-6 h-6 text-amber-500 animate-pulse" />
                    </div>

                    {[
                      { icon: Coffee, value: '24+', label: 'Drinks', desc: 'Expertly brewed from beans to cup.', accent: 'text-amber-600 bg-amber-50/80 border-amber-200/60 shadow-[0_4px_12px_rgba(217,119,6,0.05)]', ping: 'bg-amber-400', align: 'translate-y-0 lg:translate-y-4', extraClasses: 'rounded-tl-[30px] rounded-br-[16px] rounded-tr-[16px] rounded-bl-[16px]' },
                      { icon: Wifi, value: 'Free', label: 'Wi-Fi', desc: 'Seamless connection to keep you in flow.', accent: 'text-sky-600 bg-sky-50/80 border-sky-200/60 shadow-[0_4px_12px_rgba(2,132,199,0.05)]', ping: 'bg-sky-400', align: 'translate-y-0 lg:-translate-y-4', extraClasses: 'rounded-tr-[30px] rounded-bl-[16px] rounded-br-[16px] rounded-tl-[16px]' },
                      { icon: Clock, value: '6a—10p', label: 'Every Day', desc: 'Early mornings to late brainstorms.', accent: 'text-emerald-600 bg-emerald-50/80 border-emerald-200/60 shadow-[0_4px_12px_rgba(5,150,105,0.05)]', ping: 'bg-emerald-400', align: 'translate-y-0 lg:translate-y-4', extraClasses: 'rounded-bl-[30px] rounded-tr-[16px] rounded-tl-[16px] rounded-br-[16px]' },
                      { icon: Users, value: '100+', label: 'Regulars', desc: 'A community of thinkers and creators.', accent: 'text-rose-600 bg-rose-50/80 border-rose-200/60 shadow-[0_4px_12px_rgba(225,29,72,0.05)]', ping: 'bg-rose-400', align: 'translate-y-0 lg:-translate-y-4', extraClasses: 'rounded-br-[30px] rounded-tl-[16px] rounded-bl-[16px] rounded-tr-[16px]' }
                    ].map((stat, idx) => (
                      <div 
                        key={idx} 
                        className={`group animate-fade-in-up bg-white/95 backdrop-blur-xl p-5 sm:p-6 border border-stone-100 hover:border-[#a26a42]/30 hover:shadow-[0_20px_40px_rgba(162,106,66,0.1)] transition-all duration-500 hover:-translate-y-1.5 cursor-default relative overflow-hidden flex flex-col justify-between ${stat.align} ${stat.extraClasses}`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        {/* Interactive dynamic glow - toned down */}
                        <div className="absolute top-0 right-0 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform group-hover:scale-105" />
                        
                        <div className="relative z-10 flex flex-col justify-between h-full">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-3">
                            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-[16px] flex items-center justify-center border ${stat.accent} group-hover:scale-105 group-hover:-translate-y-0.5 transition-transform duration-500 relative bg-white`}>
                              <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 stroke-[2.5]" />
                              <span className="absolute inset-0 rounded-[16px] shadow-inner opacity-50" />
                              <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${stat.ping} shrink-0 animate-pulse`} />
                            </div>
                            <span className="inline-block text-[9px] font-black uppercase tracking-widest text-[#a26a42] bg-stone-50 px-2.5 py-1 rounded-md border border-stone-100 group-hover:bg-[#a26a42] group-hover:text-white group-hover:border-[#a26a42] transition-colors duration-500 self-start">{stat.label}</span>
                          </div>
                          
                          <div>
                            <span className="block text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight leading-none group-hover:text-[#a26a42] transition-colors duration-500">{stat.value}</span>
                            <p className="mt-3 lg:mt-4 text-[11px] sm:text-[12px] font-medium text-stone-500 leading-relaxed group-hover:text-stone-700 transition-colors duration-500">
                              {stat.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ──────── SECTION 4: SIGNATURE PICKS (WARM BG) ──────── */}
            <section className="bg-gradient-to-b from-[#f0e6d3]/60 via-[#fdfaf5] to-transparent py-24 lg:py-32 relative overflow-hidden">
              
              {/* Grand background elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-bl from-amber-200/40 via-[#eaddca]/30 to-transparent filter blur-3xl animate-pulse-soft opacity-60" />
                <div className="absolute bottom-1/4 left-0 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-[#d3b89e]/20 to-transparent filter blur-3xl animate-drift-slow opacity-50" />
              </div>
              
              <div className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 sm:mb-16 gap-6">
                  <div>
                    <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-bold uppercase text-[#a26a42] bg-white/70 backdrop-blur-md border border-stone-200/60 px-4 py-1.5 rounded-full mb-5 shadow-sm">
                      <Coffee className="w-3.5 h-3.5 text-[#a26a42]" />
                      From the Counter
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-stone-900 tracking-tight leading-[1.05]">
                      Signature Picks
                    </h2>
                  </div>
                  <button onClick={() => setView('menu')} className="hidden sm:flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-stone-700 bg-white border border-stone-200 px-6 py-3.5 rounded-full hover:bg-stone-50 hover:text-amber-700 hover:border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 shrink-0">
                    Full Menu <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {bestSellers.map((item, idx) => (
                    <button 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className="group animate-fade-in-up bg-white/60 backdrop-blur-xl rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white hover:border-[#a26a42]/30 shadow-[0_8px_24px_rgba(162,106,66,0.04)] hover:shadow-[0_24px_48px_rgba(162,106,66,0.12)] transition-all duration-500 hover:-translate-y-2 text-left flex flex-col relative"
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      {/* Image header area */}
                      <div className="relative h-[220px] sm:h-[260px] w-full bg-stone-100 shrink-0 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Premium tag overlay */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#a26a42] text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                          Signature Top Pick
                        </div>
                        
                        {/* Instant action button on image */}
                        <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 transition-all duration-500">
                           <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 md:p-8 flex flex-col flex-grow bg-gradient-to-b from-white/90 to-white relative z-10 w-full min-h-[160px]">
                        <div className="flex items-start justify-between gap-4 mb-2">
                           <h4 className="font-serif font-black text-stone-900 text-xl md:text-2xl leading-tight group-hover:text-[#a26a42] transition-colors">{item.name}</h4>
                           <span className="font-serif font-black text-[#a26a42] text-xl shrink-0">₱{Number(item.price).toFixed(0)}</span>
                        </div>
                        
                        <p className="text-sm font-medium text-stone-500 leading-relaxed line-clamp-2 mt-2">
                           {item.description}
                        </p>
                        
                        <div className="mt-6 flex flex-wrap gap-2 uppercase tracking-widest text-[9px] font-bold text-stone-400">
                           {item.tags.slice(0,2).map(tag => (
                             <span key={tag} className="bg-stone-50 border border-stone-100 px-2.5 py-1 rounded-md">{tag}</span>
                           ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Mobile Button Fallback */}
                <div className="sm:hidden mt-10 w-full text-center">
                  <button onClick={() => setView('menu')} className="w-full flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-stone-700 bg-white border border-stone-200 px-6 py-4 rounded-xl hover:bg-stone-50 active:bg-stone-100 transition-colors shadow-sm cursor-pointer">
                    View Full Menu <ArrowRight className="w-4 h-4 text-stone-400" />
                  </button>
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
        <DetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onAddToTray={handleAddToTray} 
        />
      )}

      {/* ─── TRAY DRAWER ─── */}
      <TrayDrawer
        isOpen={trayOpen}
        onClose={() => setTrayOpen(false)}
        trayItems={trayItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        customerName={customerName}
        onNameChange={setCustomerName}
        onClearTray={handleClearTray}
        onPresentOrder={handlePresentOrder}
      />

      {/* ─── ORDER CARD (PRESENT TO BARISTA) ─── */}
      <OrderCardModal
        isOpen={presentModeOpen}
        onClose={() => setPresentModeOpen(false)}
        onDone={() => {
          handleClearTray();
          setPresentModeOpen(false);
          setShowThankYouPopup(true);
        }}
        trayItems={trayItems}
        customerName={customerName}
      />

      {/* ─── THANK YOU POPUP ─── */}
      <ThankYouModal
        isOpen={showThankYouPopup}
        onClose={() => {
          setShowThankYouPopup(false);
          setCustomerName('');
        }}
        customerName={customerName}
      />

      {/* ─── ADD-TO-TRAY TOAST ─── */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ${
          trayToast 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        {trayToast && (
          <div className="flex items-center gap-3.5 bg-stone-900 text-white pl-3 pr-5 py-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl min-w-[260px] max-w-[360px]">
            {/* Item thumbnail */}
            <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-white/20 shrink-0">
              <img src={trayToast.image} alt={trayToast.name} className="w-full h-full object-cover" />
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-amber-400 uppercase tracking-widest leading-none mb-0.5">Added to tray! ☕</p>
              <p className="text-xs font-bold text-white/90 truncate">{trayToast.name}</p>
            </div>
            {/* Tap tray hint */}
            <button
              onClick={() => { setTrayOpen(true); setTrayToast(null); }}
              className="text-[9px] font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors shrink-0 border border-amber-500/30 rounded-lg px-2 py-1 hover:bg-amber-500/10"
            >
              View
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
