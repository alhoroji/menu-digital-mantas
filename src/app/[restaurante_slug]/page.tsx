// src/app/[restaurante_slug]/page.tsx
'use client';

import { BellRing } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useMenuStatus } from '@/features/menu/hooks/useMenuStatus';
import { SpotlightBanner } from '@/features/menu/components/SpotlightBanner';
import { CartFloatingButton } from '@/features/cart/components/CartFloatingButton';

const mockRestaurant = {
  name: "Mantas",
  theme: { background: "#060608", primary: "#E4B363" },
  schedules: {
    menuDelDia: { isActive: true, startTime: "03:00", endTime: "16:00", daysOfWeek: [1, 2, 3, 4, 5] },
    promocion: { isActive: true, startTime: "16:01", endTime: "23:59", daysOfWeek: [1, 2, 3, 4, 5] }
  }
};

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";
const PATTERN_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos/manta_pattern.png";

function BentoCategoryGrid() {
  return (
    <section className="px-5 w-full mx-auto pb-8">
      {/* Encabezado con Separador Andino */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Explorar Carta</h3>
        <div className="flex-1 h-[6px] ml-4 rounded opacity-80" style={{ backgroundImage: `url(${PATTERN_URL})`, backgroundSize: 'contain' }} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 auto-rows-[135px]">
         
         {/* PLATOS MARINOS */}
         <Link href="/mantas/categoria/cat_marinos" className="col-span-2 p-[3px] rounded-[1.8rem] relative overflow-hidden group active:scale-[0.98] transition-all text-left bg-gradient-to-r from-red-600 to-orange-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            <div className="absolute inset-0 opacity-80 mix-blend-overlay" style={{ backgroundImage: `url(${PATTERN_URL})`, backgroundSize: 'cover' }} />
            <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/platosmarinos.jpg`} 
                alt="Platos Marinos" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h4 className="text-xl font-black text-white mb-0.5 font-serif drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Platos Marinos</h4>
                <p className="text-[10px] text-zinc-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Ceviches, Leche de Tigre y Combos</p>
              </div>
            </div>
         </Link>

         {/* PLATOS CRIOLLOS */}
         <Link href="/mantas/categoria/cat_criollos" className="p-[2px] rounded-[1.8rem] relative overflow-hidden active:scale-95 transition-all text-left group bg-gradient-to-b from-orange-600 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:shadow-[0_0_18px_rgba(239,68,68,0.4)]">
            <div className="absolute inset-0 opacity-80 mix-blend-overlay" style={{ backgroundImage: `url(${PATTERN_URL})`, backgroundSize: 'cover' }} />
            <div className="relative w-full h-full rounded-[1.65rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/platos_criollos.jpg`} 
                alt="Platos Criollos" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h4 className="text-base font-black text-white leading-tight font-serif drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Platos<br/>Criollos</h4>
              </div>
            </div>
         </Link>

         {/* POLLO A LA BRASA */}
         <Link href="/mantas/categoria/cat_pollo" className="p-[2px] rounded-[1.8rem] relative overflow-hidden active:scale-95 transition-all text-left group bg-gradient-to-b from-orange-500 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:shadow-[0_0_18px_rgba(245,158,11,0.4)]">
            <div className="absolute inset-0 opacity-80 mix-blend-overlay" style={{ backgroundImage: `url(${PATTERN_URL})`, backgroundSize: 'cover' }} />
            <div className="relative w-full h-full rounded-[1.65rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/pollo_ala_brasa.jpg`} 
                alt="Pollo a la Brasa" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h4 className="text-base font-black text-white leading-tight font-serif drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Pollo a<br/>la Brasa</h4>
              </div>
            </div>
         </Link>

         {/* ENTRADAS */}
         <Link href="/mantas/categoria/cat_entradas" className="p-[2px] rounded-[1.8rem] relative overflow-hidden active:scale-95 transition-all text-left group bg-zinc-800 border border-zinc-700/50 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay grayscale" style={{ backgroundImage: `url(${PATTERN_URL})`, backgroundSize: 'cover' }} />
            <div className="relative w-full h-full rounded-[1.65rem] p-4 flex flex-col justify-end bg-zinc-950">
              <h4 className="text-base font-black text-white leading-tight font-serif">Entradas</h4>
            </div>
         </Link>

         {/* BEBIDAS */}
         <Link href="/mantas/categoria/cat_bebidas" className="p-[2px] rounded-[1.8rem] relative overflow-hidden active:scale-95 transition-all text-left group bg-zinc-800 border border-zinc-700/50 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay grayscale" style={{ backgroundImage: `url(${PATTERN_URL})`, backgroundSize: 'cover' }} />
            <div className="relative w-full h-full rounded-[1.65rem] p-4 flex flex-col justify-end bg-zinc-950">
              <h4 className="text-base font-black text-white leading-tight font-serif">Bebidas &<br/>Tragos</h4>
            </div>
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
      {/* HEADER DE MARCA */}
      <div className="h-[6px] w-full" style={{ backgroundImage: `url(${PATTERN_URL})`, backgroundSize: 'contain' }} />
      <header className="flex justify-between items-center px-5 pt-6 pb-4 w-full shrink-0">
        <div>
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent font-serif drop-shadow-md">
            {mockRestaurant.name}
          </h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          <BellRing size={16} className="text-zinc-400" />
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