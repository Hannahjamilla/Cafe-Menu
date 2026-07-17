import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { menuCategories, menuItems } from '../data/menu-data';

export default function MenuSection({ onItemClick }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTagFilter, setActiveTagFilter] = useState('');

  // Handle category changes
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setActiveTagFilter(''); // reset tag filter on category change
  };

  // Collect all unique tags for the secondary sub-filter buttons
  const availableTags = useMemo(() => {
    const rawTags = [];
    menuItems.forEach(item => {
      if (selectedCategory === 'all' || item.category === selectedCategory) {
        rawTags.push(...item.tags);
      }
    });
    // return top 6 unique tags
    return [...new Set(rawTags)].slice(0, 6);
  }, [selectedCategory]);

  // Filter items based on category, search query, and active subtag
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      const matchesQuery = searchQuery.trim() === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = activeTagFilter === '' || item.tags.includes(activeTagFilter);

      return matchesCategory && matchesQuery && matchesTag;
    });
  }, [selectedCategory, searchQuery, activeTagFilter]);

  // Split out best sellers for highlighting at the top
  const bestSellers = useMemo(() => {
    return menuItems.filter(item => item.tags.includes('Best Seller'));
  }, []);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-gradient-to-b from-[#faf8f5] via-[#f5f7f2] to-[#faf8f5] scroll-mt-16">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-emerald-850 uppercase font-sans">
            Crafted Daily • Fresh Organic & Low-Impact Ingredients
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1e3422] font-black mt-3 leading-tight">
            Our Sustainable Menu Selection
          </h2>
          <p className="text-[#3f4a3e] mt-4 font-semibold text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Every cup is brewed using compostable filters, standard solar power, and organic fair-trade beans. Our pastries and mains highlight trusted ingredients sourced from local eco-farms.
          </p>
          
          {/* Eco Bulletin Banner */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4.5 py-2.5 bg-emerald-50/70 border border-emerald-100/70 rounded-2xl text-[11px] font-black text-emerald-800 shadow-sm leading-none">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Every drink plants a tree. <strong>Benguet reforestation program</strong> active. 🌲</span>
          </div>

          <div className="flex items-center justify-center space-x-2 mt-6">
            <div className="w-12 h-[3px] bg-emerald-800/10 rounded-full" />
            <div className="w-3 h-3 rounded-full bg-[#1e3422]/20" />
            <div className="w-12 h-[3px] bg-emerald-800/10 rounded-full" />
          </div>
        </div>

        {/* --- Spotlight: Guest Favorites (Horizontal scroll / quick view) --- */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-serif text-emerald-950 font-black">
                Guest Favorites
              </h3>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-800/25">
                Most Choice
              </span>
            </div>
            <div className="hidden md:flex items-center text-xs text-stone-500 font-semibold">
              <span>Swipe or scroll for favorites ➔</span>
            </div>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-6 scroll-smooth no-scrollbar snap-x">
            {bestSellers.map((item, idx) => (
              <div
                key={`best-${item.id}`}
                onClick={() => onItemClick(item)}
                className="flex-shrink-0 w-[380px] bg-white rounded-[24px] border border-[#eadecf]/80 hover:border-emerald-750/30 p-5 flex space-x-5 cursor-pointer hover:shadow-xl transition-all duration-300 snap-start transform hover:-translate-y-1.5 group"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-2xl border border-emerald-800/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-emerald-950 text-emerald-450 border border-emerald-800/20 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center">
                    ★
                  </div>
                </div>
                <div className="flex flex-col justify-between overflow-hidden flex-1">
                  <div>
                    <h4 className="font-bold text-stone-900 text-base leading-tight mb-1 group-hover:text-emerald-800 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-3">
                    <div>
                      <span className="text-xl text-emerald-850 font-extrabold">
                        ₱{item.price}
                      </span>
                      <span className="text-[10px] text-stone-400 block tracking-wide select-none">per serving</span>
                    </div>
                    <button className="text-[10px] uppercase tracking-wider bg-emerald-950 hover:bg-emerald-900 text-emerald-350 px-3 py-2 rounded-xl font-black transition-colors cursor-pointer border border-emerald-800/30">
                      Options
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- INTERACTIVE CONTROLS BAR --- */}
        <div className="bg-white/90 backdrop-blur-md border border-[#dde3d5] rounded-3xl p-6 sm:p-8 mb-12 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-10">
          
          {/* Real-time search */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-700">
              <Search className="w-4 h-4 text-emerald-700/80" />
            </span>
            <input
              type="text"
              placeholder="Search menu items, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#dde3d5] pl-10 pr-4 py-3 rounded-2xl text-xs font-semibold text-[#0f2a17] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700/50 transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-emerald-750"
              >
                ✕
              </button>
            )}
          </div>

          {/* Enhanced tag filters */}
          {availableTags.length > 0 && (
            <div className="flex flex-col space-y-2 lg:max-w-xl">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-805" />
                <span className="text-[11px] text-emerald-900 font-extrabold uppercase tracking-wider">Quick Filters:</span>
              </div>
              
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => setActiveTagFilter('')}
                  className={`text-[10px] px-3.5 py-1.5 rounded-xl border font-bold flex-shrink-0 tracking-wider uppercase transition-all cursor-pointer ${
                    activeTagFilter === ''
                      ? 'bg-emerald-950 text-[#4ade80] border-emerald-950 shadow-sm'
                      : 'bg-white text-stone-600 border-[#dde3d5] hover:bg-emerald-50/30'
                  }`}
                >
                  All
                </button>

                {availableTags.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTagFilter(tag)}
                    className={`text-[10px] px-3.5 py-1.5 rounded-xl border font-bold flex-shrink-0 tracking-wider uppercase transition-all cursor-pointer ${
                      activeTagFilter === tag
                        ? 'bg-emerald-950 text-[#4ade80] border-emerald-950 shadow-sm'
                        : 'bg-white text-stone-600 border-[#dde3d5] hover:bg-emerald-50/30'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* --- MAIN CATEGORY TABS --- */}
        <div className="flex justify-center flex-wrap gap-2.5 sm:gap-3.5 mb-14">
          {menuCategories.map((cat) => {
            const Icon = Icons[cat.icon] || Icons.HelpCircle;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center space-x-2.5 px-5 py-3 rounded-2xl font-bold border transition-all text-xs tracking-wider uppercase select-none flex-shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0f2a17] border-[#0f2a17] text-[#4ade80] font-black shadow-md'
                    : 'bg-white hover:bg-emerald-50/50 border-[#eadecf] text-stone-600 hover:text-[#0f2a17]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* --- MENU LISTINGS GRID --- */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onItemClick(item)}
                className="bg-white rounded-3xl overflow-hidden border border-[#eadecf] hover:border-emerald-700/40 hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full transform hover:-translate-y-2.5"
              >
                {/* Visual Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#f5f0eb] to-[#eadecf]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a180b]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Floating price tag */}
                  <div className="absolute top-4 right-4 bg-emerald-950 text-emerald-400 px-4 py-2 rounded-2xl font-extrabold text-base shadow-xl backdrop-blur-sm border border-emerald-800/10">
                    ₱{item.price}
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#0f2a17] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-800/10">
                    {menuCategories.find(cat => cat.id === item.category)?.name.split(' ')[0] || 'Special'}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 items-center">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`text-[9.5px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md font-sans ${
                            tag === 'Best Seller'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/15'
                              : tag === 'Vegan Friendly' || tag === 'Vegan' || tag === 'Vegetarian Option'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/15'
                              : tag === 'Trending'
                              ? 'bg-purple-950/80 text-purple-300 border border-purple-800/15'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {(item.category === 'coffee' || item.category === 'non-coffee') && (
                        <span className="text-[9.5px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100/60 px-2 py-1 rounded-md flex items-center gap-1 shadow-sm uppercase tracking-wider">
                          🌱 Eco-Cup
                        </span>
                      )}
                      {item.tags.length > 2 && (
                        <span className="text-[10px] text-[#9a764d] font-semibold">
                          +{item.tags.length - 2} more
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-serif font-black text-[#2a180b] group-hover:text-emerald-800 transition-colors line-clamp-2 leading-tight">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-[#624326] leading-relaxed line-clamp-3 font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Open Prompter */}
                  <div className="pt-5 border-t border-[#f5f0eb] mt-5 flex items-center justify-between">
                    <div className="text-xs text-[#0f2a17] font-bold">
                      <span className="block font-black">Nutrition &amp; Origin</span>
                      <span className="text-stone-500 font-medium">Tap for details</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#0f2a17] group-hover:text-emerald-700 group-hover:translate-x-1 transition-all duration-300">
                      <span className="text-sm font-bold">Customize</span>
                      <Icons.ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gradient-to-br from-white to-[#f5f0eb] rounded-3xl border-2 border-[#eadecf] p-12 max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-[#815e3a] to-[#bca47a] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-white mb-6 shadow-lg">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-[#2a180b] font-serif mb-3">No Menu Items Found</h4>
            <p className="text-sm text-[#624326] font-medium leading-relaxed mb-6">
              We couldn't find matches for "<span className="font-bold text-[#815e3a]">{searchQuery}</span>". Try different keywords or browse by category.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveTagFilter('');
                }}
                className="inline-flex items-center text-sm font-bold text-white bg-[#543722] hover:bg-[#2a180b] px-6 py-3 rounded-xl transition-colors shadow-md"
              >
                Clear Search
              </button>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setActiveTagFilter('');
                }}
                className="inline-flex items-center text-sm font-bold text-[#815e3a] bg-white border-2 border-[#815e3a] hover:bg-[#815e3a] hover:text-white px-6 py-3 rounded-xl transition-all shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
