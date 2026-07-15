import React, { useMemo, useState } from 'react';
import { Search, Layers, Coffee, Target, Cake, Utensils, Compass, HelpCircle, Sparkles, ChevronRight } from 'lucide-react';
import { menuItems, cafeFeatures, additionalServices } from '../data/menu-data';

export default function DeskJournal({ activeTab, onSelectTab, searchQuery, setSearchQuery, onItemClick }) {

  const displayedItems = useMemo(() => {
    let category = '';
    if (activeTab === 'brews') category = 'coffee';
    else if (activeTab === 'teas') category = 'non-coffee';
    else if (activeTab === 'bakery') category = 'pastries';
    else if (activeTab === 'kitchen') category = 'meals';
    else if (activeTab === 'full') category = 'all';
    if (!category) return [];
    return menuItems.filter(item => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesSearch = !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const tabs = [
    { id: 'full',     label: 'All Items',  icon: Layers },
    { id: 'brews',    label: 'Coffee',     icon: Coffee },
    { id: 'teas',     label: 'Drinks',     icon: Compass },
    { id: 'bakery',   label: 'Pastry',     icon: Cake },
    { id: 'kitchen',  label: 'Mains',      icon: Utensils },
    { id: 'zones',    label: 'Workspaces', icon: Target },
    { id: 'services', label: 'Perks',      icon: HelpCircle },
  ];

  const menuTabs = ['full','brews','teas','bakery','kitchen'];

  const imgFallback = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=500';
  };

  return (
    <div className="w-full animate-fade-in-up overflow-x-hidden">

      {/* ══ STICKY CONTROL BAR ══ */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-stone-200/50 shadow-sm max-w-full">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onSelectTab(id)}
                className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#a26a42] text-white shadow-md scale-[1.02]'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-white/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        {menuTabs.includes(activeTab) && (
          <div className="relative shrink-0 w-full xl:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full xl:w-72 pl-11 pr-5 py-3 text-xs font-bold border-2 border-transparent bg-white/70 backdrop-blur-md rounded-2xl shadow-sm focus:outline-none focus:border-[#a26a42]/30 focus:bg-white transition-all placeholder-stone-400 text-stone-700"
            />
          </div>
        )}
      </div>

      {/* ══ SECTION LABEL ══ */}
      {menuTabs.includes(activeTab) && (
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-stone-200/60">
          <div>
            <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#a26a42] block mb-2">Our Menu</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight">
              {activeTab === 'full'    && 'All Menu Items'}
              {activeTab === 'brews'   && 'Coffee Bar'}
              {activeTab === 'teas'    && 'Teas & Cold Drinks'}
              {activeTab === 'bakery'  && 'Sweet Bakery'}
              {activeTab === 'kitchen' && 'All-Day Mains'}
            </h2>
          </div>
          <span className="text-[10px] sm:text-xs text-stone-500 font-bold bg-white/50 px-3 py-1.5 rounded-lg border border-stone-100 shadow-sm shrink-0">{displayedItems.length} items</span>
        </div>
      )}

      {/* ══ 3-COLUMN UNIFORM CARD GRID ══ */}
      {menuTabs.includes(activeTab) ? (
        displayedItems.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
            {displayedItems.map((item, idx) => {
              const isBestSeller = item.tags.includes('Best Seller');
              return (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  style={{ animationDelay: `${idx * 30}ms` }}
                  className="group animate-fade-in-up cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl"
                >
                  <div className="flex flex-col bg-white/80 backdrop-blur-xl rounded-[16px] sm:rounded-[28px] overflow-hidden shadow-[0_8px_24px_rgba(162,106,66,0.04)] border border-white/60 sm:border-2 hover:shadow-[0_20px_40px_rgba(162,106,66,0.12)] hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 h-full relative min-w-0">
                    
                    {/* Glowing background accent behind image */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-100/50 to-transparent z-0 pointer-events-none" />

                    {/* ── Image: responsive premium display ── */}
                    <div className="relative h-28 xs:h-36 sm:h-56 md:h-64 overflow-hidden bg-stone-100 shrink-0 z-10 m-1.5 sm:m-2 rounded-[12px] sm:rounded-[20px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={imgFallback}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      />
                      {/* Soft image vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-stone-900/10 mix-blend-multiply" />
                      {/* Premium Best seller badge */}
                      {isBestSeller && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md text-[#a26a42] text-[7px] sm:text-[9.5px] font-black uppercase tracking-wider px-2 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg border border-white">
                          <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-500" />
                          Top Pick
                        </div>
                      )}
                    </div>

                    {/* ── Info body ── */}
                    <div className="flex flex-col flex-1 p-3 sm:p-5 md:p-6 gap-1.5 sm:gap-3 z-10">
                      <div>
                        {/* Name */}
                        <p className="font-serif font-black text-stone-900 text-[13px] sm:text-xl md:text-2xl leading-snug group-hover:text-[#a26a42] transition-colors line-clamp-1">
                          {item.name}
                        </p>
                        {/* Tags - 1 tag on mobile, 2 on sm+ */}
                        <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2.5 overflow-hidden">
                          {item.tags.slice(0, 1).map(tag => (
                            <span key={tag} className="text-[6.5px] sm:text-[10.5px] uppercase tracking-wider sm:tracking-widest font-bold text-[#a26a42] bg-[#fbf5eb] border border-[#e8dcb9] px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md whitespace-nowrap shrink-0">
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 1 && (
                            <span className="hidden sm:inline-block text-[10.5px] uppercase tracking-widest font-bold text-[#a26a42] bg-[#fbf5eb] border border-[#e8dcb9] px-2.5 py-1 rounded-md whitespace-nowrap shrink-0">
                              {item.tags[1]}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description - hidden on very small screens */}
                      <p className="hidden sm:block text-[12.5px] sm:text-[14px] text-stone-500 leading-relaxed line-clamp-2 mt-1 flex-1 font-medium">
                        {item.description}
                      </p>
                      
                      {/* Footer: price left, order right */}
                      <div className="flex items-end justify-between pt-2 sm:pt-5 mt-auto">
                        <div>
                          <span className="hidden sm:block text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1">Price</span>
                          <span className="font-serif font-black text-stone-900 text-base sm:text-2xl md:text-3xl leading-none block">
                            <span className="text-[#a26a42] mr-0.5">₱</span>{item.price}
                          </span>
                        </div>
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#a26a42] text-white flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[#8a532a] group-hover:shadow-[0_8px_20px_rgba(162,106,66,0.3)] transition-all duration-300 shadow-md">
                          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 ml-0.5" />
                        </div>
                      </div>
                    </div>

                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center py-24 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center">
              <Search className="w-5 h-5 text-stone-400" />
            </div>
            <p className="text-stone-500 text-sm font-semibold">No results for "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} className="text-xs font-black text-[#a26a42] cursor-pointer hover:underline underline-offset-2">
              Clear search
            </button>
          </div>
        )
      ) : null}

      {/* ══ ZONES ══ */}
      {activeTab === 'zones' && (
        <div className="space-y-5">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xl font-serif font-black text-stone-900">Study & Work Zones</h2>
            <span className="text-[10px] text-stone-400 font-semibold">All free · No booking needed</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cafeFeatures.map(feat => (
              <div key={feat.id} className="flex flex-col bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <img src={feat.image} alt={feat.title} onError={imgFallback} className="w-full h-40 object-cover shrink-0" />
                <div className="p-4 flex flex-col flex-1 gap-1.5">
                  <h4 className="font-serif font-black text-stone-900 text-sm">{feat.title}</h4>
                  <p className="text-[11px] text-stone-400 leading-relaxed flex-1">{feat.description}</p>
                  <span className="inline-block self-start text-[8px] bg-emerald-50 text-emerald-700 font-black px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wide mt-1">
                    ✓ Complimentary
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ SERVICES ══ */}
      {activeTab === 'services' && (
        <div className="space-y-5">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xl font-serif font-black text-stone-900">Guest Perks</h2>
            <span className="text-[10px] text-stone-400 font-semibold">Included with every visit</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {additionalServices.map((service, idx) => (
              <div key={idx} className="flex flex-col bg-white border border-stone-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-9 h-9 bg-[#fdf3e7] rounded-xl flex items-center justify-center shrink-0 mb-3">
                  <Sparkles className="w-4 h-4 text-[#a26a42]" />
                </div>
                <h4 className="font-serif font-black text-stone-900 text-sm mb-1">{service.title}</h4>
                <p className="text-[11px] text-stone-400 leading-relaxed flex-1">{service.description}</p>
                <span className="inline-block self-start text-[8px] bg-amber-50 text-amber-700 font-black uppercase tracking-wide px-2.5 py-0.5 rounded-full border border-amber-100 mt-3">
                  Free
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
