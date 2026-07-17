import React from 'react';
import { X, Trash2, Plus, Minus, Coffee, Notebook, ClipboardList } from 'lucide-react';

export default function TrayDrawer({ 
  isOpen, 
  onClose, 
  trayItems, 
  onUpdateQty, 
  onRemoveItem, 
  customerName, 
  onNameChange, 
  onClearTray, 
  onPresentOrder
}) {
  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = trayItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-[#fdfaf5] h-full shadow-2xl flex flex-col border-l border-stone-200/80 z-10"
        style={{ animation: 'slideInRight 0.3s cubic-bezier(0.32,0.72,0,1)' }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
        `}</style>

        {/* ── HEADER ── */}
        <div className="p-5 border-b border-stone-200/60 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 border border-amber-200">
              <Notebook className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-black text-stone-900 text-base leading-none">My Order List</h2>
              <span className="text-[9px] uppercase tracking-widest text-[#a26a42] font-extrabold mt-0.5 block">Personal Checklist</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* Customer Name */}
          <div className="bg-white border border-stone-200/60 rounded-2xl p-4 shadow-sm">
            <label className="block text-[10px] uppercase tracking-widest font-black text-[#a26a42] mb-2">
              What's your name?
            </label>
            <input
              type="text"
              placeholder="Name to be called for your order..."
              value={customerName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full px-4 py-3 text-sm font-bold bg-[#faf8f4] border-2 border-stone-100 rounded-xl focus:outline-none focus:border-amber-400 focus:bg-white transition-all text-stone-800 placeholder-stone-400"
            />
          </div>

          {/* Items */}
          {trayItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4 border-2 border-dashed border-stone-200 rounded-3xl p-6 bg-white/40">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-300">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-stone-800 text-sm">Nothing here yet!</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Browse the menu, open any item, and tap <strong>Add to My Tray</strong> to build your checklist.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-xs font-black text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-4 py-2 rounded-xl transition-colors"
              >
                Browse Menu →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-black text-stone-400">
                  Your items · {trayItems.length}
                </span>
                <button
                  onClick={onClearTray}
                  className="text-[10px] font-black text-rose-400 hover:text-rose-600 transition-colors uppercase tracking-wider"
                >
                  Clear all
                </button>
              </div>

              {trayItems.map((item) => {
                const opts = Object.values(item.customizations || {})
                  .filter(v => v && v.trim() !== '')
                  .join(' · ');

                return (
                  <div key={item.id}
                    className="bg-white border border-stone-200/60 hover:border-amber-200 rounded-2xl p-3.5 flex items-start gap-3 shadow-sm transition-all duration-200"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-stone-100 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className="font-serif font-black text-stone-900 text-xs leading-snug">{item.name}</p>
                        <span className="font-serif font-black text-[#a26a42] text-xs shrink-0">
                          ₱{(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                      {opts && (
                        <p className="text-[9.5px] text-stone-400 font-semibold mt-0.5 leading-snug line-clamp-2">{opts}</p>
                      )}

                      {/* Qty controls + remove */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center gap-1 bg-stone-50 border border-stone-200/60 rounded-lg p-0.5 shadow-sm">
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded text-stone-500 hover:text-stone-800 transition-all active:scale-90"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-[11px] font-black text-stone-700 w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded text-stone-500 hover:text-stone-800 transition-all active:scale-90"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-300 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* How-to tip */}
          {trayItems.length > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
              <ClipboardList className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-stone-600 font-semibold leading-relaxed">
                Once you're happy with your list, tap <span className="font-extrabold text-stone-800">Show to Barista</span> and hand your phone to the staff at the front counter. No online ordering — they'll prepare it for you personally! 😊
              </p>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        {trayItems.length > 0 && (
          <div className="shrink-0 p-5 border-t border-stone-200/70 bg-white space-y-3">
            {/* Total */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-black text-stone-400">Estimated Total</p>
                <p className="text-2xl font-serif font-black text-amber-600">₱{totalAmount.toFixed(0)}</p>
              </div>
              <p className="text-[9px] text-stone-400 font-bold text-right leading-relaxed max-w-[160px]">
                Final price confirmed<br />at the counter
              </p>
            </div>

            {/* Present CTA */}
            <button
              onClick={onPresentOrder}
              disabled={trayItems.length === 0 || !customerName.trim()}
              className={`w-full font-black text-[11px] uppercase tracking-widest py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                trayItems.length === 0 || !customerName.trim()
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                  : 'bg-[#3b1f0a] hover:bg-[#5c3317] text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
              }`}
            >
              {trayItems.length > 0 && !customerName.trim() ? (
                <span>Add your name above to show barista! ✍️</span>
              ) : (
                <>
                  <ClipboardList className="w-4 h-4" />
                  <span>Show to Barista</span>
                </>
              )}
            </button>
            <p className="text-center text-[9px] text-stone-400 font-semibold">
              Opens a full-screen order card to show at the counter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
