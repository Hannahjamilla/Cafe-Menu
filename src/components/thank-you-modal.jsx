import React, { useEffect } from 'react';
import { CheckCircle2, Heart } from 'lucide-react';

export default function ThankYouModal({ isOpen, onClose, customerName, orderItems = [] }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = orderItems.reduce((s, i) => s + i.quantity, 0);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-stone-950/70 backdrop-blur-md p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full sm:max-w-md bg-white rounded-[28px] shadow-2xl flex flex-col custom-modal-anim overflow-hidden"
        style={{ maxHeight: '92vh' }}
      >
        <style>{`
          @keyframes modalScaleIn {
            from { transform: scale(0.92); opacity: 0; }
            to   { transform: scale(1);    opacity: 1; }
          }
          .custom-modal-anim {
            animation: modalScaleIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        `}</style>

        {/* ── TOP: Success + Big Amount ── */}
        <div className="px-6 pt-8 pb-6 text-center bg-gradient-to-b from-emerald-50 to-white">
          {/* Checkmark */}
          <div className="relative mb-4 inline-block">
            <div className="absolute inset-0 rounded-full bg-emerald-100/50 animate-ping scale-125" style={{ animationDuration: '2.5s' }} />
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full border border-emerald-300 flex items-center justify-center relative z-10 shadow-sm mx-auto">
              <CheckCircle2 className="w-9 h-9 text-emerald-600" />
            </div>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-700 mb-1">
            Order Placed Successfully
          </p>

          {/* Big total amount */}
          <h2 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-none mt-3">
            P{total.toFixed(2)}
          </h2>
          <p className="text-[10px] font-semibold text-stone-400 mt-1.5 uppercase tracking-widest">
            Total Amount
          </p>
        </div>

        {/* ── BODY: Details ── */}
        <div className="flex-1 overflow-y-auto px-6 pb-5">

          {/* Detail Rows (GCash-style key-value pairs) */}
          <div className="border-t border-stone-100 pt-4 space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold text-stone-400">Customer</span>
              <span className="text-[13px] font-bold text-stone-800">{customerName.trim() || 'Guest'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold text-stone-400">Date</span>
              <span className="text-[13px] font-bold text-stone-800">{dateStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold text-stone-400">Time</span>
              <span className="text-[13px] font-bold text-stone-800">{timeStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold text-stone-400">Total Items</span>
              <span className="text-[13px] font-bold text-stone-800">{itemCount}</span>
            </div>
          </div>

          {/* Item Breakdown */}
          {orderItems.length > 0 && (
            <div className="border-t border-stone-100 pt-4 mb-4">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2.5">
                Items
              </span>
              <div className="space-y-2">
                {orderItems.map((item, idx) => (
                  <div key={item.id || idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[11px] font-bold text-stone-400 shrink-0">{item.quantity}x</span>
                      <span className="text-[13px] font-semibold text-stone-700 truncate">{item.name}</span>
                    </div>
                    <span className="text-[13px] font-bold text-stone-800 shrink-0 ml-3">
                      P{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total line */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed border-stone-200">
                <span className="text-[12px] font-black text-stone-700 uppercase tracking-wide">Total</span>
                <span className="text-lg font-black text-stone-900">P{total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Pickup reminder */}
          <div className="bg-[#fdfaf5] border border-stone-200/60 rounded-xl p-3 mb-3 text-center">
            <p className="text-stone-500 font-semibold text-[11px] leading-relaxed">
              We're preparing your order with care.<br />
              Please listen for your name at the pickup counter.
            </p>
          </div>

          {/* Not official receipt */}
          <div className="flex items-start gap-2 bg-rose-50/60 border border-rose-200/50 rounded-xl p-2.5 text-left">
            <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-[9px] text-rose-600/90 font-semibold leading-relaxed">
              <span className="font-extrabold text-rose-700">Friendly reminder:</span> This is not an official receipt. If you need one, kindly ask our barista — they'll be happy to help!
            </p>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="shrink-0 bg-white px-6 pt-3 pb-5 border-t border-stone-100">
          <p className="text-center text-[10px] text-stone-400 font-semibold mb-3">
            Brows & Beyond — Thank you for stopping by!
          </p>
          <button
            onClick={onClose}
            className="w-full bg-[#3b1f0a] hover:bg-[#5c3317] text-white font-black text-[11px] uppercase tracking-widest py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-amber-900/10 cursor-pointer"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
