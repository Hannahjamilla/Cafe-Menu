import React, { useEffect } from 'react';
import { X, Coffee, Leaf, ClipboardCheck } from 'lucide-react';

export default function OrderCardModal({ isOpen, onClose, onDone, trayItems, customerName }) {

  // Lock body scroll when open
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
    /* Backdrop — click outside closes */
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-stone-950/60 backdrop-blur-sm sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Premium ticket-styled modal */}
      <div
        className="relative w-full sm:max-w-xl md:max-w-2xl bg-[#faf8f5] rounded-t-[36px] sm:rounded-[36px] shadow-2xl border-t border-x sm:border border-stone-200/80 flex flex-col custom-modal-anim overflow-hidden"
        style={{
          maxHeight: '92vh',
        }}
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

        {/* Top visual tab/pull bar */}
        <div className="flex justify-center pt-3 pb-1 shrink-0 bg-white">
          <div className="w-10 h-1.5 rounded-full bg-stone-300" />
        </div>

        {/* ── TICKET HEADER ── */}
        <div className="bg-white px-6 pb-4 pt-2 border-b border-stone-150 shrink-0 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Coffee className="w-4.5 h-4.5 text-amber-800 animate-pulse" />
              </div>
              <div>
                <span className="block text-[8px] font-black uppercase tracking-[0.25em] text-[#a26a42]">Brows&Beyond</span>
                <span className="block text-xs font-bold text-stone-400">Order Checklist</span>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large prominent customer label for Barista */}
          <div className="mt-4 bg-[#fbf5eb] border-2 border-[#e8dcb9] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-inner">
            <div>
              <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-[#8a532a]">Customer Name:</span>
              <h2 className="text-2xl sm:text-3.5xl font-serif font-black text-stone-900 leading-none mt-1 break-words">
                {customerName.trim() || 'My Order'}
              </h2>
            </div>
            <div className="shrink-0 bg-amber-500 text-stone-950 font-black text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm w-fit">
              <ClipboardCheck className="w-3.5 h-3.5 animate-bounce" /> Barista Check
            </div>
          </div>

          {/* Friendly note to show barista */}
          <div className="mt-3 text-center text-[10.5px] sm:text-xs font-bold text-[#8a532a] bg-amber-50 rounded-xl py-2.5 px-3.5 border border-amber-200/50 flex items-center justify-center gap-1.5 shadow-sm">
            <span>✨ Please show this screen to our friendly barista at the counter! ✨</span>
          </div>
        </div>

        {/* ── TICKET BODY (Items Checklist) ── */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#faf8f5]">
          <span className="block text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">
            Checklist Items ({itemCount})
          </span>

          {trayItems.map((item, idx) => {
            const optsArray = Object.values(item.customizations || {}).filter(v => v && v.trim() !== '');

            return (
              <div key={item.id} className="relative bg-white border border-stone-200/70 p-4 rounded-2xl flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                
                {/* Visual order card number / checkbox mock */}
                <div className="flex flex-col items-center gap-1.5 shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 text-amber-900 font-extrabold text-[12px] flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>

                {/* Main Item details */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {/* Big clear name for barista */}
                      <p className="font-serif font-black text-stone-900 text-base leading-snug">
                        {item.name}
                      </p>
                      
                      {/* Big bold quantity for barista */}
                      <div className="mt-1 inline-flex items-center gap-1 bg-stone-100 text-stone-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border border-stone-250">
                        Qty: <span className="text-xs text-amber-700 font-black">{item.quantity}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-serif font-black text-stone-600 text-sm">
                        ₱{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Explicit Customization Badges */}
                  {optsArray.length > 0 ? (
                    <div className="mt-3 bg-[#faf8f5] p-2.5 rounded-xl border border-stone-150">
                      <span className="block text-[7.5px] font-black uppercase tracking-wider text-[#a26a42] mb-1.5">
                        Barista Customizations:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {optsArray.map((opt, i) => (
                          <span key={i} className="inline-flex items-center gap-1 bg-white border border-[#e8dcb9] text-[#8a532a] text-[9.5px] font-extrabold uppercase px-2.5 py-1 rounded-lg shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-[9px] font-bold text-stone-400 italic">
                      Standard Recipe (No Customizations)
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── TICKET FOOTER ── */}
        <div className="shrink-0 border-t-2 border-dashed border-stone-200 bg-white px-6 pt-5 pb-6 space-y-4 relative">
          
          {/* Aesthetic tear paper notches */}
          <div className="absolute -top-[6px] left-0 right-0 flex justify-between px-3 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-[#faf8f5] -mt-[3px] shrink-0" />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8.5px] uppercase tracking-widest font-black text-stone-400">Total Price</p>
              <p className="text-3xl font-serif font-black text-amber-600 leading-tight">₱{total.toFixed(0)}</p>
            </div>
            <div className="text-right">
              <p className="text-[8.5px] uppercase tracking-widest font-black text-stone-400">Total Items</p>
              <p className="text-2.5xl font-serif font-black text-stone-700">{itemCount}</p>
            </div>
          </div>

          {/* Done - Waiting button */}
          <button
            onClick={onDone || onClose}
            className="w-full bg-[#3b1f0a] hover:bg-[#5c3317] text-white font-black text-[11px] uppercase tracking-widest py-4.5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-amber-900/10 cursor-pointer text-center"
          >
            Done — Waiting for Order!
          </button>
        </div>
      </div>
    </div>
  );
}
