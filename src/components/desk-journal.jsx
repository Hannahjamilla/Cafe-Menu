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
    <div className="w-full animate-fade-in-up">

      {/* ══ STICKY CONTROL BAR ══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onSelectTab(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-3 h-3 shrink-0" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        {menuTabs.includes(activeTab) && (
          <div className="relative shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-350 pointer-events-none" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-48 pl-9 pr-4 py-2 text-[11px] font-semibold border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all placeholder-stone-300 text-stone-700"
            />
          </div>
        )}
      </div>

      {/* ══ SECTION LABEL ══ */}
      {menuTabs.includes(activeTab) && (
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xl font-serif font-black text-stone-900">
            {activeTab === 'full'    && 'All Menu Items'}
            {activeTab === 'brews'   && 'Coffee Bar'}
            {activeTab === 'teas'    && 'Teas & Cold Drinks'}
            {activeTab === 'bakery'  && 'Sweet Bakery'}
            {activeTab === 'kitchen' && 'All-Day Mains'}
          </h2>
          <span className="text-[10px] text-stone-400 font-semibold">{displayedItems.length} items</span>
        </div>
      )}

      {/* ══ 3-COLUMN UNIFORM CARD GRID ══ */}
      {menuTabs.includes(activeTab) ? (
        displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedItems.map((item, idx) => {
              const isBestSeller = item.tags.includes('Best Seller');
              return (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  style={{ animationDelay: `${idx * 30}ms` }}
                  className="group animate-fade-in-up cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl"
                >
                  <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 h-full">

                    {/* ── Image: always present, fixed height ── */}
                    <div className="relative h-48 w-full overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={imgFallback}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Soft bottom fade */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      {/* Best seller badge */}
                      {isBestSeller && (
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#a26a42] text-white text-[7.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          ★ Top Pick
                        </div>
                      )}

                    </div>

                    {/* ── Info body ── */}
                    <div className="flex flex-col flex-1 p-4 gap-2">
                      {/* Name */}
                      <p className="font-serif font-black text-stone-900 text-[15px] leading-snug group-hover:text-[#a26a42] transition-colors">
                        {item.name}
                      </p>
                      {/* Description */}
                      <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2 flex-1">
                        {item.description}
                      </p>
                      {/* Tags */}
                      <div className="flex items-center gap-1 flex-wrap">
                        {item.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[8px] uppercase tracking-wide font-bold text-stone-400 bg-stone-50 border border-stone-100 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Footer: price left, order right */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-auto">
                        <span className="font-serif font-black text-stone-900 text-base">
                          ₱{(item.price * 50).toFixed(0)}
                        </span>
                        <span className="flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider text-stone-300 group-hover:text-[#a26a42] transition-colors">
                          Order <ChevronRight className="w-3 h-3" />
                        </span>
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
