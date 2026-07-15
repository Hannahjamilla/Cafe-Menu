import React, { useState } from 'react';
import { Compass, BookOpen, Heart, Shield, Sparkles, MapPin } from 'lucide-react';

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: 'Our Concept',
      subtitle: 'The Third Place for Modern Minds',
      description: 'HanMade Café was born from a simple observation: students and professionals need more than just caffeine to thrive—they need spaces designed around their workflows. We have engineered the ultimate ecosystem that seamlessly marries a top-tier craft coffee bar with professional work modules.',
      bullets: [
        'Specifically divided zones (high-focus versus collaboration)',
        'Full service workspace equipment available to borrow',
        'Direct partnerships with local roasters & organic dairy farms'
      ],
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Ambiance Design',
      subtitle: 'Biophilic Design Meets Sensory Serenity',
      description: 'Cognitive scientists agree that your physical environment dictates your output. Our setup is visually tuned with neutral earth tones, calming plants that improve air purity, micro-sound panels, and high-frequency LED light temperature controls that change to fit the daylight.',
      bullets: [
        'Ergonomic seating with full lumbar backing support',
        'Noise-damped acoustics keeping sound levels below 45dB in study study rooms',
        'Invigorating notes of custom-crafted cedar wood oils'
      ],
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Customer Experience',
      subtitle: 'Hospitality That Empowers Your Day',
      description: 'We treat coffee as a craft and space as a service. That means zero friction. Find a desk, hook up to superfast WiFi with single-tap authentication, and let us do the rest. Our barista guides are constantly sanitizing tables and helping you track down focus equipment.',
      bullets: [
        'Friendly staff trained in both coffee pulling & workspace management',
        'Bottomless drip refill bar to keep the ideas flowing',
        'Keypad secured item lockers so you can stretch your legs worry-free'
      ],
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <section id="experience" className="py-24 bg-white relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#815e3a] uppercase font-sans">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2a180b] font-bold mt-2 leading-tight">
            Crafting the perfect balance of flavor & focus.
          </h2>
          <div className="w-16 h-[3px] bg-[#bca47a] mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Selector Tabs */}
        <div className="flex justify-center space-x-2 md:space-x-4 mb-12 p-1.5 bg-[#f5f0eb] rounded-xl max-w-lg mx-auto border border-[#eadecf]">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 md:px-5 rounded-lg text-xs md:text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeTab === idx
                    ? 'bg-[#543722] text-[#faf8f5] shadow-md'
                    : 'text-[#624326] hover:text-[#2a180b] hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{pillar.title}</span>
                <span className="sm:hidden">{pillar.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="transition-all duration-500 transform">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Side */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#eadecf]">
                <img
                  src={pillars[activeTab].image}
                  alt={pillars[activeTab].title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#2a180b]/10" />
              </div>
              
              {/* Decorative Accent */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#dec5a4]/40 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#ebdcc8]/50 rounded-full blur-2xl -z-10" />
            </div>

            {/* Right Text Side */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#bca47a]/15 text-[#815e3a] px-3 py-1 rounded-full text-xs font-bold font-sans">
                <Sparkles className="w-3 h-3 text-[#9a764d]" />
                <span>{pillars[activeTab].title} Highlights</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2a180b] font-extrabold leading-tight">
                {pillars[activeTab].subtitle}
              </h3>
              
              <p className="text-[#624326] leading-relaxed text-sm sm:text-base font-medium">
                {pillars[activeTab].description}
              </p>

              {/* Bullet points structure */}
              <ul className="space-y-3 pt-2">
                {pillars[activeTab].bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start space-x-3 text-sm text-[#2a180b] font-medium">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#eadecf] text-[#815e3a] flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
