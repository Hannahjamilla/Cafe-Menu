import React from 'react';
import { Sparkles, BookOpen, Users, Heart, Star, MapPin } from 'lucide-react';
import { cafeFeatures } from '../data/menu-data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 bg-gradient-to-b from-[#faf8f5] to-white scroll-mt-16">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-[#815e3a] uppercase font-sans mb-4 block">
            The Experience
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#2a180b] font-bold leading-tight mb-6">
            More Than Just Coffee
          </h2>
          <p className="text-[#624326] text-lg font-medium leading-relaxed max-w-3xl mx-auto">
            We've designed every corner of our space to enhance your productivity and comfort. 
            From quiet study nooks to collaborative work areas, find your perfect spot.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-8">
            <div className="w-16 h-[3px] bg-[#bca47a] rounded-full" />
            <div className="w-4 h-4 rounded-full bg-[#815e3a]" />
            <div className="w-16 h-[3px] bg-[#bca47a] rounded-full" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cafeFeatures.map((feature, index) => (
            <div 
              key={feature.id}
              className="group bg-white/80 backdrop-blur-sm border border-[#eadecf] rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a180b]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#815e3a] to-[#bca47a] rounded-2xl flex items-center justify-center">
                    {feature.icon === 'Compass' && <MapPin className="w-6 h-6 text-white" />}
                    {feature.icon === 'GraduationCap' && <BookOpen className="w-6 h-6 text-white" />}
                    {feature.icon === 'Wallet' && <Heart className="w-6 h-6 text-white" />}
                    {feature.icon === 'BookOpen' && <BookOpen className="w-6 h-6 text-white" />}
                    {feature.icon === 'Users' && <Users className="w-6 h-6 text-white" />}
                    {feature.icon === 'Sparkles' && <Sparkles className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#2a180b] group-hover:text-[#815e3a] transition-colors">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-[#624326] leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-2 bg-[#815e3a] text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <Star className="w-5 h-5" />
            <span className="font-bold text-sm uppercase tracking-wider">Visit Us Today</span>
          </div>
        </div>
        
      </div>
    </section>
  );
}