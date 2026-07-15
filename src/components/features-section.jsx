import React from 'react';
import * as Icons from 'lucide-react';
import { cafeFeatures, additionalServices } from '../data/menu-data';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#f5f0eb]/40 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#815e3a] uppercase font-sans">
            Tailored Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2a180b] font-bold mt-2 leading-tight">
            Curated Zones For Your Flow
          </h2>
          <p className="text-[#624326] mt-4 font-semibold text-sm sm:text-base">
            No matter your objective—cramming for an exam, holding a pitch meeting, or unwinding with board games—our café is split into tailored, sound-isolated zones.
          </p>
          <div className="w-16 h-[3px] bg-[#bca47a] mx-auto mt-4 rounded-full" />
        </div>

        {/* 6 Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {cafeFeatures.map((feat) => {
            // Dynamic Icon resolve
            const IconComponent = Icons[feat.icon] || Icons.HelpCircle;
            return (
              <div
                key={feat.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#eadecf] hover:border-[#bca47a] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1.5"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a180b]/50 to-transparent" />
                  
                  {/* Icon Overlay Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 text-[#543722] p-2.5 rounded-2xl shadow-md border border-[#ebdcc8]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-serif text-[#2a180b] group-hover:text-[#815e3a] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#624326] leading-relaxed font-semibold">
                      {feat.description}
                    </p>
                  </div>
                  
                  {/* Micro action prompt */}
                  <div className="pt-4 border-t border-[#f5f0eb] mt-4 flex items-center justify-between text-xs text-[#815e3a] font-bold">
                    <span>Zone Access Block</span>
                    <span className="bg-[#bca47a]/20 px-2 py-0.5 rounded text-[10px] uppercase">Complimentary</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Services Headline */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-[#815e3a] font-bold font-serif italic text-lg block">
            The HanMade Standard
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#2a180b] font-extrabold mt-1">
            Everyday Productivity Amenities
          </h3>
          <div className="w-10 h-0.5 bg-[#bca47a] mx-auto mt-2" />
        </div>

        {/* Additional Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalServices.map((service, idx) => {
            const Icon = Icons[service.icon] || Icons.Plus;
            return (
              <div
                key={idx}
                className="bg-white/80 p-5 rounded-2xl border border-[#eadecf]/65 flex items-start space-x-4 shadow-[0_4px_12px_rgba(234,222,207,0.15)] hover:bg-[#faf8f5] transition-colors duration-300"
              >
                <div className="bg-[#543722]/10 p-2.5 rounded-xl text-[#543722] flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2a180b] text-base">
                    {service.title}
                  </h4>
                  <p className="text-xs text-[#624326] mt-1 leading-relaxed font-semibold">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
