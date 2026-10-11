// src/features/menu/components/BentoCategoryGrid.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

const BUCKET_URL = "https://jclzrvizljglhhndkmvo.supabase.co/storage/v1/object/public/platos";

export function BentoCategoryGrid() {
  return (
    <section className="px-5 w-full mx-auto pb-8">
      
      {/* CINTA DECORATIVA EXPLORAR CARTA */}
      <div className="flex items-center gap-3 mb-3.5">
        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest shrink-0">
          Explorar Carta
        </h3>
        <div className="relative flex-1 h-3 rounded-full overflow-hidden shadow-sm">
          <Image 
            src={`${BUCKET_URL}/cintaexplorarcarta.png`} 
            alt="Cinta Explorar Carta" 
            fill 
            className="object-cover"
            unoptimized 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3.5">
         
         {/* 1. PLATOS MARINOS (Marco textil paspartú) */}
         <Link 
           href="/mantas/categoria/cat_marinos" 
           className="col-span-2 relative p-[6px] rounded-[1.8rem] overflow-hidden group active:scale-[0.98] transition-all text-left shadow-[0_0_22px_rgba(239,68,68,0.45)] border border-red-500/20"
         >
            {/* Marco Textil de Fondo */}
            <Image 
              src={`${BUCKET_URL}/bannerplatosmarino.png`} 
              alt="Marco Textil Platos Marinos" 
              fill 
              className="object-cover"
              unoptimized
            />

            {/* Contenedor Interior con Foto */}
            <div className="relative w-full h-[125px] rounded-[1.45rem] overflow-hidden bg-zinc-950">
              <Image 
                src={`${BUCKET_URL}/platosmarinos.jpg`} 
                alt="Platos Marinos" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-3 left-4 z-20">
                <h4 className="text-xl font-black text-white mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Platos Marinos
                </h4>
                <p className="text-[10px] text-zinc-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  Ceviches, Leche de Tigre y Combos
                </p>
              </div>
            </div>
         </Link>

         {/* 2. PLATOS CRIOLLOS (Marco textil paspartú) */}
         <Link 
           href="/mantas/categoria/cat_criollos" 
           className="relative p-[5px] rounded-[1.65rem] overflow-hidden active:scale-95 transition-all text-left group shadow-[0_0_18px_rgba(239,68,68,0.4)] border border-red-500/20"
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`} 
              alt="Marco Textil Criollos" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="relative w-full h-[125px] rounded-[1.35rem] overflow-hidden bg-zinc-950">
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

         {/* 3. POLLO A LA BRASA (Marco textil paspartú) */}
         <Link 
           href="/mantas/categoria/cat_pollo" 
           className="relative p-[5px] rounded-[1.65rem] overflow-hidden active:scale-95 transition-all text-left group shadow-[0_0_18px_rgba(239,68,68,0.4)] border border-red-500/20"
         >
            <Image 
              src={`${BUCKET_URL}/bannerplatoscriollo-polloalabrasa.png`} 
              alt="Marco Textil Pollo a la Brasa" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="relative w-full h-[125px] rounded-[1.35rem] overflow-hidden bg-zinc-950">
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

         {/* 4. ENTRADAS (Fondo textil andino completo) */}
         <Link 
           href="/mantas/categoria/cat_entradas" 
           className="relative rounded-[1.65rem] overflow-hidden active:scale-95 transition-all text-left group shadow-[0_0_15px_rgba(239,68,68,0.25)] border border-red-500/20"
         >
            <Image 
              src={`${BUCKET_URL}/bannerentrada-bebidas.png`} 
              alt="Entradas Textil" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="relative w-full h-[125px] rounded-[1.35rem] p-3.5 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10">
              <h4 className="text-base font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Entradas
              </h4>
            </div>
         </Link>

         {/* 5. BEBIDAS & TRAGOS (Fondo textil andino completo) */}
         <Link 
           href="/mantas/categoria/cat_bebidas" 
           className="relative rounded-[1.65rem] overflow-hidden active:scale-95 transition-all text-left group shadow-[0_0_15px_rgba(239,68,68,0.25)] border border-red-500/20"
         >
            <Image 
              src={`${BUCKET_URL}/bannerentrada-bebidas.png`} 
              alt="Bebidas & Tragos Textil" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="relative w-full h-[125px] rounded-[1.35rem] p-3.5 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10">
              <h4 className="text-base font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Bebidas &<br/>Tragos
              </h4>
            </div>
         </Link>

      </div>
    </section>
  );
}