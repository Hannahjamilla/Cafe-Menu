import React, { useState } from 'react';
import NavigationBar from './components/navigation-bar';
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
    <div className="app-bg min-h-screen flex flex-col justify-between">
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
          <>
            {/* ──────── SECTION 1: HERO ──────── */}
            <section className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-16 flex flex-col items-center">
              
              {/* Minimal pill tag */}
              <div className="animate-fade-in-up inline-flex items-center gap-3 text-[9px] tracking-[0.25em] font-bold uppercase text-stone-400 px-5 py-2.5 rounded-full cursor-default mb-8 select-none">
                <span className="h-[1px] w-6 bg-stone-300" />
                <span>Est. 2024 . Café & Workspace</span>
                <span className="h-[1px] w-6 bg-stone-300" />
              </div>
              
              {/* Dramatic headline */}
              <h1 className="animate-fade-in-up delay-100 text-center text-5xl sm:text-7xl lg:text-[7rem] font-serif font-black text-stone-900 leading-[0.95] tracking-tight">
                Study, sip <br className="hidden sm:block" /> 
                <span className="text-stone-900">&</span>{' '}
                <span className="italic text-amber-700/90">unwind.</span>
              </h1>

              {/* Animated gold divider line */}
              <div className="divider-animated w-24 mx-auto mt-8 mb-6 animate-fade-in-up delay-200" />
              
              <p className="animate-fade-in-up delay-300 text-stone-500 text-[15px] leading-relaxed font-medium mx-auto max-w-md text-center">
                Julius Café is your premium local space to sip artisan coffee, gather with friends, or focus deeply on your work. Welcome in.
              </p>
            </section>

            {/* ──────── SECTION 2: THREE-COLUMN COLLAGE ──────── */}
            <section className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full items-stretch">
                
                {/* LEFT: Arched Menu Portal */}
                <div 
                  role="button"
                  tabIndex={0}
                  onClick={() => setView('menu')}
                  onKeyDown={(e) => e.key === 'Enter' && setView('menu')}
                  className="animate-slide-in-left delay-300 flex-1 rounded-t-[140px] rounded-b-[40px] overflow-hidden relative group shadow-lg h-[450px] lg:h-[520px] border-[6px] border-white hover-float cursor-pointer text-left block min-h-[450px]"
                >
                  <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" alt="Coffee and Pastries" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center sm:items-start text-center sm:text-left text-white pointer-events-none">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 shadow-inner group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-serif font-black mb-2 tracking-tight group-hover:-translate-y-1 transition-transform duration-300">Check the Menu</h3>
                    <p className="text-white/70 text-sm font-medium mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                      Fresh pastries, sweet lattes, and hearty warm meals.
                    </p>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-stone-900 px-5 py-2.5 rounded-full transition-transform shadow-lg group-hover:scale-105">
                      Explore Drinks <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* CENTER: Promo + Social */}
                <div className="animate-fade-in-up delay-400 flex-1 flex flex-col gap-6 lg:gap-8">
                  <div className="flex-grow min-h-[260px]">
                    <PromoBanner />
                  </div>
                  <div className="bg-white rounded-[22px] p-3 flex items-center justify-between border border-stone-200/50 shadow-sm pr-6 hover:border-amber-200 transition-colors shrink-0">
                    <div className="flex -space-x-3">
                      <img className="w-11 h-11 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Student" />
                      <img className="w-11 h-11 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                      <img className="w-11 h-11 rounded-full border-[3px] border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
                      <div className="w-11 h-11 rounded-full border-[3px] border-white bg-amber-50 flex items-center justify-center text-[10px] font-black text-amber-700 shadow-sm">+40</div>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-black text-stone-800 tracking-tight">100+ visitors</span>
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
                  className="animate-slide-in-right delay-300 flex-1 rounded-t-[40px] rounded-b-[140px] overflow-hidden relative group shadow-lg h-[450px] lg:h-[520px] border-[6px] border-white hover-float cursor-pointer text-left block min-h-[450px]"
                >
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Study Space" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center sm:items-start text-center sm:text-left text-white mb-6 pointer-events-none">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 shadow-inner group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                      <Map className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-serif font-black mb-2 tracking-tight group-hover:-translate-y-1 transition-transform duration-300">Find a Space</h3>
                    <p className="text-white/70 text-sm font-medium mb-6 group-hover:-translate-y-1 transition-transform duration-300">
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
            <section className="bg-white/60 backdrop-blur-sm border-y border-stone-200/50 py-16 lg:py-20">
              <div className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8">
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
            <section className="bg-gradient-to-b from-[#f0e6d3]/50 to-transparent py-20 lg:py-24">
              <div className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8">
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
                          <span className="font-black text-amber-700 text-sm">₱{(item.price * 50).toFixed(0)}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-amber-600 transition-colors" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ──────── SECTION 5: PERKS MARQUEE BAR ──────── */}
            <section className="bg-stone-900 overflow-hidden py-5 select-none">
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {[...Array(2)].map((_, repeat) => (
                  <div key={repeat} className="flex gap-12 items-center shrink-0">
                    {[
                      { icon: Wifi, text: 'Free Wi-Fi' },
                      { icon: Zap, text: 'Fast-Charge Outlets' },
                      { icon: Coffee, text: 'Artisan Roast' },
                      { icon: MapPin, text: 'Private Study Pods' },
                      { icon: Clock, text: 'Open 6 AM - 10 PM' },
                      { icon: Users, text: 'Community Events' },
                    ].map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white/80">
                        <perk.icon className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-widest">{perk.text}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* ──────── SECTION 6: COMMUNITY GALLERY ──────── */}
            <section className="py-20 lg:py-28">
              <div className="max-w-[1300px] mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-12">
                  <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-stone-400 block mb-2">Inside the Space</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">The Julius Vibe</h2>
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
          </>
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
        © {new Date().getFullYear()} Julius Café & Space · Coffee & Community
      </footer>

      {/* ─── DETAIL MODAL ─── */}
      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
