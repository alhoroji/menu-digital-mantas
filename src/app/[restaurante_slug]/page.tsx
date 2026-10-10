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
  theme: { background: "#09090B", primary: "#E4B363" },
  schedules: {
    menuDelDia: { isActive: true, startTime: "03:00", endTime: "16:00", daysOfWeek: [1, 2, 3, 4, 5] },
    promocion: { isActive: true, startTime: "16:01", endTime: "23:59", daysOfWeek: [1, 2, 3, 4, 5] }
  }
};

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

function BentoCategoryGrid() {
  return (
    <section className="px-5 w-full mx-auto pb-8">
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Explorar Carta</h3>
      
      <div className="grid grid-cols-2 gap-3 auto-rows-[130px]">
         
         {/* PLATOS MARINOS */}
         <Link href="/mantas/categoria/cat_marinos" className="col-span-2 rounded-[1.5rem] relative overflow-hidden group active:scale-[0.98] transition-all text-left">
            <Image 
              src={`${BUCKET_URL}/platosmarinos.jpg`} 
              alt="Platos Marinos" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h4 className="text-lg font-bold text-white mb-0.5">Platos Marinos</h4>
              <p className="text-[10px] text-zinc-300">Ceviches, Leche de Tigre y Combos</p>
            </div>
         </Link>

         {/* PLATOS CRIOLLOS */}
         <Link href="/mantas/categoria/cat_criollos" className="rounded-[1.5rem] relative overflow-hidden active:scale-95 transition-all text-left group">
            <Image 
              src={`${BUCKET_URL}/platos_criollos.jpg`} 
              alt="Platos Criollos" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h4 className="text-base font-bold text-white leading-tight mb-0.5">Platos<br/>Criollos</h4>
            </div>
         </Link>

         {/* POLLO A LA BRASA */}
         <Link href="/mantas/categoria/cat_pollo" className="rounded-[1.5rem] relative overflow-hidden active:scale-95 transition-all text-left group">
            <Image 
              src={`${BUCKET_URL}/pollo_ala_brasa.jpg`} 
              alt="Pollo a la Brasa" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h4 className="text-base font-bold text-white leading-tight mb-0.5">Pollo a<br/>la Brasa</h4>
            </div>
         </Link>

         {/* ENTRADAS */}
         <Link href="/mantas/categoria/cat_entradas" className="rounded-[1.5rem] p-4 flex flex-col justify-end bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <h4 className="text-base font-bold text-white leading-tight">Entradas</h4>
         </Link>

         {/* BEBIDAS */}
         <Link href="/mantas/categoria/cat_bebidas" className="rounded-[1.5rem] p-4 flex flex-col justify-end bg-zinc-900 border border-zinc-800/50 active:scale-95 transition-all text-left group">
            <h4 className="text-base font-bold text-white leading-tight">Bebidas &<br/>Tragos</h4>
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