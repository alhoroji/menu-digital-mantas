// src/features/menu/components/BentoCategoryGrid.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

// Neón Eléctrico Fuego Vivo: Compacto, definido y ultra-intenso
const NEON_CARD_VIBRANT = '0 0 5px #ff1744, 0 0 10px #ff3d00, 0 0 18px rgba(255, 61, 0, 0.6)';
const NEON_CARD_ACCENT  = '0 0 4px #ff3d00, 0 0 9px #ff6d00, 0 0 16px rgba(255, 109, 0, 0.5)';

export function BentoCategoryGrid() {
  return (
    <section className="px-5 w-full mx-auto pb-6">
      
      {/* Cinta Explorar Carta */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-widest shrink-0">
          Explorar Carta
        </h3>
        <div className="relative flex-1 h-3 rounded-full overflow-hidden shadow-sm">
          <Image 
            src={`${BUCKET_URL}/tiramaestra.png`} 
            alt="Cinta Explorar Carta" 
            fill 
            className="object-cover"
            unoptimized 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
         
         {/* 1. PLATOS MARINOS (Neón Eléctrico Compacto) */}
         <Link 
           href="/mantas/categoria/cat_marinos" 
           className="col-span-2 relative p-[2.5px] rounded-[1.6rem] overflow-hidden group active:scale-[0.98] transition-all text-left"
           style={{ boxShadow: NEON_CARD_VIBRANT }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatosmarino.png`} 
              alt="Marco Textil Platos Marinos" 
              fill 
              className="object-cover"
              unoptimized
            />

            <div className="relative w-full h-[110px] rounded-[1.45rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/platosmarinos.jpg`} 
                alt="Platos Marinos" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent z-10" />
              <div className="absolute bottom-2.5 left-3.5 z-20">
                <h4 className="text-lg font-black text-white mb-0.5 font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Platos Marinos
                </h4>
                <p className="text-[9px] text-zinc-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  Ceviches, Leche de Tigre y Combos
                </p>
              </div>
            </div>
         </Link>

         {/* 2. PLATOS CRIOLLOS (Neón Eléctrico) */}
         <Link 
           href="/mantas/categoria/cat_criollos" 
           className="relative p-[2.5px] rounded-[1.5rem] overflow-hidden active:scale-95 transition-all text-left group"
           style={{ boxShadow: NEON_CARD_VIBRANT }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`} 
              alt="Marco Textil Criollos" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="relative w-full h-[105px] rounded-[1.35rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/platos_criollos.jpg`} 
                alt="Platos Criollos" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent z-10" />
              <div className="absolute bottom-2.5 left-3 z-20">
                <h4 className="text-sm font-black text-white leading-tight font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Platos<br/>Criollos
                </h4>
              </div>
            </div>
         </Link>

         {/* 3. POLLO A LA BRASA (Neón Eléctrico) */}
         <Link 
           href="/mantas/categoria/cat_pollo" 
           className="relative p-[2.5px] rounded-[1.5rem] overflow-hidden active:scale-95 transition-all text-left group"
           style={{ boxShadow: NEON_CARD_VIBRANT }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`} 
              alt="Marco Textil Pollo a la Brasa" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="relative w-full h-[105px] rounded-[1.35rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/pollo_ala_brasa.jpg`} 
                alt="Pollo a la Brasa" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent z-10" />
              <div className="absolute bottom-2.5 left-3 z-20">
                <h4 className="text-sm font-black text-white leading-tight font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Pollo a<br/>la Brasa
                </h4>
              </div>
            </div>
         </Link>

         {/* 4. ENTRADAS (Neón Cálido Definido) */}
         <Link 
           href="/mantas/categoria/cat_entradas" 
           className="relative h-[95px] rounded-[1.5rem] overflow-hidden active:scale-95 transition-all text-left group"
           style={{ boxShadow: NEON_CARD_ACCENT }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerentrada-bebidas.png`} 
              alt="Entradas Textil" 
              fill 
              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
            <div className="absolute bottom-2.5 left-3 z-20">
              <h4 className="text-sm font-black text-white leading-tight font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Entradas
              </h4>
            </div>
         </Link>

         {/* 5. BEBIDAS & TRAGOS (Neón Cálido Definido) */}
         <Link 
           href="/mantas/categoria/cat_bebidas" 
           className="relative h-[95px] rounded-[1.5rem] overflow-hidden active:scale-95 transition-all text-left group"
           style={{ boxShadow: NEON_CARD_ACCENT }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerentrada-bebidas.png`} 
              alt="Bebidas & Tragos Textil" 
              fill 
              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
            <div className="absolute bottom-2.5 left-3 z-20">
              <h4 className="text-sm font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Bebidas &<br/>Tragos
              </h4>
            </div>
         </Link>

      </div>
    </section>
  );
}