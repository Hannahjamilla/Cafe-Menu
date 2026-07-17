import React from 'react';
import { Coffee, CheckCircle, Clock, Trash2, ShieldAlert, Sparkles, RefreshCw, Smile } from 'lucide-react';

export default function CounterBoard({ 
  orders, 
  onUpdateStatus, 
  onDeleteOrder, 
  onResetMockOrders 
}) {

  const statusColors = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    preparing: 'bg-blue-100 text-blue-800 border-blue-200',
    ready: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    completed: 'bg-stone-100 text-stone-500 border-stone-200'
  };

  const statusLabels = {
    pending: 'Pending ⏳',
    preparing: 'Steaming & Prep ☕',
    ready: 'Ready at Counter 🛎️',
    completed: 'Served & Closed ✓'
  };

  return (
    <div className="w-full space-y-8 animate-fade-in-up">
      
      {/* Header card with welcome messaging */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#102d1d] to-[#0b2014] rounded-3xl p-6 sm:p-10 border border-emerald-900/30 text-white relative overflow-hidden shadow-xl">
        {/* Grid texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-emerald-500/10 filter blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/50 border border-emerald-700/30 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-3">
              <Clock className="w-3 h-3 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
              Live Desk Queue
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">Barista Counter Board</h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-xl font-medium leading-relaxed">
              When customers compile their orders and select <strong>Send to Counter</strong>, their cards instantly show up here. Baristas manage brewing statuses from this terminal!
            </p>
          </div>

          <button
            onClick={onResetMockOrders}
            className="bg-white hover:bg-stone-50 text-stone-700 text-[10px] font-black uppercase tracking-wider px-5 py-3 rounded-xl shadow-md border hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5 self-start md:self-center shrink-0 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Load Sample Orders
          </button>
        </div>
      </div>

      {/* Main grid of customer order cards */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4 bg-white/50 border border-stone-200/60 rounded-3xl p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
            <ShieldAlert className="w-7 h-7 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="font-serif font-black text-stone-800 text-lg">No orders queued</h3>
            <p className="text-xs text-stone-400 mt-2 max-w-sm leading-relaxed font-medium">
              The counter board is currently clear! Go to the <strong>Sip & Eat</strong> menu tab, customize your drink, add it to your tray, and send it to the counter to see it appear.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const formattedTime = new Date(order.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            });

            return (
              <div 
                key={order.id}
                className="bg-white border-2 border-stone-200/80 hover:border-emerald-700/20 rounded-[28px] overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.02)] hover:shadow-[0_18px_40px_rgba(4,120,87,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Order header card */}
                <div className="p-5 border-b border-stone-100 bg-[#fdfbf7] flex items-start justify-between gap-3 shrink-0">
                  <div className="min-w-0">
                    <span className="block text-[8px] uppercase tracking-widest font-black text-stone-400">Customer Name</span>
                    <h3 className="font-serif font-black text-stone-900 text-lg truncate mt-0.5 group-hover:text-emerald-800 transition-colors">
                      {order.customerName}
                    </h3>
                    <span className="text-[10px] text-stone-400 font-bold block mt-1">
                      Ordered at {formattedTime}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 items-end">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                      className={`text-[9px] font-black uppercase tracking-wider rounded-lg px-2.5 py-1.5 border border-stone-200/60 focus:outline-none cursor-pointer shadow-sm ${statusColors[order.status]}`}
                    >
                      <option value="pending">Pending ⏳</option>
                      <option value="preparing">Prep ☕</option>
                      <option value="ready">Ready 🛎️</option>
                      <option value="completed">Completed ✓</option>
                    </select>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-5 flex-1 space-y-3.5 overflow-y-auto max-h-[220px]">
                  {order.items.map((item, idx) => {
                    const opts = Object.entries(item.customizations || {})
                      .filter(([_, val]) => val && val.trim() !== '')
                      .map(([_, val]) => val)
                      .join(', ');

                    return (
                      <div key={idx} className="flex items-start gap-3 text-left">
                        <span className="font-serif font-black text-emerald-800 text-xs mt-0.5 shrink-0 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 shadow-sm">
                          {item.quantity}×
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-stone-800 text-xs leading-snug">{item.name}</p>
                          {opts && (
                            <p className="text-[9.5px] font-semibold text-stone-400 mt-0.5 leading-snug break-words">
                              {opts}
                            </p>
                          )}
                        </div>
                        <span className="text-stone-700 text-xs font-serif font-black shrink-0">
                          ₱{(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Order Footer card */}
                <div className="p-5 border-t border-stone-100 bg-[#fdfbf7] shrink-0 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-black text-stone-400 block">Total cost</span>
                    <span className="text-xl font-serif font-black text-[#a26a42]">₱{order.totalAmount.toFixed(0)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onDeleteOrder(order.id)}
                      className="p-2 border border-stone-200/60 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-stone-50 active:scale-95 transition-all shadow-sm bg-white"
                      title="Delete Order Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {order.status !== 'completed' && (
                      <button
                        onClick={() => onUpdateStatus(order.id, 'completed')}
                        className="px-3.5 py-2 bg-emerald-900 text-emerald-400 border border-emerald-800 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-emerald-800 hover:-translate-y-0.5 transition-all shadow-sm flex items-center gap-1 shrink-0"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Complete
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Counter Board Tip Notice */}
      <div className="bg-[#faf8f4] border border-stone-200/60 rounded-2.5xl p-5 flex items-start gap-4">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-serif font-black text-stone-750 text-xs">Counter Staff Operations</h4>
          <p className="text-[11px] text-stone-550 leading-relaxed font-semibold">
            To view changes live in multiple tabs, open the menu in one window and this board in another. As soon as you hit <span className="font-extrabold text-stone-705">Send to Counter</span>, it broadcasts via local synchronization! You can mark items as Preparing or Ready to practice service flow.
          </p>
        </div>
      </div>

    </div>
  );
}
