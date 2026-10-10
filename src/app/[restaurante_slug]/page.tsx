// src/app/[restaurante_slug]/page.tsx
'use client';

import { BellRing, UtensilsCrossed, Fish, Flame, Wine, Soup } from 'lucide-react';
import Link from 'next/link';
import { useMenuStatus } from '@/features/menu/hooks/useMenuStatus';
import { SpotlightBanner } from '@/features/menu/components/SpotlightBanner';
import { CartFloatingButton } from '@/features/cart/components/CartFloatingButton';

const mockRestaurant = {
  name: "Mantas",
  theme: { background: "#09090B", primary: "#E4B363" },
  schedules: {
    menuDelDia: { isActive: true, startTime: "03:00", endTime: "16:00", daysOfWeek: [1, 2, 3, 4, 5] },
    promocion: { isActive: true, startTime: "16:01", endTime: "23:59", daysOfWeek: [1, 2, 3, 4, 5] }
  }
};

function BentoCategoryGrid() {
  return (
    <section className="px-5 w-full mx-auto pb-8">
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Explorar Carta</h3>
      
      <div className="grid grid-cols-2 gap-3 auto-rows-[110px]">
         <Link href="/mantas/categoria/cat_marinos" className="col-span-2 rounded-[1.5rem] p-4 flex flex-col justify-between relative overflow-hidden border border-zinc-800/50 bg-gradient-to-br from-[#1E293B] to-zinc-950 group active:scale-[0.98] transition-all text-left">
            <Fish size={24} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <div>
              <h4 className="text-lg font-medium text-white mb-0.5">Platos Marinos</h4>
              <p className="text-[10px] text-zinc-400">Ceviches, Leche de Tigre y Combos</p>
            </div>
         </Link>

         <Link href="/mantas/categoria/cat_criollos" className="rounded-[1.5rem] p-4 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <UtensilsCrossed size={20} className="text-orange-500 group-hover:text-orange-400 transition-colors" />
            <div>
              <h4 className="text-base font-medium text-white leading-tight mb-0.5">Platos<br/>Criollos</h4>
              <p className="text-[9px] text-zinc-500">Lomo, Chaufa...</p>
            </div>
         </Link>

         <Link href="/mantas/categoria/cat_pollo" className="rounded-[1.5rem] p-4 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <Flame size={20} className="text-red-500 group-hover:text-red-400 transition-colors" />
            <div>
              <h4 className="text-base font-medium text-white leading-tight mb-0.5">Pollo a<br/>la Brasa</h4>
              <p className="text-[9px] text-zinc-500">Al horno de leña</p>
            </div>
         </Link>

         <Link href="/mantas/categoria/cat_entradas" className="rounded-[1.5rem] p-4 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <Soup size={20} className="text-yellow-500 group-hover:text-yellow-400 transition-colors" />
            <h4 className="text-base font-medium text-white leading-tight">Entradas</h4>
         </Link>

         <Link href="/mantas/categoria/cat_bebidas" className="rounded-[1.5rem] p-4 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <Wine size={20} className="text-purple-500 group-hover:text-purple-400 transition-colors" />
            <h4 className="text-base font-medium text-white leading-tight">Bebidas &<br/>Tragos</h4>
         </Link>
      </div>
    </section>
  );
}

export default function TenantMenuPage({ params }: { params: { restaurante_slug: string } }) {
  const status = useMenuStatus(mockRestaurant.schedules.menuDelDia, mockRestaurant.schedules.promocion);

  return (
    <main 
      className="min-h-screen font-sans w-full sm:max-w-md mx-auto overflow-x-hidden text-zinc-100 selection:bg-zinc-800 relative flex flex-col"
      style={{ backgroundColor: mockRestaurant.theme.background }}
    >
      {/* HEADER SIMPLIFICADO Y MODERNO */}
      <header className="flex justify-between items-center px-5 pt-6 pb-4 w-full shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-white">
            {mockRestaurant.name}
          </h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          <BellRing size={18} className="text-zinc-400" />
        </button>
      </header>

      <div className="w-full px-5 mb-5 shrink-0">
          <SpotlightBanner status={status} primaryColor={mockRestaurant.theme.primary} />
      </div>
      
      <BentoCategoryGrid />
      <CartFloatingButton />
      
    </main>
  );
}