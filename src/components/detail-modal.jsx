import React, { useState, useEffect } from 'react';
import { X, Coffee, Info, AlertCircle, Sparkles } from 'lucide-react';

export default function DetailModal({ item, onClose }) {
  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMilk, setSelectedMilk] = useState('');
  const [selectedSweetness, setSelectedSweetness] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedProtein, setSelectedProtein] = useState('');
  const [selectedToppings, setSelectedToppings] = useState('');

  useEffect(() => {
    if (item.customizations) {
      setSelectedSize(item.customizations.sizes?.[0] ?? '');
      setSelectedMilk(item.customizations.milkOptions?.[0] ?? '');
      setSelectedSweetness(item.customizations.sweetness?.[0] ?? '');
      setSelectedService(item.customizations.service?.[0] ?? '');
      setSelectedProtein(item.customizations.proteinAdding?.[0] ?? '');
      setSelectedToppings(item.customizations.toppings?.[0] ?? '');
    }
  }, [item]);

  const finalPrice = React.useMemo(() => {
    let basePrice = item.price * 55; // Sized relative scale for PHP
    if (selectedSize?.includes('Large')) basePrice += 40;
    
    const getOptionPremium = (optionStr) => {
      if (!optionStr || !optionStr.includes('(+₱')) return 0;
      const match = optionStr.match(/\(\+₱([\d\.]+)\)/);
      return match ? parseFloat(match[1]) : 0;
    };

    basePrice += getOptionPremium(selectedMilk);
    basePrice += getOptionPremium(selectedToppings);
    basePrice += getOptionPremium(selectedProtein);
    return basePrice;
  }, [item.price, selectedSize, selectedMilk, selectedToppings, selectedProtein]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Shared button style helpers */
  const btnBase = 'text-xs font-bold rounded-xl border-2 py-2 px-3 transition-all duration-150';
  const btnOn  = 'bg-amber-500 text-white border-amber-500 shadow';
  const btnOff = 'bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <div className="bg-[#fdf8f0] rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col md:flex-row">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors shadow border border-stone-100"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── LEFT: Image + info ── */}
        <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col gap-5 border-b md:border-b-0 md:border-r border-stone-100 bg-white rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-100">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
              {item.tags.map(tag => (
                <span key={tag} className={`text-[8px] uppercase font-extrabold tracking-wide px-2 py-0.5 rounded-full shadow-sm border ${tag === 'Best Seller' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-stone-600 border-stone-100'}`}>
                  {tag === 'Best Seller' && <Sparkles className="inline w-2 h-2 mr-0.5" />}{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Name + description */}
          <div className="space-y-1.5">
            <h2 className="text-2xl font-serif font-black text-stone-800">{item.name}</h2>
            <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
          </div>

          {/* Origin */}
          {item.origin && (
            <div className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-2xl p-3.5">
              <Coffee className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-600 block">Where it comes from</span>
                <p className="text-xs font-semibold text-stone-700 leading-relaxed">{item.origin}</p>
              </div>
            </div>
          )}

          {/* Nutrition */}
          {item.nutrition && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Info className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Nutrition (Estimated)</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'Calories', value: item.nutrition.calories },
                  { label: 'Protein',  value: item.nutrition.protein },
                  { label: 'Carbs',    value: item.nutrition.carbs },
                  { label: 'Fat',      value: item.nutrition.fat },
                ].map(n => (
                  <div key={n.label} className="bg-stone-50 border border-stone-100 rounded-xl p-2">
                    <span className="block text-[8px] text-stone-400 font-bold uppercase">{n.label}</span>
                    <span className="font-serif font-black text-xs text-stone-700">{n.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Customizer ── */}
        <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-600 block mb-1">Customise Your Order</span>
              <h3 className="text-xl font-serif font-black text-stone-800">How would you like it?</h3>
            </div>

            {item.customizations ? (
              <div className="space-y-4">

                {/* Size */}
                {item.customizations.sizes && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block">Size</label>
                    <div className="flex gap-2">
                      {item.customizations.sizes.map(s => (
                        <button key={s} onClick={() => setSelectedSize(s)} className={`${btnBase} flex-1 ${selectedSize === s ? btnOn : btnOff}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milk */}
                {item.customizations.milkOptions && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block">Milk Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {item.customizations.milkOptions.map(m => (
                        <button key={m} onClick={() => setSelectedMilk(m)} className={`${btnBase} ${selectedMilk === m ? btnOn : btnOff}`}>{m}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sweetness */}
                {item.customizations.sweetness && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block">Sweetness</label>
                    <div className="flex flex-wrap gap-2">
                      {item.customizations.sweetness.map(s => (
                        <button key={s} onClick={() => setSelectedSweetness(s)} className={`${btnBase} ${selectedSweetness === s ? btnOn : btnOff}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Serve temp */}
                {item.customizations.service && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block">Serve As</label>
                    <div className="flex gap-2">
                      {item.customizations.service.map(s => (
                        <button key={s} onClick={() => setSelectedService(s)} className={`${btnBase} flex-1 ${selectedService === s ? btnOn : btnOff}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Protein */}
                {item.customizations.proteinAdding && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block">Add-ons</label>
                    <div className="space-y-1.5">
                      {item.customizations.proteinAdding.map(p => (
                        <button key={p} onClick={() => setSelectedProtein(p)} className={`${btnBase} w-full flex justify-between ${selectedProtein === p ? btnOn : btnOff}`}>
                          <span>{p.split(' (+')[0]}</span>
                          {p.includes('(+') && <span className={`font-extrabold ${selectedProtein === p ? 'text-white/80' : 'text-amber-600'}`}>+₱{p.split('(+₱')[1]?.replace(')', '')}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Toppings */}
                {item.customizations.toppings && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block">Toppings</label>
                    <div className="space-y-1.5">
                      {item.customizations.toppings.map(t => (
                        <button key={t} onClick={() => setSelectedToppings(t)} className={`${btnBase} w-full flex justify-between ${selectedToppings === t ? btnOn : btnOff}`}>
                          <span>{t.split(' (+')[0]}</span>
                          {t.includes('(+') && <span className={`font-extrabold ${selectedToppings === t ? 'text-white/80' : 'text-amber-600'}`}>+₱{t.split('(+₱')[1]?.replace(')', '')}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-8 text-sm text-stone-400 font-semibold bg-stone-50 rounded-2xl border border-stone-100">
                Served in the standard recipe — no changes needed!
              </div>
            )}

            {/* Notice */}
            <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-100 rounded-2xl p-3.5">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-stone-500 leading-relaxed font-semibold">
                <span className="font-extrabold text-amber-700 block mb-0.5">Display only!</span>
                This is an interactive menu card. Please order at the front counter.
              </p>
            </div>
          </div>

          {/* Price row */}
          <div className="border-t border-stone-100 pt-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block">Estimated Price</span>
              <span className="text-3xl font-serif font-black text-amber-600">₱{finalPrice.toFixed(0)}</span>
            </div>
            <button onClick={onClose} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors shadow-md">
              Got it!
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
