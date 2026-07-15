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
    <section id="menu" className="py-32 bg-[#faf8f5] scroll-mt-16">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-[#815e3a] uppercase font-sans">
            Crafted Daily • Fresh Local Ingredients
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2a180b] font-bold mt-3 leading-tight">
            Our Artisan Menu Collection
          </h2>
          <p className="text-[#624326] mt-5 font-semibold text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Every coffee shot is weighed and extracted to perfection. All dishes feature seasonal local ingredients sourced from trusted farms. Our pastries are baked fresh every morning using premium ingredients.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-5">
            <div className="w-12 h-[3px] bg-[#bca47a] rounded-full" />
            <div className="w-3 h-3 rounded-full bg-[#815e3a]" />
            <div className="w-12 h-[3px] bg-[#bca47a] rounded-full" />
          </div>
        </div>

        {/* --- Spotlight: Best Sellers (Horizontal scroll / quick view) --- */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-[#815e3a] animate-pulse" />
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2a180b] font-bold">
                Guest Favorites
              </h3>
              <span className="text-xs bg-gradient-to-r from-[#815e3a] to-[#bca47a] text-white font-bold px-3 py-1 rounded-full font-sans uppercase tracking-wider">
                Most Ordered
              </span>
            </div>
            <div className="hidden md:flex items-center text-xs text-[#9a764d] font-medium">
              <span>Scroll for more →</span>
            </div>
          </div>
          
          <div className="flex space-x-8 overflow-x-auto pb-8 scroll-smooth no-scrollbar snap-x">
            {bestSellers.map((item) => (
              <div
                key={`best-${item.id}`}
                onClick={() => onItemClick(item)}
                className="flex-shrink-0 w-[420px] bg-white rounded-3xl border border-[#eadecf] hover:border-[#bca47a] p-6 flex space-x-6 cursor-pointer hover:shadow-2xl transition-all duration-300 snap-start transform hover:-translate-y-2 group"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-2xl border border-[#eadecf] flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-[#815e3a] text-white text-xs font-bold px-2 py-1 rounded-full">
                    #1
                  </div>
                </div>
                <div className="flex flex-col justify-between overflow-hidden flex-1">
                  <div>
                    <h4 className="font-extrabold text-[#2a180b] text-lg font-serif leading-tight mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[#624326] line-clamp-2 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <span className="text-2xl text-[#815e3a] font-bold">
                        ₱{item.price}
                      </span>
                      <span className="text-xs text-[#9a764d] block">per serving</span>
                    </div>
                    <button className="text-xs bg-[#543722] hover:bg-[#2a180b] text-white px-3 py-2 rounded-lg font-bold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- INTERACTIVE CONTROLS BAR --- */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#eadecf] rounded-3xl p-8 sm:p-10 mb-16 shadow-lg flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-8 lg:space-y-0 lg:space-x-10">
          
          {/* Real-time search */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#bca47a]">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search menu items, ingredients, or dietary preferences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-[#eadecf] pl-12 pr-4 py-3.5 rounded-2xl text-sm font-semibold text-[#2a180b] placeholder-[#bca47a] focus:outline-none focus:ring-2 focus:ring-[#815e3a] focus:border-[#815e3a] transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9a764d] hover:text-[#815e3a]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Enhanced tag filters */}
          {availableTags.length > 0 && (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#815e3a]" />
                <span className="text-sm text-[#815e3a] font-bold">Quick Filters:</span>
              </div>
              
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => setActiveTagFilter('')}
                  className={`text-xs px-4 py-2 rounded-xl border-2 font-bold flex-shrink-0 transition-all ${
                    activeTagFilter === ''
                      ? 'bg-[#815e3a] text-white border-[#815e3a] shadow-md'
                      : 'bg-white text-[#624326] border-[#eadecf] hover:bg-[#f6f2eb] hover:border-[#bca47a]'
                  }`}
                >
                  All Items
                </button>

                {availableTags.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTagFilter(tag)}
                    className={`text-xs px-4 py-2 rounded-xl border-2 font-bold flex-shrink-0 transition-all ${
                      activeTagFilter === tag
                        ? 'bg-[#815e3a] text-white border-[#815e3a] shadow-md'
                        : 'bg-white text-[#624326] border-[#eadecf] hover:bg-[#f6f2eb] hover:border-[#bca47a]'
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
        <div className="flex justify-center space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar border-b border-[#eadecf] mb-16">
          {menuCategories.map((cat) => {
            const Icon = Icons[cat.icon] || Icons.HelpCircle;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center space-x-2 px-6 py-5 font-bold border-b-2 text-sm tracking-wide transition-all select-none flex-shrink-0 ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onItemClick(item)}
                className="bg-white rounded-3xl overflow-hidden border-2 border-[#eadecf] hover:border-[#bca47a] hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full transform hover:-translate-y-2"
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
                  <div className="absolute top-4 right-4 bg-[#2a180b] text-[#faf8f5] px-4 py-2 rounded-2xl font-extrabold text-base shadow-xl backdrop-blur-sm">
                    ₱{item.price}
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#815e3a] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {menuCategories.find(cat => cat.id === item.category)?.name.split(' ')[0] || 'Special'}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full font-sans ${
                            tag === 'Best Seller'
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                              : tag === 'Vegan Friendly' || tag === 'Vegan' || tag === 'Vegetarian Option'
                              ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                              : tag === 'Trending'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-[#543722]/15 text-[#543722]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 2 && (
                        <span className="text-[10px] text-[#9a764d] font-medium">
                          +{item.tags.length - 2} more
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-serif font-black text-[#2a180b] group-hover:text-[#815e3a] transition-colors line-clamp-2 leading-tight">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-[#624326] leading-relaxed line-clamp-3 font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Open Prompter */}
                  <div className="pt-5 border-t border-[#f5f0eb] mt-5 flex items-center justify-between">
                    <div className="text-xs text-[#815e3a] font-bold">
                      <span className="block">Nutrition & Origin</span>
                      <span className="text-[#9a764d] font-medium">Tap for details</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#815e3a] group-hover:translate-x-1 transition-transform duration-300">
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
