import React, { useEffect } from 'react';
import { Coffee, CheckCircle2, User, Leaf } from 'lucide-react';

export default function ThankYouModal({ isOpen, onClose, customerName }) {
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

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-stone-950/70 backdrop-blur-md p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full sm:max-w-xl bg-[#fdfaf5] rounded-[36px] p-8 md:p-10 shadow-2xl border border-stone-200/60 flex flex-col items-center text-center custom-modal-anim"
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

        {/* Success Icon Area */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-100/60 animate-ping scale-125" style={{ animationDuration: '2.5s' }} />
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full border border-emerald-200 flex items-center justify-center relative z-10 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
        </div>

        <h3 className="font-serif font-black text-3.5xl text-stone-900 leading-tight">
          Thank You!
        </h3>
        
        <div className="w-12 h-1 bg-amber-500 rounded-full my-5" />

        <p className="text-[10px] font-black text-[#a26a42] uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5 justify-center">
          <User className="w-3.5 h-3.5 text-[#a26a42]" /> Waiting for Name:
        </p>

        {/* Big Name badge */}
        <div className="bg-[#fbf5eb] border border-[#e8dcb9] rounded-2xl px-6 py-4 mb-6 shadow-sm w-full max-w-xs shrink-0 transition-transform duration-300 hover:scale-[1.02]">
          <span className="block text-2.5xl sm:text-3xl font-serif font-black text-stone-900 tracking-wide uppercase">
            {customerName.trim() || 'Valued Guest'}
          </span>
        </div>

        <p className="text-stone-600 font-medium text-xs sm:text-sm leading-relaxed max-w-sm mb-4">
          We are currently preparing your drinks and pastries. Please listen for your name at the pickup counter! ☕
        </p>

        {/* Eco reminder */}
        <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-2xl p-3 mb-6 w-full text-left">
          <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
          <p className="text-[10px] text-emerald-800 font-semibold leading-relaxed">
            <span className="font-extrabold text-emerald-950">Sustainability:</span> Every 50 drinks plants a tree. Thank you for choosing organic! 🌱
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#3b1f0a] hover:bg-[#5c3317] text-white font-black text-[11px] uppercase tracking-widest py-4.5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-amber-900/10 cursor-pointer"
        >
          Check out cafe menu
        </button>
      </div>
    </div>
  );
}
