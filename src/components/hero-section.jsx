import React from 'react';
import { Coffee, ArrowRight, Sparkles, BookOpen, Clock } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24 bg-gradient-to-b from-[#f5f0eb] via-[#faf8f5] to-[#faf8f5]">
      {/* Background Graphic Blobs / Circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[#ebdcc8]/40 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[55%] rounded-full bg-[#dec5a4]/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Left Box */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fade-in">
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-[#bca47a]/20 border border-[#bca47a]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#815e3a] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#9a764d]" />
              <span>A Workspace Reimagined</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#2a180b] leading-[1.1] tracking-tight">
              Where artisan <span className="text-[#815e3a] font-normal italic relative inline-block">
                coffee
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#dec5a4] -z-10 rounded-full" />
              </span> meets ultimate focus.
            </h1>

            {/* Description */}
            <p className="text-[#624326] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Welcome to <span className="font-bold text-[#2a180b]">HanMade Café & Space</span>. We blend premium specialty brews with curated layouts tailored for your focus: quiet modules for studying, boardrooms for business, and social areas for recreation. 
            </p>

            {/* Quick Benefits Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-4">
              <div className="flex flex-col items-center lg:items-start p-3 bg-white/70 border border-[#eadecf] rounded-2xl shadow-sm">
                <Coffee className="w-5 h-5 text-[#815e3a] mb-1.5" />
                <span className="text-xs font-bold text-[#2a180b]">Unlimited Refills</span>
                <span className="text-[10px] text-[#9a764d]">On basic batch brew</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-3 bg-white/70 border border-[#eadecf] rounded-2xl shadow-sm">
                <BookOpen className="w-5 h-5 text-[#815e3a] mb-1.5" />
                <span className="text-xs font-bold text-[#2a180b]">High-Speed WiFi</span>
                <span className="text-[10px] text-[#9a764d]">Giga Fiber Mesh</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-3 bg-white/70 border border-[#eadecf] rounded-2xl shadow-sm">
                <Clock className="w-5 h-5 text-[#815e3a] mb-1.5" />
                <span className="text-xs font-bold text-[#2a180b]">Open Extended</span>
                <span className="text-[10px] text-[#9a764d]">7:00 AM - 11:00 PM</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start pt-6">
              <a
                href="#menu"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-transparent text-sm font-semibold rounded-xl text-[#faf8f5] bg-[#543722] hover:bg-[#2a180b] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#experience"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-[#eadecf] bg-white text-sm font-semibold rounded-xl text-[#543722] hover:bg-[#f6f2eb] hover:border-[#bca47a] transition-all duration-300 shadow-sm"
              >
                Learn Our Concept
              </a>
            </div>
          </div>

          {/* Right Image/Graphic Box */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Visual Frame */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-[#ebdcc8]">
              {/* Coffee shop mood photo */}
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=650"
                alt="Aesthetic HanMade Cafe Workspace"
                className="w-full h-full object-cover select-none"
              />
              
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a180b]/70 via-[#2a180b]/10 to-transparent" />
              
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 glass p-5 rounded-2xl border border-white/40 shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[#2a180b] font-serif text-lg font-bold">Featured Blend</h3>
                    <p className="text-xs text-[#815e3a] font-bold">Guatemala Huehuetenango</p>
                  </div>
                  <div className="bg-[#543722] text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest">
                    Artisan
                  </div>
                </div>
                <p className="text-xs text-[#624326] mt-2 font-medium">
                  Notes of dark cocoa, dried cherries elderflower, and velvety smooth body. Pulled fresh hourly.
                </p>
              </div>
            </div>

            {/* Decorative Floating Card */}
            <div className="absolute -top-6 -right-4 bg-white p-3.5 rounded-2xl shadow-xl border border-[#eadecf] hidden sm:flex items-center space-x-3 transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#bca47a]/20 p-2 rounded-lg text-[#815e3a]">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-[#815e3a] tracking-wider">Perfect Roast</p>
                <p className="text-xs font-extrabold text-[#2a180b]">100% Arabica Beans</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 bg-[#2a180b] p-3.5 rounded-2xl shadow-xl border border-[#4a301a] hidden sm:flex items-center space-x-3 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white/10 p-2 rounded-lg text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-[#dec5a4] tracking-wider">Study Ready</p>
                <p className="text-xs font-extrabold text-white">AC Outlets at Every Seat</p>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
