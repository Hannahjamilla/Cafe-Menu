import React from 'react';
import { Coffee, Users, Laptop, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function FloorPlanMap({ activeZone, onSelectZone }) {
  const zones = [
    {
      id: 'brew-bar',
      num: '01',
      title: 'Artisan Brew Bar',
      subtitle: 'Order espressos, teas & cold drinks here',
      badge: 'Order Counter',
      linkTarget: 'coffee',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800',
      tag: 'Drinks & Coffee',
      color: 'bg-amber-50 border-amber-200',
      dot: 'bg-amber-400',
    },
    {
      id: 'focus-study',
      num: '02',
      title: 'Quiet Study Zone',
      subtitle: 'Single desks with power outlets & privacy dividers',
      badge: 'Quiet Zone',
      linkTarget: 'study-space',
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      tag: 'Private Desks',
      color: 'bg-sky-50 border-sky-200',
      dot: 'bg-sky-400',
    },
    {
      id: 'bakery-station',
      num: '03',
      title: 'Bakery & Kitchen',
      subtitle: 'Warm pastries, paninis & all-day plates',
      badge: 'Kitchen Station',
      linkTarget: 'pastries',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
      tag: 'Pastry & Meals',
      color: 'bg-rose-50 border-rose-200',
      dot: 'bg-rose-400',
    },
    {
      id: 'business-pods',
      num: '04',
      title: 'Work & Meeting Pods',
      subtitle: 'Whiteboards, fast Wi-Fi & projection screens',
      badge: 'Meeting Room',
      linkTarget: 'business-space',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800',
      tag: 'Collaborative',
      color: 'bg-violet-50 border-violet-200',
      dot: 'bg-violet-400',
    },
    {
      id: 'recreation-lounge',
      num: '05',
      title: 'Games & Rest Lounge',
      subtitle: 'Bean bags, board games & comic books',
      badge: 'Chill Zone',
      linkTarget: 'recreation-space',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
      tag: 'Relax & Play',
      color: 'bg-emerald-50 border-emerald-200',
      dot: 'bg-emerald-400',
    },
  ];

  return (
    <div className="space-y-8">

      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#a26a42] font-black">Cozy Corners · Brows&amp;Beyond</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 leading-tight">
            Find Your Spot
          </h2>
          <p className="text-xs text-stone-400 font-semibold max-w-sm leading-relaxed">
            Five unique zones inside the café. Click any to explore what's there.
          </p>
        </div>
        <span className="text-[10px] text-stone-350 font-bold uppercase tracking-widest self-start sm:self-end">
          {zones.length} Zones Available
        </span>
      </div>

      {/* ─── Alternating Row Layout ─── */}
      <div className="space-y-4">
        {zones.map((zone, idx) => {
          const Icon = zone.icon;
          const isActive = activeZone === zone.id;
          const imageLeft = idx % 2 === 0;

          return (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone)}
              className={`group w-full text-left flex ${imageLeft ? 'flex-row' : 'flex-row-reverse'} rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'border-stone-900 shadow-lg scale-[1.005]'
                  : 'border-stone-150 bg-white hover:border-stone-300 hover:shadow-md hover:scale-[1.005]'
              }`}
            >
              {/* ── Image Side ── */}
              <div className="relative w-2/5 sm:w-1/3 shrink-0 overflow-hidden">
                <img
                  src={zone.image}
                  alt={zone.title}
                  className="w-full h-full object-cover min-h-[140px] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-stone-900/20" />
                )}
              </div>

              {/* ── Content Side ── */}
              <div className={`flex-1 p-5 sm:p-6 flex flex-col justify-between bg-white ${isActive ? 'bg-stone-50' : ''}`}>
                <div className="space-y-2">
                  {/* Number + Badge row */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-black text-stone-200 text-3xl leading-none select-none">
                      {zone.num}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isActive && (
                        <span className="flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full ${zone.dot} opacity-75`} />
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${zone.dot}`} />
                        </span>
                      )}
                      <span className={`text-[8.5px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${zone.color}`}>
                        {zone.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title + subtitle */}
                  <div>
                    <h3 className={`font-serif font-black text-base sm:text-lg leading-snug transition-colors ${isActive ? 'text-stone-900' : 'text-stone-900 group-hover:text-[#a26a42]'}`}>
                      {zone.title}
                    </h3>
                    <p className="text-[11px] text-stone-400 font-semibold leading-relaxed mt-1 line-clamp-2">
                      {zone.subtitle}
                    </p>
                  </div>
                </div>

                {/* Footer tag + arrow */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-stone-350" />
                    <span className="text-[9.5px] uppercase tracking-widest font-black text-stone-350">{zone.tag}</span>
                  </div>
                  <span className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-wider transition-colors ${isActive ? 'text-stone-900' : 'text-stone-300 group-hover:text-[#a26a42]'}`}>
                    Enter Zone <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>

            </button>
          );
        })}
      </div>

      {/* ─── Footer Tip ─── */}
      <div className="flex items-center gap-3 bg-stone-50 border border-stone-100 rounded-2xl p-4">
        <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
          <Coffee className="w-4 h-4 text-amber-700" />
        </div>
        <p className="text-[11px] text-stone-500 leading-relaxed font-semibold">
          <span className="font-extrabold text-stone-700">All zones are free</span> — just place an order and pick your favorite corner. No reservations needed!
        </p>
      </div>

    </div>
  );
}
