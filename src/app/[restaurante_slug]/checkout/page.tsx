// src/app/[restaurante_slug]/page.tsx
'use client';

import { BellRing, UtensilsCrossed, Fish, Flame, Wine, Soup } from 'lucide-react';
import Link from 'next/link';
import { useMenuStatus } from '@/features/menu/hooks/useMenuStatus';
import { SpotlightBanner } from '@/features/menu/components/SpotlightBanner';
import { CartFloatingButton } from '@/features/cart/components/CartFloatingButton';

// MOCK DEL RESTAURANTE
const mockRestaurant = {
  name: "Mantas",
  theme: { background: "#09090B", primary: "#E4B363" },
  schedules: {
    menuDelDia: { isActive: true, startTime: "03:00", endTime: "16:00", daysOfWeek: [1, 2, 3, 4, 5] },
    promocion: { isActive: true, startTime: "16:01", endTime: "23:59", daysOfWeek: [1, 2, 3, 4, 5] }
  }
};

// COMPONENTE: CUADRÍCULA DE CATEGORÍAS
function BentoCategoryGrid() {
  return (
    <section className="px-6">
      <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">Explorar Carta</h3>
      
      <div className="grid grid-cols-2 gap-4 auto-rows-[140px]">
         
         {/* Platos Marinos (Destacado - 2 columnas) */}
         <Link href="/mantas/categoria/cat_marinos" className="col-span-2 rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden border border-zinc-800/50 bg-gradient-to-br from-[#1E293B] to-zinc-950 group active:scale-[0.98] transition-all text-left">
            <Fish size={28} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <div>
              <h4 className="text-xl font-medium text-white mb-1">Platos Marinos</h4>
              <p className="text-xs text-zinc-400">Ceviches, Leche de Tigre y Combos</p>
            </div>
         </Link>

         {/* Platos Criollos */}
         <Link href="/mantas/categoria/cat_criollos" className="rounded-[2rem] p-5 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <UtensilsCrossed size={24} className="text-orange-500 group-hover:text-orange-400 transition-colors" />
            <div>
              <h4 className="text-lg font-medium text-white leading-tight mb-1">Platos<br/>Criollos</h4>
              <p className="text-[10px] text-zinc-500">Lomo, Chaufa, Tallarines</p>
            </div>
         </Link>

         {/* Pollo a la Brasa */}
         <Link href="/mantas/categoria/cat_pollo" className="rounded-[2rem] p-5 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <Flame size={24} className="text-red-500 group-hover:text-red-400 transition-colors" />
            <div>
              <h4 className="text-lg font-medium text-white leading-tight mb-1">Pollo a<br/>la Brasa</h4>
              <p className="text-[10px] text-zinc-500">Al horno de leña</p>
            </div>
         </Link>

         {/* Entradas */}
         <Link href="/mantas/categoria/cat_entradas" className="rounded-[2rem] p-5 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <Soup size={24} className="text-yellow-500 group-hover:text-yellow-400 transition-colors" />
            <h4 className="text-lg font-medium text-white leading-tight">Entradas</h4>
         </Link>

         {/* Bebidas */}
         <Link href="/mantas/categoria/cat_bebidas" className="rounded-[2rem] p-5 flex flex-col justify-between bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <Wine size={24} className="text-purple-500 group-hover:text-purple-400 transition-colors" />
            <h4 className="text-lg font-medium text-white leading-tight">Bebidas &<br/>Tragos</h4>
         </Link>

      </div>
    </section>
  );
}

// EXPORT DEFAULT (Obligatorio para que Next.js sepa que esto es una página)
export default function TenantMenuPage({ params }: { params: { restaurante_slug: string } }) {
  // Evaluamos la lógica del horario
  const status = useMenuStatus(mockRestaurant.schedules.menuDelDia, mockRestaurant.schedules.promocion);

  return (
    <main 
      className="min-h-screen font-sans mx-auto w-full sm:max-w-md overflow-x-hidden pb-32 text-zinc-100 selection:bg-zinc-800 relative"
      style={{ backgroundColor: mockRestaurant.theme.background }}
    >
      
      {/* HEADER COMPONENT */}
      <header className="flex justify-between items-center px-6 pt-8 pb-4">
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">Menú Digital</p>
          <h1 className="text-3xl font-light tracking-tight text-white">{mockRestaurant.name}</h1>
        </div>
        <button className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          <BellRing size={20} className="text-zinc-400" />
        </button>
      </header>

      {/* BANNER INTELIGENTE */}
      <SpotlightBanner status={status} primaryColor={mockRestaurant.theme.primary} />
      
      {/* CATEGORÍAS */}
      <BentoCategoryGrid />

      {/* ISLA DINÁMICA (Si hay items en el carrito) */}
      <CartFloatingButton />

    </main>
  );
}