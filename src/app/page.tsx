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

function BentoCategoryGrid() {
  return (
    <section className="px-5 w-full mx-auto pb-8">
      
      {/* Separador con cinta textil */}
      <div className="flex items-center gap-3 mb-3.5">
        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest shrink-0">
          Explorar Carta
        </h3>
        <div className="relative flex-1 h-4 rounded-full overflow-hidden shadow-sm">
          <Image 
            src={`${BUCKET_URL}/cintaexplorarcarta.png`} 
            alt="Cinta Textil" 
            fill 
            className="object-cover"
            unoptimized 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3.5 auto-rows-[135px]">
         
         {/* PLATOS MARINOS */}
         <Link 
           href="/mantas/categoria/cat_marinos" 
           className="col-span-2 relative p-[6px] rounded-[1.8rem] overflow-hidden group active:scale-[0.98] transition-all text-left shadow-[0_0_22px_rgba(239,68,68,0.4)]"
         >
            {/* Marco Textil de Fondo */}
            <Image 
              src={`${BUCKET_URL}/bannerplatosmarino.png`} 
              alt="Marco Textil" 
              fill 
              className="object-cover"
              unoptimized
            />

            {/* Contenedor Interior con Foto */}
            <div className="relative w-full h-full rounded-[1.45rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/platosmarinos.jpg`} 
                alt="Platos Marinos" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-3.5 left-4 z-20">
                <h4 className="text-xl font-black text-white mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Platos Marinos
                </h4>
                <p className="text-[10px] text-zinc-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  Ceviches, Leche de Tigre y Combos
                </p>
              </div>
            </div>
         </Link>

         {/* PLATOS CRIOLLOS */}
         <Link 
           href="/mantas/categoria/cat_criollos" 
           className="relative p-[5px] rounded-[1.65rem] overflow-hidden active:scale-95 transition-all text-left group shadow-[0_0_18px_rgba(239,68,68,0.35)]"
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`} 
              alt="Marco Textil" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/platos_criollos.jpg`} 
                alt="Platos Criollos" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
              <div className="absolute bottom-3 left-3.5 z-20">
                <h4 className="text-base font-black text-white leading-tight mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Platos<br/>Criollos
                </h4>
              </div>
            </div>
         </Link>

         {/* POLLO A LA BRASA */}
         <Link 
           href="/mantas/categoria/cat_pollo" 
           className="relative p-[5px] rounded-[1.65rem] overflow-hidden active:scale-95 transition-all text-left group shadow-[0_0_18px_rgba(239,68,68,0.35)]"
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`} 
              alt="Marco Textil" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/pollo_ala_brasa.jpg`} 
                alt="Pollo a la Brasa" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
              <div className="absolute bottom-3 left-3.5 z-20">
                <h4 className="text-base font-black text-white leading-tight mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Pollo a<br/>la Brasa
                </h4>
              </div>
            </div>
         </Link>

         {/* ENTRADAS */}
         <Link 
           href="/mantas/categoria/cat_entradas" 
           className="relative rounded-[1.65rem] overflow-hidden active:scale-95 transition-all text-left group shadow-[0_0_15px_rgba(0,0,0,0.7)] border border-zinc-800"
         >
            <Image 
              src={`${BUCKET_URL}/bannerentrada-bebidas.png`} 
              alt="Entradas Textil" 
              fill 
              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="absolute bottom-3.5 left-4 z-20">
              <h4 className="text-base font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Entradas
              </h4>
            </div>
         </Link>

         {/* BEBIDAS */}
         <Link 
           href="/mantas/categoria/cat_bebidas" 
           className="relative rounded-[1.65rem] overflow-hidden active:scale-95 transition-all text-left group shadow-[0_0_15px_rgba(0,0,0,0.7)] border border-zinc-800"
         >
            <Image 
              src={`${BUCKET_URL}/bannerentrada-bebidas.png`} 
              alt="Bebidas & Tragos Textil" 
              fill 
              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="absolute bottom-3.5 left-4 z-20">
              <h4 className="text-base font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Bebidas &<br/>Tragos
              </h4>
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
      {/* Tira Maestra Superior */}
      <div className="relative w-full h-4 shrink-0 overflow-hidden shadow-sm">
        <Image 
          src={`${BUCKET_URL}/tiramaestra.png`} 
          alt="Borde Superior Mantas" 
          fill 
          className="object-cover"
          unoptimized 
          priority
        />
      </div>

      <header className="flex justify-between items-center px-5 pt-4 pb-3 w-full shrink-0">
        <div>
          {/* Logo Mantas con textura textil auténtica */}
          <h1 
            className="text-4xl font-black tracking-tight drop-shadow-md select-none"
            style={{
              backgroundImage: `url(${BUCKET_URL}/tiramaestra.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {mockRestaurant.name}
          </h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center shadow-lg active:scale-90 transition-transform">
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