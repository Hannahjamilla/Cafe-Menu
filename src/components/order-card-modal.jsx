import React, { useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';

export default function OrderCardModal({ isOpen, onClose, onBack, onDone, trayItems, customerName }) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const total = trayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = trayItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-stone-950/60 backdrop-blur-sm sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full sm:max-w-lg bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl border-t border-x sm:border border-stone-200/80 flex flex-col custom-modal-anim overflow-hidden"
        style={{ maxHeight: '92vh' }}
      >
        <style>{`
          @keyframes sheetSlideUp {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
          @keyframes modalScaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to   { transform: scale(1);    opacity: 1; }
          }
          .custom-modal-anim {
            animation: sheetSlideUp 0.38s cubic-bezier(0.32, 0.72, 0, 1);
          }
          @media (min-width: 640px) {
            .custom-modal-anim {
              animation: modalScaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
          }
        `}</style>

        {/* Pull bar */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-stone-300" />
        </div>

        {/* Compact Header — back + name + close */}
        <div className="px-5 pb-3 pt-1 flex items-center gap-3 shrink-0">
          {/* Back to tray button */}
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer shrink-0"
            title="Back to tray"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-grow min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">Order for</p>
            <h2 className="text-lg font-serif font-black text-stone-900 leading-tight truncate">
              {customerName.trim() || 'Guest'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── ORDER LIST (main focus) ── */}
        <div className="flex-1 overflow-y-auto px-5 py-3 bg-[#faf8f5] border-t border-stone-100">
          <span className="block text-[9px] font-black uppercase tracking-widest text-stone-400 mb-2">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>

          <div className="space-y-2">
            {trayItems.map((item) => {
              const optsArray = Object.values(item.customizations || {}).filter(v => v && v.trim() !== '');

              return (
                <div key={item.id} className="bg-white border border-stone-200/70 rounded-2xl p-3 flex gap-3 items-start shadow-sm">
                  {/* Big quantity */}
                  <div className="w-11 h-11 rounded-xl bg-[#3b1f0a] text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-[7px] font-black text-amber-400/80 uppercase tracking-widest leading-none">QTY</span>
                    <span className="text-lg font-black leading-none">{item.quantity}</span>
                  </div>

                  {/* Item name + customizations */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-serif font-black text-[15px] text-stone-900 leading-snug">
                      {item.name}
                    </h3>
                    {optsArray.length > 0 ? (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {optsArray.map((opt, i) => (
                          <span key={i} className="inline-flex items-center gap-0.5 bg-[#fdfaf5] border border-[#e8dcb9] text-[#8a532a] text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-md">
                            <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                            {opt}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[9px] font-semibold text-stone-400 mt-0.5">Standard</p>
                    )}
                  </div>

                  {/* Price */}
                  <span className="font-serif font-bold text-stone-400 text-sm shrink-0 pt-0.5">
                    P{(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FOOTER: Total + buttons ── */}
        <div className="shrink-0 border-t border-stone-200 bg-white px-5 pt-4 pb-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Total</span>
            <span className="text-2xl font-serif font-black text-stone-900">P{total.toFixed(0)}</span>
          </div>

          <div className="flex gap-2.5">
            {/* Back to add more */}
            <button
              onClick={onBack}
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-[10px] uppercase tracking-widest py-3.5 rounded-2xl transition-all active:scale-[0.98] cursor-pointer text-center"
            >
              Add More
            </button>

            {/* Finalize */}
            <button
              onClick={onDone || onClose}
              className="flex-[2] bg-[#3b1f0a] hover:bg-[#5c3317] text-white font-black text-[11px] uppercase tracking-widest py-3.5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-amber-900/10 cursor-pointer text-center"
            >
              Done — Waiting for Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
