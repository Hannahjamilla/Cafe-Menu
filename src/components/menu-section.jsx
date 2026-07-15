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
    <section id="menu" className="py-24 bg-[#faf8f5] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#815e3a] uppercase font-sans">
            Crafted Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2a180b] font-bold mt-2 leading-tight">
            Artisan Cafe Craft Menu
          </h2>
          <p className="text-[#624326] mt-4 font-semibold text-sm sm:text-base">
            Satisfy your hunger and charge your energy levels with our freshly prepared menu items. Every coffee shot is weighed and extracted to recipe, and all dishes are sourced from seasonal local ingredients.
          </p>
          <div className="w-16 h-[3px] bg-[#bca47a] mx-auto mt-4 rounded-full" />
        </div>

        {/* --- Spotlight: Best Sellers (Horizontal scroll / quick view) --- */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#815e3a] animate-pulse" />
            <h3 className="text-xl sm:text-2xl font-serif text-[#2a180b] font-bold">
              Guest Favorites
            </h3>
            <span className="text-xs bg-[#bca47a]/20 text-[#815e3a] font-bold px-2 py-0.5 rounded-full font-sans uppercase">
              Highly Recommended
            </span>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar snap-x">
            {bestSellers.map((item) => (
              <div
                key={`best-${item.id}`}
                onClick={() => onItemClick(item)}
                className="flex-shrink-0 w-80 bg-white rounded-2xl border border-[#eadecf] hover:border-[#bca47a] p-4 flex space-x-4 cursor-pointer hover:shadow-lg transition-all duration-300 snap-start transform hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl border border-[#eadecf] flex-shrink-0"
                />
                <div className="flex flex-col justify-between overflow-hidden">
                  <div>
                    <h4 className="font-extrabold text-[#2a180b] text-base truncate font-serif">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#624326] line-clamp-2 mt-1 font-semibold leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#815e3a] font-bold text-sm">
                      ₱{(item.price * 50).toFixed(0)}
                    </span>
                    <span className="text-[10px] bg-[#543722] text-white px-2 py-0.5 rounded font-bold">
                      Order Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- INTERACTIVE CONTROLS BAR --- */}
        <div className="glass border border-[#eadecf] rounded-2xl p-4 sm:p-6 mb-10 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-6">
          
          {/* Real-time search */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#bca47a]">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search by name, description, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/70 border border-[#eadecf] pl-11 pr-4 py-2.5 rounded-xl text-sm font-semibold text-[#2a180b] placeholder-[#bca47a] focus:outline-none focus:ring-2 focus:ring-[#815e3a] focus:border-transparent transition-all"
            />
          </div>

          {/* Tag sub-filters */}
          {availableTags.length > 0 && (
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs text-[#815e3a] font-bold flex items-center space-x-1 flex-shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </span>
              
              <button
                onClick={() => setActiveTagFilter('')}
                className={`text-xs px-3 py-1.5 rounded-lg border font-bold flex-shrink-0 transition-colors ${
                  activeTagFilter === ''
                    ? 'bg-[#815e3a] text-white border-transparent'
                    : 'bg-white text-[#624326] border-[#eadecf] hover:bg-[#f6f2eb]'
                }`}
              >
                All Checks
              </button>

              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTagFilter(tag)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-bold flex-shrink-0 transition-colors ${
                    activeTagFilter === tag
                      ? 'bg-[#815e3a] text-white border-transparent'
                      : 'bg-white text-[#624326] border-[#eadecf] hover:bg-[#f6f2eb]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* --- MAIN CATEGORY TABS --- */}
        <div className="flex justify-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar border-b border-[#eadecf] mb-12">
          {menuCategories.map((cat) => {
            const Icon = Icons[cat.icon] || Icons.HelpCircle;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center space-x-2 px-5 py-4 font-bold border-b-2 text-sm tracking-wide transition-all select-none flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'border-[#543722] text-[#2a180b] opacity-100 font-extrabold'
                    : 'border-transparent text-[#9a764d] hover:text-[#2a180b] opacity-80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* --- MENU LISTINGS GRID --- */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onItemClick(item)}
                className="bg-white rounded-2xl overflow-hidden border border-[#eadecf] hover:border-[#bca47a] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
              >
                {/* Visual Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#eadecf]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#2a180b]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Floating price tag */}
                  <div className="absolute top-4 right-4 bg-[#2a180b] text-[#faf8f5] px-3.5 py-1.5 rounded-full font-extrabold text-sm shadow-md">
                    ₱{(item.price * 50).toFixed(0)}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded font-sans ${
                            tag === 'Best Seller'
                              ? 'bg-[#d97706]/15 text-[#d97706]'
                              : tag === 'Vegan Friendly' || tag === 'Vegan' || tag === 'Vegetarian Option'
                              ? 'bg-emerald-600/10 text-emerald-700'
                              : 'bg-[#543722]/10 text-[#543722]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-serif font-black text-[#2a180b] group-hover:text-[#815e3a] transition-colors line-clamp-1 py-1">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-[#624326] leading-relaxed line-clamp-3 font-semibold">
                      {item.description}
                    </p>
                  </div>

                  {/* Open Prompter */}
                  <div className="pt-4 border-t border-[#f5f0eb] mt-4 flex items-center justify-between text-xs text-[#815e3a] font-bold">
                    <span>Origin / Specifics</span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300 flex items-center space-x-1">
                      <span>View Customizations</span>
                      <Icons.ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#eadecf] p-8 max-w-md mx-auto">
            <div className="bg-[#f5f0eb] w-12 h-12 rounded-full flex items-center justify-center mx-auto text-[#815e3a] mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#2a180b] font-serif">No Menu Items Found</h4>
            <p className="text-xs sm:text-sm text-[#624326] mt-2 font-medium">
              We couldn't find matches for "{searchQuery}". Try modifying your keywords or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setActiveTagFilter('');
              }}
              className="mt-5 inline-flex items-center text-xs font-bold text-[#faf8f5] bg-[#543722] hover:bg-[#2a180b] px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
