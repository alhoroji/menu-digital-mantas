import { Coffee, UtensilsCrossed, CakeSlice } from 'lucide-react';

export function BentoCategoryGrid() {
  return (
    <section className="px-6">
      <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">Explorar Carta</h3>
      
      <div className="grid grid-cols-2 gap-4 auto-rows-[140px]">
         <button className="col-span-2 rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden border border-zinc-800/50 bg-gradient-to-br from-zinc-900 to-zinc-950 group active:scale-[0.98] transition-all text-left">
            <UtensilsCrossed size={24} className="text-zinc-500 group-hover:text-white transition-colors" />
            <div>
              <h4 className="text-xl font-medium text-white mb-1">Platos Fuertes</h4>
              <p className="text-xs text-zinc-500">Carnes, pescados y pastas</p>
            </div>
         </button>

         <button className="rounded-[2rem] p-5 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <Coffee size={22} className="text-zinc-500 group-hover:text-white transition-colors" />
            <h4 className="text-lg font-medium text-white leading-tight">Bebidas &<br/>Tragos</h4>
         </button>

         <button className="rounded-[2rem] p-5 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <CakeSlice size={22} className="text-zinc-500 group-hover:text-white transition-colors" />
            <h4 className="text-lg font-medium text-white leading-tight">Postres</h4>
         </button>
      </div>
    </section>
  );
}