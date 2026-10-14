// src/features/menu/components/BentoCategoryGrid.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

// Luces Neón Ultra-Finas y Específicas por Categoría
const NEON_MARINOS   = '0 0 3px #00e5ff, 0 0 9px rgba(0, 229, 255, 0.55)';
const NEON_CRIOLLOS  = '0 0 3px #ff1744, 0 0 9px rgba(255, 23, 68, 0.55)';
const NEON_POLLO     = '0 0 3px #ffab00, 0 0 9px rgba(255, 171, 0, 0.55)';
const NEON_ENTRADAS  = '0 0 3px #10b981, 0 0 8px rgba(16, 185, 129, 0.5)';
const NEON_BEBIDAS   = '0 0 3px #e040fb, 0 0 9px rgba(224, 64, 251, 0.55)';

export function BentoCategoryGrid() {
  return (
    <section className="px-5 w-full mx-auto pb-6">
      
      {/* CINTA DECORATIVA EXPLORAR CARTA */}
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
         
         {/* 1. PLATOS MARINOS (Neón Cyan / Turquesa Marino + Borde 1.5px) */}
         <Link 
           href="/mantas/categoria/cat_marinos" 
           className="col-span-2 relative p-[1.5px] rounded-[1.6rem] overflow-hidden group active:scale-[0.98] transition-all text-left"
           style={{ boxShadow: NEON_MARINOS }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatosmarino.png`} 
              alt="Marco Textil Platos Marinos" 
              fill 
              className="object-cover"
              unoptimized
            />

            <div className="relative w-full h-[112px] rounded-[1.5rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/platosmarinos.jpg?v=2`}
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
                <p className="text-[9px] text-cyan-200/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  Ceviches, Leche de Tigre y Combos
                </p>
              </div>
            </div>
         </Link>

         {/* 2. PLATOS CRIOLLOS (Neón Rojo Ají Panca + Borde 1.5px) */}
         <Link 
           href="/mantas/categoria/cat_criollos" 
           className="relative p-[1.5px] rounded-[1.5rem] overflow-hidden active:scale-95 transition-all text-left group"
           style={{ boxShadow: NEON_CRIOLLOS }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`} 
              alt="Marco Textil Criollos" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="relative w-full h-[106px] rounded-[1.4rem] overflow-hidden bg-zinc-950">
              <Image
  src={`${BUCKET_URL}/platoscriollos.jpg?v=2`}
  alt="Platos Criollos"
  fill
  className="object-cover group-hover:scale-105 transition-transform duration-500"
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

         {/* 3. POLLO A LA BRASA (Neón Ámbar Brasa + Borde 1.5px) */}
         <Link 
           href="/mantas/categoria/cat_pollo" 
           className="relative p-[1.5px] rounded-[1.5rem] overflow-hidden active:scale-95 transition-all text-left group"
           style={{ boxShadow: NEON_POLLO }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`} 
              alt="Marco Textil Pollo a la Brasa" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="relative w-full h-[106px] rounded-[1.4rem] overflow-hidden bg-zinc-950">
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

         {/* 4. ENTRADAS (Neón Verde Esmeralda Andino + Borde 1.5px) */}
         <Link 
           href="/mantas/categoria/cat_entradas" 
           className="relative p-[1.5px] rounded-[1.5rem] overflow-hidden active:scale-95 transition-all text-left group"
           style={{ boxShadow: NEON_ENTRADAS }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerentrada-bebidas.png`} 
              alt="Entradas Textil" 
              fill 
              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="relative w-full h-[96px] rounded-[1.4rem] p-3 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10">
              <h4 className="text-sm font-black text-white leading-tight font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Entradas
              </h4>
            </div>
         </Link>

         {/* 5. BEBIDAS & TRAGOS (Neón Magenta Cóctel + Borde 1.5px) */}
         <Link 
           href="/mantas/categoria/cat_bebidas" 
           className="relative p-[1.5px] rounded-[1.5rem] overflow-hidden active:scale-95 transition-all text-left group"
           style={{ boxShadow: NEON_BEBIDAS }}
         >
            <Image 
              src={`${BUCKET_URL}/bannerentrada-bebidas.png`} 
              alt="Bebidas & Tragos Textil" 
              fill 
              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="relative w-full h-[96px] rounded-[1.4rem] p-3 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10">
              <h4 className="text-sm font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Bebidas &<br/>Tragos
              </h4>
            </div>
         </Link>

      </div>
    </section>
  );
}